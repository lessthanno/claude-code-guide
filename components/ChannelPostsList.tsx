'use client'

import { useState, useMemo } from 'react'
import PostCard from './PostCard'
import type { Post } from '@/lib/content'

interface ChannelPostsListProps {
  posts: Post[]
  topTags: [string, number][]
  desc?: string
}

export default function ChannelPostsList({ posts, topTags, desc }: ChannelPostsListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let result = posts
    if (activeTag) {
      result = result.filter(p => p.tags.includes(activeTag))
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [posts, activeTag, query])

  return (
    <div className="layout-row">
      <main className="layout-main">
        {/* Channel desc */}
        {desc && (
          <div style={{
            padding: '20px 0 4px',
            borderBottom: '1px solid var(--border)',
            fontSize: '13px',
            color: 'var(--text2)',
          }}>{desc}</div>
        )}

        {/* Search bar */}
        <div style={{ padding: '16px 0 4px' }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="搜索文章标题或标签..."
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '13px',
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text)',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Active tag pill */}
        {activeTag && (
          <div style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text3)' }}>当前筛选：</span>
            <span style={{
              fontSize: '12px',
              padding: '2px 10px',
              borderRadius: '20px',
              background: 'var(--bg3)',
              border: '1px solid var(--border2)',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              #{activeTag}
              <button
                onClick={() => setActiveTag(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text3)',
                  padding: 0,
                  fontSize: '14px',
                  lineHeight: 1,
                }}
              >×</button>
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{filtered.length} 篇</span>
          </div>
        )}

        {filtered.length === 0 ? (
          <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text3)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontSize: '14px', color: 'var(--text2)' }}>没有找到匹配的文章</div>
            {(activeTag || query) && (
              <button
                onClick={() => { setActiveTag(null); setQuery('') }}
                style={{
                  marginTop: '12px',
                  padding: '6px 16px',
                  fontSize: '13px',
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text2)',
                  cursor: 'pointer',
                }}
              >清除筛选</button>
            )}
          </div>
        ) : (
          filtered.map(post => <PostCard key={post.slug} post={post} />)
        )}
      </main>

      {topTags.length > 0 && (
        <aside className="layout-aside">
          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '16px',
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '12px' }}>
              热门话题
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {topTags.map(([tag, count]) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '20px',
                    border: `1px solid ${activeTag === tag ? 'var(--text3)' : 'var(--border2)'}`,
                    color: activeTag === tag ? 'var(--text)' : 'var(--text3)',
                    background: activeTag === tag ? 'var(--bg3)' : 'transparent',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  #{tag} <span style={{ opacity: 0.5 }}>{count}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}
