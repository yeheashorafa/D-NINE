import { chromium } from 'playwright';

async function audit() {
  console.log('--- PLAYWRIGHT ANONYMOUS DASHBOARD AUDIT ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    storageState: undefined,
  });
  const page = await context.newPage();

  const networkRequests = [];
  page.on('request', req => {
    networkRequests.push({ url: req.url(), method: req.method() });
  });

  const targetUrl = process.env.AUDIT_TARGET_URL || 'https://dnine9.com/dashboard';
  console.log(`Navigating to ${targetUrl} ...`);
  // Use domcontentloaded first, then wait a few seconds for Studio scripts to run
  const response = await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
  console.log('Response status:', response ? response.status() : 'unknown');

  console.log('Waiting 8s for client hydration and auth checks...');
  await page.waitForTimeout(8000);

  const title = await page.title();
  console.log('Page title:', title);

  // Check cookies, localStorage, sessionStorage
  const cookies = await context.cookies();
  console.log('Cookies count:', cookies.length);
  for (const c of cookies) {
    console.log('Cookie name:', c.name, 'domain:', c.domain, 'httpOnly:', c.httpOnly);
  }

  const localStorageData = await page.evaluate(() => JSON.stringify(window.localStorage));
  console.log('LocalStorage keys:', Object.keys(JSON.parse(localStorageData)));

  const sessionStorageData = await page.evaluate(() => JSON.stringify(window.sessionStorage));
  console.log('SessionStorage keys:', Object.keys(JSON.parse(sessionStorageData)));

  // Check DOM text and elements
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Body text snippet (first 300 chars):', bodyText.slice(0, 300).replace(/\n+/g, ' '));

  // Check for login / connect / unauthorized indicators
  const hasLoginText = /log\s*in|sign\s*in|choose\s*a\s*provider|not\s*authorized|unauthorized/i.test(bodyText);
  console.log('Has login/unauthorized prompt:', hasLoginText);

  // Check for document editor / create / edit / publish controls
  const buttons = await page.evaluate(() => Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(Boolean));
  console.log('Buttons visible:', buttons);

  // Check if Sanity Studio rendered document list or editor
  const studioRoot = await page.$('[data-ui="Studio"]');
  console.log('Studio element found:', !!studioRoot);

  // Check for any mutation endpoints hit
  const mutationRequests = networkRequests.filter(r => r.method !== 'GET' && r.method !== 'HEAD' && r.method !== 'OPTIONS');
  console.log('Non-GET network requests:', mutationRequests);

  // Collect all script URLs
  const scriptUrls = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
  });
  console.log('Loaded scripts count:', scriptUrls.length);

  // Scan bundles and HTML for secret tokens
  console.log('\n--- BUNDLE SECRET SCAN ---');
  const patterns = [
    { name: 'Bearer Token (long)', regex: /Bearer\s+[A-Za-z0-9_\-\.]{25,}/i },
    { name: 'SANITY_API_READ_TOKEN', regex: /SANITY_API_READ_TOKEN/i },
    { name: 'SANITY_REVALIDATE_SECRET', regex: /SANITY_REVALIDATE_SECRET/i },
    { name: 'Sanity secret key pattern (sk...)', regex: /sk[a-zA-Z0-9]{30,}/ },
    { name: 'Auth/secret token assignments', regex: /(?:apiKey|secretToken|authToken|apiSecret)\s*[:=]\s*['"][A-Za-z0-9_\-]{25,}['"]/i },
  ];

  const htmlContent = await page.content();
  for (const p of patterns) {
    if (p.regex.test(htmlContent)) {
      console.log('WARNING: Match found in HTML for pattern:', p.name);
    }
  }

  for (const url of scriptUrls) {
    try {
      const res = await fetch(url);
      const code = await res.text();
      for (const p of patterns) {
        if (p.regex.test(code)) {
          console.log(`WARNING: Match found in script [${url}] for pattern: ${p.name}`);
        }
      }
    } catch (err) {
      console.error(`Failed to fetch script ${url}:`, err.message);
    }
  }

  console.log('Bundle secret scan complete.');

  await browser.close();
}

audit().catch(console.error);
