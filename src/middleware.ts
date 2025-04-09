// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    '/',
    '/about',
    '/legal',
    '/dashboard/:path*',
    '/profile',
    '/experiences/:path*',
  ],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const publicPaths = ['/', '/about', '/legal'];

  // Allow public routes
  if (publicPaths.includes(pathname)) return NextResponse.next();

  // Redirect if not logged in
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const roles = token.roles || [];

  // Deny guests access to protected pages
  if (roles.includes('guest') && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
