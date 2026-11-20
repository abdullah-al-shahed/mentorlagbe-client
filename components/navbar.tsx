"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { toast } from "sonner"
import { Logo } from "@/components/logo"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { signOut, useSession } from "@/lib/auth-client"
import { clearApiToken } from "@/lib/api"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Tuitions", href: "/tuitions" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/#how-it-works" },
]

const ROLE_STYLE: Record<string, string> = {
  student: "bg-sky-100 text-sky-800",
  tutor: "bg-emerald-100 text-emerald-800",
  admin: "bg-amber-100 text-amber-800",
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [open, setOpen] = useState(false)
  const user = session?.user

  const handleSignOut = async () => {
    await signOut()
    clearApiToken()
    toast.success("Signed out successfully")
    setOpen(false)
    router.push("/")
    router.refresh()
  }

  const UserBlock = () =>
    user ? (
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex items-center gap-2.5">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name} className="size-9 rounded-full object-cover" />
          ) : (
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">{user.name}</span>
            <span
              className={cn(
                "w-fit rounded-full px-2 py-0.5 text-[11px] font-medium capitalize",
                ROLE_STYLE[user.role] ?? ROLE_STYLE.student
              )}
            >
              {user.role}
            </span>
          </div>
        </div>
        <Link href="/dashboard" onClick={() => setOpen(false)} className={buttonVariants({ variant: "outline" })}>
          Dashboard
        </Link>
        <Link href="/dashboard/profile" onClick={() => setOpen(false)} className={buttonVariants({ variant: "ghost" })}>
          Update Profile
        </Link>
        <button onClick={handleSignOut} className={buttonVariants({ variant: "ghost" })}>
          Sign Out
        </button>
      </div>
    ) : (
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <Link href="/sign-in" onClick={() => setOpen(false)} className={buttonVariants({ variant: "ghost" })}>
          Sign In
        </Link>
        <Link href="/sign-up" onClick={() => setOpen(false)} className={buttonVariants()}>
          Sign Up
        </Link>
      </div>
    )

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href) && !link.href.includes("#")
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:block">{!isPending && <UserBlock />}</div>

        <button
          className="rounded-lg border p-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-background px-4 py-4 lg:hidden">
          <nav className="mb-4 flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {!isPending && <UserBlock />}
        </div>
      )}
    </header>
  )
}