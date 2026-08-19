"use client"

import { use, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  formatClosesAt,
  formatListingPay,
  formatListingType,
  formatStartDate,
} from "@/components/listing-format"
import { getCatalog } from "@/components/listing-store"
import { actorKey, getEventLog, getInterestLog, getReportLog } from "@/components/product-store"
import { open } from "@/lib/express-interest"
import { facebookShareUrl, whatsappShareUrl } from "@/lib/listing-share"
import { REPORT_REASONS, type ReportReason } from "@/lib/listing-report"
import { useAuth } from "@/lib/auth-context"
import { MOCK_APPLICATIONS, getCompanyById } from "@/lib/mock-data"
import type { Listing } from "@/lib/listing"
import { ArrowLeft, CheckCircle } from "lucide-react"

const REPORT_LABELS: Record<ReportReason, string> = {
  "fee-to-apply": "They asked me to pay to apply",
  scam: "Looks like a scam or fake Employer",
  "under-minimum": "Pay is below FJD 5.00/hour",
  unsafe: "Unsafe or trafficking-adjacent",
  other: "Something else",
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [listing, setListing] = useState<Listing | null | undefined>(undefined)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [interestError, setInterestError] = useState("")
  const [reportReason, setReportReason] = useState<ReportReason>("fee-to-apply")
  const [reportNote, setReportNote] = useState("")
  const [origin, setOrigin] = useState("")

  useEffect(() => {
    setOrigin(window.location.origin)
    let cancelled = false
    getCatalog()
      .getById(id)
      .then((found) => {
        if (!cancelled) setListing(found ?? null)
        if (found) getEventLog().track({ name: "listing_view", listingId: found.id })
      })
    return () => {
      cancelled = true
    }
  }, [id])

  const interestUrl = useMemo(
    () => (listing ? open({ listing, seekerName: user?.name }) : ""),
    [listing, user?.name],
  )

  if (listing === undefined) {
    return (
      <div className="min-h-screen bg-bg">
        <SiteHeader active="jobs" />
        <main className="wrap py-16 text-muted">Loading role…</main>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-bg">
        <SiteHeader active="jobs" />
        <main className="wrap py-16">
          <p className="text-ink">This role was not found.</p>
          <Link href="/jobs" className="mt-4 inline-flex min-h-11 items-center text-accent">
            Back to jobs
          </Link>
        </main>
      </div>
    )
  }

  const liveListing = listing
  const company = getCompanyById(liveListing.employerId)
  const hasApplied = MOCK_APPLICATIONS.some(
    (app) => app.jobId === id && app.userId === user?.id,
  )
  const shareOrigin = origin || "https://vitiwork.com"
  const facebookUrl = facebookShareUrl(liveListing, shareOrigin)
  const whatsappUrl = whatsappShareUrl(liveListing, shareOrigin)
  const startLabel = formatStartDate(liveListing.startDate)

  function onExpressInterest(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    setInterestError("")
    try {
      getInterestLog().record({
        listingId: liveListing.id,
        employerId: liveListing.employerId,
        listingTitle: liveListing.title,
        seekerName: user?.name,
        actorKey: actorKey(),
      })
      getEventLog().track({ name: "express_interest", listingId: liveListing.id })
      window.open(interestUrl, "_blank", "noopener,noreferrer")
    } catch (error) {
      setInterestError(error instanceof Error ? error.message : "Could not open WhatsApp")
    }
  }

  function onReport(event: React.FormEvent) {
    event.preventDefault()
    getReportLog().submit({ listingId: liveListing.id, reason: reportReason })
    getEventLog().track({ name: "listing_report", listingId: liveListing.id })
    setReportNote("Report received. We hide fee-to-apply and unsafe Listings after review.")
  }

  const handleApplyWithProfile = () => {
    if (!isAuthenticated) {
      router.push(`/signin?redirect=/jobs/${id}`)
      return
    }
    setShowApplicationForm(true)
  }

  const handleSubmitApplication = () => {
    MOCK_APPLICATIONS.push({
      id: `a${MOCK_APPLICATIONS.length + 1}`,
      jobId: id,
      userId: user!.id,
      cvUrl: user!.cvUrl || "/cv/placeholder.pdf",
      coverLetter,
      status: "PENDING",
      appliedAt: "Just now",
    })
    setApplicationSubmitted(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  if (applicationSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-accent" />
            <h2 className="mb-2 text-2xl font-bold">Application submitted</h2>
            <p className="mb-4 text-muted">
              Your application for {listing.title} at {listing.employerName} has been sent.
            </p>
            <p className="text-sm text-muted">Redirecting to your dashboard…</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader active="jobs" />

      <main className="wrap pb-16 pt-8">
        <Link href="/jobs" className="mb-6 inline-flex min-h-11 items-center text-accent hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to jobs
        </Link>

        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">Listing</p>
        <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-bold tracking-tight">{listing.title}</h1>
        <p className="mt-2 text-[1.05rem] text-muted">
          {listing.employerName}
          {listing.verifiedEmployer ? " · Verified Employer" : ""}
        </p>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-[10px] bg-surface px-3 py-2.5">
            <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
              Pay
            </span>
            <strong className="text-[0.9rem] font-semibold">{formatListingPay(listing)}</strong>
          </div>
          <div className="rounded-[10px] bg-surface px-3 py-2.5">
            <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
              Town
            </span>
            <strong className="text-[0.9rem] font-semibold">{listing.town}</strong>
          </div>
          <div className="rounded-[10px] bg-surface px-3 py-2.5">
            <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
              Start
            </span>
            <strong className="text-[0.9rem] font-semibold">{startLabel ?? "Ask on WhatsApp"}</strong>
          </div>
          <div className="rounded-[10px] bg-surface px-3 py-2.5">
            <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
              Type
            </span>
            <strong className="text-[0.9rem] font-semibold">
              {formatListingType(listing.type)}
              {listing.liveIn ? " · Live-in" : ""}
            </strong>
          </div>
          <div className="rounded-[10px] bg-surface px-3 py-2.5">
            <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
              Category
            </span>
            <strong className="text-[0.9rem] font-semibold">{listing.category}</strong>
          </div>
          <div className="rounded-[10px] bg-surface px-3 py-2.5">
            <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
              Closes
            </span>
            <strong className="text-[0.9rem] font-semibold">{formatClosesAt(listing.expiresAt)}</strong>
          </div>
        </div>

        {listing.shiftNote ? (
          <p className="mt-3 text-sm text-ink">Shift: {listing.shiftNote}</p>
        ) : null}
        {listing.language || (listing.licences && listing.licences.length > 0) ? (
          <p className="mt-1 text-sm text-muted">
            {listing.language ? `Language: ${listing.language}` : ""}
            {listing.licences && listing.licences.length > 0
              ? `${listing.language ? " · " : ""}Licence: ${listing.licences.join(", ")}`
              : ""}
          </p>
        ) : null}

        <div className="mt-6 grid gap-2">
          <a
            href={interestUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onExpressInterest}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-surface hover:bg-accent/90"
          >
            Express Interest on WhatsApp
          </a>
          {hasApplied ? (
            <Button disabled variant="outline">
              <CheckCircle className="mr-2 h-4 w-4" />
              Applied with profile
            </Button>
          ) : (
            <Button variant="ghost" onClick={handleApplyWithProfile}>
              Apply with profile
            </Button>
          )}
        </div>
        <p className="mt-3 text-sm text-muted">
          Express Interest opens WhatsApp. No account required. You never pay VitiWork or the Employer to say you are interested.
        </p>
        {interestError ? <p className="mt-2 text-sm text-red-700">{interestError}</p> : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => getEventLog().track({ name: "whatsapp_share", listingId: listing.id })}
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-sm font-semibold"
          >
            Share on WhatsApp
          </a>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => getEventLog().track({ name: "facebook_share", listingId: listing.id })}
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-sm font-semibold"
          >
            Share on Facebook
          </a>
        </div>

        {showApplicationForm && !hasApplied && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Apply with profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted">
                <strong className="text-ink">Your CV:</strong> {user?.cvUrl || "No CV uploaded"}
              </p>
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="cover-letter">
                  Cover letter (optional)
                </label>
                <textarea
                  id="cover-letter"
                  className="min-h-[150px] w-full rounded-[10px] border border-line bg-bg p-3 text-sm"
                  placeholder="Tell the employer why you are a great fit…"
                  value={coverLetter}
                  onChange={(event) => setCoverLetter(event.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSubmitApplication} className="flex-1">
                  Submit application
                </Button>
                <Button variant="outline" onClick={() => setShowApplicationForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <section className="mt-8 space-y-6">
          <div>
            <h2 className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">
              About the role
            </h2>
            <p className="whitespace-pre-line text-[0.92rem] leading-relaxed text-ink/80">
              {listing.description}
            </p>
          </div>
          {listing.responsibilities && (
            <div>
              <h2 className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">
                Responsibilities
              </h2>
              <p className="whitespace-pre-line text-[0.92rem] leading-relaxed text-ink/80">
                {listing.responsibilities}
              </p>
            </div>
          )}
          {listing.requirements && (
            <div>
              <h2 className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">
                Requirements
              </h2>
              <p className="whitespace-pre-line text-[0.92rem] leading-relaxed text-ink/80">
                {listing.requirements}
              </p>
            </div>
          )}
          {company && (
            <div>
              <h2 className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">
                About {company.name}
              </h2>
              <p className="text-[0.92rem] leading-relaxed text-ink/80">{company.description}</p>
            </div>
          )}
        </section>

        <form onSubmit={onReport} className="mt-10 rounded-2xl border border-line bg-surface p-5">
          <h2 className="text-[1.05rem] font-semibold">Report this Listing</h2>
          <p className="mt-1 text-sm text-muted">
            Seekers never pay to Express Interest. Tell us if someone asks for a fee, or if this looks unsafe.
          </p>
          <label className="mt-3 block text-[0.8rem] font-semibold" htmlFor="report-reason">
            Reason
          </label>
          <select
            id="report-reason"
            value={reportReason}
            onChange={(event) => setReportReason(event.target.value as ReportReason)}
            className="mt-1 min-h-11 w-full rounded-[10px] border border-line bg-bg px-3.5 text-base"
          >
            {REPORT_REASONS.map((reason) => (
              <option key={reason} value={reason}>
                {REPORT_LABELS[reason]}
              </option>
            ))}
          </select>
          <Button type="submit" variant="outline" size="sm" className="mt-3">
            Send report
          </Button>
          {reportNote ? <p className="mt-2 text-sm text-ink">{reportNote}</p> : null}
        </form>
      </main>

      <SiteFooter />
    </div>
  )
}
