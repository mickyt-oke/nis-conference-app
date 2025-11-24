"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface LoginResult {
  success: boolean
  message?: string
  redirectTo?: string
  user?: User
}

/**
 * Helper to set authentication cookies
 */
async function setAuthCookies(cookieStore: Promise<ReturnType<typeof cookies>>, token: string, user: User) {
  const cookiesResolved = await cookieStore
  const isProduction = process.env.NODE_ENV === "production"
  cookiesResolved.set("auth_token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
  cookiesResolved.set("user_data", JSON.stringify(user), {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  })
}

/**
 * Login action - attempts to login user with backend API and sets cookies on success
 * @param formData - FormData containing 'email' and 'password' fields
 * @returns Promise<LoginResult>
 */
export async function loginAction(formData: FormData): Promise<LoginResult> {
  try {
    const emailRaw = formData.get("email")
    const passwordRaw = formData.get("password")

    const email = typeof emailRaw === "string" ? emailRaw.trim().toLowerCase() : ""
    const password = typeof passwordRaw === "string" ? passwordRaw : ""

    if (!email || !password) {
      return {
        success: false,
        message: "Please provide both email and password",
      }
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    const response = await fetch(`${apiUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        message: errorData.message || "Invalid email or password",
      }
    }

    const data = await response.json()

    const cookieStore = cookies()
    await setAuthCookies(cookieStore, data.token, data.user)

    // Determine redirect based on user role
    let redirectTo = "/dashboard"
    if (data.user.role === "admin") redirectTo = "/admin"
    else if (data.user.role === "supervisor") redirectTo = "/supervisor"

    return {
      success: true,
      message: "Login successful",
      redirectTo,
      user: data.user,
    }
  } catch (error: any) {
    console.error("Login error:", error)
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    }
  }
}

/**
 * Logout action - clears auth cookies and redirects to login page
 */
export async function logoutUser(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
  cookieStore.delete("user_data")
  redirect("/login")
}

/**
 * Get current authenticated user from cookies, or null if none
 * @returns Promise<User | null>
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const userData = cookieStore.get("user_data")

    if (!userData) {
      return null
    }

    return JSON.parse(userData.value) as User
  } catch (error) {
    return null
  }
}

/**
 * Check if user is authenticated
 * @returns Promise<boolean>
 */
export async function checkAuth(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

/**
 * Require authentication - redirects to login if not authenticated
 */
export async function requireAuth(): Promise<void> {
  const isAuthenticated = await checkAuth()
  if (!isAuthenticated) {
    redirect("/login")
  }
}

/**
 * Require user to have specific role, redirects to unauthorized page if role mismatches
 * @param role string - role to require
 */
export async function requireRole(role: string): Promise<void> {
  const user = await getCurrentUser()
  if (!user || user.role !== role) {
    redirect("/unauthorized")
  }
}
