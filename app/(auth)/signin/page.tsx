"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/dashboard"
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
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

  const handleDemoLogin = async (role: "seeker" | "employer") => {
    setLoading(true)
    const demoEmail = role === "seeker" ? "seeker@example.com" : "employer@example.com"
    const success = await login(demoEmail, "demo")

    if (success) {
      router.push(redirect)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-xs font-bold text-surface">
              VW
            </span>
            VitiWork
          </Link>
          <p className="mt-2 text-muted">Welcome back</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Demo: seeker@example.com or employer@example.com
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 rounded-[10px] bg-bg p-4">
              <p className="text-sm font-medium text-ink">Quick demo login</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleDemoLogin("seeker")}
                  variant="outline"
                  className="flex-1"
                  disabled={loading}
                >
                  Seeker
                </Button>
                <Button
                  onClick={() => handleDemoLogin("employer")}
                  variant="outline"
                  className="flex-1"
                  disabled={loading}
                >
                  Employer
                </Button>
              </div>
            </div>

            {error && (
              <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

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
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-accent hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <SignInForm />
    </Suspense>
  )
}
