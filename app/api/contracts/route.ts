import { type NextRequest, NextResponse } from "next/server"
import { createServerClientAppRouter } from "@/lib/supabase/createServerClient"

export async function POST(request: NextRequest) {
  try {
    const { type, content, formData } = await request.json()

    console.log("[CONTRACTS API] Received contract creation request:", { type })

    if (!type || !content) {
      return NextResponse.json({ error: "Contract type and content are required" }, { status: 400 })
    }

    const supabase = createServerClientAppRouter()

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error("[CONTRACTS API] User not authenticated:", userError)
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    // Save the contract to the database
    const { data, error } = await supabase
      .from("contracts")
      .insert({
        user_id: user.id,
        template_id: type,
        contract_type: type,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Contract`,
        content: content,
        form_data: formData || {},
        status: "completed",
      })
      .select()
      .single()

    if (error) {
      console.error("[CONTRACTS API] Database error:", error)
      return NextResponse.json({ error: "Failed to save contract" }, { status: 500 })
    }

    console.log("[CONTRACTS API] Contract saved successfully:", data.id)

    return NextResponse.json({
      message: "Contract saved successfully",
      contract: data,
    })
  } catch (error) {
    console.error("[CONTRACTS API] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClientAppRouter()

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error("[CONTRACTS API] User not authenticated:", userError)
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    // Get user's contracts
    const { data, error } = await supabase
      .from("contracts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[CONTRACTS API] Database error:", error)
      return NextResponse.json({ error: "Failed to fetch contracts" }, { status: 500 })
    }

    return NextResponse.json({
      contracts: data || [],
    })
  } catch (error) {
    console.error("[CONTRACTS API] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
