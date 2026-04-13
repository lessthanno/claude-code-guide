import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMentalModels, getMentalModel } from '@/lib/content'

const DOMAIN_LABELS = {
  physics: { label: '物理学', color: '#8b6fb5', bg: '#1a1520' },
  math: { label: '数学', color: '#4a9a6f', bg: '#0d1f15' },
  control: { label: '控制论', color: '#4a7ab5', bg: '#0d1525' },
  info: { label: '信息论', color: '#a07a30', bg: '#1f180d' },
}

export async function generateStaticParams() {
  const models = getMentalModels()
  return models.map(m => ({ slug: m.slug }))
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const model = getMentalModel(slug)
  if (!model) notFound()

  const models = getMentalModels()
  const currentIndex = models.findIndex(m => m.slug === slug)
  const prev = currentIndex > 0 ? models[currentIndex - 1] : null
  const next = currentIndex < models.length - 1 ? models[currentIndex + 1] : null
  const domain = DOMAIN_LABELS[model.domain]

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
        flexShrink: 0,
      }}>
        <Link href="/" style={{
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text3)',
          padding: '0 20px 12px',
          borderBottom: '1px solid var(--border)',
          marginBottom: '8px',
          display: 'block',
          textDecoration: 'none',
        }}>← Claude Code Guide</Link>
        <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', padding: '16px 20px 4px' }}>
          思维模型
        </div>
        {models.map(m => (
          <Link key={m.slug} href={`/docs/mental-models/${m.slug}`} style={{
            display: 'block',
            padding: '7px 20px',
            color: m.slug === slug ? 'var(--accent)' : 'var(--text2)',
            textDecoration: 'none',
            fontSize: '13px',
            borderLeft: m.slug === slug ? '2px solid var(--accent)' : '2px solid transparent',
            background: m.slug === slug ? 'var(--bg3)' : 'transparent',
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text3)', marginRight: '8px' }}>{m.num}</span>
            {m.title.split(' · ')[0]}
          </Link>
        ))}
      </nav>

      {/* Main */}
      <main style={{ flex: 1, maxWidth: '860px', padding: '48px 56px', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ marginBottom: '56px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '28px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text3)', paddingTop: '5px', minWidth: '24px' }}>
              {model.num}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px', letterSpacing: '-0.02em' }}>
                {model.title}
              </h1>
              <div style={{ fontSize: '12px', color: 'var(--text3)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {model.subtitle}
              </div>
            </div>
            <span style={{
              fontSize: '10px',
              padding: '3px 8px',
              borderRadius: '4px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: domain.color,
              background: domain.bg,
              flexShrink: 0,
            }}>{domain.label}</span>
          </div>
        </div>

        {/* Content rendered as raw HTML for now — MDX upgrade path ready */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: model.content }} />

        {/* Prev / Next */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '64px',
          paddingTop: '32px',
          borderTop: '1px solid var(--border)',
          gap: '16px',
        }}>
          {prev ? (
            <Link href={`/docs/mental-models/${prev.slug}`} style={{
              color: 'var(--text2)',
              textDecoration: 'none',
              fontSize: '13px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <span style={{ fontSize: '11px', color: 'var(--text3)' }}>← 上一节</span>
              <span>{prev.title.split(' · ')[0]}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/docs/mental-models/${next.slug}`} style={{
              color: 'var(--text2)',
              textDecoration: 'none',
              fontSize: '13px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              textAlign: 'right',
            }}>
              <span style={{ fontSize: '11px', color: 'var(--text3)' }}>下一节 →</span>
              <span>{next.title.split(' · ')[0]}</span>
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  )
}
