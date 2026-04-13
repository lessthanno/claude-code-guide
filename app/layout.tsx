import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Claude Code 知识社群',
  description: '用工程师视角深度理解 Claude Code — 思维模型、实战模板、每日动态',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body style={{ margin: 0, minHeight: '100vh', background: 'var(--bg)' }}>
        {children}
      </body>
    </html>
  )
}
