import { Container, SectionHeader } from '../_shared'
import type { PricingProps } from './schema'
import { t } from './strings'
import { Compare } from './variants/Compare'
import { PeriodToggle } from './variants/PeriodToggle.client'
import { Tiers } from './variants/Tiers'

/**
 * The root carries `data-period`; prices for the other period are hidden by
 * CSS, and the client toggle flips the attribute.
 */
export function Pricing(props: PricingProps) {
  const { content, ctx, section, variant } = props
  const period = content.defaultPeriod ?? 'one-time'
  const toggle = (content.tiers ?? []).some((tier) => tier.monthly !== undefined && tier.oneTime !== undefined)
  const Items = variant === 'compare' ? Compare : Tiers
  return (
    <Container section={section}>
      <div data-period={period} className="group/pricing">
        <SectionHeader ctx={ctx} content={content} section={section} />
        {toggle ? (
          <div className={section.style.textAlign === 'center' ? 'mb-10 flex justify-center' : 'mb-10'}>
            <PeriodToggle
              initial={period}
              label={t(ctx.locale, 'billing')}
              labels={{ 'one-time': t(ctx.locale, 'oneTime'), monthly: t(ctx.locale, 'monthly') }}
            />
          </div>
        ) : null}
        <Items {...props} />
      </div>
    </Container>
  )
}
