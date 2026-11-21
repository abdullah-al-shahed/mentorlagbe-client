"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/dashboard/image-upload"

export const SUBJECTS = ["Math", "Physics", "Chemistry", "Biology", "English", "Programming", "IELTS", "General"]
export const CLASS_LEVELS = ["Class 1-5", "Class 6-8", "Class 9-10", "Class 11-12", "University", "Any Level"]

export type TuitionFormValues = {
  title: string
  subject: string
  classLevel: string
  mode: string
  location: string
  monthlyFee: string
  daysPerWeek: string
  description: string
  bannerImage: string
}

const EMPTY: TuitionFormValues = {
  title: "", subject: "Math", classLevel: "Class 9-10", mode: "Online",
  location: "", monthlyFee: "", daysPerWeek: "3", description: "", bannerImage: "",
}

const selectClass = "h-10 w-full rounded-lg border bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/30"

export function TuitionForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial?: Partial<TuitionFormValues>
  submitLabel: string
  onSubmit: (values: TuitionFormValues) => Promise<void>
}) {
  const [values, setValues] = useState<TuitionFormValues>({ ...EMPTY, ...initial })
  const [saving, setSaving] = useState(false)
  const set = (key: keyof TuitionFormValues) => (v: string) => setValues((p) => ({ ...p, [key]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (values.title.trim().length < 5) return toast.error("Title must be at least 5 characters")
    if (!values.monthlyFee || Number(values.monthlyFee) <= 0) return toast.error("Enter a valid monthly fee")
    if (values.mode === "Offline" && !values.location.trim()) return toast.error("Location is required for offline tuition")
    if (values.description.trim().length < 20) return toast.error("Description must be at least 20 characters")

    setSaving(true)
    try {
      await onSubmit(values)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={values.title} onChange={(e) => set("title")(e.target.value)} placeholder="e.g. HSC Physics Concept Builder" />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <select id="subject" className={selectClass} value={values.subject} onChange={(e) => set("subject")(e.target.value)}>
            {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="classLevel">Class level</Label>
          <select id="classLevel" className={selectClass} value={values.classLevel} onChange={(e) => set("classLevel")(e.target.value)}>
            {CLASS_LEVELS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mode">Mode</Label>
          <select id="mode" className={selectClass} value={values.mode} onChange={(e) => set("mode")(e.target.value)}>
            <option>Online</option>
            <option>Offline</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="location">Location / Link</Label>
          <Input id="location" value={values.location} onChange={(e) => set("location")(e.target.value)} placeholder="Zoom or area name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="monthlyFee">Monthly fee (৳)</Label>
          <Input id="monthlyFee" type="number" min={0} value={values.monthlyFee} onChange={(e) => set("monthlyFee")(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="daysPerWeek">Days per week</Label>
          <Input id="daysPerWeek" type="number" min={1} max={7} value={values.daysPerWeek} onChange={(e) => set("daysPerWeek")(e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Banner image</Label>
        <ImageUpload value={values.bannerImage} onChange={set("bannerImage")} label="Upload banner" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={5} value={values.description} onChange={(e) => set("description")(e.target.value)} placeholder="Describe your batch, teaching style and schedule" />
      </div>

      <Button type="submit" className="h-11" disabled={saving}>{saving ? "Saving..." : submitLabel}</Button>
    </form>
  )
}