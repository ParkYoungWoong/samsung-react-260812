import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const SESSION = 'session'

const BASE_URL = 'https://api.heropy.dev/v1'
const baseHeaders = {
  'Content-Type': 'application/json',
  apikey: process.env.AUTH_API_KEY!
}

export interface User {
  id: string
  email: string
  name: string
  photo: string | null
}

// 세션 쿠키 저장
export async function setSessionToken(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION, token, {
    httpOnly: true, // 클라이언트에서 JS로 접근할 수 없습니다!
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 3 // 리프레시 토큰의 수명과 동일하게 설정!
  })
}

// 세션 쿠키 삭제
export async function clearSessionToken() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION)
}

// 응답에서 리프레시 토큰 추출
export function readRefreshToken(res: Response) {
  const setCookie = res.headers
    .getSetCookie()
    .find(c => c.startsWith('_refresh='))
  return setCookie?.split(';')[0].replace('_refresh=', '')
}

// 세션 조회
export const getSession = cache(async () => {
  const refreshToken = (await cookies()).get(SESSION)?.value
  if (!refreshToken) return null

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    // 서버의 fetch는 쿠키를 자동으로 보내지 않으므로 직접 첨부합니다.
    headers: { ...baseHeaders, Cookie: `_refresh=${refreshToken}` },
    cache: 'no-store'
  })
  if (!res.ok) return null

  const { token, user }: { token: string; user: User } = await res.json()
  return { accessToken: token, user }
})

// 세션 조회 + 미인증 시 로그인 페이지로 이동
export async function requireSession() {
  const session = await getSession()
  if (!session) redirect('/signin')
  return session
}

// 인증이 필요한 API 요청
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { accessToken } = await requireSession()
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${accessToken}`,
      ...init.headers
    },
    cache: 'no-store' // 사용자마다 다른 응답이므로 캐시하지 않습니다!
  })
  if (!res.ok) throw new Error(`API Error: ${res.status}`)
  return res.json()
}
