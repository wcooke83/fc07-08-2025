import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createAppRouterClient"

export async function GET(request: NextRequest) {
  const supabase = createServerClientAppRouter()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return NextResponse.json({ user })
}
