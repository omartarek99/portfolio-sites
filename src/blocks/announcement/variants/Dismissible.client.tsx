'use client'

import { useState, useSyncExternalStore, type ReactNode } from 'react'

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null // storage blocked: the bar simply comes back on the next page
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange)
  return () => window.removeEventListener('storage', onChange)
}

/**
 * The announcement landmark plus a close button. Closing stores `signature`
 * under `storageKey`, so the bar stays closed until the message changes. A
 * closed bar gets `hidden` — gone for everyone, assistive tech included.
 */
export function Dismissible({
  storageKey,
  signature,
  label,
  dismissLabel,
  icon,
  disabled,
  className,
  children,
}: {
  storageKey: string
  /** Identifies the current message. */
  signature: string
  /** Accessible name of the landmark. */
  label: string
  dismissLabel: string
  icon: ReactNode
  /** Editor canvas: the button is shown but does nothing. */
  disabled?: boolean
  className?: string
  children: ReactNode
}) {
  const [closed, setClosed] = useState(false)
  const stored = useSyncExternalStore(
    subscribe,
    () => read(storageKey) === signature,
    () => false,
  )
  // Runs before first paint on server-rendered pages, so a closed bar never flashes in.
  const early = `(function(s){try{if(localStorage.getItem(${JSON.stringify(storageKey)})===${JSON.stringify(signature)})s.previousElementSibling.hidden=true}catch(e){}})(document.currentScript)`

  return (
    <>
      <aside aria-label={label} hidden={!disabled && (closed || stored)} suppressHydrationWarning className={className}>
        {children}
        <button
          type="button"
          aria-label={dismissLabel}
          className="me-2 inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full opacity-80 transition-opacity hover:opacity-100"
          onClick={() => {
            if (disabled) return
            try {
              localStorage.setItem(storageKey, signature)
            } catch {}
            setClosed(true)
          }}
        >
          {icon}
        </button>
      </aside>
      {disabled ? null : <script dangerouslySetInnerHTML={{ __html: early.replace(/</g, '\\u003c') }} />}
    </>
  )
}
