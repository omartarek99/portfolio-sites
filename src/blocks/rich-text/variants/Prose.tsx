import { cn } from '@/lib/utils'
import { Container, SectionHeader, T } from '../../_shared'
import type { BlockProps } from '../../types'
import type { RichTextContent } from '../schema'

/**
 * `single`: one readable column (~70ch).
 * `two-column`: the same text flowed into CSS columns from md up; headings never end a column.
 */
export function Prose({ ctx, section, content, columns }: BlockProps<RichTextContent> & { columns: boolean }) {
  const center = section.style.textAlign === 'center'
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      <T
        ctx={ctx}
        path="body"
        value={content.body}
        as="div"
        rich
        placeholder="Write something…"
        className={cn(
          'site-prose min-w-0',
          columns
            ? 'md:columns-2 md:gap-12 lg:gap-16 [&_:is(h2,h3,h4)]:break-after-avoid [&_:is(ul,ol,li,blockquote,figure,pre)]:break-inside-avoid [&>:first-child]:mt-0'
            : 'max-w-[70ch]',
          !columns && center && 'mx-auto',
        )}
      />
    </Container>
  )
}
