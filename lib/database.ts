// Database utilities for FastContracts
// This file provides data access functions for the application

import { createClient } from "@supabase/supabase-js"
import { createServerSupabaseClient } from "./supabase/createServerSupabaseClient"
import { createBrowserSupabaseClient } from "./supabase/createBrowserSupabaseClient"
import type { Database } from "@/lib/supabase/types"
import type { Contract } from "./types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  company?: string
  created_at: string
  updated_at: string
}

class DatabaseService {
  // Contract operations
  async getContracts(userId?: string): Promise<Contract[]> {
    try {
      let query = supabase.from("contracts").select("*").order("created_at", { ascending: false })

      if (userId) {
        query = query.eq("user_id", userId)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching contracts:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error fetching contracts:", error)
      return []
    }
  }

  async getContract(id: string): Promise<Contract | null> {
    try {
      const { data, error } = await supabase.from("contracts").select("*").eq("id", id).single()

      if (error) {
        console.error("Error fetching contract:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error fetching contract:", error)
      return null
    }
  }

  async getContractByType(type: string, userId?: string): Promise<Contract[]> {
    try {
      if (!type) {
        console.error("Contract type is required")
        return []
      }

      let query = supabase.from("contracts").select("*").eq("contract_type", type.toLowerCase())

      if (userId) {
        query = query.eq("user_id", userId)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching contracts by type:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error fetching contracts by type:", error)
      return []
    }
  }

  async createContract(contractData: Omit<Contract, "id" | "created_at" | "updated_at">): Promise<Contract> {
    try {
      const { data, error } = await supabase
        .from("contracts")
        .insert({
          ...contractData,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) {
        console.error("Error creating contract:", error)
        throw new Error("Failed to create contract")
      }

      return data
    } catch (error) {
      console.error("Error creating contract:", error)
      throw new Error("Failed to create contract")
    }
  }

  async updateContract(id: string, updates: Partial<Contract>): Promise<Contract | null> {
    try {
      const { data, error } = await supabase
        .from("contracts")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) {
        console.error("Error updating contract:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error updating contract:", error)
      return null
    }
  }

  async deleteContract(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from("contracts").delete().eq("id", id)

      if (error) {
        console.error("Error deleting contract:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Error deleting contract:", error)
      return false
    }
  }

  // Search and filter operations
  async searchContracts(query: string, userId?: string): Promise<Contract[]> {
    try {
      if (!query.trim()) {
        return this.getContracts(userId)
      }

      let supabaseQuery = supabase
        .from("contracts")
        .select("*")
        .or(`title.ilike.%${query}%,contract_type.ilike.%${query}%,content.ilike.%${query}%`)

      if (userId) {
        supabaseQuery = supabaseQuery.eq("user_id", userId)
      }

      const { data, error } = await supabaseQuery

      if (error) {
        console.error("Error searching contracts:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error searching contracts:", error)
      return []
    }
  }

  async getContractsByStatus(status: Contract["status"], userId?: string): Promise<Contract[]> {
    try {
      let query = supabase.from("contracts").select("*").eq("status", status)

      if (userId) {
        query = query.eq("user_id", userId)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching contracts by status:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error fetching contracts by status:", error)
      return []
    }
  }

  // Analytics and statistics
  async getContractStats(userId?: string): Promise<{
    total: number
    draft: number
    active: number
    completed: number
    cancelled: number
  }> {
    try {
      let query = supabase.from("contracts").select("status")

      if (userId) {
        query = query.eq("user_id", userId)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching contract stats:", error)
        return {
          total: 0,
          draft: 0,
          active: 0,
          completed: 0,
          cancelled: 0,
        }
      }

      const contracts = data || []

      return {
        total: contracts.length,
        draft: contracts.filter((c) => c.status === "draft").length,
        active: contracts.filter((c) => c.status === "active").length,
        completed: contracts.filter((c) => c.status === "completed").length,
        cancelled: contracts.filter((c) => c.status === "cancelled").length,
      }
    } catch (error) {
      console.error("Error fetching contract stats:", error)
      return {
        total: 0,
        draft: 0,
        active: 0,
        completed: 0,
        cancelled: 0,
      }
    }
  }
}

// Export a singleton instance
export const db = new DatabaseService()

export function createServerClient() {
  return createServerSupabaseClient<Database>()
}

export function createBrowserClient() {
  return createBrowserSupabaseClient<Database>()
}
