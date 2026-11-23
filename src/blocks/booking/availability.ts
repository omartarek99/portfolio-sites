/**
 * THE ONE PLACE BOOKING DATA COMES FROM.
 *
 * The booking system (SPEC §10.3) lands in the communication milestone. Until
 * then this reports "not set up" and the block says so honestly — it never
 * invents free slots. Fill this in, and the calendar and the modal light up.
 *
 * Isomorphic; called from client components only.
 */
export type Availability =
  /** `slots` are ISO date-times, already filtered for notice, buffers and busy times. */
  | { status: 'ready'; slots: string[] }
  | { status: 'not-set-up' }
  | { status: 'error' }

export interface AvailabilityQuery {
  apiBase: string
  siteId: string
  meetingTypeId: string
  /** Local calendar day, YYYY-MM-DD. */
  date: string
  /** IANA timezone of the visitor; slots come back in absolute time. */
  timeZone: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used once the booking API exists
export async function fetchAvailability(query: AvailabilityQuery): Promise<Availability> {
  // BOOKING MILESTONE: GET `${query.apiBase}/api/public/booking/${query.siteId}/slots?type=…&date=…&tz=…`
  return { status: 'not-set-up' }
}
