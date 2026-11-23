import { itemAttrs, T } from '../../_shared'
import type { EducationProps } from '../schema'
import { InstitutionLine, Logo } from './parts'

export function List({ content, ctx }: EducationProps) {
  const items = content.items ?? []
  return (
    <ul className="divide-site-border border-site-border divide-y border-y">
      {items.map((item, i) => (
        <li
          key={item.id}
          {...itemAttrs(ctx, 'items', i)}
          data-reveal=""
          className="grid gap-x-10 gap-y-1 py-6 md:grid-cols-[9rem_minmax(0,1fr)] md:py-8"
        >
          {item.period ? <p className="site-small site-muted font-medium tabular-nums md:pt-1">{item.period}</p> : null}
          <div className="flex min-w-0 items-start justify-between gap-4 md:col-start-2">
            <div className="min-w-0">
              <T ctx={ctx} path={`items.${i}.qualification`} value={item.qualification} as="h3" className="site-h3" placeholder="Qualification" />
              <InstitutionLine ctx={ctx} item={item} index={i} className="mt-1" />
              <T
                ctx={ctx}
                path={`items.${i}.description`}
                value={item.description}
                as="p"
                multiline
                className="site-muted mt-3 max-w-2xl"
                placeholder="Focus, honours or thesis"
              />
            </div>
            <Logo ctx={ctx} item={item} index={i} />
          </div>
        </li>
      ))}
    </ul>
  )
}
