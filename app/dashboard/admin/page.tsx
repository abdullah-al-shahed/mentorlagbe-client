"use client"

import { CircleDollarSign, Clock, GraduationCap, Users } from "lucide-react"
import { StatCard, StatGrid } from "@/components/dashboard/stat-card"
import { PageTitle, ErrorState } from "@/components/dashboard/page-title" 
import { useApi } from "@/hooks/use-api"

type Stats = { totalUsers: number; totalTutors: number; pendingTuitions: number; approvedTuitions: number; totalRevenue: number }

export default function AdminOverview() {
  const { data, loading, error, reload } = useApi<Stats>("/stats/admin") 

  return (
    <>
      <PageTitle title="Admin Overview" subtitle="Platform statistics at a glance." />

      {loading ? (
        <div className="h-28 animate-pulse rounded-2xl bg-secondary" />
      ) : error || !data ? (
        <ErrorState text={error ?? "Could not load platform stats"} onRetry={reload} /> 
      ) : (
        <StatGrid>
          <StatCard label="Total Users" value={data.totalUsers} Icon={Users} />
          <StatCard label="Total Tutors" value={data.totalTutors} Icon={GraduationCap} />
          <StatCard label="Pending / Approved" value={`${data.pendingTuitions} / ${data.approvedTuitions}`} Icon={Clock} />
          <StatCard label="Stripe Revenue" value={`$${data.totalRevenue}`} Icon={CircleDollarSign} />
        </StatGrid>
      )}
    </>
  )
}