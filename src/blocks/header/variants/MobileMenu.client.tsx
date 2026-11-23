'use client'

import { useId, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Menu button + full-screen menu. A native modal <dialog> does the hard
 * parts: focus trap, Escape to close, inert page behind, focus back on the
 * button afterwards. Page scroll is locked by the `:has(dialog[open])` rule in
 * Header.tsx. Any link inside closes the menu (same-page anchors).
 */
export function MobileMenu({
  children,
  openLabel,
  closeLabel,
  title,
  label,
  icon,
  closeIcon,
  disabled,
  className,
}: {
  children: ReactNode
  openLabel: string
  closeLabel: string
  /** Accessible name of the dialog. */
  title: string
  /** Visible word next to the icon. */
  label?: string
  icon: ReactNode
  closeIcon: ReactNode
  /** Editor canvas: the button is shown but does not open. */
  disabled?: boolean
  className?: string
}) {
  const id = useId()
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const button =
    'border-site-border text-site-text hover:border-site-text rounded-site-btn inline-flex h-11 min-w-11 cursor-pointer items-center justify-center gap-2 border px-3 text-sm font-semibold transition-colors'

  return (
    <div className={cn('flex', className)}>
      <button
        type="button"
        aria-label={label ? undefined : openLabel}
        aria-expanded={open}
        aria-controls={id}
        aria-haspopup="dialog"
        className={button}
        onClick={() => {
          if (disabled) return
          dialog.current?.showModal()
          setOpen(true)
        }}
      >
        {label ? <span>{label}</span> : null}
        {icon}
      </button>
      <dialog
        ref={dialog}
        id={id}
        aria-label={title}
        data-site-menu=""
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if ((event.target as Element).closest('a[href]')) dialog.current?.close()
        }}
        className="bg-site-bg text-site-text m-0 h-dvh max-h-none w-full max-w-none flex-col overflow-y-auto p-0 transition-opacity duration-200 open:flex motion-reduce:transition-none starting:open:opacity-0"
      >
        <div className="site-container flex min-h-16 shrink-0 items-center justify-end py-3">
          <button type="button" aria-label={closeLabel} className={button} onClick={() => dialog.current?.close()}>
            {closeIcon}
          </button>
        </div>
        <div className="site-container flex grow flex-col pt-6 pb-10">{children}</div>
      </dialog>
    </div>
  )
}
