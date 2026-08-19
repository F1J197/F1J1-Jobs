import type { ListingType } from "@/lib/listing"

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
