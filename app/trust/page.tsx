import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NATIONAL_MINIMUM_HOURLY_FJD } from "@/lib/pay"

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader />
      <main className="wrap pb-16 pt-8">
        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">
          Trust
        </p>
        <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-bold tracking-tight">
          Seekers never pay to find work
        </h1>
        <div className="mt-6 max-w-[62ch] space-y-4 text-[1.02rem] leading-relaxed text-ink/85">
          <p>
            Express Interest is WhatsApp. No account. No CV. No fee to VitiWork or to the Employer
            for saying you are interested. If a Listing asks for a registration fee, training bond,
            or “unlock fee”, report it.
          </p>
          <p>
            National minimum wage is FJD {NATIONAL_MINIMUM_HOURLY_FJD.toFixed(2)}/hour. We reject
            structured pay below that when an Employer publishes.
          </p>
          <p>
            Verified Employer means a person checked the business name and a working phone or
            Facebook page. It is not a government licence.
          </p>
          <p>
            We store searches, Listing views, Express Interest clicks (Listing + time, optional
            first name), Reports, and optional Watch emails. We do not store WhatsApp message
            bodies or Seeker phone numbers. We do not run a Facebook pixel or Google Analytics.
          </p>
          <p>
            Rate limits stop this site being used as a WhatsApp spam cannon. If something looks
            unsafe or trafficking-adjacent, report it and we take the Listing down.
          </p>
        </div>
        <Link href="/jobs" className="mt-8 inline-flex min-h-11 items-center text-accent">
          Back to jobs
        </Link>
      </main>
      <SiteFooter />
    </div>
  )
}
