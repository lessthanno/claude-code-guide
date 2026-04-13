import Sidebar from '@/components/Sidebar'
import { u } from '@/lib/url'

const PLANS = [
  {
    name: 'Free',
    price: '免费',
    features: [
      '所有公开文章',
      '动态 Feed',
      '社区讨论',
    ],
    cta: '当前方案',
    ctaStyle: 'muted' as const,
  },
  {
    name: 'Pro',
    price: '会员',
    features: [
      '全部 Free 内容',
      '30+ 实战模板 (SOUL.md / SKILL.md)',
      'Multi-agent 架构图纸',
      '每月深度长文',
      'Discord 直接提问',
    ],
    cta: '即将开放',
    ctaStyle: 'accent' as const,
  },
]

export default function ProPage() {
  return (
    <div className="layout-root">
      <Sidebar />

      <div className="layout-body">
        <header className="layout-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '16px' }}>⭐️</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>Pro 会员</span>
          </div>
        </header>

        <div className="layout-row">
          <main className="layout-main" style={{ paddingTop: '48px', maxWidth: '640px' }}>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                知识积累，值得更好的工具
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.75 }}>
                这里汇聚的是真实工程实践中沉淀的内容——不是教程，是用过之后才写得出来的东西。
                Pro 会员可以获取全部深度内容和可复用模板。
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {PLANS.map(plan => (
                <div key={plan.name} style={{
                  flex: '1',
                  minWidth: '220px',
                  background: 'var(--bg2)',
                  border: `1px solid ${plan.ctaStyle === 'accent' ? 'var(--accent2)' : 'var(--border)'}`,
                  borderRadius: '10px',
                  padding: '24px',
                }}>
                  <div style={{ fontSize: '12px', color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {plan.name}
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '20px' }}>
                    {plan.price}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {plan.features.map(f => (
                      <li key={f} style={{ fontSize: '13px', color: 'var(--text2)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--green)', flexShrink: 0 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '8px',
                    borderRadius: '5px',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: plan.ctaStyle === 'accent' ? 'var(--accent)' : 'var(--bg3)',
                    color: plan.ctaStyle === 'accent' ? 'var(--bg)' : 'var(--text3)',
                    border: plan.ctaStyle === 'muted' ? '1px solid var(--border)' : 'none',
                  }}>
                    {plan.cta}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '48px', padding: '24px', background: 'var(--bg2)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '13px', color: 'var(--text3)' }}>
                有问题？欢迎通过{' '}
                <a href="https://x.com" target="_blank" rel="noopener" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Twitter/X</a>
                {' '}联系。
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
