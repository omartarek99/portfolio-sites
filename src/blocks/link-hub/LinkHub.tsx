import { Container, SectionHeader } from '../_shared'
import type { LinkHubProps } from './schema'
import { IconGrid } from './variants/IconGrid'
import { Stacked } from './variants/Stacked'

export function LinkHub(props: LinkHubProps) {
  const { content, ctx, section, variant } = props
  const Items = variant === 'icon-grid' ? IconGrid : Stacked
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} align={variant === 'icon-grid' ? undefined : 'center'} />
      {content.items?.length ? <Items {...props} /> : null}
    </Container>
  )
}
