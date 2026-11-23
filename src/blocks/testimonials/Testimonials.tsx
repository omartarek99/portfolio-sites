import { Container, SectionHeader } from '../_shared'
import type { TestimonialsProps } from './schema'
import { Bubbles } from './variants/Bubbles'
import { Single } from './variants/Single'
import { Wall } from './variants/Wall'

export function Testimonials(props: TestimonialsProps) {
  const { content, ctx, section, variant } = props
  const List = variant === 'wall' ? Wall : variant === 'single' ? Single : Bubbles
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} align={variant === 'single' ? 'center' : undefined} />
      {content.items?.length ? <List {...props} /> : null}
    </Container>
  )
}
