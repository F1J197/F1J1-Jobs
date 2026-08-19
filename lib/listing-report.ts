export const REPORT_REASONS = [
  'fee-to-apply',
  'scam',
  'under-minimum',
  'unsafe',
  'other',
] as const

export type ReportReason = (typeof REPORT_REASONS)[number]

export interface ListingReport {
  id: string
  listingId: string
  reason: ReportReason
  detail?: string
  recordedAt: string
}

export interface ListingReportLog {
  submit(input: { listingId: string; reason: ReportReason; detail?: string }): ListingReport
  listByListing(listingId: string): ListingReport[]
}

export function createListingReportLog(deps?: {
  now?: () => Date
  id?: () => string
  store?: ListingReport[]
}): ListingReportLog {
  const now = deps?.now ?? (() => new Date())
  const nextId = deps?.id ?? (() => crypto.randomUUID())
  const store = deps?.store ?? []

  return {
    submit(input) {
      if (!REPORT_REASONS.includes(input.reason)) {
        throw new Error('Unknown report reason')
      }
      const report: ListingReport = {
        id: nextId(),
        listingId: input.listingId,
        reason: input.reason,
        detail: input.detail,
        recordedAt: now().toISOString(),
      }
      store.unshift(report)
      return report
    },
    listByListing(listingId) {
      return store.filter((item) => item.listingId === listingId)
    },
  }
}
