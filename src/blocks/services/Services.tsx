import { Container, SectionHeader } from '../_shared'
import type { ServicesProps } from './schema'
import { Cards } from './variants/Cards'
import { ListIcons } from './variants/ListIcons'
import { PricingTable } from './variants/PricingTable'

export function Services(props: ServicesProps) {
  const { content, ctx, section, variant } = props
  const Items = variant === 'pricing-table' ? PricingTable : variant === 'list-icons' ? ListIcons : Cards
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      <Items {...props} />
    </Container>
  )
}
