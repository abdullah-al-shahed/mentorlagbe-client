export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-2xl border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">{subtitle}</p>
        {children}
      </div>
    </div>
  )
}