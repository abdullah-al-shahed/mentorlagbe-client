import { Check } from "lucide-react"
import { UpgradeButton } from "@/components/upgrade-button"
import { cn } from "@/lib/utils"

const PLANS = [
  {
    audience: "Tutors",
    items: [
      {
        name: "Free",
        price: "$0",
        features: ["Post up to 2 tuitions", "Receive student applications", "Basic profile"],
        pro: false,
      },
      {
        name: "Pro Tutor",
        price: "$15",
        features: ["Unlimited tuition posts", "Verified badge on profile", "Priority in listings", "Everything in Free"],
        pro: true,
      },
    ],
  },
  {
    audience: "Students",
    items: [
      {
        name: "Free",
        price: "$0",
        features: ["Browse all tuitions", "Apply to tuitions", "Track application status"],
        pro: false,
      },
      {
        name: "Pro Student",
        price: "$10",
        features: ["Priority booking", "Highlighted applications", "Everything in Free"],
        pro: true,
      },
    ],
  },
]

export function PricingSection() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {PLANS.map((group) => (
        <div key={group.audience}>
          <h3 className="mb-4 text-lg font-semibold text-muted-foreground">For {group.audience}</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            {group.items.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "flex h-full flex-col rounded-2xl border bg-card p-6",
                  plan.pro && "border-primary shadow-md ring-1 ring-primary/20"
                )}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold">{plan.name}</h4>
                  {plan.pro && (
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-3 text-4xl font-bold">
                  {plan.price}
                  <span className="text-sm font-normal text-muted-foreground"> {plan.pro ? "one-time" : "forever"}</span>
                </p>
                <ul className="my-6 flex-1 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.pro ? <UpgradeButton /> : (
                  <div className="flex h-11 items-center justify-center rounded-lg border text-sm text-muted-foreground">
                    Included
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}