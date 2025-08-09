import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createAppRouterClient"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") ?? "/"

    if (code) {
      const supabase = await createServerClientAppRouter()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
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
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  } catch (error) {
    console.error("Auth callback error:", error)
    return NextResponse.redirect(`${new URL(request.url).origin}/auth/auth-code-error`)
  }
}
