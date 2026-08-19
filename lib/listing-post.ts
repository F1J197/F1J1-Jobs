import type { Category, Listing, ListingLanguage, ListingType, PayUnit } from './listing'
import { normalizeFijiWhatsApp } from './fiji-phone'
import { formatPay, isBelowMinimum } from './pay'

export type ListingTier = 'FREE_FIRST' | 'STANDARD' | 'FEATURED'

export interface ListingDraft {
  title: string
  description: string
  requirements?: string
  responsibilities?: string
  type: ListingType
  town: string
  category: Category
  pay?: string
  payAmount?: number
  payUnit?: PayUnit
  liveIn?: boolean
  startDate: string
  shiftNote?: string
  language?: ListingLanguage
  licences?: string[]
  employerWhatsApp: string
  tier?: ListingTier
}

export interface Employer {
  id: string
  name: string
  publishedListingCount: number
  verified?: boolean
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
      if (!draft.startDate?.trim()) throw new Error('startDate is required')

      const hasStructuredPay = draft.payAmount != null && draft.payUnit
      const hasPayText = Boolean(draft.pay?.trim())
      if (!hasStructuredPay && !hasPayText) throw new Error('pay is required')
      if (hasStructuredPay && isBelowMinimum(draft.payAmount as number, draft.payUnit as PayUnit)) {
        throw new Error('Pay is below the national minimum wage of FJD 5.00/hour')
      }

      const isFirst = employer.publishedListingCount === 0
      if (!isFirst && draft.tier === 'FREE_FIRST') {
        throw new Error('Free First Post is only available for the first Listing')
      }

      const featured = !isFirst && draft.tier === 'FEATURED'
      const days = isFirst ? 7 : 30
      const posted = now()
      const expires = new Date(posted.getTime() + days * 24 * 60 * 60 * 1000)
      const pay =
        hasStructuredPay
          ? formatPay(draft.payAmount as number, draft.payUnit as PayUnit)
          : (draft.pay as string)

      return {
        id: nextId(),
        title: draft.title,
        description: draft.description,
        requirements: draft.requirements ?? '',
        responsibilities: draft.responsibilities ?? '',
        type: draft.type,
        town: draft.town,
        category: draft.category,
        pay,
        payAmount: draft.payAmount,
        payUnit: draft.payUnit,
        liveIn: draft.liveIn ?? false,
        startDate: draft.startDate,
        shiftNote: draft.shiftNote,
        verifiedEmployer: employer.verified ?? false,
        language: draft.language ?? 'English',
        licences: draft.licences ?? [],
        featured,
        urgent: false,
        employerId: employer.id,
        employerName: employer.name,
        employerWhatsApp: normalizeFijiWhatsApp(draft.employerWhatsApp),
        postedAt: posted.toISOString(),
        expiresAt: expires.toISOString(),
        status: 'ACTIVE',
      }
    },
  }
}
