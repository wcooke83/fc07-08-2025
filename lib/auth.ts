import { createServerSupabaseClient } from "@/lib/supabase/createServerSupabaseClient"
import { createBrowserSupabaseClient } from "./supabase/createBrowserSupabaseClient"
import type { User } from "@supabase/supabase-js"
import { siteConfig } from "@/lib/config"

export async function getUser(): Promise<User | null> {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export function getBrowserUser(): Promise<User | null> {
  const supabase = createBrowserSupabaseClient()
  return supabase.auth.getUser().then(({ data: { user } }) => user)
}

export async function signOut() {
  const supabase = createServerSupabaseClient()
  await supabase.auth.signOut()
}

export async function signInWithEmail(email: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`,
    },
  })
  if (error) throw error
  return data
}

export async function signInWithOAuth(provider: "google" | "github") {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`,
    },
  })
  if (error) throw error
  return data
}

export async function signUpWithEmail(email: string, password?: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`,
    },
  })
  if (error) throw error
  return data
}

export async function verifyOtp(email: string, token: string, type: "email" | "sms") {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type })
  if (error) throw error
  return data
}

export async function resetPassword(password: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.auth.updateUser({ password })
  if (error) throw error
  return data
}

export async function sendPasswordResetEmail(email: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  })
  if (error) throw error
  return data
}

export async function getAuthUrl() {
  const supabase = await createServerSupabaseClient()

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${siteConfig.url}/auth/callback`,
    },
  })

  return data.url
}
