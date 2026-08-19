import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-line py-6 text-sm text-muted">
      <div className="wrap flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-ink">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-[0.7rem] font-bold text-surface">
            VW
          </span>
          VitiWork
        </Link>
        <div className="flex flex-wrap gap-4">
          <Link href="/jobs" className="min-h-11 inline-flex items-center hover:text-ink">
            Jobs
          </Link>
          <Link href="/employer/post-job" className="min-h-11 inline-flex items-center hover:text-ink">
            Post
          </Link>
          <Link href="/signin" className="min-h-11 inline-flex items-center hover:text-ink">
            Sign in
          </Link>
          <Link href="/signup" className="min-h-11 inline-flex items-center hover:text-ink">
            Sign up
          </Link>
        </div>
      </div>
    </footer>
  )
}
