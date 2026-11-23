import { Container, SectionHeader } from '../../_shared'
import { t } from '../strings'
import { FallbackCta, Note, typesOf, type BookingProps } from './parts'
import { Picker } from './Picker.client'

/** Meeting types, a month grid and a time column, on the page. Without meeting types: the fallback CTA. */
export function InlineCalendar({ content, ctx, section }: BookingProps) {
  const types = typesOf(ctx, content)
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      {types.length > 0 ? (
        <div className="site-card flex flex-col gap-6 p-5 sm:p-8">
          <Picker ctx={ctx} types={types} fallback={<FallbackCta ctx={ctx} content={content} />} />
          <Note ctx={ctx} content={content} />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <FallbackCta ctx={ctx} content={content} />
          {ctx.mode === 'editor' ? <p className="site-small site-muted">{t(ctx.locale, 'notSetUp')}</p> : null}
          <Note ctx={ctx} content={content} />
        </div>
      )}
    </Container>
  )
}
