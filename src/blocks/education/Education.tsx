import { Container, SectionHeader } from '../_shared'
import type { EducationProps } from './schema'
import { Cards } from './variants/Cards'
import { List } from './variants/List'

export function Education(props: EducationProps) {
  const { content, ctx, section, variant } = props
  const Items = variant === 'cards' ? Cards : List
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      {content.items?.length ? <Items {...props} /> : null}
    </Container>
  )
}
