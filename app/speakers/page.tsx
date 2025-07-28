import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Calendar, Award, Search, Filter, Plus, Edit, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"

export default function SpeakersPage() {
  const speakers = [
    {
      id: 1,
      name: "Dr. Amina Hassan",
      title: "Director General",
      organization: "Nigeria Immigration Service",
      bio: "Dr. Hassan has over 20 years of experience in immigration policy and border security. She holds a PhD in International Relations and has led numerous strategic initiatives.",
      email: "dg@immigration.gov.ng",
      phone: "+234-9-123-4567",
      location: "Abuja, Nigeria",
      conferences: ["Strategic Planning 2024", "Policy Review 2023"],
      expertise: ["Policy Development", "Strategic Planning", "Leadership"],
      status: "Confirmed",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      name: "Prof. Chukwuma Obi",
      title: "Security Expert & Consultant",
      organization: "Federal University of Technology",
      bio: "Professor Obi is a renowned expert in border security and international law. He has consulted for various African governments on security matters.",
      email: "c.obi@futminna.edu.ng",
      phone: "+234-8-987-6543",
      location: "Minna, Nigeria",
      conferences: ["Border Security Summit", "International Forum 2023"],
      expertise: ["Border Security", "International Law", "Cybersecurity"],
      status: "Pending",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      name: "Eng. Fatima Yusuf",
      title: "IT Director",
      organization: "Nigeria Immigration Service",
      bio: "Engineer Yusuf leads the digital transformation initiatives at NIS. She has a Master's in Computer Science and specializes in system integration.",
      email: "f.yusuf@immigration.gov.ng",
      phone: "+234-9-456-7890",
      location: "Abuja, Nigeria",
      conferences: ["Digital Workshop", "Tech Summit 2023"],
      expertise: ["Digital Transformation", "System Integration", "IT Strategy"],
      status: "Confirmed",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 4,
      name: "Col. Ibrahim Musa (Rtd.)",
      title: "Security Consultant",
      organization: "Independent Consultant",
      bio: "Retired Colonel with 25 years of military experience in border operations. Now provides strategic consulting on security matters.",
      email: "i.musa@consultant.ng",
      phone: "+234-8-234-5678",
      location: "Kaduna, Nigeria",
      conferences: ["Border Security Summit", "Strategic Planning 2024"],
      expertise: ["Military Strategy", "Border Operations", "Risk Assessment"],
      status: "Confirmed",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 5,
      name: "Mrs. Grace Emeka",
      title: "Training Coordinator",
      organization: "Nigeria Immigration Service",
      bio: "Mrs. Emeka oversees all training programs at NIS. She has developed comprehensive training curricula for immigration officers.",
      email: "g.emeka@immigration.gov.ng",
      phone: "+234-9-345-6789",
      location: "Lagos, Nigeria",
      conferences: ["Training Summit 2024", "Capacity Building 2023"],
      expertise: ["Training Development", "Capacity Building", "Human Resources"],
      status: "Confirmed",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 6,
      name: "Dr. Sarah Okafor",
      title: "Policy Analyst",
      organization: "Institute for Security Studies",
      bio: "Dr. Okafor specializes in immigration policy analysis and has published extensively on African migration patterns and border management.",
      email: "s.okafor@issafrica.org",
      phone: "+234-8-567-8901",
      location: "Abuja, Nigeria",
      conferences: ["Policy Review 2024", "Research Conference 2023"],
      expertise: ["Policy Analysis", "Migration Studies", "Research"],
      status: "Pending",
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Speaker Management</h1>
              <p className="text-green-200">Manage conference speakers and their profiles</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="secondary">
                <Plus className="w-4 h-4 mr-2" />
                Add Speaker
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">← Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Speakers</p>
                  <p className="text-2xl font-bold">{speakers.length}</p>
                </div>
                <User className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold">{speakers.filter((s) => s.status === "Confirmed").length}</p>
                </div>
                <Award className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold">{speakers.filter((s) => s.status === "Pending").length}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Expertise Areas</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Search speakers by name, organization, or expertise..." className="w-full" />
              </div>
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Speaker Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Speakers</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="expertise">By Expertise</TabsTrigger>
          </TabsList>

          {/* All Speakers */}
          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakers.map((speaker) => (
                <Card key={speaker.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Image
                      src={speaker.image || "/placeholder.svg"}
                      alt={speaker.name}
                      width={150}
                      height={150}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <CardTitle className="text-lg">{speaker.name}</CardTitle>
                    <CardDescription>
                      {speaker.title} at {speaker.organization}
                    </CardDescription>
                    <Badge variant={speaker.status === "Confirmed" ? "default" : "secondary"}>{speaker.status}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {speaker.email}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {speaker.phone}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {speaker.location}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Expertise:</p>
                      <div className="flex flex-wrap gap-1">
                        {speaker.expertise.slice(0, 2).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {speaker.expertise.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{speaker.expertise.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-6">
                      <Button size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Confirmed Speakers */}
          <TabsContent value="confirmed">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakers
                .filter((s) => s.status === "Confirmed")
                .map((speaker) => (
                  <Card key={speaker.id} className="hover:shadow-lg transition-shadow border-green-200">
                    <CardHeader className="text-center">
                      <Image
                        src={speaker.image || "/placeholder.svg"}
                        alt={speaker.name}
                        width={150}
                        height={150}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <CardTitle className="text-lg">{speaker.name}</CardTitle>
                      <CardDescription>
                        {speaker.title} at {speaker.organization}
                      </CardDescription>
                      <Badge variant="default">Confirmed</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{speaker.bio.substring(0, 100)}...</p>

                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Recent Conferences:</p>
                        <div className="space-y-1">
                          {speaker.conferences.slice(0, 2).map((conf, index) => (
                            <p key={index} className="text-xs text-gray-600">
                              • {conf}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          View Profile
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Pending Speakers */}
          <TabsContent value="pending">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakers
                .filter((s) => s.status === "Pending")
                .map((speaker) => (
                  <Card key={speaker.id} className="hover:shadow-lg transition-shadow border-orange-200">
                    <CardHeader className="text-center">
                      <Image
                        src={speaker.image || "/placeholder.svg"}
                        alt={speaker.name}
                        width={150}
                        height={150}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <CardTitle className="text-lg">{speaker.name}</CardTitle>
                      <CardDescription>
                        {speaker.title} at {speaker.organization}
                      </CardDescription>
                      <Badge variant="secondary">Pending</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{speaker.bio.substring(0, 100)}...</p>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          Send Reminder
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit Invite
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* By Expertise */}
          <TabsContent value="expertise">
            <div className="space-y-6">
              {["Policy Development", "Border Security", "Digital Transformation", "Training Development"].map(
                (expertise) => (
                  <Card key={expertise}>
                    <CardHeader>
                      <CardTitle>{expertise}</CardTitle>
                      <CardDescription>Speakers specializing in {expertise.toLowerCase()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {speakers
                          .filter((speaker) => speaker.expertise.includes(expertise))
                          .map((speaker) => (
                            <div key={speaker.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                              <Image
                                src={speaker.image || "/placeholder.svg"}
                                alt={speaker.name}
                                width={60}
                                height={60}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold">{speaker.name}</h4>
                                <p className="text-sm text-gray-600">{speaker.title}</p>
                                <Badge
                                  variant={speaker.status === "Confirmed" ? "default" : "secondary"}
                                  className="mt-1"
                                >
                                  {speaker.status}
                                </Badge>
                              </div>
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  )
}
