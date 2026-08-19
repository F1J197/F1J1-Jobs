import { describe, expect, it } from 'vitest'
import { createEventLog } from './event-log'

describe('EventLog', () => {
  it('counts funnel events and keeps zero-result query strings without phones', () => {
    const log = createEventLog({
      now: () => new Date('2026-08-19T10:00:00.000Z'),
      id: () => 'evt-1',
    })
    log.track({ name: 'listing_search', query: 'Taveuni chef', town: 'Taveuni', resultCount: 0 })
    log.track({ name: 'listing_view', listingId: 'j1' })
    log.track({ name: 'express_interest', listingId: 'j1' })
    const summary = log.summarize()
    expect(summary).toEqual({
      searches: 1,
      views: 1,
      interests: 1,
      publishes: 0,
      reports: 0,
      shares: 0,
      zeroResultQueries: ['Taveuni chef'],
    })
    expect(JSON.stringify(log.all())).not.toContain('679')
  })
})
