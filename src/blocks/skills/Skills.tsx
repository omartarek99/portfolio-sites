import { Container, SectionHeader } from '../_shared'
import type { SkillsProps } from './schema'
import { Bars } from './variants/Bars'
import { IconGrid } from './variants/IconGrid'
import { Radial } from './variants/Radial'
import { Tags } from './variants/Tags'

export function Skills(props: SkillsProps) {
  const { content, ctx, section, variant } = props
  const Items = variant === 'bars' ? Bars : variant === 'icon-grid' ? IconGrid : variant === 'radial' ? Radial : Tags
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      <Items {...props} />
    </Container>
  )
}
