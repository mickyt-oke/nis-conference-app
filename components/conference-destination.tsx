"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Camera, Utensils, Building, Car } from "lucide-react"

export function ConferenceDestination() {
  const destinations = [
    {
      name: "Zuma Rock",
      location: "Abuja, FCT",
      description: "Iconic monolithic inselberg and symbol of Abuja, perfect for evening photography",
      image: "/placeholder.svg?height=300&width=400&text=Zuma+Rock+Abuja",
      rating: 4.8,
      category: "Natural Wonder",
      icon: Camera,
      distance: "15 minutes from venue",
    },
    {
      name: "Nigerian National Mosque",
      location: "Abuja, FCT",
      description: "Beautiful Islamic architecture and peaceful environment for reflection",
      image: "/placeholder.svg?height=300&width=400&text=National+Mosque+Abuja",
      rating: 4.7,
      category: "Religious Site",
      icon: Building,
      distance: "10 minutes from venue",
    },
    {
      name: "Millennium Park",
      location: "Maitama, Abuja",
      description: "Largest public park in Abuja with beautiful gardens and recreational facilities",
      image: "/placeholder.svg?height=300&width=400&text=Millennium+Park+Abuja",
      rating: 4.6,
      category: "Recreation",
      icon: Camera,
      distance: "12 minutes from venue",
    },
    {
      name: "Jabi Lake Mall",
      location: "Jabi, Abuja",
      description: "Modern shopping and dining complex with lake views and international cuisine",
      image: "/placeholder.svg?height=300&width=400&text=Jabi+Lake+Mall",
      rating: 4.5,
      category: "Shopping & Dining",
      icon: Utensils,
      distance: "8 minutes from venue",
    },
    {
      name: "Arts & Crafts Village",
      location: "Abuja, FCT",
      description: "Showcase of traditional Nigerian arts, crafts, and cultural performances",
      image: "/placeholder.svg?height=300&width=400&text=Arts+Crafts+Village",
      rating: 4.4,
      category: "Cultural Site",
      icon: Building,
      distance: "20 minutes from venue",
    },
    {
      name: "Aso Rock",
      location: "Abuja, FCT",
      description: "Presidential complex and iconic landmark offering panoramic city views",
      image: "/placeholder.svg?height=300&width=400&text=Aso+Rock+Abuja",
      rating: 4.9,
      category: "Landmark",
      icon: Camera,
      distance: "18 minutes from venue",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800">
            Conference Destination
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Abuja</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the beauty and culture of Nigeria's capital city during your conference visit. Discover amazing
            attractions, dining experiences, and cultural sites near the venue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {destination.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1">
                  <destination.icon className="h-4 w-4 text-gray-600" />
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{destination.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {destination.location}
                    </div>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-yellow-700">{destination.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="text-sm mb-4 leading-relaxed">{destination.description}</CardDescription>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-green-600">
                    <Car className="h-4 w-4 mr-1" />
                    {destination.distance}
                  </div>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-green-600 text-white rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-2">Conference Transport Services</h3>
            <p className="mb-4">
              Complimentary shuttle services available to all major attractions during conference breaks. Book your spot
              at the registration desk.
            </p>
            <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
              View Transport Schedule
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
