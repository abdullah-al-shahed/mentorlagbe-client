"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BookPlus, ClipboardList, CreditCard, FileText, LayoutDashboard,
  Library, PanelLeftClose, PanelLeftOpen, Menu, UserCog, Users, X, Inbox, type LucideIcon,
} from "lucide-react"
import { useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

type Item = { label: string; href: string; Icon: LucideIcon }

const MENU: Record<string, Item[]> = {
  student: [
    { label: "Overview", href: "/dashboard/student", Icon: LayoutDashboard },
    { label: "My Applications", href: "/dashboard/student/my-applications", Icon: FileText },
    { label: "Update Profile", href: "/dashboard/profile", Icon: UserCog },
  ],
  tutor: [
    { label: "Overview", href: "/dashboard/tutor", Icon: LayoutDashboard },
    { label: "Post a Tuition", href: "/dashboard/tutor/post-tuition", Icon: BookPlus },
    { label: "My Tuitions", href: "/dashboard/tutor/my-tuitions", Icon: Library },
    { label: "Applicants", href: "/dashboard/tutor/applicants", Icon: Inbox },
    { label: "Update Profile", href: "/dashboard/profile", Icon: UserCog },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", Icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", Icon: Users },
    { label: "Tuition Approval", href: "/dashboard/admin/tuitions", Icon: ClipboardList },
    { label: "Transactions", href: "/dashboard/admin/transactions", Icon: CreditCard },
    { label: "Update Profile", href: "/dashboard/profile", Icon: UserCog },
  ],
}

type SidebarUser = { name: string; role: string; image?: string | null }

function SidebarNav({
  items,
  pathname,
  compact,
  onNavigate,
}: {
  items: Item[]
  pathname: string
  compact: boolean
  onNavigate?: () => void
}) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map(({ label, href, Icon }) => {
        const active = href === pathname || (href.split("/").length > 3 && pathname.startsWith(href))
        return (
          <Link
            key={href}
            href={href}
            title={label}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              compact && "justify-center"
            )}
          >
            <Icon className="size-5 shrink-0" />
            {!compact && <span>{label}</span>}
          </Link>
        )
      })}
    </nav>
  )
}

function SidebarProfile({ user, compact }: { user: SidebarUser; compact: boolean }) {
  return (
    <div className={cn("mb-4 flex items-center gap-3 rounded-xl bg-secondary p-3", compact && "justify-center")}>
      {user.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.image} alt={user.name} className="size-10 rounded-full object-cover" />
      ) : (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
          {user.name.charAt(0).toUpperCase()}
        </span>
      )}
      {!compact && (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs capitalize text-muted-foreground">{user.role}</p>
        </div>
      )}
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, isPending } = useSession()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const user = session?.user

  useEffect(() => {
    if (isPending) return
    if (!user) {
      router.replace("/sign-in")
      return
    }
    const section = pathname.split("/")[2]
    if (["student", "tutor", "admin"].includes(section) && section !== user.role) {
      router.replace(`/dashboard/${user.role}`)
    }
  }, [isPending, user, pathname, router])

  if (isPending || !user) {
    return <div className="mx-auto mt-24 h-64 max-w-5xl animate-pulse rounded-2xl bg-secondary" />
  }

  const items = MENU[user.role] ?? MENU.student

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Desktop sidebar */}
      <aside className={cn("hidden shrink-0 border-r bg-card p-4 transition-[width] duration-200 lg:block", collapsed ? "w-[84px]" : "w-64")}>
        <div className="sticky top-20">
          <SidebarProfile user={user} compact={collapsed} />
          <SidebarNav items={items} pathname={pathname} compact={collapsed} />
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-card p-4 shadow-xl">
            <button className="mb-3 rounded-lg border p-2" onClick={() => setMobileOpen(false)} aria-label="Close sidebar">
              <X className="size-4" />
            </button>
            <SidebarProfile user={user} compact={false} />
            <SidebarNav items={items} pathname={pathname} compact={false} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex h-14 items-center gap-3 border-b bg-background px-4 sm:px-6">
          <button className="rounded-lg border p-2 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open sidebar">
            <Menu className="size-4" />
          </button>
          <button className="hidden rounded-lg border p-2 lg:block" onClick={() => setCollapsed((v) => !v)} aria-label="Toggle sidebar">
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </button>
          <p className="text-sm text-muted-foreground">
            Signed in as <span className="font-medium capitalize text-foreground">{user.role}</span>
          </p>
        </div>
        <div className="w-full p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  )
}