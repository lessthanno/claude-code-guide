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
  readingTime: number  // minutes
}

const CONTENT_DIR = path.join(process.cwd(), 'content')

const CHANNELS: Channel[] = ['daily', 'mental-models', 'templates', 'community']

// 基础 Markdown → HTML 转换（仅用于纯 Markdown 内容）
function markdownToHtml(md: string): string {
  // 如果内容已经包含 HTML 标签，直接返回（mental-models 等文章已是 HTML）
  if (/<[a-z][^>]*>/i.test(md.trim())) return md

  // 1. 提取并暂存代码块，防止内部内容被误处理
  const codeBlocks: string[] = []
  let processed = md.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const html = `<pre><code${lang ? ` class="language-${lang}"` : ''}>${escaped}</code></pre>`
    codeBlocks.push(html)
    return `\x00CODE${codeBlocks.length - 1}\x00`
  })

  // 2. 行内格式
  processed = processed
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')

  // 3. 按段落（双换行）分割处理
  const paragraphs = processed.split(/\n\n+/).map(block => {
    block = block.trim()
    if (!block) return ''

    // 已是 HTML 占位符（代码块）
    if (block.includes('\x00CODE')) return block

    // 标题
    if (/^#{1,3} /.test(block)) {
      return block
        .replace(/^### (.+)$/m, '<h3>$1</h3>')
        .replace(/^## (.+)$/m, '<h2>$1</h2>')
        .replace(/^# (.+)$/m, '<h1>$1</h1>')
    }

    // 有序列表
    if (/^\d+\. /.test(block)) {
      const items = block.split('\n')
        .filter(l => l.trim())
        .map(l => `<li>${l.replace(/^\d+\. /, '').trim()}</li>`)
        .join('')
      return `<ol>${items}</ol>`
    }

    // 无序列表
    if (/^- /.test(block)) {
      const items = block.split('\n')
        .filter(l => l.trim())
        .map(l => `<li>${l.replace(/^- /, '').trim()}</li>`)
        .join('')
      return `<ul>${items}</ul>`
    }

    // Markdown 表格（| col | col |）
    if (/^\|.+\|/.test(block)) {
      const lines = block.split('\n').filter(l => l.trim())
      const rows = lines.filter(l => !/^\|[-: |]+\|/.test(l))
      const header = rows[0]
      const body = rows.slice(1)
      const parseRow = (line: string, tag: string) =>
        '<tr>' + line.split('|').slice(1, -1).map(cell => `<${tag}>${cell.trim()}</${tag}>`).join('') + '</tr>'
      return `<table class="md-table"><thead>${parseRow(header, 'th')}</thead><tbody>${body.map(r => parseRow(r, 'td')).join('')}</tbody></table>`
    }

    // 引用块
    if (/^> /.test(block)) {
      const content = block.split('\n').map(l => l.replace(/^> ?/, '')).join(' ')
      return `<blockquote>${content}</blockquote>`
    }

    // 普通段落（多行合并）
    return `<p>${block.replace(/\n/g, ' ')}</p>`
  })

  processed = paragraphs.join('\n')

  // 4. 还原代码块
  codeBlocks.forEach((html, i) => {
    processed = processed.replace(`\x00CODE${i}\x00`, html)
  })

  return processed
}

export function getChannelPosts(channel: Channel): Post[] {
  const dir = path.join(CONTENT_DIR, channel)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
  return files
    .map(file => {
      const slug = file.replace(/\.(mdx|md)$/, '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      const { data, content } = matter(raw)
      const html = markdownToHtml(content)
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
        content: html,
        excerpt: content.replace(/<[^>]+>/g, '').replace(/```[\s\S]*?```/g, '').replace(/[*`#-]/g, '').slice(0, 120).trim() + '...',
        readingTime: Math.max(1, Math.round(content.replace(/```[\s\S]*?```/g, '').replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '').length / 300)),
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

export function getChannelTagCounts(channel: Channel): Record<string, number> {
  const posts = getChannelPosts(channel)
  const counts: Record<string, number> = {}
  for (const post of posts) {
    for (const tag of post.tags) {
      counts[tag] = (counts[tag] || 0) + 1
    }
  }
  return counts
}

