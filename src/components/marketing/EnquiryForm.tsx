'use client'

import { upload } from '@vercel/blob/client'
import { Paperclip, X } from 'lucide-react'
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { whatsappUrl } from '@/lib/links'
import { UPLOAD_ACCEPT, UPLOAD_MAX_BYTES, UPLOAD_MAX_FILES } from '@/lib/uploads'

export type EnquiryLabels = {
  service: string
  services: { websites: string; videos: string; presentations: string }
  budget: string
  budgets: string[]
  deadline: string
  deadlines: string[]
  name: string
  details: string
  detailsPlaceholder: string
  optional: string
  files: string
  filesHint: string
  addFiles: string
  remove: string
  filesLimit: string
  uploading: string
  uploadError: string
  submit: string
  /** First line of the WhatsApp message. */
  intro: string
}

const SERVICES = ['websites', 'videos', 'presentations'] as const

const field =
  'w-full rounded-lg border border-fg/15 bg-fg/[0.03] px-3 py-2.5 text-sm text-fg outline-none transition focus:border-fg/40'
const label = 'mb-2 block text-sm font-medium'

/**
 * "Start a project" brief: the visitor picks a service, budget and deadline,
 * can attach files, and sending opens WhatsApp with all of it pre-filled.
 * Files go straight from the browser to Vercel Blob (/api/upload issues the
 * token); the message carries their links.
 */
export function EnquiryForm({
  phone,
  labels,
  buttonClass,
  uploads,
}: {
  phone: string
  labels: EnquiryLabels
  buttonClass: string
  /** File uploads are offered only once Blob storage is configured. */
  uploads: boolean
}) {
  const [service, setService] = useState<(typeof SERVICES)[number]>('websites')
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const picker = useRef<HTMLInputElement>(null)

  const addFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = [...(event.target.files ?? [])]
    event.target.value = ''
    const next = [...files, ...picked]
    const fits = next.length <= UPLOAD_MAX_FILES && next.every((file) => file.size <= UPLOAD_MAX_BYTES)
    setError(fits ? '' : labels.filesLimit)
    setFiles(next.filter((file) => file.size <= UPLOAD_MAX_BYTES).slice(0, UPLOAD_MAX_FILES))
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (busy) return
    const data = new FormData(event.currentTarget)
    const value = (key: string) => String(data.get(key) ?? '').trim()
    const lines = [
      labels.intro,
      `${labels.service}: ${labels.services[service]}`,
      `${labels.budget}: ${value('budget')}`,
      `${labels.deadline}: ${value('deadline')}`,
      value('name') && `${labels.name}: ${value('name')}`,
      value('details') && `${labels.details}: ${value('details')}`,
    ].filter(Boolean)

    if (files.length === 0) {
      window.open(whatsappUrl(phone, lines.join('\n')), '_blank', 'noopener,noreferrer')
      return
    }

    // Open the tab now, while the click still counts as the visitor's, then point it at WhatsApp.
    const tab = window.open('', '_blank')
    setBusy(true)
    setError('')
    try {
      const uploaded = await Promise.all(
        files.map((file) =>
          upload(`enquiries/${file.name}`, file, { access: 'public', handleUploadUrl: '/api/upload' }),
        ),
      )
      lines.push(`${labels.files}:`, ...uploaded.map((blob, i) => `- ${files[i].name}: ${blob.url}`))
      const url = whatsappUrl(phone, lines.join('\n'))
      if (tab) {
        tab.opener = null
        tab.location.href = url
      } else {
        window.location.href = url
      }
      setFiles([])
    } catch {
      tab?.close()
      setError(labels.uploadError)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="border-fg/10 bg-fg/[0.03] grid gap-6 rounded-3xl border p-6 md:p-8">
      <fieldset>
        <legend className="mb-3 w-full text-center text-lg font-semibold">{labels.service}</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {SERVICES.map((key) => (
            <label
              key={key}
              className="has-checked:border-vz-blue has-checked:bg-vz-blue border-fg/15 has-focus-visible:ring-vz-accent hover:border-fg/35 cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition has-checked:text-white has-focus-visible:ring-2"
            >
              <input
                type="radio"
                name="service"
                value={key}
                checked={service === key}
                onChange={() => setService(key)}
                className="sr-only"
              />
              {labels.services[key]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-budget" className={label}>
            {labels.budget}
          </label>
          <select id="enquiry-budget" name="budget" className={field}>
            {labels.budgets.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="enquiry-deadline" className={label}>
            {labels.deadline}
          </label>
          <select id="enquiry-deadline" name="deadline" className={field}>
            {labels.deadlines.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="enquiry-name" className={label}>
          {labels.name} <span className="text-fg/65 font-normal">({labels.optional})</span>
        </label>
        <input id="enquiry-name" name="name" autoComplete="name" maxLength={80} className={field} />
      </div>

      <div>
        <label htmlFor="enquiry-details" className={label}>
          {labels.details} <span className="text-fg/65 font-normal">({labels.optional})</span>
        </label>
        <textarea
          id="enquiry-details"
          name="details"
          rows={4}
          maxLength={600}
          placeholder={labels.detailsPlaceholder}
          className={`${field} resize-y`}
        />
        {uploads ? (
          <div className="mt-3">
            <input
              ref={picker}
              id="enquiry-files"
              type="file"
              multiple
              accept={UPLOAD_ACCEPT}
              onChange={addFiles}
              className="sr-only"
              aria-describedby="enquiry-files-hint"
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => picker.current?.click()}
                disabled={busy || files.length >= UPLOAD_MAX_FILES}
                className="border-fg/25 hover:border-fg/50 inline-flex items-center gap-2 rounded-lg border border-dashed px-3 py-2 text-sm font-medium transition disabled:opacity-40"
              >
                <Paperclip className="size-4" aria-hidden="true" />
                {labels.addFiles}
              </button>
              <p id="enquiry-files-hint" className="text-fg/65 text-xs">
                {labels.filesHint}
              </p>
            </div>
            {files.length > 0 ? (
              <ul className="mt-3 grid gap-2">
                {files.map((file, i) => (
                  <li
                    key={`${file.name}-${i}`}
                    className="bg-fg/[0.05] flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="min-w-0 truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFiles(files.filter((_, j) => j !== i))}
                      disabled={busy}
                      aria-label={`${labels.remove}: ${file.name}`}
                      className="text-fg/60 hover:bg-fg/10 hover:text-fg shrink-0 rounded p-1"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>

      {error ? (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className={`${buttonClass} justify-self-start disabled:opacity-60`}
      >
        {busy ? labels.uploading : labels.submit}
      </button>
    </form>
  )
}
