"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Car, Bus, Plane } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

const attractions = [
  {
    id: 1,
    name: "Aso Rock",
    category: "Landmark",
    rating: 4.8,
    distance: "5.2 km",
    duration: "15 min",
    image: "/placeholder.svg?height=200&width=300&text=Aso+Rock",
    description: "Iconic monolithic rock formation and seat of Nigerian government",
  },
  {
    id: 2,
    name: "Nigerian National Mosque",
    category: "Religious",
    rating: 4.6,
    distance: "3.8 km",
    duration: "12 min",
    image: "/placeholder.svg?height=200&width=300&text=National+Mosque",
    description: "Beautiful Islamic architecture and spiritual center",
  },
  {
    id: 3,
    name: "National Arts Theatre",
    category: "Culture",
    rating: 4.5,
    distance: "4.1 km",
    duration: "13 min",
    image: "/placeholder.svg?height=200&width=300&text=Arts+Theatre",
    description: "Premier venue for Nigerian arts and cultural performances",
  },
  {
    id: 4,
    name: "Millennium Park",
    category: "Recreation",
    rating: 4.7,
    distance: "2.9 km",
    duration: "8 min",
    image: "/placeholder.svg?height=200&width=300&text=Millennium+Park",
    description: "Largest public park in Abuja with beautiful landscapes",
  },
  {
    id: 5,
    name: "Jabi Lake Mall",
    category: "Shopping",
    rating: 4.4,
    distance: "6.7 km",
    duration: "18 min",
    image: "/placeholder.svg?height=200&width=300&text=Jabi+Lake+Mall",
    description: "Modern shopping complex with lake views and dining",
  },
  {
    id: 6,
    name: "Nigerian National Christian Centre",
    category: "Religious",
    rating: 4.6,
    distance: "4.5 km",
    duration: "14 min",
    image: "/placeholder.svg?height=200&width=300&text=Christian+Centre",
    description: "Magnificent cathedral and center for Christian worship",
  },
]

const transportServices = [
  {
    icon: Bus,
    title: "Shuttle Service",
    description: "Complimentary shuttle from major hotels",
    schedule: "Every 30 minutes",
  },
  {
    icon: Car,
    title: "Taxi Service",
    description: "24/7 taxi service available",
    schedule: "On demand",
  },
  {
    icon: Plane,
    title: "Car Rental",
    description: "Partner car rental services",
    schedule: "Daily rentals",
  },
]

export function ConferenceDestination() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("conferenceDestination")}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("destinationDesc")}</p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {attractions.map((attraction) => (
            <Card key={attraction.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative">
                <Image
                  src={attraction.image || "/placeholder.svg"}
                  alt={attraction.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    {attraction.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{attraction.rating}</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{attraction.name}</CardTitle>
                <CardDescription>{attraction.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{attraction.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{attraction.duration}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  {t("exploreAttraction")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transportation Services */}
        <div className="bg-white rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">{t("transportationServices")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transportServices.map((service, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{t(service.title.toLowerCase().replace(" ", "") as any)}</h4>
                <p className="text-gray-600 mb-2">
                  {t(service.description.toLowerCase().replace(/[^a-z]/g, "") as any)}
                </p>
                <p className="text-sm text-green-600 font-medium">{service.schedule}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
