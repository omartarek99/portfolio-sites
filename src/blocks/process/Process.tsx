import { Container, SectionHeader } from '../_shared'
import type { ProcessProps } from './schema'
import { Flow } from './variants/Flow'
import { Numbered } from './variants/Numbered'

export function Process(props: ProcessProps) {
  const { content, ctx, section, variant } = props
  const Steps = variant === 'flow' ? Flow : Numbered
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      <Steps {...props} />
    </Container>
  )
}
