'use client'

/** Email + button. POSTs to the public subscribe endpoint (double opt-in, SPEC §10.5). */
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { z } from 'zod'
import type { Localized } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { hasText, st, T } from '../../_shared'
import { HONEYPOT_NAME, postPublic } from '../../contact/submit'
import type { BlockContext } from '../../types'
import { t } from '../strings'

type Status = { kind: 'idle' | 'busy' | 'done' } | { kind: 'message'; text: string; invalid?: boolean }

const emailSchema = z.email().max(320)

export function SubscribeForm({ ctx, buttonLabel, className }: { ctx: BlockContext; buttonLabel: Localized | undefined; className?: string }) {
  const { locale } = ctx
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const startedAt = useRef(0)
  const honeypot = useRef<HTMLInputElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const id = `nl-${ctx.sectionId}`

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = input.current?.value.trim() ?? ''
    if (!emailSchema.safeParse(email).success) {
      setStatus({ kind: 'message', text: t(locale, 'invalidEmail'), invalid: true })
      input.current?.focus()
      return
    }
    if (ctx.mode !== 'live') return setStatus({ kind: 'message', text: t(locale, 'previewOnly') })
    const hp = honeypot.current?.value ?? ''
    if (hp) return setStatus({ kind: 'done' })

    setStatus({ kind: 'busy' })
    const result = await postPublic(`${ctx.site.apiBase}/api/public/subscribe/${ctx.site.siteId}`, {
      email,
      hp,
      elapsedMs: Date.now() - startedAt.current,
      locale,
    })
    if (result.kind === 'ok') return setStatus({ kind: 'done' })
    const text =
      result.kind === 'invalid'
        ? t(locale, 'invalidEmail')
        : result.kind === 'rate-limited'
          ? t(locale, 'rateLimited')
          : result.kind === 'network'
            ? t(locale, 'networkFailed')
            : t(locale, 'failed')
    setStatus({ kind: 'message', text, invalid: result.kind === 'invalid' })
  }

  const busy = status.kind === 'busy'
  const invalid = status.kind === 'message' && status.invalid

  return (
    <div className={cn('flex w-full min-w-0 flex-col gap-2', className)}>
      {status.kind === 'done' ? null : (
        <form noValidate onSubmit={onSubmit} aria-label={t(locale, 'newsletter')} className="flex w-full flex-col gap-2 sm:flex-row">
          <label htmlFor={id} className="sr-only">
            {st(locale, 'yourEmail')}
          </label>
          <input
            ref={input}
            id={id}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder={st(locale, 'emailPlaceholder')}
            aria-invalid={invalid || undefined}
            aria-describedby={`${id}-status`}
            className="site-input min-w-0 flex-1"
          />
          <div aria-hidden="true" className="sr-only">
            <input ref={honeypot} name={HONEYPOT_NAME} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>
          <button type="submit" className="site-btn shrink-0" data-variant="primary" disabled={busy} aria-busy={busy || undefined}>
            {busy ? (
              <span>{st(locale, 'sending')}</span>
            ) : hasText(ctx, buttonLabel) ? (
              <T ctx={ctx} path="buttonLabel" value={buttonLabel} placeholder="Subscribe" />
            ) : (
              <span>{st(locale, 'subscribe')}</span>
            )}
          </button>
        </form>
      )}
      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className={cn('site-small empty:hidden', invalid ? 'site-field-error mt-0' : status.kind === 'done' ? 'site-card p-4 font-semibold' : 'site-muted')}
      >
        {status.kind === 'done' ? t(locale, 'checkInbox') : status.kind === 'message' ? status.text : ''}
      </p>
    </div>
  )
}
