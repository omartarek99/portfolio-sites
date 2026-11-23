import { hasImage, Icon, itemAttrs, T } from '../../_shared'
import type { EducationProps } from '../schema'
import { InstitutionLine, Logo } from './parts'

export function Cards({ content, ctx }: EducationProps) {
  const items = content.items ?? []
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <li key={item.id} {...itemAttrs(ctx, 'items', i)} data-reveal="" className="site-card flex flex-col gap-4 p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            {hasImage(ctx, item.logo) ? (
              <Logo ctx={ctx} item={item} index={i} />
            ) : (
              <span className="bg-site-primary/10 text-site-primary rounded-site-sm grid size-12 shrink-0 place-items-center">
                <Icon name="graduation-cap" className="size-6" />
              </span>
            )}
            {item.period ? <p className="site-small text-site-primary font-semibold tabular-nums">{item.period}</p> : null}
          </div>
          <div>
            <T ctx={ctx} path={`items.${i}.qualification`} value={item.qualification} as="h3" className="site-h3" placeholder="Qualification" />
            <InstitutionLine ctx={ctx} item={item} index={i} className="mt-1" />
          </div>
          <T
            ctx={ctx}
            path={`items.${i}.description`}
            value={item.description}
            as="p"
            multiline
            className="site-muted text-[0.9375rem]"
            placeholder="Focus, honours or thesis"
          />
        </li>
      ))}
    </ul>
  )
}
