import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/createServerSupabaseClient"
import { redirect } from "next/navigation"

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { token_hash: string; type: string; error: string }
}) {
  const { token_hash, type, error } = searchParams

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] items-center justify-center px-4 py-12">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Verification Failed</CardTitle>
            <CardDescription>There was an error verifying your email: {decodeURIComponent(error)}.</CardDescription>
          </CardHeader>
          <CardContent>
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

  if (token_hash && type) {
    const supabase = createServerSupabaseClient()
    const { error: verifyError } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as "email" | "sms" | "phone_change",
    })

    if (!verifyError) {
      redirect("/dashboard?message=Your email has been verified successfully!")
    } else {
      console.error("OTP verification error:", verifyError)
      return (
        <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] items-center justify-center px-4 py-12">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Verification Failed</CardTitle>
              <CardDescription>
                There was an error verifying your email. Please try again or contact support.
              </CardDescription>
            </CardHeader>
            <CardContent>
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
  }

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] items-center justify-center px-4 py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            A verification link has been sent to your email address. Please click the link to complete your
            registration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 text-center text-sm">
            Didn't receive the email?{" "}
            <Link href="/register" className="underline">
              Resend
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
