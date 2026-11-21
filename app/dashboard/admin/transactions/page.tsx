"use client"

import { EmptyState, PageTitle, TableSkeleton } from "@/components/dashboard/page-title"
import { useApi } from "@/hooks/use-api"
import type { Payment } from "@/lib/types"

export default function TransactionsPage() {
  const { data, loading } = useApi<Payment[]>("/payments")

  return (
    <>
      <PageTitle title="Transactions" subtitle="All Pro plan payments received through Stripe." />
      {loading ? (
        <TableSkeleton />
      ) : !data?.length ? (
        <EmptyState text="No payments recorded yet." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b bg-secondary/60 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p._id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium">{p.userName}</p>
                    <p className="text-xs text-muted-foreground">{p.userEmail}</p>
                  </td>
                  <td className="px-4 py-3 capitalize">{p.userRole}</td>
                  <td className="px-4 py-3">{p.planName}</td>
                  <td className="px-4 py-3 font-medium">${p.amount}</td>
                  <td className="max-w-[200px] truncate px-4 py-3 font-mono text-xs" title={p.transactionId}>{p.transactionId}</td>
                  <td className="px-4 py-3">{new Date(p.paidAt).toLocaleDateString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}