"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  formatClosesAt,
  formatListingPay,
  formatListingType,
  formatPostedAt,
  isNewSince,
} from "@/components/listing-format"
import { getCatalog } from "@/components/listing-store"
import { getEventLog, getWatchLog, lastVisitAt, markVisit } from "@/components/product-store"
import { CATEGORIES, type Category, type Listing, type ListingType } from "@/lib/listing"
import { DIVISIONS, suggestTowns } from "@/lib/town"

const TYPE_CHIPS: { label: string; value: "" | ListingType }[] = [
  { label: "All", value: "" },
  { label: "Full-time", value: "FULL_TIME" },
  { label: "Part-time", value: "PART_TIME" },
  { label: "Contract", value: "CONTRACT" },
  { label: "Temporary", value: "TEMPORARY" },
  { label: "Internship", value: "INTERNSHIP" },
]

function isCategory(value: string | null): value is Category {
  return CATEGORIES.includes(value as Category)
}

function isListingType(value: string | null): value is ListingType {
  return (
    value === "FULL_TIME" ||
    value === "PART_TIME" ||
    value === "CONTRACT" ||
    value === "TEMPORARY" ||
    value === "INTERNSHIP"
  )
}

function JobsClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("query") ?? "")
  const [town, setTown] = useState(searchParams.get("town") ?? "")
  const initialCategory = searchParams.get("category")
  const initialType = searchParams.get("type")
  const [category, setCategory] = useState<Category | "">(
    isCategory(initialCategory) ? initialCategory : "",
  )
  const [type, setType] = useState<"" | ListingType>(
    isListingType(initialType) ? initialType : "",
  )
  const [results, setResults] = useState<Listing[]>([])
  const [since, setSince] = useState<Date>(new Date(0))
  const [watchEmail, setWatchEmail] = useState("")
  const [watchNote, setWatchNote] = useState("")

  useEffect(() => {
    setQuery(searchParams.get("query") ?? "")
    setTown(searchParams.get("town") ?? "")
    const nextCategory = searchParams.get("category")
    setCategory(isCategory(nextCategory) ? nextCategory : "")
    const nextType = searchParams.get("type")
    setType(isListingType(nextType) ? nextType : "")
  }, [searchParams])

  useEffect(() => {
    setSince(lastVisitAt())
    markVisit()
  }, [])

  useEffect(() => {
    let cancelled = false
    const catalog = getCatalog()
    catalog
      .search({
        query: query || undefined,
        town: town || undefined,
        category: category || undefined,
        type: type || undefined,
      })
      .then((listings) => {
        if (cancelled) return
        setResults(listings)
        window.setTimeout(() => {
          if (cancelled) return
          getEventLog().track({
            name: "listing_search",
            query: query || undefined,
            town: town || undefined,
            category: category || undefined,
            resultCount: listings.length,
          })
        }, 700)
      })
    return () => {
      cancelled = true
    }
  }, [query, town, category, type])

  function pushFilters(next: {
    query: string
    town: string
    category: Category | ""
    type: "" | ListingType
  }) {
    const params = new URLSearchParams()
    if (next.query) params.set("query", next.query)
    if (next.town) params.set("town", next.town)
    if (next.category) params.set("category", next.category)
    if (next.type) params.set("type", next.type)
    const qs = params.toString()
    router.replace(qs ? `/jobs?${qs}` : "/jobs")
  }

  function onSearchSubmit(event: React.FormEvent) {
    event.preventDefault()
    pushFilters({ query, town, category, type })
  }

  function clearFilters() {
    setQuery("")
    setTown("")
    setCategory("")
    setType("")
    router.replace("/jobs")
  }

  function saveWatch(event: React.FormEvent) {
    event.preventDefault()
    try {
      getWatchLog().subscribe({
        town: town || undefined,
        category: category || undefined,
        email: watchEmail || undefined,
      })
      getEventLog().track({
        name: "alert_subscribe",
        town: town || undefined,
        category: category || undefined,
      })
      setWatchNote(
        watchEmail
          ? "Watch saved. When email alerts are on, we will use this address only for new roles — never sold."
          : "Watch saved on this phone. New matching roles will show at the top next time you open Jobs.",
      )
    } catch (error) {
      setWatchNote(error instanceof Error ? error.message : "Could not save this Watch")
    }
  }

  const countLabel = `${results.length} ${results.length === 1 ? "role" : "roles"}`
  const suggestions = results.length === 0 && town ? suggestTowns(town) : []
  const newCount = results.filter((listing) => isNewSince(listing, since) && since.getTime() > 0).length

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader active="jobs" />

      <main className="wrap pb-16 pt-8">
        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">Jobs</p>
        <h1 className="text-[clamp(1.4rem,3vw,1.75rem)] font-bold tracking-tight">
          Open roles across Fiji
        </h1>
        <p className="mb-4 mt-1 max-w-[42ch] text-[0.9rem] text-muted">
          Search Denarau, Nasinu, or Western — we match the Towns people actually say. No account to look.
        </p>

        {newCount > 0 && (
          <p className="mb-4 rounded-[10px] bg-accent/10 px-3.5 py-2.5 text-sm text-ink">
            {newCount} new {newCount === 1 ? "role" : "roles"} since you last opened Jobs.
          </p>
        )}

        <form onSubmit={onSearchSubmit} className="mb-4 flex flex-wrap items-center gap-2.5">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Chef, driver, PSV…"
            className="min-h-11 min-w-[12rem] flex-1 rounded-[10px] border border-line bg-surface px-3.5 text-base outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-ink/15"
          />
          <input
            type="search"
            value={town}
            onChange={(event) => setTown(event.target.value)}
            placeholder="Town, island, or division"
            autoComplete="off"
            className="min-h-11 min-w-[12rem] flex-1 rounded-[10px] border border-line bg-surface px-3.5 text-base outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-ink/15"
          />
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>

        <div className="mb-3 flex gap-0.5 overflow-x-auto" role="toolbar" aria-label="Division">
          {DIVISIONS.map((division) => (
            <button
              key={division}
              type="button"
              onClick={() => {
                const next = town === division ? "" : division
                setTown(next)
                pushFilters({ query, town: next, category, type })
              }}
              className={`min-h-11 shrink-0 border-b-[1.5px] px-3.5 text-[0.85rem] font-medium ${
                town === division
                  ? "border-ink font-semibold text-ink"
                  : "border-transparent text-muted"
              }`}
            >
              {division}
            </button>
          ))}
        </div>

        <div className="mb-3 flex gap-0.5 overflow-x-auto" role="toolbar" aria-label="Category">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                const next = category === item ? "" : item
                setCategory(next)
                pushFilters({ query, town, category: next, type })
              }}
              className={`min-h-11 shrink-0 border-b-[1.5px] px-3.5 text-[0.85rem] font-medium ${
                category === item
                  ? "border-ink font-semibold text-ink"
                  : "border-transparent text-muted"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-4 flex gap-0.5 overflow-x-auto" role="toolbar" aria-label="Type">
          {TYPE_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => {
                setType(chip.value)
                pushFilters({ query, town, category, type: chip.value })
              }}
              className={`min-h-11 shrink-0 border-b-[1.5px] px-3.5 text-[0.85rem] font-medium ${
                type === chip.value
                  ? "border-ink font-semibold text-ink"
                  : "border-transparent text-muted"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          {results.length === 0 ? (
            <div className="px-6 py-8">
              <h2 className="mb-2 text-[1.08rem] font-semibold tracking-tight">
                No roles match this search
              </h2>
              <p className="mb-4 max-w-[38ch] text-muted">
                Try a nearby Town, a Division, or clear filters. We keep the exact search so we can add those places.
              </p>
              {suggestions.length > 0 && (
                <p className="mb-4 text-sm text-ink">
                  Nearby:{" "}
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="mr-2 underline"
                      onClick={() => {
                        setTown(item)
                        pushFilters({ query, town: item, category, type })
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <Button type="button" size="sm" onClick={clearFilters}>
                  Clear filters
                </Button>
                <Link href="/employer/post-job">
                  <Button type="button" variant="outline" size="sm">
                    Post a job
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            results.map((listing) => (
              <Link
                key={listing.id}
                href={`/jobs/${listing.id}`}
                className="relative block border-b border-line px-5 py-5 last:border-b-0 hover:bg-bg/65 md:grid md:grid-cols-[1fr_auto] md:gap-5"
              >
                <div>
                  <p className="text-[1.05rem] font-semibold tracking-tight hover:text-accent">
                    {listing.title}
                    {listing.featured ? (
                      <span className="ml-2 align-middle text-[0.68rem] font-semibold uppercase tracking-wider text-accent">
                        Featured
                      </span>
                    ) : null}
                    {since.getTime() > 0 && isNewSince(listing, since) ? (
                      <span className="ml-2 align-middle text-[0.68rem] font-semibold uppercase tracking-wider text-ink">
                        New
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-[0.9rem] text-muted">
                    {listing.employerName}
                    {listing.verifiedEmployer ? " · Verified" : ""}
                    {` · ${formatListingPay(listing)}`}
                    {listing.liveIn ? " · Live-in" : ""}
                    {` · ${listing.category}`}
                  </p>
                </div>
                <p className="mt-1 text-[0.8rem] leading-snug text-muted md:mt-0 md:text-right">
                  {listing.town} · {formatListingType(listing.type)}
                  <br />
                  {formatPostedAt(listing.postedAt)} · {formatClosesAt(listing.expiresAt)}
                </p>
              </Link>
            ))
          )}
        </div>

        <form onSubmit={saveWatch} className="mt-6 rounded-2xl border border-line bg-surface p-5">
          <h2 className="text-[1.05rem] font-semibold tracking-tight">Watch this search</h2>
          <p className="mt-1 max-w-[42ch] text-sm text-muted">
            Save Town + Category on this phone. Email is optional and only for a later digest — we will not add WhatsApp Business charges.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <input
              type="email"
              value={watchEmail}
              onChange={(event) => setWatchEmail(event.target.value)}
              placeholder="Email (optional)"
              className="min-h-11 min-w-[14rem] flex-1 rounded-[10px] border border-line bg-bg px-3.5 text-base"
            />
            <Button type="submit" size="sm">
              Save Watch
            </Button>
          </div>
          {watchNote ? <p className="mt-2 text-sm text-ink">{watchNote}</p> : null}
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <span>{countLabel}</span>
          <Link href="/employer/post-job">
            <Button variant="outline" size="sm">
              Post a job
            </Button>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg">
          <SiteHeader active="jobs" />
          <main className="wrap py-10 text-muted">Loading jobs…</main>
        </div>
      }
    >
      <JobsClient />
    </Suspense>
  )
}
