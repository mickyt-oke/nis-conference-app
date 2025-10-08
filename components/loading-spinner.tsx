"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function LoadingSpinner() {
  const { t } = useLanguage()

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/nis-logo.png" alt="NIS Logo" width={48} height={48} className="rounded-full" />
          </div>
        </div>
        <div className="text-green-600 font-semibold text-lg mb-2">Nigeria Immigration Service</div>
        <div className="text-gray-600 flex items-center justify-center gap-1">
          <span>{t("loading")}</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-1 h-1 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-1 h-1 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
