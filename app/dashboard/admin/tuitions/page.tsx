"use client"

import { Check, X } from "lucide-react"
import { toast } from "sonner"
import { EmptyState, PageTitle, TableSkeleton } from "@/components/dashboard/page-title"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"
import type { Tuition } from "@/lib/types"

export default function AdminTuitionsPage() {
  const { data, loading, reload } = useApi<Tuition[]>("/tuitions/admin/all")

  const decide = async (id: string, approvalStatus: "approved" | "rejected") => {
    try {
      await apiFetch(`/tuitions/${id}/approval`, { method: "PATCH", body: JSON.stringify({ approvalStatus }) })
      toast.success(`Tuition ${approvalStatus}`)
      reload()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed")
    }
  }

  return (
    <>
      <PageTitle title="Tuition Approval" subtitle="Review tuitions submitted by tutors." />
      {loading ? (
        <TableSkeleton />
      ) : !data?.length ? (
        <EmptyState text="No tuitions submitted yet." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b bg-secondary/60 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Tuition</th>
                <th className="px-4 py-3">Tutor</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((t) => (
                <tr key={t._id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.subject} · {t.classLevel}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p>{t.tutorName}</p>
                    <p className="text-xs text-muted-foreground">{t.tutorEmail}</p>
                  </td>
                  <td className="px-4 py-3">৳{t.monthlyFee.toLocaleString()}</td>
                  <td className="px-4 py-3"><StatusBadge status={t.approvalStatus} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => decide(t._id, "approved")} disabled={t.approvalStatus === "approved"} className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white disabled:opacity-40">
                        <Check className="size-3.5" /> Approve
                      </button>
                      <button onClick={() => decide(t._id, "rejected")} disabled={t.approvalStatus === "rejected"} className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white disabled:opacity-40">
                        <X className="size-3.5" /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}