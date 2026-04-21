"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Briefcase, Clock, DollarSign, Building2 } from "lucide-react"
import { MOCK_JOBS, getCompanyById } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"

export default function JobsPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            FijiJobs
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/jobs" className="text-sm font-medium text-blue-600">
              Find Jobs
            </Link>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
            ) : (
              <Link href="/signin">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Search Section */}
      <section className="border-b bg-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Jobs in Fiji</h1>

          {/* Search Bar - Mobile Optimized */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Job title, keyword, or company"
                className="pl-10"
              />
            </div>
            <div className="relative flex-1 sm:max-w-xs">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Location"
                className="pl-10"
              />
            </div>
            <Button className="w-full sm:w-auto">
              Search
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              All Jobs
            </Button>
            <Button variant="outline" size="sm">
              <Briefcase className="mr-1 h-4 w-4" />
              Full-time
            </Button>
            <Button variant="outline" size="sm">
              <Clock className="mr-1 h-4 w-4" />
              Part-time
            </Button>
            <Button variant="outline" size="sm">
              Featured Only
            </Button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{MOCK_JOBS.length}</span> jobs
          </p>
          <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option>Most Recent</option>
            <option>Salary: High to Low</option>
            <option>Salary: Low to High</option>
          </select>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {MOCK_JOBS.map((job) => {
            const company = getCompanyById(job.companyId)
            if (!company) return null

            return (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {job.featured && (
                          <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                            Featured
                          </span>
                        )}
                        {job.urgent && (
                          <span className="rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                            Urgent
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-xl hover:text-blue-600 cursor-pointer">
                        <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                      </CardTitle>
                      <CardDescription className="mt-1 flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {company.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.type.replace('_', ' ')}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {job.description}
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 font-medium text-green-600">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-4 w-4" />
                        {job.postedAt}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Save
                      </Button>
                      <Link href={`/jobs/${job.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Showing all {MOCK_JOBS.length} jobs</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-blue-600 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold">Can&apos;t find what you&apos;re looking for?</h2>
          <p className="mt-2 text-blue-100">
            Create a profile and get job alerts sent to your WhatsApp
          </p>
          <div className="mt-6">
            <Link href="/signup?role=job_seeker">
              <Button size="lg" variant="outline" className="border-white bg-white text-blue-600 hover:bg-blue-50">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
