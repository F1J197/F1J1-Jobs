import type { Category, Listing } from './listing'
import { isLiveListing } from './listing-catalog'
import { townsMatch } from './town'

export interface AlertWatch {
  id: string
  town?: string
  category?: Category
  email?: string
  createdAt: string
}

export interface AlertWatchLog {
  subscribe(input: { town?: string; category?: Category; email?: string }): AlertWatch
  all(): AlertWatch[]
  matchingNew(watch: AlertWatch, listings: Listing[], since: Date): Listing[]
}

export function createAlertWatchLog(deps?: {
  now?: () => Date
  id?: () => string
  store?: AlertWatch[]
}): AlertWatchLog {
  const now = deps?.now ?? (() => new Date())
  const nextId = deps?.id ?? (() => crypto.randomUUID())
  const store = deps?.store ?? []

  return {
    subscribe(input) {
      if (!input.town && !input.category) {
        throw new Error('A Watch needs a Town or a Category')
      }
      const watch: AlertWatch = {
        id: nextId(),
        town: input.town,
        category: input.category,
        email: input.email,
        createdAt: now().toISOString(),
      }
      store.unshift(watch)
      return watch
    },
    all() {
      return [...store]
    },
    matchingNew(watch, listings, since) {
      return listings.filter((listing) => {
        if (!isLiveListing(listing)) return false
        const posted = Date.parse(listing.postedAt)
        if (Number.isNaN(posted) || posted < since.getTime()) return false
        if (watch.town && !townsMatch(listing.town, watch.town)) return false
        if (watch.category && listing.category !== watch.category) return false
        return true
      })
    },
  }
}
