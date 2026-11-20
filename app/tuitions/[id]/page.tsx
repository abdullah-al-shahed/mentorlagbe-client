import { notFound } from "next/navigation"
import { BadgeCheck, CalendarDays, Clock, MapPin, Monitor, Wallet } from "lucide-react"
import { ApplyPanel } from "@/components/apply-panel"
import { publicFetch } from "@/lib/api"
import type { Tuition } from "@/lib/types"

export default async function TuitionDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let tuition: Tuition
  try {
    tuition = await publicFetch<Tuition>(`/tuitions/${id}`)
  } catch {
    notFound()
  }

  const info = [
    { label: "Monthly fee", value: `৳${tuition.monthlyFee.toLocaleString()}`, Icon: Wallet },
    { label: "Schedule", value: `${tuition.daysPerWeek} days / week`, Icon: CalendarDays },
    { label: tuition.mode, value: tuition.location || tuition.mode, Icon: tuition.mode === "Online" ? Monitor : MapPin },
    { label: "Class level", value: tuition.classLevel, Icon: Clock },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <div className="h-64 overflow-hidden rounded-2xl bg-secondary sm:h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tuition.bannerImage || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=70"}
              alt={tuition.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{tuition.subject}</span>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{tuition.title}</h1>
          </div>

          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {info.map(({ label, value, Icon }) => (
              <div key={label} className="rounded-2xl border bg-card p-4">
                <Icon className="size-5 text-primary" />
                <dt className="mt-2 text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-0.5 text-sm font-semibold">{value}</dd>
              </div>
            ))}
          </dl>

          <section className="rounded-2xl border bg-card p-6">
            <h2 className="text-xl font-semibold">About this tuition</h2>
            <p className="mt-3 leading-relaxed whitespace-pre-line text-muted-foreground">{tuition.description}</p>
          </section>

          <section className="rounded-2xl border bg-card p-6">
            <h2 className="text-xl font-semibold">Your tutor</h2>
            <div className="mt-4 flex items-start gap-4">
              {tuition.tutor?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={tuition.tutor.image} alt={tuition.tutorName} className="size-14 rounded-full object-cover" />
              ) : (
                <span className="flex size-14 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
                  {tuition.tutorName.charAt(0)}
                </span>
              )}
              <div>
                <p className="flex items-center gap-1.5 font-semibold">
                  {tuition.tutorName}
                  {tuition.tutor?.plan === "pro" && <BadgeCheck className="size-4 text-amber-500" aria-label="Verified Pro tutor" />}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{tuition.tutor?.bio || "Experienced tutor on MentorLagbe."}</p>
              </div>
            </div>
          </section>
        </div>

        <aside>
          <ApplyPanel tuition={tuition} />
        </aside>
      </div>
    </div>
  )
}