import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Briefcase, Users, Smartphone, Zap, Bell } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            FijiJobs
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/jobs" className="text-sm font-medium hover:text-blue-600">
              Find Jobs
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section - Mobile First */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Find Your Dream Job in{" "}
            <span className="text-blue-600">Fiji</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            The mobile-first job platform connecting Fiji&apos;s top talent with leading employers.
            Fast, simple, and built for your phone.
          </p>

          {/* Job Search - Mobile Optimized */}
          <div className="mt-10 w-full max-w-2xl">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Job title or keyword"
                      className="pl-10"
                    />
                  </div>
                  <Button className="w-full sm:w-auto">
                    Search Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Active Jobs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">200+</div>
                <div className="text-sm text-gray-600">Employers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">5K+</div>
                <div className="text-sm text-gray-600">Job Seekers</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/auth/signup?role=job_seeker">
              <Button size="lg" className="w-full sm:w-auto">
                <Users className="mr-2 h-5 w-5" />
                I&apos;m Looking for Work
              </Button>
            </Link>
            <Link href="/auth/signup?role=employer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Briefcase className="mr-2 h-5 w-5" />
                I&apos;m Hiring
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Why Choose FijiJobs?
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Built specifically for Fiji&apos;s mobile-first workforce
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1: Mobile First */}
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Mobile-First Design</CardTitle>
                <CardDescription>
                  Optimized for your smartphone. Search and apply from anywhere, even with limited data.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2: One-Click Apply */}
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>One-Click Apply</CardTitle>
                <CardDescription>
                  Apply to jobs with a single tap. No lengthy forms, no hassle. Your profile does the work.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3: WhatsApp Alerts */}
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>WhatsApp Notifications</CardTitle>
                <CardDescription>
                  Get instant job alerts and updates via WhatsApp. Never miss an opportunity.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4: Free for Job Seekers */}
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>100% Free for Job Seekers</CardTitle>
                <CardDescription>
                  Create your profile, search unlimited jobs, and apply as many times as you want. Completely free.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 5: Local Employers */}
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Top Fiji Employers</CardTitle>
                <CardDescription>
                  Connect with leading companies across tourism, retail, finance, government, and more.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 6: Fast & Lightweight */}
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Loads quickly even on slow connections. Under 1MB - respecting your data plan.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-blue-100">
            Join thousands of Fijians finding their next opportunity
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="outline" className="w-full border-white bg-white text-blue-600 hover:bg-blue-50 sm:w-auto">
                Create Free Account
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" variant="ghost" className="w-full text-white hover:bg-blue-700 sm:w-auto">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-bold text-gray-900">FijiJobs</h3>
              <p className="mt-2 text-sm text-gray-600">
                Fiji&apos;s mobile-first job platform
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">For Job Seekers</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li><Link href="/jobs" className="hover:text-blue-600">Browse Jobs</Link></li>
                <li><Link href="/auth/signup" className="hover:text-blue-600">Create Profile</Link></li>
                <li><Link href="/saved" className="hover:text-blue-600">Saved Jobs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">For Employers</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li><Link href="/employer/post-job" className="hover:text-blue-600">Post a Job</Link></li>
                <li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
                <li><Link href="/employer/dashboard" className="hover:text-blue-600">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Company</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2025 FijiJobs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
