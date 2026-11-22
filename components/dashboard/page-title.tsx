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

export function ErrorState({ text, onRetry }: { text: string; onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
      <p className="text-sm text-muted-foreground">{text}</p>
      <button
        onClick={onRetry}
        className="mt-3 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-secondary"
      >
        Try again
      </button>
    </div>
  )
}