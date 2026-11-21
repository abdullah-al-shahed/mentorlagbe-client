import { TuitionCard } from "@/components/tuition-card"
import { publicFetch } from "@/lib/api"
import type { TuitionsResponse } from "@/lib/types"

export async function FeaturedTuitions() {
  let items: TuitionsResponse["items"] = []
  try {
    const data = await publicFetch<TuitionsResponse>("/tuitions?limit=6")
    items = data.items
  } catch {
    items = []
  }

  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed bg-card p-10 text-center text-sm text-muted-foreground">
        Tuitions will appear here soon.
      </p>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <TuitionCard key={t._id} tuition={t} />
      ))}
    </div>
  )
}

export function FeaturedSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-96 animate-pulse rounded-2xl bg-secondary" />
      ))}
    </div>
  )
}