'use client'

/**
 * 3D tilt-on-pointer wrapper for cards and portraits (the Launch and Grid Pop
 * templates lean on it).
 *
 * Off on touch devices and under reduced motion: the wrapper then adds nothing
 * but a <div>, and the card is exactly as it was.
 */
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface TiltProps {
  children: ReactNode
  /** Maximum rotation in degrees. Default 8. */
  max?: number
  /** Lift towards the pointer in px. Default 0 (no lift). */
  depth?: number
  className?: string
}

export function Tilt({ children, max = 8, depth = 0, className }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const allowed = useRef<boolean | null>(null)

  /** Asked on the first pointer event, not during render, so SSR and hydration match. */
  const enabled = () => {
    if (allowed.current === null) {
      allowed.current =
        window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return allowed.current
  }

  const reset = () => {
    const element = ref.current
    if (element) element.style.transform = ''
  }

  return (
    <div
      ref={ref}
      className={cn('transition-transform duration-200 ease-out will-change-transform', className)}
      style={{ transformStyle: 'preserve-3d' }}
      onPointerMove={(event) => {
        const element = ref.current
        if (!element || !enabled()) return
        const rect = element.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        element.style.transform = `perspective(900px) rotateY(${x * max * 2}deg) rotateX(${
          -y * max * 2
        }deg) translateZ(${depth}px)`
      }}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </div>
  )
}
