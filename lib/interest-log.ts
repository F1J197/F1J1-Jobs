export interface Interest {
  id: string
  listingId: string
  employerId: string
  listingTitle: string
  seekerName?: string
  recordedAt: string
  actorKey: string
}

export interface InterestLog {
  record(input: {
    listingId: string
    employerId: string
    listingTitle: string
    seekerName?: string
    actorKey: string
  }): Interest
  listByEmployer(employerId: string): Interest[]
  listByListing(listingId: string): Interest[]
}

const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 3

export function createInterestLog(deps?: {
  now?: () => Date
  id?: () => string
  store?: Interest[]
}): InterestLog {
  const now = deps?.now ?? (() => new Date())
  const nextId = deps?.id ?? (() => crypto.randomUUID())
  const store = deps?.store ?? []

  return {
    record(input) {
      const current = now()
      const recent = store.filter(
        (item) =>
          item.listingId === input.listingId &&
          item.actorKey === input.actorKey &&
          current.getTime() - Date.parse(item.recordedAt) < WINDOW_MS,
      )
      if (recent.length >= MAX_PER_WINDOW) {
        throw new Error('Too many Express Interest attempts on this Listing. Try again later.')
      }

      const interest: Interest = {
        id: nextId(),
        listingId: input.listingId,
        employerId: input.employerId,
        listingTitle: input.listingTitle,
        seekerName: input.seekerName,
        recordedAt: current.toISOString(),
        actorKey: input.actorKey,
      }
      store.unshift(interest)
      return interest
    },
    listByEmployer(employerId) {
      return store.filter((item) => item.employerId === employerId)
    },
    listByListing(listingId) {
      return store.filter((item) => item.listingId === listingId)
    },
  }
}
