import { describe, expect, it } from 'vitest'
import { answerCommand, commandNames, type TerminalLine } from '@/blocks/hero/terminal'

const lines: TerminalLine[] = [
  { id: 'a', command: 'whoami', output: 'Layla', typed: true },
  { id: 'b', command: 'contact', output: 'layla@example.com', typed: false },
]
const messages = { available: 'Commands: {list}', notFound: 'Not found: {command}' }

describe('hero terminal', () => {
  it('answers own commands, help and clear', () => {
    expect(answerCommand('  WhoAmI ', lines, messages)).toBe('Layla')
    expect(answerCommand('help', lines, messages)).toBe('Commands: help  whoami  contact  clear')
    expect(answerCommand('clear', lines, messages)).toBe('clear')
    expect(answerCommand('   ', lines, messages)).toBeNull()
  })
  it('echoes unknown input capped, never interpreting it', () => {
    expect(answerCommand('<b>' + 'x'.repeat(60), lines, messages)).toBe(`Not found: <b>${'x'.repeat(37)}`)
    expect(commandNames(lines)).toEqual(['help', 'whoami', 'contact', 'clear'])
  })
})
