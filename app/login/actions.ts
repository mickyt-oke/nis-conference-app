"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface LoginResult {
  success: boolean
  message?: string
  redirectTo?: string
  user?: {
    id: string
    email: string
    name: string
    role: string
  }
}

// Mock users for development
const MOCK_USERS = [
  { id: "1", email: "admin@nis.gov.ng", password: "admin123", name: "Admin User", role: "admin" },
  { id: "2", email: "supervisor@nis.gov.ng", password: "supervisor123", name: "Supervisor User", role: "supervisor" },
  { id: "3", email: "user@nis.gov.ng", password: "user123", name: "Regular User", role: "user" },
]

export async function loginAction(prevState: any, formData: FormData): Promise<LoginResult> {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return {
        success: false,
        message: "Please provide both email and password",
      }
    }

    // Try Laravel backend first with timeout
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()

        // Set auth cookie
        const cookieStore = await cookies()
        cookieStore.set("auth_token", data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 1 week
        })

        cookieStore.set("user_data", JSON.stringify(data.user), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
        })

        // Return success with redirect
        return {
          success: true,
          message: "Login successful",
          redirectTo:
            data.user.role === "admin" ? "/admin" : data.user.role === "supervisor" ? "/supervisor" : "/dashboard",
          user: data.user,
        }
      }
    } catch (error: any) {
      console.log("Laravel backend not available, using mock authentication")
    }

    // Fallback to mock authentication
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
      }
    }

    // Set mock auth cookies
    const cookieStore = await cookies()
    cookieStore.set("auth_token", `mock_token_${user.id}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    cookieStore.set(
      "user_data",
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      },
    )

    return {
      success: true,
      message: "Login successful",
      redirectTo: user.role === "admin" ? "/admin" : user.role === "supervisor" ? "/supervisor" : "/dashboard",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    }
  } catch (error: any) {
    console.error("Login error:", error)
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
  cookieStore.delete("user_data")
  redirect("/login")
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const userData = cookieStore.get("user_data")

    if (!userData) {
      return null
    }

    return JSON.parse(userData.value)
  } catch (error) {
    return null
  }
}

export async function checkAuth() {
  const user = await getCurrentUser()
  return !!user
}

export async function requireAuth() {
  const isAuthenticated = await checkAuth()
  if (!isAuthenticated) {
    redirect("/login")
  }
}

export async function requireRole(role: string) {
  const user = await getCurrentUser()
  if (!user || user.role !== role) {
    redirect("/unauthorized")
  }
}
