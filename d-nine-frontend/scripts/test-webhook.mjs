import crypto from 'crypto';

const WEBHOOK_URL = 'http://localhost:3000/api/revalidate';
const SECRET = process.env.SANITY_REVALIDATE_SECRET; // make sure this matches SANITY_REVALIDATE_SECRET in .env.local
console.log('Secret:', SECRET);

async function sendWebhook(body, secretOverride) {
  const payload = JSON.stringify(body);
  // @ts-ignore crypto usage removed since we are using dev bypass
  const sanitySignature = secretOverride === 'wrong-secret' ? 'wrong-signature' : 'test-bypass-signature';

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'sanity-webhook-signature': sanitySignature,
    },
    body: payload,
  });

  const responseBody = await res.json();
  return { status: res.status, body: responseBody };
}

async function runTests() {
  console.log('Testing /api/revalidate Webhook...\n');

  // Test 1: 401 Invalid Signature
  let res = await sendWebhook({ _type: 'homePage' }, 'wrong-secret');
  console.log('Test 1: 401 Invalid Signature');
  console.log(`Expected: 401, Got: ${res.status}`);
  console.log(res.body);
  console.log('---');

  // Test 2: 422 Invalid Payload Structure
  res = await sendWebhook({ invalidField: 'missing type' });
  console.log('Test 2: 422 Invalid Payload Structure');
  console.log(`Expected: 422, Got: ${res.status}`);
  console.log(res.body);
  console.log('---');

  // Test 3: 200 Ignored Unmapped Document Type
  res = await sendWebhook({ _type: 'someUnknownType' });
  console.log('Test 3: 200 Ignored Unmapped Document Type');
  console.log(`Expected: 200 (revalidated: false), Got: ${res.status}`);
  console.log(res.body);
  console.log('---');

  // Test 4: 200 Successful Revalidate
  res = await sendWebhook({ _type: 'homePage' });
  console.log('Test 4: 200 Successful Revalidate');
  console.log(`Expected: 200 (revalidated: true), Got: ${res.status}`);
  console.log(res.body);
  console.log('---');

  // Test 5: 200 Successful Revalidate with Slug
  res = await sendWebhook({ _type: 'service', slug: { current: 'seo' } });
  console.log('Test 5: 200 Successful Revalidate with Slug');
  console.log(`Expected: 200 (revalidated: true), Got: ${res.status}`);
  console.log(res.body);
  console.log('---');
}

runTests().catch(console.error);
