"use client"

import { CircleDollarSign, Clock, GraduationCap, Users } from "lucide-react"
import { StatCard, StatGrid } from "@/components/dashboard/stat-card"
import { PageTitle } from "@/components/dashboard/page-title"
import { useApi } from "@/hooks/use-api"

type Stats = { totalUsers: number; totalTutors: number; pendingTuitions: number; approvedTuitions: number; totalRevenue: number }

export default function AdminOverview() {
  const { data, loading } = useApi<Stats>("/stats/admin")

  return (
    <>
      <PageTitle title="Admin Overview" subtitle="Platform statistics at a glance." />
      {loading || !data ? (
        <div className="h-28 animate-pulse rounded-2xl bg-secondary" />
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