"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/auth-client"
import { clearApiToken } from "@/lib/api"

export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = String(form.get("email")).trim()
    const password = String(form.get("password"))

    if (!email || !password) return toast.error("Email and password are required")

    setLoading(true)
    const { error } = await signIn.email({ email, password, rememberMe: true })
    setLoading(false)

    if (error) {
      toast.error(error.message || "Invalid email or password")
      return
    }
    clearApiToken()
    toast.success("Welcome back!")
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage your tuitions and applications.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="Your password" required />
        </div>
        <Button type="submit" className="h-11 w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to MentorLagbe?{" "}
        <Link href="/sign-up" className="font-medium text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </AuthShell>
  )
}