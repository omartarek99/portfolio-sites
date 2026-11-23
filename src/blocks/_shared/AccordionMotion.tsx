'use client'

/**
 * Progressive enhancement for `Accordion`: animates the panel height and, for
 * browsers that do not support the exclusive `name` attribute on <details>,
 * closes the other items in single-open mode.
 *
 * Does nothing under `prefers-reduced-motion` or without JavaScript — the
 * accordion is fully usable either way.
 */
import { useEffect } from 'react'

const DURATION = 240
const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'

export function AccordionMotion({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId)
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const single = root.dataset.accordion === 'single'
    const supportsName = 'name' in document.createElement('details')
    const items = Array.from(root.querySelectorAll<HTMLDetailsElement>(':scope > details'))

    const slide = (panel: HTMLElement, from: number, to: number): Animation | undefined => {
      for (const running of panel.getAnimations()) running.cancel()
      return panel.animate(
        [
          { height: `${from}px`, opacity: from === 0 ? 0 : 1 },
          { height: `${to}px`, opacity: to === 0 ? 0 : 1 },
        ],
        { duration: DURATION, easing: EASING },
      )
    }

    const onClick = (event: MouseEvent) => {
      const summary = event.currentTarget as HTMLElement
      const details = summary.parentElement as HTMLDetailsElement | null
      const panel = details?.querySelector<HTMLElement>('[data-accordion-panel]')
      if (!details || !panel) return

      if (details.open) {
        event.preventDefault()
        const animation = slide(panel, panel.scrollHeight, 0)
        const finish = () => {
          details.open = false
        }
        if (animation) animation.addEventListener('finish', finish, { once: true })
        else finish()
        return
      }

      if (single && !supportsName) {
        for (const other of items) {
          if (other === details || !other.open) continue
          const otherPanel = other.querySelector<HTMLElement>('[data-accordion-panel]')
          if (otherPanel) slide(otherPanel, otherPanel.scrollHeight, 0)
          other.open = false
        }
      }
      // The browser opens it on this click; animate from the next frame.
      requestAnimationFrame(() => slide(panel, 0, panel.scrollHeight))
    }

    const summaries = items
      .map((item) => item.querySelector<HTMLElement>(':scope > summary'))
      .filter((summary): summary is HTMLElement => summary !== null)
    for (const summary of summaries) summary.addEventListener('click', onClick)

    return () => {
      for (const summary of summaries) summary.removeEventListener('click', onClick)
    }
  }, [rootId])

  return null
}
