import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const USER_AUTH_COOKIE = 'tw_user_token';
export const USER_ROLE_COOKIE = 'tw_user_role';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get(USER_AUTH_COOKIE)?.value;
  const userRole = request.cookies.get(USER_ROLE_COOKIE)?.value;

  const isCustomerRoute = pathname.startsWith('/customer');
  const isVendorRoute = pathname.startsWith('/vendor') && !pathname.startsWith('/vendor/register');
  const isAuthPage = pathname.startsWith('/auth');

  // 1. Guard Customer Portal: require login
  if (isCustomerRoute && !authToken) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Guard Vendor Portal: require login AND vendor role
  if (isVendorRoute) {
    if (!authToken) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      loginUrl.searchParams.set('role', 'vendor');
      return NextResponse.redirect(loginUrl);
    }

    if (userRole !== 'vendor') {
      // Customer trying to access vendor portal -> redirect to customer dashboard
      return NextResponse.redirect(new URL('/customer/dashboard', request.url));
    }
  }

  // 3. Prevent logged in user from hitting auth page again
  if (isAuthPage && authToken) {
    const destination = userRole === 'vendor' ? '/vendor/dashboard' : '/customer/dashboard';
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/customer/:path*',
    '/vendor/dashboard/:path*',
    '/vendor/bookings/:path*',
    '/vendor/enquiries/:path*',
    '/vendor/quotations/:path*',
    '/vendor/services/:path*',
    '/vendor/payments/:path*',
    '/vendor/packages/:path*',
    '/vendor/availability/:path*',
    '/vendor/verification/:path*',
    '/vendor/settings/:path*',
    '/auth/:path*',
  ],
};
