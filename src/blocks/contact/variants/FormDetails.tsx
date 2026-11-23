import { cn } from '@/lib/utils'
import { Container, SectionHeader } from '../../_shared'
import { ContactForm } from './ContactForm.client'
import { ContactDetails, formOf, hasDetails, type ContactProps } from './parts'

/** The form in a card beside the contact details and social links. */
export function FormDetails({ content, ctx, section }: ContactProps) {
  const details = hasDetails(ctx, content)
  return (
    <Container section={section}>
      <div className={cn('grid gap-10 lg:gap-16', details && 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]')}>
        <div className="flex min-w-0 flex-col">
          <SectionHeader ctx={ctx} content={content} section={section} className="md:mb-10" />
          {details ? <ContactDetails ctx={ctx} content={content} /> : null}
        </div>
        <div className={cn('site-card min-w-0 p-6 sm:p-8 md:p-10', !details && 'w-full max-w-3xl')}>
          <ContactForm ctx={ctx} form={formOf(content)} />
        </div>
      </div>
    </Container>
  )
}
