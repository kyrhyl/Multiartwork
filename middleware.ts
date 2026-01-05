import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyTokenEdge } from './src/lib/auth-edge';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    // Verify token (using Edge-compatible jose library)
    const payload = await verifyTokenEdge(token);
    
    if (!payload || payload.role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
