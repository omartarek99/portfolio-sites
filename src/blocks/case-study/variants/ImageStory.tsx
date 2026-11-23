import { Container, hasText, itemAttrs, T } from '../../_shared'
import { Cover, Figures, hasHeader, headingTags, NextProject, Results, type CaseStudyVariantProps } from '../parts'

/** A centred title, then a narrow column of narrative that alternates with full-width pictures. */
export function ImageStory({ ctx, section, content }: CaseStudyVariantProps) {
  const { Title, Sub } = headingTags(ctx)
  const meta = content.meta ?? []
  return (
    <Container section={section}>
      <article className="flex flex-col gap-12 md:gap-20">
        {hasHeader(ctx, content) ? (
          <header className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <T ctx={ctx} path="eyebrow" value={content.eyebrow} as="p" className="site-eyebrow" placeholder="Case study" />
            <T ctx={ctx} path="title" value={content.title} as={Title} className="site-h1" placeholder="Project title" />
            <T
              ctx={ctx}
              path="subtitle"
              value={content.subtitle}
              as="p"
              className="site-lead"
              placeholder="One sentence on what this project was"
              multiline
            />
            {meta.length > 0 ? (
              <dl className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-2">
                {meta.map((fact, index) => (
                  <div key={fact.id} {...itemAttrs(ctx, 'meta', index)} className="flex items-baseline gap-2">
                    <T ctx={ctx} path={`meta.${index}.label`} value={fact.label} as="dt" className="site-small site-muted" placeholder="Label" />
                    <T ctx={ctx} path={`meta.${index}.value`} value={fact.value} as="dd" className="font-semibold" placeholder="Value" />
                  </div>
                ))}
              </dl>
            ) : null}
          </header>
        ) : null}

        <Cover ctx={ctx} content={content} className="aspect-[4/3] md:aspect-[21/9]" />

        {content.sections.map((part, index) => {
          const text = hasText(ctx, part.label) || hasText(ctx, part.heading) || hasText(ctx, part.body)
          return (
            <section key={part.id} {...itemAttrs(ctx, 'sections', index)} data-reveal="" className="flex flex-col gap-8 md:gap-12">
              {text ? (
                <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 text-start">
                  <T ctx={ctx} path={`sections.${index}.label`} value={part.label} as="p" className="site-eyebrow" placeholder="Label" />
                  <T ctx={ctx} path={`sections.${index}.heading`} value={part.heading} as={Sub} className="site-h2" placeholder="Section heading" />
                  <T
                    ctx={ctx}
                    path={`sections.${index}.body`}
                    value={part.body}
                    as="div"
                    rich
                    className="site-prose"
                    placeholder="Tell this part of the story"
                  />
                </div>
              ) : null}
              <Figures ctx={ctx} section={part} sectionIndex={index} />
            </section>
          )
        })}

        <Results ctx={ctx} content={content} Sub={Sub} center />
        <NextProject ctx={ctx} content={content} />
      </article>
    </Container>
  )
}
