import { createBrowserClient as createBrowserClientOriginal } from "@supabase/ssr"

export function createBrowserSupabaseClient() {
  return createBrowserClientOriginal(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
