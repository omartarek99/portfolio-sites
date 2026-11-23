import { pick, plainText, type LinkRef } from '@/schemas/fields'
import { defaultContactForm } from '@/schemas/forms'
import { cn } from '@/lib/utils'
import { A, Icon, SocialLinks, st, T } from '../../_shared'
import type { BlockContext, BlockProps } from '../../types'
import type { ContactContent } from '../schema'
import { t } from '../strings'

export type ContactProps = BlockProps<ContactContent>

export const formOf = (content: ContactContent) => content.form ?? defaultContactForm()

export interface DetailRow {
  key: string
  icon: string
  label: string
  value: string
  link?: LinkRef
  /** Numbers and addresses like emails read left-to-right in every language. */
  ltr?: boolean
}

/** Contact details from the site settings, in display order. */
export function detailRows(ctx: BlockContext, content: ContactContent): DetailRow[] {
  if (content.showDetails === false) return []
  const c = ctx.site.settings.contact
  const rows: DetailRow[] = []
  const l = ctx.locale
  if (c.email?.trim()) rows.push({ key: 'email', icon: 'mail', label: st(l, 'emailLabel'), value: c.email.trim(), link: { type: 'email', value: c.email }, ltr: true })
  if (c.phone?.trim()) rows.push({ key: 'phone', icon: 'phone', label: st(l, 'phoneLabel'), value: c.phone.trim(), link: { type: 'phone', value: c.phone }, ltr: true })
  if (c.whatsapp?.trim())
    rows.push({ key: 'whatsapp', icon: 'message-circle', label: t(l, 'whatsapp'), value: c.whatsapp.trim(), link: { type: 'whatsapp', value: c.whatsapp }, ltr: true })
  const address = plainText(pick(c.address, l))
  if (address) rows.push({ key: 'address', icon: 'map-pin', label: st(l, 'addressLabel'), value: address })
  return rows
}

export const socialOf = (ctx: BlockContext, content: ContactContent) => (content.showSocial === false ? [] : ctx.site.settings.social)

export function hasDetails(ctx: BlockContext, content: ContactContent): boolean {
  return detailRows(ctx, content).length > 0 || socialOf(ctx, content).length > 0 || ctx.mode === 'editor' || Boolean(pick(content.note, ctx.locale).trim())
}

/** Details as a definition list with icon bubbles, then the note and social links. */
export function ContactDetails({ ctx, content, className }: { ctx: BlockContext; content: ContactContent; className?: string }) {
  const rows = detailRows(ctx, content)
  return (
    <div className={cn('flex min-w-0 flex-col gap-8', className)}>
      {rows.length > 0 ? (
        <dl className="flex flex-col gap-5">
          {rows.map((row) => (
            <div key={row.key} data-reveal className="flex items-start gap-4">
              <span className="bg-site-primary/12 text-site-primary inline-flex size-11 shrink-0 items-center justify-center rounded-full">
                <Icon name={row.icon} className="size-5" />
              </span>
              <div className="min-w-0">
                <dt className="site-small site-muted">{row.label}</dt>
                <dd className="mt-0.5 font-semibold break-words">
                  <A ctx={ctx} link={row.link} className={row.link ? 'site-link' : undefined}>
                    <span dir={row.ltr ? 'ltr' : undefined}>{row.value}</span>
                  </A>
                </dd>
              </div>
            </div>
          ))}
        </dl>
      ) : null}
      <T ctx={ctx} path="note" value={content.note} as="p" className="site-muted" placeholder="Office hours or reply time" multiline />
      <SocialLinks ctx={ctx} links={socialOf(ctx, content)} variant="pills" />
    </div>
  )
}

/** What the map panel would show, or null when it has nothing to show. */
export function mapPlace(ctx: BlockContext, content: ContactContent): { query: string; embed: boolean } | null {
  const address = plainText(pick(ctx.site.settings.contact.address, ctx.locale))
  const query = content.map?.query?.trim() || address
  if (!query) return null
  return { query, embed: content.map?.enabled === true }
}

/**
 * The map side of split-map. An embedded map ONLY when the owner turned it on
 * (a third-party request, SPEC §15); otherwise an address card over a drawn
 * street motif, with a plain link out to a maps app.
 */
export function MapPanel({ ctx, content, className }: { ctx: BlockContext; content: ContactContent; className?: string }) {
  const place = mapPlace(ctx, content)
  if (!place) return null
  const address = plainText(pick(ctx.site.settings.contact.address, ctx.locale)) || place.query

  if (place.embed) {
    return (
      <div className={cn('site-media border-site-border relative min-h-80 overflow-hidden border', className)}>
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(place.query)}&output=embed`}
          title={t(ctx.locale, 'mapTitle', { place: address })}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 size-full border-0"
        />
      </div>
    )
  }

  return (
    <div className={cn('site-card relative isolate flex min-h-80 flex-col justify-end overflow-hidden p-6 md:p-8', className)}>
      <StreetMotif />
      <div className="bg-site-bg/90 border-site-border flex max-w-sm flex-col gap-3 rounded-site-lg border p-5 shadow-sm backdrop-blur-sm">
        <p className="site-eyebrow">{t(ctx.locale, 'findUs')}</p>
        <p className="site-h4">{address}</p>
        <A
          ctx={ctx}
          link={{ type: 'url', value: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.query)}`, newTab: true }}
          className="site-link inline-flex items-center gap-1.5 self-start font-semibold"
        >
          {t(ctx.locale, 'openInMaps')}
          <Icon name="arrow-up-right" className="size-4 rtl:-scale-x-100" />
        </A>
      </div>
    </div>
  )
}

/** A drawn street map — theme colours only, no network request. */
function StreetMotif() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 -z-10 size-full">
      <g className="text-site-border" stroke="currentColor" fill="none" strokeLinecap="round">
        <path d="M-10 70 H410 M-10 160 H410 M-10 245 H410 M70 -10 V310 M175 -10 V310 M290 -10 V310" strokeWidth="2" />
        <path d="M-10 115 H410 M-10 205 H410 M120 -10 V310 M235 -10 V310 M345 -10 V310" strokeWidth="1" strokeDasharray="3 6" />
        <path d="M-20 300 C 80 220, 140 210, 210 150 S 330 40, 420 20" strokeWidth="14" className="text-site-surface" />
        <path d="M-20 300 C 80 220, 140 210, 210 150 S 330 40, 420 20" strokeWidth="2" />
      </g>
      <path d="M-20 40 C 60 60, 110 10, 190 30 S 320 80, 420 50" fill="none" strokeWidth="18" stroke="currentColor" className="text-site-secondary" opacity="0.18" />
      <g className="text-site-primary" transform="translate(222 92)">
        <circle r="34" fill="currentColor" opacity="0.14" />
        <path d="M0 18 C -14 2, -16 -6, -16 -12 A16 16 0 0 1 16 -12 C 16 -6, 14 2, 0 18 Z" fill="currentColor" />
        <circle cy="-12" r="6" className="text-site-bg" fill="currentColor" />
      </g>
    </svg>
  )
}
