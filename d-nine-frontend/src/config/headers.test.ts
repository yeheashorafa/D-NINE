import { describe, it, expect, vi } from 'vitest';
import nextConfig from '../../next.config';

describe('Production Security Headers Configuration', () => {
  it('disables poweredByHeader', () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it('defines headers function returning security header rules', async () => {
    expect(typeof nextConfig.headers).toBe('function');
    const headerRules = await nextConfig.headers!();

    expect(headerRules.length).toBeGreaterThanOrEqual(3);

    const dashboardRule = headerRules.find((r) => r.source.includes('dashboard'));
    const apiRule = headerRules.find((r) => r.source.includes('api'));
    const publicRule = headerRules.find((r) => r.source.includes('(?!dashboard|api)'));

    expect(dashboardRule).toBeDefined();
    expect(apiRule).toBeDefined();
    expect(publicRule).toBeDefined();

    // Check Public Headers
    const publicHeaders = publicRule!.headers;
    const xContentType = publicHeaders.find((h) => h.key === 'X-Content-Type-Options');
    const referrer = publicHeaders.find((h) => h.key === 'Referrer-Policy');
    const xFrame = publicHeaders.find((h) => h.key === 'X-Frame-Options');
    const permissions = publicHeaders.find((h) => h.key === 'Permissions-Policy');
    const csp = publicHeaders.find((h) => h.key === 'Content-Security-Policy-Report-Only');

    expect(xContentType?.value).toBe('nosniff');
    expect(referrer?.value).toBe('strict-origin-when-cross-origin');
    // SAMEORIGIN (not DENY): Presentation Tool frames public pages from same-origin /dashboard
    expect(xFrame?.value).toBe('SAMEORIGIN');
    expect(permissions?.value).toContain('camera=()');
    expect(csp?.value).toContain("default-src 'self'");
    expect(csp?.value).not.toContain("'unsafe-eval'"); // No unsafe-eval on public pages

    // Check Dashboard Headers
    const dashboardHeaders = dashboardRule!.headers;
    const dashboardCsp = dashboardHeaders.find((h) => h.key === 'Content-Security-Policy-Report-Only');
    const dashboardFrame = dashboardHeaders.find((h) => h.key === 'X-Frame-Options');
    expect(dashboardCsp?.value).toContain("'unsafe-eval'"); // Needed for Sanity Studio compilation
    const frameAncestorsDirective = dashboardCsp?.value
      .split(';')
      .map((s) => s.trim())
      .find((s) => s.startsWith('frame-ancestors'));
    expect(frameAncestorsDirective).toBe("frame-ancestors 'self'");
    expect(dashboardCsp?.value).not.toMatch(/frame-ancestors[^;]*\*/); // No wildcard frame ancestors
    expect(dashboardCsp?.value).not.toMatch(/frame-src[^;]*\shttps:(\s|;|$)/);
    expect(dashboardFrame?.value).toBe('SAMEORIGIN');
    expect(dashboardHeaders.find((h) => h.key === 'Permissions-Policy')?.value).toContain('camera=()');
    expect(dashboardHeaders.find((h) => h.key === 'Strict-Transport-Security')).toBeUndefined();

    // Check API Headers
    const apiHeaders = apiRule!.headers;
    const cacheControl = apiHeaders.find((h) => h.key === 'Cache-Control');
    expect(cacheControl?.value).toBe('no-store, max-age=0');
    // API routes must not declare framing permissions (X-Frame-Options should be absent or DENY, but not allow third-party)
    expect(apiHeaders.find((h) => h.key === 'X-Frame-Options')).toBeUndefined();
    expect(apiHeaders.find((h) => h.key === 'Content-Security-Policy-Report-Only')).toBeUndefined();
  });

  it('emits HSTS only in production', async () => {
    const original = process.env.NODE_ENV;
    try {
      vi.stubEnv('NODE_ENV', 'production');
      vi.resetModules();
      const prod = (await import('../../next.config')).default;
      const prodRules = await prod.headers!();
      for (const rule of prodRules) {
        const hsts = rule.headers.find((h) => h.key === 'Strict-Transport-Security');
        expect(hsts?.value).toBe('max-age=31536000; includeSubDomains');
        expect(hsts?.value).not.toContain('preload');
      }

      vi.stubEnv('NODE_ENV', 'development');
      vi.resetModules();
      const dev = (await import('../../next.config')).default;
      const devRules = await dev.headers!();
      for (const rule of devRules) {
        expect(rule.headers.find((h) => h.key === 'Strict-Transport-Security')).toBeUndefined();
      }
    } finally {
      vi.stubEnv('NODE_ENV', original as string);
      vi.unstubAllEnvs();
    }
  });
});
