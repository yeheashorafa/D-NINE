import { draftMode } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { client } from '@/sanity/client';
import { readToken } from '@/sanity/env';

/**
 * Strictly sanitizes an internal target path.
 * Rejects protocol-relative URLs, absolute URLs, backslashes, CRLF, and malformed encoding.
 */
function sanitizeInternalPath(path: string | null | undefined, fallback = '/'): string {
  if (!path || typeof path !== 'string') return fallback;
  const trimmed = path.trim();

  // Must begin with a single slash, not protocol-relative '//', no backslashes, no CRLF/control chars
  if (!trimmed.startsWith('/') || trimmed.startsWith('//') || trimmed.includes('\\') || /[\r\n\0]/.test(trimmed)) {
    return fallback;
  }

  // Double check decoded string to prevent encoded open redirects (e.g. /%2f or /%5c)
  let decoded: string;
  try {
    decoded = decodeURIComponent(trimmed);
  } catch {
    return fallback;
  }

  if (!decoded.startsWith('/') || decoded.startsWith('//') || decoded.includes('\\') || /[\r\n\0]/.test(decoded)) {
    return fallback;
  }

  // Parse against dummy localhost origin to ensure it is purely path + search + hash without hostname change
  try {
    const parsed = new URL(trimmed, 'http://localhost');
    if (parsed.origin !== 'http://localhost') return fallback;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}

export async function GET(request: NextRequest) {
  // Validate request with client token
  const clientWithToken = client.withConfig({ token: readToken });

  let validationResult: { isValid: boolean; redirectTo?: string };
  try {
    validationResult = await validatePreviewUrl(clientWithToken, request.url);
  } catch {
    return new NextResponse('Invalid secret', {
      status: 401,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  }

  const { isValid, redirectTo } = validationResult;
  if (!isValid) {
    return new NextResponse('Invalid secret', {
      status: 401,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  }

  const safePath = sanitizeInternalPath(redirectTo, '/');

  const draft = await draftMode();
  draft.enable();

  // Resolve base origin from trusted request or NEXT_PUBLIC_SITE_URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '')
    : request.nextUrl.origin;

  const targetUrl = new URL(safePath, siteUrl);

  const response = NextResponse.redirect(targetUrl);
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  return response;
}
