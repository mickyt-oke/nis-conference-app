"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Users,
  FileText,
  Calendar,
  Globe,
  Lock,
  Database,
  Smartphone,
  ChevronRight,
  Play,
  Radio,
} from "lucide-react"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLive, setIsLive] = useState(true) // Simulating live status

  const heroImages = [
    "/placeholder.svg?height=600&width=1200&text=NIS+Headquarters+Building",
    "/placeholder.svg?height=600&width=1200&text=Border+Control+Operations",
    "/placeholder.svg?height=600&width=1200&text=Conference+Hall+Session",
    "/placeholder.svg?height=600&width=1200&text=Passport+Services+Center",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  const galleryCategories = [
    {
      id: "conferences",
      name: "Conferences",
      images: [
        {
          src: "/placeholder.svg?height=300&width=400&text=Annual+Conference+2024",
          title: "Annual Conference 2024",
          description: "Opening ceremony with key stakeholders and immigration officials",
          date: "2024-03-15",
          category: "conferences",
        },
        {
          src: "/placeholder.svg?height=300&width=400&text=Keynote+Speaker",
          title: "Keynote Address",
          description: "Minister delivering keynote on immigration policy reforms",
          date: "2024-03-16",
          category: "conferences",
        },
        {
          src: "/placeholder.svg?height=300&width=400&text=Panel+Discussion",
          title: "Expert Panel Discussion",
          description: "Regional immigration experts discussing border security",
          date: "2024-03-17",
          category: "conferences",
        },
        {
          src: "/placeholder.svg?height=300&width=400&text=Awards+Ceremony",
          title: "Excellence Awards",
          description: "Recognition ceremony for outstanding service members",
          date: "2024-03-18",
          category: "conferences",
        },
      ],
    },
    {
      id: "training",
      name: "Training",
      images: [
        {
          src: "/placeholder.svg?height=300&width=400&text=Skills+Development",
          title: "Professional Development Workshop",
          description: "Advanced training on document verification techniques",
          date: "2024-02-20",
          category: "training",
        },
        {
          src: "/placeholder.svg?height=300&width=400&text=Border+Security",
          title: "Border Security Training",
          description: "Specialized training for border control officers",
          date: "2024-02-25",
          category: "training",
        },
        {
          src: "/placeholder.svg?height=300&width=400&text=Technology+Training",
          title: "Technology Integration",
          description: "Training on new biometric systems and digital processes",
          date: "2024-03-01",
          category: "training",
        },
      ],
    },
    {
      id: "events",
      name: "Official Events",
      images: [
        {
          src: "/placeholder.svg?height=300&width=400&text=Ministerial+Visit",
          title: "Ministerial Visit",
          description: "Minister of Interior inspecting NIS facilities",
          date: "2024-01-15",
          category: "events",
        },
        {
          src: "/placeholder.svg?height=300&width=400&text=Independence+Day",
          title: "Independence Day Celebration",
          description: "NIS participation in national independence celebrations",
          date: "2023-10-01",
          category: "events",
        },
        {
          src: "/placeholder.svg?height=300&width=400&text=Commissioning",
          title: "New Facility Commissioning",
          description: "Opening of new passport production center",
          date: "2024-01-30",
          category: "events",
        },
      ],
    },
    {
      id: "facilities",
      name: "Facilities",
      images: [
        {
          src: "/placeholder.svg?height=300&width=400&text=Headquarters",
          title: "NIS Headquarters",
          description: "Main administrative building in Abuja",
          date: "2024-01-01",
          category: "facilities",
        },
        {
          src: "/placeholder.svg?height=300&width=400&text=Training+Center",
          title: "Training Academy",
          description: "State-of-the-art training facilities for officers",
          date: "2024-01-05",
          category: "facilities",
        },
        {
          src: "/placeholder.svg?height=300&width=400&text=Border+Post",
          title: "Border Control Point",
          description: "Modern border checkpoint with advanced screening",
          date: "2024-01-10",
          category: "facilities",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-800 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">Nigeria Immigration Service</h1>
                <p className="text-sm text-green-100">Conference Management System</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-green-200 transition-colors">
                Home
              </Link>
              <Link href="/conferences" className="hover:text-green-200 transition-colors">
                Conferences
              </Link>
              <Link href="/speakers" className="hover:text-green-200 transition-colors">
                Speakers
              </Link>
              <Link href="/documents" className="hover:text-green-200 transition-colors">
                Documents
              </Link>
              <Link href="/gallery" className="hover:text-green-200 transition-colors">
                Gallery
              </Link>
              <Link href="/media" className="hover:text-green-200 transition-colors">
                Media
              </Link>
              <Link href="/register" className="hover:text-green-200 transition-colors">
                Register
              </Link>

              {/* Livestream Button */}
              <Link href="/media">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white border-0 flex items-center gap-2"
                >
                  {isLive && <Radio className="h-4 w-4 animate-pulse" />}
                  <Play className="h-4 w-4" />
                  {isLive ? "LIVE" : "Stream"}
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-green-800 bg-transparent"
                >
                  Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Background Carousel */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`NIS Background ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-green-900/70" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            Version 1.0 - Conference Management System
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Nigeria Immigration Service Conference Website</h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            A comprehensive digital platform for managing annual conferences, archiving proceedings, and enhancing
            institutional knowledge management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-800 hover:bg-green-50">
              Explore Platform <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-800 bg-transparent"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming conference management through digital innovation and systematic documentation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Centralized Repository",
                description: "Unified storage and retrieval of all conference materials and documentation",
              },
              {
                icon: FileText,
                title: "Historical Archiving",
                description: "Systematic preservation of past conference proceedings and materials",
              },
              {
                icon: Globe,
                title: "Real-time Sharing",
                description: "Live information sharing during conference events and sessions",
              },
              {
                icon: Users,
                title: "Participant Management",
                description: "Digital attendance tracking and comprehensive participant management",
              },
              {
                icon: Lock,
                title: "Secure Access",
                description: "Role-based authentication with secure document repository and version control",
              },
              {
                icon: Smartphone,
                title: "Mobile Responsive",
                description: "Optimized interface for all devices with seamless user experience",
              },
            ].map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Conference Gallery</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visual documentation of our conferences, training sessions, and official events
            </p>
          </div>

          <Tabs defaultValue="conferences" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {galleryCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {galleryCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.images.map((image, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={image.src || "/placeholder.svg"}
                          alt={image.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {category.name}
                        </Badge>
                        <h3 className="font-semibold text-sm mb-2">{image.title}</h3>
                        <p className="text-xs text-gray-600 mb-2">{image.description}</p>
                        <p className="text-xs text-gray-500">{image.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="text-center mt-8">
            <Link href="/gallery">
              <Button variant="outline" size="lg">
                View Full Gallery <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Conferences */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Conferences</h2>
            <p className="text-xl text-gray-600">Latest conference activities and upcoming events</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Annual Strategic Planning Conference 2024",
                date: "March 15-18, 2024",
                location: "Abuja, Nigeria",
                status: "Completed",
                attendees: 250,
                description:
                  "Comprehensive strategic planning session focusing on immigration policy reforms and digital transformation initiatives.",
              },
              {
                title: "Border Security Enhancement Summit",
                date: "April 10-12, 2024",
                location: "Lagos, Nigeria",
                status: "Upcoming",
                attendees: 180,
                description:
                  "Technical conference on advanced border security technologies and international cooperation frameworks.",
              },
              {
                title: "Training and Development Workshop",
                date: "May 5-7, 2024",
                location: "Port Harcourt, Nigeria",
                status: "Registration Open",
                attendees: 120,
                description:
                  "Professional development workshop for immigration officers focusing on customer service and modern processing techniques.",
              },
            ].map((conference, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant={
                        conference.status === "Completed"
                          ? "secondary"
                          : conference.status === "Upcoming"
                            ? "default"
                            : "outline"
                      }
                    >
                      {conference.status}
                    </Badge>
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">{conference.title}</CardTitle>
                  <CardDescription>
                    {conference.date} • {conference.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{conference.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{conference.attendees} Attendees</span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
