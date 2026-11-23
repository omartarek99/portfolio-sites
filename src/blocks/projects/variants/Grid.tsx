import { cn } from '@/lib/utils'
import { FilterTabs } from '../../_shared'
import { filterCategories, itemHeading, ProjectCard, ProjectsShell, type ProjectsVariantProps } from '../parts'

/** Cards in two or three columns, with an optional category filter. */
export function Grid({ ctx, section, content }: ProjectsVariantProps) {
  const heading = itemHeading(ctx, content)
  const categories = filterCategories(ctx, content)
  const grid = cn('grid gap-6 lg:gap-8', content.columns === '2' ? 'md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3')
  const cards = content.items.map((item, index) => (
    <ProjectCard key={item.id} ctx={ctx} item={item} index={index} heading={heading} />
  ))
  return (
    <ProjectsShell ctx={ctx} section={section} content={content}>
      {cards.length === 0 ? null : categories.length > 0 ? (
        <FilterTabs categories={categories} locale={ctx.locale} listClassName={grid}>
          {cards}
        </FilterTabs>
      ) : (
        <div className={grid}>{cards}</div>
      )}
    </ProjectsShell>
  )
}
