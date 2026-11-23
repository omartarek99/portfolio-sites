import { IslamicDivider } from '@/themes/backgrounds'
import { Container } from '../../_shared'
import type { BlockProps } from '../../types'
import type { DividerContent } from '../schema'

/** A small ornament in the theme colours. Purely decorative. */
export function Shape({ content, section }: BlockProps<DividerContent>) {
  const shape = content.shape ?? 'diamond'

  if (shape === 'geometric') {
    return (
      <Container section={section} className="py-6 md:py-8">
        <IslamicDivider />
      </Container>
    )
  }

  const mark =
    shape === 'dots' ? 'size-1.5 rounded-full' : 'size-2 rotate-45 rounded-[1px]'

  return (
    <Container section={section} className="py-6 md:py-8">
      <div aria-hidden="true" className="flex items-center justify-center gap-3">
        <span className="bg-site-border h-px w-full max-w-40 flex-1" />
        <span className={`bg-site-muted ${mark}`} />
        <span className={`bg-site-primary ${mark} scale-150`} />
        <span className={`bg-site-muted ${mark}`} />
        <span className="bg-site-border h-px w-full max-w-40 flex-1" />
      </div>
    </Container>
  )
}
