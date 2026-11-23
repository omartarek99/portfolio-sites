import { pick, plainText } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { hasText, Img, T } from '../../_shared'
import type { BlockContext } from '../../types'
import type { ClientItem } from '../schema'

/** Anything to show for this client? (A logo, or a name for the wordmark.) */
export function hasLogo(ctx: BlockContext, item: ClientItem): boolean {
  return Boolean(item.logo?.url) || hasText(ctx, item.name)
}

/**
 * The logo image, or the name set as a wordmark when there is no image.
 * Greyscale: images lose their colour and wordmarks go muted until hovered.
 */
export function Logo({ ctx, item, index, greyscale }: { ctx: BlockContext; item: ClientItem; index: number; greyscale?: boolean }) {
  if (item.logo?.url) {
    return (
      <span
        className={cn(
          'block h-10 w-32 md:h-12 md:w-36',
          greyscale && '[&_img]:opacity-70 [&_img]:grayscale [&_img]:transition hover:[&_img]:opacity-100 hover:[&_img]:grayscale-0',
        )}
      >
        <Img
          ctx={ctx}
          path={`items.${index}.logo`}
          value={item.logo}
          className="object-contain"
          sizes="144px"
          maxWidth={320}
          alt={plainText(pick(item.name, ctx.locale))}
        />
      </span>
    )
  }
  return (
    <T
      ctx={ctx}
      path={`items.${index}.name`}
      value={item.name}
      className={cn(
        'font-site-heading text-xl font-bold whitespace-nowrap transition-colors md:text-2xl',
        greyscale ? 'text-site-muted hover:text-site-text' : 'text-site-text',
      )}
      placeholder="Client name"
    />
  )
}
