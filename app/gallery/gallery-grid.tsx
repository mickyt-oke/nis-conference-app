"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, MapPin, Users, Eye } from "lucide-react"
import Image from "next/image"

interface GalleryGridProps {
  category: string
  searchQuery: string
}

const galleryItems = [
  {
    id: 1,
    title: "Annual Conference Opening Ceremony",
    category: "conferences",
    date: "2024-03-15",
    location: "Main Auditorium",
    attendees: 250,
    image: "/placeholder.svg?height=400&width=600&text=Opening+Ceremony",
    description: "The grand opening of our annual conference with distinguished guests and stakeholders.",
  },
  {
    id: 2,
    title: "Keynote Speaker Session",
    category: "conferences",
    date: "2024-03-15",
    location: "Conference Hall A",
    attendees: 200,
    image: "/placeholder.svg?height=400&width=600&text=Keynote+Speaker",
    description: "Inspiring keynote address on the future of immigration services.",
  },
  {
    id: 3,
    title: "Border Security Training",
    category: "training",
    date: "2024-02-20",
    location: "Training Center",
    attendees: 50,
    image: "/placeholder.svg?height=400&width=600&text=Border+Security+Training",
    description: "Intensive training session on modern border security protocols.",
  },
  {
    id: 4,
    title: "Technology Workshop",
    category: "training",
    date: "2024-02-25",
    location: "Tech Lab",
    attendees: 30,
    image: "/placeholder.svg?height=400&width=600&text=Technology+Workshop",
    description: "Hands-on workshop on new immigration technology systems.",
  },
  {
    id: 5,
    title: "Ministerial Visit",
    category: "events",
    date: "2024-01-15",
    location: "NIS Headquarters",
    attendees: 100,
    image: "/placeholder.svg?height=400&width=600&text=Ministerial+Visit",
    description: "Official visit by the Minister of Interior to NIS headquarters.",
  },
  {
    id: 6,
    title: "New Facility Launch",
    category: "facilities",
    date: "2024-01-30",
    location: "Lagos Office",
    attendees: 75,
    image: "/placeholder.svg?height=400&width=600&text=New+Facility",
    description: "Grand opening of our new state-of-the-art facility in Lagos.",
  },
]

export function GalleryGrid({ category, searchQuery }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = category === "all" || item.category === category
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 group">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900 capitalize">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{item.attendees}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="aspect-video relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2 capitalize">
                      {item.category}
                    </Badge>
                    <h2 className="text-2xl font-bold">{item.title}</h2>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-green-600" />
                      <span>{item.attendees} attendees</span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
        </div>
      )}
    </>
  )
}
