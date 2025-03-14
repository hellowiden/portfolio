//src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PROTECTED_ROUTES = ['/dashboard', '/about', '/experiences']; // Define high-level protected routes

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;

  // Check if the request matches any protected route dynamically
  const requiresAuth = PROTECTED_ROUTES.some((route) => path.startsWith(route));

  if (!token && requiresAuth) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static|public|favicon.ico).*)'], // Matches all except Next.js internals
};
