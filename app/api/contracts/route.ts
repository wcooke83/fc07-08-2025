import { createServerSupabaseClient } from "@/lib/supabase/createServerSupabaseClient"
import { NextResponse } from "next/server"
import { saveContract } from "@/lib/contracts"

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // For anonymous contract creation, user_id will be null
  const userId = user?.id || null

  try {
    const formData = await request.formData()
    const result = await saveContract(formData, userId)

    if (result.success) {
      return NextResponse.json({ contractId: result.contractId }, { status: 200 })
    } else {
      return NextResponse.json({ error: result.error || "Failed to create contract" }, { status: 500 })
    }
  } catch (error: any) {
    console.error("API Error saving contract:", error)
    return NextResponse.json({ error: error.message || "Failed to save contract" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { data: contracts, error } = await supabase
      .from("contracts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching contracts:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(contracts, { status: 200 })
  } catch (error: any) {
    console.error("API Error fetching contracts:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch contracts" }, { status: 500 })
  }
}
