import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import type { NextApiRequest, NextApiResponse } from "next"
import type { GetServerSidePropsContext } from "next"

// For API routes (pages/api/*)
export function createServerClient(req: NextApiRequest, res: NextApiResponse) {
  if (!req || !res) {
    throw new Error("Request and response objects are required for API routes")
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
              res.setHeader(
                "Set-Cookie",
                `${name}=${value}; Path=/; ${options.httpOnly ? "HttpOnly;" : ""} ${options.secure ? "Secure;" : ""} ${options.sameSite ? `SameSite=${options.sameSite};` : ""}`,
              )
            } catch (error) {
              console.error("Error setting cookie in API route:", error)
            }
          },
          remove(name: string, options: any = {}) {
            try {
              res.setHeader(
                "Set-Cookie",
                `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${options.httpOnly ? "HttpOnly;" : ""} ${options.secure ? "Secure;" : ""}`,
              )
            } catch (error) {
              console.error("Error removing cookie in API route:", error)
            }
          },
        },
      },
    )
  } catch (error) {
    console.error("Error creating Supabase API client:", error)
    throw new Error("Failed to create Supabase API client")
  }
}

// For getServerSideProps (pages/*)
export function createServerClientSSR(context: GetServerSidePropsContext) {
  if (!context || !context.req || !context.res) {
    throw new Error("GetServerSidePropsContext with req and res is required")
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
              context.res.setHeader(
                "Set-Cookie",
                `${name}=${value}; Path=/; ${options.httpOnly ? "HttpOnly;" : ""} ${options.secure ? "Secure;" : ""} ${options.sameSite ? `SameSite=${options.sameSite};` : ""}`,
              )
            } catch (error) {
              console.error("Error setting cookie in SSR:", error)
            }
          },
          remove(name: string, options: any = {}) {
            try {
              context.res.setHeader(
                "Set-Cookie",
                `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${options.httpOnly ? "HttpOnly;" : ""} ${options.secure ? "Secure;" : ""}`,
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
