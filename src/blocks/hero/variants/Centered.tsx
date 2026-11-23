import { PatternFrame } from '@/themes/backgrounds'
import { cn } from '@/lib/utils'
import { Container, hasImage, Img } from '../../_shared'
import { HeroText, personName, type HeroProps } from './parts'

/**
 * Founder's reading-progress bar: a CSS scroll-driven animation, so no script.
 * Browsers without `animation-timeline` simply do not show it.
 */
const PROGRESS_CSS = `
.sc-hero-progress{display:none}
@supports (animation-timeline: scroll()){
  .sc-hero-progress{display:block;position:fixed;inset-inline:0;top:0;z-index:60;height:3px;pointer-events:none;
    background:linear-gradient(90deg,var(--site-primary),var(--site-secondary),var(--site-accent));
    transform:scaleX(0);transform-origin:0 50%;animation:sc-hero-progress linear both;animation-timeline:scroll(root)}
  [dir='rtl'] .sc-hero-progress{transform-origin:100% 50%}
}
@keyframes sc-hero-progress{to{transform:scaleX(1)}}
`

/** Centred big type. Optional avatar above, geometric frame (Majlis), gradient (Founder) or signature name (Atelier). */
export function Centered({ content, ctx, section }: HeroProps) {
  const style = content.textStyle ?? 'plain'
  const framed = content.frame === 'pattern'
  return (
    <Container section={section}>
      {content.progressBar && ctx.mode !== 'editor' ? (
        <>
          <style href="site-hero-progress" precedence="default">
            {PROGRESS_CSS}
          </style>
          <div aria-hidden="true" className="sc-hero-progress" />
        </>
      ) : null}
      <div className={cn('relative mx-auto flex max-w-5xl flex-col items-center gap-8', framed && 'px-6 py-14 sm:px-12 md:py-20')}>
        {framed ? <PatternFrame /> : null}
        {hasImage(ctx, content.avatar) ? (
          <div data-reveal className="site-media ring-site-border size-24 shrink-0 rounded-full ring-1 ring-offset-4 ring-offset-transparent md:size-28">
            <Img ctx={ctx} path="avatar" value={content.avatar} alt={personName({ content, ctx })} sizes="7rem" maxWidth={256} priority />
          </div>
        ) : null}
        <HeroText
          ctx={ctx}
          content={content}
          center
          className="relative w-full"
          headingClassName={cn(
            'site-display text-[clamp(2.6rem,5.5vw+1rem,6.5rem)]',
            style === 'gradient' && 'site-gradient-text',
          )}
          nameClassName={
            style === 'signature'
              ? 'site-h2 text-site-primary font-normal tracking-normal ltr:italic'
              : undefined
          }
        />
      </div>
    </Container>
  )
}
