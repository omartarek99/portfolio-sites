'use client'

import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(SplitText)

/** A paragraph whose lines scale and fade in, one after another, when it scrolls into view. */
export function OmarBio({ text, className = 'mt-4' }: { text: string; className?: string }) {
  const paragraphRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const paragraph = paragraphRef.current
    if (!paragraph || !('IntersectionObserver' in window)) return

    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      let split: SplitText | undefined
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return

        observer.disconnect()
        split = SplitText.create(paragraph, {
          type: 'lines',
          tag: 'span',
          autoSplit: true,
          onSplit: ({ lines }) =>
            gsap.from(lines, {
              stagger: 0.075,
              duration: 0.7,
              ease: 'power2',
              transformOrigin: 'center center',
              scale: 0,
              opacity: 0,
            }),
        })
      }, { threshold: 0.2 })
      observer.observe(paragraph)

      return () => {
        observer.disconnect()
        split?.revert()
      }
    })

    return () => motion.revert()
  }, [text])

  return <p ref={paragraphRef} className={`large-animation-0 text-pretty text-fg/70 ${className}`}>{text}</p>
}
