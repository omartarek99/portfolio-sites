import { cn } from '@/lib/utils'
import { Container, SectionHeader } from '../../_shared'
import { ContactForm } from './ContactForm.client'
import { ContactDetails, formOf, hasDetails, mapPlace, MapPanel, type ContactProps } from './parts'

/** The form beside a map (embedded only when enabled) or an address card. Falls back to the details. */
export function SplitMap({ content, ctx, section }: ContactProps) {
  const map = mapPlace(ctx, content) !== null
  const side = map || hasDetails(ctx, content)
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      <div className={cn('grid gap-8 lg:gap-12', side && 'lg:grid-cols-2')}>
        <div className={cn('min-w-0', !side && 'max-w-3xl')}>
          <ContactForm ctx={ctx} form={formOf(content)} />
        </div>
        {map ? (
          <MapPanel ctx={ctx} content={content} className="lg:min-h-full" />
        ) : side ? (
          <ContactDetails ctx={ctx} content={content} className="site-card p-6 md:p-8" />
        ) : null}
      </div>
    </Container>
  )
}
