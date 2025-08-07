// This file is typically used for Supabase client creation in the Next.js Pages Router.
// Since we are using the App Router, this file might not be directly used.
// However, it's included for completeness if there are any legacy parts or specific needs.

import { createPagesServerClient as createPagesServerClientOriginal } from "@supabase/auth-helpers-nextjs"
import type { GetServerSidePropsContext } from "next"
import type { Database } from "./types"

export const createPagesServerClient = (context: GetServerSidePropsContext) =>
  createPagesServerClientOriginal<Database>(context, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })
