import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';
import { NextRequest } from 'next/server';

vi.mock('next/headers', () => ({
  draftMode: vi.fn().mockResolvedValue({
    isEnabled: true,
    enable: vi.fn(),
    disable: vi.fn(),
  }),
}));

describe('Draft Mode Disable Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('disables draft mode and redirects to default root when no path is provided', async () => {
    const req = new NextRequest('http://localhost:3000/api/draft-mode/disable');
    const res = await GET(req);

    expect(res.status).toBe(307);
    expect(res.headers.get('Location')).toBe('http://localhost:3000/');
    expect(res.headers.get('Cache-Control')).toBe('no-store, max-age=0');
  });

  it('redirects to validated internal path if slug parameter is provided', async () => {
    const req = new NextRequest('http://localhost:3000/api/draft-mode/disable?slug=/ar/services');
    const res = await GET(req);

    expect(res.status).toBe(307);
    expect(res.headers.get('Location')).toBe('http://localhost:3000/ar/services');
  });

  it('neutralizes external URL redirect attempts to root', async () => {
    const req = new NextRequest('http://localhost:3000/api/draft-mode/disable?slug=https://attacker.com');
    const res = await GET(req);

    expect(res.status).toBe(307);
    expect(res.headers.get('Location')).toBe('http://localhost:3000/');
  });

  it('neutralizes protocol-relative URL redirect attempts to root', async () => {
    const req = new NextRequest('http://localhost:3000/api/draft-mode/disable?slug=//attacker.com');
    const res = await GET(req);

    expect(res.status).toBe(307);
    expect(res.headers.get('Location')).toBe('http://localhost:3000/');
  });

  it('neutralizes backslash redirect attempts', async () => {
    const req = new NextRequest('http://localhost:3000/api/draft-mode/disable?slug=/\\attacker.com');
    const res = await GET(req);

    expect(res.status).toBe(307);
    expect(res.headers.get('Location')).toBe('http://localhost:3000/');
  });
});
