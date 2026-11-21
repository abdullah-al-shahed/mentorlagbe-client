"use client"

import { CheckCircle2, Clock, Crown, FileText } from "lucide-react"
import Link from "next/link"
import { StatCard, StatGrid } from "@/components/dashboard/stat-card"
import { PageTitle } from "@/components/dashboard/page-title"
import { buttonVariants } from "@/components/ui/button"
import { useApi } from "@/hooks/use-api"

type Stats = { totalApplied: number; accepted: number; pending: number; plan: string }

export default function StudentOverview() {
  const { data, loading } = useApi<Stats>("/stats/student")

  return (
    <>
      <PageTitle title="Student Overview" subtitle="A quick look at your learning journey." />
      {loading || !data ? (
        <div className="h-28 animate-pulse rounded-2xl bg-secondary" />
      ) : (
        <>
          <StatGrid>
            <StatCard label="Total Applied" value={data.totalApplied} Icon={FileText} />
            <StatCard label="Accepted" value={data.accepted} Icon={CheckCircle2} />
            <StatCard label="Pending" value={data.pending} Icon={Clock} />
            <StatCard label="Current Plan" value={data.plan} Icon={Crown} />
          </StatGrid>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tuitions" className={buttonVariants()}>Find more tuitions</Link>
            {data.plan !== "pro" && (
              <Link href="/pricing" className={buttonVariants({ variant: "outline" })}>Upgrade to Pro</Link>
            )}
          </div>
        </>
      )}
    </>
  )
}