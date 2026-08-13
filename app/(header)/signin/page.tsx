import { signIn } from '@/serverActions/auth'

// http://localhost:3000/signin?redirectTo=/movies
export default async function SignInPage({
  searchParams
}: {
  searchParams: Promise<{ redirectTo?: string; error?: string }>
}) {
  const { redirectTo, error } = await searchParams
  return (
    <form action={signIn}>
      <input
        type="hidden"
        name="redirectTo"
        value={redirectTo || '/'}
      />
      <input
        name="email"
        type="email"
        placeholder="이메일"
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
      />
      {error && <p>이메일 또는 비밀번호를 확인해주세요.</p>}
      <button type="submit">로그인</button>
    </form>
  )
}
