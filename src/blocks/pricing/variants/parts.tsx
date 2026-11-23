import { cn } from '@/lib/utils'
import type { BlockContext } from '../../types'
import { Icon, st } from '../../_shared'
import { formatMoney } from '../price'
import type { Period, Tier } from '../schema'
import { t } from '../strings'

/** The price shown for a period: its own, else the tier's other price with that period's suffix. */
function resolve(tier: Tier, period: Period): { amount: number; monthly: boolean } | null {
  const own = period === 'monthly' ? tier.monthly : tier.oneTime
  if (own !== undefined) return { amount: own, monthly: period === 'monthly' }
  const other = period === 'monthly' ? tier.oneTime : tier.monthly
  return other !== undefined ? { amount: other, monthly: period !== 'monthly' } : null
}

/** Hidden while the pricing root shows the other period. Static strings so Tailwind sees them. */
const HIDE: Record<Period, string> = {
  'one-time': 'group-data-[period=monthly]/pricing:hidden',
  monthly: 'group-data-[period=one-time]/pricing:hidden',
}

export function TierPrice({ ctx, tier, currency, className }: { ctx: BlockContext; tier: Tier; currency: string; className?: string }) {
  const oneTime = resolve(tier, 'one-time')
  const monthly = resolve(tier, 'monthly')
  if (!oneTime || !monthly) return null
  const same = oneTime.amount === monthly.amount && oneTime.monthly === monthly.monthly
  const entries: [Period | null, { amount: number; monthly: boolean }][] = same
    ? [[null, oneTime]]
    : [
        ['one-time', oneTime],
        ['monthly', monthly],
      ]
  return (
    <>
      {entries.map(([period, price]) => (
        <p key={period ?? 'both'} className={cn('flex flex-wrap items-baseline gap-x-1.5', period && HIDE[period], className)}>
          {tier.from ? <span className="site-small site-muted">{st(ctx.locale, 'from')}</span> : null}
          <span className="font-site-heading text-site-text text-3xl font-semibold md:text-4xl">
            {formatMoney(ctx.locale, price.amount, currency)}
          </span>
          <span className="site-small site-muted">{t(ctx.locale, price.monthly ? 'perMonth' : 'once')}</span>
        </p>
      ))}
    </>
  )
}

export function PopularBadge({ ctx, className }: { ctx: BlockContext; className?: string }) {
  return (
    <span className={cn('bg-site-primary text-site-on-primary inline-flex rounded-full px-3 py-1 text-xs font-semibold', className)}>
      {st(ctx.locale, 'popular')}
    </span>
  )
}

/** Check or dash with a spoken label. */
export function Mark({ ctx, included }: { ctx: BlockContext; included: boolean }) {
  return (
    <>
      <Icon
        name={included ? 'check' : 'minus'}
        className={cn('inline size-5 shrink-0', included ? 'text-site-primary' : 'text-site-muted')}
      />
      <span className="sr-only">{t(ctx.locale, included ? 'included' : 'notIncluded')}</span>
    </>
  )
}
