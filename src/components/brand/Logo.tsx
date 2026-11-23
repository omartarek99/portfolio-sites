import { APP_NAME } from '@/lib/config'
import { cn } from '@/lib/utils'

export type LogoProps = {
  tone?: 'ink' | 'white'
  /** Height of the mark in pixels. 36px is the navigation size. */
  size?: number
  markOnly?: boolean
  className?: string
}

/**
 * The Vizo mark (blue tile, yellow V) next to the wordmark. The wordmark is
 * drawn in `currentColor`; the mark keeps its brand colours.
 */
export function Logo({ tone = 'ink', size = 36, markOnly = false, className }: LogoProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 align-middle',
        tone === 'white' ? 'text-white' : 'text-ink',
        className,
      )}
    >
      <LogoMark size={size} />
      {markOnly ? (
        <span className="sr-only">{APP_NAME}</span>
      ) : (
        <span className="font-medium" style={{ fontSize: Math.round(size * 0.61), lineHeight: 1.1, fontFamily: 'var(--font-platform), sans-serif' }}>
          {APP_NAME}
        </span>
      )}
    </span>
  )
}

export function LogoMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn('shrink-0', className)}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="14" fill="#2E5BFF" />
      <path d="M16 18 L32 46 L48 18" fill="none" stroke="#FFCF3F" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
