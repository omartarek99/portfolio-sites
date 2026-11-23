import type { Localized } from '@/schemas/fields'
import type { BlockProps } from '../types'
import { Container } from './layout'
import { T } from './Text'

/**
 * Stand-in used by block types that are not built yet, and by blocks whose
 * real implementation arrives in a later milestone (Booking, Freeform, …).
 */
export function PlaceholderBlock({
  section,
  content,
  ctx,
  name,
  note,
}: BlockProps<{ heading?: Localized; text?: Localized }> & { name: string; note?: string }) {
  return (
    <Container section={section}>
      <div className="site-card flex flex-col gap-3 p-8 text-center">
        <p className="site-eyebrow">{name}</p>
        <T ctx={ctx} path="heading" value={content.heading} as="h2" className="site-h3" placeholder={name} />
        <T ctx={ctx} path="text" value={content.text} as="p" className="site-muted" multiline />
        {note ? <p className="site-small site-muted">{note}</p> : null}
      </div>
    </Container>
  )
}
