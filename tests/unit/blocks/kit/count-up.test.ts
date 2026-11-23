import { describe, expect, it } from 'vitest'
import { parseCountUp } from '@/blocks/_shared/CountUp'

describe('parseCountUp', () => {
  it('keeps a trailing suffix', () => {
    expect(parseCountUp('40+')).toEqual({ prefix: '', value: 40, suffix: '+', decimals: 0 })
    expect(parseCountUp('3x')).toEqual({ prefix: '', value: 3, suffix: 'x', decimals: 0 })
    expect(parseCountUp('96%')).toEqual({ prefix: '', value: 96, suffix: '%', decimals: 0 })
    expect(parseCountUp('12 years')).toEqual({ prefix: '', value: 12, suffix: ' years', decimals: 0 })
  })

  it('keeps a prefix', () => {
    expect(parseCountUp('$1.5M')).toEqual({ prefix: '$', value: 1.5, suffix: 'M', decimals: 1 })
    expect(parseCountUp('~250')).toEqual({ prefix: '~', value: 250, suffix: '', decimals: 0 })
  })

  it('drops thousands separators', () => {
    expect(parseCountUp('1,200')?.value).toBe(1200)
    expect(parseCountUp('1 200 000')?.value).toBe(1200000)
    expect(parseCountUp('1,200')?.suffix).toBe('')
  })

  it('counts decimal places so the animation does not change the format', () => {
    expect(parseCountUp('4.5')).toEqual({ prefix: '', value: 4.5, suffix: '', decimals: 1 })
    expect(parseCountUp('99.95%')?.decimals).toBe(2)
    expect(parseCountUp('8')?.decimals).toBe(0)
  })

  it('trims surrounding whitespace', () => {
    expect(parseCountUp('  40+  ')).toEqual({ prefix: '', value: 40, suffix: '+', decimals: 0 })
  })

  it('returns null when there is no number to count', () => {
    expect(parseCountUp('')).toBeNull()
    expect(parseCountUp('Coming soon')).toBeNull()
    expect(parseCountUp('٤٠+')).toBeNull()
  })
})
