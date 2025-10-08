"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"

// Simulated database - In production, this would be a real database
const users = [
  {
    id: 1,
    username: "admin",
    email: "admin@immigration.gov.ng",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // admin123
    role: "admin",
    name: "System Administrator",
    department: "IT Department",
    status: "active",
    lastLogin: null,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    username: "supervisor",
    email: "supervisor@immigration.gov.ng",
    password: "$2a$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm", // super123
    role: "supervisor",
    name: "Department Supervisor",
    department: "Operations",
    status: "active",
    lastLogin: null,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 3,
    username: "user",
    email: "user@immigration.gov.ng",
    password: "$2a$10$6BjcQVKzjqNq2B5p2RealOuAuXMcPz7PotgGQ/E1NcG/ExD2vgdaa", // user123
    role: "user",
    name: "Regular User",
    department: "General",
    status: "active",
    lastLogin: null,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

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

export async function loginUser(formData: FormData): Promise<LoginResult> {
  try {
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const remember = formData.get("remember") === "on"

    // Validation
    if (!username || !password) {
      return {
        success: false,
        error: "Username and password are required",
      }
    }

    // Find user by username or email
    const user = users.find((u) => u.username === username || u.email === username)

    if (!user) {
      return {
        success: false,
        error: "Invalid username or password",
      }
    }

    // Check if user is active
    if (user.status !== "active") {
      return {
        success: false,
        error: "Account is inactive. Please contact administrator.",
      }
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return {
        success: false,
        error: "Invalid username or password",
      }
    }

    // Create session
    const sessionData = {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      name: user.name,
      department: user.department,
      loginTime: new Date().toISOString(),
    }

    // Set session cookie
    const cookieStore = await cookies()
    const maxAge = remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30 days or 1 day

    cookieStore.set("session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: maxAge,
      path: "/",
    })

    // Update last login (in real app, this would update the database)
    user.lastLogin = new Date()

    // Log successful login
    console.log(`Successful login: ${user.username} (${user.role}) at ${new Date().toISOString()}`)

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name,
        department: user.department,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      error: "An internal error occurred. Please try again.",
    }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/login")
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie) {
      return null
    }

    const sessionData = JSON.parse(sessionCookie.value)

    // Verify session is still valid
    const user = users.find((u) => u.id === sessionData.userId)
    if (!user || user.status !== "active") {
      return null
    }

    return sessionData
  } catch (error) {
    console.error("Session error:", error)
    return null
  }
}
