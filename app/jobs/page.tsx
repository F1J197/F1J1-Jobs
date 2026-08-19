"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { formatListingType } from "@/components/listing-format"
import { getCatalog } from "@/components/listing-store"
import { CATEGORIES, type Category, type Listing, type ListingType } from "@/lib/listing"

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

  useEffect(() => {
    setQuery(searchParams.get("query") ?? "")
    setTown(searchParams.get("town") ?? "")
    const nextCategory = searchParams.get("category")
    setCategory(isCategory(nextCategory) ? nextCategory : "")
    const nextType = searchParams.get("type")
    setType(isListingType(nextType) ? nextType : "")
  }, [searchParams])

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
        if (!cancelled) setResults(listings)
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

  const countLabel = `${results.length} ${results.length === 1 ? "role" : "roles"}`

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader active="jobs" />

      <main className="wrap pb-16 pt-8">
        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">Jobs</p>
        <h1 className="text-[clamp(1.4rem,3vw,1.75rem)] font-bold tracking-tight">
          Open roles across Fiji
        </h1>
        <p className="mb-4 mt-1 max-w-[40ch] text-[0.9rem] text-muted">
          Filter by what and where. Place search matches any text employers enter — islands, towns, deltas, resorts.
        </p>

        <form onSubmit={onSearchSubmit} className="mb-4 flex flex-wrap items-center gap-2.5">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Keywords"
            className="min-h-11 min-w-[12rem] flex-1 rounded-[10px] border border-line bg-surface px-3.5 text-base outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-ink/15"
          />
          <input
            type="search"
            value={town}
            onChange={(event) => setTown(event.target.value)}
            placeholder="Any place in Fiji"
            autoComplete="off"
            className="min-h-11 min-w-[12rem] flex-1 rounded-[10px] border border-line bg-surface px-3.5 text-base outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-ink/15"
          />
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>

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
                Clear filters to see all jobs, try a broader place name, or post a role if you are hiring.
              </p>
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
                  </p>
                  <p className="mt-1 text-[0.9rem] text-muted">
                    {listing.employerName}
                    {listing.pay ? ` · ${listing.pay}` : ""}
                    {` · ${listing.category}`}
                  </p>
                </div>
                <p className="mt-1 text-[0.8rem] leading-snug text-muted md:mt-0 md:text-right">
                  {listing.town} · {formatListingType(listing.type)}
                  <br />
                  {listing.postedAt}
                </p>
              </Link>
            ))
          )}
        </div>

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
