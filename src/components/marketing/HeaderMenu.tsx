'use client'

import { Ellipsis } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'

export function HeaderMenu({ label, children }: { label: string; children: ReactNode }) {
  const menuRef = useRef<HTMLDetailsElement>(null)
  const triggerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function dismissOutside(event: PointerEvent) {
      const menu = menuRef.current
      if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) {
        menu.open = false
      }
    }

    document.addEventListener('pointerdown', dismissOutside)
    return () => document.removeEventListener('pointerdown', dismissOutside)
  }, [])

  return (
    <details
      ref={menuRef}
      className="group/menu relative text-sm"
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest('a[href]')) {
          event.currentTarget.open = false
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && event.currentTarget.open) {
          event.preventDefault()
          event.currentTarget.open = false
          triggerRef.current?.focus()
        }
      }}
    >
      <summary
        ref={triggerRef}
        aria-label={label}
        className="grid size-10 cursor-pointer list-none place-items-center rounded-lg border border-fg/15 text-fg transition hover:bg-fg/5 group-open/menu:bg-fg/5 [&::-webkit-details-marker]:hidden"
      >
        <Ellipsis className="size-5" aria-hidden="true" />
      </summary>
      <div className="bg-vz-bg absolute end-0 top-full mt-2 max-h-[calc(100dvh-5rem)] w-64 max-w-[calc(100vw-2.5rem)] overflow-y-auto rounded-xl border border-fg/10 p-2 shadow-2xl">
        {children}
      </div>
    </details>
  )
}
