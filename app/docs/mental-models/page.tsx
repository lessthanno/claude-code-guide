import Link from 'next/link'
import { getMentalModels } from '@/lib/content'

const DOMAIN_LABELS = {
  physics: { label: '物理学', color: '#8b6fb5', bg: '#1a1520' },
  math: { label: '数学', color: '#4a9a6f', bg: '#0d1f15' },
  control: { label: '控制论', color: '#4a7ab5', bg: '#0d1525' },
  info: { label: '信息论', color: '#a07a30', bg: '#1f180d' },
}

export default function MentalModelsIndex() {
  const models = getMentalModels()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <nav style={{
        width: '220px',
        minWidth: '220px',
        background: 'var(--bg2)',
        borderRight: '1px solid var(--border)',
        padding: '24px 0',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}>
        <div style={{
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text3)',
          padding: '0 20px 12px',
          borderBottom: '1px solid var(--border)',
          marginBottom: '8px',
        }}>Claude Code Guide</div>
        <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', padding: '16px 20px 4px' }}>
          思维模型
        </div>
        {models.map(model => (
          <Link key={model.slug} href={`/docs/mental-models/${model.slug}`} style={{
            display: 'block',
            padding: '7px 20px',
            color: 'var(--text2)',
            textDecoration: 'none',
            fontSize: '13px',
            borderLeft: '2px solid transparent',
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text3)', marginRight: '8px' }}>{model.num}</span>
            {model.title.split(' · ')[0]}
          </Link>
        ))}
      </nav>

      {/* Content */}
      <main style={{ flex: 1, maxWidth: '860px', padding: '48px 56px' }}>
        <div style={{ marginBottom: '56px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
            思维模型手册
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '13px', lineHeight: 1.7 }}>
            9 个跨学科思维框架，映射到 Claude Code 的实际使用场景。
            每个模型包含：核心公式、识别信号、代码模式。
          </p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
            {(['physics', 'math', 'control', 'info'] as const).map(d => (
              <span key={d} style={{
                fontSize: '11px',
                padding: '3px 10px',
                borderRadius: '20px',
                border: '1px solid var(--border2)',
                color: DOMAIN_LABELS[d].color,
                background: DOMAIN_LABELS[d].bg,
              }}>{DOMAIN_LABELS[d].label}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {models.map(model => {
            const domain = DOMAIN_LABELS[model.domain]
            return (
              <Link key={model.slug} href={`/docs/mental-models/${model.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text3)', minWidth: '28px' }}>{model.num}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>{model.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{model.subtitle}</div>
                  </div>
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    color: domain.color,
                    background: domain.bg,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>{domain.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
