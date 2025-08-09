import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createServerClient"

export async function POST(request: NextRequest) {
  try {
    console.log("[SIGNOUT API] Signing out user...")

    const supabase = createServerClientAppRouter()

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("[SIGNOUT API] Supabase signout error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.log("[SIGNOUT API] User signed out successfully")

    return NextResponse.json({
      message: "User signed out successfully",
    })
  } catch (error) {
    console.error("[SIGNOUT API] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
