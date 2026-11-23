/**
 * FAQ / process accordion. Built on <details> and <summary>, so it opens and
 * closes with no JavaScript at all and is keyboard operable for free.
 *
 * Single-open mode is the native `name` attribute on <details> (one open item
 * per group). `AccordionMotion` adds the height animation and covers browsers
 * that do not support `name` yet.
 *
 *   <Accordion name={ctx.sectionId}>
 *     {items.map((item, i) => (
 *       <AccordionItem key={item.id} summary={<T … />} {...itemAttrs(ctx, 'items', i)}>
 *         <T ctx={ctx} path={`items.${i}.answer`} value={item.answer} as="p" />
 *       </AccordionItem>
 *     ))}
 *   </Accordion>
 */
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AccordionMotion } from './AccordionMotion'

export interface AccordionProps {
  /** Group id — stable per section, e.g. `ctx.sectionId`. */
  name: string
  /** One item open at a time. Default true. */
  single?: boolean
  className?: string
  children: ReactNode
}

export function Accordion({ name, single = true, className, children }: AccordionProps) {
  const groupId = `acc-${name}`
  // Items get the group name from here so blocks do not have to repeat it.
  const items = Children.map(children, (child) =>
    isValidElement<AccordionItemProps>(child) && child.props.name === undefined && single
      ? cloneElement(child as ReactElement<AccordionItemProps>, { name: groupId })
      : child,
  )

  return (
    <div id={groupId} className={cn('flex flex-col', className)} data-accordion={single ? 'single' : 'multi'}>
      {items}
      <AccordionMotion rootId={groupId} />
    </div>
  )
}

export interface AccordionItemProps {
  summary: ReactNode
  children: ReactNode
  /** Exclusive-group name. Injected by `Accordion` in single-open mode. */
  name?: string
  defaultOpen?: boolean
  className?: string
  summaryClassName?: string
  panelClassName?: string
}

export function AccordionItem({
  summary,
  children,
  name,
  defaultOpen,
  className,
  summaryClassName,
  panelClassName,
}: AccordionItemProps) {
  return (
    <details
      name={name}
      open={defaultOpen}
      className={cn('group border-site-border border-b', className)}
    >
      <summary
        className={cn(
          'flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-start font-medium [&::-webkit-details-marker]:hidden',
          summaryClassName,
        )}
      >
        <span className="min-w-0">{summary}</span>
        <ChevronDown
          aria-hidden="true"
          className="text-site-primary size-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div data-accordion-panel className="overflow-hidden">
        <div className={cn('site-muted pb-5', panelClassName)}>{children}</div>
      </div>
    </details>
  )
}
