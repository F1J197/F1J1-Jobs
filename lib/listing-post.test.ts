import { describe, expect, it } from 'vitest'
import { createListingPost, type ListingDraft, type Employer } from './listing-post'

const now = () => new Date('2026-08-19T00:00:00.000Z')
const id = () => 'listing-1'

const draft: ListingDraft = {
  title: 'Storehand',
  description: 'Receive and stack hardware deliveries',
  requirements: 'Physical fitness',
  responsibilities: 'Unload containers',
  type: 'FULL_TIME',
  town: 'Lautoka',
  category: 'Retail',
  pay: 'FJD $14,000',
  employerWhatsApp: '+679 3380000',
}

function employer(publishedListingCount: number): Employer {
  return {
    id: 'emp-1',
    name: 'Vinod Patel Group',
    publishedListingCount,
  }
}

describe('ListingPost', () => {
  const post = createListingPost({ now, id })

  it('publishes a first Listing as Free First Post: not featured, ACTIVE, expires in 7 days', async () => {
    const listing = await post.publish({
      employer: employer(0),
      draft: { ...draft, tier: 'FEATURED' },
    })

    expect(listing).toMatchObject({
      id: 'listing-1',
      title: 'Storehand',
      town: 'Lautoka',
      category: 'Retail',
      featured: false,
      status: 'ACTIVE',
      employerId: 'emp-1',
      employerName: 'Vinod Patel Group',
      employerWhatsApp: '+679 3380000',
    })
    expect(listing.expiresAt.startsWith('2026-08-26')).toBe(true)
    expect(listing.postedAt.startsWith('2026-08-19')).toBe(true)
  })

  it('publishes a later STANDARD Listing for 30 days, not featured', async () => {
    const listing = await post.publish({
      employer: employer(1),
      draft: { ...draft, tier: 'STANDARD' },
    })

    expect(listing.featured).toBe(false)
    expect(listing.status).toBe('ACTIVE')
    expect(listing.expiresAt.startsWith('2026-09-18')).toBe(true)
  })

  it('publishes a later FEATURED Listing for 30 days, featured true', async () => {
    const listing = await post.publish({
      employer: employer(2),
      draft: { ...draft, tier: 'FEATURED' },
    })

    expect(listing.featured).toBe(true)
    expect(listing.expiresAt.startsWith('2026-09-18')).toBe(true)
  })

  it('throws when FREE_FIRST is attempted after the first Listing', async () => {
    await expect(
      post.publish({
        employer: employer(1),
        draft: { ...draft, tier: 'FREE_FIRST' },
      }),
    ).rejects.toThrow()
  })

  it('requires title, town, category, and employerWhatsApp', async () => {
    await expect(
      post.publish({
        employer: employer(0),
        draft: { ...draft, title: '' },
      }),
    ).rejects.toThrow()
    await expect(
      post.publish({
        employer: employer(0),
        draft: { ...draft, town: '' },
      }),
    ).rejects.toThrow()
    await expect(
      post.publish({
        employer: employer(0),
        draft: { ...draft, category: '' as ListingDraft['category'] },
      }),
    ).rejects.toThrow()
    await expect(
      post.publish({
        employer: employer(0),
        draft: { ...draft, employerWhatsApp: '' },
      }),
    ).rejects.toThrow()
  })
})
