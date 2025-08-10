"use client"

import { useState } from "react"

import type React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, FileText } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-provider"

interface AuthFormsProps {
  onSuccess?: () => void
  onSwitchMode?: (mode: "login" | "register" | "forgot-password") => void
  initialMode?: "login" | "register" | "forgot-password"
  isModal?: boolean
  mode?: "signin" | "signup" | "forgot-password"
}

export function AuthForms({ onSuccess, onSwitchMode, initialMode = "login", isModal = false, mode }: AuthFormsProps) {
  // Use mode prop if provided, otherwise use initialMode
  const [currentMode, setCurrentMode] = useState(
    mode === "signin"
      ? "login"
      : mode === "signup"
        ? "register"
        : mode === "forgot-password"
          ? "forgot-password"
          : initialMode,
  )
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { toast } = useToast()
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleModeSwitch = (mode: "login" | "register" | "forgot-password") => {
    if (isModal) {
      // In modal mode, switch dynamically
      setCurrentMode(mode)
      onSwitchMode?.(mode)
    } else {
      // In page mode, navigate to different pages
      onSwitchMode?.(mode)
    }

    setError(null)
    // Reset form
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setRememberMe(false)
    setAcceptTerms(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (currentMode === "register" && password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      if (currentMode === "login") {
        await signIn(email, password)
        toast({
          title: "Success",
          description: "You have been signed in successfully.",
        })
      } else {
        await signUp(email, password)
        toast({
          title: "Success",
          description: "Account created successfully. Please check your email to verify your account.",
        })
      }
      onSuccess?.()
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : `Failed to ${currentMode === "login" ? "sign in" : "create account"}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuth = (provider: "google" | "facebook") => {
    console.log(`[AUTH] OAuth with ${provider}`)
  }

  if (currentMode === "forgot-password") {
    return (
      <div className={`w-full ${isModal ? "max-w-md" : "max-w-md mx-auto"}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <FileText className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">FastContracts</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reset your password</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Or{" "}
            {isModal ? (
              <button
                type="button"
                onClick={() => handleModeSwitch("login")}
                className="text-blue-600 hover:text-blue-700"
              >
                sign in to your account
              </button>
            ) : (
              <Link href="/login" className="text-blue-600 hover:text-blue-700">
                sign in to your account
              </Link>
            )}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Enter your email</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5"
            >
              {isLoading ? "Sending..." : "Send reset link"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            {isModal ? (
              <button
                type="button"
                onClick={() => handleModeSwitch("login")}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                ← Back to sign in
              </button>
            ) : (
              <Link
                href="/login"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                ← Back to sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className={`w-full ${isModal ? "max-w-md" : "max-w-md mx-auto"}`}>
      <CardHeader>
        <CardTitle>{currentMode === "login" ? "Sign In" : "Create Account"}</CardTitle>
        <CardDescription>
          {currentMode === "login"
            ? "Enter your credentials to access your account"
            : "Create a new account to get started"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentMode === "register" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">
                  First name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={email} // Placeholder for firstName, need to update state management
                  onChange={(e) => setEmail(e.target.value)} // Placeholder for firstName, need to update state management
                  className="mt-1 bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={email} // Placeholder for lastName, need to update state management
                  onChange={(e) => setEmail(e.target.value)} // Placeholder for lastName, need to update state management
                  className="mt-1 bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {currentMode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-700 dark:text-gray-300">
                Company (Optional)
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="Your Company"
                value={email} // Placeholder for company, need to update state management
                onChange={(e) => setEmail(e.target.value)} // Placeholder for company, need to update state management
                className="mt-1 bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
              Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={currentMode === "register" ? "Create a password" : "Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 pr-10"
                required
                disabled={isLoading}
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {currentMode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-gray-700 dark:text-gray-300">
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 pr-10"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}

          {currentMode === "login" && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </Label>
              </div>
              {isModal ? (
                <button
                  type="button"
                  onClick={() => handleModeSwitch("forgot-password")}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot your password?
                </button>
              ) : (
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot your password?
                </Link>
              )}
            </div>
          )}

          {currentMode === "register" && (
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-0.5"
              />
              <Label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300 leading-5">
                I agree to the{" "}
                <Link href="/legal/terms" className="text-blue-600 hover:text-blue-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/legal/privacy" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </Link>
              </Label>
            </div>
          )}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5" disabled={isLoading}>
            {isLoading
              ? currentMode === "login"
                ? "Signing in..."
                : "Creating account..."
              : currentMode === "login"
                ? "Sign In"
                : "Create Account"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-slate-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuth("google")}
              className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuth("facebook")}
              className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
