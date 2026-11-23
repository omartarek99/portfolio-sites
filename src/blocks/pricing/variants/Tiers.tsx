import { cn } from '@/lib/utils'
import { Btn, Icon, itemAttrs, T } from '../../_shared'
import type { PricingProps } from '../schema'
import { PopularBadge, TierPrice } from './parts'

const COLS = ['', 'mx-auto max-w-md', 'mx-auto max-w-4xl md:grid-cols-2', 'md:grid-cols-2 lg:grid-cols-3', 'sm:grid-cols-2 xl:grid-cols-4']

/** 2–4 tier cards; one can be marked popular. */
export function Tiers({ content, ctx }: PricingProps) {
  const tiers = content.tiers ?? []
  const currency = content.currency ?? 'USD'
  if (tiers.length === 0) return null
  return (
    <ul className={cn('grid gap-6 pt-3 lg:gap-8', COLS[tiers.length])}>
      {tiers.map((tier, index) => (
        <li
          key={tier.id}
          {...itemAttrs(ctx, 'tiers', index)}
          data-reveal=""
          className={cn('site-card relative flex flex-col gap-6 p-7 md:p-8', tier.popular && 'border-site-primary shadow-lg')}
        >
          {tier.popular ? <PopularBadge ctx={ctx} className="absolute -top-3 start-7" /> : null}
          <div className="flex flex-col gap-2">
            <T ctx={ctx} path={`tiers.${index}.name`} value={tier.name} as="h3" className="site-h4" placeholder="Tier name" />
            <T ctx={ctx} path={`tiers.${index}.description`} value={tier.description} as="p" className="site-muted site-small" placeholder="Who it is for" multiline />
          </div>
          <TierPrice ctx={ctx} tier={tier} currency={currency} />
          <Btn ctx={ctx} path={`tiers.${index}.cta`} value={tier.cta} variant={tier.popular ? 'primary' : 'outline'} block />
          {tier.features?.length ? (
            <ul className="border-site-border flex flex-col gap-3 border-t pt-6">
              {tier.features.map((feature, i) => (
                <li key={feature.id} {...itemAttrs(ctx, `tiers.${index}.features`, i)} className="site-small flex gap-2.5">
                  <Icon name="check" className="text-site-primary mt-[0.15em] size-4 shrink-0" />
                  <T ctx={ctx} path={`tiers.${index}.features.${i}.text`} value={feature.text} placeholder="Feature" />
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
