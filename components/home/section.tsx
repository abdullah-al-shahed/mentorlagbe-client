export function Section({
  id,
  title,
  subtitle,
  children,
  muted,
}: {
  id?: string
  title: string
  subtitle?: string
  children: React.ReactNode
  muted?: boolean
}) {
  return (
    <section id={id} className={muted ? "border-y bg-card" : ""}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}