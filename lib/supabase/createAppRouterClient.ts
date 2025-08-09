// Only use this file in the app/ directory, not pages/
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// For App Router (app/*) - uses Next.js 13+ cookies()
export async function createServerClientAppRouter() {
  try {
    const cookieStore = await cookies()

    return createSupabaseServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value || null
          },
          set(name: string, value: string, options: any = {}) {
            try {
              cookieStore.set(name, value, options)
            } catch (error) {
              console.error("Error setting cookie in App Router:", error)
            }
          },
          remove(name: string, options: any = {}) {
            try {
              cookieStore.set(name, "", { ...options, expires: new Date(0) })
            } catch (error) {
              console.error("Error removing cookie in App Router:", error)
            }
          },
        },
      },
    )
  } catch (error) {
    console.error("Error creating Supabase App Router client:", error)
    throw new Error("Failed to create Supabase App Router client")
  }
}
