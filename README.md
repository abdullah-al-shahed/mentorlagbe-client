# MentorLagbe

Smart tuition and mentorship platform connecting students with verified tutors.
Tutors post tuition batches, students apply and track status, admins moderate
listings and revenue. Both roles can upgrade to Pro via Stripe.

## Live Links
- Live site: https://mentorlagbe-client-shahed.vercel.app/
- Server: https://mentorlagbe-server-git-main-abdullah-al-shahed.vercel.app/
- Server repo: https://github.com/abdullah-al-shahed/mentorlagbe-server.git>

## Test Credentials
| Role | Email | Password |
|---|---|---|
| Admin | mdadmin@gmail.com | mdadmiN-2026 |
| Tutor | mdtutor@gmail.com | mdtutoR-2026 |

## Key Features
- Role-based auth (Student / Tutor / Admin) with BetterAuth and JWT
- Browse tuitions with server-side search, filters and pagination
- Tuition details with student-only apply form and duplicate prevention
- Tutor dashboard: post, edit, delete, close tuitions and manage applicants
- Admin dashboard: user roles, tuition approval, Stripe transactions
- Free plan limit (2 tuitions) and Pro plan upgrade via Stripe Checkout
- Image upload with ImgBB, responsive collapsible dashboard sidebar
- Loading skeletons, custom 404 and error pages, toast notifications

## Tech Stack
Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, BetterAuth,
Express, MongoDB, Stripe, ImgBB

## npm Packages
next, react, better-auth, @better-auth/mongo-adapter, mongodb, jsonwebtoken,
stripe, @stripe/stripe-js, sonner, lucide-react, tailwindcss, shadcn/ui

## Run Locally
1. `npm install`
2. `npm run dev`