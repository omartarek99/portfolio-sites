/**
 * Infinite horizontal scroller (client logos, skill tags, testimonials).
 *
 * Pure CSS — `.site-marquee` / `.site-marquee-track` in src/styles/site.css do
 * the work: the track holds the children twice and the keyframe shifts it by
 * exactly one copy, so the loop is seamless. It pauses on hover and focus, runs
 * the other way in RTL, and falls back to a centred wrap under
 * `prefers-reduced-motion`, `data-motion="none"` and static renders.
 */
import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface MarqueeProps {
  children: ReactNode
  /** One loop in seconds. Longer = slower. Default 32. */
  seconds?: number
  /** Space between items. Default 3rem. */
  gap?: string
  className?: string
}

export function Marquee({ children, seconds = 32, gap = '3rem', className }: MarqueeProps) {
  const vars = {
    '--site-marquee-duration': `${seconds}s`,
    '--site-marquee-gap': gap,
  } as CSSProperties

  return (
    <div className={cn('site-marquee', className)} style={vars}>
      <div className="site-marquee-track">
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        {/* The duplicate completes the loop and is hidden from assistive tech. */}
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
