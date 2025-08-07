// Client-safe site configuration
// This file can be imported by both server and client components

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "FastContracts",
  description: "Create professional legal contracts instantly with our AI-powered platform",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/fastcontracts",
    github: "https://github.com/fastcontracts/fastcontracts",
  },
  mailSupport: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@fastcontracts.com",
}

// Client-accessible environment variables
export const publicConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "FastContracts",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
}
