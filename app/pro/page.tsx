import Sidebar from '@/components/Sidebar'
import { MobileMenuButton } from '@/components/MobileDrawer'

export default function ProPage() {
  return (
    <div className="layout-root">
      <Sidebar />

      <div className="layout-body">
        <header className="layout-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MobileMenuButton />
            <span style={{ fontSize: '16px' }}>⭐️</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>社群 & Pro</span>
          </div>
        </header>

        <div className="layout-row">
          <main className="layout-main" style={{ paddingTop: '48px', maxWidth: '640px' }}>

            {/* 社群入口 - 主要 CTA */}
            <div style={{ marginBottom: '48px' }}>
              <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                一起研究 Claude Code
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '28px' }}>
                这里汇聚的是真实工程实践中沉淀的内容——不是教程，是用过之后才写得出来的东西。
                每天更新一个工程思考，欢迎来讨论。
              </p>

              {/* 即刻 */}
              <div style={{
                background: 'var(--bg2)',
                border: '1px solid var(--accent2)',
                borderRadius: '10px',
                padding: '24px',
                marginBottom: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '22px' }}>🔔</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>关注即刻，每天一条工程思考</div>
                    <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '2px' }}>日更 · Claude Code 实践 · 跟读者直接对话</div>
                  </div>
                </div>
                <a
                  href="https://web.okjike.com/u/9C10E4D1-B28F-46F1-A399-A6170657E3E1"
                  target="_blank"
                  rel="noopener"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '10px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    textDecoration: 'none',
                  }}
                >
                  在即刻关注 →
                </a>
              </div>

              {/* Twitter */}
              <div style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>𝕏 Twitter / X</div>
                  <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '2px' }}>英文技术内容 · 国际视角</div>
                </div>
                <a
                  href="https://x.com/0xhaoxyz"
                  target="_blank"
                  rel="noopener"
                  style={{
                    padding: '7px 16px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: 'var(--bg3)',
                    color: 'var(--text2)',
                    border: '1px solid var(--border)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  关注 →
                </a>
              </div>
            </div>

            {/* Pro 会员 */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '36px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '16px' }}>
                Pro 会员（内测中）
              </div>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>即将开放</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    '30+ 实战模板 (SOUL.md / SKILL.md)',
                    'Multi-agent 架构图纸',
                    '每月深度长文',
                    '直接提问 & 1:1 答疑',
                  ].map(f => (
                    <li key={f} style={{ fontSize: '13px', color: 'var(--text2)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--green)', flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div style={{ fontSize: '12px', color: 'var(--text3)' }}>
                  想第一时间知道？先在即刻关注，内测开放时会第一时间通知。
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}
