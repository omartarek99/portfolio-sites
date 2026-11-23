'use client'

/**
 * Slider used by gallery, testimonials, projects and logo blocks. Embla does
 * the dragging and the snapping; everything else here is keyboard and ARIA.
 *
 * The slides arrive as `children` from a server-rendered parent, so blocks keep
 * rendering their content with `<Img>` / `<T>` and only the shell is client code.
 *
 *   <Carousel locale={ctx.locale} dir={ctx.dir} autoplay>
 *     {items.map((item) => <ProjectCard key={item.id} … />)}
 *   </Carousel>
 */
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Locale } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { st } from './strings'

export interface CarouselProps {
  locale: Locale
  dir: 'ltr' | 'rtl'
  children: ReactNode
  /** Accessible name of the carousel region. */
  label?: string
  /** true = 5s, or a delay in ms. Paused on hover, on focus and under reduced motion. */
  autoplay?: boolean | number
  loop?: boolean
  align?: 'start' | 'center'
  /** Slide width as a CSS basis, e.g. "100%" (default) or "min(22rem, 80%)". */
  slideBasis?: string
  gap?: string
  arrows?: boolean
  dots?: boolean
  className?: string
}

export function Carousel({
  locale,
  dir,
  children,
  label,
  autoplay = false,
  loop = true,
  align = 'start',
  slideBasis = '100%',
  gap = '1.25rem',
  arrows = true,
  dots = true,
  className,
}: CarouselProps) {
  const slides = Children.toArray(children)
  const delay = autoplay === true ? 5000 : typeof autoplay === 'number' ? autoplay : 0
  const plugins = useMemo(
    () =>
      delay > 0
        ? [Autoplay({ delay, playOnInit: false, stopOnMouseEnter: true, stopOnFocusIn: true, stopOnInteraction: false })]
        : [],
    [delay],
  )
  const [viewportRef, embla] = useEmblaCarousel({ direction: dir, loop, align, containScroll: 'trimSnaps' }, plugins)
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])

  useEffect(() => {
    if (!embla) return
    const sync = () => {
      setSelected(embla.selectedScrollSnap())
      setSnaps(embla.scrollSnapList())
    }
    sync()
    embla.on('select', sync).on('reInit', sync)
    return () => {
      embla.off('select', sync).off('reInit', sync)
    }
  }, [embla])

  // Autoplay starts only once we know the visitor has not asked for less motion.
  useEffect(() => {
    if (!embla || delay <= 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    embla.plugins().autoplay?.play()
  }, [embla, delay])

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!embla) return
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      // In RTL the next slide sits to the left.
      const forward = (event.key === 'ArrowRight') !== (dir === 'rtl')
      if (forward) embla.scrollNext()
      else embla.scrollPrev()
    },
    [embla, dir],
  )

  if (slides.length === 0) return null

  return (
    <div
      role="group"
      aria-roledescription={st(locale, 'carousel')}
      aria-label={label ?? st(locale, 'carousel')}
      className={cn('relative', className)}
      onKeyDown={onKeyDown}
    >
      <div className="overflow-hidden" ref={viewportRef}>
        <div className="flex" style={{ gap }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={st(locale, 'slide', { current: index + 1, total: slides.length })}
              className="min-w-0 shrink-0 grow-0"
              style={{ flexBasis: slideBasis }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {arrows && slides.length > 1 ? (
        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            aria-label={st(locale, 'previous')}
            className="border-site-border text-site-text hover:bg-site-primary hover:text-site-on-primary hover:border-site-primary inline-flex size-10 items-center justify-center rounded-full border transition-colors"
          >
            <ChevronLeft aria-hidden="true" className="size-5 rtl:-scale-x-100" />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            aria-label={st(locale, 'next')}
            className="border-site-border text-site-text hover:bg-site-primary hover:text-site-on-primary hover:border-site-primary inline-flex size-10 items-center justify-center rounded-full border transition-colors"
          >
            <ChevronRight aria-hidden="true" className="size-5 rtl:-scale-x-100" />
          </button>

          {dots && snaps.length > 1 ? (
            <div className="ms-auto flex items-center gap-2">
              {snaps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => embla?.scrollTo(index)}
                  aria-label={st(locale, 'goToSlide', { index: index + 1 })}
                  aria-current={index === selected || undefined}
                  className={cn(
                    'size-2.5 rounded-full transition-all',
                    index === selected ? 'bg-site-primary w-6' : 'bg-site-border hover:bg-site-muted',
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
