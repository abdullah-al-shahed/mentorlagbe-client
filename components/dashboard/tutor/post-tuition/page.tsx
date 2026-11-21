"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { PageTitle } from "@/components/dashboard/page-title"
import { TuitionForm, type TuitionFormValues } from "@/components/dashboard/tuition-form"
import { apiFetch } from "@/lib/api"

export default function PostTuitionPage() {
  const router = useRouter()

  const handleSubmit = async (values: TuitionFormValues) => {
    try {
      await apiFetch("/tuitions", { method: "POST", body: JSON.stringify(values) })
      toast.success("Tuition submitted for admin approval")
      router.push("/dashboard/tutor/my-tuitions")
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not post tuition")
    }
  }

  return (
    <>
      <PageTitle title="Post a Tuition" subtitle="Free tutors can post up to 2 tuitions." />
      <div className="max-w-3xl rounded-2xl border bg-card p-6">
        <TuitionForm submitLabel="Submit for approval" onSubmit={handleSubmit} />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Need more posts?{" "}
        <Link href="/pricing" className="font-medium text-primary hover:underline">Upgrade to Pro</Link>
      </p>
    </>
  )
}