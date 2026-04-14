'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CHANNEL_META, SPACE_GROUPS, Channel } from '@/lib/channels'

export function MobileMenuButton() {
  const [open, setOpen] = useState(false)

  // 路由变化时关闭
  const pathname = usePathname()
  useEffect(() => { setOpen(false) }, [pathname])

  // 阻止背景滚动
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(v => !v)}
        className="mobile-menu-btn"
        aria-label="菜单"
      >
        <span className={`hamburger${open ? ' open' : ''}`}>
          <span /><span /><span />
        </span>
      </button>

      {open && (
        <>
          {/* 遮罩 */}
          <div className="mobile-drawer-mask" onClick={() => setOpen(false)} />

          {/* 抽屉 */}
          <div className="mobile-drawer">
            {/* Logo */}
            <div className="mobile-drawer-logo">
              <div className="sidebar-logo-icon">知</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>知识积累</div>
                <div style={{ fontSize: '10px', color: 'var(--text3)' }}>工程师社群</div>
              </div>
            </div>

            <div className="mobile-drawer-body">
              {/* Feed */}
              <DrawerLink href="/" emoji="⚡">动态 Feed</DrawerLink>

              {/* Space Groups */}
              {SPACE_GROUPS.map(group => (
                <div key={group.label} style={{ marginTop: '8px' }}>
                  <div className="drawer-group-label">{group.label}</div>
                  {group.links.map(link => (
                    <DrawerLink key={link.href} href={link.href} emoji={link.emoji}>
                      {link.label}
                    </DrawerLink>
                  ))}
                  {group.spaces.map(ch => {
                    const meta = CHANNEL_META[ch as Channel]
                    return (
                      <DrawerLink key={ch} href={`/c/${ch}`} emoji={meta.emoji}>
                        {meta.label}
                      </DrawerLink>
                    )
                  })}
                </div>
              ))}

              {/* Footer links */}
              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                <DrawerLink href="https://github.com/lessthanno/claude-code-guide" emoji="⬡" external>
                  GitHub 开源
                </DrawerLink>
                <DrawerLink href="https://x.com/0xhaoxyz" emoji="𝕏" external>
                  关注作者
                </DrawerLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

function DrawerLink({
  href, emoji, external, children,
}: {
  href: string; emoji: string; external?: boolean; children: React.ReactNode
}) {
  const pathname = usePathname()
  const active = href === '/'
    ? pathname === '/' || pathname === '/feed'
    : pathname.startsWith(href)

  const style: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    color: active ? 'var(--accent)' : 'var(--text2)',
    textDecoration: 'none',
    fontSize: '14px',
    borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
    background: active ? 'var(--bg3)' : 'transparent',
    borderRadius: '0 6px 6px 0',
    marginRight: '8px',
  }
  const inner = (
    <>
      <span style={{ fontSize: '16px', width: '20px', textAlign: 'center', flexShrink: 0 }}>{emoji}</span>
      <span>{children}</span>
    </>
  )
  if (external) return <a href={href} target="_blank" rel="noopener" style={style}>{inner}</a>
  return <Link href={href} style={style}>{inner}</Link>
}
