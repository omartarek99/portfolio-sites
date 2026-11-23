import type { PublicationsProps } from '../schema'
import { Entry } from './Entry'

export function Citations({ content, ctx }: PublicationsProps) {
  return (
    <ol className="max-w-4xl">
      {(content.items ?? []).map((item, i) => (
        <Entry key={item.id} ctx={ctx} item={item} index={i} showYear />
      ))}
    </ol>
  )
}
