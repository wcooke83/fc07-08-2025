import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path
  if (process.env.NEXT_PUBLIC_APP_URL) return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
  return `http://localhost:${process.env.PORT ?? 3000}${path}`
}

export function generateRandomString(length: number) {
  let result = ""
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export async function sha256(plain: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  return hashBuffer
}

export function base64urlencode(input: ArrayBuffer) {
  const bytes = new Uint8Array(input)
  let str = ""
  for (let i = 0; i < bytes.byteLength; i++) {
    str += String.fromCharCode(bytes[i])
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}
