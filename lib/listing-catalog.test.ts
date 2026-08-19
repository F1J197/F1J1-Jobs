import { describe, expect, it } from 'vitest'
import type { Listing } from './listing'
import {
  createInMemoryListingCatalog,
  listingsFromMock,
} from './listing-catalog'

function listing(partial: Partial<Listing> & Pick<Listing, 'id' | 'title'>): Listing {
  return {
    description: '',
    requirements: '',
    responsibilities: '',
    type: 'FULL_TIME',
    town: 'Suva',
    category: 'Retail',
    pay: 'FJD $15,000',
    featured: false,
    urgent: false,
    employerId: 'e1',
    employerName: 'Vinod Patel Group',
    employerWhatsApp: '+679 3385999',
    postedAt: '2026-01-01',
    expiresAt: '2099-02-01T00:00:00.000Z',
    status: 'ACTIVE',
    ...partial,
  }
}

const FIXTURES: Listing[] = [
  listing({
    id: 'feat-suva-retail',
    title: 'Shop Manager',
    description: 'Lead a busy retail floor in central Suva',
    town: 'Suva',
    category: 'Retail',
    type: 'FULL_TIME',
    featured: true,
    employerName: 'Morris Hedstrom',
  }),
  listing({
    id: 'plain-suva-retail',
    title: 'Cashier',
    description: 'Checkout support at the city store',
    town: 'Suva',
    category: 'Retail',
    type: 'PART_TIME',
    featured: false,
    employerName: 'Morris Hedstrom',
  }),
  listing({
    id: 'nadi-hospitality',
    title: 'Housekeeper',
    description: 'Resort rooms and turndown service',
    town: 'Nadi',
    category: 'Hospitality',
    type: 'FULL_TIME',
    featured: false,
    employerName: 'Sofitel Fiji Resort & Spa',
  }),
  listing({
    id: 'lautoka-construction',
    title: 'Carpenter',
    description: 'Formwork and framing on commercial sites',
    town: 'Lautoka',
    category: 'Construction',
    type: 'CONTRACT',
    featured: false,
    employerName: 'Fletcher Construction',
  }),
  listing({
    id: 'closed-suva',
    title: 'Closed Shop Manager',
    description: 'This listing is closed and must never appear',
    town: 'Suva',
    category: 'Retail',
    type: 'FULL_TIME',
    featured: true,
    employerName: 'Morris Hedstrom',
    status: 'CLOSED',
  }),
]

describe('createInMemoryListingCatalog', () => {
  const catalog = createInMemoryListingCatalog(FIXTURES)

  it('returns every ACTIVE listing and no CLOSED listing when the search is empty', async () => {
    const results = await catalog.search({})
    expect(results.map((item) => item.id)).toEqual([
      'feat-suva-retail',
      'plain-suva-retail',
      'nadi-hospitality',
      'lautoka-construction',
    ])
  })

  it('matches query against title case-insensitively', async () => {
    const results = await catalog.search({ query: 'SHOP' })
    expect(results.map((item) => item.id)).toEqual(['feat-suva-retail'])
  })

  it('matches query against description case-insensitively', async () => {
    const results = await catalog.search({ query: 'formwork' })
    expect(results.map((item) => item.id)).toEqual(['lautoka-construction'])
  })

  it('matches query against employerName case-insensitively', async () => {
    const results = await catalog.search({ query: 'sofitel' })
    expect(results.map((item) => item.id)).toEqual(['nadi-hospitality'])
  })

  it('matches town as a case-insensitive substring', async () => {
    const results = await catalog.search({ town: 'uva' })
    expect(results.map((item) => item.id)).toEqual([
      'feat-suva-retail',
      'plain-suva-retail',
    ])
  })

  it('matches category exactly', async () => {
    const results = await catalog.search({ category: 'Hospitality' })
    expect(results.map((item) => item.id)).toEqual(['nadi-hospitality'])
  })

  it('matches type exactly', async () => {
    const results = await catalog.search({ type: 'PART_TIME' })
    expect(results.map((item) => item.id)).toEqual(['plain-suva-retail'])
  })

  it('combines query, town, category, and type with AND', async () => {
    const results = await catalog.search({
      query: 'checkout',
      town: 'Suva',
      category: 'Retail',
      type: 'PART_TIME',
    })
    expect(results.map((item) => item.id)).toEqual(['plain-suva-retail'])
  })

  it('never returns CLOSED listings even when they match every filter', async () => {
    const results = await catalog.search({
      query: 'Closed Shop Manager',
      town: 'Suva',
      category: 'Retail',
      type: 'FULL_TIME',
    })
    expect(results).toEqual([])
  })

  it('places Featured listings before non-featured listings when both match', async () => {
    const results = await catalog.search({ town: 'Suva', category: 'Retail' })
    expect(results.map((item) => item.id)).toEqual([
      'feat-suva-retail',
      'plain-suva-retail',
    ])
    expect(results[0]?.featured).toBe(true)
    expect(results[1]?.featured).toBe(false)
  })

  it('returns a live listing by id and hides CLOSED or missing ids', async () => {
    const found = await catalog.getById('nadi-hospitality')
    expect(found?.title).toBe('Housekeeper')
    expect(await catalog.getById('closed-suva')).toBeUndefined()
    expect(await catalog.getById('missing')).toBeUndefined()
  })

  it('hides listings whose expiresAt is in the past', async () => {
    const catalogWithExpiry = createInMemoryListingCatalog([
      listing({
        id: 'expired-suva',
        title: 'Expired Cashier',
        expiresAt: '2020-01-01T00:00:00.000Z',
      }),
      listing({
        id: 'live-suva',
        title: 'Live Cashier',
        expiresAt: '2099-01-01T00:00:00.000Z',
      }),
    ])
    const results = await catalogWithExpiry.search({ query: 'Cashier' })
    expect(results.map((item) => item.id)).toEqual(['live-suva'])
    expect(await catalogWithExpiry.getById('expired-suva')).toBeUndefined()
  })
})

describe('listingsFromMock', () => {
  it('keeps the original eight listing ids and maps employer names from companies', () => {
    const listings = listingsFromMock()
    const byId = Object.fromEntries(listings.map((item) => [item.id, item]))

    expect(byId.j1).toMatchObject({
      title: 'Front Desk Receptionist',
      town: 'Nadi',
      category: 'Hospitality',
      employerName: 'Sofitel Fiji Resort & Spa',
    })
    expect(byId.j2).toMatchObject({
      title: 'Retail Sales Associate',
      town: 'Suva',
      category: 'Retail',
      employerName: 'Vinod Patel Group',
    })
    expect(listings.map((item) => item.id)).toEqual(
      expect.arrayContaining(['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8']),
    )
  })

  it('includes ACTIVE listings covering Construction, Agriculture, Drivers, Trades, and Government', () => {
    const listings = listingsFromMock().filter((item) => item.status === 'ACTIVE')
    const categories = new Set(listings.map((item) => item.category))

    expect(listings.length).toBeGreaterThanOrEqual(12)
    expect(categories.has('Construction')).toBe(true)
    expect(categories.has('Agriculture')).toBe(true)
    expect(categories.has('Drivers')).toBe(true)
    expect(categories.has('Trades')).toBe(true)
    expect(categories.has('Government')).toBe(true)
    expect(listings.some((item) => item.type === 'PART_TIME')).toBe(true)
    expect(listings.every((item) => item.employerWhatsApp.includes('679'))).toBe(true)
  })
})
