import { ClipboardCheck, Search, Send, UserPlus } from "lucide-react"

const STEPS = [
  { Icon: UserPlus, title: "Create an account", text: "Sign up as a student or a tutor in under a minute." },
  { Icon: Search, title: "Search or post", text: "Students filter tuitions. Tutors publish their batches." },
  { Icon: Send, title: "Apply & connect", text: "Students apply with a preferred schedule and a short note." },
  { Icon: ClipboardCheck, title: "Start learning", text: "Tutors accept requests and classes begin right away." },
]

export function HowItWorks() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map(({ Icon, title, text }, i) => (
        <div key={title} className="flex h-full flex-col rounded-2xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-6" />
            </span>
            <span className="text-3xl font-bold text-primary/20">0{i + 1}</span>
          </div>
          <h3 className="mt-5 text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{text}</p>
        </div>
      ))}
    </div>
  )
}