export const CATEGORIES = [
  'Hospitality',
  'Retail',
  'Construction',
  'Agriculture',
  'Drivers',
  'Trades',
  'Professional',
  'Government',
] as const

export type Category = (typeof CATEGORIES)[number]

export type ListingType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY' | 'INTERNSHIP'

export type PayUnit = 'hour' | 'day' | 'month' | 'year'

export type ListingLanguage = 'English' | 'iTaukei' | 'Hindi' | 'Other'

export const LICENCE_TAGS = [
  'PSV',
  'LTA class 2',
  'LTA class 4',
  'Food safety',
  'First aid',
  'Electrical licence',
  'Trade certificate',
] as const

export type LicenceTag = (typeof LICENCE_TAGS)[number]

export interface Listing {
  id: string
  title: string
  description: string
  requirements: string
  responsibilities: string
  type: ListingType
  town: string
  category: Category
  pay: string
  payAmount?: number
  payUnit?: PayUnit
  liveIn?: boolean
  startDate?: string
  shiftNote?: string
  verifiedEmployer?: boolean
  language?: ListingLanguage
  licences?: string[]
  featured: boolean
  urgent: boolean
  employerId: string
  employerName: string
  employerWhatsApp: string
  postedAt: string
  expiresAt: string
  status: 'ACTIVE' | 'CLOSED'
}
