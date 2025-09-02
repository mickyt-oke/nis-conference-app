"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface LoginResponse {
  success: boolean
  message: string
  user?: {
    id: number
    email: string
    name: string
    role: string
  }
  token?: string
}

interface User {
  id: number
  email: string
  name: string
  role: string
}

// Mock users for development
const mockUsers = [
  { id: 1, email: "admin@nis.edu.kh", password: "admin123", name: "Admin User", role: "admin" },
  { id: 2, email: "supervisor@nis.edu.kh", password: "supervisor123", name: "Supervisor User", role: "supervisor" },
  { id: 3, email: "user@nis.edu.kh", password: "user123", name: "Regular User", role: "user" },
]

export async function loginAction(formData: FormData): Promise<LoginResponse> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    }
  }

  try {
    // Try to connect to Laravel backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const data = await response.json()

      // Set authentication cookie
      const cookieStore = await cookies()
      cookieStore.set("auth-token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      cookieStore.set("user-data", JSON.stringify(data.user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return {
        success: true,
        message: "Login successful",
        user: data.user,
        token: data.token,
      }
    }
  } catch (error) {
    console.log("Laravel backend not available, using mock authentication")
  }

  // Fallback to mock authentication
  const user = mockUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    }
  }

  // Set mock authentication cookies
  const cookieStore = await cookies()
  const mockToken = `mock-token-${user.id}-${Date.now()}`

  cookieStore.set("auth-token", mockToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  cookieStore.set(
    "user-data",
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
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  )

  return {
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token: mockToken,
  }
}

export async function logoutUser(): Promise<void> {
  const cookieStore = await cookies()

  // Clear authentication cookies
  cookieStore.delete("auth-token")
  cookieStore.delete("user-data")

  // Redirect to login page
  redirect("/login")
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const userData = cookieStore.get("user-data")

    if (!userData?.value) {
      return null
    }

    return JSON.parse(userData.value) as User
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")
  return !!token?.value
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
