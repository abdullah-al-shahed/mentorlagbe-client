export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  )
}

export function TableSkeleton() {
  return <div className="h-64 animate-pulse rounded-2xl bg-secondary" />
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed bg-card p-12 text-center text-sm text-muted-foreground">
      {text}
    </div>
  )
}