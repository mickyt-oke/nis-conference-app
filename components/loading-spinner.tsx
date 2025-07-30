"use client"

import Image from "next/image"
import { Shield } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-green-200 border-t-green-600 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/nis-logo.png" alt="NIS Logo" width={64} height={64} className="rounded-full" />
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 mb-4">
          <Shield className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-800">Nigeria Immigration Service</h2>
        </div>

        <p className="text-gray-600 mb-2">Loading Conference Management System...</p>

        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
