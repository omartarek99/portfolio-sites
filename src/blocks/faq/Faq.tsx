import { pick } from '@/schemas/fields'
import { Container, SectionHeader } from '../_shared'
import type { FaqProps } from './schema'
import { Accordion } from './variants/Accordion'
import { TwoColumn } from './variants/TwoColumn'

const plain = (html: string) => html.replace(/<[^>]+>/g, '').trim()

/** FAQPage structured data for search engines — live pages only. */
function JsonLd({ content, ctx }: FaqProps) {
  const entities = (content.items ?? [])
    .map((item) => ({ q: plain(pick(item.question, ctx.locale)), a: plain(pick(item.answer, ctx.locale)) }))
    .filter((e) => e.q && e.a)
    .map((e) => ({ '@type': 'Question', name: e.q, acceptedAnswer: { '@type': 'Answer', text: e.a } }))
  if (entities.length === 0) return null
  // Escape "<" so owner text can never close the script tag.
  const json = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: entities }).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export function Faq(props: FaqProps) {
  const { content, ctx, section, variant } = props
  const Items = variant === 'two-column' ? TwoColumn : Accordion
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      <Items {...props} />
      {ctx.mode === 'live' ? <JsonLd {...props} /> : null}
    </Container>
  )
}
