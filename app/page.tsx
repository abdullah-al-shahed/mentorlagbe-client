import { Suspense } from "react"
import Link from "next/link"
import { Hero } from "@/components/home/hero"
import { Section } from "@/components/home/section"
import { FeaturedTuitions, FeaturedSkeleton } from "@/components/home/featured-tuitions"
import { HowItWorks } from "@/components/home/how-it-works"
import { PlatformStats, TopSubjects, Testimonials } from "@/components/home/stats-and-subjects"
import { PricingSection } from "@/components/pricing-section"
import { buttonVariants } from "@/components/ui/button"

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section title="Latest Featured Tuitions" subtitle="Fresh, admin-approved batches you can apply to today.">
        <Suspense fallback={<FeaturedSkeleton />}>
          <FeaturedTuitions />
        </Suspense>
        <div className="mt-8 text-center">
          <Link href="/tuitions" className={buttonVariants({ variant: "outline" })}>View all tuitions</Link>
        </div>
      </Section>

      <Section id="how-it-works" muted title="How MentorLagbe Works" subtitle="From sign-up to first class in four simple steps.">
        <HowItWorks />
      </Section>

      <Section title="Top Subjects" subtitle="Popular categories students search for most.">
        <TopSubjects />
        <div className="mt-10">
          <Suspense fallback={<div className="h-28 animate-pulse rounded-2xl bg-secondary" />}>
            <PlatformStats />
          </Suspense>
        </div>
      </Section>

      <Section muted title="Simple Pricing" subtitle="Start free, upgrade to Pro when you need more.">
        <PricingSection />
      </Section>

      <Section title="What Our Community Says">
        <Testimonials />
      </Section>
    </>
  )
}