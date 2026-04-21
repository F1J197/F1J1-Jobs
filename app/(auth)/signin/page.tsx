"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Facebook } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const success = await login(email, password)

    if (success) {
      router.push(redirect)
    } else {
      setError("Invalid credentials. Try: seeker@example.com or employer@example.com (any password)")
      setLoading(false)
    }
  }

  const handleDemoLogin = async (role: 'seeker' | 'employer') => {
    setLoading(true)
    const demoEmail = role === 'seeker' ? 'seeker@example.com' : 'employer@example.com'
    const success = await login(demoEmail, 'demo')

    if (success) {
      router.push(redirect)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            FijiJobs
          </Link>
          <p className="mt-2 text-gray-600">Welcome back!</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Demo: Use seeker@example.com or employer@example.com
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Demo Buttons */}
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium text-gray-700">Quick Demo Login:</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleDemoLogin('seeker')}
                  variant="outline"
                  className="flex-1"
                  disabled={loading}
                >
                  Job Seeker
                </Button>
                <Button
                  onClick={() => handleDemoLogin('employer')}
                  variant="outline"
                  className="flex-1"
                  disabled={loading}
                >
                  Employer
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or sign in with email</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-600 font-medium hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-blue-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
