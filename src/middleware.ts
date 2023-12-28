import { NextRequest, NextResponse, userAgent } from 'next/server'
 
// coming from https://nextjs.org/docs/app/api-reference/functions/userAgent
export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const { device } = userAgent(request)
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  console.log('device', device);
  url.searchParams.set('viewport', viewport);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/', '/rover/:path*'],
}