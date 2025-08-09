import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/createServerSupabaseClient"

export async function GET(request: NextRequest) {
  console.log("[AUTH CALLBACK] Starting auth callback process...")

  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const type = searchParams.get("type")
  const next = searchParams.get("next") ?? "/"

  console.log("[AUTH CALLBACK] Callback params:", { code: code ? "present" : "missing", type, next })

  if (code) {
    const supabase = createServerSupabaseClient()
    console.log("[AUTH CALLBACK] Exchanging code for session...")

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    console.log("[AUTH CALLBACK] Exchange result:", {
      success: !error,
      error: error?.message,
      user: data?.user?.email,
    })

    if (!error) {
      console.log("[AUTH CALLBACK] Session established, redirecting to:", next)

      // For password reset, redirect to the reset password page
      if (type === "recovery") {
        console.log("[AUTH CALLBACK] Password recovery detected, redirecting to reset page")
        return NextResponse.redirect(`${origin}/auth/reset-password`)
      }

      return NextResponse.redirect(`${origin}${next}`)
    } else {
      console.error("[AUTH CALLBACK] Failed to exchange code:", error)
    }
  } else {
    console.log("[AUTH CALLBACK] No code provided")
  }

  // Redirect to error page or login on failure
  console.log("[AUTH CALLBACK] Redirecting to login due to error")
  return NextResponse.redirect(`${origin}/login`)
}
