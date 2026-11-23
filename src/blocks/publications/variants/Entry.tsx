import { cn } from '@/lib/utils'
import { A, hasText, Icon, itemAttrs, T } from '../../_shared'
import type { BlockContext } from '../../types'
import type { Publication } from '../schema'
import { t } from '../strings'

/** One publication: title, citation line, type, links and an expandable abstract. */
export function Entry({ ctx, item, index, showYear }: { ctx: BlockContext; item: Publication; index: number; showYear?: boolean }) {
  const path = `items.${index}`
  const links = item.links ?? []
  return (
    <li
      {...itemAttrs(ctx, 'items', index)}
      data-reveal=""
      data-category={item.type ?? ''}
      className={cn('border-site-border grid gap-x-8 gap-y-2 border-b py-6 first:pt-0 last:border-b-0', showYear && 'sm:grid-cols-[4.5rem_minmax(0,1fr)]')}
    >
      {showYear && item.year ? <p className="site-h4 text-site-primary tabular-nums">{item.year}</p> : null}
      <div className={cn('flex min-w-0 flex-col gap-2', showYear && !item.year && 'sm:col-start-2')}>
        <T ctx={ctx} path={`${path}.title`} value={item.title} as="h3" className="site-h4" placeholder="Title" />
        {hasText(ctx, item.authors) || hasText(ctx, item.venue) ? (
          <p className="site-muted [&>*+*]:before:mx-2 [&>*+*]:before:content-['·']">
            <T ctx={ctx} path={`${path}.authors`} value={item.authors} placeholder="Authors" />
            <T ctx={ctx} path={`${path}.venue`} value={item.venue} as="em" placeholder="Journal or venue" />
          </p>
        ) : null}
        {item.type || links.length ? (
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {item.type ? <span className="site-small site-muted me-2 font-semibold">{t(ctx.locale, item.type)}</span> : null}
            {links.map((link, j) => (
              <span key={link.id} {...itemAttrs(ctx, `${path}.links`, j)} className="inline-flex">
                <A ctx={ctx} link={link.link} className="site-tag hover:border-site-primary transition-colors">
                  <T ctx={ctx} path={`${path}.links.${j}.label`} value={link.label} placeholder="PDF" />
                  <Icon name="arrow-up-right" className="size-3.5 rtl:-scale-x-100" />
                </A>
              </span>
            ))}
          </div>
        ) : null}
        {hasText(ctx, item.abstract) ? (
          <details className="group mt-1">
            <summary className="text-site-primary site-small inline-flex cursor-pointer list-none items-center gap-1 font-semibold [&::-webkit-details-marker]:hidden">
              {t(ctx.locale, 'abstract')}
              <Icon name="chevron-down" className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
            </summary>
            <T ctx={ctx} path={`${path}.abstract`} value={item.abstract} as="p" multiline className="site-muted mt-3 max-w-prose" placeholder="Abstract" />
          </details>
        ) : null}
      </div>
    </li>
  )
}
