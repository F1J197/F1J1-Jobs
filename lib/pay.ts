import type { PayUnit } from './listing'

/** National minimum wage from 1 Apr 2025. */
export const NATIONAL_MINIMUM_HOURLY_FJD = 5

/** Fiji ordinary hours under the Employment Relations Act: 45 hours / week. */
export const ORDINARY_HOURS_PER_WEEK = 45

const HOURS_PER_MONTH = (ORDINARY_HOURS_PER_WEEK * 52) / 12

export function hourlyRate(amount: number, unit: PayUnit): number {
  switch (unit) {
    case 'hour':
      return amount
    case 'day':
      return amount / 8
    case 'month':
      return amount / HOURS_PER_MONTH
    case 'year':
      return amount / (ORDINARY_HOURS_PER_WEEK * 52)
  }
}

export function monthlyEquivalent(amount: number, unit: PayUnit): number {
  return hourlyRate(amount, unit) * HOURS_PER_MONTH
}

export function isBelowMinimum(amount: number, unit: PayUnit): boolean {
  return hourlyRate(amount, unit) < NATIONAL_MINIMUM_HOURLY_FJD
}

function fjd(amount: number): string {
  return `FJD ${amount.toLocaleString('en-FJ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatPay(amount: number, unit: PayUnit): string {
  const unitLabel = unit === 'hour' ? 'hour' : unit
  const primary = `${fjd(amount)}/${unitLabel}`
  if (unit === 'month') return primary
  return `${primary} (~${fjd(monthlyEquivalent(amount, unit))}/month)`
}
