import Link from "next/link"
import { Clock, MapPin, Monitor } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import type { Tuition } from "@/lib/types"

export function TuitionCard({ tuition }: { tuition: Tuition }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-44 w-full bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tuition.bannerImage || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=70"}
          alt={tuition.title}
          className="h-full w-full object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-white/95 text-foreground hover:bg-white">
          {tuition.mode === "Online" ? <Monitor className="mr-1 size-3" /> : <MapPin className="mr-1 size-3" />}
          {tuition.mode}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">{tuition.subject}</span>
          <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-muted-foreground">{tuition.classLevel}</span>
        </div>

        <h3 className="line-clamp-2 min-h-[3.25rem] text-lg leading-snug font-semibold">{tuition.title}</h3>

        <p className="text-sm text-muted-foreground">by {tuition.tutorName}</p>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="text-xl font-bold text-primary">৳{tuition.monthlyFee.toLocaleString()}</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" /> {tuition.daysPerWeek} days/week · per month
            </p>
          </div>
          <Link href={`/tuitions/${tuition._id}`} className={buttonVariants({ size: "sm" })}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}