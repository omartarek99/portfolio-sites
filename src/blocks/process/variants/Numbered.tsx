import { ChevronDown } from 'lucide-react'
import { Accordion, hasText, itemAttrs, T } from '../../_shared'
import type { ProcessProps, ProcessStep } from '../schema'

const num = (i: number) => String(i + 1).padStart(2, '0')
const NUM = 'font-site-heading text-site-primary shrink-0 text-4xl leading-none font-semibold tabular-nums md:text-6xl'

function Head({ props, step, index }: { props: ProcessProps; step: ProcessStep; index: number }) {
  return (
    <span className="flex min-w-0 items-baseline gap-5 md:gap-8">
      <span className={NUM}>{num(index)}</span>
      <T ctx={props.ctx} path={`steps.${index}.title`} value={step.title} as="h3" className="site-h3 min-w-0" placeholder="Step title" />
    </span>
  )
}

/**
 * Vertical numbered accordion: big number, title, expandable body.
 * Native <details> inside the kit Accordion, so it works without JavaScript.
 * The editor opens every step so each body can be edited in place.
 */
export function Numbered(props: ProcessProps) {
  const { content, ctx } = props
  const steps = content.steps ?? []
  if (steps.length === 0) return null
  const editor = ctx.mode === 'editor'
  return (
    <Accordion name={ctx.sectionId} single={!editor} className="border-site-border border-t">
      {steps.map((step, index) =>
        hasText(ctx, step.body) ? (
          <details key={step.id} {...itemAttrs(ctx, 'steps', index)} data-reveal="" open={editor || index === 0} className="group border-site-border border-b">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 md:py-8 [&::-webkit-details-marker]:hidden">
              <Head props={props} step={step} index={index} />
              <ChevronDown aria-hidden="true" className="text-site-primary size-6 shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div data-accordion-panel="" className="overflow-hidden">
              <div className="flex gap-5 pb-7 md:gap-8 md:pb-9">
                {/* Invisible twin of the number keeps the body aligned under the title. */}
                <span aria-hidden="true" className={`${NUM} invisible h-0`}>{num(index)}</span>
                <T ctx={ctx} path={`steps.${index}.body`} value={step.body} as="p" className="site-lead site-muted min-w-0 max-w-2xl" placeholder="What happens in this step" multiline />
              </div>
            </div>
          </details>
        ) : (
          <div key={step.id} {...itemAttrs(ctx, 'steps', index)} data-reveal="" className="border-site-border border-b py-6 md:py-8">
            <Head props={props} step={step} index={index} />
          </div>
        ),
      )}
    </Accordion>
  )
}
