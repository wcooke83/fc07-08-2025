import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createAppRouterClient"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClientAppRouter()

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Sign out error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Sign out successful" })
  } catch (error) {
    console.error("Sign out API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
