"use client"

import { useCallback, useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"

export function useApi<T>(path: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [version, setVersion] = useState(0)

  //
  const reload = useCallback(() => setVersion((v) => v + 1), [])

  useEffect(() => {
    let cancelled = false
    apiFetch<T>(path)
      .then((res) => {
        if (cancelled) return
        setData(res)
        setError(null)
      })
      .catch((e) => {
        if (cancelled) return
        setError(e instanceof Error ? e.message : "Failed to load")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [path, version])

  return { data, loading, error, reload }
}