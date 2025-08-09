import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import type { NextApiRequest, NextApiResponse } from "next"
import type { GetServerSidePropsContext } from "next"

// For API routes (pages/api/*)
export function createServerClient(req: NextApiRequest, res: NextApiResponse) {
  if (!req || !res) {
    throw new Error("Request and response objects are required for createServerClient")
  }

  try {
    return createSupabaseServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies?.[name] || null
          },
          set(name: string, value: string, options: any = {}) {
            try {
              res.setHeader("Set-Cookie", `${name}=${value}; ${formatCookieOptions(options)}`)
            } catch (error) {
              console.error("Error setting cookie:", error)
            }
          },
          remove(name: string, options: any = {}) {
            try {
              res.setHeader(
                "Set-Cookie",
                `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; ${formatCookieOptions(options)}`,
              )
            } catch (error) {
              console.error("Error removing cookie:", error)
            }
          },
        },
      },
    )
  } catch (error) {
    console.error("Error creating Supabase server client:", error)
    throw new Error("Failed to create Supabase server client")
  }
}

// For getServerSideProps
export function createServerClientSSR(context: GetServerSidePropsContext) {
  if (!context) {
    throw new Error("Context is required for createServerClientSSR")
  }

  try {
    return createSupabaseServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return context.req.cookies?.[name] || null
          },
          set(name: string, value: string, options: any = {}) {
            try {
              context.res.setHeader("Set-Cookie", `${name}=${value}; ${formatCookieOptions(options)}`)
            } catch (error) {
              console.error("Error setting cookie in SSR:", error)
            }
          },
          remove(name: string, options: any = {}) {
            try {
              context.res.setHeader(
                "Set-Cookie",
                `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; ${formatCookieOptions(options)}`,
              )
            } catch (error) {
              console.error("Error removing cookie in SSR:", error)
            }
          },
        },
      },
    )
  } catch (error) {
    console.error("Error creating Supabase SSR client:", error)
    throw new Error("Failed to create Supabase SSR client")
  }
}

// Helper function to format cookie options
function formatCookieOptions(options: any = {}) {
  const parts: string[] = []

  if (options.maxAge) parts.push(`Max-Age=${options.maxAge}`)
  if (options.expires) parts.push(`Expires=${options.expires.toUTCString()}`)
  if (options.path) parts.push(`Path=${options.path}`)
  if (options.domain) parts.push(`Domain=${options.domain}`)
  if (options.secure) parts.push("Secure")
  if (options.httpOnly) parts.push("HttpOnly")
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`)

  return parts.join("; ")
}
