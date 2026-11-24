'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState, type KeyboardEvent } from 'react'

type Slide = { src: string; alt: string }

/**
 * Presentation slider: one slide at a time (swipe, arrows, keyboard), a counter,
 * and a thumbnail strip to jump to any slide. Embla handles drag and snapping.
 */
export function DeckSlider({
  slides,
  dir,
  labels,
}: {
  slides: Slide[]
  dir: 'ltr' | 'rtl'
  labels: { region: string; previous: string; next: string; goTo: string[] }
}) {
  const [viewportRef, main] = useEmblaCarousel({ direction: dir })
  const [thumbsRef, thumbs] = useEmblaCarousel({ direction: dir, dragFree: true, containScroll: 'keepSnaps' })
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!main) return
    const sync = () => {
      const index = main.selectedScrollSnap()
      setSelected(index)
      thumbs?.scrollTo(index)
    }
    main.on('select', sync)
    return () => {
      main.off('select', sync)
    }
  }, [main, thumbs])

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    // In RTL the next slide sits to the left.
    if ((event.key === 'ArrowRight') !== (dir === 'rtl')) main?.scrollNext()
    else main?.scrollPrev()
  }

  const arrow =
    'absolute top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75 disabled:pointer-events-none disabled:opacity-0'

  return (
    <div role="region" aria-roledescription="carousel" aria-label={labels.region} onKeyDown={onKeyDown}>
      <div className="relative">
        <div ref={viewportRef} className="overflow-hidden rounded-xl border border-fg/10 bg-white">
          <div className="flex">
            {slides.map((slide, i) => (
              <div key={slide.src} role="group" aria-roledescription="slide" aria-label={slide.alt} className="min-w-0 shrink-0 grow-0 basis-full">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  width={1600}
                  height={900}
                  draggable={false}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  className="aspect-video w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <button type="button" onClick={() => main?.scrollPrev()} disabled={selected === 0} aria-label={labels.previous} className={`${arrow} start-3`}>
          <ChevronLeft className="size-5 rtl:-scale-x-100" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => main?.scrollNext()}
          disabled={selected === slides.length - 1}
          aria-label={labels.next}
          className={`${arrow} end-3`}
        >
          <ChevronRight className="size-5 rtl:-scale-x-100" aria-hidden="true" />
        </button>
        <span aria-live="polite" className="absolute bottom-3 end-3 rounded-full bg-black/55 px-2.5 py-1 text-xs text-white tabular-nums">
          {selected + 1} / {slides.length}
        </span>
      </div>

      <div ref={thumbsRef} className="mt-3 overflow-hidden">
        <div className="flex gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => main?.scrollTo(i)}
              aria-label={labels.goTo[i]}
              aria-current={i === selected || undefined}
              className={`min-w-0 shrink-0 grow-0 basis-1/4 overflow-hidden rounded-lg border-2 transition sm:basis-[14%] ${
                i === selected ? 'border-vz-accent' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={slide.src} alt="" width={1600} height={900} loading="lazy" draggable={false} className="aspect-video w-full bg-white object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
