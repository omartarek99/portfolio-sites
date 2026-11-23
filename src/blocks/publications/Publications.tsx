import { Container, SectionHeader } from '../_shared'
import type { PublicationsProps } from './schema'
import { ByYear } from './variants/ByYear'
import { Citations } from './variants/Citations'

export function Publications(props: PublicationsProps) {
  const { content, ctx, section, variant } = props
  const Items = variant === 'by-year' ? ByYear : Citations
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      {content.items?.length ? <Items {...props} /> : null}
    </Container>
  )
}
