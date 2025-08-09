"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthForms } from "@/components/auth-forms"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/dashboard")
  }

  const handleModeChange = (mode: "login" | "register" | "forgot-password") => {
    if (mode === "register") {
      router.push("/register")
    } else if (mode === "forgot-password") {
      router.push("/forgot-password")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your FastContracts account</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForms mode="signin" onModeChange={handleModeChange} onSuccess={handleSuccess} />
          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
