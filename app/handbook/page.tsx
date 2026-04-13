import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

const CHAPTERS = [
  { id: 'sa',        num: '01', name: '模拟退火',   domain: 'Prompt 调优',      tag: 'tag-phys', label: '物理' },
  { id: 'fourier',   num: '02', name: '傅里叶分解', domain: '任务拆解',          tag: 'tag-math', label: '数学' },
  { id: 'phase',     num: '03', name: '相变',       domain: '系统临界点',        tag: 'tag-phys', label: '物理' },
  { id: 'pid',       num: '04', name: 'PID 控制器', domain: 'Agent 反馈',        tag: 'tag-ctrl', label: '控制' },
  { id: 'attractor', num: '05', name: '奇异吸引子', domain: 'System Prompt 设计', tag: 'tag-phys', label: '物理' },
  { id: 'entropy',   num: '06', name: '香农熵',     domain: 'Prompt 诊断',       tag: 'tag-info', label: '信息' },
  { id: 'pareto',    num: '07', name: '帕累托前沿', domain: '架构决策',          tag: 'tag-math', label: '数学' },
]

function getHandbookContent(): string {
  const filePath = path.join(process.cwd(), 'data', 'handbook', 'mental-models.html')
  const raw = fs.readFileSync(filePath, 'utf8')
  const match = raw.match(/<main>([\s\S]*?)<\/main>/)
  return match ? match[1] : ''
}

export default function HandbookPage() {
  const content = getHandbookContent()

  return (
    <div className="layout-root">
      <Sidebar />

      <div className="layout-body">
        <header className="layout-header" style={{ gap: '8px', justifyContent: 'flex-start' }}>
          <span style={{ fontSize: '13px', color: 'var(--text3)' }}>📖 参考手册</span>
          <span style={{ color: 'var(--border2)', fontSize: '13px' }}>/</span>
          <span style={{ fontSize: '13px', color: 'var(--text2)' }}>Claude Code 开发心智模型手册</span>
        </header>

        <div className="layout-row">
          {/* Main content */}
          <main className="article-main" style={{ maxWidth: '860px' }}>
            <div
              className="handbook-body"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </main>

          {/* Chapter TOC */}
          <aside className="article-toc">
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '12px' }}>
              本册目录
            </div>
            {CHAPTERS.map(ch => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 0',
                  fontSize: '12px',
                  color: 'var(--text3)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', minWidth: '16px' }}>{ch.num}</span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ch.name}</span>
                <span style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '3px', fontWeight: 600, flexShrink: 0 }} className={ch.tag}>{ch.label}</span>
              </a>
            ))}
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', margin: '16px 0 8px' }}>
              快速查找
            </div>
            <a href="#signals" style={{ display: 'block', padding: '6px 0', fontSize: '12px', color: 'var(--text3)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>识别信号表</a>
            <a href="#antipatterns" style={{ display: 'block', padding: '6px 0', fontSize: '12px', color: 'var(--text3)', textDecoration: 'none' }}>反模式对照</a>
          </aside>
        </div>
      </div>
    </div>
  )
}
