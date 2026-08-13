'use server'
import { redirect } from 'next/navigation'
import {
  readRefreshToken,
  setSessionToken,
  clearSessionToken
} from '@/lib/auth'

export async function signIn(formData: FormData) {
  // 외부 주소로 이동하지 않도록 내부 경로인지 확인합니다!
  const redirectTo = String(formData.get('redirectTo') || '')
  const safe =
    redirectTo.startsWith('/') && !redirectTo.startsWith('//')
      ? redirectTo
      : '/'

  const res = await fetch('https://api.heropy.dev/v1/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.AUTH_API_KEY!
    },
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password')
    })
  })

  const refreshToken = res.ok ? readRefreshToken(res) : null
  if (!refreshToken) {
    redirect(`/signin?error=1&redirectTo=${encodeURIComponent(safe)}`)
  }

  await setSessionToken(refreshToken)
  redirect(safe)
}

export async function signOut() {
  await clearSessionToken()
  redirect('/signin')
}
