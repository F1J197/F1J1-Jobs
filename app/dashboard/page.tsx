"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  Briefcase, FileText, Bookmark, LogOut, Plus, Users, TrendingUp,
  MapPin, Clock, CheckCircle, XCircle, Eye
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { allListings } from "@/components/listing-store"
import {
  getJobById, getCompanyById, getApplicationsByUser, getApplicationsByJob
} from "@/lib/mock-data"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin")
    }
  }, [isAuthenticated, router])

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (user.role === "JOB_SEEKER") {
    const myApplications = getApplicationsByUser(user.id)

    return (
      <div className="min-h-screen bg-bg">
        <SiteHeader active="account" />

        <main className="wrap pb-16 pt-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">
                Seeker
              </p>
              <h1 className="text-[clamp(1.4rem,3vw,1.75rem)] font-bold tracking-tight">
                Welcome back, {user.name}
              </h1>
              <p className="mt-2 text-muted">Track applications and find the next role.</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-1 h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{myApplications.length}</div>
                <p className="mt-1 text-xs text-muted">Submitted through a profile</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open listings</CardTitle>
                <Briefcase className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allListings().filter((listing) => listing.status === "ACTIVE").length}</div>
                <p className="mt-1 text-xs text-muted">Currently available</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved</CardTitle>
                <Bookmark className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="mt-1 text-xs text-muted">Bookmarked</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>My applications</CardTitle>
              <CardDescription>
                {myApplications.length === 0
                  ? "You have not applied through a profile yet"
                  : `Tracking ${myApplications.length} application(s)`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {myApplications.length === 0 ? (
                <div className="py-12 text-center">
                  <Briefcase className="mx-auto mb-4 h-12 w-12 text-muted" />
                  <p className="mb-4 text-muted">Browse listings and Express Interest on WhatsApp.</p>
                  <Link href="/jobs">
                    <Button>Browse jobs</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myApplications.map((application) => {
                    const job = getJobById(application.jobId)
                    const company = job ? getCompanyById(job.companyId) : null
                    if (!job || !company) return null

                    return (
                      <div key={application.id} className="rounded-[14px] border border-line p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <Link href={`/jobs/${job.id}`} className="hover:text-accent">
                              <h3 className="text-lg font-semibold">{job.title}</h3>
                            </Link>
                            <p className="mt-1 text-sm text-muted">{company.name}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {job.town}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Applied {application.appliedAt}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${
                              application.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : application.status === "REVIEWED"
                                  ? "bg-blue-100 text-blue-700"
                                  : application.status === "SHORTLISTED"
                                    ? "bg-green-100 text-green-700"
                                    : application.status === "REJECTED"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-bg text-muted"
                            }`}
                          >
                            {application.status === "PENDING" && <Clock className="h-3 w-3" />}
                            {application.status === "REVIEWED" && <Eye className="h-3 w-3" />}
                            {application.status === "SHORTLISTED" && <CheckCircle className="h-3 w-3" />}
                            {application.status === "REJECTED" && <XCircle className="h-3 w-3" />}
                            {application.status}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const myCompany = user.companyId ? getCompanyById(user.companyId) : null
  const employerId = user.companyId ?? user.id
  const myListings = allListings().filter((listing) => listing.employerId === employerId)
  const totalApplications = myListings.reduce(
    (sum, listing) => sum + getApplicationsByJob(listing.id).length,
    0,
  )

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader active="account" />

      <main className="wrap pb-16 pt-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">
              Employer
            </p>
            <h1 className="text-[clamp(1.4rem,3vw,1.75rem)] font-bold tracking-tight">
              {myCompany ? `${myCompany.name}` : "Employer dashboard"}
            </h1>
            <p className="mt-2 text-muted">Manage listings and who has expressed interest.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/employer/post-job">
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-1 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active listings</CardTitle>
              <Briefcase className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myListings.filter((listing) => listing.status === "ACTIVE").length}</div>
              <p className="mt-1 text-xs text-muted">Currently live</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <Users className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications}</div>
              <p className="mt-1 text-xs text-muted">Profile path</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="mt-1 text-xs text-muted">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plan</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myListings.length === 0 ? "Free First Post" : "Standard"}</div>
              <p className="mt-1 text-xs text-muted">Listing tier available</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My listings</CardTitle>
            <CardDescription>
              {myListings.length === 0
                ? "You have not posted any listings yet"
                : `Managing ${myListings.length} listing(s)`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {myListings.length === 0 ? (
              <div className="py-12 text-center">
                <Briefcase className="mx-auto mb-4 h-12 w-12 text-muted" />
                <p className="mb-4 text-muted">Your first listing can be a Free First Post.</p>
                <Link href="/employer/post-job">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Post New Job
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myListings.map((listing) => {
                  const applications = getApplicationsByJob(listing.id)
                  const tier = listing.featured ? "Featured" : "Standard"
                  return (
                    <div key={listing.id} className="rounded-[14px] border border-line p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{listing.title}</h3>
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {listing.town}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Expires {listing.expiresAt}
                            </span>
                            <span>{tier}</span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {applications.length} applicant(s)
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/jobs/${listing.id}`}>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
