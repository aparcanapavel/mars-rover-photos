import { NextRequest, NextResponse, userAgent } from 'next/server';
 
export function middleware(request: NextRequest) {
  // coming from https://github.com/vercel/next.js/blob/canary/examples/with-strict-csp/middleware.js
  /**
   * CSP style-src include 'unsafe-inline' because Next/Image adds inline styles as attributes
   */
  
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `
  
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
  
  const url = request.nextUrl;

  if(url.pathname === '/' || url.pathname === '/rover/:path*') {
    // coming from https://nextjs.org/docs/app/api-reference/functions/userAgent
    const { device } = userAgent(request)
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
    
    url.searchParams.set('viewport', viewport);
    
    return NextResponse.rewrite(url);
  }

  const cspResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  cspResponse.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  return cspResponse
}

// export const config = {
//   matcher: ['/', '/rover/:path*'],
// }

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
    '/', 
    '/rover/:path*'
  ],
}