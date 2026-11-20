import jwt from "jsonwebtoken"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

// লগইন করা ইউজারের জন্য Express API-র JWT তৈরি করে
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  const token = jwt.sign(
    { email: session.user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  )
  return NextResponse.json({ token })
}