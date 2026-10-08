import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(currentDir, '..');

const isProd = process.env.NODE_ENV === 'production';

const publicCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io https://*.api.sanity.io wss://*.sanity.io",
  "media-src 'self' data: blob: https://cdn.sanity.io",
  // Presentation Tool embeds public pages from the same-origin /dashboard Studio.
  // NOTE: frame-ancestors is ignored in Report-Only CSP; X-Frame-Options enforces framing.
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const dashboardCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io https://*.api.sanity.io wss://*.sanity.io https://*.sanity.work",
  "media-src 'self' data: blob: https://cdn.sanity.io",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "frame-src 'self' blob: https://*.sanity.io",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const permissionsPolicy =
  'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()';

const hstsHeader = {
  key: 'Strict-Transport-Security',
  value: 'max-age=31536000; includeSubDomains',
};

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: monorepoRoot,
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/dashboard/:path*',
        headers: [
          ...(isProd ? [hstsHeader] : []),
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: permissionsPolicy },
          { key: 'Content-Security-Policy-Report-Only', value: dashboardCsp },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          ...(isProd ? [hstsHeader] : []),
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
      {
        source: '/:path((?!dashboard|api).*)',
        headers: [
          ...(isProd ? [hstsHeader] : []),
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: permissionsPolicy },
          { key: 'Content-Security-Policy-Report-Only', value: publicCsp },
        ],
      },
    ];
  },

  experimental: {
    staticGenerationRetryCount: 3,
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 100,
  },
  images: {
    qualities: [60, 75, 90, 95],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
