"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Search, Filter, Upload, Eye, Share2, Calendar, User, FolderOpen } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

// Lazy load components
const ConferenceDestination = lazy(() =>
  import("@/components/conference-destination").then((module) => ({ default: module.ConferenceDestination })),
)
const ContactSection = lazy(() =>
  import("@/components/contact-section").then((module) => ({ default: module.ContactSection })),
)

export default function DocumentsPage() {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const documents = [
    {
      id: 1,
      name: "Opening Keynote - Strategic Vision 2024",
      type: "PDF",
      size: "2.4 MB",
      conference: "Strategic Planning 2024",
      uploadedBy: "Dr. Amina Hassan",
      uploadDate: "March 15, 2024",
      downloads: 156,
      category: "Presentations",
    },
    {
      id: 2,
      name: "Border Security Implementation Plan",
      type: "DOCX",
      size: "1.8 MB",
      conference: "Border Security Summit",
      uploadedBy: "Col. Ibrahim Musa",
      uploadDate: "June 8, 2024",
      downloads: 89,
      category: "Reports",
    },
    {
      id: 3,
      name: "Digital Transformation Roadmap",
      type: "PDF",
      size: "3.2 MB",
      conference: "Digital Workshop",
      uploadedBy: "Eng. Fatima Yusuf",
      uploadDate: "September 1, 2024",
      downloads: 234,
      category: "Strategy",
    },
    {
      id: 4,
      name: "Training Manual - New Procedures",
      type: "PDF",
      size: "5.6 MB",
      conference: "Training Summit 2024",
      uploadedBy: "Mrs. Grace Emeka",
      uploadDate: "July 20, 2024",
      downloads: 445,
      category: "Training",
    },
    {
      id: 5,
      name: "Conference Attendance Report",
      type: "XLSX",
      size: "890 KB",
      conference: "Strategic Planning 2024",
      uploadedBy: "Mr. John Adebayo",
      uploadDate: "March 18, 2024",
      downloads: 67,
      category: "Reports",
    },
    {
      id: 6,
      name: "Policy Guidelines Update",
      type: "PDF",
      size: "1.2 MB",
      conference: "Policy Review 2024",
      uploadedBy: "Dr. Sarah Okafor",
      uploadDate: "August 15, 2024",
      downloads: 178,
      category: "Policy",
    },
  ]

  const categories = [
    { name: "All Documents", count: documents.length },
    { name: "Presentations", count: documents.filter((d) => d.category === "Presentations").length },
    { name: "Reports", count: documents.filter((d) => d.category === "Reports").length },
    { name: "Strategy", count: documents.filter((d) => d.category === "Strategy").length },
    { name: "Training", count: documents.filter((d) => d.category === "Training").length },
    { name: "Policy", count: documents.filter((d) => d.category === "Policy").length },
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
              <h1 className="text-3xl font-bold mb-2">Document Repository</h1>
              <p className="text-green-200">Centralized storage for all conference materials</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="secondary">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">← Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>*/}

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
                <FileText className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Storage Used</p>
                  <p className="text-2xl font-bold">2.4 GB</p>
                </div>
                <FolderOpen className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Downloads Today</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <Download className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <User className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Search documents by name, author, or conference..." className="w-full" />
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
                Export List
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Document Categories and List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            {categories.map((category) => (
              <TabsTrigger
                key={category.name.toLowerCase().replace(" ", "-")}
                value={category.name.toLowerCase().replace(" ", "-")}
              >
                {category.name} ({category.count})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Documents</CardTitle>
                <CardDescription>Complete repository of conference materials</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Conference</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-gray-500">{doc.size}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.type}</Badge>
                        </TableCell>
                        <TableCell>{doc.conference}</TableCell>
                        <TableCell>{doc.uploadedBy}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            {doc.uploadDate}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{doc.downloads}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Category-specific tabs */}
          {categories.slice(1).map((category) => (
            <TabsContent
              key={category.name.toLowerCase().replace(" ", "-")}
              value={category.name.toLowerCase().replace(" ", "-")}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>Documents in the {category.name.toLowerCase()} category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {documents
                      .filter((doc) => doc.category === category.name)
                      .map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-4">
                            <FileText className="w-8 h-8 text-green-600" />
                            <div>
                              <h4 className="font-semibold">{doc.name}</h4>
                              <p className="text-sm text-gray-600">
                                {doc.conference} • {doc.uploadedBy} • {doc.size}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge variant="secondary">{doc.downloads} downloads</Badge>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest document uploads and downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "uploaded",
                  document: "Policy Guidelines Update",
                  user: "Dr. Sarah Okafor",
                  time: "2 hours ago",
                },
                {
                  action: "downloaded",
                  document: "Training Manual - New Procedures",
                  user: "45 users",
                  time: "3 hours ago",
                },
                {
                  action: "uploaded",
                  document: "Conference Summary Report",
                  user: "Mr. John Adebayo",
                  time: "1 day ago",
                },
                {
                  action: "downloaded",
                  document: "Digital Transformation Roadmap",
                  user: "23 users",
                  time: "1 day ago",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${activity.action === "uploaded" ? "bg-green-500" : "bg-blue-500"}`}
                    />
                    <span className="text-sm">
                      <strong>{activity.user}</strong> {activity.action} <strong>{activity.document}</strong>
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </Layout>
  )
}
