"use client"

import { createBrowserClient } from "@/lib/supabase/createBrowserClient"
import type { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const supabase = createBrowserClient()

      const getUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
        setLoading(false)
      }

      getUser()

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null)
        setLoading(false)
      })

      return () => {
        subscription.unsubscribe()
      }
    } catch (error) {
      console.error("Error initializing auth:", error)
      setLoading(false)
    }
  }, [])

  return { user, loading }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const supabase = createBrowserClient()

      const getUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
        setLoading(false)
      }

      getUser()

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null)
        setLoading(false)
      })

      return () => {
        subscription.unsubscribe()
      }
    } catch (error) {
      console.error("Error initializing auth:", error)
      setLoading(false)
    }
  }, [])

  return { user, loading }
}
