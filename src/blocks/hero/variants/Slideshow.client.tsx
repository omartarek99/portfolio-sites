'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

const QUERY = '(prefers-reduced-motion: reduce)'
const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

/**
 * Cross-fading background slideshow (Noir Lens). The slides are server-rendered
 * <Img>s; this only decides which one shows. It never advances under reduced
 * motion or a theme with motion off, and it has a pause button (WCAG 2.2.2).
 */
export function Slideshow({
  slides,
  kenBurns,
  labels,
}: {
  slides: ReactNode[]
  kenBurns?: boolean
  labels: { pause: string; play: string }
}) {
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false)
  const [active, setActive] = useState(0)
  // null until the visitor presses the button: then their choice wins over the default.
  const [choice, setChoice] = useState<boolean | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const playing = choice ?? !reduced

  useEffect(() => {
    if (!playing || slides.length < 2) return
    if (choice === null && ref.current?.closest('[data-motion="none"], [data-static]')) return
    const id = setInterval(() => setActive((current) => (current + 1) % slides.length), 6500)
    return () => clearInterval(id)
  }, [playing, choice, slides.length])

  return (
    <div ref={ref} className="absolute inset-0">
      {slides.map((slide, index) => (
        <div
          key={index}
          aria-hidden={index === active ? undefined : 'true'}
          className={cn(
            'absolute inset-0 overflow-hidden transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none',
            index === active ? 'opacity-100' : 'opacity-0',
          )}
        >
          <div className={cn('size-full', kenBurns && 'site-kenburns')}>{slide}</div>
        </div>
      ))}
      {slides.length > 1 ? (
        <button
          type="button"
          onClick={() => setChoice(!playing)}
          aria-label={playing ? labels.pause : labels.play}
          className="site-btn absolute end-4 bottom-4 z-20"
          data-variant="secondary"
          data-size="sm"
        >
          {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
        </button>
      ) : null}
    </div>
  )
}
