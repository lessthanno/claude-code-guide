'use client'

import { useEffect, useRef } from 'react'

interface Props {
  html: string
  className?: string
  style?: React.CSSProperties
}

function addCopyButtons(container: HTMLElement) {
  container.querySelectorAll('pre').forEach((pre) => {
    if (pre.querySelector('.copy-btn')) return

    const btn = document.createElement('button')
    btn.className = 'copy-btn'
    btn.textContent = '复制'
    btn.setAttribute('aria-label', '复制代码')

    btn.addEventListener('click', () => {
      // Exclude the button text from the copied content
      const clone = pre.cloneNode(true) as HTMLElement
      clone.querySelectorAll('.copy-btn').forEach(b => b.remove())
      const text = clone.innerText

      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = '✓ 已复制'
        setTimeout(() => { btn.textContent = '复制' }, 1800)
      }).catch(() => {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        btn.textContent = '✓ 已复制'
        setTimeout(() => { btn.textContent = '复制' }, 1800)
      })
    })

    pre.style.position = 'relative'
    pre.appendChild(btn)
  })
}

export default function HandbookContent({ html, className = 'handbook-body', style }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) addCopyButtons(ref.current)
  }, [html])

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
