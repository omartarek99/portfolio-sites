'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Fades and slides its content up the first time it scrolls into view.
 * Rendered visible on the server, so without JavaScript (and for anything
 * already on screen) nothing is hidden; reduced motion skips it entirely.
 */
export function Reveal({ className, delay = 0, children }: { className?: string; delay?: number; children: ReactNode }) {
  const ref = useRef<HTMLLIElement>(null)
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle')

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return // already in view
    setState('hidden')
    const observer = new IntersectionObserver(
      ([entry]) => {
        // In view, or already scrolled past (a jump link went beyond it).
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return
        setState('shown')
        observer.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <li
      ref={ref}
      className={`${className ?? ''} transition-[opacity,translate] duration-700 ease-out ${
        state === 'hidden' ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
      }`}
      style={state === 'shown' ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </li>
  )
}
