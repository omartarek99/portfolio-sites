import { CountUp, hasIcon, Icon, itemAttrs, T } from '../../_shared'
import type { StatsProps } from '../schema'

const valueClass = 'font-site-heading text-site-primary text-4xl leading-none font-bold md:text-5xl'

/** Cards whose numbers count up when they scroll into view. */
export function Counters({ content, ctx }: StatsProps) {
  const items = content.items ?? []
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(10rem,100%),1fr))] gap-4 md:gap-6">
      {items.map((item, i) => (
        <li key={item.id} {...itemAttrs(ctx, 'items', i)} data-reveal="" className="site-card flex flex-col gap-2 p-5 md:p-7">
          {item.icon && hasIcon(item.icon) ? <Icon name={item.icon} aria-hidden="true" className="text-site-primary mb-2 size-7" /> : null}
          {/* In the editor the number is edited in place; on the site it counts up. */}
          {ctx.mode === 'editor' ? (
            <T ctx={ctx} path={`items.${i}.value`} value={item.value} className={valueClass} placeholder="10+" />
          ) : (
            <CountUp value={item.value} locale={ctx.locale} className={valueClass} />
          )}
          <T ctx={ctx} path={`items.${i}.label`} value={item.label} as="p" className="mt-2 font-semibold" placeholder="Label" />
          <T ctx={ctx} path={`items.${i}.description`} value={item.description} as="p" className="site-small site-muted" placeholder="Short description" />
        </li>
      ))}
    </ul>
  )
}
