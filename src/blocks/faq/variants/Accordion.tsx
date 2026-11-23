import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { Accordion as Group, hasText, itemAttrs, T } from '../../_shared'
import type { FaqProps } from '../schema'

/** Questions that open to show the answer. The editor opens them all for inline editing. */
export function Accordion({ content, ctx, section }: FaqProps) {
  const items = content.items ?? []
  if (items.length === 0) return null
  const editor = ctx.mode === 'editor'
  return (
    <Group name={ctx.sectionId} single={!editor && !content.multiOpen} className={cn('border-site-border max-w-3xl border-t', section.style.textAlign === 'center' && 'mx-auto')}>
      {items.map((item, index) => {
        const question = (
          <T ctx={ctx} path={`items.${index}.question`} value={item.question} as="h3" className="site-h4 min-w-0" placeholder="Question" />
        )
        return hasText(ctx, item.answer) ? (
          <details key={item.id} {...itemAttrs(ctx, 'items', index)} data-reveal="" open={editor} className="group border-site-border border-b">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
              {question}
              <ChevronDown aria-hidden="true" className="text-site-primary size-5 shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div data-accordion-panel="" className="overflow-hidden">
              <T ctx={ctx} path={`items.${index}.answer`} value={item.answer} as="p" className="site-muted max-w-2xl pb-6" placeholder="Answer" multiline />
            </div>
          </details>
        ) : (
          <div key={item.id} {...itemAttrs(ctx, 'items', index)} data-reveal="" className="border-site-border border-b py-5">
            {question}
          </div>
        )
      })}
    </Group>
  )
}
