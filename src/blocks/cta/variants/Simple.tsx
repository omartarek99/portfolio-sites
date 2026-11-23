import { cn } from '@/lib/utils'
import { Btn, Container, hasButton, SectionHeader } from '../../_shared'
import type { BlockContext, BlockProps } from '../../types'
import type { CtaContent } from '../schema'

export type CtaProps = BlockProps<CtaContent>

/** Primary and secondary buttons; renders nothing when both are empty. */
export function CtaButtons({ ctx, content, className }: { ctx: BlockContext; content: CtaContent; className?: string }) {
  if (!hasButton(ctx, content.primaryCta) && !hasButton(ctx, content.secondaryCta)) return null
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <Btn ctx={ctx} path="primaryCta" value={content.primaryCta} size="lg" />
      <Btn ctx={ctx} path="secondaryCta" value={content.secondaryCta} variant="outline" size="lg" />
    </div>
  )
}

/** Heading, one line and the buttons, centred on a surface card. */
export function Simple({ content, ctx, section }: CtaProps) {
  return (
    <Container section={section}>
      <div className="site-card flex flex-col items-center gap-8 px-6 py-12 text-center sm:px-10 md:py-16">
        <SectionHeader ctx={ctx} content={content} align="center" className="mb-0 md:mb-0" />
        <CtaButtons ctx={ctx} content={content} className="justify-center" />
      </div>
    </Container>
  )
}
