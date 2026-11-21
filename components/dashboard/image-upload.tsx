"use client"

import { useState } from "react"
import { ImagePlus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { uploadImage } from "@/lib/imgbb"

export function ImageUpload({
  value,
  onChange,
  label = "Upload image",
}: {
  value: string
  onChange: (url: string) => void
  label?: string
}) {
  const [uploading, setUploading] = useState(false)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      onChange(await uploadImage(file))
      toast.success("Image uploaded")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-secondary">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <ImagePlus className="size-6 text-muted-foreground" />
        )}
      </div>
      <label className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border bg-card px-4 text-sm font-medium hover:bg-secondary">
        {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
        {uploading ? "Uploading..." : value ? "Change image" : label}
        <input type="file" accept="image/*" className="sr-only" onChange={handleFile} disabled={uploading} />
      </label>
    </div>
  )
}