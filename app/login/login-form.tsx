"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { loginAction } from "./actions"
import { useActionState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Remove LoginFormState and use LoginResult directly
import type { LoginResult } from "./actions";

export function LoginForm() {
  const { t } = useLanguage()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  // Use correct types for useActionState
  const [state, formAction, isPending] = useActionState(
    async (_state: LoginResult | null, formData: FormData) => loginAction(formData),
    null as LoginResult | null
  )

  // Handle redirect after successful login
  useEffect(() => {
    if (state?.success && state.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Image
              src="/nis-logo.png"
              alt="NIS Logo"
              width={80}
              height={80}
              className="rounded-full border-4 border-green-600"
            />
            <Shield className="absolute -bottom-2 -right-2 h-8 w-8 bg-green-600 text-white rounded-full p-1" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{t("login")} to NIS Conference</h2>
        <p className="mt-2 text-sm text-gray-600">Access the conference management system</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("login")}</CardTitle>
          <CardDescription>Enter your credentials to access the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            {/* Display disappearing error or success messages */}
            {state?.message && !state.success && (
              <Alert variant="destructive">
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
            {state?.success && (
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">{state.message}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="pr-10"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("loading")}
                </>
              ) : (
                t("login")
              )}
            </Button>

            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="text-green-600 hover:underline">
                Forgot password?
              </Link>
              <Link href="/admin/signup" className="text-green-600 hover:underline">
                Admin signup
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
