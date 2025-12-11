"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface User {
  userId: number
  username: string
  email: string
  role: string
  name: string
  department: string
  loginTime: string
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie) {
      return null
    }

    return JSON.parse(sessionCookie.value)
  } catch (error) {
    console.error("Session parsing error:", error instanceof Error ? error.message : String(error))
    return null
  }
}

export async function requireAuth(allowedRoles?: string[]) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  if (allowedRoles && !allowedRoles.includes(session.role)) {
    redirect("/unauthorized")
  }

  return session
}

export async function requireAdmin() {
  return requireAuth(["admin"])
}

export async function requireSupervisor() {
  return requireAuth(["admin", "supervisor"])
}
