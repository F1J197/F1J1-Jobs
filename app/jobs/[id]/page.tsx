"use client"

import { useState } from "react"
import { use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  MapPin, Briefcase, DollarSign, Clock, Building2, Share2,
  Bookmark, ArrowLeft, CheckCircle
} from "lucide-react"
import { MOCK_JOBS, getJobById, getCompanyById, MOCK_APPLICATIONS } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")

  const job = getJobById(id)
  const company = job ? getCompanyById(job.companyId) : null

  if (!job || !company) {
    return <div className="min-h-screen flex items-center justify-center">Job not found</div>
  }

  const hasApplied = MOCK_APPLICATIONS.some(
    app => app.jobId === id && app.userId === user?.id
  )

  const handleApply = () => {
    if (!isAuthenticated) {
      router.push(`/signin?redirect=/jobs/${id}`)
      return
    }
    setShowApplicationForm(true)
  }

  const handleSubmitApplication = () => {
    // Mock application submission
    MOCK_APPLICATIONS.push({
      id: `a${MOCK_APPLICATIONS.length + 1}`,
      jobId: id,
      userId: user!.id,
      cvUrl: user!.cvUrl || '/cv/placeholder.pdf',
      coverLetter,
      status: 'PENDING',
      appliedAt: 'Just now'
    })
    setApplicationSubmitted(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  }

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-4">
              Your application for {job.title} at {company.name} has been sent successfully.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            FijiJobs
          </Link>
          <nav className="flex items-center gap-4">
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

      <div className="container mx-auto px-4 py-8">
        <Link href="/jobs" className="inline-flex items-center text-blue-600 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Jobs
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
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
                      <span className="text-sm text-gray-500">Posted {job.postedAt}</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
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
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {hasApplied ? (
                    <Button disabled className="bg-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Applied
                    </Button>
                  ) : showApplicationForm ? (
                    <Button disabled>Applying...</Button>
                  ) : (
                    <Button onClick={handleApply} size="lg">
                      Apply Now
                    </Button>
                  )}
                  <Button variant="outline" size="lg">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save Job
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Application Form */}
            {showApplicationForm && !hasApplied && (
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Application</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Your CV:</strong> {user?.cvUrl || 'No CV uploaded'}
                    </p>
                    {!user?.cvUrl && (
                      <p className="text-sm text-orange-600">
                        Note: You'll need to upload a CV to complete your application
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cover Letter (Optional)
                    </label>
                    <textarea
                      className="w-full min-h-[150px] rounded-lg border border-gray-300 p-3 text-sm"
                      placeholder="Tell the employer why you're a great fit for this role..."
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSubmitApplication} className="flex-1">
                      Submit Application
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowApplicationForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{job.responsibilities}</p>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <DollarSign className="h-4 w-4" />
                    Salary
                  </div>
                  <p className="text-green-600 font-semibold">{job.salary}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Briefcase className="h-4 w-4" />
                    Job Type
                  </div>
                  <p>{job.type.replace('_', ' ')}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="h-4 w-4" />
                    Location
                  </div>
                  <p>{job.location}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Clock className="h-4 w-4" />
                    Experience Level
                  </div>
                  <p>{job.experienceLevel}</p>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </div>
                  <p>{job.industry}</p>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {company.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {company.verified && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Verified Employer
                  </div>
                )}
                <p className="text-sm text-gray-600">{company.description}</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Industry:</span> {company.industry}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {company.location}
                  </div>
                  {company.website && (
                    <div>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
