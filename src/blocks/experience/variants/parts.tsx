import { plainText, pick } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { hasImage, hasText, Img, st, T } from '../../_shared'
import type { BlockContext } from '../../types'
import type { ExperienceItem } from '../schema'

interface PartProps {
  ctx: BlockContext
  item: ExperienceItem
  index: number
  className?: string
}

/** "2021 – Present". Empty when the item has no dates. */
export function periodLabel(ctx: BlockContext, item: ExperienceItem): string {
  const end = item.current ? st(ctx.locale, 'present') : item.end
  return [item.start, end].filter(Boolean).join(' – ')
}

export function Period({ ctx, item, className }: Omit<PartProps, 'index'>) {
  const label = periodLabel(ctx, item)
  return label ? <p className={cn('site-small tabular-nums', className)}>{label}</p> : null
}

/** Organisation · location, with the separator only when both are there. */
export function OrgLine({ ctx, item, index, className }: PartProps) {
  const org = hasText(ctx, item.organisation)
  const place = hasText(ctx, item.location)
  if (!org && !place) return null
  return (
    <p className={cn('flex flex-wrap items-baseline gap-x-2', className)}>
      <T ctx={ctx} path={`items.${index}.organisation`} value={item.organisation} className="font-medium" placeholder="Organisation" />
      {org && place ? (
        <span aria-hidden="true" className="site-muted">
          ·
        </span>
      ) : null}
      <T ctx={ctx} path={`items.${index}.location`} value={item.location} className="site-muted" placeholder="Location" />
    </p>
  )
}

export function Logo({ ctx, item, index, className }: PartProps) {
  if (!hasImage(ctx, item.logo)) return null
  return (
    <div className={cn('site-media border-site-border rounded-site-sm size-12 shrink-0 border', className)}>
      <Img
        ctx={ctx}
        path={`items.${index}.logo`}
        value={item.logo}
        sizes="48px"
        maxWidth={160}
        alt={plainText(pick(item.organisation, ctx.locale))}
      />
    </div>
  )
}

export function Tags({ item, className }: Pick<PartProps, 'item' | 'className'>) {
  if (!item.tags?.length) return null
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {item.tags.map((tag, i) => (
        <li key={`${tag}-${i}`} className="site-tag">
          {tag}
        </li>
      ))}
    </ul>
  )
}
