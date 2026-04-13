import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type { Channel } from './channels'
export { CHANNEL_META, SPACE_GROUPS } from './channels'
import type { Channel } from './channels'

export interface Post {
  slug: string
  channel: Channel
  title: string
  subtitle?: string
  date: string
  tags: string[]
  pro: boolean
  num?: string
  titleEn?: string
  domain?: 'physics' | 'math' | 'control' | 'info'
  content: string
  excerpt: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content')

const CHANNELS: Channel[] = ['daily', 'mental-models', 'templates', 'community']

export function getChannelPosts(channel: Channel): Post[] {
  const dir = path.join(CONTENT_DIR, channel)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
  return files
    .map(file => {
      const slug = file.replace(/\.(mdx|md)$/, '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        channel,
        title: data.title || slug,
        subtitle: data.subtitle || '',
        date: data.date || '2026-01-01',
        tags: data.tags || [],
        pro: data.pro === true,
        num: data.num,
        titleEn: data.titleEn,
        domain: data.domain,
        content,
        excerpt: content.replace(/<[^>]+>/g, '').slice(0, 120).trim() + '...',
      } as Post
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllPosts(): Post[] {
  return CHANNELS.flatMap(ch => getChannelPosts(ch))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(channel: Channel, slug: string): Post | null {
  const posts = getChannelPosts(channel)
  return posts.find(p => p.slug === slug) ?? null
}

