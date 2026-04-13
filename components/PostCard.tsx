import Link from 'next/link'
import { Post, CHANNEL_META } from '@/lib/content'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const DOMAIN_COLORS = {
  physics: { color: '#8b6fb5', bg: '#1a1520' },
  math:    { color: '#4a9a6f', bg: '#0d1f15' },
  control: { color: '#4a7ab5', bg: '#0d1525' },
  info:    { color: '#a07a30', bg: '#1f180d' },
}

export default function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  const href = `/c/${post.channel}/${post.slug}`
  const meta = CHANNEL_META[post.channel]
  const timeAgo = (() => {
    try {
      return formatDistanceToNow(new Date(post.date), { addSuffix: true, locale: zhCN })
    } catch {
      return post.date
    }
  })()

  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <article style={{
        padding: compact ? '14px 0' : '20px 0',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
      }}>
        {/* Meta row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px',
        }}>
          {/* Channel badge */}
          <span style={{
            fontSize: '11px',
            color: 'var(--text3)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <span>{meta.emoji}</span>
            <span>{meta.label}</span>
          </span>

          {/* Domain badge (for mental-models) */}
          {post.domain && DOMAIN_COLORS[post.domain] && (
            <span style={{
              fontSize: '10px',
              padding: '1px 6px',
              borderRadius: '3px',
              color: DOMAIN_COLORS[post.domain].color,
              background: DOMAIN_COLORS[post.domain].bg,
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}>
              {post.domain === 'physics' ? '物理学' :
               post.domain === 'math' ? '数学' :
               post.domain === 'control' ? '控制论' : '信息论'}
            </span>
          )}

          {/* Pro badge */}
          {post.pro && (
            <span style={{
              fontSize: '10px',
              padding: '1px 6px',
              borderRadius: '3px',
              background: '#1f180d',
              color: '#a07a30',
              border: '1px solid #2a1e05',
              fontWeight: 600,
            }}>Pro</span>
          )}

          <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--text3)' }}>{timeAgo}</span>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: compact ? '14px' : '16px',
          fontWeight: 600,
          color: 'var(--text)',
          lineHeight: 1.4,
          marginBottom: post.subtitle || (!compact && post.excerpt) ? '6px' : 0,
          letterSpacing: '-0.01em',
        }}>
          {post.num && (
            <span style={{
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              color: 'var(--text3)',
              marginRight: '8px',
            }}>{post.num}</span>
          )}
          {post.title}
        </h2>

        {/* Subtitle */}
        {post.subtitle && (
          <div style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '6px' }}>
            {post.subtitle}
          </div>
        )}

        {/* Excerpt */}
        {!compact && post.excerpt && (
          <p style={{
            fontSize: '13px',
            color: 'var(--text2)',
            lineHeight: 1.65,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {post.excerpt.replace(/<[^>]+>/g, '')}
          </p>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
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
      </article>
    </Link>
  )
}
