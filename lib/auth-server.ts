import { createServerClientAppRouter } from "@/lib/supabase/createAppRouterClient"
import { redirect } from "next/navigation"
import type { User } from "@supabase/supabase-js"

export async function getUser(): Promise<User | null> {
  try {
    const supabase = await createServerClientAppRouter()

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      console.error("Error getting user:", error)
      return null
    }

    return user
  } catch (error) {
    console.error("Error in getUser:", error)
    return null
  }
}

export async function getProfile() {
  try {
    const user = await getUser()

    if (!user) {
      return null
    }

    const supabase = await createServerClientAppRouter()

    const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (error) {
      console.error("Error getting profile:", error)
      return null
    }

    return profile
  } catch (error) {
    console.error("Error in getProfile:", error)
    return null
  }
}

export async function requireAuth() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return user
}
