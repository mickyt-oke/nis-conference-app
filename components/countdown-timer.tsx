"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  // Set target date to October 22, 2025, 9:00 AM
  const targetDate = new Date("2025-10-22T09:00:00").getTime()

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
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
  }, [targetDate])

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}:${month}:${year}`
  }

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <div className="bg-black/20 backdrop-blur-md rounded-lg p-6 text-white max-w-md mx-auto">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
          <Calendar className="h-5 w-5" />
          Next Conference Event
        </h3>
        <div className="text-sm opacity-90 mb-1">
          <span className="font-medium">Date:</span> {formatDate(new Date(targetDate))}
        </div>
        <div className="text-sm opacity-90 flex items-center justify-center gap-1">
          <Clock className="h-4 w-4" />
          <span className="font-medium">Time:</span> {formatTime(new Date(targetDate))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="bg-white/10 rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.days.toString().padStart(2, "0")}</div>
          <div className="text-xs uppercase tracking-wide opacity-80">Days</div>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
          <div className="text-xs uppercase tracking-wide opacity-80">Hours</div>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
          <div className="text-xs uppercase tracking-wide opacity-80">Minutes</div>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
          <div className="text-xs uppercase tracking-wide opacity-80">Seconds</div>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm opacity-90">Annual Immigration Conference 2025</p>
        <p className="text-xs opacity-75">Abuja International Conference Centre</p>
      </div>
    </div>
  )
}
