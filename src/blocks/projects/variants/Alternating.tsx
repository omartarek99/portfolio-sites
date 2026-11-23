import { cn } from '@/lib/utils'
import { hasText, itemAttrs, T } from '../../_shared'
import {
  hasMedia,
  itemHeading,
  ordinal,
  ProjectActions,
  ProjectMedia,
  ProjectMeta,
  ProjectsShell,
  ProjectTags,
  type ProjectsVariantProps,
} from '../parts'

/** Large image and text in rows that swap sides; images drift with the scroll (Aurora, Blueprint). */
export function Alternating({ ctx, section, content }: ProjectsVariantProps) {
  const Heading = itemHeading(ctx, content)
  return (
    <ProjectsShell ctx={ctx} section={section} content={content}>
      {content.items.length === 0 ? null : (
        <div className="flex flex-col gap-16 md:gap-24">
          {content.items.map((item, index) => {
            const media = hasMedia(ctx, item)
            return (
              <article
                key={item.id}
                {...itemAttrs(ctx, 'items', index)}
                data-reveal=""
                className={cn('grid items-center gap-8 text-start lg:gap-16', media && 'lg:grid-cols-12')}
              >
                <ProjectMedia
                  ctx={ctx}
                  item={item}
                  index={index}
                  parallax
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  maxWidth={1400}
                  className={cn('aspect-[4/3] lg:col-span-7', index % 2 === 1 && 'lg:order-last')}
                />
                <div className={cn('flex flex-col gap-4', media ? 'lg:col-span-5' : 'max-w-3xl')}>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span aria-hidden="true" className="site-eyebrow tabular-nums">
                      {ordinal(index)}
                    </span>
                    <ProjectMeta ctx={ctx} item={item} index={index} />
                  </div>
                  {hasText(ctx, item.title) ? (
                    <Heading className="site-h2">
                      <T ctx={ctx} path={`items.${index}.title`} value={item.title} placeholder="Project title" />
                    </Heading>
                  ) : null}
                  <T
                    ctx={ctx}
                    path={`items.${index}.description`}
                    value={item.description}
                    as="p"
                    className="site-lead"
                    placeholder="What it was and what changed"
                    multiline
                  />
                  <ProjectTags ctx={ctx} item={item} index={index} />
                  <ProjectActions ctx={ctx} item={item} className="mt-2" />
                </div>
              </article>
            )
          })}
        </div>
      )}
    </ProjectsShell>
  )
}
