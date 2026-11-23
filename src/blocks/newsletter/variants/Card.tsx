import { cn } from '@/lib/utils'
import { Container, hasImage, hasText, Img, SectionHeader, T } from '../../_shared'
import { t } from '../strings'
import type { NewsletterProps } from './Inline'
import { SubscribeForm } from './SubscribeForm.client'

/** A card: heading, a line of copy, an optional free incentive, then the form. */
export function Card({ content, ctx, section }: NewsletterProps) {
  const inc = content.incentive
  const image = hasImage(ctx, inc?.image)
  const incentive = image || hasText(ctx, inc?.title) || hasText(ctx, inc?.description)
  return (
    <Container section={section}>
      <div className={cn('site-card mx-auto grid max-w-5xl gap-8 p-6 sm:p-10 md:gap-12', image && 'md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center')}>
        {image ? (
          <div className="site-media mx-auto aspect-square w-full max-w-56 rotate-[-3deg] shadow-lg md:max-w-none rtl:rotate-[3deg]">
            <Img ctx={ctx} path="incentive.image" value={inc?.image} sizes="(min-width: 768px) 20rem, 14rem" maxWidth={640} />
          </div>
        ) : null}
        <div className="flex min-w-0 flex-col gap-6">
          <SectionHeader ctx={ctx} content={content} className="mb-0 md:mb-0" />
          {incentive ? (
            <div className="border-site-border flex flex-col gap-1.5 border-s-2 ps-4">
              <p className="site-tag self-start">{t(ctx.locale, 'free')}</p>
              <T ctx={ctx} path="incentive.title" value={inc?.title} as="p" className="site-h4" placeholder="What subscribers get" />
              <T ctx={ctx} path="incentive.description" value={inc?.description} as="p" className="site-muted" placeholder="One line about it" multiline />
            </div>
          ) : null}
          <SubscribeForm ctx={ctx} buttonLabel={content.buttonLabel} />
          <T ctx={ctx} path="note" value={content.note} as="p" className="site-small site-muted -mt-3" placeholder="Small print" />
        </div>
      </div>
    </Container>
  )
}
