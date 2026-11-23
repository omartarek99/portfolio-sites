import { cn } from '@/lib/utils'
import { hasIcon, Icon, itemAttrs, T } from '../../_shared'
import type { ProcessProps } from '../schema'

/**
 * Steps joined by connectors: a row on large screens, a column below.
 * Connectors use logical insets, so they run right-to-left in Arabic.
 */
export function Flow({ content, ctx }: ProcessProps) {
  const steps = content.steps ?? []
  if (steps.length === 0) return null
  return (
    <ol className="grid gap-10 lg:auto-cols-fr lg:grid-flow-col lg:gap-8">
      {steps.map((step, index) => {
        const last = index === steps.length - 1
        return (
          <li key={step.id} {...itemAttrs(ctx, 'steps', index)} data-reveal="" className="relative flex gap-5 lg:flex-col lg:gap-6">
            <span className="bg-site-primary text-site-on-primary font-site-heading relative z-10 grid size-12 shrink-0 place-items-center rounded-full font-semibold tabular-nums">
              {hasIcon(step.icon) ? <Icon name={step.icon ?? ''} className="size-5" /> : index + 1}
            </span>
            {last ? null : (
              <span
                aria-hidden="true"
                className={cn(
                  'bg-site-border absolute start-6 top-14 -bottom-8 w-px',
                  'lg:start-16 lg:-end-4 lg:top-6 lg:bottom-auto lg:h-px lg:w-auto',
                )}
              >
                <Icon name="chevron-right" className="text-site-border absolute -end-1.5 -top-2 hidden size-4 rtl:-scale-x-100 lg:block" />
              </span>
            )}
            <div className="flex min-w-0 flex-col gap-2 pt-2.5 lg:pt-0">
              <T ctx={ctx} path={`steps.${index}.title`} value={step.title} as="h3" className="site-h4" placeholder="Step title" />
              <T ctx={ctx} path={`steps.${index}.body`} value={step.body} as="p" className="site-muted" placeholder="What happens in this step" multiline />
            </div>
          </li>
        )
      })}
    </ol>
  )
}
