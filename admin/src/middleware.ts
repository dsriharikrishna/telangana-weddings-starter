import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const ADMIN_AUTH_COOKIE = 'tw_admin_token';

// Routes that require an authenticated session
const PROTECTED_PREFIXES = [
  '/dashboard',
  '/vendors',
  '/vendor-verification',
  '/customers',
  '/categories',
  '/subcategories',
  '/locations',
  '/enquiries',
  '/bookings',
  '/payments',
  '/commissions',
  '/disputes',
  '/reports',
  '/settings',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  const isAuthPage =
    pathname === '/auth/login' ||
    pathname === '/auth/register' ||
    pathname === '/auth/verify-otp';

  // 1. If trying to access protected route without auth token -> Redirect to login
  if (isProtected && !authToken) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If logged in and visiting login/auth pages -> Redirect to dashboard
  if (isAuthPage && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
