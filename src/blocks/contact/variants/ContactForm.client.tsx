'use client'

/**
 * Renders a FormDefinition (SPEC §10.1) and submits it to the public forms
 * endpoint. Every field type of `src/schemas/forms.ts` is supported.
 *
 * Validation runs on the client with `submissionSchemaFor` (the same schema
 * the server uses). Spam protection: a honeypot input and the time since the
 * form was rendered. In editor/preview mode it never submits.
 */
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { useForm, type FieldValues, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { pick, plainText } from '@/schemas/fields'
import { MAX_FILE_UPLOAD_BYTES, submissionSchemaFor, type FormDefinition, type FormField } from '@/schemas/forms'
import { safeUrl } from '@/lib/links'
import { cn } from '@/lib/utils'
import { hasText, st, T } from '../../_shared'
import type { BlockContext } from '../../types'
import { t } from '../strings'
import { HONEYPOT_NAME, postPublic } from '../submit'

/** Gulf first, then common origins. The value is what is prefixed to the number. */
const COUNTRY_CODES = ['+974', '+971', '+966', '+965', '+973', '+968', '+20', '+962', '+961', '+212', '+90', '+91', '+92', '+63', '+44', '+1']
const DEFAULT_COUNTRY_CODE = '+974'

type Status =
  | { kind: 'idle' }
  | { kind: 'busy' }
  | { kind: 'done' }
  | { kind: 'message'; text: string; error: boolean }

const ccName = (id: string) => `${id}__cc`

function errorText(field: FormField, value: unknown, locale: BlockContext['locale']): string {
  if (field.type === 'checkbox') return t(locale, 'mustCheck')
  if (value === '' || value == null) return t(locale, 'requiredField')
  switch (field.type) {
    case 'email':
      return t(locale, 'invalidEmail')
    case 'phone':
      return t(locale, 'invalidPhone')
    case 'date':
      return t(locale, 'invalidDate')
    case 'select':
    case 'radio':
    case 'budget':
      return t(locale, 'invalidChoice')
    case 'file':
      return t(locale, 'uploadFailed')
    default:
      return t(locale, 'invalidValue')
  }
}

/**
 * File fields upload first; the submission then carries the returned reference.
 * ponytail: the upload endpoint arrives with the forms milestone — until then
 * this fails and the field shows "could not be uploaded".
 */
async function uploadFile(url: string, file: File): Promise<{ url: string; name: string; bytes: number } | null> {
  try {
    const body = new FormData()
    body.append('file', file)
    const response = await fetch(url, { method: 'POST', body })
    if (!response.ok) return null
    const data = (await response.json()) as { url?: unknown }
    return typeof data.url === 'string' ? { url: data.url, name: file.name, bytes: file.size } : null
  } catch {
    return null
  }
}

export function ContactForm({ ctx, form, className }: { ctx: BlockContext; form: FormDefinition; className?: string }) {
  const { locale } = ctx
  const live = ctx.mode === 'live'
  const fields = useMemo(() => form.fields.filter((f) => f.type !== 'file' || ctx.site.flags.pro), [form.fields, ctx.site.flags.pro])
  const schema = useMemo(() => submissionSchemaFor({ fields }), [fields])
  const endpoint = `${ctx.site.apiBase}/api/public/forms/${ctx.site.siteId}/${ctx.sectionId}`

  const defaultValues = useMemo(() => {
    const values: FieldValues = {}
    for (const f of fields) {
      values[f.id] = f.type === 'checkbox' ? false : ''
      if (f.type === 'phone') values[ccName(f.id)] = DEFAULT_COUNTRY_CODE
    }
    return values
  }, [fields])

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
    // raw: keep the country-code inputs, which are not part of the schema.
    resolver: zodResolver(schema, undefined, { raw: true }) as unknown as Resolver<FieldValues>,
  })

  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [uploading, setUploading] = useState(0)
  const startedAt = useRef(0)
  const honeypot = useRef<HTMLInputElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)
  const base = `cf-${ctx.sectionId}`

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])
  useEffect(() => {
    if (status.kind === 'done') doneRef.current?.focus()
  }, [status.kind])

  const say = (text: string, error = true) => setStatus({ kind: 'message', text, error })

  const onValid = async (raw: FieldValues) => {
    if (!live) return say(t(locale, 'previewOnly'), false)

    const values: Record<string, unknown> = {}
    for (const f of fields) {
      let value = raw[f.id]
      if (f.type === 'phone' && typeof value === 'string' && value.trim() && !value.trim().startsWith('+')) {
        value = `${raw[ccName(f.id)] ?? DEFAULT_COUNTRY_CODE} ${value.trim()}`
      }
      values[f.id] = value
    }

    const hp = honeypot.current?.value ?? ''
    if (hp) return setStatus({ kind: 'done' }) // A bot: pretend it worked.

    setStatus({ kind: 'busy' })
    const result = await postPublic(endpoint, { values, hp, elapsedMs: Date.now() - startedAt.current, locale })

    switch (result.kind) {
      case 'ok': {
        const redirect = form.settings.afterSubmit.type === 'redirect' ? safeUrl(form.settings.afterSubmit.redirectUrl) : undefined
        if (redirect) window.location.assign(redirect)
        setStatus({ kind: 'done' })
        return
      }
      case 'invalid': {
        let matched = false
        for (const f of fields) {
          if (result.errors[f.id] === undefined) continue
          matched = true
          setError(f.id, { type: 'server', message: errorText(f, getValues(f.id), locale) }, { shouldFocus: !matched })
        }
        return say(matched ? t(locale, 'fixErrors') : t(locale, 'sendFailed'))
      }
      case 'rate-limited':
        return say(t(locale, 'rateLimited'))
      case 'network':
        return say(t(locale, 'networkFailed'))
      default:
        return say(t(locale, 'sendFailed'))
    }
  }

  const onFile = (field: FormField) => async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return setValue(field.id, '', { shouldValidate: true })
    if (file.size > MAX_FILE_UPLOAD_BYTES) {
      event.target.value = ''
      setValue(field.id, '')
      return setError(field.id, { type: 'size', message: t(locale, 'fileTooLarge') })
    }
    if (!live) return
    setUploading((n) => n + 1)
    const ref = await uploadFile(`${endpoint}/files`, file)
    setUploading((n) => n - 1)
    if (ref) setValue(field.id, ref, { shouldValidate: true })
    else setError(field.id, { type: 'upload', message: t(locale, 'uploadFailed') })
  }

  if (status.kind === 'done') {
    const message = form.settings.afterSubmit.message
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className={cn('site-card flex flex-col items-start gap-3 p-6 outline-none md:p-8', className)}>
        {hasText(ctx, message) ? (
          <T ctx={ctx} path="form.settings.afterSubmit.message" value={message} as="p" className="site-h4" multiline />
        ) : (
          <p className="site-h4">{t(locale, 'thanks')}</p>
        )}
      </div>
    )
  }

  const busy = status.kind === 'busy' || uploading > 0

  return (
    <form
      noValidate
      aria-label={plainText(pick(form.name, locale)) || t(locale, 'contactForm')}
      onSubmit={(event) => void handleSubmit(onValid, () => setStatus({ kind: 'idle' }))(event)}
      className={cn('grid gap-5 sm:grid-cols-2', className)}
    >
      {fields.map((field, i) => {
        const id = `${base}-${field.id}`
        const errorId = `${id}-error`
        const helpId = `${id}-help`
        const error = errors[field.id]
        // Our own errors carry a localized message; schema errors are mapped by field type.
        const own = error && ['server', 'size', 'upload'].includes(String(error.type))
        const message = !error ? '' : own ? String(error.message) : errorText(field, getValues(field.id), locale)
        const showHelp = hasText(ctx, field.help)
        const describedBy = [showHelp ? helpId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined
        const invalid = error ? true : undefined
        const path = `form.fields.${i}`
        const placeholder = plainText(pick(field.placeholder, locale)) || undefined
        const label = (
          <>
            <T ctx={ctx} path={`${path}.label`} value={field.label} placeholder="Label" />
            {field.required ? (
              <span aria-hidden="true" className="text-site-primary ms-0.5">
                *
              </span>
            ) : null}
          </>
        )
        const common = {
          id,
          'aria-invalid': invalid,
          'aria-describedby': describedBy,
          'aria-required': field.required || undefined,
        }
        const options = field.options ?? []

        let control
        switch (field.type) {
          case 'textarea':
            control = <textarea {...common} {...register(field.id)} placeholder={placeholder} rows={5} className="site-input" />
            break
          case 'select':
            control = (
              <select {...common} {...register(field.id)} className="site-input">
                <option value="">{t(locale, 'choose')}</option>
                {options.map((o) => (
                  // <option> only holds plain text, so the label cannot be an inline slot.
                  <option key={o.value} value={o.value}>
                    {plainText(pick(o.label, locale))}
                  </option>
                ))}
              </select>
            )
            break
          case 'phone':
            control = (
              <div dir="ltr" className="flex gap-2">
                <select aria-label={t(locale, 'countryCode')} {...register(ccName(field.id))} className="site-input w-auto shrink-0">
                  {COUNTRY_CODES.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <input {...common} {...register(field.id)} type="tel" inputMode="tel" autoComplete="tel-national" placeholder={placeholder} className="site-input min-w-0 flex-1" />
              </div>
            )
            break
          case 'date':
            control = <input {...common} {...register(field.id)} type="date" className="site-input" />
            break
          case 'file':
            control = <input {...common} type="file" onChange={onFile(field)} className="site-input file:me-3 file:border-0 file:bg-transparent file:font-semibold" />
            break
          case 'email':
            control = <input {...common} {...register(field.id)} type="email" inputMode="email" autoComplete="email" placeholder={placeholder} className="site-input" />
            break
          case 'checkbox':
          case 'radio':
          case 'budget':
            control = null
            break
          default:
            control = (
              <input
                {...common}
                {...register(field.id)}
                type="text"
                autoComplete={field.id === 'name' ? 'name' : undefined}
                placeholder={placeholder}
                className="site-input"
              />
            )
        }

        const help = showHelp ? <T ctx={ctx} path={`${path}.help`} value={field.help} as="p" id={helpId} className="site-small site-muted mt-1.5" /> : null
        const errorLine = error ? (
          <p id={errorId} className="site-field-error">
            {message}
          </p>
        ) : null
        const span = field.half ? undefined : 'sm:col-span-2'

        if (field.type === 'checkbox') {
          return (
            <div key={field.id} className={span}>
              <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
                <input {...common} {...register(field.id)} type="checkbox" className="accent-site-primary mt-1 size-4 shrink-0" />
                <span>{label}</span>
              </label>
              {help}
              {errorLine}
            </div>
          )
        }

        if (field.type === 'radio' || field.type === 'budget') {
          const pills = field.type === 'budget'
          return (
            <fieldset key={field.id} className={cn('min-w-0', span)} aria-describedby={describedBy} aria-required={field.required || undefined}>
              <legend className="site-label">{label}</legend>
              <div className={pills ? 'flex flex-wrap gap-2' : 'flex flex-col gap-2'}>
                {options.map((o, oi) => (
                  <label
                    key={o.value}
                    className={
                      pills
                        ? 'site-tag has-[:focus-visible]:ring-site-primary has-[:checked]:border-site-primary has-[:checked]:bg-site-primary has-[:checked]:text-site-on-primary cursor-pointer px-4 py-2 has-[:focus-visible]:ring-2'
                        : 'flex cursor-pointer items-center gap-3'
                    }
                  >
                    <input
                      {...register(field.id)}
                      type="radio"
                      value={o.value}
                      className={pills ? 'sr-only' : 'accent-site-primary size-4 shrink-0'}
                    />
                    <T ctx={ctx} path={`${path}.options.${oi}.label`} value={o.label} />
                  </label>
                ))}
              </div>
              {help}
              {errorLine}
            </fieldset>
          )
        }

        return (
          <div key={field.id} className={cn('min-w-0', span)}>
            <label htmlFor={id} className="site-label">
              {label}
            </label>
            {control}
            {help}
            {errorLine}
          </div>
        )
      })}

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden="true" className="sr-only">
        <label>
          Website
          <input ref={honeypot} name={HONEYPOT_NAME} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className="site-btn" data-variant="primary" disabled={busy} aria-disabled={busy || undefined} aria-busy={busy || undefined}>
          {busy ? <span>{st(locale, 'sending')}</span> : <T ctx={ctx} path="form.settings.submitLabel" value={form.settings.submitLabel} placeholder="Send" />}
          {!busy && !hasText(ctx, form.settings.submitLabel) ? <span>{st(locale, 'send')}</span> : null}
        </button>
        <p role="status" aria-live="polite" className={cn('site-small', status.kind === 'message' && status.error ? 'site-field-error mt-0' : 'site-muted')}>
          {status.kind === 'message' ? status.text : ''}
        </p>
      </div>
    </form>
  )
}
