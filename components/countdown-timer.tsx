"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function CountdownTimer() {
  const { t } = useLanguage()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-03-15T09:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-medium">{t("eventStarts")}</span>
          </div>
          <div className="text-xs text-green-200">March 15, 2025 • 9:00 AM</div>
        </div>

        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{timeLeft.days.toString().padStart(2, "0")}</div>
            <div className="text-xs text-green-200">{t("daysLeft")}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
            <div className="text-xs text-green-200">{t("hoursLeft")}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
            <div className="text-xs text-green-200">{t("minutesLeft")}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
            <div className="text-xs text-green-200">{t("secondsLeft")}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
