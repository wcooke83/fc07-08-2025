import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createAppRouterClient"

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const supabase = createServerClientAppRouter()

  await supabase.auth.signOut()

  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    status: 301,
  })
}
