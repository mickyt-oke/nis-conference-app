// 
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
export async function login(email: string, password: string): Promise<LoginResult> {
    const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }) 
    const data = await res.json()
    if (res.ok) {
        // Set cookie
        const cookieStore = cookies()
        cookieStore.set("token", data.token, { httpOnly: true, path: "/" })
        return { success: true, redirectTo: "/", user: data.user }
    } else {
        return { success: false, message: data.message }
    }
}

export async function logout() {
    const cookieStore = cookies()
    cookieStore.delete("token", { path: "/" })
    redirect("/login")
}
export async function getCurrentUser() {
    const cookieStore = cookies()
    const token = cookieStore.get("token")?.value
    if (!token) return null
    const res = await fetch("http://localhost:3001/api/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (res.ok) {
        const data = await res.json()
        return data.user
    } else {
        return null
    }   
}