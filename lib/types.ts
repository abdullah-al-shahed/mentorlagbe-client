export type Tuition = {
  _id: string
  title: string
  subject: string
  classLevel: string
  mode: "Online" | "Offline"
  location: string
  monthlyFee: number
  daysPerWeek: number
  bannerImage: string
  description: string
  tutorName: string
  tutorEmail: string
  approvalStatus: "pending" | "approved" | "rejected"
  isActive: boolean
  createdAt: string
  tutor?: { name: string; image?: string; bio?: string; plan?: string }
}

export type TuitionsResponse = {
  items: Tuition[]
  total: number
  page: number
  totalPages: number
}

export type Application = {
  _id: string
  tuitionId: string
  tuitionTitle: string
  subject: string
  monthlyFee: number
  tutorName: string
  tutorEmail: string
  studentName: string
  studentEmail: string
  studentPhone: string
  preferredSchedule: string
  studentNote: string
  status: "pending" | "accepted" | "rejected"
  appliedAt: string
}

export type Payment = {
  _id: string
  userEmail: string
  userName: string
  userRole: string
  planName: string
  amount: number
  currency: string
  transactionId: string
  paidAt: string
}

export type AppUser = {
  _id: string
  name: string
  email: string
  role: "student" | "tutor" | "admin"
  plan?: string
  image?: string
  createdAt: string
}