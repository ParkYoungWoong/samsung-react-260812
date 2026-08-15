import { signIn } from '@/serverActions/auth'

// http://localhost:3000/signin?redirectTo=/movies
export default async function SignInPage({
  searchParams
}: {
  searchParams: Promise<{ redirectTo?: string; error?: string }>
}) {
  const { redirectTo, error } = await searchParams
  return (
    <>
      <section className="animate-slam bg-ink px-5 pt-8 pb-7 text-bone sm:px-8">
        <p className="stamp text-ash">Server action / 세션 쿠키</p>
        <h1 className="display text-title mt-4">Sign In</h1>
      </section>

      <form
        action={signIn}
        className="max-w-[34rem] border-r-[3px] border-b-[3px] border-ink bg-bone">
        <input
          type="hidden"
          name="redirectTo"
          value={redirectTo || '/'}
        />
        <label className="block border-b-[3px] border-ink px-5 py-5 sm:px-8">
          <span className="stamp">이메일</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="field mt-3 text-xl font-medium"
          />
        </label>
        <label className="block border-b-[3px] border-ink px-5 py-5 sm:px-8">
          <span className="stamp">비밀번호</span>
          <input
            name="password"
            type="password"
            className="field mt-3 text-xl font-medium"
          />
        </label>
        {error && (
          <p className="bg-alert px-5 py-4 text-bone sm:px-8">
            <span className="stamp">로그인 실패</span>
            <span className="mt-2.5 block text-sm font-medium">
              이메일 또는 비밀번호를 확인해주세요.
            </span>
          </p>
        )}
        <button
          type="submit"
          className="btn w-full border-0 py-5">
          로그인
        </button>
      </form>
    </>
  )
}
