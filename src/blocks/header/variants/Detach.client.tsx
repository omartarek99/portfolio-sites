'use client'

import { useSyncExternalStore, type ReactNode } from 'react'

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

/** A <div> that gets `data-detached` once the page has scrolled (or always). */
export function Detach({ always, className, children }: { always?: boolean; className?: string; children: ReactNode }) {
  const scrolled = useSyncExternalStore(
    subscribe,
    () => window.scrollY > 12,
    () => false,
  )
  return (
    <div data-detached={always || scrolled ? '' : undefined} className={className}>
      {children}
    </div>
  )
}
