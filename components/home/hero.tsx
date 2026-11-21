import Link from "next/link"
import { ArrowRight, BadgeCheck, Search } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-primary">
            <BadgeCheck className="size-4" /> Verified tutors across Bangladesh
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
            Find Your Ideal Tutor or Mentorship Batch Today
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Search by subject, class level and budget. Apply in a minute and track every response from one dashboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tuitions" className={buttonVariants({ size: "lg", className: "h-12 px-6" })}>
              <Search className="mr-2 size-4" /> Browse Tuitions
            </Link>
            <Link href="/sign-up" className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-6" })}>
              Become a Tutor <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>

        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=75"
            alt="Students studying together"
            className="h-80 w-full rounded-3xl object-cover shadow-xl sm:h-[420px]"
          />
          <div className="absolute -bottom-5 left-4 rounded-2xl border bg-card px-5 py-3 shadow-lg">
            <p className="text-2xl font-bold text-primary">4.9/5</p>
            <p className="text-xs text-muted-foreground">Average learner rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}