import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenFromHeader, getCurrentUserFromHeader, isAdminFromHeader } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/dashboard/login', '/api/auth/login', '/api/auth/register', '/api/auth/logout', '/api/auth/me'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // For API routes (except public auth routes), verify Authorization header
  if (pathname.startsWith('/api') && !isPublicPath) {
    const authHeader = request.headers.get('authorization');
    
    // Check if route requires admin access
    const adminRoutes = ['/api/products', '/api/categories', '/api/brands', '/api/orders'];
    const requiresAdmin = adminRoutes.some(route => pathname.startsWith(route));
    
    if (requiresAdmin) {
      const isAdmin = isAdminFromHeader(authHeader);
      if (!isAdmin) {
        return NextResponse.json(
          { success: false, error: 'Admin access required' },
          { status: 403 }
        );
      }
    } else {
      // Just check if authenticated
      const user = getCurrentUserFromHeader(authHeader);
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        );
      }
    }
  }

  // Note: Dashboard route protection is handled client-side with localStorage
  // since middleware can't access localStorage

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
