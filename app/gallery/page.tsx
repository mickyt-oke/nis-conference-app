"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Search, Download, Share2, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const allImages = [
    {
      id: 1,
      src: "/placeholder.svg?height=400&width=600",
      title: "Annual Strategic Planning Conference 2024",
      description:
        "Key stakeholders discussing border security initiatives and strategic planning for the upcoming year",
      category: "conferences",
      date: "March 15, 2024",
      location: "Abuja Conference Center",
      tags: ["conference", "strategic planning", "stakeholders"],
    },
    {
      id: 2,
      src: "/placeholder.svg?height=400&width=600",
      title: "Keynote Address - Digital Transformation",
      description: "Minister addressing digital innovation in immigration services and modernization initiatives",
      category: "conferences",
      date: "March 16, 2024",
      location: "Abuja Conference Center",
      tags: ["keynote", "digital transformation", "minister"],
    },
    {
      id: 3,
      src: "/placeholder.svg?height=400&width=600",
      title: "Advanced Border Control Training",
      description: "Officers learning new screening technologies and modern border control procedures",
      category: "training",
      date: "January 20, 2024",
      location: "NIS Training Academy",
      tags: ["training", "border control", "technology"],
    },
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=600",
      title: "Ministerial Visit",
      description: "Minister inspecting immigration facilities and meeting with senior officers",
      category: "events",
      date: "February 10, 2024",
      location: "Lagos Immigration Office",
      tags: ["ministerial", "inspection", "facilities"],
    },
    {
      id: 5,
      src: "/placeholder.svg?height=400&width=600",
      title: "NIS Headquarters",
      description: "Main administrative building showcasing modern architecture and professional facilities",
      category: "facilities",
      date: "Headquarters",
      location: "Abuja FCT",
      tags: ["headquarters", "building", "architecture"],
    },
    // Add more images for each category...
  ]

  const filteredImages = allImages.filter(
    (image) =>
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const getImagesByCategory = (category: string) => {
    return filteredImages.filter((image) => image.category === category)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/placeholder.svg?height=60&width=60"
                alt="NIS Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold">Nigeria Immigration Service</h1>
                <p className="text-green-200">Media Gallery</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-green-200 transition-colors">
                Home
              </Link>
              <Link href="/conferences" className="hover:text-green-200 transition-colors">
                Conferences
              </Link>
              <Link href="/documents" className="hover:text-green-200 transition-colors">
                Documents
              </Link>
              <Link href="/speakers" className="hover:text-green-200 transition-colors">
                Speakers
              </Link>
              <Link href="/admin" className="hover:text-green-200 transition-colors">
                Admin
              </Link>
            </nav>
            <Button variant="secondary" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Media Gallery</h1>
              <p className="text-gray-600">
                Comprehensive collection of conference photos, training sessions, official events, and facilities
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search gallery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="all">All Photos ({filteredImages.length})</TabsTrigger>
              <TabsTrigger value="conferences">Conferences ({getImagesByCategory("conferences").length})</TabsTrigger>
              <TabsTrigger value="training">Training ({getImagesByCategory("training").length})</TabsTrigger>
              <TabsTrigger value="events">Events ({getImagesByCategory("events").length})</TabsTrigger>
              <TabsTrigger value="facilities">Facilities ({getImagesByCategory("facilities").length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages.map((image) => (
                  <Dialog key={image.id}>
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                          <Badge className="absolute top-2 right-2 capitalize bg-green-600">{image.category}</Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{image.title}</h3>
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{image.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {image.date}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {image.location}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative h-96 md:h-full">
                          <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Badge className="mb-2 capitalize">{image.category}</Badge>
                            <h2 className="text-2xl font-bold mb-2">{image.title}</h2>
                            <p className="text-gray-600">{image.description}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                              <span>{image.date}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                              <span>{image.location}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {image.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>

            {/* Category-specific tabs */}
            {["conferences", "training", "events", "facilities"].map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getImagesByCategory(category).map((image) => (
                    <Dialog key={image.id}>
                      <DialogTrigger asChild>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={image.src || "/placeholder.svg"}
                              alt={image.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-sm mb-2 line-clamp-2">{image.title}</h3>
                            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{image.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {image.date}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {image.location}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="relative h-96 md:h-full">
                            <Image
                              src={image.src || "/placeholder.svg"}
                              alt={image.title}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Badge className="mb-2 capitalize">{image.category}</Badge>
                              <h2 className="text-2xl font-bold mb-2">{image.title}</h2>
                              <p className="text-gray-600">{image.description}</p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                <span>{image.date}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                                <span>{image.location}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {image.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images found matching your search criteria.</p>
              <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-4">
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
