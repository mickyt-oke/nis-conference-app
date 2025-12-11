"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2, Mail } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token")
      const email = searchParams.get("email")

      if (!token || !email) {
        setStatus("error")
        setMessage("Invalid or missing verification link.")
        return
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        const response = await fetch(`${apiUrl}/api/admin/verify-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            token,
            email,
          }),
        })

        const data = await response.json()

        if (response.ok && data.success) {
          setStatus("success")
          setMessage(data.message || "Email verified successfully!")
        } else {
          setStatus("error")
          setMessage(data.message || "Email verification failed. Please try again.")
        }
      } catch (error) {
        console.error("Verification error:", error)
        setStatus("error")
        setMessage("An unexpected error occurred during verification.")
      }
    }

    verifyEmail()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Email Verification</h1>
          <p className="text-gray-600 mt-2">Verifying your email address</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            {status === "loading" && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-12 w-12 text-green-600 animate-spin mb-4" />
                <p className="text-gray-600">Please wait while we verify your email...</p>
              </div>
            )}

            {status === "success" && (
              <>
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{message}</AlertDescription>
                </Alert>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-green-900 mb-2">What's Next?</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>✓ Your email has been verified</li>
                    <li>✓ Your admin account is now active</li>
                    <li>✓ You can now login to the dashboard</li>
                  </ul>
                </div>

                <Link href="/login" className="w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Go to Login</Button>
                </Link>
              </>
            )}

            {status === "error" && (
              <>
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{message}</AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    If the link has expired, you can request a new verification email.
                  </p>

                  <Link href="/admin/signup" className="w-full">
                    <Button variant="outline" className="w-full">
                      Back to Registration
                    </Button>
                  </Link>

                  <Link href="/login" className="w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Go to Login</Button>
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
