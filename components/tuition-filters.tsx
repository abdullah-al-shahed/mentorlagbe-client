"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"

const selectClass =
  "h-10 rounded-lg border bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/30"

export function TuitionFilters({ subjects, classLevels }: { subjects: string[]; classLevels: string[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") ?? "")

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }

  // সার্চ টাইপ করার ০.৪ সেকেন্ড পর রিকোয়েস্ট যাবে
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (searchParams.get("search") ?? "")) update("search", search.trim())
    }, 400)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const hasFilters = ["search", "subject", "classLevel", "mode"].some((k) => searchParams.get(k))

  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or subject..."
          className="h-10 pl-9"
          aria-label="Search tuitions"
        />
      </div>

      <select className={selectClass} value={searchParams.get("subject") ?? ""} onChange={(e) => update("subject", e.target.value)} aria-label="Filter by subject">
        <option value="">All Subjects</option>
        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      <select className={selectClass} value={searchParams.get("classLevel") ?? ""} onChange={(e) => update("classLevel", e.target.value)} aria-label="Filter by class level">
        <option value="">All Levels</option>
        {classLevels.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select className={selectClass} value={searchParams.get("mode") ?? ""} onChange={(e) => update("mode", e.target.value)} aria-label="Filter by mode">
        <option value="">Online & Offline</option>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
      </select>

      {hasFilters && (
        <button
          onClick={() => { setSearch(""); router.push(pathname) }}
          className="flex h-10 items-center gap-1 rounded-lg px-3 text-sm text-muted-foreground hover:bg-secondary"
        >
          <X className="size-4" /> Clear
        </button>
      )}
    </div>
  )
}