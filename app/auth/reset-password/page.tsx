"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createBrowserClient } from "@/lib/supabase/createBrowserClient"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [hasValidSession, setHasValidSession] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const supabase = createBrowserClient()

  useEffect(() => {
    console.log("[RESET PASSWORD] Page loaded")
    console.log("[RESET PASSWORD] Search params:", Object.fromEntries(searchParams.entries()))

    // Check if user has a valid session (from the callback)
    const checkSession = async () => {
      console.log("[RESET PASSWORD] Checking user session...")
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      console.log("[RESET PASSWORD] Session check result:", {
        hasSession: !!session,
        error: error?.message,
        user: session?.user?.email,
      })

      if (session) {
        console.log("[RESET PASSWORD] Valid session found, user can reset password")
        setHasValidSession(true)
      } else {
        console.log("[RESET PASSWORD] No valid session, redirecting to forgot password")
        toast({
          title: "Invalid or expired reset link",
          description: "Please request a new password reset.",
          variant: "destructive",
        })
        router.push("/forgot-password")
      }
    }

    checkSession()
  }, [searchParams, supabase, router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[RESET PASSWORD] Form submitted")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    setError("")

    try {
      console.log("[RESET PASSWORD] Updating password...")
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        console.error("[RESET PASSWORD] Error updating password:", error)
        setError(error.message)
      } else {
        console.log("[RESET PASSWORD] Password updated successfully")
        toast({
          title: "Password updated",
          description: "Your password has been successfully updated.",
        })

        // Sign out and redirect to login
        await supabase.auth.signOut()
        router.push("/login")
      }
    } catch (error: any) {
      console.error("[RESET PASSWORD] Unexpected error:", error)
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (!hasValidSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verifying Reset Link</CardTitle>
            <CardDescription>Please wait while we verify your password reset link...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Enter new password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Confirm new password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating Password..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
