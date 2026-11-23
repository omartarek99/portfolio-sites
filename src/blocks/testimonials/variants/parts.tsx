import { pick, plainText, type Localized } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { hasImage, hasText, Img, Stars, T } from '../../_shared'
import type { BlockContext } from '../../types'
import type { TestimonialItem } from '../schema'

interface PartProps {
  ctx: BlockContext
  item: TestimonialItem
  index: number
  className?: string
}

export function Quote({ ctx, item, index, className }: PartProps) {
  return (
    <blockquote className={className}>
      <T ctx={ctx} path={`items.${index}.quote`} value={item.quote} as="p" multiline placeholder="What they said" />
    </blockquote>
  )
}

export function Rating({ ctx, item, className }: Omit<PartProps, 'index'>) {
  return item.rating ? <Stars rating={item.rating} locale={ctx.locale} className={className} /> : null
}

/** Photo · name / role · logo. Renders nothing when all of them are empty. */
export function Author({ ctx, item, index, className, center }: PartProps & { center?: boolean }) {
  const photo = hasImage(ctx, item.photo)
  const name = hasText(ctx, item.name)
  const role = hasText(ctx, item.role)
  const logo = hasImage(ctx, item.logo)
  if (!photo && !name && !role && !logo) return null
  return (
    <figcaption className={cn('flex items-center gap-3', center && 'flex-col text-center', className)}>
      {photo ? (
        <span className="bg-site-surface border-site-border block size-12 shrink-0 overflow-hidden rounded-full border">
          <Img ctx={ctx} path={`items.${index}.photo`} value={item.photo} sizes="48px" maxWidth={200} alt={plainText(pick(item.name, ctx.locale))} />
        </span>
      ) : null}
      {name || role ? (
        <span className="flex min-w-0 flex-col">
          <T ctx={ctx} path={`items.${index}.name`} value={item.name} as="cite" className="font-semibold not-italic" placeholder="Name" />
          <T ctx={ctx} path={`items.${index}.role`} value={item.role} className="site-small site-muted" placeholder="Role, company" />
        </span>
      ) : null}
      {logo ? (
        <span className={cn('block h-8 w-24 shrink-0', !center && 'ms-auto')}>
          <Img ctx={ctx} path={`items.${index}.logo`} value={item.logo} className="object-contain" sizes="96px" maxWidth={240} />
        </span>
      ) : null}
    </figcaption>
  )
}

/** Accessible name for the carousel region: the heading as plain text. */
export function carouselLabel(ctx: BlockContext, heading: Localized | undefined): string | undefined {
  return plainText(pick(heading, ctx.locale)) || undefined
}
