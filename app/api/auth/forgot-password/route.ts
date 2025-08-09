import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createServerClient"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    console.log("[FORGOT PASSWORD API] Received request for:", email)

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const supabase = createServerClientAppRouter()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    })

    if (error) {
      console.error("[FORGOT PASSWORD API] Error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.log("[FORGOT PASSWORD API] Reset email sent successfully")

    return NextResponse.json({
      message: "Password reset email sent successfully",
    })
  } catch (error) {
    console.error("[FORGOT PASSWORD API] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
