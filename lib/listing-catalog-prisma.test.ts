import { describe, expect, it } from 'vitest'
import { createPrismaListingCatalog, jobToListing } from './listing-catalog-prisma'

const job = {
  id: 'j1',
  title: 'Front Desk Receptionist',
  description: 'Welcome guests',
  requirements: 'English',
  responsibilities: 'Check-in',
  type: 'FULL_TIME' as const,
  location: 'Denarau Island, Nadi',
  town: 'Nadi',
  category: 'Hospitality',
  salary: 'FJD $18,000 - $22,000/year',
  featured: true,
  urgent: false,
  companyId: 'c1',
  status: 'ACTIVE',
  publishedAt: new Date('2026-01-10T00:00:00.000Z'),
  expiresAt: new Date('2099-02-07T00:00:00.000Z'),
  createdAt: new Date('2026-01-09T00:00:00.000Z'),
  whatsappPhone: '+679 6751111',
}

const company = {
  id: 'c1',
  name: 'Sofitel Fiji Resort & Spa',
  phone: '+679 6750000',
}

describe('jobToListing', () => {
  it('maps Job and Company onto a Listing', () => {
    expect(jobToListing(job, company)).toEqual({
      id: 'j1',
      title: 'Front Desk Receptionist',
      description: 'Welcome guests',
      requirements: 'English',
      responsibilities: 'Check-in',
      type: 'FULL_TIME',
      town: 'Nadi',
      category: 'Hospitality',
      pay: 'FJD $18,000 - $22,000/year',
      featured: true,
      urgent: false,
      employerId: 'c1',
      employerName: 'Sofitel Fiji Resort & Spa',
      employerWhatsApp: '+679 6751111',
      postedAt: '2026-01-10T00:00:00.000Z',
      expiresAt: '2099-02-07T00:00:00.000Z',
      status: 'ACTIVE',
    })
  })

  it('falls back to location and company phone when town and WhatsApp are missing', () => {
    const mapped = jobToListing(
      { ...job, town: null, whatsappPhone: null, salary: null, requirements: null, responsibilities: null },
      company,
    )
    expect(mapped.town).toBe('Denarau Island, Nadi')
    expect(mapped.employerWhatsApp).toBe('+679 6750000')
    expect(mapped.pay).toBe('')
    expect(mapped.requirements).toBe('')
    expect(mapped.responsibilities).toBe('')
  })
})

describe('createPrismaListingCatalog', () => {
  it('searches mapped rows without a live database', async () => {
    const prisma = {
      job: {
        findMany: async () => [{ ...job, company }],
        findUnique: async ({ where }: { where: { id: string } }) =>
          where.id === 'j1' ? { ...job, company } : null,
      },
    }

    const catalog = createPrismaListingCatalog(prisma)
    const results = await catalog.search({})
    expect(results.map((item) => item.id)).toEqual(['j1'])
    expect((await catalog.getById('j1'))?.employerName).toBe('Sofitel Fiji Resort & Spa')
    expect(await catalog.getById('missing')).toBeUndefined()
  })
})
