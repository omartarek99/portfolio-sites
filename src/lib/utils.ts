import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge class names, resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/** Read a nested value by dot path: `getPath(obj, 'items.2.title')`. */
export function getPath(source: unknown, path: string): unknown {
  if (path === '') return source
  let current: unknown = source
  for (const key of path.split('.')) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return current
}

/**
 * Immutably set a nested value by dot path, creating objects/arrays as needed.
 * Numeric path segments address array indexes.
 */
export function setPath<T>(source: T, path: string, value: unknown): T {
  if (path === '') return value as T
  const keys = path.split('.')
  const clone = (node: unknown, nextKey: string): Record<string, unknown> | unknown[] => {
    if (Array.isArray(node)) return [...node]
    if (node != null && typeof node === 'object') return { ...(node as Record<string, unknown>) }
    return /^\d+$/.test(nextKey) ? [] : {}
  }
  const root = clone(source, keys[0])
  let cursor = root as Record<string, unknown>
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const next = clone(cursor[key], keys[i + 1])
    cursor[key] = next
    cursor = next as Record<string, unknown>
  }
  cursor[keys[keys.length - 1]] = value
  return root as T
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Stable shallow-ish equality for JSON-like values. */
export function jsonEqual(a: unknown, b: unknown): boolean {
  return a === b || JSON.stringify(a) === JSON.stringify(b)
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB', 'TB']
  let value = bytes / 1024
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit++
  }
  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${units[unit]}`
}

/** `[1,2,3]` → `[[1,2],[3]]` */
export function chunk<T>(items: readonly T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
