import { A, Container, SectionHeader, SocialLinks, T } from '../../_shared'
import { detailRows, socialOf, type ContactProps } from './parts'

/** No form: the email large, the other details on one line, then social links. */
export function Minimal({ content, ctx, section }: ContactProps) {
  const [first, ...rest] = detailRows(ctx, content)
  return (
    <Container section={section} width="narrow">
      <div className="flex flex-col items-center gap-8 text-center">
        <SectionHeader ctx={ctx} content={content} align="center" className="mb-0 md:mb-0" />
        {first ? (
          <p data-reveal className="site-h3 max-w-full break-words">
            <A ctx={ctx} link={first.link} className="site-link">
              <span dir={first.ltr ? 'ltr' : undefined}>{first.value}</span>
            </A>
          </p>
        ) : null}
        {rest.length > 0 ? (
          <dl data-reveal className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {rest.map((row) => (
              <div key={row.key} className="flex flex-col items-center">
                <dt className="site-small site-muted">{row.label}</dt>
                <dd className="font-semibold">
                  <A ctx={ctx} link={row.link} className={row.link ? 'site-link' : undefined}>
                    <span dir={row.ltr ? 'ltr' : undefined}>{row.value}</span>
                  </A>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        <T ctx={ctx} path="note" value={content.note} as="p" className="site-muted max-w-md" placeholder="Office hours or reply time" multiline />
        <SocialLinks ctx={ctx} links={socialOf(ctx, content)} variant="pills" className="justify-center" />
      </div>
    </Container>
  )
}
