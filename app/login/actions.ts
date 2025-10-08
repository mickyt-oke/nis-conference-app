"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

interface LoginResponse {
  success: boolean
  token?: string
  user?: {
    id: number
    name: string
    email: string
    role: string
  }
  message?: string
  redirectTo?: string
}

interface User {
  id: number
  name: string
  email: string
  role: string
}

// Mock users for development
const mockUsers = [
  { id: 1, name: "Admin User", email: "admin@nis.edu.kw", password: "admin123", role: "admin" },
  { id: 2, name: "Supervisor", email: "supervisor@nis.edu.kw", password: "supervisor123", role: "supervisor" },
  { id: 3, name: "Regular User", email: "user@nis.edu.kw", password: "user123", role: "user" },
]

export async function loginAction(prevState: any, formData: FormData): Promise<LoginResponse> {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return { success: false, message: "Email and password are required" }
    }

    // Try Laravel backend first
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()

        if (data.success && data.token) {
          // Set secure cookie
          const cookieStore = cookies()
          cookieStore.set("auth_token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 days
          })

          // Store user data
          cookieStore.set("user_data", JSON.stringify(data.user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 days
          })

          // Return success with redirect info instead of redirecting directly
          const redirectTo =
            data.user.role === "admin" ? "/admin" : data.user.role === "supervisor" ? "/supervisor" : "/dashboard"

          return {
            success: true,
            token: data.token,
            user: data.user,
            redirectTo,
            message: "Login successful",
          }
        }
      }
    } catch (error) {
      console.log("Laravel backend not available, using mock authentication")
    }

    // Fallback to mock authentication
    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      const mockToken = `mock_token_${user.id}_${Date.now()}`
      const userData = { id: user.id, name: user.name, email: user.email, role: user.role }

      // Set mock cookies
      const cookieStore = cookies()
      cookieStore.set("auth_token", mockToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      cookieStore.set("user_data", JSON.stringify(userData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      // Return success with redirect info instead of redirecting directly
      const redirectTo = user.role === "admin" ? "/admin" : user.role === "supervisor" ? "/supervisor" : "/dashboard"

      return {
        success: true,
        token: mockToken,
        user: userData,
        redirectTo,
        message: "Login successful",
      }
    }

    return { success: false, message: "Invalid email or password" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An error occurred during login" }
  }
}

export async function loginUser(formData: FormData) {
  return loginAction(null, formData)
}

export async function logoutUser(): Promise<void> {
  try {
    const cookieStore = cookies()

    // Try to logout from Laravel backend
    const token = cookieStore.get("auth_token")?.value
    if (token && !token.startsWith("mock_token_")) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
      } catch (error) {
        console.log("Backend logout failed")
      }
    }

    // Clear cookies
    cookieStore.delete("auth_token")
    cookieStore.delete("user_data")
  } catch (error) {
    console.error("Logout error:", error)
  }

  redirect("/login")
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const userData = cookieStore.get("user_data")?.value

    if (userData) {
      return JSON.parse(userData)
    }
  } catch (error) {
    console.error("Failed to get current user:", error)
  }

  return null
}

export async function checkAuth(): Promise<boolean> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth_token")?.value
    return !!token
  } catch (error) {
    console.error("Auth check error:", error)
    return false
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  return user
}

export async function requireRole(allowedRoles: string[]): Promise<User> {
  const user = await requireAuth()
  if (!allowedRoles.includes(user.role)) {
    redirect("/unauthorized")
  }
  return user
}
