import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createAppRouterClient"

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, company } = await request.json()

    console.log("[SIGNUP API] Received signup request:", {
      email,
      firstName,
      lastName,
      company,
      hasPassword: !!password,
    })

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      console.log("[SIGNUP API] Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("[SIGNUP API] Invalid email format")
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 8) {
      console.log("[SIGNUP API] Password too short")
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    const supabase = createServerClientAppRouter()

    console.log("[SIGNUP API] Creating user with Supabase...")

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          company: company || null,
          full_name: `${firstName} ${lastName}`,
        },
      },
    })

    if (error) {
      console.error("[SIGNUP API] Supabase signup error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.log("[SIGNUP API] User created successfully:", {
      userId: data.user?.id,
      email: data.user?.email,
      confirmed: data.user?.email_confirmed_at,
    })

    // Return success response
    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: data.user?.id,
        email: data.user?.email,
        firstName,
        lastName,
        company,
      },
    })
  } catch (error) {
    console.error("[SIGNUP API] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
