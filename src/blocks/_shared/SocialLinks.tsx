/**
 * The site's social links, rendered the same way everywhere (header, footer,
 * about, contact, link hub). Values in content may be handles or full URLs —
 * `socialUrl()` resolves both and drops anything unsafe.
 */
import { pick, type SocialLink } from '@/schemas/fields'
import { socialUrl, SOCIAL_LABELS } from '@/lib/links'
import { cn } from '@/lib/utils'
import type { BlockContext } from '../types'
import { BrandIcon } from './BrandIcon'
import { st } from './strings'

export type SocialLinksVariant = 'icons' | 'pills' | 'list'

export interface SocialLinksProps {
  ctx: BlockContext
  links: SocialLink[] | undefined
  className?: string
  /** icons: bare glyphs · pills: glyph + name · list: one row per platform. */
  variant?: SocialLinksVariant
  /** Icon size class for the `icons` variant. Default `size-5`. */
  iconClassName?: string
}

/**
 * Renders nothing when there is no usable link, so callers can place it
 * unconditionally.
 *
 *   <SocialLinks ctx={ctx} links={ctx.site.settings.social} variant="icons" />
 */
export function SocialLinks({ ctx, links, className, variant = 'icons', iconClassName }: SocialLinksProps) {
  const resolved = (links ?? [])
    .map((link) => ({ link, href: socialUrl(link.platform, link.url) }))
    .filter((entry): entry is { link: SocialLink; href: string } => Boolean(entry.href))

  if (resolved.length === 0) return null

  const Wrapper = variant === 'list' ? 'ul' : 'div'

  return (
    <Wrapper
      className={cn(
        'flex',
        variant === 'list' ? 'flex-col gap-2' : 'flex-wrap items-center gap-2 md:gap-3',
        className,
      )}
    >
      {resolved.map(({ link, href }) => {
        const name = pick(SOCIAL_LABELS[link.platform], ctx.locale)
        const label = st(ctx.locale, 'followOn', { platform: name })
        const external = /^https?:\/\//i.test(href)
        const shared = {
          href,
          target: external ? ('_blank' as const) : undefined,
          rel: external ? 'noopener noreferrer me' : undefined,
        }
        const anchor =
          variant === 'icons' ? (
            <a
              {...shared}
              aria-label={label}
              title={name}
              className="border-site-border text-site-text hover:bg-site-primary hover:text-site-on-primary hover:border-site-primary inline-flex size-10 items-center justify-center rounded-full border transition-colors"
            >
              <BrandIcon platform={link.platform} className={cn('size-5', iconClassName)} />
            </a>
          ) : variant === 'pills' ? (
            <a {...shared} className="site-tag hover:border-site-primary transition-colors" aria-label={label}>
              <BrandIcon platform={link.platform} className="size-4" />
              <span>{name}</span>
            </a>
          ) : (
            <a
              {...shared}
              className="text-site-text hover:text-site-primary inline-flex items-center gap-3 transition-colors"
            >
              <BrandIcon platform={link.platform} className="size-5" />
              <span>{name}</span>
            </a>
          )

        const key = `${link.platform}-${href}`
        return variant === 'list' ? <li key={key}>{anchor}</li> : <span key={key} className="inline-flex">{anchor}</span>
      })}
    </Wrapper>
  )
}
