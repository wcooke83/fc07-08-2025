"use client"

import type React from "react"
import { useState } from "react"
import { createBrowserClient } from "@supabase/supabase-js"

const ForgotPasswordForm: React.FC<{ onSuccess?: (step: string) => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    console.log("[FORGOT PASSWORD] Starting password reset process for:", email)

    try {
      const supabase = createBrowserClient()
      console.log("[FORGOT PASSWORD] Supabase client created successfully")

      const resetUrl = `${window.location.origin}/auth/reset-password`
      console.log("[FORGOT PASSWORD] Reset URL:", resetUrl)

      console.log("[FORGOT PASSWORD] Calling resetPasswordForEmail...")
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: resetUrl,
      })

      console.log("[FORGOT PASSWORD] Supabase response:", { data, error })

      if (error) {
        console.error("[FORGOT PASSWORD] Supabase error:", error)
        setError(error.message)
      } else {
        console.log("[FORGOT PASSWORD] Success - email should be sent")
        setMessage("Check your email for a password reset link")
        onSuccess?.("forgot-password")
      }
    } catch (err) {
      console.error("[FORGOT PASSWORD] Unexpected error:", err)
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
      console.log("[FORGOT PASSWORD] Process completed")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Send Reset Email"}
      </button>
    </form>
  )
}

export default ForgotPasswordForm
