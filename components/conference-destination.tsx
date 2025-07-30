"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Car, Clock } from "lucide-react"
import Image from "next/image"

const destinations = [
  {
    id: 1,
    name: "Aso Rock",
    description: "The iconic presidential villa and symbol of Nigeria's seat of power",
    image: "/placeholder.svg?height=200&width=300&text=Aso+Rock",
    rating: 4.8,
    distance: "5.2 km",
    category: "Landmark",
    duration: "2-3 hours",
  },
  {
    id: 2,
    name: "National Mosque",
    description: "Beautiful Islamic architecture and one of Abuja's most recognizable buildings",
    image: "/placeholder.svg?height=200&width=300&text=National+Mosque",
    rating: 4.6,
    distance: "3.8 km",
    category: "Religious",
    duration: "1-2 hours",
  },
  {
    id: 3,
    name: "Nigerian National Christian Centre",
    description: "Magnificent cathedral with stunning architecture and peaceful gardens",
    image: "/placeholder.svg?height=200&width=300&text=Christian+Centre",
    rating: 4.7,
    distance: "4.1 km",
    category: "Religious",
    duration: "1-2 hours",
  },
  {
    id: 4,
    name: "Millennium Park",
    description: "Largest public park in Abuja, perfect for relaxation and outdoor activities",
    image: "/placeholder.svg?height=200&width=300&text=Millennium+Park",
    rating: 4.5,
    distance: "6.7 km",
    category: "Recreation",
    duration: "2-4 hours",
  },
  {
    id: 5,
    name: "Arts & Crafts Village",
    description: "Traditional Nigerian crafts, artwork, and cultural experiences",
    image: "/placeholder.svg?height=200&width=300&text=Arts+Crafts+Village",
    rating: 4.4,
    distance: "8.3 km",
    category: "Culture",
    duration: "2-3 hours",
  },
  {
    id: 6,
    name: "Jabi Lake Mall",
    description: "Modern shopping complex with restaurants, cinema, and lake views",
    image: "/placeholder.svg?height=200&width=300&text=Jabi+Lake+Mall",
    rating: 4.3,
    distance: "7.9 km",
    category: "Shopping",
    duration: "3-5 hours",
  },
]

const transportServices = [
  { name: "Conference Shuttle", description: "Complimentary shuttle service to major attractions", icon: "🚌" },
  { name: "Taxi Services", description: "24/7 taxi services available at the conference center", icon: "🚕" },
  { name: "Car Rental", description: "Partner car rental services with conference discounts", icon: "🚗" },
]

export function ConferenceDestination() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Abuja During Your Visit</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Make the most of your conference experience by exploring the beautiful capital city of Nigeria. Discover
            iconic landmarks, cultural sites, and recreational activities near the conference venue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-700">{destination.category}</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">{destination.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-yellow-600">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{destination.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{destination.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{destination.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{destination.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transport Services */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Transportation Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transportServices.map((service, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              <Car className="inline h-4 w-4 mr-1" />
              All destinations are within 15 minutes drive from the Abuja International Conference Centre
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
