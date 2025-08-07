import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/createServerSupabaseClient"
import { redirect } from "next/navigation"

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { code: string; error: string }
}) {
  const { code, error } = searchParams

  if (!code) {
    redirect("/forgot-password")
  }

  const supabase = createServerSupabaseClient()

  const handleResetPassword = async (formData: FormData) => {
    "use server"
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      redirect("/auth/reset-password?error=Passwords do not match")
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      console.error("Password reset error:", error)
      redirect(`/auth/reset-password?error=${encodeURIComponent(error.message)}`)
    }

    redirect("/login?message=Your password has been reset successfully. Please log in.")
  }

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] items-center justify-center px-4 py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleResetPassword} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required />
            </div>
            {error && <p className="text-sm text-red-500">{decodeURIComponent(error)}</p>}
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="underline">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
