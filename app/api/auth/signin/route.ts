import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createAppRouterClient"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = await createServerClientAppRouter()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Sign in error:", error)
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    return NextResponse.json({
      message: "Sign in successful",
      user: data.user,
    })
  } catch (error) {
    console.error("Sign in API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
