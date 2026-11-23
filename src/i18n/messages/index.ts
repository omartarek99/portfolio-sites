import { APP_NAME } from '@/lib/config'
import type { Locale } from '@/schemas/fields'
import { NAMESPACES, type Namespace } from '../config'

export type Messages = Record<Namespace, Record<string, unknown>>

/**
 * Fill the `{app}` placeholder with the product name once, at load time.
 * Messages never hard-code the name (SPEC §1: rename via APP_NAME), and doing
 * it here means no call site can forget to pass it.
 */
function withAppName<T>(value: T): T {
  if (typeof value === 'string') return value.replaceAll('{app}', APP_NAME) as T
  if (Array.isArray(value)) return value.map(withAppName) as T
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, withAppName(child)])) as T
  }
  return value
}

/** Load and merge every namespace file for a locale. */
export async function loadMessages(locale: Locale): Promise<Messages> {
  const entries = await Promise.all(
    NAMESPACES.map(async (namespace) => {
      const mod = (await import(`./${locale}/${namespace}.json`)) as { default: Record<string, unknown> }
      return [namespace, withAppName(mod.default)] as const
    }),
  )
  return Object.fromEntries(entries) as Messages
}
