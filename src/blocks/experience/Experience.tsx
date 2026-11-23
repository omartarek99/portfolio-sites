import { Btn, Container, hasButton, SectionHeader } from '../_shared'
import type { ExperienceProps } from './schema'
import { Cards } from './variants/Cards'
import { Compact } from './variants/Compact'
import { Timeline } from './variants/Timeline'

export function Experience(props: ExperienceProps) {
  const { content, ctx, section, variant } = props
  const List = variant === 'cards' ? Cards : variant === 'compact' ? Compact : Timeline
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      {content.items?.length ? <List {...props} /> : null}
      {hasButton(ctx, content.cta) ? (
        <div className="mt-10 md:mt-12">
          <Btn ctx={ctx} path="cta" value={content.cta} variant="outline" />
        </div>
      ) : null}
    </Container>
  )
}
