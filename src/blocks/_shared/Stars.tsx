/**
 * Star rating for testimonials and reviews. One accessible label carries the
 * whole thing ("4.5 out of 5 stars"); the stars themselves are decorative.
 */
import { Star } from 'lucide-react'
import type { Locale } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { formatNumber, st } from './strings'

export interface StarsProps {
  /** 0 … max. Fractions render as a partly filled star. */
  rating: number
  locale: Locale
  max?: number
  className?: string
  /** Size class for one star. Default `size-4`. */
  starClassName?: string
}

export function Stars({ rating, locale, max = 5, className, starClassName }: StarsProps) {
  const clamped = Math.min(max, Math.max(0, rating))
  const label = st(locale, 'rating', { rating: formatNumber(locale, Math.round(clamped * 10) / 10) })
  const stars = Array.from({ length: max })

  return (
    <span
      role="img"
      aria-label={label}
      className={cn('relative inline-flex w-fit items-center gap-0.5 align-middle', className)}
    >
      {stars.map((_, i) => (
        <Star key={i} aria-hidden="true" focusable="false" className={cn('text-site-muted size-4', starClassName)} />
      ))}
      {/* Filled overlay, clipped to the rating. Width is a percentage of the row,
          and `inset-inline-start: 0` keeps it anchored correctly in RTL. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 start-0 flex items-center gap-0.5 overflow-hidden"
        style={{ width: `${(clamped / max) * 100}%` }}
      >
        {stars.map((_, i) => (
          <Star
            key={i}
            aria-hidden="true"
            focusable="false"
            className={cn('text-site-primary size-4 shrink-0 fill-current', starClassName)}
          />
        ))}
      </span>
    </span>
  )
}
