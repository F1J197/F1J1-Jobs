import { describe, expect, it } from 'vitest'
import type { Listing } from './listing'
import { facebookShareUrl, whatsappShareUrl } from './listing-share'

const listing: Listing = {
  id: 'j1',
  title: 'Front Desk Receptionist',
  description: '',
  requirements: '',
  responsibilities: '',
  type: 'FULL_TIME',
  town: 'Nadi',
  category: 'Hospitality',
  pay: 'FJD 8.00/hour',
  featured: true,
  urgent: false,
  employerId: 'c1',
  employerName: 'Sofitel Fiji Resort & Spa',
  employerWhatsApp: '+679 675 1111',
  postedAt: '2026-08-17',
  expiresAt: '2026-09-16',
  status: 'ACTIVE',
}

describe('ListingShare', () => {
  it('builds a Facebook sharer URL for the Listing, not the Employer WhatsApp', () => {
    expect(facebookShareUrl(listing, 'https://vitiwork.com')).toBe(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://vitiwork.com/jobs/j1')}`,
    )
  })

  it('builds a WhatsApp share with title, Employer, Town, and URL — no Employer phone', () => {
    const url = whatsappShareUrl(listing, 'https://vitiwork.com')
    expect(url.startsWith('https://wa.me/?text=')).toBe(true)
    expect(url).toContain(encodeURIComponent('Front Desk Receptionist'))
    expect(url).toContain(encodeURIComponent('https://vitiwork.com/jobs/j1'))
    expect(url).not.toContain('6751111')
  })
})
