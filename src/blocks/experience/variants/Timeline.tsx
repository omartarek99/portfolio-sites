import { cn } from '@/lib/utils'
import { itemAttrs, T } from '../../_shared'
import type { ExperienceProps } from '../schema'
import { Logo, OrgLine, Period, Tags } from './parts'

/**
 * The line fills as the list scrolls past 60% of the viewport height — a CSS
 * scroll-driven animation, so no JavaScript. Where it is unsupported, motion
 * is off (theme, static render) or the visitor prefers reduced motion, the
 * fill stays hidden and the plain track line remains.
 */
const FILL_CSS = `
@keyframes sc-exp-fill { from { transform: scaleY(0) } to { transform: scaleY(1) } }
.sc-exp-fill { display: none; transform-origin: top; }
@supports (animation-timeline: view()) {
  .site-root:not([data-motion='none'], [data-static]) .sc-exp-track { view-timeline: --sc-exp block; view-timeline-inset: 60% 40%; }
  .site-root:not([data-motion='none'], [data-static]) .sc-exp-fill { display: block; animation: sc-exp-fill linear both; animation-timeline: --sc-exp; }
}
@media (prefers-reduced-motion: reduce) { .site-root .sc-exp-fill { display: none !important; } }
`

/** `--sc-line` is the centre of the line, measured from the inline start of the list. */
const LINE = 'absolute top-2 bottom-0 start-[calc(var(--sc-line)-1px)] w-0.5 rounded-full'

export function Timeline({ content, ctx }: ExperienceProps) {
  const items = content.items ?? []
  return (
    <div className="sc-exp-track relative [--sc-line:0.4375rem] md:[--sc-line:11rem]">
      <style>{FILL_CSS}</style>
      <span aria-hidden="true" className={cn(LINE, 'bg-site-border')} />
      <span aria-hidden="true" className={cn(LINE, 'sc-exp-fill bg-site-primary shadow-[0_0_14px_var(--site-primary)]')} />
      <ol>
        {items.map((item, i) => (
          <li
            key={item.id}
            {...itemAttrs(ctx, 'items', i)}
            data-reveal=""
            className="relative grid gap-x-16 gap-y-1 pb-12 ps-8 last:pb-0 md:grid-cols-[9rem_minmax(0,1fr)] md:ps-0"
          >
            <span
              aria-hidden="true"
              className={cn(
                'border-site-primary absolute start-[calc(var(--sc-line)-0.4375rem)] top-1 size-3.5 rounded-full border-2 md:top-2',
                item.current ? 'bg-site-primary' : 'bg-site-bg',
              )}
            />
            <Period ctx={ctx} item={item} className="site-muted font-medium md:pt-1.5 md:text-end" />
            <div className="max-w-3xl min-w-0 md:col-start-2">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <T ctx={ctx} path={`items.${i}.role`} value={item.role} as="h3" className="site-h3" placeholder="Role" />
                  <OrgLine ctx={ctx} item={item} index={i} className="mt-1" />
                </div>
                <Logo ctx={ctx} item={item} index={i} />
              </div>
              <T
                ctx={ctx}
                path={`items.${i}.description`}
                value={item.description}
                as="div"
                rich
                className="site-prose site-muted mt-4 max-w-2xl text-base"
                placeholder="What you did and what changed because of it"
              />
              <Tags item={item} className="mt-4" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
