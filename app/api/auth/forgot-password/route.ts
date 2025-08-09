import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createAppRouterClient"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const supabase = await createServerClientAppRouter()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${new URL(request.url).origin}/auth/reset-password`,
    })

    if (error) {
      console.error("Password reset error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "Password reset email sent. Please check your inbox.",
    })
  } catch (error) {
    console.error("Forgot password API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
