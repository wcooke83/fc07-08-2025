import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/createServerSupabaseClient"

export async function POST(request: NextRequest) {
  console.log("[FORGOT-PASSWORD API] Starting password reset process...")

  try {
    const { email } = await request.json()
    console.log("[FORGOT-PASSWORD API] Email:", email)

    if (!email) {
      console.log("[FORGOT-PASSWORD API] No email provided")
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Create Supabase client
    console.log("[FORGOT-PASSWORD API] Creating Supabase client...")
    const supabase = createServerSupabaseClient()

    // Use environment variables for the redirect URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL
    const origin = request.headers.get("origin")
    const redirectTo = `${siteUrl || origin || "http://localhost:3000"}/auth/reset-password`

    console.log("[FORGOT-PASSWORD API] Environment variables:")
    console.log("[FORGOT-PASSWORD API] NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL)
    console.log("[FORGOT-PASSWORD API] NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL)
    console.log("[FORGOT-PASSWORD API] Request origin:", origin)
    console.log("[FORGOT-PASSWORD API] Final redirect URL:", redirectTo)

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })

    console.log("[FORGOT-PASSWORD API] Supabase response data:", data)
    console.log("[FORGOT-PASSWORD API] Supabase response error:", error)

    if (error) {
      console.error("[FORGOT-PASSWORD API] Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.log("[FORGOT-PASSWORD API] Password reset email sent successfully")
    return NextResponse.json({
      message: "Password reset email sent successfully",
    })
  } catch (error) {
    console.error("[FORGOT-PASSWORD API] Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
