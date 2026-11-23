import { cn } from '@/lib/utils'
import { Container, hasImage, Img } from '../../_shared'
import { HeroText, personName, type HeroProps } from './parts'

/** Two soft organic shapes behind the picture (Bloom Coach). Decorative. */
function Blobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -inset-6 -z-10 md:-inset-10">
      <div className="site-float bg-site-primary absolute inset-0 rounded-[58%_42%_46%_54%/48%_56%_44%_52%] opacity-25" />
      <div
        className="site-float bg-site-secondary absolute -end-4 -bottom-6 size-2/5 rounded-[42%_58%_63%_37%/55%_38%_62%_45%] opacity-35"
        style={{ animationDelay: '-3s' }}
      />
    </div>
  )
}

/** Copy beside a portrait or cover. Without a picture the copy simply takes the width. */
export function SplitImage({ content, ctx, section }: HeroProps) {
  const image = hasImage(ctx, content.image)
  return (
    <Container section={section}>
      <div className={cn('grid items-center gap-12 md:gap-16', image && 'md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]')}>
        <HeroText ctx={ctx} content={content} className={cn(content.imageSide === 'start' && 'md:order-2')} />
        {image ? (
          <div className={cn('relative isolate mx-auto w-full max-w-md', content.blob && 'p-2')}>
            {content.blob ? <Blobs /> : null}
            <div className={cn('site-media aspect-[4/5]', content.blob && 'rounded-[46%_54%_42%_58%/40%_44%_56%_60%]')}>
              <Img
                ctx={ctx}
                path="image"
                value={content.image}
                alt={personName({ content, ctx })}
                sizes="(min-width: 768px) 28rem, 100vw"
                maxWidth={900}
                priority
              />
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  )
}
