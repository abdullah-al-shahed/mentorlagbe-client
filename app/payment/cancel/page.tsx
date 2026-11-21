import Link from "next/link"
import { XCircle } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export default function PaymentCancelPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-12">
      <div className="flex w-full flex-col items-center gap-3 rounded-2xl border bg-card p-8 text-center shadow-sm">
        <XCircle className="size-12 text-amber-500" />
        <h1 className="text-2xl font-bold">Payment cancelled</h1>
        <p className="text-sm text-muted-foreground">No money was charged. You can upgrade any time.</p>
        <Link href="/pricing" className={buttonVariants({ className: "mt-2 h-11 w-full" })}>Back to pricing</Link>
      </div>
    </div>
  )
}