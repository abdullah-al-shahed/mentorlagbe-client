import { Code2, Atom, Calculator, Languages } from "lucide-react"
import Link from "next/link"
import { publicFetch } from "@/lib/api"

const SUBJECTS = [
  { name: "Math", Icon: Calculator },
  { name: "Physics", Icon: Atom },
  { name: "Programming", Icon: Code2 },
  { name: "IELTS", Icon: Languages },
]

type Stats = { tutors: number; students: number; activeTuitions: number }

export async function PlatformStats() {
  let stats: Stats = { tutors: 0, students: 0, activeTuitions: 0 }
  try {
    stats = await publicFetch<Stats>("/stats/public")
  } catch {}

  const items = [
    { label: "Verified tutors", value: stats.tutors },
    { label: "Active students", value: stats.students },
    { label: "Live tuitions", value: stats.activeTuitions },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((s) => (
        <div key={s.label} className="rounded-2xl border bg-card p-6 text-center">
          <p className="text-4xl font-bold text-primary">{s.value}+</p>
          <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  )
}

export function TopSubjects() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {SUBJECTS.map(({ name, Icon }) => (
        <Link
          key={name}
          href={`/tuitions?subject=${encodeURIComponent(name)}`}
          className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md"
        >
          <span className="flex size-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <Icon className="size-7" />
          </span>
          <span className="font-semibold">{name}</span>
        </Link>
      ))}
    </div>
  )
}

const TESTIMONIALS = [
  { name: "Ayesha Rahman", role: "HSC Student", text: "I found a physics tutor in my area within a day. Applying was effortless." },
  { name: "Imran Hossain", role: "Tutor", text: "My batch filled up in a week. The dashboard keeps all applicants organised." },
  { name: "Farhana Akter", role: "Parent", text: "Verified tutors and clear fees. It saved us so much searching time." },
]

export function Testimonials() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <figure key={t.name} className="flex h-full flex-col rounded-2xl border bg-card p-6">
          <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">“{t.text}”</blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
              {t.name.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}