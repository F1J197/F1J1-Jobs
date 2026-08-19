"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { publishedCountForEmployer, rememberListing } from "@/components/listing-store"
import { getEventLog } from "@/components/product-store"
import { useAuth } from "@/lib/auth-context"
import { createListingPost } from "@/lib/listing-post"
import { getCompanyById } from "@/lib/mock-data"
import { NATIONAL_MINIMUM_HOURLY_FJD } from "@/lib/pay"
import {
  CATEGORIES,
  LICENCE_TAGS,
  type Category,
  type ListingLanguage,
  type ListingType,
  type PayUnit,
} from "@/lib/listing"

const TYPES: { label: string; value: ListingType }[] = [
  { label: "Full-time", value: "FULL_TIME" },
  { label: "Part-time", value: "PART_TIME" },
  { label: "Contract", value: "CONTRACT" },
  { label: "Temporary", value: "TEMPORARY" },
  { label: "Internship", value: "INTERNSHIP" },
]

export default function PostJobPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [town, setTown] = useState("")
  const [category, setCategory] = useState<Category>("Hospitality")
  const [type, setType] = useState<ListingType>("FULL_TIME")
  const [payAmount, setPayAmount] = useState("")
  const [payUnit, setPayUnit] = useState<PayUnit>("hour")
  const [startDate, setStartDate] = useState("")
  const [liveIn, setLiveIn] = useState(false)
  const [shiftNote, setShiftNote] = useState("")
  const [language, setLanguage] = useState<ListingLanguage>("English")
  const [licences, setLicences] = useState<string[]>([])
  const [whatsapp, setWhatsapp] = useState("+679 ")
  const [featured, setFeatured] = useState(false)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!isAuthenticated || user?.role !== "EMPLOYER") {
        router.replace("/signin?redirect=/employer/post-job")
      }
    }, 50)
    return () => window.clearTimeout(timer)
  }, [isAuthenticated, user, router])

  const employerId = user?.companyId ?? user?.id ?? ""
  const company = user?.companyId ? getCompanyById(user.companyId) : null
  const listingCount = useMemo(() => {
    if (!employerId) return 0
    return publishedCountForEmployer(employerId)
  }, [employerId])
  const isFreeFirstPost = listingCount === 0

  if (!user || user.role !== "EMPLOYER") {
    return null
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!user) return
    setError("")
    setSubmitting(true)
    try {
      const listingPost = createListingPost()
      const listing = await listingPost.publish({
        employer: {
          id: employerId,
          name: company?.name ?? user.name,
          publishedListingCount: listingCount,
          verified: company?.verified,
        },
        draft: {
          title,
          description,
          type,
          town,
          category,
          payAmount: Number(payAmount),
          payUnit,
          startDate,
          liveIn,
          shiftNote: shiftNote || undefined,
          language,
          licences,
          employerWhatsApp: whatsapp,
          tier: isFreeFirstPost ? "FREE_FIRST" : featured ? "FEATURED" : "STANDARD",
        },
      })
      rememberListing(listing)
      getEventLog().track({
        name: "listing_publish",
        listingId: listing.id,
        tier: isFreeFirstPost ? "FREE_FIRST" : featured ? "FEATURED" : "STANDARD",
      })
      router.push(`/jobs/${listing.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not publish this listing")
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader active="post" />

      <main className="wrap grid gap-7 pb-16 pt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <div>
          <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">
            Employers
          </p>
          <h1 className="text-[clamp(1.4rem,3vw,1.75rem)] font-bold tracking-tight">
            Advertise a job
          </h1>
          <p className="mt-3 max-w-[36ch] text-[1.05rem] leading-relaxed text-muted">
            Honest pay (FJD {NATIONAL_MINIMUM_HOURLY_FJD.toFixed(2)}/hour minimum), a start date, and a Fiji WhatsApp. Seekers message you directly — they never pay to apply.
          </p>
          <p className="mt-4 rounded-[10px] bg-surface px-3.5 py-3 text-sm text-ink">
            {isFreeFirstPost
              ? "This is a Free First Post — your first listing is free and lasts seven days."
              : featured
                ? "This is a Featured listing — 30 days, top of the feed."
                : "This is a Standard listing — 30 days. Free First Post is already used."}
          </p>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-surface p-5">
          {error && (
            <div className="mb-4 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mb-3.5">
            <label htmlFor="p-title" className="mb-1.5 block text-[0.8rem] font-semibold">
              Title
            </label>
            <Input
              id="p-title"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Sales Assistant"
            />
          </div>

          <div className="mb-3.5">
            <label htmlFor="p-description" className="mb-1.5 block text-[0.8rem] font-semibold">
              Description
            </label>
            <textarea
              id="p-description"
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="2–4 sentences about the role"
              className="min-h-[88px] w-full resize-y rounded-[10px] border border-line bg-bg px-3.5 py-2.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-ink/15"
            />
          </div>

          <div className="mb-3.5">
            <label htmlFor="p-town" className="mb-1.5 block text-[0.8rem] font-semibold">
              Town
            </label>
            <Input
              id="p-town"
              required
              value={town}
              onChange={(event) => setTown(event.target.value)}
              placeholder="Any island, town, or area in Fiji"
              autoComplete="off"
            />
          </div>

          <div className="mb-3.5">
            <label htmlFor="p-category" className="mb-1.5 block text-[0.8rem] font-semibold">
              Category
            </label>
            <select
              id="p-category"
              value={category}
              onChange={(event) => setCategory(event.target.value as Category)}
              className="min-h-11 w-full rounded-[10px] border border-line bg-bg px-3.5 text-base"
            >
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3.5">
            <label htmlFor="p-type" className="mb-1.5 block text-[0.8rem] font-semibold">
              Type
            </label>
            <select
              id="p-type"
              value={type}
              onChange={(event) => setType(event.target.value as ListingType)}
              className="min-h-11 w-full rounded-[10px] border border-line bg-bg px-3.5 text-base"
            >
              {TYPES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3.5 grid gap-2 sm:grid-cols-[1fr_8rem]">
            <div>
              <label htmlFor="p-pay" className="mb-1.5 block text-[0.8rem] font-semibold">
                Pay (FJD)
              </label>
              <Input
                id="p-pay"
                type="number"
                min={0}
                step="0.25"
                required
                value={payAmount}
                onChange={(event) => setPayAmount(event.target.value)}
                placeholder="6.50"
              />
            </div>
            <div>
              <label htmlFor="p-unit" className="mb-1.5 block text-[0.8rem] font-semibold">
                Unit
              </label>
              <select
                id="p-unit"
                value={payUnit}
                onChange={(event) => setPayUnit(event.target.value as PayUnit)}
                className="min-h-11 w-full rounded-[10px] border border-line bg-bg px-3.5 text-base"
              >
                <option value="hour">/hour</option>
                <option value="day">/day</option>
                <option value="month">/month</option>
                <option value="year">/year</option>
              </select>
            </div>
          </div>
          <p className="mb-3.5 text-[0.78rem] text-muted">
            We show hourly pay as a monthly equivalent using Fiji&apos;s 45-hour week. Below FJD{" "}
            {NATIONAL_MINIMUM_HOURLY_FJD.toFixed(2)}/hour is rejected.
          </p>

          <div className="mb-3.5">
            <label htmlFor="p-start" className="mb-1.5 block text-[0.8rem] font-semibold">
              Start date
            </label>
            <Input
              id="p-start"
              type="date"
              required
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>

          <label className="mb-3.5 flex min-h-11 items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={liveIn}
              onChange={(event) => setLiveIn(event.target.checked)}
            />
            Live-in (room or village stay)
          </label>

          <div className="mb-3.5">
            <label htmlFor="p-shift" className="mb-1.5 block text-[0.8rem] font-semibold">
              Shift note
            </label>
            <Input
              id="p-shift"
              value={shiftNote}
              onChange={(event) => setShiftNote(event.target.value)}
              placeholder="Start Monday, night crush, split shift…"
            />
          </div>

          <div className="mb-3.5">
            <label htmlFor="p-language" className="mb-1.5 block text-[0.8rem] font-semibold">
              Language on the job
            </label>
            <select
              id="p-language"
              value={language}
              onChange={(event) => setLanguage(event.target.value as ListingLanguage)}
              className="min-h-11 w-full rounded-[10px] border border-line bg-bg px-3.5 text-base"
            >
              <option>English</option>
              <option>iTaukei</option>
              <option>Hindi</option>
              <option>Other</option>
            </select>
          </div>

          <fieldset className="mb-3.5">
            <legend className="mb-1.5 text-[0.8rem] font-semibold">Licences (if any)</legend>
            <div className="flex flex-wrap gap-2">
              {LICENCE_TAGS.map((tag) => (
                <label key={tag} className="inline-flex min-h-11 items-center gap-1.5 text-sm">
                  <input
                    type="checkbox"
                    checked={licences.includes(tag)}
                    onChange={(event) => {
                      setLicences((current) =>
                        event.target.checked
                          ? [...current, tag]
                          : current.filter((item) => item !== tag),
                      )
                    }}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </fieldset>

          {!isFreeFirstPost && (
            <label className="mb-5 flex min-h-11 items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={featured}
                onChange={(event) => setFeatured(event.target.checked)}
              />
              Featured (30 days, top of the feed)
            </label>
          )}

          <div className="mb-5">
            <label htmlFor="p-whatsapp" className="mb-1.5 block text-[0.8rem] font-semibold">
              WhatsApp
            </label>
            <Input
              id="p-whatsapp"
              type="tel"
              required
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
              placeholder="+679 …"
            />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Publishing…" : "Post this job"}
          </Button>
        </form>
      </main>

      <SiteFooter />
    </div>
  )
}
