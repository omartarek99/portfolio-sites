'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '../../_shared'

/**
 * Below md the bar is fixed to the bottom of the viewport and the page gets
 * matching bottom padding, so it never covers the last content. Dismissing it
 * removes both. From md up it is an ordinary slim band in the page flow.
 * ponytail: dismissal lasts for this page view; persist it per visit if visitors ask.
 */
export function StickyBar({ id, fixed, dismissLabel, children }: { id: string; fixed: boolean; dismissLabel: string; children: ReactNode }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  return (
    <div
      data-cta-bar={id}
      className={cn(
        'site-card flex items-center gap-3 px-4 py-3 md:gap-8 md:px-8 md:py-5',
        fixed &&
          'max-md:bg-site-bg max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:z-40 max-md:rounded-none max-md:border-x-0 max-md:border-b-0 max-md:pb-[max(0.75rem,env(safe-area-inset-bottom))] max-md:shadow-[0_-8px_24px_-12px_color-mix(in_oklab,var(--site-text)_35%,transparent)]',
      )}
    >
      {fixed ? (
        <style>{`@media (max-width: 47.99rem) { body:has([data-cta-bar="${id}"]) { padding-block-end: calc(5.5rem + env(safe-area-inset-bottom)); } }`}</style>
      ) : null}
      {children}
      {fixed ? (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label={dismissLabel}
          className="site-muted hover:text-site-text -me-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full md:hidden"
        >
          <Icon name="x" className="size-5" />
        </button>
      ) : null}
    </div>
  )
}
