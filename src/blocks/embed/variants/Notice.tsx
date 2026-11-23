import { Icon } from '../../_shared'

/** Why an embed is not shown. UI text from strings.ts, not content, so no <T>. */
export function Notice({ message }: { message: string }) {
  return (
    <p
      role="note"
      className="border-site-border bg-site-surface text-site-muted rounded-site flex items-start gap-3 border border-dashed p-5 text-sm"
    >
      <Icon name="shield" aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span className="min-w-0 break-words">{message}</span>
    </p>
  )
}
