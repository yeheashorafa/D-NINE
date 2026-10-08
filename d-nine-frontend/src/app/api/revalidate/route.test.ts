import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { revalidateTag, revalidatePath } from 'next/cache';

vi.mock('next-sanity/webhook', () => ({
  parseBody: vi.fn(),
}));

const mockParseBody = vi.mocked(parseBody);

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
  revalidatePath: vi.fn(),
}));

vi.mock('@/sanity/env', () => ({
  revalidateSecret: 'test-secret',
}));

describe('Webhook Revalidation Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- 1. Content-Type & Payload Limits ---

  it('should return 415 for non-JSON content-type', async () => {
    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: 'plain text',
    });

    const response = await POST(req);
    expect(response.status).toBe(415);
    expect(response.headers.get('Cache-Control')).toBe('no-store, max-age=0');
  });

  it('should return 413 when declared Content-Length > 64 KB', async () => {
    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': '70000',
      },
      body: JSON.stringify({ _type: 'aboutPage' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(413);
    expect(mockParseBody).not.toHaveBeenCalled();
  });

  it('should return 413 when Content-Length is missing but actual body > 64 KB', async () => {
    const largeBody = 'a'.repeat(65 * 1024);
    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: largeBody,
    });

    const response = await POST(req);
    expect(response.status).toBe(413);
    expect(mockParseBody).not.toHaveBeenCalled();
  });

  it('should return 413 when Content-Length is falsified small but actual stream > 64 KB', async () => {
    // NextRequest headers might declare small length while body stream produces > 64 KB
    const stream = new ReadableStream({
      start(controller) {
        const chunk = new Uint8Array(20 * 1024); // 20 KB
        controller.enqueue(chunk);
        controller.enqueue(chunk);
        controller.enqueue(chunk);
        controller.enqueue(chunk); // 80 KB total > 64 KB
        controller.close();
      },
    });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': '100', // falsified small header
      },
      body: stream as unknown as BodyInit,
    });

    const response = await POST(req);
    expect(response.status).toBe(413);
    expect(mockParseBody).not.toHaveBeenCalled();
  });

  it('allows body exactly at the 64 KB boundary', async () => {
    mockParseBody.mockResolvedValueOnce({
      isValidSignature: true,
      body: { _type: 'aboutPage' },
    });

    const exactBody = ' '.repeat(64 * 1024 - 25) + JSON.stringify({ _type: 'aboutPage' });
    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': String(Buffer.byteLength(exactBody)),
      },
      body: exactBody,
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
    expect(mockParseBody).toHaveBeenCalled();
  });

  it('handles missing body safely', async () => {
    mockParseBody.mockResolvedValueOnce({
      isValidSignature: true,
      body: null,
    });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST(req);
    expect(response.status).toBe(422);
    expect(await response.text()).toBe('Invalid payload');
  });

  // --- 2. Signature & Secret Authentication ---

  it('should return 401 for invalid signature', async () => {
    mockParseBody.mockResolvedValueOnce({
      isValidSignature: false,
      body: {},
    });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(401);
    const text = await response.text();
    expect(text).toBe('Unauthorized');
    expect(text).not.toContain('test-secret');
    expect(response.headers.get('Cache-Control')).toBe('no-store, max-age=0');
  });

  // --- 3. Whitelist Enforcement & Unknown Types (422) ---

  it('should return 422 for random unknown document types', async () => {
    mockParseBody.mockResolvedValueOnce({
      isValidSignature: true,
      body: { _type: 'unknownRandomType' },
    });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ _type: 'unknownRandomType' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(422);
    expect(await response.text()).toBe('Invalid payload');
    expect(revalidateTag).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it('should return 422 for prototype injection attempts (__proto__, constructor, prototype)', async () => {
    const maliciousTypes = ['__proto__', 'constructor', 'prototype'];

    for (const badType of maliciousTypes) {
      mockParseBody.mockResolvedValueOnce({
        isValidSignature: true,
        body: { _type: badType },
      });

      const req = new NextRequest('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ _type: badType }),
      });

      const response = await POST(req);
      expect(response.status).toBe(422);
      expect(await response.text()).toBe('Invalid payload');
      expect(revalidateTag).not.toHaveBeenCalled();
      expect(revalidatePath).not.toHaveBeenCalled();
    }
  });

  it('should return 422 for empty or non-string document types', async () => {
    const badTypes = ['', 123, null, false, {}];

    for (const badType of badTypes) {
      mockParseBody.mockResolvedValueOnce({
        isValidSignature: true,
        body: { _type: badType },
      });

      const req = new NextRequest('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ _type: badType }),
      });

      const response = await POST(req);
      expect(response.status).toBe(422);
      expect(await response.text()).toBe('Invalid payload');
      expect(revalidateTag).not.toHaveBeenCalled();
      expect(revalidatePath).not.toHaveBeenCalled();
    }
  });

  it('should return 422 for unexpected fields in payload', async () => {
    mockParseBody.mockResolvedValueOnce({
      isValidSignature: true,
      body: { _type: 'service', extraField: 'not-allowed' },
    });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(422);
    expect(await response.text()).toBe('Invalid payload');
  });

  it('should return 422 for malicious slug injection attempt', async () => {
    mockParseBody.mockResolvedValueOnce({
      isValidSignature: true,
      body: {
        _type: 'service',
        slug: { current: '../../etc/passwd' },
      },
    });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(422);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  // --- 4. Supported Types & Successful Revalidation ---

  it('should return 200 and revalidate mapped document type (supported type)', async () => {
    mockParseBody.mockResolvedValueOnce({
      isValidSignature: true,
      body: { _type: 'aboutPage' },
    });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ _type: 'aboutPage' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.revalidated).toBe(true);
    expect(data.tags).toContain('about-page');
    expect(response.headers.get('Cache-Control')).toBe('no-store, max-age=0');
    expect(revalidateTag).toHaveBeenCalledWith('about-page', 'max');
    expect(revalidatePath).toHaveBeenCalledWith('/ar/about', 'page');
    expect(revalidatePath).toHaveBeenCalledWith('/en/about', 'page');
  });

  it('accepts Arabic slugs and revalidates both locales', async () => {
    mockParseBody.mockResolvedValueOnce({
      isValidSignature: true,
      body: { _type: 'service', slug: { current: 'تصميم-الهوية' } },
    });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{}',
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith('service:تصميم-الهوية', 'max');
    expect(revalidatePath).toHaveBeenCalledWith('/ar/services/تصميم-الهوية', 'page');
    expect(revalidatePath).toHaveBeenCalledWith('/en/services/تصميم-الهوية', 'page');
  });

  it('should revalidate both AR and EN paths for project document with slug', async () => {
    mockParseBody.mockResolvedValueOnce({
      isValidSignature: true,
      body: { _type: 'project', slug: { current: 'test-project' } },
    });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith('project:test-project', 'max');
    expect(revalidatePath).toHaveBeenCalledWith('/ar/work/test-project', 'page');
    expect(revalidatePath).toHaveBeenCalledWith('/en/work/test-project', 'page');
  });

  // --- 5. Generic Error Handling ---

  it('returns generic 500 when parseBody or cache revalidation throws', async () => {
    mockParseBody.mockRejectedValueOnce(new Error('Internal unexpected failure'));

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(500);
    const text = await response.text();
    expect(text).toBe('Internal server error');
    expect(text).not.toContain('Internal unexpected failure');
    expect(text).not.toContain('test-secret');
  });
});
