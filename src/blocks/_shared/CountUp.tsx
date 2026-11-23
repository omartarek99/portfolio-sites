'use client'

/**
 * Animates a stat number when it scrolls into view ("40+", "3x", "96%",
 * "1,200", "$1.5M").
 *
 * The value stays a plain string in content, so the editor and the AI never
 * have to think about this: `parseCountUp` splits off the prefix and suffix and
 * only the number counts. The final value is what renders on the server, and a
 * hidden copy of it reserves the width, so nothing shifts while counting and
 * the stat is correct without JavaScript and under reduced motion.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Locale } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { formatNumber } from './strings'

export interface ParsedCount {
  /** Anything before the digits, e.g. "$" or "~". */
  prefix: string
  value: number
  /** Anything after the digits, e.g. "+", "%", "x", "M". */
  suffix: string
  /** Decimal places to keep while counting. */
  decimals: number
}

/** `"$1.5M"` → `{ prefix: '$', value: 1.5, suffix: 'M', decimals: 1 }`. Null when there is no number. */
export function parseCountUp(text: string): ParsedCount | null {
  // The digits may hold grouping separators but must end on a digit, so a
  // trailing space stays with the suffix ("12 years").
  const match = text.trim().match(/^([^\d]*?)(\d(?:[\d,   ]*\d)?(?:\.\d+)?)(.*)$/)
  if (!match) return null
  const [, prefix, digits, suffix] = match
  const normalized = digits.replace(/[,  \s]/g, '')
  const value = Number(normalized)
  if (!Number.isFinite(value)) return null
  const decimals = normalized.includes('.') ? normalized.split('.')[1].length : 0
  return { prefix, value, suffix, decimals: Math.min(decimals, 4) }
}

export interface CountUpProps {
  /** The stat as authored, e.g. "40+". */
  value: string | number
  locale: Locale
  /** Count duration in ms. Default 1400. */
  duration?: number
  className?: string
}

export function CountUp({ value, locale, duration = 1400, className }: CountUpProps) {
  const text = String(value)
  const parsed = useMemo(() => parseCountUp(text), [text])
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState<string | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !parsed) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const format = (n: number) =>
      formatNumber(locale, n, { minimumFractionDigits: parsed.decimals, maximumFractionDigits: parsed.decimals })

    let frame = 0
    const run = () => {
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        // easeOutCubic: fast first, settles on the real number.
        const eased = 1 - Math.pow(1 - t, 3)
        setShown(format(parsed.value * eased))
        if (t < 1) frame = requestAnimationFrame(step)
        else setShown(null)
      }
      frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          observer.disconnect()
          setShown(format(0))
          run()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [parsed, locale, duration])

  if (!parsed) return <span className={className}>{text}</span>

  const final = `${parsed.prefix}${formatNumber(locale, parsed.value, {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  })}${parsed.suffix}`

  return (
    <span ref={ref} className={cn('inline-grid tabular-nums', className)}>
      {/* Reserves the final width in the same grid cell: no layout shift. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {final}
      </span>
      <span className="col-start-1 row-start-1">
        {shown === null ? final : `${parsed.prefix}${shown}${parsed.suffix}`}
      </span>
    </span>
  )
}
