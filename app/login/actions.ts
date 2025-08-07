"use server"

import { redirect } from "next/navigation"

interface LoginResult {
  success: boolean
  error?: string
  user?: {
    id: number
    username: string
    email: string
    role: string
    name: string
    department: string
  }
}

export async function loginAction(prevState: any, formData: FormData): Promise<LoginResult> {
  try {
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    // Validation
    if (!username || !password) {
      return {
        success: false,
        error: "Username and password are required",
      }
    }

    // Call Laravel backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Invalid username or password",
      }
    }

    // Store the token in a cookie (in production, use httpOnly cookies)
    const { cookies } = await import("next/headers")
    const cookieStore = await cookies()

    cookieStore.set("auth_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    })

    // Store user data
    cookieStore.set("user_data", JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    })

    // Log successful login
    console.log(`Successful login: ${data.user.username} (${data.user.role}) at ${new Date().toISOString()}`)

    // Redirect based on role
    if (data.user.role === "admin") {
      redirect("/admin")
    } else if (data.user.role === "supervisor") {
      redirect("/supervisor")
    } else {
      redirect("/dashboard")
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      error: "Connection error. Please check if the backend server is running.",
    }
  }
}

export async function logoutUser() {
  const { cookies } = await import("next/headers")
  const cookieStore = await cookies()

  // Get the token for logout API call
  const token = cookieStore.get("auth_token")?.value

  if (token) {
    try {
      // Call Laravel logout endpoint
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
    } catch (error) {
      console.error("Logout API error:", error)
    }
  }

  // Clear cookies
  cookieStore.delete("auth_token")
  cookieStore.delete("user_data")

  redirect("/login")
}

export async function getCurrentUser() {
  try {
    const { cookies } = await import("next/headers")
    const cookieStore = await cookies()
    const userDataCookie = cookieStore.get("user_data")
    const tokenCookie = cookieStore.get("auth_token")

    if (!userDataCookie || !tokenCookie) {
      return null
    }

    const userData = JSON.parse(userDataCookie.value)

    // Verify token with backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      return null
    }

    return userData
  } catch (error) {
    console.error("Session error:", error)
    return null
  }
}
