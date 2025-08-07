"use server"

import { saveContract } from "@/lib/contracts"

export async function generateContractAction(formData: FormData, userId: string | null) {
  console.log("🚀 Generate contract action called")
  console.log("📝 Form data keys:", Array.from(formData.keys()))
  console.log("👤 User ID:", userId)

  try {
    const result = await saveContract(formData, userId)
    
    if (result.success) {
      console.log("✅ Contract generated successfully:", result.contractId)
      return { success: true, contractId: result.contractId }
    } else {
      console.error("❌ Contract generation failed:", result.error)
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error("❌ Server action error:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }
  }
}
