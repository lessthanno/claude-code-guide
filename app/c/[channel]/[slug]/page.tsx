import { notFound } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import { getPost, getChannelPosts, CHANNEL_META, Channel } from '@/lib/content'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const VALID_CHANNELS: Channel[] = ['daily', 'mental-models', 'templates', 'community']

export async function generateStaticParams() {
  return VALID_CHANNELS.flatMap(channel =>
    getChannelPosts(channel).map(post => ({ channel, slug: post.slug }))
  )
}

const DOMAIN_LABELS = {
  physics: { label: '物理学', color: '#8b6fb5', bg: '#1a1520' },
  math:    { label: '数学',   color: '#4a9a6f', bg: '#0d1f15' },
  control: { label: '控制论', color: '#4a7ab5', bg: '#0d1525' },
  info:    { label: '信息论', color: '#a07a30', bg: '#1f180d' },
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ channel: string; slug: string }>
}) {
  const { channel, slug } = await params
  if (!VALID_CHANNELS.includes(channel as Channel)) notFound()

  const ch = channel as Channel
  const post = getPost(ch, slug)
  if (!post) notFound()

  const posts = getChannelPosts(ch)
  const idx = posts.findIndex(p => p.slug === slug)
  const prev = idx < posts.length - 1 ? posts[idx + 1] : null
  const next = idx > 0 ? posts[idx - 1] : null
  const meta = CHANNEL_META[ch]

  const timeAgo = (() => {
    try { return formatDistanceToNow(new Date(post.date), { addSuffix: true, locale: zhCN }) }
    catch { return post.date }
  })()

  return (
    <div className="layout-root">
      <Sidebar />

      <div className="layout-body">
        {/* Top bar */}
        <header className="layout-header" style={{ gap: '8px', justifyContent: 'flex-start' }}>
          <Link href={`/c/${ch}`} style={{ color: 'var(--text3)', textDecoration: 'none', fontSize: '13px' }}>
            {meta.emoji} {meta.label}
          </Link>
          <span style={{ color: 'var(--border2)', fontSize: '13px' }}>/</span>
          <span style={{ fontSize: '13px', color: 'var(--text2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {post.title}
          </span>
        </header>

        <div className="layout-row">
          {/* Article */}
          <main className="article-main">
            {/* Article header */}
            <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                {post.domain && DOMAIN_LABELS[post.domain] && (
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    color: DOMAIN_LABELS[post.domain].color,
                    background: DOMAIN_LABELS[post.domain].bg,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>{DOMAIN_LABELS[post.domain].label}</span>
                )}
                {post.pro && (
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 7px',
                    borderRadius: '3px',
                    background: '#1f180d',
                    color: '#a07a30',
                    border: '1px solid #2a1e05',
                    fontWeight: 600,
                  }}>Pro</span>
                )}
                <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--text3)' }}>{timeAgo}</span>
              </div>

              <h1 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--text)',
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                marginBottom: post.subtitle ? '8px' : 0,
              }}>
                {post.num && (
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text3)', marginRight: '10px' }}>
                    {post.num}
                  </span>
                )}
                {post.title}
              </h1>

              {post.subtitle && (
                <div style={{ fontSize: '14px', color: 'var(--text3)', letterSpacing: '0.04em', marginTop: '4px' }}>
                  {post.subtitle}
                </div>
              )}

              {post.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', marginTop: '14px', flexWrap: 'wrap' }}>
                  {post.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '20px',
                      border: '1px solid var(--border2)',
                      color: 'var(--text3)',
                    }}>#{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Content — rendered as HTML from MDX */}
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{ marginBottom: '48px' }}
            />

            {/* Giscus comments */}
            <div
              style={{
                paddingTop: '40px',
                borderTop: '1px solid var(--border)',
                marginBottom: '40px',
              }}
            >
              <div style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: '16px' }}>
                💬 评论（由 GitHub Discussions 驱动）
              </div>
              {/* Giscus script injected via component — configure repo in env */}
              <div id="giscus-container">
                <p style={{ fontSize: '12px', color: 'var(--text3)' }}>
                  配置 Giscus: 在 <code>.env.local</code> 中设置 <code>NEXT_PUBLIC_GISCUS_REPO</code>
                </p>
              </div>
            </div>

            {/* Prev / Next */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border)',
            }}>
              {prev ? (
                <Link href={`/c/${ch}/${prev.slug}`} style={{
                  color: 'var(--text2)', textDecoration: 'none', fontSize: '13px',
                  display: 'flex', flexDirection: 'column', gap: '4px',
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--text3)' }}>← 上一篇</span>
                  <span>{prev.title}</span>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={`/c/${ch}/${next.slug}`} style={{
                  color: 'var(--text2)', textDecoration: 'none', fontSize: '13px',
                  display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'right',
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--text3)' }}>下一篇 →</span>
                  <span>{next.title}</span>
                </Link>
              ) : <div />}
            </div>
          </main>

          {/* TOC sidebar */}
          <aside className="article-toc">
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '12px' }}>
              本频道其他内容
            </div>
            {posts.slice(0, 8).map(p => (
              <Link key={p.slug} href={`/c/${ch}/${p.slug}`} style={{
                display: 'block',
                padding: '6px 0',
                fontSize: '12px',
                color: p.slug === slug ? 'var(--accent)' : 'var(--text3)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                fontWeight: p.slug === slug ? 500 : 400,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {p.num && <span style={{ fontFamily: 'var(--mono)', marginRight: '6px', fontSize: '10px' }}>{p.num}</span>}
                {p.title.split(' · ')[0]}
              </Link>
            ))}
          </aside>
        </div>
      </div>
    </div>
  )
}

