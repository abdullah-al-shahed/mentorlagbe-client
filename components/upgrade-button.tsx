"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Button, buttonVariants } from "@/components/ui/button"
import { useSession } from "@/lib/auth-client"
import { apiFetch } from "@/lib/api"

export function UpgradeButton({ label = "Subscribe with Stripe" }: { label?: string }) {
  const { data: session, isPending } = useSession()
  const [loading, setLoading] = useState(false)
  const user = session?.user

  if (isPending) return <Button className="h-11 w-full" disabled>Loading...</Button>

  if (!user) {
    return (
      <Link href="/sign-in" className={buttonVariants({ className: "h-11 w-full" })}>
        Sign in to upgrade
      </Link>
    )
  }

  if (user.role === "admin") {
    return <Button className="h-11 w-full" disabled>Not available for admins</Button>
  }

  if (user.plan === "pro") {
    return <Button className="h-11 w-full" disabled>You are on Pro</Button>
  }

  const handleClick = async () => {
    setLoading(true)
    try {
      const { url } = await apiFetch<{ url: string }>("/payments/create-checkout-session", {
        method: "POST",
      })
      window.location.href = url
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not start checkout")
      setLoading(false)
    }
  }

  return (
    <Button className="h-11 w-full" onClick={handleClick} disabled={loading}>
      {loading ? "Redirecting to Stripe..." : label}
    </Button>
  )
}