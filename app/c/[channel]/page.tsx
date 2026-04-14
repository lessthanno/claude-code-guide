import { notFound } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import PostCard from '@/components/PostCard'
import { MobileMenuButton } from '@/components/MobileDrawer'
import { getChannelPosts, CHANNEL_META, Channel } from '@/lib/content'

const VALID_CHANNELS: Channel[] = ['daily', 'mental-models', 'templates', 'community']

export async function generateStaticParams() {
  return VALID_CHANNELS.map(channel => ({ channel }))
}

export default async function ChannelPage({ params }: { params: Promise<{ channel: string }> }) {
  const { channel } = await params
  if (!VALID_CHANNELS.includes(channel as Channel)) notFound()

  const ch = channel as Channel
  const meta = CHANNEL_META[ch]
  const posts = getChannelPosts(ch)

  return (
    <div className="layout-root">
      <Sidebar />

      <div className="layout-body">
        <header className="layout-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MobileMenuButton />
            <span style={{ fontSize: '18px' }}>{meta.emoji}</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>{meta.label}</span>
            <span style={{
              fontSize: '11px',
              padding: '2px 7px',
              borderRadius: '10px',
              background: 'var(--bg3)',
              color: 'var(--text3)',
              border: '1px solid var(--border)',
            }}>{posts.length} 篇</span>
          </div>
        </header>

        <div className="layout-row">
          <main className="layout-main">
            <div style={{
              padding: '20px 0 16px',
              borderBottom: '1px solid var(--border)',
              fontSize: '13px',
              color: 'var(--text2)',
            }}>{meta.desc}</div>

            {posts.length === 0 ? (
              <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text3)' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
                <div style={{ fontSize: '14px', color: 'var(--text2)' }}>该频道暂无内容</div>
              </div>
            ) : (
              posts.map(post => <PostCard key={post.slug} post={post} />)
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
