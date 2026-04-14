'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Feed', emoji: '⚡', href: '/' },
  { label: '手册', emoji: '📖', href: '/handbook' },
  { label: '开始', emoji: '📌', href: '/start' },
  { label: 'Pro', emoji: '⭐', href: '/pro' },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="mobile-bottom-nav">
      {NAV_ITEMS.map(item => {
        const active =
          item.href === '/'
            ? pathname === '/' || pathname === '/feed'
            : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-nav-item${active ? ' mobile-nav-active' : ''}`}
          >
            <span className="mobile-nav-icon">{item.emoji}</span>
            <span className="mobile-nav-label">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
