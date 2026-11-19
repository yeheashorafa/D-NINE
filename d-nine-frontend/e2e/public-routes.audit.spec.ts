import { test, expect } from '@playwright/test';

// Run against an isolated staging environment containing test content.
const pages = ['', 'about', 'services', 'work', 'blog', 'contact', 'privacy', 'terms'];
for (const locale of ['ar', 'en']) {
  for (const section of pages) {
    const pathname = `/${locale}${section ? `/${section}` : ''}`;
    test(`${pathname} responds without a server error and has a visible H1`, async ({ page }) => {
      const response = await page.goto(pathname);
      expect(response).not.toBeNull();
      expect(response!.status()).toBeLessThan(500);
      await expect(page.locator('h1').first()).toBeVisible();
      expect(await page.locator('html').getAttribute('lang')).toBe(locale);
      expect(await page.locator('html').getAttribute('dir')).toBe(locale === 'ar' ? 'rtl' : 'ltr');
      await expect(page.locator('body')).not.toContainText('Internal Server Error');
    });
  }
}

test('public page has no obvious dead same-origin links', async ({ page, request }) => {
  await page.goto('/ar');
  const paths = await page.locator('a[href]').evaluateAll(anchors =>
    [...new Set(anchors.map(a => (a as HTMLAnchorElement).getAttribute('href') || ''))]
      .filter(href => href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/#'))
  );
  for (const path of paths.slice(0, 75)) {
    const response = await request.get(path, { maxRedirects: 5 });
    expect(response.status(), path).toBeLessThan(400);
  }
});

test('contact form renders accessible names on all fields', async ({ page }) => {
  await page.goto('/en/contact');
  for (const selector of ['input[name="fullName"]', 'input[name="email"]', 'select[name="serviceSlug"]', 'textarea[name="message"]']) {
    const el = page.locator(selector);
    await expect(el).toBeVisible();
    const id = await el.getAttribute('id');
    const ariaLabel = await el.getAttribute('aria-label');
    const ariaLabelledby = await el.getAttribute('aria-labelledby');
    const hasLabel = id ? (await page.locator(`label[for="${id}"]`).count()) > 0 : false;
    expect(Boolean(ariaLabel || ariaLabelledby || hasLabel), selector).toBe(true);
  }
});
