import { hasImage, itemAttrs, T } from '../../_shared'
import type { ExperienceProps } from '../schema'
import { Logo, OrgLine, Period, periodLabel, Tags } from './parts'

export function Cards({ content, ctx }: ExperienceProps) {
  const items = content.items ?? []
  return (
    <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, i) => (
        <li key={item.id} {...itemAttrs(ctx, 'items', i)} data-reveal="" className="site-card flex flex-col gap-4 p-6 md:p-8">
          {periodLabel(ctx, item) || hasImage(ctx, item.logo) ? (
            <div className="flex min-h-12 items-center justify-between gap-4">
              <Period ctx={ctx} item={item} className="text-site-primary font-semibold" />
              <Logo ctx={ctx} item={item} index={i} className="ms-auto" />
            </div>
          ) : null}
          <div>
            <T ctx={ctx} path={`items.${i}.role`} value={item.role} as="h3" className="site-h3" placeholder="Role" />
            <OrgLine ctx={ctx} item={item} index={i} className="mt-1" />
          </div>
          <T
            ctx={ctx}
            path={`items.${i}.description`}
            value={item.description}
            as="div"
            rich
            className="site-prose site-muted text-[0.9375rem]"
            placeholder="What you did and what changed because of it"
          />
          <Tags item={item} className="mt-auto pt-2" />
        </li>
      ))}
    </ul>
  )
}
