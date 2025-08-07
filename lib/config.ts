// Server-side configuration - DO NOT import this in client components
import "server-only"
import { z } from "zod"

// Server-side configuration variables
const REGISTRATION_ENABLED = process.env.REGISTRATION_ENABLED === "true"
const CONTRACT_CREATION_ENABLED = process.env.CONTRACT_CREATION_ENABLED !== "false"
const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@fastcontracts.com"
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@example.com"
const EMAIL_HOST = process.env.EMAIL_HOST
const EMAIL_PORT = process.env.EMAIL_PORT ? Number.parseInt(process.env.EMAIL_PORT, 10) : undefined
const EMAIL_SECURE = process.env.EMAIL_SECURE === "true"
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const NODE_ENV = process.env.NODE_ENV || "development"
const USE_SUPABASE = process.env.USE_SUPABASE !== "false"

const serverConfigSchema = z.object({
  REGISTRATION_ENABLED: z.boolean().default(false),
  CONTRACT_CREATION_ENABLED: z.boolean().default(true),
  EMAIL_FROM: z.string().email().default("noreply@fastcontracts.com"),
  CONTACT_EMAIL: z.string().email().default("contact@example.com"),
  EMAIL_HOST: z.string().default(""),
  EMAIL_PORT: z.coerce.number().default(587),
  EMAIL_SECURE: z.boolean().default(false),
  EMAIL_USER: z.string().default(""),
  EMAIL_PASS: z.string().default(""),
  USE_SUPABASE: z.boolean().default(true),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  NODE_ENV: z.string().default("development"),
})

// Validate and parse environment variables
const parsedConfig = serverConfigSchema.safeParse({
  REGISTRATION_ENABLED,
  CONTRACT_CREATION_ENABLED,
  EMAIL_FROM,
  CONTACT_EMAIL,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_USER,
  EMAIL_PASS,
  USE_SUPABASE,
  SUPABASE_SERVICE_ROLE_KEY,
  NODE_ENV,
})

if (!parsedConfig.success) {
  console.error("Invalid environment variables:", parsedConfig.error.flatten().fieldErrors)
  throw new Error("Invalid environment variables")
}

export const serverConfig = {
  registrationEnabled: parsedConfig.data.REGISTRATION_ENABLED,
  contractCreationEnabled: parsedConfig.data.CONTRACT_CREATION_ENABLED,
  emailFrom: parsedConfig.data.EMAIL_FROM,
  contactEmail: parsedConfig.data.CONTACT_EMAIL,
  emailHost: parsedConfig.data.EMAIL_HOST,
  emailPort: parsedConfig.data.EMAIL_PORT,
  emailSecure: parsedConfig.data.EMAIL_SECURE,
  emailUser: parsedConfig.data.EMAIL_USER,
  emailPass: parsedConfig.data.EMAIL_PASS,
  supabaseServiceRoleKey: parsedConfig.data.SUPABASE_SERVICE_ROLE_KEY,
  nodeEnv: parsedConfig.data.NODE_ENV,
  useSupabase: parsedConfig.data.USE_SUPABASE,
}

// Site configuration
export const siteConfig = {
  name: "FastContracts",
  description: "Generate legal contract templates quickly and easily",
  url: "https://fastcontracts.com",
  ogImage: "https://fastcontracts.com/og.jpg",
  links: {
    twitter: "https://twitter.com/fastcontracts",
    github: "https://github.com/fastcontracts/fastcontracts",
  },
}

// General config export
export const config = {
  ...serverConfig,
  site: siteConfig,
  database: {
    url: process.env.DATABASE_URL,
  },
  auth: {
    providers: ["email"],
    pages: {
      signIn: "/login",
      signUp: "/register",
      error: "/auth/error",
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
  email: {
    from: process.env.EMAIL_FROM || "noreply@fastcontracts.com",
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
}

// Export individual constants for direct import
export { REGISTRATION_ENABLED }
export { CONTRACT_CREATION_ENABLED }
export { EMAIL_FROM }
export { CONTACT_EMAIL }
export { EMAIL_HOST }
export { EMAIL_PORT }
export { EMAIL_SECURE }
export { EMAIL_USER }
export { EMAIL_PASS }
export { SUPABASE_SERVICE_ROLE_KEY }
export { NODE_ENV }
export { USE_SUPABASE }
