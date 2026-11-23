/**
 * Round portrait for testimonials, team members and the site author.
 * Falls back to the person's initials on a tinted circle, so a card never has
 * a hole in it when the image is missing.
 */
import { pick, plainText, type ImageRef, type Locale } from '@/schemas/fields'
import { imageSrcSet, imageUrl } from '@/lib/media-url'
import { cn, initials } from '@/lib/utils'

export interface AvatarProps {
  image?: ImageRef
  /** Used for the initials and as the alt text fallback. */
  name: string
  locale: Locale
  /** Rendered size in px. Default 56. */
  size?: number
  className?: string
}

export function Avatar({ image, name, locale, size = 56, className }: AvatarProps) {
  const classes = cn(
    'border-site-border shrink-0 overflow-hidden rounded-full border object-cover',
    className,
  )
  const style = { width: size, height: size }

  if (image?.url) {
    const alt = plainText(pick(image.alt, locale)) || name
    return (
      <img
        src={imageUrl(image.url, { width: size * 2 })}
        srcSet={imageSrcSet(image.url, Math.max(360, size * 2))}
        sizes={`${size}px`}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={classes}
        style={image.focal ? { ...style, objectPosition: `${image.focal.x * 100}% ${image.focal.y * 100}%` } : style}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        classes,
        'bg-site-surface text-site-primary flex items-center justify-center font-semibold uppercase',
      )}
      style={{ ...style, fontSize: Math.round(size * 0.36) }}
    >
      {initials(name) || '·'}
    </span>
  )
}
