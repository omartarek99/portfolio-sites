import { cn } from '@/lib/utils'
import { Btn, T } from '../../_shared'
import { TEXT, type AnnouncementProps } from '../parts'

/** One line with an optional link. */
export function Bar({ ctx, content }: AnnouncementProps) {
  return (
    <div
      className={cn(
        'flex min-h-11 min-w-0 grow flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 text-center',
        // Balances the close button so the message stays centred.
        content.dismissible && 'sm:ps-13',
      )}
    >
      <T ctx={ctx} path="text" value={content.text} as="p" className={TEXT} placeholder="Your announcement" />
      <Btn
        ctx={ctx}
        path="cta"
        value={content.cta}
        variant="link"
        size="sm"
        className="text-site-on-primary! font-semibold"
      />
    </div>
  )
}
