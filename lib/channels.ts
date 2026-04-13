// Static channel metadata — safe to import in Client Components (no fs/path)

export type Channel = 'daily' | 'mental-models' | 'templates' | 'community'

export const CHANNEL_META: Record<Channel, { label: string; emoji: string; desc: string; group: string }> = {
  'daily':         { label: 'Claude Code 日报', emoji: '🗞️', desc: '每日 Claude Code 动态速递',          group: '深度内容' },
  'mental-models': { label: '思维模型手册',     emoji: '📐', desc: '跨学科框架 × Claude Code 实战',      group: '深度内容' },
  'templates':     { label: '实战模板库',       emoji: '🛠️', desc: 'SOUL.md / SKILL.md 可复用模板',      group: '实战模板' },
  'community':     { label: '社区讨论',         emoji: '💬', desc: '提问、分享、案例',                    group: '社区' },
}

export const SPACE_GROUPS = [
  {
    label: '入门',
    spaces: [] as Channel[],
    links: [
      { label: '快速开始', href: '/start', emoji: '📌' },
      { label: '加入 Pro', href: '/pro', emoji: '⭐️' },
      { label: '心智模型手册', href: '/handbook/', emoji: '📖' },
    ],
  },
  {
    label: '深度内容',
    spaces: ['daily', 'mental-models'] as Channel[],
    links: [],
  },
  {
    label: '实战模板',
    spaces: ['templates'] as Channel[],
    links: [],
  },
  {
    label: '社区',
    spaces: ['community'] as Channel[],
    links: [],
  },
]
