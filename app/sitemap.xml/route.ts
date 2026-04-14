import { getAllPosts } from '@/lib/content'

export const dynamic = 'force-static'
export const revalidate = false

const SITE_URL = 'https://lessthanno.github.io/claude-code-guide'

export function GET() {
  const posts = getAllPosts()

  type UrlEntry = { url: string; priority: string; changefreq: string; lastmod?: string }

  const staticPages: UrlEntry[] = [
    { url: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' },
    { url: `${SITE_URL}/handbook/`, priority: '0.9', changefreq: 'weekly' },
    { url: `${SITE_URL}/c/daily/`, priority: '0.8', changefreq: 'daily' },
    { url: `${SITE_URL}/c/mental-models/`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE_URL}/start/`, priority: '0.7', changefreq: 'monthly' },
    { url: `${SITE_URL}/pro/`, priority: '0.6', changefreq: 'monthly' },
  ]

  const articleUrls: UrlEntry[] = posts.map(post => ({
    url: `${SITE_URL}/c/${post.channel}/${post.slug}/`,
    priority: '0.7',
    changefreq: 'weekly',
    lastmod: post.date,
  }))

  const allUrls = [...staticPages, ...articleUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.url}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
