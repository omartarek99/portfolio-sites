import { Container, SectionHeader } from '../_shared'
import type { ClientsProps } from './schema'
import { Grid } from './variants/Grid'
import { MarqueeLogos } from './variants/MarqueeLogos'

export function Clients(props: ClientsProps) {
  const { content, ctx, section, variant } = props
  const List = variant === 'grid' ? Grid : MarqueeLogos
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} align="center" className="md:mb-12" />
      {content.items?.length ? <List {...props} /> : null}
    </Container>
  )
}
