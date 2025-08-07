import { generateRandomString as generateSecureRandomString } from "./utils"

// Generate a code verifier (43-128 characters)
export function generateCodeVerifier(): string {
  return generateSecureRandomString(128) // Recommended length for code verifier
}

// Generate a code challenge using SHA-256
export async function generatePkcePair() {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)
  return { codeVerifier, codeChallenge }
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const base64 = btoa(String.fromCharCode(...hashArray))
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

// Store PKCE data in localStorage
export function storePKCEData(codeVerifier: string): void {
  try {
    localStorage.setItem("supabase_pkce_code_verifier", codeVerifier)
    localStorage.setItem("supabase_pkce_timestamp", Date.now().toString())
  } catch (error) {
    console.error("Failed to store PKCE data:", error)
  }
}

// Retrieve PKCE data from localStorage
export function retrievePKCEData(): string | null {
  try {
    const codeVerifier = localStorage.getItem("supabase_pkce_code_verifier")
    const timestamp = localStorage.getItem("supabase_pkce_timestamp")

    // Optional: Add expiration logic (e.g., 15 minutes)
    if (codeVerifier && timestamp) {
      const currentTime = Date.now()
      const storedTime = Number.parseInt(timestamp, 10)
      const expirationTime = 15 * 60 * 1000 // 15 minutes in milliseconds

      if (currentTime - storedTime > expirationTime) {
        clearPKCEData()
        return null
      }

      return codeVerifier
    }

    return null
  } catch (error) {
    console.error("Failed to retrieve PKCE data:", error)
    return null
  }
}

// Clear PKCE data from localStorage
export function clearPKCEData(): void {
  try {
    localStorage.removeItem("supabase_pkce_code_verifier")
    localStorage.removeItem("supabase_pkce_timestamp")
  } catch (error) {
    console.error("Failed to clear PKCE data:", error)
  }
}

// Optional: Check if PKCE data is valid
export function isPKCEDataValid(): boolean {
  try {
    const codeVerifier = localStorage.getItem("supabase_pkce_code_verifier")
    const timestamp = localStorage.getItem("supabase_pkce_timestamp")

    if (!codeVerifier || !timestamp) return false

    const currentTime = Date.now()
    const storedTime = Number.parseInt(timestamp, 10)
    const expirationTime = 15 * 60 * 1000 // 15 minutes in milliseconds

    return currentTime - storedTime <= expirationTime
  } catch (error) {
    console.error("Failed to validate PKCE data:", error)
    return false
  }
}
