import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('SMTP security configuration', () => {
  it('parses the environment string "false" as the boolean false', async () => {
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('DATABASE_URL', 'postgresql://audit:audit@127.0.0.1:5432/audit');
    vi.stubEnv('FRONTEND_ORIGINS', 'http://localhost:3000');
    vi.stubEnv('SMTP_SECURE', 'false');
    vi.stubEnv('IP_HASH_SALT', 'audit-only-salt-with-at-least-16-chars');
    vi.resetModules();
    const { env } = await import('../config/env.js');
    expect(env.SMTP_SECURE).toBe(false);
  });
});
