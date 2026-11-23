import { plainText, pick } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { hasImage, hasText, Img, T } from '../../_shared'
import type { BlockContext } from '../../types'
import type { EducationItem } from '../schema'

interface PartProps {
  ctx: BlockContext
  item: EducationItem
  index: number
  className?: string
}

/** Institution · location, with the separator only when both are there. */
export function InstitutionLine({ ctx, item, index, className }: PartProps) {
  const school = hasText(ctx, item.institution)
  const place = hasText(ctx, item.location)
  if (!school && !place) return null
  return (
    <p className={cn('flex flex-wrap items-baseline gap-x-2', className)}>
      <T ctx={ctx} path={`items.${index}.institution`} value={item.institution} className="font-medium" placeholder="Institution" />
      {school && place ? (
        <span aria-hidden="true" className="site-muted">
          ·
        </span>
      ) : null}
      <T ctx={ctx} path={`items.${index}.location`} value={item.location} className="site-muted" placeholder="Location" />
    </p>
  )
}

/** The item's logo, or nothing when it has none (outside the editor). */
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
        alt={plainText(pick(item.institution, ctx.locale))}
      />
    </div>
  )
}
