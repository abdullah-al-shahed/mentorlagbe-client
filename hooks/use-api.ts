"use client"

import { useCallback, useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"

export function useApi<T>(path: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setData(await apiFetch<T>(path))
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load")
    } finally {
      setLoading(false)
    }
  }, [path])

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, reload: load }
}