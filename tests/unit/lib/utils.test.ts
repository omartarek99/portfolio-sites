import { describe, expect, it } from 'vitest'
import { chunk, clamp, cn, formatBytes, getPath, initials, isRecord, jsonEqual, setPath } from '@/lib/utils'

describe('getPath', () => {
  const source = {
    theme: { palette: { primary: '#B9FF66' } },
    items: [{ title: { en: 'One' } }, { title: { en: 'Two' } }],
    zero: 0,
    nothing: null,
  }

  it('reads nested object and array paths', () => {
    expect(getPath(source, 'theme.palette.primary')).toBe('#B9FF66')
    expect(getPath(source, 'items.1.title.en')).toBe('Two')
    expect(getPath(source, 'items.0')).toEqual({ title: { en: 'One' } })
  })

  it('returns the source itself for an empty path', () => {
    expect(getPath(source, '')).toBe(source)
  })

  it('returns falsy stored values as they are', () => {
    expect(getPath(source, 'zero')).toBe(0)
    expect(getPath(source, 'nothing')).toBeNull()
  })

  it('returns undefined instead of throwing on a missing or non-object path', () => {
    expect(getPath(source, 'theme.missing.deep')).toBeUndefined()
    expect(getPath(source, 'items.9.title')).toBeUndefined()
    expect(getPath(source, 'zero.nope')).toBeUndefined()
    expect(getPath(source, 'nothing.nope')).toBeUndefined()
    expect(getPath(null, 'a')).toBeUndefined()
    expect(getPath(undefined, 'a')).toBeUndefined()
  })
})

describe('setPath', () => {
  it('sets a nested value', () => {
    expect(setPath({ a: { b: 1 } }, 'a.b', 2)).toEqual({ a: { b: 2 } })
  })

  it('does not mutate the source at any level', () => {
    const source = { a: { b: 1 }, keep: { x: 1 } }
    const result = setPath(source, 'a.b', 2)
    expect(source).toEqual({ a: { b: 1 }, keep: { x: 1 } })
    expect(result).not.toBe(source)
    expect(result.a).not.toBe(source.a)
    // untouched branches are shared, not re-created
    expect(result.keep).toBe(source.keep)
  })

  it('copies arrays along the path instead of mutating them', () => {
    const source = { items: [{ title: 'One' }, { title: 'Two' }] }
    const result = setPath(source, 'items.1.title', 'Changed')
    expect(result.items[1].title).toBe('Changed')
    expect(source.items[1].title).toBe('Two')
    expect(Array.isArray(result.items)).toBe(true)
    expect(result.items).not.toBe(source.items)
    expect(result.items[0]).toBe(source.items[0])
  })

  it('creates missing objects and arrays, choosing by the next path segment', () => {
    expect(setPath({}, 'a.b', 1)).toEqual({ a: { b: 1 } })
    expect(setPath({}, 'items.0.title', 'One')).toEqual({ items: [{ title: 'One' }] })
    expect(setPath({}, 'a.0.b.1', 'x')).toEqual({ a: [{ b: [undefined, 'x'] }] })
  })

  it('appends to an existing array by index', () => {
    const result = setPath({ items: ['a'] }, 'items.1', 'b')
    expect(result).toEqual({ items: ['a', 'b'] })
  })

  it('replaces the whole value for an empty path', () => {
    expect(setPath({ a: 1 }, '', { b: 2 })).toEqual({ b: 2 })
  })

  it('can set undefined and null', () => {
    expect(setPath({ a: { b: 1 } }, 'a.b', undefined)).toEqual({ a: { b: undefined } })
    expect(setPath({ a: { b: 1 } }, 'a.b', null)).toEqual({ a: { b: null } })
  })

  it('round-trips with getPath', () => {
    const result = setPath({}, 'theme.palette.primary', '#B9FF66')
    expect(getPath(result, 'theme.palette.primary')).toBe('#B9FF66')
  })
})

describe('clamp', () => {
  it('bounds a value', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(50, 0, 10)).toBe(10)
  })
})

describe('isRecord', () => {
  it('is true for plain objects only', () => {
    expect(isRecord({})).toBe(true)
    expect(isRecord({ a: 1 })).toBe(true)
    expect(isRecord([])).toBe(false)
    expect(isRecord(null)).toBe(false)
    expect(isRecord('x')).toBe(false)
    expect(isRecord(undefined)).toBe(false)
  })
})

describe('jsonEqual', () => {
  it('compares JSON-like values structurally', () => {
    expect(jsonEqual({ a: [1, 2] }, { a: [1, 2] })).toBe(true)
    expect(jsonEqual({ a: 1 }, { a: 2 })).toBe(false)
    expect(jsonEqual('x', 'x')).toBe(true)
    expect(jsonEqual(undefined, undefined)).toBe(true)
  })
})

describe('formatBytes', () => {
  it('formats sizes the storage meter shows', () => {
    expect(formatBytes(0)).toBe('0 B')
    expect(formatBytes(999)).toBe('999 B')
    expect(formatBytes(1024)).toBe('1.0 KB')
    expect(formatBytes(1536)).toBe('1.5 KB')
    expect(formatBytes(500 * 1024 * 1024)).toBe('500 MB')
    expect(formatBytes(10 * 1024 ** 3)).toBe('10 GB')
  })
})

describe('chunk', () => {
  it('splits into groups, last one shorter', () => {
    expect(chunk([1, 2, 3], 2)).toEqual([[1, 2], [3]])
    expect(chunk([], 2)).toEqual([])
    expect(chunk([1, 2], 5)).toEqual([[1, 2]])
  })
})

describe('initials', () => {
  it('takes the first letter of the first two words', () => {
    expect(initials('Layla Haddad')).toBe('LH')
    expect(initials('  layla   haddad  khoury ')).toBe('LH')
    expect(initials('Layla')).toBe('L')
    expect(initials('')).toBe('')
  })
})

describe('cn', () => {
  it('merges classes and resolves Tailwind conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-ink', false && 'hidden', undefined, 'font-bold')).toBe('text-ink font-bold')
  })
})
