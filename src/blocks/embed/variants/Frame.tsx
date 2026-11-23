import { pick, plainText } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { Container, SectionHeader, T } from '../../_shared'
import type { BlockProps } from '../../types'
import { EMBED_ALLOW_LIST, EMBED_PROVIDER_NAMES, matchEmbed } from '../allow-list'
import type { EmbedContent } from '../schema'
import { t } from '../strings'
import { Notice } from './Notice'

const SANDBOX = 'allow-scripts allow-same-origin allow-popups allow-presentation'
/** Documents we build ourselves (gist) run in an opaque origin: never allow-same-origin with srcdoc. */
const SANDBOX_SRCDOC = 'allow-scripts allow-popups'

/** One allow-listed third-party frame at a chosen aspect ratio. */
export function Frame({ ctx, section, content }: BlockProps<EmbedContent>) {
  const match = matchEmbed(content.url)
  // Outside the editor an empty block shows only its header.
  const quiet = !match.ok && match.error === 'empty' && ctx.mode !== 'editor'

  let body = null
  if (match.ok) {
    const provider = EMBED_ALLOW_LIST[match.provider].name
    const title =
      plainText(pick(content.title, ctx.locale)) ||
      plainText(pick(content.heading, ctx.locale)) ||
      t(ctx.locale, 'frameTitle', { provider })
    const aspect = content.aspect && content.aspect !== 'auto' ? content.aspect.replace(':', '/') : match.ratio
    body = (
      <figure className="min-w-0">
        <div
          className="site-media bg-site-surface relative w-full overflow-hidden"
          style={!aspect && match.height ? { height: match.height } : { aspectRatio: aspect ?? '16/9' }}
        >
          <iframe
            src={match.srcDoc ? undefined : match.src}
            srcDoc={match.srcDoc}
            title={title}
            sandbox={match.srcDoc ? SANDBOX_SRCDOC : SANDBOX}
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            allow="encrypted-media; fullscreen; picture-in-picture; clipboard-write"
            allowFullScreen
            // The editor canvas selects the section; the frame must not swallow the click.
            className={cn('absolute inset-0 size-full border-0', ctx.mode === 'editor' && 'pointer-events-none')}
          />
        </div>
        <T ctx={ctx} path="caption" value={content.caption} as="figcaption" className="text-site-muted mt-3 text-sm" placeholder="Caption" />
      </figure>
    )
  } else if (!quiet) {
    const list = EMBED_PROVIDER_NAMES.join(', ')
    const message =
      match.error === 'empty' || match.error === 'host'
        ? t(ctx.locale, match.error, { list })
        : match.error === 'unsupported' && match.provider
          ? t(ctx.locale, 'unsupported', { provider: EMBED_ALLOW_LIST[match.provider].name })
          : t(ctx.locale, 'invalid')
    body = <Notice message={message} />
  }

  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      {body}
    </Container>
  )
}
