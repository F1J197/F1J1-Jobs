"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { allListings } from "@/components/listing-store"
import { getEventLog, getReportLog } from "@/components/product-store"
import type { EventSummary } from "@/lib/event-log"

export default function MetricsPage() {
  const [summary, setSummary] = useState<EventSummary | null>(null)
  const [reports, setReports] = useState(0)
  const [live, setLive] = useState(0)
  const [withPayAndStart, setWithPayAndStart] = useState(0)

  useEffect(() => {
    const listings = allListings().filter((item) => item.status === "ACTIVE")
    setLive(listings.length)
    setWithPayAndStart(
      listings.filter((item) => Boolean(item.pay) && Boolean(item.startDate)).length,
    )
    setSummary(getEventLog().summarize())
    setReports(
      listings.reduce((sum, listing) => sum + getReportLog().listByListing(listing.id).length, 0),
    )
  }, [])

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader />
      <main className="wrap pb-16 pt-8">
        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">
          Metrics
        </p>
        <h1 className="text-[clamp(1.4rem,3vw,1.75rem)] font-bold tracking-tight">
          First-party counts
        </h1>
        <p className="mt-2 max-w-[46ch] text-sm text-muted">
          No third-party tracker. Counts live on this device until Neon is the store. North star is
          Express Interest.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            ["Live Listings", live],
            ["With pay + start", withPayAndStart],
            ["Searches", summary?.searches ?? 0],
            ["Listing views", summary?.views ?? 0],
            ["Express Interest", summary?.interests ?? 0],
            ["Reports", reports + (summary?.reports ?? 0)],
            ["Shares", summary?.shares ?? 0],
            ["Publishes", summary?.publishes ?? 0],
          ].map(([label, value]) => (
            <div key={String(label)} className="rounded-2xl border border-line bg-surface px-4 py-3">
              <dt className="text-[0.72rem] font-semibold uppercase tracking-wider text-muted">
                {label}
              </dt>
              <dd className="mt-1 text-2xl font-bold">{value}</dd>
            </div>
          ))}
        </dl>
        {summary && summary.zeroResultQueries.length > 0 && (
          <section className="mt-8">
            <h2 className="text-[1.05rem] font-semibold">Zero-result searches</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink">
              {summary.zeroResultQueries.slice(0, 20).map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
