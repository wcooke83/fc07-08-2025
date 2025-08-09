"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthForms } from "@/components/auth-forms"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const router = useRouter()

  const handleSuccess = () => {
    // Stay on the same page after successful password reset email
  }

  const handleModeChange = (mode: "login" | "register" | "forgot-password") => {
    if (mode === "login") {
      router.push("/login")
    } else if (mode === "register") {
      router.push("/register")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter your email address and we'll send you a reset link</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForms mode="forgot-password" onModeChange={handleModeChange} onSuccess={handleSuccess} />
        </CardContent>
      </Card>
    </div>
  )
}
