import { cn } from '@/lib/utils'
import { pick } from '@/schemas/fields'
import type { BlockContext } from '../../types'
import { Btn, itemAttrs, T } from '../../_shared'
import type { CompareRow, PricingProps } from '../schema'
import { t } from '../strings'
import { Mark, PopularBadge, TierPrice } from './parts'

/** A cell's text, else a check / dash. Text is edited from the side panel. */
function Cell({ ctx, row, r, c }: { ctx: BlockContext; row: CompareRow; r: number; c: number }) {
  const cell = row.cells?.[c]
  if (cell && pick(cell.value, ctx.locale).trim() !== '') {
    return <T ctx={ctx} path={`rows.${r}.cells.${c}.value`} value={cell.value} />
  }
  return <Mark ctx={ctx} included={cell?.included ?? false} />
}

/**
 * Feature comparison. A real <table> (tiers as columns) from md up; below
 * that, one stacked card per tier. Only one is displayed, so assistive tech
 * never reads both.
 */
export function Compare({ content, ctx }: PricingProps) {
  const tiers = content.tiers ?? []
  const rows = content.rows ?? []
  const currency = content.currency ?? 'USD'
  if (tiers.length === 0) return null

  // th may not contain headings, so the table uses spans; the stacked cards use h3.
  const head = (index: number, as: 'h3' | 'span') => {
    const tier = tiers[index]!
    return (
      <div className="flex h-full flex-col items-start gap-3">
        {tier.popular ? <PopularBadge ctx={ctx} /> : null}
        <T ctx={ctx} path={`tiers.${index}.name`} value={tier.name} as={as} className="site-h4 block" placeholder="Tier name" />
        <T ctx={ctx} path={`tiers.${index}.description`} value={tier.description} as="p" className="site-muted site-small font-normal" placeholder="Who it is for" multiline />
        <TierPrice ctx={ctx} tier={tier} currency={currency} className="font-normal" />
        <Btn ctx={ctx} path={`tiers.${index}.cta`} value={tier.cta} variant={tier.popular ? 'primary' : 'outline'} size="sm" block className="mt-auto" />
      </div>
    )
  }

  return (
    <>
      <div className="hidden overflow-x-auto md:block" data-reveal="">
        <table className="w-full table-fixed border-collapse text-start">
          <thead>
            <tr>
              <td className="w-1/4 lg:w-1/3">
                <span className="sr-only">{t(ctx.locale, 'feature')}</span>
              </td>
              {tiers.map((tier, index) => (
                <th
                  key={tier.id}
                  {...itemAttrs(ctx, 'tiers', index)}
                  scope="col"
                  className={cn('rounded-t-site p-5 text-start align-top font-normal', tier.popular && 'bg-site-primary/5')}
                >
                  {head(index, 'span')}
                </th>
              ))}
            </tr>
          </thead>
          {rows.length > 0 ? (
            <tbody>
              {rows.map((row, r) => (
                <tr key={row.id} {...itemAttrs(ctx, 'rows', r)} className="border-site-border border-t">
                  <th scope="row" className="py-4 pe-4 text-start font-medium">
                    <T ctx={ctx} path={`rows.${r}.label`} value={row.label} placeholder="Feature" />
                  </th>
                  {tiers.map((tier, c) => (
                    <td key={tier.id} className={cn('site-small px-5 py-4 text-center', tier.popular && 'bg-site-primary/5')}>
                      <Cell ctx={ctx} row={row} r={r} c={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      </div>

      <ul className="grid gap-6 pt-3 md:hidden">
        {tiers.map((tier, index) => (
          <li
            key={tier.id}
            {...itemAttrs(ctx, 'tiers', index)}
            data-reveal=""
            className={cn('site-card flex flex-col gap-6 p-6', tier.popular && 'border-site-primary')}
          >
            {head(index, 'h3')}
            {rows.length > 0 ? (
              <dl className="border-site-border flex flex-col border-t">
                {rows.map((row, r) => (
                  <div key={row.id} className="border-site-border site-small flex items-center justify-between gap-4 border-b py-3 last:border-b-0">
                    <T ctx={ctx} path={`rows.${r}.label`} value={row.label} as="dt" placeholder="Feature" />
                    <dd className="text-end font-medium">
                      <Cell ctx={ctx} row={row} r={r} c={index} />
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  )
}
