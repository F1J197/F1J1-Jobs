export type EventName =
  | 'listing_search'
  | 'listing_view'
  | 'express_interest'
  | 'listing_publish'
  | 'listing_report'
  | 'facebook_share'
  | 'whatsapp_share'
  | 'alert_subscribe'

export interface ProductEvent {
  id: string
  name: EventName
  recordedAt: string
  listingId?: string
  query?: string
  town?: string
  category?: string
  resultCount?: number
  tier?: string
}

export interface EventSummary {
  searches: number
  views: number
  interests: number
  publishes: number
  reports: number
  shares: number
  zeroResultQueries: string[]
}

export interface EventLog {
  track(input: Omit<ProductEvent, 'id' | 'recordedAt'>): ProductEvent
  all(): ProductEvent[]
  summarize(): EventSummary
}

export function createEventLog(deps?: {
  now?: () => Date
  id?: () => string
  store?: ProductEvent[]
}): EventLog {
  const now = deps?.now ?? (() => new Date())
  const nextId = deps?.id ?? (() => crypto.randomUUID())
  const store = deps?.store ?? []

  return {
    track(input) {
      const event: ProductEvent = {
        ...input,
        id: nextId(),
        recordedAt: now().toISOString(),
      }
      store.unshift(event)
      return event
    },
    all() {
      return [...store]
    },
    summarize() {
      const zeroResultQueries = store
        .filter((item) => item.name === 'listing_search' && item.resultCount === 0 && item.query)
        .map((item) => item.query as string)
      return {
        searches: store.filter((item) => item.name === 'listing_search').length,
        views: store.filter((item) => item.name === 'listing_view').length,
        interests: store.filter((item) => item.name === 'express_interest').length,
        publishes: store.filter((item) => item.name === 'listing_publish').length,
        reports: store.filter((item) => item.name === 'listing_report').length,
        shares: store.filter(
          (item) => item.name === 'facebook_share' || item.name === 'whatsapp_share',
        ).length,
        zeroResultQueries,
      }
    },
  }
}
