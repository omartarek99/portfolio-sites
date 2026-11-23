import { Container, SectionHeader, T } from '../../_shared'
import type { BlockProps } from '../../types'
import type { NewsletterContent } from '../schema'
import { SubscribeForm } from './SubscribeForm.client'

export type NewsletterProps = BlockProps<NewsletterContent>

/** Heading on one side, a single row of email + button on the other. */
export function Inline({ content, ctx, section }: NewsletterProps) {
  return (
    <Container section={section}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <SectionHeader ctx={ctx} content={content} className="mb-0 max-w-xl md:mb-0" />
        <div className="flex w-full min-w-0 flex-col gap-3 lg:max-w-lg">
          <SubscribeForm ctx={ctx} buttonLabel={content.buttonLabel} />
          <T ctx={ctx} path="note" value={content.note} as="p" className="site-small site-muted" placeholder="Small print" />
        </div>
      </div>
    </Container>
  )
}
