import { getAllPosts, getChannelPosts, CHANNEL_META, Channel } from '@/lib/content'
import Sidebar from '@/components/Sidebar'
import PostCard from '@/components/PostCard'
import { MobileMenuButton } from '@/components/MobileDrawer'
import { u } from '@/lib/url'

const CHANNELS = ['daily', 'mental-models'] as Channel[]

function FilterTab({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <a href={href} style={{
      padding: '5px 12px',
      borderRadius: '5px',
      fontSize: '12px',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      background: active ? 'var(--bg3)' : 'transparent',
      color: active ? 'var(--text)' : 'var(--text3)',
      border: active ? '1px solid var(--border2)' : '1px solid transparent',
      fontWeight: active ? 500 : 400,
    }}>{label}</a>
  )
}

export default function Home() {
  const allPosts = getAllPosts()
  const dailyPosts = getChannelPosts('daily')
  const modelPosts = getChannelPosts('mental-models')
  const dailyCount = dailyPosts.length
  const modelCount = modelPosts.length
  const proCount = allPosts.filter(p => p.pro).length

  return (
    <div className="layout-root">
      <Sidebar />
      <div className="layout-body">
        <header className="layout-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MobileMenuButton />
            <span style={{ fontSize: '16px' }}>⚡</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>动态 Feed</span>
          </div>
          <a href={u('/pro')} style={{
            fontSize: '12px',
            padding: '5px 14px',
            borderRadius: '5px',
            background: 'var(--accent)',
            color: 'var(--bg)',
            textDecoration: 'none',
            fontWeight: 600,
          }}>⭐️ Pro</a>
        </header>

        <div className="layout-row">
          <main className="layout-main">
            <div style={{
              display: 'flex',
              gap: '4px',
              padding: '16px 0',
              borderBottom: '1px solid var(--border)',
              overflowX: 'auto',
            }}>
              <FilterTab label="全部" href={u('/')} active />
              {CHANNELS.map(ch => (
                <FilterTab
                  key={ch}
                  label={`${CHANNEL_META[ch].emoji} ${CHANNEL_META[ch].label}`}
                  href={u(`/c/${ch}`)}
                  active={false}
                />
              ))}
            </div>
            <div>
              {allPosts.length === 0 ? (
                <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text3)' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
                  <div style={{ fontSize: '14px', marginBottom: '6px', color: 'var(--text2)' }}>还没有内容</div>
                  <div style={{ fontSize: '12px' }}>MDX 文件放到 content/ 目录下就会出现在这里</div>
                </div>
              ) : (
                allPosts.map(post => <PostCard key={`${post.channel}/${post.slug}`} post={post} />)
              )}
            </div>
          </main>

          <aside className="layout-aside">
            <div style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '20px',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px' }}>
                一起研究 Claude Code
              </div>
              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                marginBottom: '14px',
              }}>
                {[
                  { label: '篇实战文章', value: dailyCount },
                  { label: '个思维模型', value: modelCount },
                  { label: 'Pro 深度文章', value: proCount },
                  { label: '天持续更新', value: Math.round((new Date().getTime() - new Date('2026-04-01').getTime()) / 86400000) },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    background: 'var(--bg3)',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--mono)' }}>{value}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text3)', marginTop: '2px' }}>{label}</div>
                  </div>
                ))}
              </div>
              <a href={u('/pro')} style={{
                display: 'block',
                textAlign: 'center',
                background: 'var(--accent)',
                color: 'var(--bg)',
                padding: '8px',
                borderRadius: '5px',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 600,
              }}>⭐️ 加入即刻圈子 →</a>
            </div>

            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '12px' }}>
                频道
              </div>
              {CHANNELS.map(ch => {
                const meta = CHANNEL_META[ch]
                const count = ch === 'daily' ? dailyCount : ch === 'mental-models' ? modelCount : 0
                return (
                  <a key={ch} href={u(`/c/${ch}`)} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--border)',
                    textDecoration: 'none',
                  }}>
                    <span style={{ fontSize: '16px' }}>{meta.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>{meta.label}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{meta.desc}</div>
                    </div>
                    {count > 0 && (
                      <span style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'var(--mono)', flexShrink: 0 }}>{count}</span>
                    )}
                  </a>
                )
              })}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
