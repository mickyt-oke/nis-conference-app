"use client"

import { useState, lazy, Suspense } from "react"
import { Layout } from "@/components/layout"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useLanguage } from "@/contexts/language-context"

// Lazy load the login form component
const LoginForm = lazy(() => import("./login-form").then((module) => ({ default: module.LoginForm })))

export default function LoginPage() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading
  setTimeout(() => setIsLoading(false), 1000)

  return (
    <Layout showLoading={isLoading}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<LoadingSpinner />}>
          <LoginForm />
        </Suspense>
      </div>
    </Layout>
  )
}
