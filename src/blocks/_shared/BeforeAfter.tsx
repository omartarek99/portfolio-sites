'use client'

/**
 * Before/after comparison slider (architecture plans, retouching, redesigns).
 *
 * The handle is a native `<input type="range">` stretched over the image: that
 * gives dragging, clicking, touch and arrow-key control — and a real
 * accessible name and value — without a line of gesture code. In RTL the input
 * flips with `dir`, and the clip follows.
 */
import { useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import type { Locale } from '@/schemas/fields'
import { imageSrcSet, imageUrl } from '@/lib/media-url'
import { cn } from '@/lib/utils'
import { st } from './strings'

export interface BeforeAfterImage {
  src: string
  alt?: string
}

export interface BeforeAfterProps {
  before: BeforeAfterImage
  after: BeforeAfterImage
  locale: Locale
  dir: 'ltr' | 'rtl'
  /** Start position, 0–100. Default 50. */
  start?: number
  /** Aspect-ratio class. Default `aspect-[4/3]`. */
  ratioClassName?: string
  /** Show the "Before" / "After" badges. Default true. */
  labels?: boolean
  className?: string
  sizes?: string
}

export function BeforeAfter({
  before,
  after,
  locale,
  dir,
  start = 50,
  ratioClassName = 'aspect-[4/3]',
  labels = true,
  className,
  sizes = '100vw',
}: BeforeAfterProps) {
  const [position, setPosition] = useState(start)
  const rtl = dir === 'rtl'
  // `inset()` is physical, so the hidden side swaps with the direction.
  const clipPath = rtl ? `inset(0 0 0 ${100 - position}%)` : `inset(0 ${100 - position}% 0 0)`

  return (
    <div
      className={cn(
        'site-media relative isolate',
        'has-[input:focus-visible]:outline-site-primary has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2',
        ratioClassName,
        className,
      )}
    >
      {/* The "after" state lies underneath; the "before" image on top is clipped
          back as the handle moves towards the end. */}
      <img
        src={imageUrl(after.src, { width: 1600 })}
        srcSet={imageSrcSet(after.src, 1920)}
        sizes={sizes}
        alt={after.alt ?? ''}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 size-full object-cover"
      />
      <img
        src={imageUrl(before.src, { width: 1600 })}
        srcSet={imageSrcSet(before.src, 1920)}
        sizes={sizes}
        alt={before.alt ?? ''}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 size-full object-cover"
        style={{ clipPath }}
      />

      {labels ? (
        <>
          <span className="site-small bg-site-bg/85 text-site-text absolute bottom-3 start-3 rounded-full px-3 py-1">
            {st(locale, 'before')}
          </span>
          <span className="site-small bg-site-bg/85 text-site-text absolute bottom-3 end-3 rounded-full px-3 py-1">
            {st(locale, 'after')}
          </span>
        </>
      ) : null}

      {/* Divider and grip, purely decorative — the input below owns the behaviour.
          Flex centring overflows evenly, so it is correct in both directions. */}
      <span
        aria-hidden="true"
        className="bg-site-bg pointer-events-none absolute inset-y-0 flex w-0.5 items-center justify-center"
        style={{ insetInlineStart: `calc(${position}% - 1px)` }}
      >
        <span className="bg-site-bg text-site-text flex size-10 shrink-0 items-center justify-center rounded-full shadow-lg">
          <MoveHorizontal aria-hidden="true" className="size-5" />
        </span>
      </span>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        dir={dir}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={st(locale, 'dragToCompare')}
        aria-valuetext={`${position}%`}
        className="absolute inset-0 size-full cursor-ew-resize appearance-none bg-transparent opacity-0"
      />
    </div>
  )
}
