/**
 * Translation parity. Every namespace must exist in both languages with exactly
 * the same key structure — this is the guard for all future translation work:
 * add a key to `en/<ns>.json` and this test fails until `ar/<ns>.json` has it too.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { LOCALES, type Locale } from '@/schemas/fields'
import { NAMESPACES, type Namespace } from '@/i18n/config'

const MESSAGES_DIR = path.resolve(import.meta.dirname, '../../../src/i18n/messages')

type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

function read(locale: Locale, namespace: Namespace): Record<string, Json> {
  const file = path.join(MESSAGES_DIR, locale, `${namespace}.json`)
  return JSON.parse(readFileSync(file, 'utf8')) as Record<string, Json>
}

/** Every leaf as `a.b.c` → value. Arrays are not used in message files. */
function flatten(value: Json, prefix = ''): [string, Json][] {
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => flatten(child, prefix ? `${prefix}.${key}` : key))
  }
  return [[prefix, value]]
}

/** ICU argument names used by a message: `{name}`, `{count, plural, …}`. */
function placeholders(message: string): string[] {
  return [...message.matchAll(/\{\s*(\w+)\s*[,}]/g)].map((m) => m[1])
}

const files = new Map<string, [string, Json][]>()
for (const locale of LOCALES) {
  for (const namespace of NAMESPACES) {
    files.set(`${locale}/${namespace}`, flatten(read(locale, namespace)))
  }
}
const entries = (locale: Locale, namespace: Namespace) => files.get(`${locale}/${namespace}`)!

describe('i18n message files', () => {
  it('lists at least the namespaces the app declares', () => {
    expect(NAMESPACES.length).toBeGreaterThan(0)
    expect(new Set(NAMESPACES).size).toBe(NAMESPACES.length)
  })

  it.each(LOCALES)('%s has a file for every namespace', (locale) => {
    for (const namespace of NAMESPACES) {
      expect(() => read(locale, namespace), `${locale}/${namespace}.json`).not.toThrow()
    }
  })
})

describe.each(NAMESPACES)('namespace "%s"', (namespace) => {
  it('has exactly the same keys in en and ar', () => {
    const en = entries('en', namespace).map(([key]) => key)
    const ar = entries('ar', namespace).map(([key]) => key)
    const missingInAr = en.filter((key) => !ar.includes(key))
    const extraInAr = ar.filter((key) => !en.includes(key))
    expect({ missingInAr, extraInAr }).toEqual({ missingInAr: [], extraInAr: [] })
  })

  it('nests the same keys the same way in both languages', () => {
    // A key that is an object in one language and a string in the other would
    // pass the leaf-key check above only if both flattened the same way, so
    // comparing the flattened key order catches restructuring too.
    expect(
      entries('ar', namespace)
        .map(([key]) => key)
        .sort(),
    ).toEqual(
      entries('en', namespace)
        .map(([key]) => key)
        .sort(),
    )
  })

  it.each(LOCALES)('%s: every message is a non-empty string', (locale) => {
    const bad = entries(locale, namespace)
      .filter(([, value]) => typeof value !== 'string' || value.trim() === '')
      .map(([key, value]) => `${key} = ${JSON.stringify(value)}`)
    expect(bad).toEqual([])
  })

  it('uses the same ICU placeholders in ar as in en', () => {
    const arabic = new Map(entries('ar', namespace))
    const mismatches: string[] = []
    for (const [key, value] of entries('en', namespace)) {
      if (typeof value !== 'string') continue
      const translation = arabic.get(key)
      if (typeof translation !== 'string') continue
      for (const name of placeholders(value)) {
        if (!placeholders(translation).includes(name)) mismatches.push(`${key}: missing {${name}}`)
      }
    }
    expect(mismatches).toEqual([])
  })

  it('does not hard-code the product name (SPEC: use the {app} placeholder)', () => {
    const offenders = entries('en', namespace)
      .filter(([, value]) => typeof value === 'string' && /\bVizo\b/.test(value))
      .map(([key]) => key)
    expect(offenders).toEqual([])
  })
})
