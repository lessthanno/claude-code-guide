import type { Metadata } from 'next'
import './globals.css'
import MobileNav from '@/components/MobileNav'

export const metadata: Metadata = {
  title: 'Claude Code 工程师手册 · 用物理与控制论理解 AI 编程',
  description: '用模拟退火、PID 控制器、傅里叶分解等跨学科思维模型，系统掌握 Claude Code 工程实践。每天一条工程思考。',
  openGraph: {
    title: 'Claude Code 工程师手册',
    description: '跨学科思维模型 × Claude Code 实战。用物理、信息论、控制论的视角理解 AI 编程。',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Claude Code 工程师手册',
    description: '跨学科思维模型 × Claude Code 实战。每天一条工程思考。',
  },
  keywords: ['Claude Code', 'AI 编程', '工程师', '心智模型', 'Prompt 调优', 'Multi-agent', 'CLAUDE.md'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return (
    <html lang="zh">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Claude Code 工程师手册 RSS"
          href={`${basePath}/rss.xml`}
        />
      </head>
      <body style={{ margin: 0, minHeight: '100vh', background: 'var(--bg)' }}>
        {children}
        <MobileNav />
      </body>
    </html>
  )
}
