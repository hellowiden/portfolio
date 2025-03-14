//src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (
    !token &&
    config.matcher.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/about', '/experiences/:path*'],
};
