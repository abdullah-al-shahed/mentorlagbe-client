import { PricingSection } from "@/components/pricing-section"

export const metadata = { title: "Pricing | MentorLagbe" }

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Simple pricing for everyone</h1>
        <p className="mt-3 text-muted-foreground">
          Start free. Upgrade to Pro once you need more reach or faster booking.
        </p>
      </div>
      <PricingSection />
    </div>
  )
}