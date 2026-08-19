import { createAlertWatchLog, type AlertWatch } from "@/lib/alert-watch"
import { createEventLog, type EventLog, type ProductEvent } from "@/lib/event-log"
import { createInterestLog, type Interest, type InterestLog } from "@/lib/interest-log"
import { createListingReportLog, type ListingReport, type ListingReportLog } from "@/lib/listing-report"

const INTEREST_KEY = "vitiwork_interests"
const REPORT_KEY = "vitiwork_reports"
const EVENT_KEY = "vitiwork_events"
const WATCH_KEY = "vitiwork_watches"
const ACTOR_KEY = "vitiwork_actor"
const LAST_VISIT_KEY = "vitiwork_last_visit"

function loadJson<T>(key: string): T[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw) as T[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveJson<T>(key: string, value: T[]) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function actorKey(): string {
  if (typeof window === "undefined") return "server"
  const existing = localStorage.getItem(ACTOR_KEY)
  if (existing) return existing
  const next = crypto.randomUUID()
  localStorage.setItem(ACTOR_KEY, next)
  return next
}

export function lastVisitAt(): Date {
  if (typeof window === "undefined") return new Date(0)
  const raw = localStorage.getItem(LAST_VISIT_KEY)
  if (!raw) return new Date(0)
  const parsed = Date.parse(raw)
  return Number.isNaN(parsed) ? new Date(0) : new Date(parsed)
}

export function markVisit() {
  if (typeof window === "undefined") return
  localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString())
}

export function getInterestLog(): InterestLog {
  const store = loadJson<Interest>(INTEREST_KEY)
  const inner = createInterestLog({ store })
  return {
    record(input) {
      const interest = inner.record(input)
      saveJson(INTEREST_KEY, store)
      return interest
    },
    listByEmployer: inner.listByEmployer,
    listByListing: inner.listByListing,
  }
}

export function getReportLog(): ListingReportLog {
  const store = loadJson<ListingReport>(REPORT_KEY)
  const inner = createListingReportLog({ store })
  return {
    submit(input) {
      const report = inner.submit(input)
      saveJson(REPORT_KEY, store)
      return report
    },
    listByListing: inner.listByListing,
  }
}

export function getEventLog(): EventLog {
  const store = loadJson<ProductEvent>(EVENT_KEY)
  const inner = createEventLog({ store })
  return {
    track(input) {
      const event = inner.track(input)
      saveJson(EVENT_KEY, store)
      return event
    },
    all: inner.all,
    summarize: inner.summarize,
  }
}

export function getWatchLog() {
  const store = loadJson<AlertWatch>(WATCH_KEY)
  const inner = createAlertWatchLog({ store })
  return {
    subscribe(input: { town?: string; category?: AlertWatch["category"]; email?: string }) {
      const watch = inner.subscribe(input)
      saveJson(WATCH_KEY, store)
      return watch
    },
    all: inner.all,
    matchingNew: inner.matchingNew,
  }
}
