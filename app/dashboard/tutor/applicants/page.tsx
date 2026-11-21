"use client"

import { Check, X } from "lucide-react"
import { toast } from "sonner"
import { EmptyState, PageTitle, TableSkeleton } from "@/components/dashboard/page-title"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"
import type { Application } from "@/lib/types"

export default function ApplicantsPage() {
  const { data, loading, reload } = useApi<Application[]>("/applications/tutor")

  const update = async (id: string, status: "accepted" | "rejected") => {
    try {
      await apiFetch(`/applications/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) })
      toast.success(`Application ${status}`)
      reload()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed")
    }
  }

  return (
    <>
      <PageTitle title="Applicants" subtitle="Students who applied to your tuitions." />
      {loading ? (
        <TableSkeleton />
      ) : !data?.length ? (
        <EmptyState text="No applications received yet." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b bg-secondary/60 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Tuition</th>
                <th className="px-4 py-3">Schedule & note</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((a) => (
                <tr key={a._id} className="border-b align-top last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium">{a.studentName}</p>
                    <p className="text-xs text-muted-foreground">{a.studentEmail}</p>
                  </td>
                  <td className="px-4 py-3">{a.studentPhone}</td>
                  <td className="px-4 py-3">{a.tuitionTitle}</td>
                  <td className="max-w-[240px] px-4 py-3">
                    <p>{a.preferredSchedule}</p>
                    {a.studentNote && <p className="mt-1 text-xs text-muted-foreground">{a.studentNote}</p>}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => update(a._id, "accepted")} disabled={a.status === "accepted"} className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white disabled:opacity-40">
                        <Check className="size-3.5" /> Accept
                      </button>
                      <button onClick={() => update(a._id, "rejected")} disabled={a.status === "rejected"} className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white disabled:opacity-40">
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