import { describe, expect, it } from 'vitest'
import type { Listing } from './listing'
import { open } from './express-interest'

const listing: Listing = {
  id: 'j1',
  title: 'Front Desk Receptionist',
  description: 'Welcome guests',
  requirements: '',
  responsibilities: '',
  type: 'FULL_TIME',
  town: 'Nadi',
  category: 'Hospitality',
  pay: 'FJD $18,000 - $22,000/year',
  featured: true,
  urgent: false,
  employerId: 'c1',
  employerName: 'Sofitel Fiji Resort & Spa',
  employerWhatsApp: '+679 987 6543',
  postedAt: '2026-01-01',
  expiresAt: '2026-01-28',
  status: 'ACTIVE',
}

describe('Express Interest', () => {
  it('builds a wa.me link with digits-only phone and default VitiWork text', () => {
    const text = encodeURIComponent(
      "Bula, I'm interested in Front Desk Receptionist at Sofitel Fiji Resort & Spa on VitiWork.",
    )
    expect(open({ listing })).toBe(`https://wa.me/6799876543?text=${text}`)
  })

  it('includes the seeker name in the WhatsApp text when provided', () => {
    const text = encodeURIComponent(
      "Bula, I'm Mereoni. I'm interested in Front Desk Receptionist at Sofitel Fiji Resort & Spa on VitiWork.",
    )
    expect(open({ listing, seekerName: 'Mereoni' })).toBe(
      `https://wa.me/6799876543?text=${text}`,
    )
  })

  it('throws when employerWhatsApp has no digits', () => {
    expect(() =>
      open({ listing: { ...listing, employerWhatsApp: 'WhatsApp only' } }),
    ).toThrow()
  })
})
