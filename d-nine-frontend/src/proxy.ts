import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const handleRequest = createMiddleware(routing);

export function proxy(request: NextRequest) {
  if (request.nextUrl.hostname === 'www.dnine9.com') {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.hostname = 'dnine9.com';
    return NextResponse.redirect(canonicalUrl, 301);
  }

  return handleRequest(request);
}

export default proxy;

export const config = {
  matcher: ['/((?!api|_next|_static|_vercel|dashboard|brand|.*\\..*).*)', '/']
};
