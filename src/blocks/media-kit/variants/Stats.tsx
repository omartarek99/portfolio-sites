import { SOCIAL_LABELS } from '@/lib/links'
import { cn } from '@/lib/utils'
import { pick } from '@/schemas/fields'
import { A, BrandIcon, Btn, hasButton, hasText, itemAttrs, T } from '../../_shared'
import type { MediaKitProps } from '../schema'
import { t } from '../strings'

/** Platform reach cards, then audience facts beside rate cards, then the download button. */
export function Stats({ content, ctx }: MediaKitProps) {
  const platforms = content.platforms ?? []
  const audience = content.audience ?? []
  const rates = content.rates ?? []
  const both = audience.length > 0 && rates.length > 0

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {platforms.length ? (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-4">
          {platforms.map((item, i) => (
            <li key={item.id} {...itemAttrs(ctx, 'platforms', i)} data-reveal="" className="flex">
              <A ctx={ctx} link={item.link} className="site-card hover:border-site-primary flex w-full flex-col gap-5 p-6 transition-colors">
                <span className="flex items-center gap-3">
                  <span className="bg-site-primary text-site-on-primary grid size-11 shrink-0 place-items-center rounded-full">
                    <BrandIcon platform={item.platform} className="size-5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="font-semibold">{pick(SOCIAL_LABELS[item.platform], ctx.locale)}</span>
                    {item.handle ? (
                      <span className="site-small site-muted truncate" dir="ltr">
                        {item.handle}
                      </span>
                    ) : null}
                  </span>
                </span>
                <span className="flex flex-col">
                  <T ctx={ctx} path={`platforms.${i}.followers`} value={item.followers} className="site-h2 tabular-nums" placeholder="100K" />
                  <span className="site-small site-muted">{t(ctx.locale, 'followers')}</span>
                </span>
                {hasText(ctx, item.engagement) ? (
                  <span className="border-site-border mt-auto flex items-baseline justify-between gap-3 border-t pt-4">
                    <span className="site-small site-muted">{t(ctx.locale, 'engagement')}</span>
                    <T ctx={ctx} path={`platforms.${i}.engagement`} value={item.engagement} className="text-site-primary font-semibold tabular-nums" placeholder="5%" />
                  </span>
                ) : null}
              </A>
            </li>
          ))}
        </ul>
      ) : null}

      {audience.length || rates.length ? (
        <div className={cn('grid gap-12', both && 'lg:grid-cols-2 lg:gap-16')}>
          {audience.length ? (
            <div className="flex flex-col gap-6">
              <T ctx={ctx} path="audienceHeading" value={content.audienceHeading} as="h3" className="site-h3" placeholder="Audience" />
              <dl className="border-site-border border-t">
                {audience.map((fact, i) => (
                  <div key={fact.id} {...itemAttrs(ctx, 'audience', i)} data-reveal="" className="border-site-border flex items-baseline justify-between gap-4 border-b py-4">
                    <T ctx={ctx} path={`audience.${i}.label`} value={fact.label} as="dt" className="site-muted" placeholder="Label" />
                    <T ctx={ctx} path={`audience.${i}.value`} value={fact.value} as="dd" className="text-end font-semibold" placeholder="Value" />
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
          {rates.length ? (
            <div className="flex flex-col gap-6">
              <T ctx={ctx} path="ratesHeading" value={content.ratesHeading} as="h3" className="site-h3" placeholder="Rates" />
              <ul className="flex flex-col gap-3">
                {rates.map((rate, i) => (
                  <li key={rate.id} {...itemAttrs(ctx, 'rates', i)} data-reveal="" className="site-card flex flex-wrap items-start justify-between gap-x-6 gap-y-2 p-5">
                    <span className="flex min-w-0 flex-1 basis-48 flex-col gap-1">
                      <T ctx={ctx} path={`rates.${i}.deliverable`} value={rate.deliverable} className="font-semibold" placeholder="Deliverable" />
                      <T ctx={ctx} path={`rates.${i}.note`} value={rate.note} className="site-small site-muted" placeholder="What is included" />
                    </span>
                    <T ctx={ctx} path={`rates.${i}.price`} value={rate.price} className="site-h4 text-site-primary whitespace-nowrap tabular-nums" placeholder="From $500" />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      {hasButton(ctx, content.download) ? (
        <div className="flex">
          <Btn ctx={ctx} path="download" value={content.download} size="lg" />
        </div>
      ) : null}
    </div>
  )
}
