"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"

export default function DashboardIndex() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (isPending) return
    router.replace(session ? `/dashboard/${session.user.role}` : "/sign-in")
  }, [session, isPending, router])

  return <div className="mx-auto mt-24 h-10 w-48 animate-pulse rounded-xl bg-secondary" />
}