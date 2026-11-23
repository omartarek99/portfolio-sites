import { cn } from '@/lib/utils'
import type { BlockContext } from '../../types'
import { hasText, Icon, itemAttrs, st, T } from '../../_shared'
import { formatMoney } from '../../pricing/price'
import type { ServiceItem } from '../schema'

/** "From QAR 1,200" — or '' when the service has no price. */
export function priceText(ctx: BlockContext, item: ServiceItem): string {
  const price = item.price
  if (price?.amount === undefined) return ''
  const money = formatMoney(ctx.locale, price.amount, price.currency ?? 'USD')
  return price.from ? `${st(ctx.locale, 'from')} ${money}` : money
}

/** Price · duration on one line. Renders nothing when both are empty. */
export function PriceLine({ ctx, item, index, className }: { ctx: BlockContext; item: ServiceItem; index: number; className?: string }) {
  const price = priceText(ctx, item)
  const duration = hasText(ctx, item.duration)
  if (!price && !duration) return null
  return (
    <p className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-1', className)}>
      {price ? <span className="font-site-heading text-site-text font-semibold">{price}</span> : null}
      {price && duration ? <span aria-hidden="true" className="site-muted">·</span> : null}
      <T ctx={ctx} path={`items.${index}.duration`} value={item.duration} className="site-muted site-small" placeholder="Duration" />
    </p>
  )
}

/** Feature bullets with a check icon. */
export function Features({ ctx, item, index, className }: { ctx: BlockContext; item: ServiceItem; index: number; className?: string }) {
  const features = item.features ?? []
  if (features.length === 0) return null
  return (
    <ul className={cn('flex flex-col gap-2', className)}>
      {features.map((feature, i) => (
        <li key={feature.id} {...itemAttrs(ctx, `items.${index}.features`, i)} className="site-small flex gap-2">
          <Icon name="check" className="text-site-primary mt-[0.2em] size-4 shrink-0" />
          <T ctx={ctx} path={`items.${index}.features.${i}.text`} value={feature.text} placeholder="Feature" />
        </li>
      ))}
    </ul>
  )
}
