"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { PageTitle } from "@/components/dashboard/page-title"
import { ImageUpload } from "@/components/dashboard/image-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { apiFetch } from "@/lib/api"
import { authClient, useSession } from "@/lib/auth-client"
import type { AppUser } from "@/lib/types"

export default function ProfilePage() {
  const { data: session } = useSession()
  const [form, setForm] = useState({ name: "", phone: "", bio: "", image: "" })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    apiFetch<AppUser & { phone?: string; bio?: string }>("/users/me")
      .then((u) =>
        setForm({ name: u.name ?? "", phone: u.phone ?? "", bio: u.bio ?? "", image: u.image ?? "" })
      )
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.name.trim().length < 2) return toast.error("Please enter your name")
    setSaving(true)
    try {
      await apiFetch("/users/me", { method: "PATCH", body: JSON.stringify(form) })
      await authClient.updateUser({ name: form.name.trim(), image: form.image || undefined })
      toast.success("Profile updated")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageTitle title="Update Profile" subtitle="Keep your details fresh so tutors and students can trust you." />
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 rounded-2xl border bg-card p-6">
        <div className="space-y-2">
          <Label>Profile picture</Label>
          <ImageUpload value={form.image} onChange={(image) => setForm((p) => ({ ...p, image }))} label="Upload photo" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={session?.user.email ?? ""} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="01XXXXXXXXX" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" rows={4} value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} placeholder="Tell us about yourself" />
        </div>
        <Button type="submit" className="h-11" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
      </form>
    </>
  )
}