"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

type NavKey = "home" | "jobs" | "post" | "account"

export function SiteHeader({ active }: { active?: NavKey }) {
  const { isAuthenticated } = useAuth()

  const linkClass = (key: NavKey) =>
    `min-h-11 inline-flex items-center px-3 text-sm font-medium rounded-full ${
      active === key ? "text-ink bg-ink/5" : "text-muted hover:text-ink"
    }`

  return (
    <div className="sticky top-0 z-50 pt-3 pointer-events-none">
      <div className="wrap pointer-events-auto">
        <header className="flex min-h-14 items-center justify-between gap-3 rounded-full border border-line bg-surface px-4 py-1.5 shadow-[0_8px_28px_color-mix(in_srgb,var(--ink)_5%,transparent)]">
          <Link href="/" className="flex items-center gap-2 text-[0.95rem] font-bold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-[0.7rem] font-bold text-surface">
              VW
            </span>
            VitiWork
          </Link>
          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            <Link href="/" className={linkClass("home")}>
              Home
            </Link>
            <Link href="/jobs" className={linkClass("jobs")}>
              Jobs
            </Link>
            <Link href="/employer/post-job" className={linkClass("post")}>
              Post a job
            </Link>
          </nav>
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          ) : (
            <Link href="/signin">
              <Button size="sm">Sign in</Button>
            </Link>
          )}
        </header>
        <nav className="mt-2.5 flex gap-1 overflow-x-auto md:hidden" aria-label="Mobile sections">
          <Link
            href="/"
            className={`min-h-11 shrink-0 inline-flex items-center rounded-full border px-3.5 text-sm font-semibold ${
              active === "home" ? "border-ink text-ink" : "border-line bg-surface text-muted"
            }`}
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className={`min-h-11 shrink-0 inline-flex items-center rounded-full border px-3.5 text-sm font-semibold ${
              active === "jobs" ? "border-ink text-ink" : "border-line bg-surface text-muted"
            }`}
          >
            Jobs
          </Link>
          <Link
            href="/employer/post-job"
            className={`min-h-11 shrink-0 inline-flex items-center rounded-full border px-3.5 text-sm font-semibold ${
              active === "post" ? "border-ink text-ink" : "border-line bg-surface text-muted"
            }`}
          >
            Post
          </Link>
        </nav>
      </div>
    </div>
  )
}
