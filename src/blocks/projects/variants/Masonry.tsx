import { FilterTabs } from '../../_shared'
import { filterCategories, itemHeading, ProjectCard, ProjectsShell, type ProjectsVariantProps } from '../parts'

/** Used when an image does not say how big it is, so the wall still has rhythm. */
const FALLBACK_RATIOS = ['4 / 5', '4 / 3', '1 / 1', '3 / 4', '16 / 10']

/** CSS columns: every image keeps its natural proportions. */
export function Masonry({ ctx, section, content }: ProjectsVariantProps) {
  const heading = itemHeading(ctx, content)
  const categories = filterCategories(ctx, content)
  const columns = 'columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8'
  const cards = content.items.map((item, index) => {
    const { width, height } = item.image ?? {}
    return (
      <ProjectCard
        key={item.id}
        ctx={ctx}
        item={item}
        index={index}
        heading={heading}
        className="mb-6 h-auto break-inside-avoid lg:mb-8"
        mediaClassName=""
        mediaStyle={{ aspectRatio: width && height ? `${width} / ${height}` : FALLBACK_RATIOS[index % FALLBACK_RATIOS.length] }}
      />
    )
  })
  return (
    <ProjectsShell ctx={ctx} section={section} content={content}>
      {cards.length === 0 ? null : categories.length > 0 ? (
        <FilterTabs categories={categories} locale={ctx.locale} listClassName={columns}>
          {cards}
        </FilterTabs>
      ) : (
        <div className={columns}>{cards}</div>
      )}
    </ProjectsShell>
  )
}
