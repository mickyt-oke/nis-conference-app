"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all duration-300 hover:scale-110"
      size="icon"
      aria-label={t("backToTop")}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}
