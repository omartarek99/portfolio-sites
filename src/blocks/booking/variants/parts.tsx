import type { ReactNode } from 'react'
import { pick } from '@/schemas/fields'
import { Btn, formatNumber, hasButton, Icon, st, T } from '../../_shared'
import type { BlockContext, BlockProps, PublicMeetingType } from '../../types'
import type { BookingContent } from '../schema'
import { t } from '../strings'

export type BookingProps = BlockProps<BookingContent>

const LOCATION_ICON = { video: 'video', phone: 'phone', in_person: 'map-pin' } as const

/** The meeting types this section offers, in the site's order. */
export function typesOf(ctx: BlockContext, content: BookingContent): PublicMeetingType[] {
  const ids = content.meetingTypeIds ?? []
  const all = ctx.site.meetingTypes
  return ids.length > 0 ? all.filter((m) => ids.includes(m.id)) : all
}

function priceText(ctx: BlockContext, type: PublicMeetingType): string {
  if (!type.price || type.price.amount <= 0) return st(ctx.locale, 'free')
  try {
    return formatNumber(ctx.locale, type.price.amount, { style: 'currency', currency: type.price.currency, maximumFractionDigits: 0 })
  } catch {
    return `${type.price.currency} ${formatNumber(ctx.locale, type.price.amount)}`
  }
}

export const typeName = (ctx: BlockContext, type: PublicMeetingType) => pick(type.name, ctx.locale)
export const typeDescription = (ctx: BlockContext, type: PublicMeetingType) => pick(type.description, ctx.locale)

/**
 * Duration · location · price. Meeting types are site data from the booking
 * settings (not section content), so they are edited there, not inline.
 */
export function MeetingMeta({ ctx, type }: { ctx: BlockContext; type: PublicMeetingType }) {
  return (
    <span className="site-small site-muted flex flex-wrap items-center gap-x-4 gap-y-1">
      <span className="inline-flex items-center gap-1.5">
        <Icon name="clock" className="size-4" />
        {st(ctx.locale, 'minutes', { count: formatNumber(ctx.locale, type.durationMin) })}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Icon name={LOCATION_ICON[type.location]} className="size-4" />
        {t(ctx.locale, type.location)}
      </span>
      <span className="text-site-text font-semibold">{priceText(ctx, type)}</span>
    </span>
  )
}

/** The configured fallback button (contact page, external booking link). Null when empty. */
export function FallbackCta({ ctx, content }: { ctx: BlockContext; content: BookingContent }): ReactNode {
  return hasButton(ctx, content.cta) ? <Btn ctx={ctx} path="cta" value={content.cta} className="self-start" /> : null
}

export function Note({ ctx, content }: { ctx: BlockContext; content: BookingContent }) {
  return <T ctx={ctx} path="note" value={content.note} as="p" className="site-small site-muted" placeholder="Small print" multiline />
}
