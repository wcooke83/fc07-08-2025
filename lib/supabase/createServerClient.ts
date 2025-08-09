import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { NextApiRequest, NextApiResponse } from 'next'

export function createServerClient(req: NextApiRequest, res: NextApiResponse) {
  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies[name]
        },
        set(name: string, value: string, options: any) {
          res.setHeader('Set-Cookie', `${name}=${value}; ${formatCookieOptions(options)}`)
        },
        remove(name: string, options: any) {
          res.setHeader('Set-Cookie', `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; ${formatCookieOptions(options)}`)
        },
      },
    }
  )
}

// Helper function to format cookie options
function formatCookieOptions(options: any = {}) {
  const parts: string[] = []
  
  if (options.maxAge) parts.push(`Max-Age=${options.maxAge}`)
  if (options.expires) parts.push(`Expires=${options.expires.toUTCString()}`)
  if (options.path) parts.push(`Path=${options.path}`)
  if (options.domain) parts.push(`Domain=${options.domain}`)
  if (options.secure) parts.push('Secure')
  if (options.httpOnly) parts.push('HttpOnly')
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`)
  
  return parts.join('; ')
}
