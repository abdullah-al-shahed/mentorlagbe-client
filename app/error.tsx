"use client"

import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-sm text-muted-foreground">An unexpected error occurred. Please try again.</p>
      <div className="mt-2 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>Back to Home</Link>
      </div>
    </div>
  )
}