"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthForms } from "@/components/auth-forms"

export default function RegisterPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/dashboard")
  }

  const handleModeChange = (mode: "login" | "register" | "forgot-password") => {
    if (mode === "login") {
      router.push("/login")
    } else if (mode === "forgot-password") {
      router.push("/forgot-password")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join FastContracts to save and manage your contracts</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForms mode="signup" onModeChange={handleModeChange} onSuccess={handleSuccess} />
        </CardContent>
      </Card>
    </div>
  )
}
