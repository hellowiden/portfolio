// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/', '/dashboard/:path*', '/about', '/experiences/:path*'],
};

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Om användaren är inloggad, blockera åtkomst till "/login" och "/register"
  if (
    token &&
    (req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/register'))
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Om användaren INTE är inloggad, blockera skyddade sidor
  if (
    !token &&
    config.matcher.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
