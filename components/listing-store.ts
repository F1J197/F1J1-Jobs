import type { Listing } from "@/lib/listing"
import { createInMemoryListingCatalog, listingsFromMock } from "@/lib/listing-catalog"

const EXTRA_KEY = "vitiwork_extra_listings"

function loadExtras(): Listing[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(EXTRA_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Listing[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function rememberListing(listing: Listing) {
  const extras = loadExtras().filter((item) => item.id !== listing.id)
  extras.unshift(listing)
  localStorage.setItem(EXTRA_KEY, JSON.stringify(extras))
}

export function allListings(): Listing[] {
  return [...loadExtras(), ...listingsFromMock()]
}

export function getCatalog() {
  return createInMemoryListingCatalog(allListings())
}

export function publishedCountForEmployer(employerId: string): number {
  return allListings().filter((item) => item.employerId === employerId).length
}
