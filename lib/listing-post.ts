import type { Category, Listing, ListingType } from './listing'

export type ListingTier = 'FREE_FIRST' | 'STANDARD' | 'FEATURED'

export interface ListingDraft {
  title: string
  description: string
  requirements?: string
  responsibilities?: string
  type: ListingType
  town: string
  category: Category
  pay: string
  employerWhatsApp: string
  tier?: ListingTier
}

export interface Employer {
  id: string
  name: string
  publishedListingCount: number
}

export function createListingPost(deps?: { now?: () => Date; id?: () => string }): {
  publish(input: { employer: Employer; draft: ListingDraft }): Promise<Listing>
} {
  const now = deps?.now ?? (() => new Date())
  const nextId = deps?.id ?? (() => crypto.randomUUID())

  return {
    async publish({ employer, draft }): Promise<Listing> {
      if (!draft.title?.trim()) throw new Error('title is required')
      if (!draft.town?.trim()) throw new Error('town is required')
      if (!draft.category) throw new Error('category is required')
      if (!draft.employerWhatsApp?.trim()) throw new Error('employerWhatsApp is required')

      const isFirst = employer.publishedListingCount === 0
      if (!isFirst && draft.tier === 'FREE_FIRST') {
        throw new Error('Free First Post is only available for the first Listing')
      }

      const featured = !isFirst && draft.tier === 'FEATURED'
      const days = isFirst ? 7 : 30
      const posted = now()
      const expires = new Date(posted.getTime() + days * 24 * 60 * 60 * 1000)

      return {
        id: nextId(),
        title: draft.title,
        description: draft.description,
        requirements: draft.requirements ?? '',
        responsibilities: draft.responsibilities ?? '',
        type: draft.type,
        town: draft.town,
        category: draft.category,
        pay: draft.pay,
        featured,
        urgent: false,
        employerId: employer.id,
        employerName: employer.name,
        employerWhatsApp: draft.employerWhatsApp,
        postedAt: posted.toISOString(),
        expiresAt: expires.toISOString(),
        status: 'ACTIVE',
      }
    },
  }
}
