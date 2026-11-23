import { pick, plainText } from '@/schemas/fields'
import { Container, Typewriter, WordRotate } from '../../_shared'
import { ht } from '../strings'
import type { TerminalLine } from '../terminal'
import { HeroText, type HeroProps } from './parts'
import { Terminal } from './Terminal.client'

const HEADING = 'site-display text-[clamp(2.6rem,5vw+1rem,6rem)]'

/**
 * Headline with a moving part: rotating words (Aurora), a typewriter, or
 * Terminal's interactive window. Every mode renders complete static text on
 * the server, so it reads fine without JavaScript and under reduced motion.
 */
export function AnimatedText({ content, ctx, section }: HeroProps) {
  const mode = content.animation ?? 'word-rotate'

  if (mode === 'terminal') {
    const lines: TerminalLine[] = (content.commands ?? [])
      .map((line) => ({
        id: line.id,
        command: line.command.trim(),
        output: plainText(pick(line.output, ctx.locale)),
        typed: line.typed !== false,
      }))
      .filter((line) => line.command !== '')
    return (
      <Container section={section}>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <HeroText ctx={ctx} content={content} headingClassName="site-h1" />
          {lines.length > 0 ? (
            <div data-reveal className="min-w-0">
              <Terminal
                lines={lines}
                prompt={`${ctx.site.slug || 'portfolio'} ~ $`}
                labels={{
                  title: ht(ctx.locale, 'terminal'),
                  input: ht(ctx.locale, 'terminalInput'),
                  hint: ht(ctx.locale, 'terminalHint'),
                  available: ht(ctx.locale, 'terminalAvailable'),
                  notFound: ht(ctx.locale, 'terminalNotFound'),
                }}
              />
            </div>
          ) : null}
        </div>
      </Container>
    )
  }

  const words = (content.words ?? []).map((word) => plainText(pick(word.text, ctx.locale))).filter(Boolean)
  const moving =
    words.length === 0 ? null : (
      <>
        {' '}
        {mode === 'typewriter' ? (
          <Typewriter texts={words} className="text-site-primary" />
        ) : (
          <WordRotate words={words} wordClassName="site-gradient-text" />
        )}
      </>
    )

  return (
    <Container section={section}>
      <HeroText ctx={ctx} content={content} center className="mx-auto max-w-5xl" headingClassName={HEADING} afterHeading={moving} />
    </Container>
  )
}
