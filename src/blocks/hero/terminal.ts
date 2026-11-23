/**
 * What the hero terminal answers when a visitor types a command.
 * Pure, so it is tested without a browser (tests/unit/blocks/hero-terminal.test.ts).
 */
export interface TerminalLine {
  id: string
  command: string
  output: string
  /** Typed automatically on load. */
  typed: boolean
}

export interface TerminalMessages {
  /** `{list}` is replaced with the command names. */
  available: string
  /** `{command}` is replaced with what was typed. */
  notFound: string
}

const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, ' ')

/** Every command a visitor can type, `help` and `clear` included, without duplicates. */
export function commandNames(lines: TerminalLine[]): string[] {
  return [...new Set(['help', ...lines.map((line) => normalize(line.command)).filter(Boolean), 'clear'])]
}

/** `null` = nothing typed · `'clear'` = empty the screen · otherwise the text to print. */
export function answerCommand(input: string, lines: TerminalLine[], messages: TerminalMessages): string | 'clear' | null {
  const typed = normalize(input)
  if (typed === '') return null
  const own = lines.find((line) => normalize(line.command) === typed)
  if (own) return own.output
  if (typed === 'clear') return 'clear'
  if (typed === 'help') return messages.available.replace('{list}', commandNames(lines).join('  '))
  // Echo what was typed, capped: it is printed back, never interpreted.
  return messages.notFound.replace('{command}', input.trim().slice(0, 40))
}
