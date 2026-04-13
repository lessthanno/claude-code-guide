import Sidebar from '@/components/Sidebar'
import PostCard from '@/components/PostCard'
import { getAllPosts, CHANNEL_META, Channel } from '@/lib/content'
import { u } from '@/lib/url'

const CHANNELS = ['daily', 'mental-models', 'templates', 'community'] as Channel[]

export default function FeedPage() {
  const allPosts = getAllPosts()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar />

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header style={{
          borderBottom: '1px solid var(--border)',
          padding: '0 32px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: 'var(--bg)',
          zIndex: 10,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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

        <div style={{ display: 'flex', flex: 1, minWidth: 0 }}>
          {/* Main feed */}
          <main style={{ flex: 1, minWidth: 0, padding: '0 32px', maxWidth: '720px' }}>
            {/* Channel filter tabs */}
            <div style={{
              display: 'flex',
              gap: '4px',
              padding: '16px 0',
              borderBottom: '1px solid var(--border)',
              overflowX: 'auto',
            }}>
              <FilterTab label="全部" href={u('/feed')} active />
              {CHANNELS.map(ch => (
                <FilterTab
                  key={ch}
                  label={`${CHANNEL_META[ch].emoji} ${CHANNEL_META[ch].label}`}
                  href={u(`/c/${ch}`)}
                  active={false}
                />
              ))}
            </div>

            {/* Posts */}
            <div>
              {allPosts.length === 0 ? (
                <EmptyState />
              ) : (
                allPosts.map(post => <PostCard key={`${post.channel}/${post.slug}`} post={post} />)
              )}
            </div>
          </main>

          {/* Right panel */}
          <aside style={{
            width: '280px',
            minWidth: '280px',
            padding: '24px 0 24px 24px',
            borderLeft: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}>
            {/* Pro CTA */}
            <div style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '20px',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>
                ⭐️ Pro 会员
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '14px' }}>
                30+ 实战模板、Multi-agent 架构图纸、每月深度文章、Discord 直接问我。
              </p>
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
              }}>了解详情 →</a>
            </div>

            {/* Channels */}
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '12px' }}>
                频道
              </div>
              {CHANNELS.map(ch => {
                const meta = CHANNEL_META[ch]
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
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>{meta.label}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{meta.desc}</div>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Social */}
            <div style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '16px',
            }}>
              <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '12px' }}>
                关注作者，第一时间获取更新
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href="https://x.com" target="_blank" rel="noopener" style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '6px',
                  borderRadius: '4px',
                  border: '1px solid var(--border2)',
                  color: 'var(--text2)',
                  textDecoration: 'none',
                  fontSize: '12px',
                }}>𝕏 Twitter</a>
                <a href="https://github.com" target="_blank" rel="noopener" style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '6px',
                  borderRadius: '4px',
                  border: '1px solid var(--border2)',
                  color: 'var(--text2)',
                  textDecoration: 'none',
                  fontSize: '12px',
                }}>GitHub</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

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

function EmptyState() {
  return (
    <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text3)' }}>
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
      <div style={{ fontSize: '14px', marginBottom: '6px', color: 'var(--text2)' }}>还没有内容</div>
      <div style={{ fontSize: '12px' }}>MDX 文件放到 content/ 目录下就会出现在这里</div>
    </div>
  )
}
