import { Container, SectionHeader } from '../_shared'
import type { StatsProps } from './schema'
import { BigNumbers } from './variants/BigNumbers'
import { Counters } from './variants/Counters'
import { Row } from './variants/Row'

export function Stats(props: StatsProps) {
  const { content, ctx, section, variant } = props
  const List = variant === 'row' ? Row : variant === 'big-numbers' ? BigNumbers : Counters
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      {content.items?.length ? <List {...props} /> : null}
    </Container>
  )
}
