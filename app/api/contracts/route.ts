import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createAppRouterClient"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClientAppRouter()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: contracts, error } = await supabase
      .from("contracts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching contracts:", error)
      return NextResponse.json({ error: "Failed to fetch contracts" }, { status: 500 })
    }

    return NextResponse.json({ contracts })
  } catch (error) {
    console.error("Contracts API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClientAppRouter()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const contractData = await request.json()

    const { data: contract, error } = await supabase
      .from("contracts")
      .insert({
        ...contractData,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating contract:", error)
      return NextResponse.json({ error: "Failed to create contract" }, { status: 500 })
    }

    return NextResponse.json({ contract })
  } catch (error) {
    console.error("Create contract API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
