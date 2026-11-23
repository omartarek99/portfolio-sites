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
 * The Vizo mark (a monochrome V: one heavy stroke, one hairline) next to the
 * wordmark. Both are drawn in `currentColor`, so they follow the theme.
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

export const V_PATH = 'M8 10h13l17 44H25zM50 10h5.5L34 54h-4z'

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
      <path d={V_PATH} fill="currentColor" />
    </svg>
  )
}
