import type { Category, Listing, ListingType } from './listing'
import { MOCK_COMPANIES, MOCK_JOBS, type Company, type Job } from './mock-data'

export interface SearchQuery {
  query?: string
  town?: string
  category?: Category
  type?: ListingType
}

export interface ListingCatalog {
  search(query: SearchQuery): Promise<Listing[]>
  getById(id: string): Promise<Listing | undefined>
}

export function toListing(job: Job, company?: Company): Listing {
  return {
    id: job.id,
    title: job.title,
    description: job.description,
    requirements: job.requirements,
    responsibilities: job.responsibilities,
    type: job.type,
    town: job.town,
    category: job.category,
    pay: job.salary,
    featured: job.featured,
    urgent: job.urgent,
    employerId: job.companyId,
    employerName: company?.name ?? '',
    employerWhatsApp: job.whatsappPhone,
    postedAt: job.postedAt,
    expiresAt: job.expiresAt,
    status: job.status,
  }
}

export function listingsFromMock(): Listing[] {
  const companies = new Map(MOCK_COMPANIES.map((company) => [company.id, company]))
  return MOCK_JOBS.map((job) => toListing(job, companies.get(job.companyId)))
}

export function isLiveListing(listing: Listing, now = new Date()): boolean {
  if (listing.status !== 'ACTIVE') return false
  const expires = Date.parse(listing.expiresAt)
  if (Number.isNaN(expires)) return true
  return expires >= now.getTime()
}

function matchesQuery(listing: Listing, query: SearchQuery): boolean {
  if (!isLiveListing(listing)) return false

  if (query.query) {
    const needle = query.query.toLowerCase()
    const haystack = [listing.title, listing.description, listing.employerName]
      .join(' ')
      .toLowerCase()
    if (!haystack.includes(needle)) return false
  }

  if (query.town && !listing.town.toLowerCase().includes(query.town.toLowerCase())) {
    return false
  }

  if (query.category && listing.category !== query.category) return false
  if (query.type && listing.type !== query.type) return false

  return true
}

export function createInMemoryListingCatalog(listings: Listing[]): ListingCatalog {
  return {
    async search(query: SearchQuery): Promise<Listing[]> {
      return listings
        .filter((item) => matchesQuery(item, query))
        .sort((a, b) => Number(b.featured) - Number(a.featured))
    },
    async getById(id: string): Promise<Listing | undefined> {
      const found = listings.find((item) => item.id === id)
      if (!found || !isLiveListing(found)) return undefined
      return found
    },
  }
}
