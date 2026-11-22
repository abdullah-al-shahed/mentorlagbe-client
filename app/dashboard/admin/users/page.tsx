"use client"

import { toast } from "sonner"
import { PageTitle, TableSkeleton, ErrorState } from "@/components/dashboard/page-title" // ✅
import { useApi } from "@/hooks/use-api"
import { apiFetch } from "@/lib/api"
import { useSession } from "@/lib/auth-client"
import type { AppUser } from "@/lib/types"

export default function AdminUsersPage() {
  const { data: session } = useSession()
  const { data, loading, error, reload } = useApi<AppUser[]>("/users") // ✅

  const changeRole = async (id: string, role: string) => {
    try {
      await apiFetch(`/users/${id}/role`, { method: "PATCH", body: JSON.stringify({ role }) })
      toast.success("Role updated")
      reload()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not update role")
    }
  }

  return (
    <>
      <PageTitle title="User Management" subtitle="Manage roles of all registered users." />

      {loading ? (
        <TableSkeleton />
      ) : error || !data ? (
        <ErrorState text={error ?? "Could not load users"} onRetry={reload} /> // ✅
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b bg-secondary/60 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {data.map((u) => (
                <tr key={u._id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3 capitalize">{u.plan ?? "free"}</td>
                  <td className="px-4 py-3">{u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-GB") : "-"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role}
                      disabled={u.email === session?.user.email}
                      onChange={(e) => changeRole(u._id, e.target.value)}
                      className="h-9 rounded-lg border bg-card px-2 text-sm capitalize disabled:opacity-50"
                      aria-label={`Role of ${u.name}`}
                    >
                      <option value="student">student</option>
                      <option value="tutor">tutor</option>
                      <option value="admin">admin</option>
                    </select>
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