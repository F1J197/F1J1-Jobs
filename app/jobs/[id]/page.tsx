"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { formatListingType } from "@/components/listing-format"
import { getCatalog } from "@/components/listing-store"
import { open } from "@/lib/express-interest"
import { useAuth } from "@/lib/auth-context"
import { MOCK_APPLICATIONS, getCompanyById } from "@/lib/mock-data"
import type { Listing } from "@/lib/listing"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [listing, setListing] = useState<Listing | null | undefined>(undefined)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")

  useEffect(() => {
    let cancelled = false
    getCatalog()
      .getById(id)
      .then((found) => {
        if (!cancelled) setListing(found ?? null)
      })
    return () => {
      cancelled = true
    }
  }, [id])

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

  const company = getCompanyById(listing.employerId)
  const interestUrl = open({ listing, seekerName: user?.name })
  const hasApplied = MOCK_APPLICATIONS.some(
    (app) => app.jobId === id && app.userId === user?.id,
  )

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
        <p className="mt-2 text-[1.05rem] text-muted">{listing.employerName}</p>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-[10px] bg-surface px-3 py-2.5">
            <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
              Pay
            </span>
            <strong className="text-[0.9rem] font-semibold">{listing.pay || "Pay on enquiry"}</strong>
          </div>
          <div className="rounded-[10px] bg-surface px-3 py-2.5">
            <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
              Town
            </span>
            <strong className="text-[0.9rem] font-semibold">{listing.town}</strong>
          </div>
          <div className="rounded-[10px] bg-surface px-3 py-2.5">
            <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
              Type
            </span>
            <strong className="text-[0.9rem] font-semibold">{formatListingType(listing.type)}</strong>
          </div>
          <div className="rounded-[10px] bg-surface px-3 py-2.5">
            <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
              Category
            </span>
            <strong className="text-[0.9rem] font-semibold">{listing.category}</strong>
          </div>
          <div className="rounded-[10px] bg-surface px-3 py-2.5">
            <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
              Expires
            </span>
            <strong className="text-[0.9rem] font-semibold">{listing.expiresAt}</strong>
          </div>
        </div>

        <div className="mt-6 grid gap-2">
          <a
            href={interestUrl}
            target="_blank"
            rel="noopener noreferrer"
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
          Express Interest opens WhatsApp. No account required.
        </p>

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
      </main>

      <SiteFooter />
    </div>
  )
}
