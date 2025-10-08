"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { Layout } from "@/components/layout"
import { LoadingSpinner } from "@/components/loading-spinner"
import { CountdownTimer } from "@/components/countdown-timer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  FileText,
  Camera,
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Award,
  Clock,
  MapPin,
  Star,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

// Lazy load components
const ConferenceDestination = lazy(() =>
  import("@/components/conference-destination").then((module) => ({ default: module.ConferenceDestination })),
)
const ContactSection = lazy(() =>
  import("@/components/contact-section").then((module) => ({ default: module.ContactSection })),
)

const heroImages = [
  "/nis-cover.jpg?height=600&width=1200&text=Conference+Hall",
  "/conference-1.jpg?height=600&width=1200&text=Networking+Event",
  "/conference-2.jpg?height=600&width=1200&text=Keynote+Speaker",
  "/conference-3.jpg?height=600&width=1200&text=Panel+Discussion",
  "/conference-5.jpg?height=600&width=1200&text=Awards+Ceremony",
]

export default function HomePage() {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const features = [
    {
      icon: Calendar,
      title: t("conferenceManagement"),
      description: t("conferenceManagementDesc"),
      href: "/conferences",
    },
    {
      icon: Users,
      title: t("speakerProfiles"),
      description: t("speakerProfilesDesc"),
      href: "/speakers",
    },
    {
      icon: FileText,
      title: t("documentCenter"),
      description: t("documentCenterDesc"),
      href: "/documents",
    },
    {
      icon: Camera,
      title: t("mediaGallery"),
      description: t("mediaGalleryDesc"),
      href: "/gallery",
    },
  ]

  const stats = [
    { number: "200+", label: t("registeredParticipants"), icon: Users },
    { number: "50+", label: t("expertSpeakers"), icon: Award },
    { number: "25+", label: t("stakeholdersRepresented"), icon: Globe },
    { number: "5", label: t("daysOfLearning"), icon: Clock },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Opening Ceremony & Keynote Address",
      date: "November 5, 2025",
      time: "9:00 AM - 11:00 AM",
      location: "Main Auditorium",
      speaker: "Hon. Minister of Interior",
      type: "Keynote",
    },
    {
      id: 2,
      title: "Digital Immigration Systems Panel",
      date: "November 6, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Conference Hall A",
      speaker: "Tech Industry Leaders",
      type: "Panel",
    },
    {
      id: 3,
      title: "Border Security Workshop",
      date: "November 6, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Workshop Room 1",
      speaker: "Security Experts",
      type: "Workshop",
    },
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1))
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Layout showLoading={isLoading}>
      {/* Hero Section with Background Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Conference scene ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Badge className="bg-green-600 hover:bg-green-700 text-white mb-4">{t("annualConference")}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t("heroTitle")}{" "} 
              <span className="block text-green-400">{t("heroSubtitle")}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">{t("heroDescription")}</p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <CountdownTimer />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                {t("registerNow")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/conferences">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 bg-transparent"
              >
                {t("viewProgram")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("conferenceManagementFeatures")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive platform designed as a repository for all conferences and
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                      <feature.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("upcomingEvents")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("upcomingEventsDesc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={event.type === "Keynote" ? "default" : "secondary"}>{event.type}</Badge>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{event.speaker}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/conferences">
              <Button className="bg-green-600 hover:bg-green-700">
                {t("viewFullProgram")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lazy-loaded sections */}
      <Suspense fallback={<LoadingSpinner />}>
        <ConferenceDestination />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <ContactSection />
      </Suspense>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Shield className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">{t("joinFuture")}</h2>
            <p className="text-xl mb-8 text-green-100">{t("joinFutureDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                  {t("registerToday")}
                  <CheckCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/speakers">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 bg-transparent"
                >
                  {t("meetSpeakers")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
