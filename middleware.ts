import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('ks-auth')?.value
  if (cookie !== process.env.KEYSTATIC_ADMIN_PASSWORD) {
    const loginUrl = new URL('/keystatic-login', request.url)
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/keystatic', '/keystatic/:path+'],
}
