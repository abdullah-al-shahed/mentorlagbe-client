const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

let cached: { token: string; expiresAt: number } | null = null

export const clearApiToken = () => {
  cached = null
}

const getToken = async () => {
  if (cached && cached.expiresAt > Date.now()) return cached.token
  const res = await fetch("/api/token")
  if (!res.ok) throw new Error("Please sign in again")
  const { token } = await res.json()
  cached = { token, expiresAt: Date.now() + 50 * 60 * 1000 }
  return token as string
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })
  const data = await res.json().catch(() => null)
  if (!res.ok) throw new Error(data?.message || "Request failed")
  return data as T
}

// লগইন ছাড়া পাবলিক API (tuitions list ইত্যাদি)
export async function publicFetch<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to load data")
  return res.json() as Promise<T>
}