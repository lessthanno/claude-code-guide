import { getAllPosts } from '@/lib/content'

export const dynamic = 'force-static'
export const revalidate = false

const SITE_URL = process.env.NODE_ENV === 'production'
  ? 'https://lessthanno.github.io/claude-code-guide'
  : 'http://localhost:3000'

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function GET() {
  const posts = getAllPosts().slice(0, 30)

  const items = posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/c/${post.channel}/${post.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/c/${post.channel}/${post.slug}/</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.channel)}</category>
    </item>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Claude Code 工程师手册</title>
    <link>${SITE_URL}/</link>
    <description>用物理与控制论理解 AI 编程。心智模型 + 每日工程思考。</description>
    <language>zh-CN</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
