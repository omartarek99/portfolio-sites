'use client'

/**
 * Full-screen image viewer for galleries and project pages.
 *
 * The thumbnails stay server-rendered: wrap them in `<Lightbox>` and mark each
 * trigger with `data-lightbox-index`. Clicks are delegated, so the block keeps
 * using `<Img>` and only the viewer is client code.
 *
 *   <Lightbox images={images} locale={ctx.locale} dir={ctx.dir}>
 *     {items.map((item, i) => (
 *       <button key={item.id} type="button" data-lightbox-index={i}>
 *         <Img ctx={ctx} path={`items.${i}.image`} value={item.image} />
 *       </button>
 *     ))}
 *   </Lightbox>
 *
 * Built on <dialog>, which gives the focus trap, Esc and focus restore for free.
 */
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Locale } from '@/schemas/fields'
import { imageUrl } from '@/lib/media-url'
import { st } from './strings'

export interface LightboxImage {
  src: string
  alt?: string
  caption?: string
}

export interface LightboxProps {
  images: LightboxImage[]
  locale: Locale
  dir: 'ltr' | 'rtl'
  children: ReactNode
  className?: string
}

const SWIPE_THRESHOLD = 48

const NAV_BUTTON =
  'border-site-border text-site-text hover:bg-site-primary hover:text-site-on-primary hover:border-site-primary inline-flex size-11 items-center justify-center rounded-full border transition-colors'

export function Lightbox({ images, locale, dir, children, className }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const startX = useRef<number | null>(null)
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => (current + delta + images.length) % images.length)
    },
    [images.length],
  )

  const close = useCallback(() => {
    dialogRef.current?.close()
  }, [])

  const onTriggerClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>('[data-lightbox-index]')
    if (!target) return
    const next = Number(target.dataset.lightboxIndex)
    if (!Number.isInteger(next) || next < 0 || next >= images.length) return
    event.preventDefault()
    setIndex(next)
    setOpen(true)
    dialogRef.current?.showModal()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    go((event.key === 'ArrowRight') !== (dir === 'rtl') ? 1 : -1)
  }

  // Keep the page behind the dialog from scrolling while it is open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (images.length === 0) return <div className={className}>{children}</div>

  const image = images[Math.min(index, images.length - 1)]
  const counter = st(locale, 'image', { current: index + 1, total: images.length })

  return (
    <div className={className} onClick={onTriggerClick}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label={counter}
        onClose={() => setOpen(false)}
        onKeyDown={onKeyDown}
        onPointerDown={(event) => {
          startX.current = event.clientX
        }}
        onPointerUp={(event) => {
          const from = startX.current
          startX.current = null
          if (from === null) return
          const delta = event.clientX - from
          if (Math.abs(delta) < SWIPE_THRESHOLD) return
          go((delta < 0) !== (dir === 'rtl') ? 1 : -1)
        }}
        className="bg-site-bg text-site-text m-0 h-full max-h-none w-full max-w-none p-0 backdrop:bg-black/85"
      >
        {open ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 p-4">
              <p className="site-small site-muted">{counter}</p>
              <button
                type="button"
                autoFocus
                onClick={close}
                aria-label={st(locale, 'close')}
                className="border-site-border hover:bg-site-surface inline-flex size-10 items-center justify-center rounded-full border"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-4 pb-4">
              <img
                src={imageUrl(image.src, { width: 1600 })}
                alt={image.alt ?? ''}
                className="max-h-full min-h-0 w-auto max-w-full flex-1 object-contain"
                draggable={false}
              />
              {image.caption ? (
                <figcaption className="site-small site-muted max-w-2xl text-center">{image.caption}</figcaption>
              ) : null}
            </figure>

            {images.length > 1 ? (
              <div className="flex items-center justify-center gap-3 p-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={st(locale, 'previous')}
                  className={NAV_BUTTON}
                >
                  <ChevronLeft aria-hidden="true" className="size-5 rtl:-scale-x-100" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label={st(locale, 'next')} className={NAV_BUTTON}>
                  <ChevronRight aria-hidden="true" className="size-5 rtl:-scale-x-100" />
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </div>
  )
}