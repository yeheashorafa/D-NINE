import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

vi.mock('next-sanity/webhook', () => ({
  parseBody: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
}));

vi.mock('@/sanity/env', () => ({
  revalidateSecret: 'test-secret',
}));

describe('Webhook Revalidation Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 401 for invalid signature', async () => {
    (parseBody as any).mockResolvedValueOnce({
      isValidSignature: false,
      body: {},
    });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(401);
    
    const data = await response.json();
    expect(data.message).toBe('Invalid webhook signature');
  });

  it('should return 422 for invalid payload', async () => {
    (parseBody as any).mockResolvedValueOnce({
      isValidSignature: true,
      body: { invalidField: true },
    });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(422);
    
    const data = await response.json();
    expect(data.message).toBe('Invalid payload structure');
  });

  it('should return 200 and revalidate mapped document type', async () => {
    (parseBody as any).mockResolvedValueOnce({
      isValidSignature: true,
      body: { _type: 'aboutPage' },
    });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.revalidated).toBe(true);
    expect(data.tags).toContain('about-page');
  });

  it('should ignore unmapped document types', async () => {
    (parseBody as any).mockResolvedValueOnce({
      isValidSignature: true,
      body: { _type: 'unmappedType' },
    });

    const req = new NextRequest('http://localhost:3000/api/revalidate', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.revalidated).toBe(false);
    expect(data.message).toContain('Ignored unmapped document type');
  });
});
