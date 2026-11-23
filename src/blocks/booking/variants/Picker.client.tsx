'use client'

/**
 * Meeting type → day → time. Times come only from `fetchAvailability`
 * (../availability.ts); while the booking system is not built the time column
 * says so instead of inventing slots.
 */
import { useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { formatDate, formatNumber, Icon, st } from '../../_shared'
import type { BlockContext, PublicMeetingType } from '../../types'
import { fetchAvailability, type Availability } from '../availability'
import { t } from '../strings'
import { MeetingMeta, typeDescription, typeName } from './parts'

const pad = (n: number) => String(n).padStart(2, '0')
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`
const localToday = () => {
  const d = new Date()
  return iso(d.getFullYear(), d.getMonth(), d.getDate())
}
const subscribe = () => () => {}
/** Today on the client; null while server rendering, so markup never depends on the server clock. */
const useToday = () => useSyncExternalStore(subscribe, localToday, () => null)
const timeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone

type SlotState = Availability | { status: 'loading' } | null

export function Picker({ ctx, types, fallback }: { ctx: BlockContext; types: PublicMeetingType[]; fallback?: ReactNode }) {
  const { locale } = ctx
  const today = useToday()
  const [typeId, setTypeId] = useState(types[0]?.id ?? '')
  const [view, setView] = useState<{ y: number; m: number } | null>(null)
  const [day, setDay] = useState<string | null>(null)
  const [slots, setSlots] = useState<SlotState>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const request = useRef('')
  const base = `bk-${ctx.sectionId}`

  const load = (meetingTypeId: string, date: string) => {
    const key = `${meetingTypeId}|${date}`
    request.current = key
    setSlot(null)
    setSlots({ status: 'loading' })
    void fetchAvailability({ apiBase: ctx.site.apiBase, siteId: ctx.site.siteId, meetingTypeId, date, timeZone: timeZone() })
      .catch((): Availability => ({ status: 'error' }))
      .then((result) => {
        if (request.current === key) setSlots(result)
      })
  }

  const current = today ? { y: Number(today.slice(0, 4)), m: Number(today.slice(5, 7)) - 1 } : { y: 0, m: 0 }
  const shown = view ?? current
  const atStart = shown.y === current.y && shown.m === current.m
  const move = (delta: number) => {
    const d = new Date(shown.y, shown.m + delta, 1)
    setView({ y: d.getFullYear(), m: d.getMonth() })
  }

  return (
    <div className="@container min-w-0">
      <div className="grid gap-8 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,0.9fr)] @3xl:gap-10">
        {types.length > 0 ? (
          <fieldset className="flex min-w-0 flex-col gap-3">
            <legend className="site-label mb-3">{t(locale, 'chooseType')}</legend>
            {types.map((type) => (
              <label
                key={type.id}
                className="site-card has-[:checked]:border-site-primary has-[:focus-visible]:ring-site-primary flex cursor-pointer flex-col gap-1.5 p-4 has-[:checked]:shadow-[inset_0_0_0_1px_var(--site-primary)] has-[:focus-visible]:ring-2"
              >
                <input
                  type="radio"
                  name={`${base}-type`}
                  value={type.id}
                  checked={typeId === type.id}
                  onChange={() => {
                    setTypeId(type.id)
                    if (day) load(type.id, day)
                  }}
                  className="sr-only"
                />
                <span className="font-semibold">{typeName(ctx, type)}</span>
                {typeDescription(ctx, type) ? <span className="site-small site-muted">{typeDescription(ctx, type)}</span> : null}
                <MeetingMeta ctx={ctx} type={type} />
              </label>
            ))}
          </fieldset>
        ) : null}

        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="site-label mb-0" id={`${base}-month`} aria-live="polite">
              {today ? formatDate(locale, new Date(shown.y, shown.m, 1), { month: 'long', year: 'numeric' }) : t(locale, 'chooseDay')}
            </p>
            <div className="flex gap-1">
              <button
                type="button"
                className="site-btn px-2 py-2"
                data-variant="ghost"
                onClick={() => move(-1)}
                disabled={!today || atStart}
                aria-label={t(locale, 'prevMonth')}
              >
                <Icon name="chevron-left" className="size-5 rtl:-scale-x-100" />
              </button>
              <button type="button" className="site-btn px-2 py-2" data-variant="ghost" onClick={() => move(1)} disabled={!today} aria-label={t(locale, 'nextMonth')}>
                <Icon name="chevron-right" className="size-5 rtl:-scale-x-100" />
              </button>
            </div>
          </div>
          <div role="group" aria-labelledby={`${base}-month`} className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: 7 }, (_, i) => (
              // 1 Jan 2023 was a Sunday; Gulf weeks start on Sunday.
              <span key={`w${i}`} aria-hidden="true" className="site-small site-muted py-1">
                {formatDate(locale, new Date(2023, 0, 1 + i), { weekday: 'narrow' })}
              </span>
            ))}
            {today ? (
              <MonthDays
                ctx={ctx}
                y={shown.y}
                m={shown.m}
                today={today}
                day={day}
                onPick={(d) => {
                  setDay(d)
                  load(typeId, d)
                }}
              />
            ) : (
              <span className="col-span-7 h-64" />
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <p className="site-label mb-0">{t(locale, 'times')}</p>
          <div role="status" aria-live="polite" className="flex flex-col gap-4">
            {slots === null ? (
              <p className="site-muted">{t(locale, 'pickDayFirst')}</p>
            ) : slots.status === 'loading' ? (
              <p className="site-muted">{st(locale, 'loading')}</p>
            ) : slots.status === 'not-set-up' ? (
              <>
                <p className="site-muted">{t(locale, 'notSetUp')}</p>
                {fallback}
              </>
            ) : slots.status === 'error' ? (
              <p className="site-field-error mt-0">{t(locale, 'loadFailed')}</p>
            ) : slots.slots.length === 0 ? (
              <p className="site-muted">{t(locale, 'noTimes')}</p>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {slots.slots.map((s) => (
                    <button key={s} type="button" className="site-btn" data-variant={slot === s ? 'primary' : 'outline'} aria-pressed={slot === s} onClick={() => setSlot(s)}>
                      <span dir="ltr">{formatDate(locale, s, { hour: 'numeric', minute: '2-digit' })}</span>
                    </button>
                  ))}
                </div>
                <p className="site-small site-muted">{t(locale, 'yourTimezone', { zone: timeZone() })}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function MonthDays({
  ctx,
  y,
  m,
  today,
  day,
  onPick,
}: {
  ctx: BlockContext
  y: number
  m: number
  today: string
  day: string | null
  onPick: (d: string) => void
}) {
  const offset = new Date(y, m, 1).getDay()
  const count = new Date(y, m + 1, 0).getDate()
  return (
    <>
      {Array.from({ length: offset }, (_, i) => (
        <span key={`e${i}`} aria-hidden="true" />
      ))}
      {Array.from({ length: count }, (_, i) => {
        const d = iso(y, m, i + 1)
        const past = d < today
        const selected = d === day
        return (
          <button
            key={d}
            type="button"
            disabled={past}
            aria-pressed={selected}
            aria-current={d === today ? 'date' : undefined}
            aria-label={formatDate(ctx.locale, new Date(y, m, i + 1), { weekday: 'long', day: 'numeric', month: 'long' })}
            onClick={() => onPick(d)}
            className={cn(
              'focus-visible:ring-site-primary mx-auto inline-flex aspect-square w-full max-w-11 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
              past ? 'site-muted cursor-not-allowed opacity-50' : 'hover:bg-site-primary/12',
              selected && 'bg-site-primary text-site-on-primary hover:bg-site-primary',
              d === today && !selected && 'ring-site-border ring-1',
            )}
          >
            {formatNumber(ctx.locale, i + 1)}
          </button>
        )
      })}
    </>
  )
}
