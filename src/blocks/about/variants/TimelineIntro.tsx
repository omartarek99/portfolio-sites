import { Container, itemAttrs, SectionHeader, T } from '../../_shared'
import type { AboutProps } from '../schema'

/** A short intro, then the milestones: on a vertical line on small screens, a horizontal one from lg. */
export function TimelineIntro({ content, ctx, section }: AboutProps) {
  const milestones = content.milestones ?? []
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      {milestones.length > 0 ? (
        <ol className="grid lg:auto-cols-fr lg:grid-flow-col">
          {milestones.map((item, i) => (
            <li
              key={item.id}
              {...itemAttrs(ctx, 'milestones', i)}
              data-reveal=""
              className="border-site-border relative border-s pb-10 ps-8 last:pb-0 lg:border-s-0 lg:border-t lg:pb-0 lg:pe-8 lg:ps-0 lg:pt-8"
            >
              <span
                aria-hidden="true"
                className="bg-site-primary absolute -start-[6.5px] top-2 size-3 rounded-full lg:start-0 lg:-top-[6.5px]"
              />
              {item.year ? (
                <p className="font-site-heading text-site-primary text-2xl leading-tight font-bold tabular-nums">{item.year}</p>
              ) : null}
              <T ctx={ctx} path={`milestones.${i}.title`} value={item.title} as="h3" className="site-h4 mt-2" placeholder="Milestone" />
              <T
                ctx={ctx}
                path={`milestones.${i}.text`}
                value={item.text}
                as="p"
                multiline
                className="site-small site-muted mt-1.5"
                placeholder="What happened"
              />
            </li>
          ))}
        </ol>
      ) : null}
    </Container>
  )
}
