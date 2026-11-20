import Link from "next/link"
import { GraduationCap } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="MentorLagbe home">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <GraduationCap className="size-5" />
      </span>
      <span className="font-[family-name:var(--font-jakarta)] text-xl font-bold tracking-tight">
        Mentor<span className="text-primary">Lagbe</span>
      </span>
    </Link>
  )
}