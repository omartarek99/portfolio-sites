'use client'

/**
 * Rotating word in a headline ("A portfolio for __designers / writers /
 * founders__").
 *
 * Every word is rendered, stacked in one grid cell: the widest word sets the
 * width so the headline never reflows, the first word is visible on the server,
 * and with no JavaScript (or under reduced motion) it simply stays.
 */
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface WordRotateProps {
  words: string[]
  /** ms each word stays. Default 2200. */
  interval?: number
  className?: string
  /** Class on the active word, e.g. "site-gradient-text". */
  wordClassName?: string
}

export function WordRotate({ words, interval = 2200, className, wordClassName }: WordRotateProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (words.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActive((current) => (current + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words, interval])

  if (words.length === 0) return null

  return (
    <span className={cn('inline-grid align-bottom', className)}>
      {words.map((word, index) => (
        <span
          key={`${index}-${word}`}
          aria-hidden={index === active ? undefined : 'true'}
          className={cn(
            'col-start-1 row-start-1 transition-all duration-500 ease-out motion-reduce:transition-none',
            index === active ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0',
            wordClassName,
          )}
        >
          {word}
        </span>
      ))}
    </span>
  )
}
