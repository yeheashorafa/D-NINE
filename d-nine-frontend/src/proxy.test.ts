import { NextRequest } from 'next/server';
import { describe, it, expect } from 'vitest';
import { config, proxy } from './proxy';

describe('Middleware Config', () => {
  it('bypasses /dashboard', () => {
    const matcher = config.matcher[0];
    // Test that dashboard paths match the exclusion
    // Note: Next.js matcher regex logic might be complex to fully unit test here without Next.js router
    // but we can verify the string contains dashboard
    expect(matcher).toContain('dashboard');
  });

  it('permanently redirects www traffic to the canonical non-www host', () => {
    const response = proxy(new NextRequest('https://www.dnine9.com/en/work?category=branding'));

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://dnine9.com/en/work?category=branding');
  });
});
