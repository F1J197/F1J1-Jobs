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
  featured: boolean
  urgent: boolean
  employerId: string
  employerName: string
  employerWhatsApp: string
  postedAt: string
  expiresAt: string
  status: 'ACTIVE' | 'CLOSED'
}
