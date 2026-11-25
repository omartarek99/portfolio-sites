import { getTranslations } from 'next-intl/server'
import { Terminal } from '@/blocks/hero/variants/Terminal.client'
import type { TerminalLine } from '@/blocks/hero/terminal'

/** Commands the terminal types on load, then the ones visitors can type (see `help`). */
const COMMANDS: { id: string; command: string; typed: boolean }[] = [
  { id: 'whoami', command: 'whoami', typed: true },
  { id: 'services', command: 'ls services', typed: true },
  { id: 'work', command: 'cat work.txt', typed: true },
  { id: 'contact', command: 'contact', typed: false },
  { id: 'hire', command: 'hire', typed: false },
]

/**
 * Home-page introduction: the Terminal demo's typing terminal (reused as is),
 * in Vizo's colours via `.vz-terminal` (globals.css).
 */
export async function IntroTerminal() {
  const t = await getTranslations('marketing')
  const lines: TerminalLine[] = COMMANDS.map((line) => ({ ...line, output: t(`terminal.output.${line.id}`) }))
  return (
    <div className="vz-terminal mx-auto max-w-3xl">
      <Terminal
        lines={lines}
        prompt="vizo ~ $"
        labels={{
          title: t('terminal.title'),
          input: t('terminal.input'),
          hint: t('terminal.hint'),
          available: t.raw('terminal.available') as string,
          notFound: t.raw('terminal.notFound') as string,
        }}
      />
    </div>
  )
}
