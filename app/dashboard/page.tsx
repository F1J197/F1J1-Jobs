"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Briefcase, FileText, Bookmark, LogOut, Plus, Users, TrendingUp,
  MapPin, Clock, CheckCircle, XCircle, Eye
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { MOCK_APPLICATIONS, MOCK_JOBS, getJobById, getCompanyById, getApplicationsByUser, getJobsByCompany, getApplicationsByJob } from "@/lib/mock-data"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin')
    }
  }, [isAuthenticated, router])

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Job Seeker Dashboard
  if (user.role === 'JOB_SEEKER') {
    const myApplications = getApplicationsByUser(user.id)

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b bg-white">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              FijiJobs
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/jobs" className="text-sm font-medium hover:text-blue-600">
                Browse Jobs
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </nav>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-600 mt-2">Track your applications and discover new opportunities</p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Applications</CardTitle>
                <FileText className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{myApplications.length}</div>
                <p className="text-xs text-gray-600 mt-1">Total submitted</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{MOCK_JOBS.filter(j => j.status === 'ACTIVE').length}</div>
                <p className="text-xs text-gray-600 mt-1">Currently available</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
                <Bookmark className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-gray-600 mt-1">Bookmarked</p>
              </CardContent>
            </Card>
          </div>

          {/* My Applications */}
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
              <CardDescription>
                {myApplications.length === 0
                  ? "You haven't applied to any jobs yet"
                  : `Tracking ${myApplications.length} application(s)`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {myApplications.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Start your job search today!</p>
                  <Link href="/jobs">
                    <Button>Browse Jobs</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myApplications.map((application) => {
                    const job = getJobById(application.jobId)
                    const company = job ? getCompanyById(job.companyId) : null

                    if (!job || !company) return null

                    return (
                      <div
                        key={application.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <Link href={`/jobs/${job.id}`} className="hover:text-blue-600">
                              <h3 className="font-semibold text-lg">{job.title}</h3>
                            </Link>
                            <p className="text-gray-600 text-sm mt-1">{company.name}</p>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Applied {application.appliedAt}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                              application.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                              application.status === 'REVIEWED' ? 'bg-blue-100 text-blue-700' :
                              application.status === 'SHORTLISTED' ? 'bg-green-100 text-green-700' :
                              application.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {application.status === 'PENDING' && <Clock className="h-3 w-3" />}
                              {application.status === 'REVIEWED' && <Eye className="h-3 w-3" />}
                              {application.status === 'SHORTLISTED' && <CheckCircle className="h-3 w-3" />}
                              {application.status === 'REJECTED' && <XCircle className="h-3 w-3" />}
                              {application.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Employer Dashboard
  const myCompany = user.companyId ? getCompanyById(user.companyId) : null
  const myJobs = myCompany ? getJobsByCompany(myCompany.id) : []
  const totalApplications = myJobs.reduce((sum, job) =>
    sum + getApplicationsByJob(job.id).length, 0
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            FijiJobs
          </Link>
          <nav className="flex items-center gap-4">
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {myCompany ? `${myCompany.name} Dashboard` : 'Employer Dashboard'}
            </h1>
            <p className="text-gray-600 mt-2">Manage your job postings and candidates</p>
          </div>
          <Link href="/employer/post-job">
            <Button size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myJobs.filter(j => j.status === 'ACTIVE').length}</div>
              <p className="text-xs text-gray-600 mt-1">Currently live</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications}</div>
              <p className="text-xs text-gray-600 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-gray-600 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <CheckCircle className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myCompany?.tier || 'FREE'}</div>
              <p className="text-xs text-gray-600 mt-1">Current plan</p>
            </CardContent>
          </Card>
        </div>

        {/* My Job Postings */}
        <Card>
          <CardHeader>
            <CardTitle>My Job Postings</CardTitle>
            <CardDescription>
              {myJobs.length === 0
                ? "You haven't posted any jobs yet"
                : `Managing ${myJobs.length} job posting(s)`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {myJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Start finding great talent today!</p>
                <Link href="/employer/post-job">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Post Your First Job
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myJobs.map((job) => {
                  const applications = getApplicationsByJob(job.id)

                  return (
                    <div
                      key={job.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
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
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Posted {job.postedAt}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {applications.length} applicant(s)
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/jobs/${job.id}`}>
                            <Button variant="outline" size="sm">View</Button>
                          </Link>
                          <Link href={`/employer/jobs/${job.id}/applicants`}>
                            <Button size="sm">
                              View Applicants ({applications.length})
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
      </div>
    </div>
  )
}
