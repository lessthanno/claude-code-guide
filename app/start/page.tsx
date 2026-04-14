import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { MobileMenuButton } from '@/components/MobileDrawer'

const STEPS = [
  {
    num: '01',
    title: '浏览动态 Feed',
    desc: '所有频道的内容聚合在一起，按时间倒序。从这里开始感受社群节奏。',
    href: '/feed',
    label: '去 Feed →',
  },
  {
    num: '02',
    title: '阅读心智模型手册',
    desc: '跨学科框架 × Claude Code 实战。用物理、信息论、控制论的视角理解 AI 编程。',
    href: '/handbook/',
    label: '打开手册 →',
    external: true,
  },
  {
    num: '03',
    title: '看日报',
    desc: '每天一条工程思考：Claude Code 实践、调优经验、踩坑记录。短但有料。',
    href: '/c/daily',
    label: '看日报 →',
  },
  {
    num: '04',
    title: '加入即刻圈子',
    desc: '跟真实在用 Claude Code 的工程师一起讨论。比文章更快，比教程更真实。',
    href: '/pro',
    label: '去社群 →',
  },
]

export default function StartPage() {
  return (
    <div className="layout-root">
      <Sidebar />

      <div className="layout-body">
        <header className="layout-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MobileMenuButton />
            <span style={{ fontSize: '16px' }}>📌</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>快速开始</span>
          </div>
        </header>

        <div className="layout-row">
          <main className="layout-main" style={{ paddingTop: '48px' }}>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                从这里开始
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.75 }}>
                这是一个持续更新的知识积累库，记录真实工程实践中的思考与沉淀。
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {STEPS.map((step, i) => (
                <div key={step.num} style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '20px 0',
                  borderBottom: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '12px',
                    color: 'var(--text3)',
                    paddingTop: '2px',
                    flexShrink: 0,
                    width: '24px',
                  }}>{step.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>{step.title}</div>
                    <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '12px' }}>{step.desc}</p>
                    {step.external ? (
                      <a href={step.href} style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>{step.label}</a>
                    ) : (
                      <Link href={step.href} style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>{step.label}</Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
