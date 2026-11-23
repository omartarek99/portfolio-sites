import type { CSSProperties } from 'react'
import { Container, SectionHeader } from '../../_shared'
import { CtaButtons, type CtaProps } from './Simple'

/*
 * Full-width band from the primary colour into a primary/secondary mix, so
 * on-primary text keeps its contrast at both ends. The outer element captures
 * the theme colours, the inner one remaps the tokens (like a coloured section
 * background) so buttons and muted text stay legible under every theme. Two
 * elements, because a custom property cannot read its own old value.
 */
const band = {
  '--_fill': 'var(--site-primary)',
  '--_on': 'var(--site-on-primary)',
  backgroundColor: 'var(--site-primary)',
  backgroundImage: 'linear-gradient(120deg, var(--site-primary), color-mix(in oklab, var(--site-primary) 62%, var(--site-secondary)))',
} as CSSProperties

const inner = {
  '--site-text': 'var(--_on)',
  '--site-muted': 'color-mix(in oklab, var(--_on) 84%, var(--_fill))',
  '--site-border': 'color-mix(in oklab, var(--_on) 40%, transparent)',
  '--site-surface': 'color-mix(in oklab, var(--_on) 12%, transparent)',
  '--site-primary': 'var(--_on)',
  '--site-on-primary': 'var(--_fill)',
  color: 'var(--_on)',
} as CSSProperties

export function Gradient({ content, ctx, section }: CtaProps) {
  return (
    <div className="relative isolate overflow-hidden" style={band}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="site-aurora-blob bg-site-accent -start-16 -top-24 size-80 opacity-30" />
        <div className="site-aurora-blob bg-site-secondary -end-24 -bottom-32 size-96 opacity-40" style={{ animationDelay: '-8s' }} />
      </div>
      <div className="py-20 md:py-28" style={inner}>
        <Container section={section}>
          <div className="flex flex-col items-center gap-8 text-center">
            <SectionHeader ctx={ctx} content={content} align="center" className="mb-0 md:mb-0" />
            <CtaButtons ctx={ctx} content={content} className="justify-center" />
          </div>
        </Container>
      </div>
    </div>
  )
}
