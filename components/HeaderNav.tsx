'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigations = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/signin', label: 'Sign In' },
  { to: '/movies', label: 'Movies' },
  { to: '/movies-infinite', label: 'Movies Infinite' },
  { to: '/async', label: 'Async' },
  { to: '/parallel', label: 'Parallel' }
]

function NavList({ pathname }: { pathname: string | null }) {
  return (
    <nav
      aria-label="주요 메뉴"
      className="flex min-w-0 flex-1 items-stretch overflow-x-auto">
      {navigations.map(nav => {
        // '/movies'가 '/movies-infinite'까지 잡지 않도록 경계까지 확인한다.
        const active =
          pathname !== null &&
          (pathname === nav.to || pathname.startsWith(`${nav.to}/`))
        return (
          <Link
            key={nav.to}
            href={nav.to}
            aria-current={active ? 'page' : undefined}
            className={`stamp flex shrink-0 items-center border-r-[3px] border-hairline px-4 whitespace-nowrap transition-colors duration-100 hover:bg-signal hover:text-bone ${
              active ? 'bg-bone text-ink' : 'text-bone'
            }`}>
            {nav.label}
          </Link>
        )
      })}
    </nav>
  )
}

// 경로를 아직 모르는 프리렌더 단계에서 쓰는 모양. 현재 위치 표시만 빠진다.
export function HeaderNavFallback() {
  return <NavList pathname={null} />
}

export default function HeaderNav() {
  return <NavList pathname={usePathname()} />
}
