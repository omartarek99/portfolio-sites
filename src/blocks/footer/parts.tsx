/**
 * Pieces every footer variant shares. Server-safe (no hooks). Links, social
 * accounts and contact details come from the site (`ctx.site`), so they are
 * managed in site settings, not edited inline.
 */
import { pick, plainText } from '@/schemas/fields'
import type { NavItem } from '@/schemas/site'
import { APP_NAME, APP_URL } from '@/lib/config'
import { cn } from '@/lib/utils'
import { A, hasText, Icon, st, T } from '../_shared'
import { NavLink, navItems } from '../header/parts'
import type { BlockContext, BlockProps } from '../types'
import type { FooterContent } from './schema'
import { t } from './strings'

export type FooterProps = BlockProps<FooterContent>
type Part = { ctx: BlockContext; content: FooterContent; className?: string }

export const LINK =
  'text-site-muted hover:text-site-text aria-[current=page]:text-site-text cursor-pointer no-underline transition-colors'

/** The footer navigation; a site that has not set one up yet shows its header links. */
export function footerNav(ctx: BlockContext): NavItem[] {
  const nav = ctx.site.navigation
  return navItems(ctx, nav.footer.length > 0 ? nav.footer : nav.header)
}

const ownerName = (ctx: BlockContext) => plainText(pick(ctx.site.settings.ownerName, ctx.locale))

/** The site name: the footer's own heading, else the owner's name from settings. */
export function Name({ ctx, content, className }: Part) {
  if (hasText(ctx, content.heading)) {
    return <T ctx={ctx} path="heading" value={content.heading} as="p" className={className} placeholder="Your name" />
  }
  const owner = ownerName(ctx)
  return owner ? <p className={className}>{owner}</p> : null
}

/** Every link on one wrapping row, children included. */
export function NavRow({ ctx, className }: { ctx: BlockContext; className?: string }) {
  const items = footerNav(ctx).flatMap((item) => [item, ...(item.children ?? [])])
  if (items.length === 0) return null
  return (
    <nav aria-label={st(ctx.locale, 'footerNavigation')} className={className}>
      <ul className="flex flex-wrap gap-x-7 gap-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <NavLink ctx={ctx} item={item} className={LINK} />
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** True when site settings hold at least one contact detail for this locale. */
export function hasContact(ctx: BlockContext): boolean {
  const { email, phone, whatsapp, address } = ctx.site.settings.contact
  return Boolean(email || phone || whatsapp || plainText(pick(address, ctx.locale)))
}

/** Email, phone, WhatsApp and address from site settings. */
export function ContactList({ ctx, className }: { ctx: BlockContext; className?: string }) {
  const { email, phone, whatsapp, address } = ctx.site.settings.contact
  const place = plainText(pick(address, ctx.locale))
  const row = 'flex items-start gap-2.5'
  const icon = 'text-site-primary mt-1 size-4 shrink-0'
  return (
    <ul className={cn('flex flex-col gap-2.5', className)}>
      {email ? (
        <li className={row}>
          <Icon name="mail" className={icon} />
          <A ctx={ctx} link={{ type: 'email', value: email }} className={cn(LINK, 'break-all')}>
            {email}
          </A>
        </li>
      ) : null}
      {phone ? (
        <li className={row}>
          <Icon name="phone" className={icon} />
          <A ctx={ctx} link={{ type: 'phone', value: phone }} className={LINK}>
            <bdi dir="ltr">{phone}</bdi>
          </A>
        </li>
      ) : null}
      {whatsapp ? (
        <li className={row}>
          <Icon name="message-circle" className={icon} />
          <A ctx={ctx} link={{ type: 'whatsapp', value: whatsapp }} className={LINK}>
            {t(ctx.locale, 'whatsapp')}
          </A>
        </li>
      ) : null}
      {place ? (
        <li className={row}>
          <Icon name="map-pin" className={icon} />
          <span className="text-site-muted">{place}</span>
        </li>
      ) : null}
    </ul>
  )
}

/** Copyright, the "Made with" badge and the back-to-top link. */
export function BottomBar({ ctx, content, className }: Part) {
  const owner = plainText(pick(content.heading, ctx.locale)) || ownerName(ctx)
  const badge = st(ctx.locale, 'madeWith', { app: APP_NAME })
  return (
    <div className={cn('site-small text-site-muted flex flex-wrap items-center gap-x-8 gap-y-3', className)}>
      {hasText(ctx, content.copyright) ? (
        <T ctx={ctx} path="copyright" value={content.copyright} as="p" placeholder="© Your name" />
      ) : (
        // ponytail: no automatic year — reading the clock would break static rendering. Type one in the copyright line.
        <p>
          © {owner ? `${owner}. ` : ''}
          {st(ctx.locale, 'allRightsReserved')}
        </p>
      )}
      {ctx.site.flags.showBadge ? (
        ctx.mode === 'editor' ? (
          <span>{badge}</span>
        ) : (
          <a href={APP_URL} target="_blank" rel="noopener" className={cn(LINK, 'underline underline-offset-4')}>
            {badge}
          </a>
        )
      ) : null}
      {content.showBackToTop === false ? null : (
        // "#top" scrolls to the top of the page natively when no element has that id.
        <A
          ctx={ctx}
          link={{ type: 'url', value: '#top' }}
          className={cn(LINK, 'ms-auto inline-flex items-center gap-1.5')}
        >
          {st(ctx.locale, 'backToTop')}
          <Icon name="arrow-up" className="size-4" />
        </A>
      )}
    </div>
  )
}
