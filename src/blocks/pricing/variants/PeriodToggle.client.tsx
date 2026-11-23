'use client'

import { useState, useSyncExternalStore, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'
import { PERIODS, type Period } from '../schema'

const noop = () => () => {}

/**
 * Monthly / one-time switch. Flips `data-period` on the nearest pricing root;
 * CSS shows the matching prices. Invisible until hydrated, so without
 * JavaScript the default period simply shows with no dead control.
 */
export function PeriodToggle({ initial, label, labels }: { initial: Period; label: string; labels: Record<Period, string> }) {
  const [period, setPeriod] = useState(initial)
  const hydrated = useSyncExternalStore(noop, () => true, () => false)

  const choose = (event: MouseEvent<HTMLButtonElement>, next: Period) => {
    setPeriod(next)
    event.currentTarget.closest('[data-period]')?.setAttribute('data-period', next)
  }

  return (
    <div
      role="group"
      aria-label={label}
      aria-hidden={hydrated ? undefined : true}
      className={cn('bg-site-surface border-site-border inline-flex rounded-full border p-1', !hydrated && 'invisible')}
    >
      {PERIODS.map((p) => (
        <button
          key={p}
          type="button"
          aria-pressed={period === p}
          onClick={(event) => choose(event, p)}
          className="text-site-muted hover:text-site-text aria-pressed:bg-site-primary aria-pressed:text-site-on-primary rounded-full px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none"
        >
          {labels[p]}
        </button>
      ))}
    </div>
  )
}
