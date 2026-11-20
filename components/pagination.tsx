"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const go = (p: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(p))
    router.push(`${pathname}?${params.toString()}`)
  }

  const btn = "flex size-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors disabled:opacity-40"

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
      <button className={cn(btn, "hover:bg-secondary")} disabled={page <= 1} onClick={() => go(page - 1)} aria-label="Previous page">
        <ChevronLeft className="size-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => go(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(btn, p === page ? "border-primary bg-primary text-primary-foreground" : "hover:bg-secondary")}
        >
          {p}
        </button>
      ))}
      <button className={cn(btn, "hover:bg-secondary")} disabled={page >= totalPages} onClick={() => go(page + 1)} aria-label="Next page">
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}