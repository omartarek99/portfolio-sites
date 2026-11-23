import { loc, type ButtonRef } from '@/schemas/fields'
import { Btn, Container, hasText, st, T } from '../../_shared'
import type { HeroProps } from './parts'

/**
 * Minimal CV: the name, one line, availability and a Download-CV button. With
 * no button set, the site's CV file (Settings) gets one automatically.
 */
export function Minimal({ content, ctx, section }: HeroProps) {
  const ownName = hasText(ctx, content.name)
  const fallback = content.name ?? ctx.site.settings.ownerName
  const title = ownName || hasText(ctx, fallback) ? { path: 'name', value: fallback } : { path: 'heading', value: content.heading }

  const cv = ctx.site.settings.cvFileUrl
  const button: ButtonRef | undefined =
    content.primaryCta ??
    (cv
      ? {
          label: loc(st('en', 'downloadCv'), st('ar', 'downloadCv')),
          link: { type: 'file', value: cv, newTab: true },
          style: 'outline',
          icon: 'download',
        }
      : undefined)

  return (
    <Container section={section} width="narrow">
      <div className="flex flex-col items-start gap-5">
        {hasText(ctx, title.value) ? (
          <h1 data-reveal className="site-h1 max-w-full break-words">
            <T ctx={ctx} path={title.path} value={title.value} placeholder="Your name" />
          </h1>
        ) : null}
        <T ctx={ctx} path="tagline" value={content.tagline} as="p" className="site-lead max-w-xl" placeholder="One line about you" multiline />
        <div data-reveal className="flex flex-wrap items-center gap-4 empty:hidden">
          <T ctx={ctx} path="badge" value={content.badge} as="p" className="site-badge" placeholder="Availability" />
          <Btn ctx={ctx} path="primaryCta" value={button} variant="outline" />
        </div>
      </div>
    </Container>
  )
}
