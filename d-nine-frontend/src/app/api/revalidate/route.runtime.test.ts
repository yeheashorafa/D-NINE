import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import crypto from 'node:crypto';
import { NextRequest } from 'next/server';

// Mock next/cache so that revalidateTag/Path don't fail in node test environment
vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
  revalidatePath: vi.fn(),
}));

describe('Revalidation Runtime Behavior (Real Webhook Cryptographic Verification)', () => {
  const TEST_SECRET = 'my-super-secret-test-key-32-bytes-long!';
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...OLD_ENV, SANITY_REVALIDATE_SECRET: TEST_SECRET };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  function createValidSanitySignature(payload: string, secret: string, timestamp = Date.now()): string {
    const enc = new TextEncoder();
    const signaturePayload = `${timestamp}.${payload}`;
    const hmac = crypto.createHmac('sha256', enc.encode(secret));
    hmac.update(enc.encode(signaturePayload));
    const digest = hmac.digest();
    const base64Url = Buffer.from(digest)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    return `t=${timestamp},v1=${base64Url}`;
  }

  it('secret configured + no signature -> 401', async () => {
    const { POST } = await import('./route');
    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ _type: 'aboutPage' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    const text = await res.text();
    expect(text).toBe('Unauthorized');
    expect(text).not.toContain(TEST_SECRET);
  });

  it('secret configured + invalid signature -> 401', async () => {
    const { POST } = await import('./route');
    const bodyStr = JSON.stringify({ _type: 'aboutPage' });
    const fakeSignature = `t=${Date.now()},v1=invalid_fake_signature_hash`;

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'sanity-webhook-signature': fakeSignature,
      },
      body: bodyStr,
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    const text = await res.text();
    expect(text).toBe('Unauthorized');
    expect(text).not.toContain(TEST_SECRET);
  });

  it('correct test signature -> expected success (200)', async () => {
    const { POST } = await import('./route');
    const bodyStr = JSON.stringify({ _type: 'aboutPage' });
    const validSignature = createValidSanitySignature(bodyStr, TEST_SECRET);

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'sanity-webhook-signature': validSignature,
      },
      body: bodyStr,
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.revalidated).toBe(true);
    expect(json.documentType).toBe('aboutPage');
    expect(JSON.stringify(json)).not.toContain(TEST_SECRET);
  });

  it('secret missing from server configuration -> generic 500 configuration error', async () => {
    delete process.env.SANITY_REVALIDATE_SECRET;
    const { POST } = await import('./route');
    const bodyStr = JSON.stringify({ _type: 'aboutPage' });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: bodyStr,
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const text = await res.text();
    expect(text).toBe('Internal Configuration Error');
    expect(text).not.toContain(TEST_SECRET);
  });

  it('no secret or signature appears in body, headers, redirects or captured logs', async () => {
    const { POST } = await import('./route');
    const bodyStr = JSON.stringify({ _type: 'aboutPage' });
    const signature = createValidSanitySignature(bodyStr, TEST_SECRET);

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'sanity-webhook-signature': signature,
      },
      body: bodyStr,
    });

    const res = await POST(req);
    const headersObj: Record<string, string> = {};
    res.headers.forEach((v, k) => {
      headersObj[k] = v;
    });

    const headersString = JSON.stringify(headersObj);
    expect(headersString).not.toContain(TEST_SECRET);
    expect(headersString).not.toContain(signature);

    const bodyText = await res.text();
    expect(bodyText).not.toContain(TEST_SECRET);
    expect(bodyText).not.toContain(signature);
  });
});
