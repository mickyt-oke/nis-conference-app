"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: string
}
export interface LoginResult {
  error?: ReactNode
  success: boolean
  message?: string
  redirectTo?: string
  user?: User
}

/**
 * Helper to set authentication cookies
 */
function setAuthCookies(cookieStore: Awaited<ReturnType<typeof cookies>>, token: string, user: User) {
  const isProduction = process.env.NODE_ENV === "production"
  const commonOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  }

  // JWT for API calls (bearer)
  cookieStore.set("auth_token", token, commonOptions)

  // Raw user data (server side only)
  cookieStore.set("user_data", JSON.stringify(user), commonOptions)

  // Session cookie expected by lib/auth (used across dashboard)
  cookieStore.set("session", JSON.stringify({
    userId: user.id,
    username: user.name,
    email: user.email,
    role: user.role,
    name: user.name,
    department: (user as any).department ?? "",
    loginTime: new Date().toISOString(),
  }), commonOptions)
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

    // Validate API response structure
    if (
      !data ||
      typeof data.token !== "string" ||
      typeof data.user !== "object" ||
      data.user === null ||
      typeof data.user.id !== "string" ||
      typeof data.user.email !== "string" ||
      typeof data.user.name !== "string" ||
      typeof data.user.role !== "string"
    ) {
      return {
        success: false,
        message: "Invalid response from server",
      }
    }

    const cookieStore = await cookies()
    await setAuthCookies(cookieStore, data.token, data.user)

    // Determine redirect based on user role
    const redirectTo = data.user.role === "admin" ? "/admin" : "/dashboard"

    return {
      success: true,
      message: "Login successful",
      redirectTo,
      user: data.user,
    }
  } catch (error: unknown) {
    console.error("Login error:", error)
    let message = "An unexpected error occurred"
    if (error && typeof error === "object" && "message" in error && typeof (error as any).message === "string") {
      message = (error as { message: string }).message
    }
    return {
      success: false,
      message,
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
  cookieStore.delete("session")
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
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  return user
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
