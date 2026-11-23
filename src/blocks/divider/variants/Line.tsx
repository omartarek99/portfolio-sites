import { Container, hasText, T } from '../../_shared'
import type { BlockProps } from '../../types'
import type { DividerContent } from '../schema'

/** A hairline. With a label it becomes rule · words · rule. */
export function Line({ content, ctx, section }: BlockProps<DividerContent>) {
  return (
    <Container section={section} className="py-6 md:py-8">
      {hasText(ctx, content.label) ? (
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="bg-site-border h-px min-w-6 flex-1" />
          <T
            ctx={ctx}
            path="label"
            value={content.label}
            as="p"
            className="site-eyebrow text-site-muted max-w-[70%] text-center"
            placeholder="Label"
          />
          <span aria-hidden="true" className="bg-site-border h-px min-w-6 flex-1" />
        </div>
      ) : (
        <hr className="site-rule" />
      )}
    </Container>
  )
}
