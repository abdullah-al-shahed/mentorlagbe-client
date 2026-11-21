"use client"

import { BadgeCheck, Crown, Inbox, Library } from "lucide-react"
import { StatCard, StatGrid } from "@/components/dashboard/stat-card"
import { PageTitle } from "@/components/dashboard/page-title"
import { useApi } from "@/hooks/use-api"

type Stats = { totalTuitions: number; activeApproved: number; totalApplicants: number; plan: string }

export default function TutorOverview() {
  const { data, loading } = useApi<Stats>("/stats/tutor")

  return (
    <>
      <PageTitle title="Tutor Overview" subtitle="Your tuitions and applicants at a glance." />
      {loading || !data ? (
        <div className="h-28 animate-pulse rounded-2xl bg-secondary" />
      ) : (
        <StatGrid>
          <StatCard label="Total Tuitions" value={data.totalTuitions} Icon={Library} />
          <StatCard label="Active & Approved" value={data.activeApproved} Icon={BadgeCheck} />
          <StatCard label="Total Applicants" value={data.totalApplicants} Icon={Inbox} />
          <StatCard label="Current Plan" value={data.plan} Icon={Crown} />
        </StatGrid>
      )}
    </>
  )
}