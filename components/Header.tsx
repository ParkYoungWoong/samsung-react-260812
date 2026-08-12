import Link from 'next/link'

const navigations = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/signin', label: 'Sign In' }
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
    </header>
  )
}
