//src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  console.log('Middleware Running: ', req.nextUrl.pathname); // Debugging log

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedRoutes = ['/', '/dashboard/:path*', '/about'];

  if (
    !token &&
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    console.log('Redirecting to login:', req.nextUrl.pathname);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/about', '/experiences/:path*'],
};
