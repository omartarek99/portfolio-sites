'use client'

import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { answerCommand, type TerminalLine, type TerminalMessages } from '../terminal'

export interface TerminalLabels extends TerminalMessages {
  title: string
  input: string
  hint: string
}

/** Ticks a finished command waits before its answer and the next command. */
const PAUSE = 12
const TICK_MS = 55

function Prompt({ prompt, command }: { prompt: string; command: string }) {
  return (
    <p className="break-all">
      <span className="text-site-muted">{prompt} </span>
      <span className="text-site-text font-semibold">{command}</span>
    </p>
  )
}

/**
 * Terminal's signature hero: a window that types its commands and prints the
 * answers, then lets visitors type their own (`help`, `projects`, `contact`…).
 *
 * The server renders every typed command with its answer, so without
 * JavaScript, under reduced motion or with the theme's motion off it is a
 * readable static transcript. Visitor answers land in an aria-live region.
 */
export function Terminal({ lines, prompt, labels }: { lines: TerminalLine[]; prompt: string; labels: TerminalLabels }) {
  const auto = lines.filter((line) => line.typed)
  const inputId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  // Ticks typed so far; Infinity = everything shown (the server render).
  const [progress, setProgress] = useState(Number.POSITIVE_INFINITY)
  const [history, setHistory] = useState<{ key: number; command: string; output: string }[]>([])
  const [cleared, setCleared] = useState(false)
  const [value, setValue] = useState('')

  const total = auto.reduce((sum, line) => sum + line.command.length + PAUSE, 0)

  useEffect(() => {
    if (total === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (rootRef.current?.closest('[data-motion="none"], [data-static]')) return
    let tick = 0
    const id = setInterval(() => {
      setProgress(tick)
      tick += 1
      if (tick > total) clearInterval(id)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [total])

  useEffect(() => {
    const body = bodyRef.current
    if (body) body.scrollTop = body.scrollHeight
  }, [progress, history])

  const animating = progress < total

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const answer = answerCommand(value, lines, labels)
    setValue('')
    if (answer === null) return
    setProgress(Number.POSITIVE_INFINITY)
    if (answer === 'clear') {
      setCleared(true)
      setHistory([])
      return
    }
    setHistory((current) => [...current, { key: Date.now(), command: value.trim(), output: answer }])
  }

  const typed = auto.map((line, index) => {
    const begin = auto.slice(0, index).reduce((sum, previous) => sum + previous.command.length + PAUSE, 0)
    const chars = Math.max(0, Math.min(line.command.length, progress - begin))
    if (progress < begin) return null
    return (
      <div key={line.id}>
        <Prompt prompt={prompt} command={line.command.slice(0, chars)} />
        {progress >= begin + line.command.length + 2 ? (
          <p dir="auto" className="text-site-muted whitespace-pre-line">
            {line.output}
          </p>
        ) : null}
      </div>
    )
  })

  return (
    <div ref={rootRef} dir="ltr" className="site-inverted overflow-hidden rounded-[var(--site-radius-lg)] shadow-2xl">
      <div className="border-site-border flex items-center gap-2 border-b px-4 py-3">
        <span aria-hidden="true" className="bg-site-muted size-3 rounded-full opacity-60" />
        <span aria-hidden="true" className="bg-site-muted size-3 rounded-full opacity-40" />
        <span aria-hidden="true" className="bg-site-muted size-3 rounded-full opacity-25" />
        <p className="text-site-muted ms-2 truncate text-xs">{labels.title}</p>
      </div>
      <div ref={bodyRef} className="flex max-h-[26rem] min-h-64 flex-col gap-3 overflow-y-auto p-4 font-mono text-sm leading-relaxed md:p-5">
        {cleared ? null : (
          <>
            {/* While it types, assistive tech reads the finished transcript instead. */}
            <div aria-hidden={animating ? 'true' : undefined} className="flex flex-col gap-3">
              {typed}
            </div>
            {animating ? (
              <div className="sr-only">
                {auto.map((line) => (
                  <p key={line.id}>
                    {prompt} {line.command}: {line.output}
                  </p>
                ))}
              </div>
            ) : null}
          </>
        )}
        <div aria-live="polite" className="flex flex-col gap-3">
          {history.map((entry) => (
            <div key={entry.key}>
              <Prompt prompt={prompt} command={entry.command} />
              <p dir="auto" className="text-site-muted whitespace-pre-line">
                {entry.output}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="flex items-center gap-2">
          <label htmlFor={inputId} className="sr-only">
            {labels.input}
          </label>
          <span aria-hidden="true" className="text-site-muted shrink-0">
            {prompt}
          </span>
          <input
            id={inputId}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            maxLength={60}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            dir="auto"
            placeholder="help"
            className="text-site-text placeholder:text-site-muted min-w-0 flex-1 rounded-sm bg-transparent font-mono outline-none focus-visible:ring-2 focus-visible:ring-current"
          />
        </form>
        <p dir="auto" className="text-site-muted text-xs">
          {labels.hint} {['help', ...lines.filter((line) => !line.typed).map((line) => line.command)].slice(0, 4).join(' · ')}
        </p>
      </div>
    </div>
  )
}
