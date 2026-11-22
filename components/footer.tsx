import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/logo"

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Find verified tutors and mentorship batches by subject, level and budget. Learn smarter, closer to home.
          </p>
          <div className="flex gap-3">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="rounded-full border p-2 hover:bg-secondary">
              <XIcon />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full border p-2 hover:bg-secondary">
              <FacebookIcon />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/tuitions" className="hover:text-primary">Browse Tuitions</Link></li>
            <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-primary">How It Works</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold">Contact</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="size-4" /> support@mentorlagbe.com</li>
            <li className="flex items-center gap-2"><Phone className="size-4" /> +880 1700-000000</li>
            <li className="flex items-center gap-2"><MapPin className="size-4" /> Chittagong, Bangladesh</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
       © 2026 MentorLagbe. All rights reserved.
      </div>
    </footer>
  )
}