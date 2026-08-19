"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Briefcase, Users } from "lucide-react"

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState<"seeker" | "employer" | null>(null)

  if (!selectedRole) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-4">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-xs font-bold text-surface">
                VW
              </span>
              VitiWork
            </Link>
            <p className="mt-2 text-muted">Join VitiWork today</p>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">I want to…</CardTitle>
              <CardDescription>Select your account type to get started</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <button
                onClick={() => setSelectedRole("seeker")}
                className="group relative flex min-h-11 flex-col items-center rounded-2xl border-2 border-line p-8 transition-all hover:border-accent hover:bg-bg"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 group-hover:bg-accent">
                  <Users className="h-8 w-8 text-accent group-hover:text-surface" />
                </div>
                <h3 className="text-xl font-semibold">Find work</h3>
                <p className="mt-2 text-center text-sm text-muted">
                  Browse listings and message employers on WhatsApp
                </p>
              </button>

              <button
                onClick={() => setSelectedRole("employer")}
                className="group relative flex min-h-11 flex-col items-center rounded-2xl border-2 border-line p-8 transition-all hover:border-ink hover:bg-bg"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ink/5 group-hover:bg-ink">
                  <Briefcase className="h-8 w-8 text-ink group-hover:text-surface" />
                </div>
                <h3 className="text-xl font-semibold">I am hiring</h3>
                <p className="mt-2 text-center text-sm text-muted">
                  Post a listing. First post is free for seven days.
                </p>
              </button>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <span className="text-sm text-muted">Already have an account? </span>
            <Link href="/signin" className="text-sm font-medium text-accent hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    )
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
          <p className="mt-2 text-muted">
            {selectedRole === "seeker" ? "Find work that moves you forward" : "Hire people in Fiji"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Create {selectedRole === "seeker" ? "seeker" : "employer"} account
            </CardTitle>
            <CardDescription>Takes less than two minutes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full name
                </label>
                <Input id="name" type="text" placeholder="Mereoni Tuisavura" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>
              {selectedRole === "employer" && (
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company name
                  </label>
                  <Input id="company" type="text" placeholder="Your company" required />
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input id="password" type="password" placeholder="••••••••" required />
              </div>
              <div className="text-xs text-muted">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-accent hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
                .
              </div>
              <Button type="submit" className="w-full" size="lg">
                Create account
              </Button>
            </form>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="font-medium text-accent hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <button
            onClick={() => setSelectedRole(null)}
            className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink"
          >
            ← Change account type
          </button>
        </div>
      </div>
    </div>
  )
}
