import { cn } from '@/lib/utils'
import { Container, hasImage, Img, Tilt } from '../../_shared'
import { HeroText, personName, type HeroProps } from './parts'

/** Launch: copy beside the portrait on a glowing card that tilts towards the pointer. */
export function TiltCard({ content, ctx, section }: HeroProps) {
  const image = hasImage(ctx, content.image)
  return (
    <Container section={section}>
      <div className={cn('grid items-center gap-14 lg:gap-20', image && 'md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]')}>
        <HeroText ctx={ctx} content={content} />
        {image ? (
          <div className="relative isolate mx-auto w-full max-w-sm">
            <div
              aria-hidden="true"
              className="bg-linear-to-br from-site-primary via-site-secondary to-site-accent site-float absolute -inset-6 -z-10 rounded-[2rem] opacity-50 blur-3xl"
            />
            <Tilt max={10} depth={20}>
              <div className="site-card p-3 shadow-2xl">
                <div className="site-media aspect-[4/5]">
                  <Img
                    ctx={ctx}
                    path="image"
                    value={content.image}
                    alt={personName({ content, ctx })}
                    sizes="(min-width: 768px) 24rem, 90vw"
                    maxWidth={800}
                    priority
                  />
                </div>
              </div>
            </Tilt>
          </div>
        ) : null}
      </div>
    </Container>
  )
}
