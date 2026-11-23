import { pick, plainText } from '@/schemas/fields'
import { Carousel } from '../../_shared'
import { itemHeading, ProjectCard, ProjectsShell, type ProjectsVariantProps } from '../parts'

/** Swipeable row of cards. The kit carousel handles direction, keyboard and ARIA. */
export function CarouselView({ ctx, section, content }: ProjectsVariantProps) {
  const heading = itemHeading(ctx, content)
  return (
    <ProjectsShell ctx={ctx} section={section} content={content}>
      {content.items.length === 0 ? null : (
        <Carousel
          locale={ctx.locale}
          dir={ctx.dir}
          label={plainText(pick(content.heading, ctx.locale)) || undefined}
          loop={false}
          slideBasis="min(26rem, 86%)"
          gap="1.5rem"
        >
          {content.items.map((item, index) => (
            // Not "interactive": the lift on hover would be clipped by the carousel viewport.
            <ProjectCard key={item.id} ctx={ctx} item={item} index={index} heading={heading} interactive={false} />
          ))}
        </Carousel>
      )}
    </ProjectsShell>
  )
}
