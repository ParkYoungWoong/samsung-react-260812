import Link from 'next/link'
import { signOut } from '@/serverActions/auth'

const navigations = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/signin', label: 'Sign In' },
  { to: '/movies', label: 'Movies' },
  { to: '/async', label: 'Async' },
  { to: '/parallel', label: 'Parallel' }
]

export default function Header() {
  return (
    <header className="flex gap-3">
      {navigations.map(nav => {
        return (
          <Link
            key={nav.to}
            href={nav.to}>
            {nav.label}
          </Link>
        )
      })}
      <form action={signOut}>
        <button type="submit">로그아웃</button>
      </form>
    </header>
  )
}
