import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';
import { NextRequest } from 'next/server';
import { validatePreviewUrl } from '@sanity/preview-url-secret';

vi.mock('next/headers', () => ({
  draftMode: vi.fn().mockResolvedValue({
    isEnabled: false,
    enable: vi.fn(),
    disable: vi.fn(),
  }),
}));

vi.mock('@sanity/preview-url-secret', () => ({
  validatePreviewUrl: vi.fn(),
}));

vi.mock('@/sanity/client', () => ({
  client: {
    withConfig: vi.fn().mockReturnThis(),
  },
}));

vi.mock('@/sanity/env', () => ({
  readToken: 'mock-read-token',
}));

describe('Draft Mode Enable Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects missing or invalid secret with generic 401', async () => {
    vi.mocked(validatePreviewUrl).mockResolvedValueOnce({
      isValid: false,
    });

    const req = new NextRequest('http://localhost:3000/api/draft-mode/enable?secret=invalid');
    const res = await GET(req);

    expect(res.status).toBe(401);
    const text = await res.text();
    expect(text).toBe('Invalid secret');
    expect(text).not.toContain('mock-read-token');
    expect(res.headers.get('Cache-Control')).toBe('no-store, max-age=0');
  });

  it('rejects when validatePreviewUrl throws', async () => {
    vi.mocked(validatePreviewUrl).mockRejectedValueOnce(new Error('Sanity query failed'));

    const req = new NextRequest('http://localhost:3000/api/draft-mode/enable?secret=invalid');
    const res = await GET(req);

    expect(res.status).toBe(401);
    expect(await res.text()).toBe('Invalid secret');
  });

  it('activates draft mode and redirects to safe internal Arabic path', async () => {
    vi.mocked(validatePreviewUrl).mockResolvedValueOnce({
      isValid: true,
      redirectTo: '/ar/services/branding',
    });

    const req = new NextRequest('http://localhost:3000/api/draft-mode/enable?secret=valid');
    const res = await GET(req);

    expect(res.status).toBe(307);
    const location = res.headers.get('Location');
    expect(location).toContain('/ar/services/branding');
    expect(location).not.toContain('mock-read-token');
    expect(location).not.toContain('valid');
    expect(res.headers.get('Cache-Control')).toBe('no-store, max-age=0');
  });

  it('activates draft mode and redirects to safe internal English path with query params', async () => {
    vi.mocked(validatePreviewUrl).mockResolvedValueOnce({
      isValid: true,
      redirectTo: '/en/work/project-1?preview=true#details',
    });

    const req = new NextRequest('http://localhost:3000/api/draft-mode/enable?secret=valid');
    const res = await GET(req);

    expect(res.status).toBe(307);
    const location = res.headers.get('Location');
    expect(location).toContain('/en/work/project-1?preview=true#details');
  });

  it('prevents external absolute URL open redirect attempts', async () => {
    vi.mocked(validatePreviewUrl).mockResolvedValueOnce({
      isValid: true,
      redirectTo: 'https://attacker.com/evil',
    });

    const req = new NextRequest('http://localhost:3000/api/draft-mode/enable?secret=valid');
    const res = await GET(req);

    expect(res.status).toBe(307);
    const location = res.headers.get('Location');
    expect(location).not.toContain('attacker.com');
    expect(new URL(location!).pathname).toBe('/');
  });

  it('prevents protocol-relative URL open redirect attempts', async () => {
    vi.mocked(validatePreviewUrl).mockResolvedValueOnce({
      isValid: true,
      redirectTo: '//attacker.com/evil',
    });

    const req = new NextRequest('http://localhost:3000/api/draft-mode/enable?secret=valid');
    const res = await GET(req);

    expect(res.status).toBe(307);
    const location = res.headers.get('Location');
    expect(location).not.toContain('attacker.com');
    expect(new URL(location!).pathname).toBe('/');
  });

  it('prevents encoded protocol-relative /%2f open redirect attempts', async () => {
    vi.mocked(validatePreviewUrl).mockResolvedValueOnce({
      isValid: true,
      redirectTo: '/%2f%2fattacker.com',
    });

    const req = new NextRequest('http://localhost:3000/api/draft-mode/enable?secret=valid');
    const res = await GET(req);

    expect(res.status).toBe(307);
    const location = res.headers.get('Location');
    expect(location).not.toContain('attacker.com');
    expect(new URL(location!).pathname).toBe('/');
  });

  it('prevents backslash open redirect attempts', async () => {
    vi.mocked(validatePreviewUrl).mockResolvedValueOnce({
      isValid: true,
      redirectTo: '/\\attacker.com',
    });

    const req = new NextRequest('http://localhost:3000/api/draft-mode/enable?secret=valid');
    const res = await GET(req);

    expect(res.status).toBe(307);
    const location = res.headers.get('Location');
    expect(location).not.toContain('attacker.com');
    expect(new URL(location!).pathname).toBe('/');
  });

  it('prevents CRLF header injection attempts in target path', async () => {
    vi.mocked(validatePreviewUrl).mockResolvedValueOnce({
      isValid: true,
      redirectTo: '/ar\r\nSet-Cookie:bad=1',
    });

    const req = new NextRequest('http://localhost:3000/api/draft-mode/enable?secret=valid');
    const res = await GET(req);

    expect(res.status).toBe(307);
    const location = res.headers.get('Location');
    expect(location).not.toContain('Set-Cookie');
    expect(new URL(location!).pathname).toBe('/');
  });
});
