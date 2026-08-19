import { describe, expect, it } from 'vitest'
import type { Listing } from './listing'
import { createAlertWatchLog } from './alert-watch'

function listing(partial: Partial<Listing> & Pick<Listing, 'id' | 'title' | 'town' | 'category'>): Listing {
  return {
    description: '',
    requirements: '',
    responsibilities: '',
    type: 'FULL_TIME',
    pay: 'FJD 8.00/hour',
    featured: false,
    urgent: false,
    employerId: 'e1',
    employerName: 'Sofitel Fiji Resort & Spa',
    employerWhatsApp: '+679 675 1111',
    postedAt: '2026-08-19T12:00:00.000Z',
    expiresAt: '2099-09-16T00:00:00.000Z',
    status: 'ACTIVE',
    ...partial,
  }
}

describe('AlertWatch', () => {
  it('returns new live Listings in the watched Town cluster since the last visit', () => {
    const watches = createAlertWatchLog({
      now: () => new Date('2026-08-18T00:00:00.000Z'),
      id: () => 'watch-1',
    })
    const watch = watches.subscribe({ town: 'Denarau', category: 'Hospitality' })
    const matches = watches.matchingNew(
      watch,
      [
        listing({
          id: 'new-nadi',
          title: 'Housekeeper',
          town: 'Nadi',
          category: 'Hospitality',
          postedAt: '2026-08-19T12:00:00.000Z',
        }),
        listing({
          id: 'old-nadi',
          title: 'Chef',
          town: 'Nadi',
          category: 'Hospitality',
          postedAt: '2026-08-01T00:00:00.000Z',
        }),
        listing({
          id: 'suva-office',
          title: 'Clerk',
          town: 'Suva',
          category: 'Professional',
          postedAt: '2026-08-19T12:00:00.000Z',
        }),
      ],
      new Date('2026-08-18T00:00:00.000Z'),
    )
    expect(matches.map((item) => item.id)).toEqual(['new-nadi'])
  })

  it('requires a Town or a Category', () => {
    const watches = createAlertWatchLog()
    expect(() => watches.subscribe({})).toThrow(/Town or a Category/)
  })
})
