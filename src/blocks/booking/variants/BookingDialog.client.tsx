'use client'

/**
 * A button that opens the booking window: a native modal <dialog> (focus
 * trap, Escape and the top layer for free). Never opens inside the editor,
 * where a click edits the label instead.
 */
import { useId, useRef, type ReactNode } from 'react'
import { Icon, st } from '../../_shared'
import type { BlockContext } from '../../types'

export function BookingDialog({ ctx, label, title, children }: { ctx: BlockContext; label: ReactNode; title: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  return (
    <>
      <button
        type="button"
        className="site-btn self-start"
        data-variant="primary"
        data-size="lg"
        aria-haspopup="dialog"
        onClick={() => {
          if (ctx.mode !== 'editor') dialog.current?.showModal()
        }}
      >
        {label}
        <Icon name="calendar" className="size-[1.1em] shrink-0" />
      </button>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        // A click on the backdrop lands on the <dialog> itself.
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        className="site-card backdrop:bg-site-text/50 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto p-0 backdrop:backdrop-blur-sm"
      >
        <div className="flex flex-col gap-6 p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="site-h3">
              {title}
            </h2>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label={st(ctx.locale, 'close')}
              className="site-muted hover:text-site-text -me-2 inline-flex size-10 shrink-0 items-center justify-center rounded-full"
            >
              <Icon name="x" className="size-5" />
            </button>
          </div>
          {children}
        </div>
      </dialog>
    </>
  )
}
