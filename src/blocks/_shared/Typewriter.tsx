'use client'

/**
 * Typed-text headline ("I design __brand systems__"). The first text renders in
 * full on the server, so the heading is complete for crawlers, without
 * JavaScript and under reduced motion — the typing only starts after mount.
 */
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface TypewriterProps {
  /** Texts to cycle through. The first one is the server-rendered value. */
  texts: string[]
  /** ms per character while typing. Default 70. */
  speed?: number
  /** ms a finished text stays on screen. Default 1800. */
  hold?: number
  className?: string
}

export function Typewriter({ texts, speed = 70, hold = 1800, className }: TypewriterProps) {
  const first = texts[0] ?? ''
  const [text, setText] = useState(first)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (texts.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let index = 0
    let length = texts[0].length
    let deleting = true

    const tick = () => {
      const current = texts[index]
      if (deleting) {
        length -= 1
        if (length <= 0) {
          deleting = false
          index = (index + 1) % texts.length
          length = 0
        }
      } else {
        length += 1
        if (length >= current.length) {
          length = current.length
          deleting = true
        }
      }
      const next = texts[index].slice(0, length)
      setText(next)
      const wait = deleting && length === texts[index].length ? hold : deleting ? speed / 2 : speed
      timer.current = setTimeout(tick, wait)
    }

    timer.current = setTimeout(tick, hold)
    return () => clearTimeout(timer.current)
  }, [texts, speed, hold])

  return (
    <span className={cn('inline', className)}>
      <span>{text}</span>
      {/* The caret blinks with CSS (.site-blink), so it stops under reduced motion. */}
      <span aria-hidden="true" className="site-blink text-site-primary ms-0.5 inline-block">
        |
      </span>
    </span>
  )
}
