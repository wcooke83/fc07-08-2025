import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createServerClient"

export async function GET(request: NextRequest) {
  try {
    console.log("[AUTH CALLBACK] Starting auth callback process...")

    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") ?? "/"

    console.log("[AUTH CALLBACK] Received params:", {
      code: code ? "present" : "missing",
      next,
      origin,
    })

    if (code) {
      const supabase = createServerClientAppRouter()

      console.log("[AUTH CALLBACK] Exchanging code for session...")
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("[AUTH CALLBACK] Error exchanging code:", error)
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
      }

      console.log("[AUTH CALLBACK] Successfully exchanged code for session:", {
        userId: data.user?.id,
        email: data.user?.email,
      })

      const forwardedHost = request.headers.get("x-forwarded-host")
      const isLocalEnv = process.env.NODE_ENV === "development"

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }

    console.log("[AUTH CALLBACK] No code provided, redirecting to home")
    return NextResponse.redirect(`${origin}/`)
  } catch (error) {
    console.error("[AUTH CALLBACK] Unexpected error:", error)
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/auth-code-error`)
  }
}
