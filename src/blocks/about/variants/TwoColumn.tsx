import { cn } from '@/lib/utils'
import { Btn, Container, hasButton, SectionHeader, T } from '../../_shared'
import type { AboutProps } from '../schema'

export function TwoColumn({ content, ctx, section }: AboutProps) {
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      <T
        ctx={ctx}
        path="body"
        value={content.body}
        as="div"
        rich
        className={cn('site-prose md:columns-2 md:gap-12 lg:gap-20', content.dropCap && 'site-dropcap')}
        placeholder="Tell your story"
      />
      {hasButton(ctx, content.cta) ? (
        <div className="mt-10">
          <Btn ctx={ctx} path="cta" value={content.cta} variant="outline" />
        </div>
      ) : null}
    </Container>
  )
}
