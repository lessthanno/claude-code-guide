'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CHANNEL_META, SPACE_GROUPS, Channel } from '@/lib/channels'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="layout-sidebar" style={{
      width: '240px',
      minWidth: '240px',
      background: 'var(--bg2)',
      borderRight: '1px solid var(--border)',
      height: '100vh',
      overflowY: 'auto',
      position: 'sticky',
      top: 0,
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: '18px 20px 14px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          background: 'var(--accent)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          color: 'var(--bg)',
          fontWeight: 700,
          flexShrink: 0,
          letterSpacing: '-0.02em',
        }}>CC</div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>Claude Code</div>
          <div style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '0.05em' }}>工程师手册</div>
        </div>
      </div>

      {/* Feed 入口 */}
      <NavLink href="/feed" active={pathname === '/feed' || pathname === '/'} emoji="⚡">
        动态 Feed
      </NavLink>

      {/* Space Groups */}
      <div style={{ flex: 1, paddingBottom: '16px' }}>
        {SPACE_GROUPS.map(group => (
          <div key={group.label}>
            <div style={{
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text3)',
              padding: '16px 20px 4px',
              fontWeight: 600,
            }}>{group.label}</div>

            {group.links.map(link => (
              <NavLink key={link.href} href={link.href} active={pathname === link.href} emoji={link.emoji}>
                {link.label}
              </NavLink>
            ))}

            {group.spaces.map((ch) => {
              const meta = CHANNEL_META[ch as Channel]
              const href = `/c/${ch}`
              return (
                <NavLink
                  key={ch}
                  href={href}
                  active={pathname.startsWith(href)}
                  emoji={meta.emoji}
                >
                  {meta.label}
                </NavLink>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer links */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '12px 0',
      }}>
        <NavLink href="https://github.com/lessthanno/claude-code-guide" external emoji="⬡">GitHub 开源</NavLink>
        <NavLink href="https://x.com/0xhaoxyz" external emoji="𝕏">关注作者</NavLink>
        <NavLink href={`${BASE}/rss.xml`} external emoji="📡">RSS 订阅</NavLink>
      </div>
    </aside>
  )
}

function NavLink({
  href,
  active,
  emoji,
  external,
  children,
}: {
  href: string
  active?: boolean
  emoji?: string
  external?: boolean
  children: React.ReactNode
}) {
  const style: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '7px 20px',
    color: active ? 'var(--accent)' : 'var(--text2)',
    textDecoration: 'none',
    fontSize: '13px',
    borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
    background: active ? 'var(--bg3)' : 'transparent',
    transition: 'background 0.1s, color 0.1s',
    cursor: 'pointer',
  }

  const inner = (
    <>
      <span style={{ fontSize: '14px', width: '18px', textAlign: 'center', flexShrink: 0 }}>{emoji}</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}</span>
    </>
  )

  if (external) {
    return <a href={href} target="_blank" rel="noopener" style={style}>{inner}</a>
  }
  return <Link href={href} style={style}>{inner}</Link>
}
