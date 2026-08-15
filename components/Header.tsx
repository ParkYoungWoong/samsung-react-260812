import Link from 'next/link'
import { Suspense } from 'react'
import { signOut } from '@/serverActions/auth'
import HeaderNav, { HeaderNavFallback } from './HeaderNav'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-ink text-bone">
      <div className="flex items-stretch">
        <Link
          href="/"
          className="flex shrink-0 items-center bg-bone px-4 py-3.5 text-ink">
          <span className="display text-[1.0625rem]">Heropy</span>
          <span className="stamp ml-2 self-end pb-[0.1rem] text-aggregate">
            Next
          </span>
        </Link>

        <Suspense fallback={<HeaderNavFallback />}>
          <HeaderNav />
        </Suspense>

        <form
          action={signOut}
          className="shrink-0">
          <button
            type="submit"
            className="stamp h-full px-4 whitespace-nowrap transition-colors duration-100 hover:bg-alert hover:text-bone">
            로그아웃
          </button>
        </form>
      </div>
    </header>
  )
}
