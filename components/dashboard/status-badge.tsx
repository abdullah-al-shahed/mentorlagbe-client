import { cn } from "@/lib/utils"

const STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  accepted: "bg-emerald-100 text-emerald-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
  active: "bg-emerald-100 text-emerald-800",
  closed: "bg-stone-200 text-stone-700",
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium capitalize", STYLES[status] ?? STYLES.pending)}>
      {status}
    </span>
  )
}