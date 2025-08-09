import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createAppRouterClient"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = await createServerClientAppRouter()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`.trim(),
        },
      },
    })

    if (error) {
      console.error("Sign up error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "Sign up successful. Please check your email to verify your account.",
      user: data.user,
    })
  } catch (error) {
    console.error("Sign up API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
