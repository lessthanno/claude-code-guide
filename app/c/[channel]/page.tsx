import { notFound } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import ChannelPostsList from '@/components/ChannelPostsList'
import { MobileMenuButton } from '@/components/MobileDrawer'
import { getChannelPosts, getChannelTagCounts, CHANNEL_META, Channel } from '@/lib/content'

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
  const tagCounts = getChannelTagCounts(ch)
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)

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

        <ChannelPostsList posts={posts} topTags={topTags} desc={meta.desc} />
      </div>
    </div>
  )
}
