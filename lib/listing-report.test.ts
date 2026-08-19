import { describe, expect, it } from 'vitest'
import { createListingReportLog } from './listing-report'

describe('ListingReport', () => {
  it('stores a fee-to-apply Report against a Listing', () => {
    const log = createListingReportLog({
      now: () => new Date('2026-08-19T10:00:00.000Z'),
      id: () => 'rep-1',
    })
    const report = log.submit({ listingId: 'j1', reason: 'fee-to-apply' })
    expect(report).toEqual({
      id: 'rep-1',
      listingId: 'j1',
      reason: 'fee-to-apply',
      detail: undefined,
      recordedAt: '2026-08-19T10:00:00.000Z',
    })
    expect(log.listByListing('j1')).toHaveLength(1)
  })
})
