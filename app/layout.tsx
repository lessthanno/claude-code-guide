import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '知识积累 · 工程师社群',
  description: '工程实践中的思考与沉淀 — 思维模型、实战模板、AI 编程、每日动态',
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
