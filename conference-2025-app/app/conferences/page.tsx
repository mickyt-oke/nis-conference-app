"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { Layout } from "@/components/layout"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Clock, Search, Filter, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import {
  FileText,
  Camera,
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Award,
  Star,
} from "lucide-react"           
import { useLanguage } from "@/contexts/language-context"

// Lazy load components
const ConferenceDestination = lazy(() =>
  import("@/components/conference-destination").then((module) => ({ default: module.ConferenceDestination })),
)
const ContactSection = lazy(() =>
  import("@/components/contact-section").then((module) => ({ default: module.ContactSection })),
)

export default function ConferencesPage() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const conferences = [
    {
      id: 1,
      title: "Annual Strategic Planning Conference 2024",
      date: "March 15-17, 2024",
      location: "International Conference Centre, Abuja",
      status: "Completed",
      attendees: 250,
      description: "Strategic planning and policy development for the Nigeria Immigration Service",
      image: "/placeholder.svg?height=200&width=400",
      sessions: 12,
      speakers: 8,
    },
    {
      id: 2,
      title: "Border Security Summit 2024",
      date: "June 10-12, 2024",
      location: "Eko Hotel & Suites, Lagos",
      status: "Upcoming",
      attendees: 180,
      description: "Enhancing border security through technology and international cooperation",
      image: "/placeholder.svg?height=200&width=400",
      sessions: 10,
      speakers: 12,
    },
    {
      id: 3,
      title: "Digital Transformation Workshop",
      date: "September 5-7, 2024",
      location: "Hotel Presidential, Port Harcourt",
      status: "Planning",
      attendees: 120,
      description: "Modernizing immigration processes through digital innovation",
      image: "/placeholder.svg?height=200&width=400",
      sessions: 8,
      speakers: 6,
    },
    {
      id: 4,
      title: "Regional Immigration Officers Conference",
      date: "November 20-22, 2024",
      location: "Transcorp Hilton, Abuja",
      status: "Planning",
      attendees: 300,
      description: "Coordination and best practices sharing among regional offices",
      image: "/placeholder.svg?height=200&width=400",
      sessions: 15,
      speakers: 10,
    },
  ]

  const pastConferences = [
    {
      title: "Immigration Policy Review 2023",
      date: "December 2023",
      attendees: 200,
      documents: 45,
    },
    {
      title: "Training & Development Summit 2023",
      date: "October 2023",
      attendees: 150,
      documents: 32,
    },
    {
      title: "International Cooperation Forum 2023",
      date: "August 2023",
      attendees: 180,
      documents: 38,
    },
  ]

  useEffect(() => {
      // Simulate loading
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 2000)
  
      return () => clearTimeout(timer)
    }, [])

  return (
    <Layout showLoading={isLoading}>
    <div className="min-h-screen bg-gray-50">
      {/* Header 
      <header className="bg-green-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Conference Management</h1>
              <p className="text-green-200">Manage and track all NIS conference events</p>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>*/}

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Search conferences..." className="w-full" />
              </div>
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Conference Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Conferences</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="archive">Archive</TabsTrigger>
          </TabsList>

          {/* All Conferences */}
          <TabsContent value="all">
            <div className="grid gap-6">
              {conferences.map((conference) => (
                <Card key={conference.id} className="hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <Image
                        src={conference.image || "/placeholder.svg"}
                        alt={conference.title}
                        width={400}
                        height={200}
                        className="w-full h-48 md:h-full object-cover rounded-l-lg"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{conference.title}</h3>
                          <p className="text-gray-600 mb-4">{conference.description}</p>
                        </div>
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
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {conference.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {conference.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {conference.attendees} attendees
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {conference.sessions} sessions
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button size="sm">View Details</Button>
                        <Button size="sm" variant="outline">
                          View Documents
                        </Button>
                        <Button size="sm" variant="outline">
                          Speakers
                        </Button>
                        {conference.status === "Upcoming" && (
                          <Button size="sm" variant="outline">
                            Register
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upcoming Conferences */}
          <TabsContent value="upcoming">
            <div className="grid gap-6">
              {conferences
                .filter((c) => c.status === "Upcoming" || c.status === "Planning")
                .map((conference) => (
                  <Card key={conference.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{conference.title}</CardTitle>
                          <CardDescription>{conference.description}</CardDescription>
                        </div>
                        <Badge variant="default">{conference.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-green-600" />
                          {conference.date}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-green-600" />
                          {conference.location}
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="w-4 h-4 mr-2 text-green-600" />
                          {conference.attendees} expected
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <Button size="sm">Register Now</Button>
                        <Button size="sm" variant="outline">
                          View Agenda
                        </Button>
                        <Button size="sm" variant="outline">
                          Speakers
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Completed Conferences */}
          <TabsContent value="completed">
            <div className="grid gap-6">
              {conferences
                .filter((c) => c.status === "Completed")
                .map((conference) => (
                  <Card key={conference.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{conference.title}</CardTitle>
                          <CardDescription>{conference.description}</CardDescription>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-green-600" />
                          {conference.date}
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="w-4 h-4 mr-2 text-green-600" />
                          {conference.attendees} attended
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 mr-2 text-green-600" />
                          {conference.sessions} sessions
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <Button size="sm">View Summary</Button>
                        <Button size="sm" variant="outline">
                          Download Materials
                        </Button>
                        <Button size="sm" variant="outline">
                          View Photos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Archive */}
          <TabsContent value="archive">
            <Card>
              <CardHeader>
                <CardTitle>Conference Archive</CardTitle>
                <CardDescription>Historical conference records and materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {pastConferences.map((conference, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{conference.title}</h4>
                        <p className="text-sm text-gray-600">{conference.date}</p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{conference.attendees} attendees</span>
                        <span>{conference.documents} documents</span>
                        <Button size="sm" variant="outline">
                          View Archive
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </Layout>
  )
}
