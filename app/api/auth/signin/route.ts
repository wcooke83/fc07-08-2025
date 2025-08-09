import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createServerClient"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("[SIGNIN API] Received signin request:", { email })

    // Validate required fields
    if (!email || !password) {
      console.log("[SIGNIN API] Missing required fields")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = createServerClientAppRouter()

    console.log("[SIGNIN API] Signing in with Supabase...")

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("[SIGNIN API] Supabase signin error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.log("[SIGNIN API] User signed in successfully:", {
      userId: data.user?.id,
      email: data.user?.email,
    })

    // Return success response
    return NextResponse.json({
      message: "User signed in successfully",
      user: {
        id: data.user?.id,
        email: data.user?.email,
        user_metadata: data.user?.user_metadata,
      },
      session: data.session,
    })
  } catch (error) {
    console.error("[SIGNIN API] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
