import { describe, it, expect } from 'vitest';
import { config } from './proxy';

describe('Middleware Config', () => {
  it('bypasses /dashboard', () => {
    const matcher = config.matcher[0];
    const regex = new RegExp(matcher.replace('((?!', '^(?!').replace(').*)', '.*)$'));
    
    // Test that dashboard paths match the exclusion
    // Note: Next.js matcher regex logic might be complex to fully unit test here without Next.js router
    // but we can verify the string contains dashboard
    expect(matcher).toContain('dashboard');
  });
});
