import { createBrowserClient as createClient } from '@supabase/ssr'
import type { Database } from './types'

export function createBrowserClient<T = Database>() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient<T>(supabaseUrl, supabaseAnonKey)
}
