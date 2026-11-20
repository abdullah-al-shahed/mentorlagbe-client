"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { BookOpen, Users } from "lucide-react"
import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUp } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<"student" | "tutor">("student")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get("name")).trim()
    const email = String(form.get("email")).trim()
    const password = String(form.get("password"))

    if (name.length < 2) return toast.error("Please enter your full name")
    if (!EMAIL_REGEX.test(email)) return toast.error("Please enter a valid email")
    if (password.length < 8) return toast.error("Password must be at least 8 characters")

    setLoading(true)
    const { error } = await signUp.email({ name, email, password, role })
    setLoading(false)

    if (error) {
      toast.error(error.message || "Could not create your account")
      return
    }
    toast.success("Account created! Welcome to MentorLagbe")
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <AuthShell title="Create your account" subtitle="Join as a student or a tutor in under a minute.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>I want to join as</Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "student", label: "Student", Icon: Users },
              { value: "tutor", label: "Tutor", Icon: BookOpen },
            ].map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setRole(value as "student" | "tutor")}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-sm font-medium transition-colors",
                  role === value ? "border-primary bg-primary/10 text-primary" : "hover:bg-secondary"
                )}
              >
                <Icon className="size-5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" placeholder="Your full name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="At least 8 characters" required />
        </div>

        <Button type="submit" className="h-11 w-full" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  )
}