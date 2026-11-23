import { pick } from '@/schemas/fields'
import { Container, SectionHeader, T } from '../../_shared'
import type { BlockProps } from '../../types'
import { hasScriptTag } from '../allow-list'
import type { EmbedContent } from '../schema'
import { t } from '../strings'
import { Notice } from './Notice'

/** A sanitized HTML snippet (<T rich> runs sanitizeRichHtml). Any <script> refuses the whole snippet. */
export function Code({ ctx, section, content }: BlockProps<EmbedContent>) {
  const refused = hasScriptTag(pick(content.code, ctx.locale))
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      {refused ? (
        <Notice message={t(ctx.locale, 'script')} />
      ) : (
        <T
          ctx={ctx}
          path="code"
          value={content.code}
          as="div"
          rich
          placeholder={t(ctx.locale, 'codeEmpty')}
          className="site-prose max-w-[70ch] min-w-0 break-words"
        />
      )}
    </Container>
  )
}
