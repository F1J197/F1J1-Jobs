import type { Category, ListingType } from './listing'
import { createInMemoryListingCatalog, isLiveListing, toListing, type ListingCatalog } from './listing-catalog'

export interface PrismaJobRecord {
  id: string
  title: string
  description: string
  requirements?: string | null
  responsibilities?: string | null
  type: string
  location: string
  town?: string | null
  category?: string | null
  salary?: string | null
  featured: boolean
  urgent: boolean
  companyId: string
  status: string
  publishedAt?: Date | null
  expiresAt?: Date | null
  createdAt?: Date | null
  whatsappPhone?: string | null
}

export interface PrismaCompanyRecord {
  id: string
  name: string
  phone?: string | null
}

export interface PrismaListingClient {
  job: {
    findMany(args?: unknown): Promise<Array<PrismaJobRecord & { company: PrismaCompanyRecord }>>
    findUnique(args: {
      where: { id: string }
      include?: { company: boolean }
    }): Promise<(PrismaJobRecord & { company: PrismaCompanyRecord }) | null>
  }
}

export function jobToListing(job: PrismaJobRecord, company: PrismaCompanyRecord) {
  return toListing(
    {
      id: job.id,
      title: job.title,
      description: job.description,
      requirements: job.requirements ?? '',
      responsibilities: job.responsibilities ?? '',
      type: job.type as ListingType,
      location: job.location,
      town: job.town ?? job.location,
      category: (job.category ?? 'Professional') as Category,
      whatsappPhone: job.whatsappPhone ?? company.phone ?? '',
      salary: job.salary ?? '',
      industry: '',
      experienceLevel: 'Entry',
      featured: job.featured,
      urgent: job.urgent,
      companyId: job.companyId,
      postedAt: job.publishedAt?.toISOString() ?? job.createdAt?.toISOString() ?? '',
      expiresAt: job.expiresAt?.toISOString() ?? '',
      status: job.status === 'CLOSED' ? 'CLOSED' : 'ACTIVE',
    },
    { id: company.id, name: company.name, logo: undefined, description: '', industry: '', location: '', verified: false, tier: 'FREE' },
  )
}

export function createPrismaListingCatalog(prisma: PrismaListingClient): ListingCatalog {
  return {
    async search(query) {
      const rows = await prisma.job.findMany({ include: { company: true } })
      const listings = rows.map((row) => jobToListing(row, row.company))
      return createInMemoryListingCatalog(listings).search(query)
    },
    async getById(id) {
      const row = await prisma.job.findUnique({
        where: { id },
        include: { company: true },
      })
      if (!row) return undefined
      const listing = jobToListing(row, row.company)
      if (!isLiveListing(listing)) return undefined
      return listing
    },
  }
}
