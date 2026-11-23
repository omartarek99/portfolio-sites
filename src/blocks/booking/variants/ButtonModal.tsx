import { Container, hasButton, hasText, SectionHeader, st, T } from '../../_shared'
import { t } from '../strings'
import { BookingDialog } from './BookingDialog.client'
import { FallbackCta, MeetingMeta, Note, typeDescription, typeName, typesOf, type BookingProps } from './parts'
import { Picker } from './Picker.client'

/**
 * The offer at a glance — meeting types with duration, location and price —
 * and one button that opens the booking window. With no meeting types the
 * configured CTA takes its place; with neither, the button opens a window
 * that says booking is not set up yet.
 */
export function ButtonModal({ content, ctx, section }: BookingProps) {
  const types = typesOf(ctx, content)
  const fallback = <FallbackCta ctx={ctx} content={content} />
  const showFallbackOnly = types.length === 0 && hasButton(ctx, content.cta)
  const label = hasText(ctx, content.buttonLabel) ? (
    <T ctx={ctx} path="buttonLabel" value={content.buttonLabel} placeholder="Book a session" />
  ) : (
    <span>{st(ctx.locale, 'bookSession')}</span>
  )
  return (
    <Container section={section}>
      <div className="flex flex-col items-start gap-8">
        <SectionHeader ctx={ctx} content={content} section={section} className="mb-0 md:mb-0" />
        {types.length > 0 ? (
          <ul className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {types.map((type) => (
              <li key={type.id} data-reveal className="site-card flex flex-col gap-2 p-5">
                <span className="site-h4">{typeName(ctx, type)}</span>
                {typeDescription(ctx, type) ? <span className="site-muted">{typeDescription(ctx, type)}</span> : null}
                <MeetingMeta ctx={ctx} type={type} />
              </li>
            ))}
          </ul>
        ) : null}
        {showFallbackOnly ? (
          fallback
        ) : (
          <BookingDialog ctx={ctx} label={label} title={st(ctx.locale, 'bookSession')}>
            {types.length > 0 ? <Picker ctx={ctx} types={types} fallback={fallback} /> : <p className="site-lead">{t(ctx.locale, 'notSetUp')}</p>}
          </BookingDialog>
        )}
        <Note ctx={ctx} content={content} />
      </div>
    </Container>
  )
}
