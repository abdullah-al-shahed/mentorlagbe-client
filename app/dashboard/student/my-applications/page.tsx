"use client"

import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { EmptyState, PageTitle, TableSkeleton } from "@/components/dashboard/page-title"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"
import type { Application } from "@/lib/types"

export default function MyApplicationsPage() {
  const { data, loading, reload } = useApi<Application[]>("/applications/mine")

  const cancel = async (id: string) => {
    if (!window.confirm("Cancel this application?")) return
    try {
      await apiFetch(`/applications/${id}`, { method: "DELETE" })
      toast.success("Application cancelled")
      reload()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not cancel")
    }
  }

  return (
    <>
      <PageTitle title="My Applications" subtitle="Track every tuition you applied for." />
      {loading ? (
        <TableSkeleton />
      ) : !data?.length ? (
        <EmptyState text="You haven't applied for any tuition yet." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b bg-secondary/60 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Tuition</th>
                <th className="px-4 py-3">Tutor</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((a) => (
                <tr key={a._id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{a.tuitionTitle}</td>
                  <td className="px-4 py-3">
                    <p>{a.tutorName}</p>
                    <p className="text-xs text-muted-foreground">{a.tutorEmail}</p>
                  </td>
                  <td className="px-4 py-3">৳{a.monthlyFee.toLocaleString()}</td>
                  <td className="px-4 py-3">{new Date(a.appliedAt).toLocaleDateString("en-GB")}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3 text-right">
                    {a.status === "pending" && (
                      <button onClick={() => cancel(a._id)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-red-600 hover:bg-red-50">
                        <Trash2 className="size-4" /> Cancel
                      </button>
                    )}
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