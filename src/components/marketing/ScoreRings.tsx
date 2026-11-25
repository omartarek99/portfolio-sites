'use client'

import { useEffect, useRef, useState } from 'react'

const R = 34
const CIRCUMFERENCE = 2 * Math.PI * R
const DURATION_MS = 1400

/**
 * PageSpeed-style score rings that fill and count up from 0 the first time
 * they scroll into view. Rendered at their final values on the server, so
 * without JavaScript or with reduced motion they simply show the scores.
 */
export function ScoreRings({ scores }: { scores: { label: string; score: number }[] }) {
  const ref = useRef<HTMLUListElement>(null)
  const [progress, setProgress] = useState(1) // 0 → 1 over the animation

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setProgress(0)
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS)
          setProgress(1 - (1 - t) ** 3) // ease-out
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <ul ref={ref} className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {scores.map(({ label, score }) => {
        const value = score * progress
        return (
          <li key={label} className="flex flex-col items-center gap-3 text-center">
            <div className="relative size-24 md:size-28">
              <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden="true">
                <circle cx="40" cy="40" r={R} fill="none" strokeWidth="6" className="stroke-fg/10" />
                <circle
                  cx="40"
                  cy="40"
                  r={R}
                  fill="none"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE * (1 - value / 100)}
                  className="stroke-[#0cce6b]"
                />
              </svg>
              <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-2xl font-semibold tabular-nums md:text-3xl">
                {Math.round(value)}
              </span>
            </div>
            <span className="text-sm font-medium text-fg/80">
              {label}
              <span className="sr-only">: {score}</span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}
