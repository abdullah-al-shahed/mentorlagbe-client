"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { CheckCircle2, Info } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "@/lib/auth-client"
import { apiFetch } from "@/lib/api"
import type { Tuition } from "@/lib/types"

export function ApplyPanel({ tuition }: { tuition: Tuition }) {
  const { data: session, isPending } = useSession()
  const [applied, setApplied] = useState(false)
  const [loading, setLoading] = useState(false)
  const user = session?.user

  useEffect(() => {
    if (user?.role !== "student") return
    apiFetch<{ applied: boolean }>(`/applications/check/${tuition._id}`)
      .then((r) => setApplied(r.applied))
      .catch(() => {})
  }, [user?.role, tuition._id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const studentPhone = String(form.get("phone")).trim()
    const preferredSchedule = String(form.get("schedule")).trim()
    const studentNote = String(form.get("note")).trim()

    if (!/^[0-9+\-\s]{10,15}$/.test(studentPhone)) return toast.error("Enter a valid phone number")
    if (!preferredSchedule) return toast.error("Please add your preferred schedule")

    setLoading(true)
    try {
      await apiFetch("/applications", {
        method: "POST",
        body: JSON.stringify({ tuitionId: tuition._id, studentPhone, preferredSchedule, studentNote }),
      })
      toast.success("Application submitted successfully")
      setApplied(true)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not submit")
    } finally {
      setLoading(false)
    }
  }

  const shell = "sticky top-24 rounded-2xl border bg-card p-6 shadow-sm"

  const price = (
    <div className="mb-5 border-b pb-5">
      <p className="text-3xl font-bold text-primary">৳{tuition.monthlyFee.toLocaleString()}</p>
      <p className="text-sm text-muted-foreground">per month</p>
    </div>
  )

  if (isPending) return <div className={shell}>{price}<div className="h-40 animate-pulse rounded-xl bg-secondary" /></div>

  if (!user) {
    return (
      <div className={shell}>
        {price}
        <p className="mb-4 text-sm text-muted-foreground">Sign in as a student to apply for this tuition.</p>
        <Link href="/sign-in" className={buttonVariants({ className: "h-11 w-full" })}>Sign in to apply</Link>
      </div>
    )
  }

  if (user.role !== "student") {
    return (
      <div className={shell}>
        {price}
        <div className="flex gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
          <Info className="mt-0.5 size-4 shrink-0" />
          Only students can apply for tuitions. You are signed in as a {user.role}.
        </div>
        <Button className="mt-4 h-11 w-full" disabled>Apply Now</Button>
      </div>
    )
  }

  if (applied) {
    return (
      <div className={shell}>
        {price}
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <CheckCircle2 className="size-10 text-primary" />
          <p className="font-semibold">You have applied</p>
          <p className="text-sm text-muted-foreground">Track the status in your dashboard.</p>
          <Link href="/dashboard/student/my-applications" className={buttonVariants({ variant: "outline", className: "mt-2" })}>
            My Applications
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={shell}>
      {price}
      <h2 className="mb-4 text-lg font-semibold">Apply for Tuition</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" placeholder="01XXXXXXXXX" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="schedule">Preferred schedule</Label>
          <Input id="schedule" name="schedule" placeholder="e.g. Sat, Mon, Wed - 6 PM" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="note">Learning note</Label>
          <Textarea id="note" name="note" rows={3} placeholder="What do you want to improve?" />
        </div>
        <Button type="submit" className="h-11 w-full" disabled={loading}>
          {loading ? "Submitting..." : "Apply Now"}
        </Button>
      </div>
    </form>
  )
}