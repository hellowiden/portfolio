// src/proxy.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/about',
    '/profile',
    '/experiences/:path*',
    '/login',
    '/register',
  ],
};

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!token && !['/login', '/register'].includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

/*



// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_ROUTES = ['/login', '/register', '/about', '/legal'];

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_ROUTES.includes(pathname);
  const isAuthPage = pathname === '/login' || pathname === '/register';

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



*/
