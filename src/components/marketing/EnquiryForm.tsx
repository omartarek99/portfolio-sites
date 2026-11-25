'use client'

import { useState, type FormEvent } from 'react'
import { whatsappUrl } from '@/lib/links'

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
  submit: string
  note: string
  /** First line of the WhatsApp message. */
  intro: string
}

const SERVICES = ['websites', 'videos', 'presentations'] as const

const field = 'w-full rounded-lg border border-fg/15 bg-fg/[0.03] px-3 py-2.5 text-sm text-fg outline-none transition focus:border-fg/40'
const label = 'mb-2 block text-sm font-medium'

/**
 * "Start a project" brief: the visitor picks a service, budget and deadline,
 * and sending opens WhatsApp with all of it pre-filled. No server involved.
 */
export function EnquiryForm({ phone, labels, buttonClass }: { phone: string; labels: EnquiryLabels; buttonClass: string }) {
  const [service, setService] = useState<(typeof SERVICES)[number]>('websites')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
    window.open(whatsappUrl(phone, lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={submit} className="grid gap-6 rounded-3xl border border-fg/10 bg-fg/[0.03] p-6 md:p-8">
      <fieldset>
        <legend className={label}>{labels.service}</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {SERVICES.map((key) => (
            <label
              key={key}
              className="has-checked:border-vz-blue has-checked:bg-vz-blue cursor-pointer rounded-lg border border-fg/15 px-3 py-2.5 text-center text-sm font-medium transition has-checked:text-white has-focus-visible:ring-2 has-focus-visible:ring-vz-accent hover:border-fg/35"
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
          {labels.name} <span className="font-normal text-fg/50">({labels.optional})</span>
        </label>
        <input id="enquiry-name" name="name" autoComplete="name" maxLength={80} className={field} />
      </div>

      <div>
        <label htmlFor="enquiry-details" className={label}>
          {labels.details} <span className="font-normal text-fg/50">({labels.optional})</span>
        </label>
        <textarea
          id="enquiry-details"
          name="details"
          rows={4}
          maxLength={600}
          placeholder={labels.detailsPlaceholder}
          className={`${field} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className={buttonClass}>
          {labels.submit}
        </button>
        <p className="text-sm text-fg/50">{labels.note}</p>
      </div>
    </form>
  )
}
