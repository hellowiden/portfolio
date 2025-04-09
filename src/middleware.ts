// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_ROUTES = ['/login', '/register', '/about', '/legal'];

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const path = pathname.toLowerCase().replace(/\/$/, '');

  const isPublic = PUBLIC_ROUTES.includes(path);
  const isAuthPage = ['/login', '/register'].includes(path);

  const token = isPublic
    ? null
    : await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
