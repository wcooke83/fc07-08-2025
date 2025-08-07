import { createServerClient } from './supabase/createServerClient'

export async function getCurrentUser() {
  const supabase = createServerClient()
  
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function getSession() {
  const supabase = createServerClient()
  
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export async function getProfile() {
  const supabase = createServerClient()
  
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    if (!user) {
      return null
    }
    
    // Return basic profile information from the user object
    return {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || null,
      avatar_url: user.user_metadata?.avatar_url || null,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
  } catch (error) {
    console.error('Error getting profile:', error)
    return null
  }
}

export async function getUser() {
  const supabase = createServerClient()
  
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}
