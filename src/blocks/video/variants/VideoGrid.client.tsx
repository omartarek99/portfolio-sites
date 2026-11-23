'use client'

/**
 * Behaviour of the video grid (Motion Reel), around server-rendered tiles:
 * - mouse hover plays the tile's muted `video[data-preview]` (never under reduced
 *   motion or the theme's "none" motion level; touch and keyboard get the poster);
 * - clicking a `[data-video-index]` trigger opens the video in a full-screen dialog.
 * Clicks and hovers are delegated, so tiles stay plain server markup.
 */
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from 'react'
import { X } from 'lucide-react'
import type { Locale, VideoRef } from '@/schemas/fields'
import { st, VideoPlayer } from '../../_shared'

export interface GridVideo {
  video: VideoRef
  title?: string
  description?: string
}

function stop(tile: HTMLElement | null) {
  const video = tile?.querySelector<HTMLVideoElement>('video[data-preview]')
  if (!video) return
  video.pause()
  video.currentTime = 0
  delete video.dataset.playing
}

function start(tile: HTMLElement) {
  const video = tile.querySelector<HTMLVideoElement>('video[data-preview]')
  if (!video) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (tile.closest<HTMLElement>('[data-motion]')?.dataset.motion === 'none') return
  // React does not render the `muted` attribute on the server; unmuted media may not start without a gesture.
  video.muted = true
  void video
    .play()
    .then(() => {
      video.dataset.playing = ''
    })
    .catch(() => undefined)
}

export function VideoLightbox({
  videos,
  locale,
  className,
  children,
}: {
  videos: GridVideo[]
  locale: Locale
  className?: string
  children: ReactNode
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const hovered = useRef<HTMLElement | null>(null)
  const [index, setIndex] = useState<number | null>(null)

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const trigger = (event.target as HTMLElement).closest<HTMLElement>('[data-video-index]')
    if (!trigger) return
    const next = Number(trigger.dataset.videoIndex)
    if (!Number.isInteger(next) || !videos[next]) return
    event.preventDefault()
    stop(hovered.current)
    hovered.current = null
    setIndex(next)
    dialogRef.current?.showModal()
  }

  const onPointerOver = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const tile = (event.target as HTMLElement).closest<HTMLElement>('[data-video-index]')
    if (tile === hovered.current) return
    stop(hovered.current)
    hovered.current = tile
    if (tile) start(tile)
  }

  const onPointerLeave = () => {
    stop(hovered.current)
    hovered.current = null
  }

  // Keep the page behind the dialog from scrolling while it is open.
  useEffect(() => {
    if (index === null) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [index])

  const current = index === null ? undefined : videos[index]

  return (
    <div className={className} onClick={onClick} onPointerOver={onPointerOver} onPointerLeave={onPointerLeave}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label={current?.title || st(locale, 'playVideo')}
        onClose={() => setIndex(null)}
        className="bg-site-bg text-site-text m-0 h-full max-h-none w-full max-w-none p-0"
      >
        {current ? (
          <div className="flex min-h-full flex-col">
            <div className="flex justify-end p-4">
              <button
                type="button"
                autoFocus
                onClick={() => dialogRef.current?.close()}
                aria-label={st(locale, 'close')}
                className="border-site-border hover:bg-site-surface inline-flex size-10 items-center justify-center rounded-full border"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-5 px-4 pb-8">
              <VideoPlayer video={{ ...current.video, title: current.video.title ?? (current.title ? { en: current.title, ar: current.title } : undefined) }} locale={locale} />
              {current.title || current.description ? (
                <div className="flex max-w-3xl flex-col gap-2">
                  {current.title ? <p className="site-h4">{current.title}</p> : null}
                  {current.description ? <p className="site-muted">{current.description}</p> : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  )
}
