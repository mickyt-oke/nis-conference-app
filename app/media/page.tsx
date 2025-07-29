"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Shield,
  Play,
  Radio,
  Calendar,
  Users,
  ExternalLink,
  Search,
  Youtube,
  Facebook,
  Video,
  Clock,
  Eye,
  ArrowLeft,
} from "lucide-react"
import { Footer } from "@/components/footer"

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLive, setIsLive] = useState(true)

  const liveStreams = [
    {
      id: 1,
      title: "Annual Conference 2024 - Day 2 Keynote",
      platform: "YouTube",
      platformIcon: Youtube,
      platformColor: "text-red-600",
      url: "https://youtube.com/watch?v=example1",
      isLive: true,
      viewers: 1247,
      startTime: "09:00 AM WAT",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Live+Keynote+Session",
      description: "Minister of Interior delivering keynote address on immigration policy reforms",
    },
    {
      id: 2,
      title: "Panel Discussion - Border Security",
      platform: "Facebook",
      platformIcon: Facebook,
      platformColor: "text-blue-600",
      url: "https://facebook.com/watch/live/example2",
      isLive: true,
      viewers: 892,
      startTime: "02:00 PM WAT",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Panel+Discussion",
      description: "Expert panel discussing modern border security challenges and solutions",
    },
    {
      id: 3,
      title: "Training Workshop - Digital Processing",
      platform: "Vimeo",
      platformIcon: Video,
      platformColor: "text-blue-500",
      url: "https://vimeo.com/event/example3",
      isLive: false,
      viewers: 0,
      startTime: "10:00 AM WAT Tomorrow",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Training+Workshop",
      description: "Hands-on training session on new digital passport processing systems",
    },
  ]

  const recordedVideos = [
    {
      id: 1,
      title: "Opening Ceremony - Annual Conference 2024",
      platform: "YouTube",
      platformIcon: Youtube,
      platformColor: "text-red-600",
      url: "https://youtube.com/watch?v=recorded1",
      duration: "2:45:30",
      views: 15420,
      uploadDate: "2024-03-15",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Opening+Ceremony",
      description: "Complete recording of the opening ceremony with welcome addresses and keynote presentations",
      category: "Conference",
    },
    {
      id: 2,
      title: "Immigration Policy Reform Presentation",
      platform: "Vimeo",
      platformIcon: Video,
      platformColor: "text-blue-500",
      url: "https://vimeo.com/video/recorded2",
      duration: "1:32:15",
      views: 8750,
      uploadDate: "2024-03-16",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Policy+Reform",
      description: "Detailed presentation on proposed immigration policy changes and implementation timeline",
      category: "Policy",
    },
    {
      id: 3,
      title: "Technology Integration Workshop",
      platform: "YouTube",
      platformIcon: Youtube,
      platformColor: "text-red-600",
      url: "https://youtube.com/watch?v=recorded3",
      duration: "3:15:45",
      views: 12350,
      uploadDate: "2024-03-17",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Tech+Workshop",
      description: "Comprehensive workshop on integrating new biometric and digital systems",
      category: "Training",
    },
    {
      id: 4,
      title: "Q&A Session with Leadership",
      platform: "Facebook",
      platformIcon: Facebook,
      platformColor: "text-blue-600",
      url: "https://facebook.com/watch/recorded4",
      duration: "1:58:20",
      views: 6890,
      uploadDate: "2024-03-18",
      thumbnail: "/placeholder.svg?height=200&width=350&text=QA+Session",
      description: "Interactive Q&A session with NIS leadership addressing staff concerns and feedback",
      category: "Discussion",
    },
    {
      id: 5,
      title: "Awards and Recognition Ceremony",
      platform: "Vimeo",
      platformIcon: Video,
      platformColor: "text-blue-500",
      url: "https://vimeo.com/video/recorded5",
      duration: "2:22:10",
      views: 9540,
      uploadDate: "2024-03-19",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Awards+Ceremony",
      description: "Annual awards ceremony recognizing outstanding service and achievements",
      category: "Ceremony",
    },
    {
      id: 6,
      title: "Regional Commanders Meeting",
      platform: "YouTube",
      platformIcon: Youtube,
      platformColor: "text-red-600",
      url: "https://youtube.com/watch?v=recorded6",
      duration: "4:10:30",
      views: 4250,
      uploadDate: "2024-02-28",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Regional+Meeting",
      description: "Strategic meeting with regional commanders discussing operational improvements",
      category: "Meeting",
    },
  ]

  const webinars = [
    {
      id: 1,
      title: "Digital Transformation in Immigration Services",
      platform: "YouTube",
      platformIcon: Youtube,
      platformColor: "text-red-600",
      url: "https://youtube.com/watch?v=webinar1",
      scheduledDate: "2024-04-15",
      scheduledTime: "11:00 AM WAT",
      registrations: 450,
      thumbnail: "/placeholder.svg?height=200&width=350&text=Digital+Transformation",
      description: "Exploring the future of digital immigration services and citizen experience",
      speaker: "Dr. Amina Hassan, Director of Digital Services",
    },
    {
      id: 2,
      title: "International Cooperation in Border Security",
      platform: "Vimeo",
      platformIcon: Video,
      platformColor: "text-blue-500",
      url: "https://vimeo.com/event/webinar2",
      scheduledDate: "2024-04-22",
      scheduledTime: "02:00 PM WAT",
      registrations: 320,
      thumbnail: "/placeholder.svg?height=200&width=350&text=Border+Security",
      description: "Collaborative approaches to regional border security and information sharing",
      speaker: "Col. Ibrahim Musa, Border Operations Commander",
    },
    {
      id: 3,
      title: "Customer Service Excellence in Immigration",
      platform: "Facebook",
      platformIcon: Facebook,
      platformColor: "text-blue-600",
      url: "https://facebook.com/events/webinar3",
      scheduledDate: "2024-04-29",
      scheduledTime: "10:00 AM WAT",
      registrations: 280,
      thumbnail: "/placeholder.svg?height=200&width=350&text=Customer+Service",
      description: "Best practices for delivering exceptional service to citizens and visitors",
      speaker: "Mrs. Fatima Abdullahi, Head of Public Relations",
    },
  ]

  const filteredRecordedVideos = recordedVideos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-800 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">Nigeria Immigration Service</h1>
                <p className="text-sm text-green-100">Media Center</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-green-200 transition-colors flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              <Link href="/conferences" className="hover:text-green-200 transition-colors">
                Conferences
              </Link>
              <Link href="/gallery" className="hover:text-green-200 transition-colors">
                Gallery
              </Link>
              <Link href="/register" className="hover:text-green-200 transition-colors">
                Register
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">NIS Media Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch live streams, recorded sessions, and upcoming webinars from Nigeria Immigration Service conferences
            and events
          </p>
        </div>

        {/* Live Status Banner */}
        {isLive && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-8 flex items-center justify-center gap-3">
            <Radio className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">LIVE NOW</span>
            <span>Annual Conference 2024 in progress</span>
            <Button variant="secondary" size="sm" className="ml-4">
              Watch Live
            </Button>
          </div>
        )}

        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Radio className="h-4 w-4" />
              Live Streams
            </TabsTrigger>
            <TabsTrigger value="recorded" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Recorded Videos
            </TabsTrigger>
            <TabsTrigger value="webinars" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming Webinars
            </TabsTrigger>
          </TabsList>

          {/* Live Streams Tab */}
          <TabsContent value="live">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveStreams.map((stream) => (
                <Card key={stream.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={stream.thumbnail || "/placeholder.svg"}
                      alt={stream.title}
                      className="w-full h-48 object-cover"
                    />
                    {stream.isLive ? (
                      <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                        <Radio className="h-3 w-3 mr-1 animate-pulse" />
                        LIVE
                      </Badge>
                    ) : (
                      <Badge className="absolute top-2 left-2 bg-gray-600 text-white">Scheduled</Badge>
                    )}
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      <stream.platformIcon className={`h-4 w-4 ${stream.platformColor}`} />
                      {stream.platform}
                    </div>
                    {stream.isLive && (
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        <Eye className="h-3 w-3" />
                        {stream.viewers.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{stream.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {stream.startTime}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{stream.description}</p>
                    <Button className="w-full" variant={stream.isLive ? "default" : "outline"} asChild>
                      <a href={stream.url} target="_blank" rel="noopener noreferrer">
                        {stream.isLive ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Watch Live
                          </>
                        ) : (
                          <>
                            <Calendar className="h-4 w-4 mr-2" />
                            Set Reminder
                          </>
                        )}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recorded Videos Tab */}
          <TabsContent value="recorded">
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecordedVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-green-600 text-white">{video.category}</Badge>
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      <video.platformIcon className={`h-4 w-4 ${video.platformColor}`} />
                      {video.platform}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      <span>{video.uploadDate}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {video.views.toLocaleString()}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{video.description}</p>
                    <Button className="w-full bg-transparent" variant="outline" asChild>
                      <a href={video.url} target="_blank" rel="noopener noreferrer">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Video
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Webinars Tab */}
          <TabsContent value="webinars">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webinars.map((webinar) => (
                <Card key={webinar.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={webinar.thumbnail || "/placeholder.svg"}
                      alt={webinar.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-blue-600 text-white">Webinar</Badge>
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      <webinar.platformIcon className={`h-4 w-4 ${webinar.platformColor}`} />
                      {webinar.platform}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{webinar.title}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {webinar.scheduledDate} at {webinar.scheduledTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {webinar.registrations} registered
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{webinar.description}</p>
                    <p className="text-sm font-medium text-green-700 mb-4">Speaker: {webinar.speaker}</p>
                    <Button className="w-full" asChild>
                      <a href={webinar.url} target="_blank" rel="noopener noreferrer">
                        <Calendar className="h-4 w-4 mr-2" />
                        Register for Webinar
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Platform Integration Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Multi-Platform Integration</h3>
          <p className="text-blue-800 mb-4">
            Our media content is distributed across multiple platforms to ensure maximum accessibility. Click on any
            video or stream to be redirected to the respective platform.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-red-600">
              <Youtube className="h-5 w-5" />
              <span className="font-medium">YouTube Live</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Facebook className="h-5 w-5" />
              <span className="font-medium">Facebook Live</span>
            </div>
            <div className="flex items-center gap-2 text-blue-500">
              <Video className="h-5 w-5" />
              <span className="font-medium">Vimeo Events</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
