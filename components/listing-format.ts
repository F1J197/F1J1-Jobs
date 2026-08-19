import { formatDistanceToNowStrict, format, isValid, parseISO } from "date-fns"
import type { Listing, ListingType } from "@/lib/listing"
import { formatPay } from "@/lib/pay"

export function formatListingType(type: ListingType): string {
  switch (type) {
    case "FULL_TIME":
      return "Full-time"
    case "PART_TIME":
      return "Part-time"
    case "CONTRACT":
      return "Contract"
    case "TEMPORARY":
      return "Temporary"
    case "INTERNSHIP":
      return "Internship"
    default:
      return type
  }
}

function asDate(value: string): Date | undefined {
  const iso = parseISO(value)
  if (isValid(iso)) return iso
  const fallback = new Date(value)
  return Number.isNaN(fallback.getTime()) ? undefined : fallback
}

export function formatPostedAt(value: string): string {
  const date = asDate(value)
  if (!date) return value
  return `${formatDistanceToNowStrict(date)} ago`
}

export function formatClosesAt(value: string): string {
  const date = asDate(value)
  if (!date) return value
  return `Closes ${format(date, "d MMM")}`
}

export function formatStartDate(value?: string): string | undefined {
  if (!value) return undefined
  const date = asDate(value)
  if (!date) return value
  return format(date, "EEE d MMM")
}

export function formatListingPay(listing: Listing): string {
  if (listing.payAmount != null && listing.payUnit) {
    return formatPay(listing.payAmount, listing.payUnit)
  }
  return listing.pay || "Pay on enquiry"
}

export function isNewSince(listing: Listing, since: Date): boolean {
  const posted = asDate(listing.postedAt)
  if (!posted) return false
  return posted.getTime() >= since.getTime()
}
