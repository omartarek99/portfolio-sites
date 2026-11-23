import type { Locale } from '@/schemas/fields'
import { formatNumber } from '../_shared'

/** ISO 4217 code, e.g. "QAR". Keeps Intl.NumberFormat from throwing on bad input. */
export const CURRENCY_RE = /^[A-Z]{3}$/

/** "$900", "QAR 1,200", "‏1,200 ر.ق.‏" — whole numbers unless the amount has cents. */
export function formatMoney(locale: Locale, amount: number, currency: string): string {
  const money = formatNumber(locale, amount, {
    style: 'currency',
    currency,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  })
  // Arabic gives "4,000 US$"; a trailing LRM keeps the "$" with "US" instead of flipping to "$US".
  return locale === 'ar' ? `${money}‎` : money
}
