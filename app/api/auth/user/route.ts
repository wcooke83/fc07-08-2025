import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createAppRouterClient"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    console.log("[USER API] Getting current user...")

    const supabase = createServerClientAppRouter()

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    // Don't treat missing session as an error - just return null user
    if (error && error.message !== "Auth session missing!") {
      console.error("[USER API] Error getting user:", error)
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    if (!user) {
      console.log("[USER API] No user found - returning null")
      return NextResponse.json({ user: null })
    }

    console.log("[USER API] User found:", {
      id: user.id,
      email: user.email,
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    })
  } catch (error) {
    console.error("[USER API] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
