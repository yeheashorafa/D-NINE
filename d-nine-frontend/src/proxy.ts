import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleRequest = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handleRequest(request);
}

export default proxy;

export const config = {
  matcher: ['/((?!api|_next|_static|_vercel|dashboard|brand|.*\\..*).*)', '/']
};
