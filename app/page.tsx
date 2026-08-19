import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { createInMemoryListingCatalog, listingsFromMock } from "@/lib/listing-catalog"
import { formatListingType } from "@/components/listing-format"

export default async function Home() {
  const preview = (await createInMemoryListingCatalog(listingsFromMock()).search({})).slice(0, 4)

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader active="home" />

      <main className="wrap pb-16 pt-8">
        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">
          Find Work in Fiji
        </p>
        <h1 className="mb-3.5 max-w-[16ch] text-[clamp(2.2rem,6vw,3.4rem)] font-bold leading-[1.05] tracking-tight">
          Jobs in Fiji
        </h1>
        <p className="mb-2 max-w-[36ch] text-[1.05rem] leading-relaxed text-muted">
          Find work that moves you forward.
        </p>
        <p className="mb-6 max-w-[40ch] text-[1.05rem] leading-relaxed text-muted">
          Search roles from any island or town. Message employers on WhatsApp. Simple as a good job board should be.
        </p>

        <form action="/jobs" method="get" className="max-w-xl">
          <div className="grid gap-2 rounded-[14px] border border-line bg-surface p-1.5 shadow-[0_8px_28px_color-mix(in_srgb,var(--ink)_4%,transparent)] sm:grid-cols-[1.15fr_1fr_auto] sm:items-center sm:p-1.5 sm:pl-3.5">
            <label className="sr-only" htmlFor="home-query">
              Keywords
            </label>
            <input
              id="home-query"
              name="query"
              type="search"
              placeholder="Job title, skill, or company"
              className="min-h-11 w-full border-0 bg-transparent px-2 text-[0.975rem] outline-none placeholder:text-muted"
            />
            <label className="sr-only" htmlFor="home-town">
              Place in Fiji
            </label>
            <input
              id="home-town"
              name="town"
              type="search"
              placeholder="Any place in Fiji"
              autoComplete="off"
              className="min-h-11 w-full border-0 bg-transparent px-2 text-[0.975rem] outline-none placeholder:text-muted sm:border-l sm:border-line"
            />
            <Button type="submit" className="w-full sm:w-auto">
              Search jobs
            </Button>
          </div>
        </form>
        <p className="mt-2 max-w-xl text-[0.78rem] text-muted">
          Type any village, town, island, or area. Matching is free-text — not limited to a fixed list of islands.
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link href="/jobs">
            <Button variant="outline">Browse all jobs</Button>
          </Link>
          <Link href="/employer/post-job">
            <Button variant="outline">I am hiring</Button>
          </Link>
        </div>

        <section className="mt-11">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">
                Latest roles
              </p>
              <h2 className="text-[clamp(1.4rem,3vw,1.75rem)] font-bold tracking-tight">
                A few openings right now
              </h2>
            </div>
            <Link href="/jobs">
              <Button variant="outline" size="sm">
                See all
              </Button>
            </Link>
          </div>
          <div className="grid gap-2.5 md:grid-cols-2">
            {preview.map((listing) => (
              <Link
                key={listing.id}
                href={`/jobs/${listing.id}`}
                className="rounded-[14px] border border-line bg-surface px-[1.15rem] py-[1.1rem] text-left transition-colors hover:border-ink/30"
              >
                <h3 className="text-[1.02rem] font-semibold tracking-tight">{listing.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {listing.employerName} · {listing.town}
                </p>
                <p className="mt-1.5 text-sm text-muted">
                  {listing.pay} · {formatListingType(listing.type)}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <aside className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-[1.4rem] py-[1.35rem]">
          <div>
            <strong className="mb-1 block text-[1.05rem] tracking-tight">Hiring in Fiji?</strong>
            <span className="text-[0.9rem] text-muted">
              Post on a dedicated page - keep the home clean for job seekers.
            </span>
          </div>
          <Link href="/employer/post-job">
            <Button>Advertise a job</Button>
          </Link>
        </aside>
      </main>

      <SiteFooter />
    </div>
  )
}
