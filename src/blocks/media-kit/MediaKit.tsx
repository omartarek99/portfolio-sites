import { Container, SectionHeader } from '../_shared'
import type { MediaKitProps } from './schema'
import { Stats } from './variants/Stats'

export function MediaKit(props: MediaKitProps) {
  const { content, ctx, section } = props
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      <Stats {...props} />
    </Container>
  )
}
