import { draftMode } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Strictly sanitizes internal redirect paths.
 */
function sanitizeInternalPath(path: string | null | undefined, fallback = '/'): string {
  if (!path || typeof path !== 'string') return fallback;
  const trimmed = path.trim();

  if (!trimmed.startsWith('/') || trimmed.startsWith('//') || trimmed.includes('\\') || /[\r\n\0]/.test(trimmed)) {
    return fallback;
  }

  let decoded: string;
  try {
    decoded = decodeURIComponent(trimmed);
  } catch {
    return fallback;
  }

  if (!decoded.startsWith('/') || decoded.startsWith('//') || decoded.includes('\\') || /[\r\n\0]/.test(decoded)) {
    return fallback;
  }

  try {
    const parsed = new URL(trimmed, 'http://localhost');
    if (parsed.origin !== 'http://localhost') return fallback;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();

  // Validate redirect query parameter if provided, else default to root
  const requestedPath = request.nextUrl.searchParams.get('slug') || request.nextUrl.searchParams.get('path');
  const safePath = sanitizeInternalPath(requestedPath, '/');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '')
    : request.nextUrl.origin;

  const targetUrl = new URL(safePath, siteUrl);

  const response = NextResponse.redirect(targetUrl);
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  return response;
}
