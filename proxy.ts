import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION } from '@/lib/auth'

const protectedRoutes = [
  '/dashboard',
  '/settings'
  // '/movies'
]
const guestOnlyRoutes = ['/signin', '/signup']

export default function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION)
  const { pathname, search } = request.nextUrl

  // 인증이 필요한 경로인데 세션이 없으면, 로그인 페이지로 이동!
  if (
    !hasSession &&
    protectedRoutes.some(route => pathname.startsWith(route))
  ) {
    const url = new URL('/signin', request.url)
    url.searchParams.set('redirectTo', pathname + search) // 로그인 후 돌아올 경로
    return NextResponse.redirect(url)
  }

  // 이미 로그인했는데 로그인 페이지로 접근하면, 메인 페이지로 이동!
  if (hasSession && guestOnlyRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
