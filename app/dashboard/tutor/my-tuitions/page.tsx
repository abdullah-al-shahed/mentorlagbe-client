"use client"

import { useState } from "react"
import { Pencil, Power, Trash2, X } from "lucide-react"
import { toast } from "sonner"
import { EmptyState, PageTitle, TableSkeleton } from "@/components/dashboard/page-title"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { TuitionForm, type TuitionFormValues } from "@/components/dashboard/tuition-form"
import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"
import type { Tuition } from "@/lib/types"

export default function MyTuitionsPage() {
  const { data, loading, reload } = useApi<Tuition[]>("/tuitions/mine")
  const [editing, setEditing] = useState<Tuition | null>(null)

  const run = async (action: () => Promise<unknown>, success: string) => {
    try {
      await action()
      toast.success(success)
      reload()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong")
    }
  }

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this tuition permanently?")) return
    run(() => apiFetch(`/tuitions/${id}`, { method: "DELETE" }), "Tuition deleted")
  }

  const handleUpdate = async (values: TuitionFormValues) => {
    if (!editing) return
    await run(
      () => apiFetch(`/tuitions/${editing._id}`, { method: "PATCH", body: JSON.stringify(values) }),
      "Tuition updated"
    )
    setEditing(null)
  }

  return (
    <>
      <PageTitle title="My Tuitions" subtitle="Edit, close or delete the tuitions you created." />

      {loading ? (
        <TableSkeleton />
      ) : !data?.length ? (
        <EmptyState text="You haven't posted any tuition yet." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b bg-secondary/60 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Tuition</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Approval</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((t) => (
                <tr key={t._id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.subject} · {t.classLevel} · {t.mode}</p>
                  </td>
                  <td className="px-4 py-3">৳{t.monthlyFee.toLocaleString()}</td>
                  <td className="px-4 py-3"><StatusBadge status={t.approvalStatus} /></td>
                  <td className="px-4 py-3"><StatusBadge status={t.isActive ? "active" : "closed"} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button title="Edit" onClick={() => setEditing(t)} className="rounded-lg p-2 hover:bg-secondary"><Pencil className="size-4" /></button>
                      <button
                        title={t.isActive ? "Close" : "Reopen"}
                        onClick={() => run(() => apiFetch(`/tuitions/${t._id}/toggle`, { method: "PATCH" }), t.isActive ? "Tuition closed" : "Tuition reopened")}
                        className="rounded-lg p-2 hover:bg-secondary"
                      >
                        <Power className="size-4" />
                      </button>
                      <button title="Delete" onClick={() => handleDelete(t._id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 className="size-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-3xl rounded-2xl bg-card p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Edit Tuition</h2>
              <button onClick={() => setEditing(null)} className="rounded-lg p-2 hover:bg-secondary" aria-label="Close"><X className="size-4" /></button>
            </div>
            <TuitionForm
              submitLabel="Save changes"
              onSubmit={handleUpdate}
              initial={{
                title: editing.title,
                subject: editing.subject,
                classLevel: editing.classLevel,
                mode: editing.mode,
                location: editing.location,
                monthlyFee: String(editing.monthlyFee),
                daysPerWeek: String(editing.daysPerWeek),
                description: editing.description,
                bannerImage: editing.bannerImage,
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}