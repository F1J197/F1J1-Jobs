import type { Listing } from './listing'

export function open(input: { listing: Listing; seekerName?: string }): string {
  const digits = input.listing.employerWhatsApp.replace(/\D/g, '')
  if (!digits) {
    throw new Error('employerWhatsApp has no digits')
  }

  const text = input.seekerName
    ? `Bula, I'm ${input.seekerName}. I'm interested in ${input.listing.title} at ${input.listing.employerName} on VitiWork.`
    : `Bula, I'm interested in ${input.listing.title} at ${input.listing.employerName} on VitiWork.`

  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}
