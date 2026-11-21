import type { LucideIcon } from "lucide-react"

export function StatCard({
  label,
  value,
  Icon,
}: {
  label: string
  value: string | number
  Icon: LucideIcon
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card p-5">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-6" />
      </span>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold capitalize">{value}</p>
      </div>
    </div>
  )
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{children}</div>
}