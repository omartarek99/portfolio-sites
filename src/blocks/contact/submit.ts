/**
 * POST JSON to a public site endpoint and sort the answer into the few cases a
 * visitor-facing form has to handle. Shared by the Contact form and the
 * Newsletter block. Never throws.
 */
export type PostResult =
  | { kind: 'ok'; data: unknown }
  /** 400 / 422: `errors` maps field ids to server messages when the server sends them. */
  | { kind: 'invalid'; errors: Record<string, string> }
  | { kind: 'rate-limited' }
  | { kind: 'network' }
  /** Anything else, including 404 while the endpoint does not exist yet. */
  | { kind: 'error'; status: number }

export async function postPublic(url: string, body: unknown): Promise<PostResult> {
  let response: Response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    return { kind: 'network' }
  }
  const data: unknown = await response.json().catch(() => null)
  if (response.ok) return { kind: 'ok', data }
  if (response.status === 429) return { kind: 'rate-limited' }
  if (response.status === 400 || response.status === 422) {
    const raw = (data as { errors?: unknown } | null)?.errors
    const errors: Record<string, string> = {}
    if (raw && typeof raw === 'object') {
      for (const [key, value] of Object.entries(raw)) errors[key] = String(value)
    }
    return { kind: 'invalid', errors }
  }
  return { kind: 'error', status: response.status }
}

/** Spam-protection fields sent with every public form (SPEC §10.1). */
export interface SpamGuard {
  /** Honeypot: always empty for people. */
  hp: string
  /** ms since the form was first rendered on the client, for the time-to-submit check. */
  elapsedMs: number
}

/** Name of the honeypot input. Looks like a real field to bots. */
export const HONEYPOT_NAME = 'website_url'
