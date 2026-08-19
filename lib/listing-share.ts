import type { Listing } from './listing'

export function facebookShareUrl(listing: Listing, origin: string): string {
  const url = `${origin.replace(/\/$/, '')}/jobs/${listing.id}`
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
}

export function whatsappShareUrl(listing: Listing, origin: string): string {
  const url = `${origin.replace(/\/$/, '')}/jobs/${listing.id}`
  const text = `${listing.title} at ${listing.employerName} in ${listing.town} — ${url}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}
