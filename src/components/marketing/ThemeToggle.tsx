'use client'

import { useSyncExternalStore } from 'react'
import { Switch } from './Switch'

const KEY = 'vz-theme'
const query = () => window.matchMedia('(prefers-color-scheme: dark)')

/** Runs inline before first paint so a saved choice never flashes the wrong theme. */
export const THEME_SCRIPT = `try{var t=localStorage.getItem('${KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

function current(): 'light' | 'dark' {
  const saved = document.documentElement.dataset.theme
  if (saved === 'light' || saved === 'dark') return saved
  return query().matches ? 'dark' : 'light'
}

function subscribe(onChange: () => void): () => void {
  const media = query()
  media.addEventListener('change', onChange)
  window.addEventListener('vz-theme', onChange)
  return () => {
    media.removeEventListener('change', onChange)
    window.removeEventListener('vz-theme', onChange)
  }
}

/** Light/dark switch (Anees's sky switch): follows the device until the visitor picks one, then remembers it. */
export function ThemeToggle({ labels }: { labels: { light: string; dark: string } }) {
  // null on the server, so the button renders the same until hydration.
  const theme = useSyncExternalStore(subscribe, current, () => null)
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next
        try {
          localStorage.setItem(KEY, next)
        } catch {
          // Private mode: the choice lasts for this page only.
        }
        window.dispatchEvent(new Event('vz-theme'))
      }}
      aria-label={next === 'dark' ? labels.dark : labels.light}
      title={next === 'dark' ? labels.dark : labels.light}
      className="switch-btn"
    >
      <Switch kind="sky" on={theme === 'light'} />
    </button>
  )
}
