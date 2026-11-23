import { Container, itemAttrs, T } from '../../_shared'
import { ordinal } from '../../projects/parts'
import { Cover, Figures, hasHeader, headingTags, NextProject, Results, type CaseStudyVariantProps } from '../parts'

/** Header with the project facts, then labelled sections (Problem / Process / Result) with the label in a side column. */
export function ProblemProcessResult({ ctx, section, content }: CaseStudyVariantProps) {
  const { Title, Sub } = headingTags(ctx)
  const meta = content.meta ?? []
  return (
    <Container section={section}>
      <article className="flex flex-col gap-12 text-start md:gap-20">
        {hasHeader(ctx, content) ? (
          <header className="flex flex-col gap-8 md:gap-10">
            <div className="flex max-w-4xl flex-col gap-4">
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
            </div>
            {meta.length > 0 ? (
              <dl className="border-site-border grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6 md:grid-cols-4">
                {meta.map((fact, index) => (
                  <div key={fact.id} {...itemAttrs(ctx, 'meta', index)} className="flex min-w-0 flex-col gap-1">
                    <T ctx={ctx} path={`meta.${index}.label`} value={fact.label} as="dt" className="site-small site-muted" placeholder="Label" />
                    <T ctx={ctx} path={`meta.${index}.value`} value={fact.value} as="dd" className="font-semibold" placeholder="Value" />
                  </div>
                ))}
              </dl>
            ) : null}
          </header>
        ) : null}

        <Cover ctx={ctx} content={content} className="aspect-[4/3] sm:aspect-[16/9]" />

        {content.sections.length > 0 ? (
          <div className="flex flex-col gap-10 md:gap-16">
            {content.sections.map((part, index) => (
              <section
                key={part.id}
                {...itemAttrs(ctx, 'sections', index)}
                data-reveal=""
                className="border-site-border grid gap-5 border-t pt-8 md:pt-10 lg:grid-cols-12 lg:gap-10"
              >
                <div className="flex items-baseline gap-3 lg:sticky lg:top-24 lg:col-span-3 lg:flex-col lg:gap-1 lg:self-start">
                  <span aria-hidden="true" className="site-small site-muted tabular-nums">
                    {ordinal(index)}
                  </span>
                  <T ctx={ctx} path={`sections.${index}.label`} value={part.label} as="p" className="site-eyebrow" placeholder="Label" />
                </div>
                <div className="flex min-w-0 flex-col gap-6 lg:col-span-9">
                  <T ctx={ctx} path={`sections.${index}.heading`} value={part.heading} as={Sub} className="site-h2" placeholder="Section heading" />
                  <T
                    ctx={ctx}
                    path={`sections.${index}.body`}
                    value={part.body}
                    as="div"
                    rich
                    className="site-prose max-w-3xl"
                    placeholder="Tell this part of the story"
                  />
                  <Figures ctx={ctx} section={part} sectionIndex={index} />
                </div>
              </section>
            ))}
          </div>
        ) : null}

        <Results ctx={ctx} content={content} Sub={Sub} />
        <NextProject ctx={ctx} content={content} />
      </article>
    </Container>
  )
}
