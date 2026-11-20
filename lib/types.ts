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