"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { apiFetch } from "@/lib/api"

type Result = { success: boolean; payment?: { planName: string; amount: number; transactionId: string } }

function SuccessContent() {
  const sessionId = useSearchParams().get("session_id")
  const [state, setState] = useState<"loading" | "ok" | "error">("loading")
  const [payment, setPayment] = useState<Result["payment"]>()
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true
    if (!sessionId) {
      setState("error")
      return
    }
    apiFetch<Result>("/payments/verify", { method: "POST", body: JSON.stringify({ sessionId }) })
      .then((r) => {
        setPayment(r.payment)
        setState(r.success ? "ok" : "error")
      })
      .catch(() => setState("error"))
  }, [sessionId])

  if (state === "loading") {
    return (
      <div className="flex flex-col items-center gap-3 py-10">
        <Loader2 className="size-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Confirming your payment...</p>
      </div>
    )
  }

  if (state === "error") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <XCircle className="size-12 text-red-500" />
        <h1 className="text-2xl font-bold">Could not verify payment</h1>
        <p className="text-sm text-muted-foreground">If money was deducted, contact support with your Stripe receipt.</p>
        <Link href="/pricing" className={buttonVariants({ className: "mt-2" })}>Back to pricing</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <CheckCircle2 className="size-14 text-primary" />
      <h1 className="text-2xl font-bold">Welcome to Pro!</h1>
      <p className="text-sm text-muted-foreground">Your plan is upgraded successfully.</p>
      {payment && (
        <dl className="mt-3 w-full space-y-2 rounded-xl bg-secondary p-4 text-left text-sm">
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Plan</dt><dd className="font-medium">{payment.planName}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Amount</dt><dd className="font-medium">${payment.amount}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Transaction</dt><dd className="max-w-[180px] truncate font-mono text-xs" title={payment.transactionId}>{payment.transactionId}</dd></div>
        </dl>
      )}
      <Link href="/dashboard" className={buttonVariants({ className: "mt-3 h-11 w-full" })}>Go to Dashboard</Link>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-2xl border bg-card p-8 shadow-sm">
        <Suspense fallback={null}>
          <SuccessContent />
        </Suspense>
      </div>
    </div>
  )
}