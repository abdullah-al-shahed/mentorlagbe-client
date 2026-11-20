import { Suspense } from "react"
import { TuitionFilters } from "@/components/tuition-filters"
import { TuitionCard } from "@/components/tuition-card"
import { Pagination } from "@/components/pagination"
import { publicFetch } from "@/lib/api"
import type { TuitionsResponse } from "@/lib/types"

type SP = { [key: string]: string | undefined }

async function TuitionResults({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams
  const params = new URLSearchParams()
  for (const key of ["search", "subject", "classLevel", "mode", "page"]) {
    if (sp[key]) params.set(key, sp[key] as string)
  }
  params.set("limit", "9")

  const [data, filters] = await Promise.all([
    publicFetch<TuitionsResponse>(`/tuitions?${params.toString()}`),
    publicFetch<{ subjects: string[]; classLevels: string[] }>("/tuitions/filters"),
  ])

  return (
    <>
      <p className="mt-2 text-muted-foreground">
        {data.total} verified {data.total === 1 ? "listing" : "listings"} ready for you.
      </p>

      <div className="mt-8">
        <Suspense>
          <TuitionFilters subjects={filters.subjects} classLevels={filters.classLevels} />
        </Suspense>
      </div>

      {data.items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed bg-card p-14 text-center">
          <p className="text-lg font-semibold">No tuitions match your search</p>
          <p className="mt-1 text-sm text-muted-foreground">Try changing the filters or search keyword.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((t) => (
            <TuitionCard key={t._id} tuition={t} />
          ))}
        </div>
      )}

      <Suspense>
        <Pagination page={data.page} totalPages={data.totalPages} />
      </Suspense>
    </>
  )
}

function ResultsSkeleton() {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-96 animate-pulse rounded-2xl bg-secondary" />
      ))}
    </div>
  )
}

export default function TuitionsPage({ searchParams }: { searchParams: Promise<SP> }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Browse Tuitions</h1>
      <Suspense fallback={<ResultsSkeleton />}>
        <TuitionResults searchParams={searchParams} />
      </Suspense>
    </div>
  )
}