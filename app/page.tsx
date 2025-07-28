import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, FileText, Video, Shield, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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
                <p className="text-green-200">Conference Management System</p>
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

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800">Version 1.0</Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">NIS Conference Portal</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive digital platform for managing Nigeria Immigration Service annual conferences, featuring
            centralized content management, historical archiving, and real-time collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-green-700 hover:bg-green-800">
              <Link href="/conferences">View Conferences</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/documents">Browse Documents</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Document Management</CardTitle>
                <CardDescription>Centralized storage and version control for all conference materials</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Upload and organize documents</li>
                  <li>• Version control system</li>
                  <li>• Full-text search capabilities</li>
                  <li>• Secure access controls</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Event Management</CardTitle>
                <CardDescription>Interactive conference scheduling and agenda management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Interactive event calendar</li>
                  <li>• Session scheduling</li>
                  <li>• Real-time updates</li>
                  <li>• Attendance tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>User Management</CardTitle>
                <CardDescription>Role-based access control with comprehensive user profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Multi-level access control</li>
                  <li>• User authentication</li>
                  <li>• Activity logging</li>
                  <li>• Profile management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Video className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Media Gallery</CardTitle>
                <CardDescription>Comprehensive multimedia content management system</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Photo and video storage</li>
                  <li>• Metadata tagging</li>
                  <li>• Presentation repository</li>
                  <li>• CDN integration</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Security Features</CardTitle>
                <CardDescription>Enterprise-grade security with SSL and firewall protection</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• SSL encryption</li>
                  <li>• Multi-factor authentication</li>
                  <li>• Web application firewall</li>
                  <li>• Audit trails</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Integration</CardTitle>
                <CardDescription>Seamless integration with existing NIS digital infrastructure</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Single Sign-On (SSO)</li>
                  <li>• API integration</li>
                  <li>• Unified branding</li>
                  <li>• Mobile responsive</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Conferences */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-3xl font-bold">Recent Conferences</h3>
            <Button variant="outline" asChild>
              <Link href="/conferences">View All</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Annual Strategic Planning Conference 2024",
                date: "March 15-17, 2024",
                location: "Abuja, Nigeria",
                status: "Completed",
                attendees: 250,
              },
              {
                title: "Border Security Summit 2024",
                date: "June 10-12, 2024",
                location: "Lagos, Nigeria",
                status: "Upcoming",
                attendees: 180,
              },
              {
                title: "Digital Transformation Workshop",
                date: "September 5-7, 2024",
                location: "Port Harcourt, Nigeria",
                status: "Planning",
                attendees: 120,
              },
            ].map((conference, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{conference.title}</CardTitle>
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
                  <CardDescription>{conference.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Location:</strong> {conference.location}
                    </p>
                    <p>
                      <strong>Expected Attendees:</strong> {conference.attendees}
                    </p>
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline" size="sm">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
