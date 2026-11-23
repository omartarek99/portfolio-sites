'use client'

import { useEffect } from 'react'

/**
 * Drives entrance animations for a site (see "Entrance animations" in
 * src/styles/site.css). One instance per site root, rendered by SiteRenderer.
 *
 * Elements carrying `data-entrance` get `data-inview` when they scroll into
 * view. Anything already on screen at mount is marked first, and only then is
 * the root flagged with `data-js` (which activates the hidden states) — so
 * nothing that is already visible ever flickers, and without JavaScript all
 * content is simply visible.
 */
export function RevealRoot({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId)
    if (!root) return
    if (root.hasAttribute('data-static') || root.getAttribute('data-motion') === 'none') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-entrance]')).filter(
      (el) => el.dataset.entrance !== 'none',
    )
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const pending: HTMLElement[] = []
    for (const el of elements) {
      const rect = el.getBoundingClientRect()
      if (rect.top < viewportHeight && rect.bottom > 0) {
        el.setAttribute('data-inview', '')
      } else {
        pending.push(el)
      }
    }
    root.setAttribute('data-js', '')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-inview', '')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    for (const el of pending) observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [rootId])

  return null
}
