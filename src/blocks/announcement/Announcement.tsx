import { hasButton, hasText, Icon } from '../_shared'
import { signatureOf, visibleItems, type AnnouncementProps } from './parts'
import { t } from './strings'
import { Bar } from './variants/Bar'
import { Dismissible } from './variants/Dismissible.client'
import { Ticker } from './variants/Ticker'

const SHELL = 'bg-site-primary text-site-on-primary flex items-center text-sm font-medium'

export function Announcement(props: AnnouncementProps) {
  const { ctx, content, variant } = props
  // A ticker without messages shows the single message instead.
  const ticker = variant === 'ticker' && visibleItems(ctx, content).length > 0
  // Nothing to say: no bar at all (the editor still shows the empty text slot).
  if (!ticker && !hasText(ctx, content.text) && !hasButton(ctx, content.cta)) return null

  const body = ticker ? <Ticker {...props} /> : <Bar {...props} />
  const label = t(ctx.locale, 'announcement')
  if (!content.dismissible) {
    return (
      <aside aria-label={label} className={SHELL}>
        {body}
      </aside>
    )
  }
  return (
    <Dismissible
      storageKey={`site-announcement:${ctx.site.siteId}`}
      signature={signatureOf(content)}
      label={label}
      dismissLabel={t(ctx.locale, 'dismiss')}
      icon={<Icon name="x" className="size-4" />}
      disabled={ctx.mode === 'editor'}
      className={SHELL}
    >
      {body}
    </Dismissible>
  )
}
