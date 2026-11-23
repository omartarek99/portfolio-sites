import { itemAttrs, T } from '../../_shared'
import type { FaqProps } from '../schema'

/** Every question and answer visible, balanced over two columns. */
export function TwoColumn({ content, ctx }: FaqProps) {
  const items = content.items ?? []
  if (items.length === 0) return null
  return (
    <ul className="gap-x-14 md:columns-2">
      {items.map((item, index) => (
        <li key={item.id} {...itemAttrs(ctx, 'items', index)} data-reveal="" className="border-site-border mb-8 flex break-inside-avoid flex-col gap-2 border-t pt-6">
          <T ctx={ctx} path={`items.${index}.question`} value={item.question} as="h3" className="site-h4" placeholder="Question" />
          <T ctx={ctx} path={`items.${index}.answer`} value={item.answer} as="p" className="site-muted" placeholder="Answer" multiline />
        </li>
      ))}
    </ul>
  )
}
