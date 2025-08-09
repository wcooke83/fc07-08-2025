import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/createServerSupabaseClient"

export async function POST(request: NextRequest) {
  console.log("[API] /api/auth/forgot-password - Starting password reset process")

  try {
    const { email } = await request.json()
    console.log("[API] Password reset requested for email:", email)

    if (!email) {
      console.log("[API] No email provided")
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()
    console.log("[API] Supabase client created")

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin}/auth/reset-password`
    console.log("[API] Reset URL:", resetUrl)

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resetUrl,
    })

    console.log("[API] Supabase resetPasswordForEmail response:", { data, error })

    if (error) {
      console.error("[API] Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.log("[API] Password reset email sent successfully")
    return NextResponse.json({
      message: "Password reset email sent successfully",
      data,
    })
  } catch (error) {
    console.error("[API] Unexpected error in forgot-password:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
