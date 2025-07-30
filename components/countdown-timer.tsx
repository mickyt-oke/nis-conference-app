"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock } from "lucide-react"

interface CountdownTimerProps {
  targetDate: string
  eventName: string
}

export function CountdownTimer({ targetDate, eventName }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
      <div className="flex items-center justify-center mb-4">
        <Calendar className="h-5 w-5 mr-2" />
        <h3 className="text-lg font-semibold">{eventName}</h3>
      </div>

      <div className="text-center mb-4">
        <p className="text-green-100 text-sm mb-1">Event Date</p>
        <p className="text-xl font-bold">{formatDate(targetDate)}</p>
      </div>

      <div className="flex items-center justify-center mb-4">
        <Clock className="h-4 w-4 mr-2" />
        <span className="text-sm text-green-100">Time Remaining</span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white/20 rounded-lg py-3 px-2">
          <div className="text-2xl font-bold">{timeLeft.days.toString().padStart(2, "0")}</div>
          <div className="text-xs text-green-100">Days</div>
        </div>
        <div className="bg-white/20 rounded-lg py-3 px-2">
          <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
          <div className="text-xs text-green-100">Hours</div>
        </div>
        <div className="bg-white/20 rounded-lg py-3 px-2">
          <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
          <div className="text-xs text-green-100">Min</div>
        </div>
        <div className="bg-white/20 rounded-lg py-3 px-2">
          <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
          <div className="text-xs text-green-100">Sec</div>
        </div>
      </div>
    </div>
  )
}
