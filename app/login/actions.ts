"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface LoginResponse {
  success: boolean
  message: string
  user?: {
    id: number
    name: string
    email: string
    role: string
  }
  token?: string
}

export async function loginAction(prevState: any, formData: FormData): Promise<LoginResponse> {
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

      cookieStore.set("user-role", data.user.role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      // Redirect based on role
      if (data.user.role === "admin") {
        redirect("/admin")
      } else if (data.user.role === "supervisor") {
        redirect("/supervisor")
      } else {
        redirect("/dashboard")
      }
    } else {
      const errorData = await response.json()
      return {
        success: false,
        message: errorData.message || "Invalid credentials",
      }
    }
  } catch (error) {
    console.log("Laravel backend not available, using mock authentication")

    // Mock authentication for development
    const mockUsers = [
      { email: "admin@nis.edu.kz", password: "admin123", role: "admin", name: "Admin User" },
      { email: "supervisor@nis.edu.kz", password: "supervisor123", role: "supervisor", name: "Supervisor User" },
      { email: "user@nis.edu.kz", password: "user123", role: "user", name: "Regular User" },
    ]

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      // Set mock authentication cookies
      const cookieStore = await cookies()
      cookieStore.set("auth-token", "mock-token-" + Date.now(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      cookieStore.set("user-role", user.role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      // Redirect based on role
      if (user.role === "admin") {
        redirect("/admin")
      } else if (user.role === "supervisor") {
        redirect("/supervisor")
      } else {
        redirect("/dashboard")
      }
    } else {
      return {
        success: false,
        message: "Invalid credentials. Try: admin@nis.edu.kz/admin123",
      }
    }
  }

  return {
    success: false,
    message: "Login failed",
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  cookieStore.delete("user-role")
  redirect("/login")
}
