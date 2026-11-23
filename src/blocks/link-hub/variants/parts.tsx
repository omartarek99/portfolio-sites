import { cn } from '@/lib/utils'
import { BrandIcon, hasBrandIcon, hasIcon, Icon } from '../../_shared'
import type { BlockContext } from '../../types'
import type { LinkHubItem } from '../schema'
import { t } from '../strings'

/** Lucide icon or brand glyph; a generic link icon when neither is set. */
export function ItemIcon({ name, className }: { name?: string; className?: string }) {
  if (name && hasBrandIcon(name)) return <BrandIcon platform={name} className={className} />
  return <Icon name={name && hasIcon(name) ? name : 'link'} className={className} />
}

export function NewBadge({ ctx, item, className }: { ctx: BlockContext; item: LinkHubItem; className?: string }) {
  if (!item.isNew) return null
  return (
    <span className={cn('bg-site-accent text-site-on-accent rounded-full px-2 py-0.5 text-[0.6875rem] leading-4 font-bold', className)}>
      {t(ctx.locale, 'new')}
    </span>
  )
}
