'use client'

/**
 * Category filter for galleries, project grids and publication lists.
 *
 * The items stay server-rendered: tag each one with `data-category` (one value,
 * or several separated by commas) and wrap them in `<FilterTabs>`. Selecting a
 * category hides the rest with the `hidden` attribute, so there is no
 * re-mounting and no flash of the wrong items.
 *
 *   <FilterTabs categories={categories} locale={ctx.locale}>
 *     {items.map((item, i) => (
 *       <article key={item.id} data-category={item.category} …>…</article>
 *     ))}
 *   </FilterTabs>
 *
 * With no JavaScript every item is visible, which is the right fallback.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Locale } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { st } from './strings'

export interface FilterCategory {
  value: string
  label: string
}

export interface FilterTabsProps {
  categories: FilterCategory[]
  locale: Locale
  children: ReactNode
  /** Label of the "everything" option. Defaults to the shared "All" string. */
  allLabel?: string
  /** Class on the element wrapping the children. */
  listClassName?: string
  className?: string
}

const ALL = '*'

export function FilterTabs({
  categories,
  locale,
  children,
  allLabel,
  listClassName,
  className,
}: FilterTabsProps) {
  const [active, setActive] = useState(ALL)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    for (const element of list.querySelectorAll<HTMLElement>('[data-category]')) {
      const values = (element.dataset.category ?? '').split(',').map((value) => value.trim())
      element.hidden = active !== ALL && !values.includes(active)
    }
  }, [active, children])

  if (categories.length === 0) return <div className={className}>{children}</div>

  const options: FilterCategory[] = [{ value: ALL, label: allLabel ?? st(locale, 'all') }, ...categories]

  return (
    <div className={className}>
      <div role="group" aria-label={st(locale, 'filterByCategory')} className="mb-8 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={option.value === active}
            onClick={() => setActive(option.value)}
            className={cn(
              'site-btn',
              option.value === active ? '' : 'opacity-80 hover:opacity-100',
            )}
            data-variant={option.value === active ? 'primary' : 'secondary'}
            data-size="sm"
          >
            {option.label}
          </button>
        ))}
      </div>
      <div ref={listRef} className={listClassName}>
        {children}
      </div>
    </div>
  )
}
