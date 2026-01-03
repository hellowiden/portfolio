import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_FILE = /\.(.*)$/;

function getMarketingOrigin(req: NextRequest): string {
  const marketingUrl = process.env.NEXT_PUBLIC_MARKETING_URL;
  if (marketingUrl && marketingUrl.startsWith('http')) {
    return marketingUrl.replace(/\/$/, '');
  }
  return req.nextUrl.origin;
}

function buildMarketingUrl(req: NextRequest, path: string): URL {
  const origin = getMarketingOrigin(req);
  return new URL(path, origin);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  if (pathname === '/login' || pathname === '/register') {
    const target = buildMarketingUrl(req, pathname);
    const callbackUrl = req.nextUrl.searchParams.get('callbackUrl');
    if (callbackUrl) {
      target.searchParams.set('callbackUrl', callbackUrl);
    }
    return NextResponse.redirect(target);
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const loginUrl = buildMarketingUrl(req, '/login');
    loginUrl.searchParams.set('callbackUrl', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  const roles = Array.isArray(token.roles) ? token.roles : [];
  const isAdmin = roles.includes('admin');

  if (!isAdmin) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.redirect(buildMarketingUrl(req, '/'));
  }

  return NextResponse.next();
}
