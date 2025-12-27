"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Facebook, Briefcase, Users } from "lucide-react"

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState<"job_seeker" | "employer" | null>(null)

  // If no role selected, show role selection
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold text-blue-600">
              FijiJobs
            </Link>
            <p className="mt-2 text-gray-600">Join FijiJobs today</p>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">I want to...</CardTitle>
              <CardDescription>
                Select your account type to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {/* Job Seeker Option */}
              <button
                onClick={() => setSelectedRole("job_seeker")}
                className="group relative flex flex-col items-center rounded-lg border-2 border-gray-200 p-8 hover:border-blue-600 hover:bg-blue-50 transition-all"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-600">
                  <Users className="h-8 w-8 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold">Find a Job</h3>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Browse jobs, apply with one click, get alerts
                </p>
                <div className="mt-4 text-xs font-medium text-blue-600">
                  100% Free Forever
                </div>
              </button>

              {/* Employer Option */}
              <button
                onClick={() => setSelectedRole("employer")}
                className="group relative flex flex-col items-center rounded-lg border-2 border-gray-200 p-8 hover:border-purple-600 hover:bg-purple-50 transition-all"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 group-hover:bg-purple-600">
                  <Briefcase className="h-8 w-8 text-purple-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold">Post Jobs</h3>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Find talent, manage applications, grow your team
                </p>
                <div className="mt-4 text-xs font-medium text-purple-600">
                  Free Basic Posting
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <Link href="/signin" className="text-sm text-blue-600 font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Role selected - show signup form
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            FijiJobs
          </Link>
          <p className="mt-2 text-gray-600">
            {selectedRole === "job_seeker" ? "Find your dream job" : "Find great talent"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Create {selectedRole === "job_seeker" ? "Job Seeker" : "Employer"} Account
            </CardTitle>
            <CardDescription>
              Quick sign up - takes less than 2 minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Facebook Login (Priority) */}
            <Button
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white"
              size="lg"
            >
              <Facebook className="mr-2 h-5 w-5" />
              Sign up with Facebook
            </Button>

            {/* Google Login */}
            <Button
              variant="outline"
              className="w-full"
              size="lg"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {selectedRole === "employer" && (
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company Name
                  </label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Your Company Ltd"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="text-xs text-gray-600">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Create Account
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-600 font-medium hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setSelectedRole(null)}
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            ← Change account type
          </button>
        </div>
      </div>
    </div>
  )
}
