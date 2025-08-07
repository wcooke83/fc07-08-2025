import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const body = await request.json()
    const email = body.email
    const password = body.password

    console.log("[AUTH API] Sign-in attempt for:", email)

    if (!email || !password) {
      console.log("[AUTH API] Missing email or password")
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("[AUTH API] Sign-in error:", error.message)
      return NextResponse.json(
        { error: error.message || "Authentication failed" },
        { status: 401 }
      )
    }

    console.log("[AUTH API] Sign-in successful for:", email)
    return NextResponse.json(
      { 
        message: "Sign-in successful",
        user: data.user 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("[AUTH API] Unexpected error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
