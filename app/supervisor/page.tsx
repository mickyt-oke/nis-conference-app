"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  MapPin,
  FileText,
  Building,
  Eye,
  MessageSquare,
  AlertCircle,
  Download,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { approveRegistration, rejectRegistration } from "./actions"
import { useActionState } from "react"

interface PendingRegistration {
  id: string
  registrationId: string
  employeeName: string
  employeeEmail: string
  staffId: string
  department: string
  position: string
  gradeLevel: string
  conference: string
  conferenceName: string
  conferenceDate: string
  conferenceLocation: string
  conferenceFee: number
  justification: string
  submittedDate: string
  status: "pending" | "approved" | "rejected"
  supervisorName: string
  supervisorEmail: string
  urgency: "low" | "medium" | "high"
  budgetImpact: "low" | "medium" | "high"
}

export default function SupervisorDashboard() {
  const [selectedRegistration, setSelectedRegistration] = useState<PendingRegistration | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [approvalState, approvalAction] = useActionState(approveRegistration, null)
  const [rejectionState, rejectionAction] = useActionState(rejectRegistration, null)

  // Mock data - in production, this would come from your database
  const pendingRegistrations: PendingRegistration[] = [
    {
      id: "1",
      registrationId: "NIS-1703123456-ABC123",
      employeeName: "John Adebayo",
      employeeEmail: "j.adebayo@immigration.gov.ng",
      staffId: "NIS/2019/001234",
      department: "Border Control",
      position: "Senior Immigration Officer",
      gradeLevel: "GL 12",
      conference: "border-security-2024",
      conferenceName: "Border Security Summit 2024",
      conferenceDate: "June 10-12, 2024",
      conferenceLocation: "Lagos",
      conferenceFee: 30000,
      justification:
        "This conference will enhance my knowledge of modern border security technologies and help implement new screening procedures at our checkpoint. The sessions on biometric systems and international cooperation are directly relevant to our current modernization project.",
      submittedDate: "2024-01-15",
      status: "pending",
      supervisorName: "Dr. Amina Hassan",
      supervisorEmail: "a.hassan@immigration.gov.ng",
      urgency: "high",
      budgetImpact: "medium",
    },
    {
      id: "2",
      registrationId: "NIS-1703123457-DEF456",
      employeeName: "Sarah Okafor",
      employeeEmail: "s.okafor@immigration.gov.ng",
      staffId: "NIS/2020/005678",
      department: "Training & Development",
      position: "Training Coordinator",
      gradeLevel: "GL 10",
      conference: "digital-workshop-2024",
      conferenceName: "Digital Transformation Workshop",
      conferenceDate: "September 5-7, 2024",
      conferenceLocation: "Port Harcourt",
      conferenceFee: 20000,
      justification:
        "As part of our digital transformation initiative, attending this workshop will provide insights into best practices for implementing new training systems and e-learning platforms across all NIS training centers.",
      submittedDate: "2024-01-14",
      status: "pending",
      supervisorName: "Mrs. Grace Emeka",
      supervisorEmail: "g.emeka@immigration.gov.ng",
      urgency: "medium",
      budgetImpact: "low",
    },
    {
      id: "3",
      registrationId: "NIS-1703123458-GHI789",
      employeeName: "Michael Uche",
      employeeEmail: "m.uche@immigration.gov.ng",
      staffId: "NIS/2018/009876",
      department: "Information Technology",
      position: "Systems Analyst",
      gradeLevel: "GL 11",
      conference: "strategic-2024",
      conferenceName: "Annual Strategic Planning Conference 2024",
      conferenceDate: "March 15-17, 2024",
      conferenceLocation: "Abuja",
      conferenceFee: 25000,
      justification:
        "This strategic planning conference will help align our IT initiatives with the organization's long-term goals. The technology roadmap sessions will be crucial for our upcoming system upgrades.",
      submittedDate: "2024-01-13",
      status: "approved",
      supervisorName: "Eng. Fatima Yusuf",
      supervisorEmail: "f.yusuf@immigration.gov.ng",
      urgency: "low",
      budgetImpact: "medium",
    },
    {
      id: "4",
      registrationId: "NIS-1703123459-JKL012",
      employeeName: "Blessing Okoro",
      employeeEmail: "b.okoro@immigration.gov.ng",
      staffId: "NIS/2021/003456",
      department: "Legal Affairs",
      position: "Legal Officer",
      gradeLevel: "GL 09",
      conference: "border-security-2024",
      conferenceName: "Border Security Summit 2024",
      conferenceDate: "June 10-12, 2024",
      conferenceLocation: "Lagos",
      conferenceFee: 30000,
      justification:
        "The legal aspects of border security and immigration law updates covered in this summit are essential for my role in reviewing and updating our legal frameworks and procedures.",
      submittedDate: "2024-01-12",
      status: "rejected",
      supervisorName: "Dr. Amina Hassan",
      supervisorEmail: "a.hassan@immigration.gov.ng",
      urgency: "low",
      budgetImpact: "high",
    },
  ]

  const filteredRegistrations = pendingRegistrations.filter((reg) => {
    const matchesSearch =
      reg.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || reg.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const stats = {
    total: pendingRegistrations.length,
    pending: pendingRegistrations.filter((r) => r.status === "pending").length,
    approved: pendingRegistrations.filter((r) => r.status === "approved").length,
    rejected: pendingRegistrations.filter((r) => r.status === "rejected").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Supervisor Dashboard</h1>
              <p className="text-green-200">Review and approve team member conference registrations</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" asChild>
                <Link href="/admin">Admin Portal</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">← Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Success/Error Messages */}
        {(approvalState?.success || rejectionState?.success) && (
          <Alert className="mb-8 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Action Completed!</strong> {approvalState?.message || rejectionState?.message}
            </AlertDescription>
          </Alert>
        )}

        {(approvalState?.error || rejectionState?.error) && (
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Action Failed:</strong> {approvalState?.message || rejectionState?.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, staff ID, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <select
                aria-label="Filter by status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Registration Requests */}
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
          </TabsList>

          {/* List View */}
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>Registration Requests</CardTitle>
                <CardDescription>Review and manage team member conference registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Conference</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{registration.employeeName}</p>
                            <p className="text-sm text-gray-500">{registration.staffId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{registration.conferenceName}</p>
                            <p className="text-sm text-gray-500">{registration.conferenceDate}</p>
                          </div>
                        </TableCell>
                        <TableCell>{registration.department}</TableCell>
                        <TableCell>{new Date(registration.submittedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              registration.status === "approved"
                                ? "default"
                                : registration.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {registration.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              registration.urgency === "high"
                                ? "destructive"
                                : registration.urgency === "medium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {registration.urgency}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedRegistration(registration)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Registration Review</DialogTitle>
                                  <DialogDescription>
                                    Review and approve/reject this conference registration request
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedRegistration && (
                                  <RegistrationReviewModal
                                    registration={selectedRegistration}
                                    onApprove={approvalAction}
                                    onReject={rejectionAction}
                                  />
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Card View */}
          <TabsContent value="cards">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRegistrations.map((registration) => (
                <Card key={registration.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{registration.employeeName}</CardTitle>
                        <CardDescription>{registration.staffId}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          registration.status === "approved"
                            ? "default"
                            : registration.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {registration.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        {registration.department}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {registration.conferenceName}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {registration.conferenceLocation} • {registration.conferenceDate}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex space-x-2">
                        <Badge
                          variant={
                            registration.urgency === "high"
                              ? "destructive"
                              : registration.urgency === "medium"
                                ? "default"
                                : "outline"
                          }
                        >
                          {registration.urgency} priority
                        </Badge>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedRegistration(registration)}>
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Registration Review</DialogTitle>
                            <DialogDescription>
                              Review and approve/reject this conference registration request
                            </DialogDescription>
                          </DialogHeader>
                          {selectedRegistration && (
                            <RegistrationReviewModal
                              registration={selectedRegistration}
                              onApprove={approvalAction}
                              onReject={rejectionAction}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}

interface RegistrationReviewModalProps {
  registration: PendingRegistration
  onApprove: (formData: FormData) => void
  onReject: (formData: FormData) => void
}

function RegistrationReviewModal({ registration, onApprove, onReject }: RegistrationReviewModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [comments, setComments] = useState("")

  const handleApprove = async (formData: FormData) => {
    setIsProcessing(true)
    formData.append("registrationId", registration.registrationId)
    formData.append("employeeEmail", registration.employeeEmail)
    formData.append("employeeName", registration.employeeName)
    formData.append("conferenceName", registration.conferenceName)
    await onApprove(formData)
    setIsProcessing(false)
  }

  const handleReject = async (formData: FormData) => {
    setIsProcessing(true)
    formData.append("registrationId", registration.registrationId)
    formData.append("employeeEmail", registration.employeeEmail)
    formData.append("employeeName", registration.employeeName)
    formData.append("conferenceName", registration.conferenceName)
    await onReject(formData)
    setIsProcessing(false)
  }

  return (
    <div className="space-y-6">
      {/* Employee Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <User className="w-5 h-5 mr-2" />
              Employee Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Name</Label>
              <p className="text-sm">{registration.employeeName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Staff ID</Label>
              <p className="text-sm">{registration.staffId}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Department</Label>
              <p className="text-sm">{registration.department}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Position</Label>
              <p className="text-sm">{registration.position}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Grade Level</Label>
              <p className="text-sm">{registration.gradeLevel}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Email</Label>
              <p className="text-sm">{registration.employeeEmail}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Conference Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Conference</Label>
              <p className="text-sm">{registration.conferenceName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Date</Label>
              <p className="text-sm">{registration.conferenceDate}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Location</Label>
              <p className="text-sm">{registration.conferenceLocation}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Registration Fee</Label>
              <p className="text-sm">₦{registration.conferenceFee.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Submitted Date</Label>
              <p className="text-sm">{new Date(registration.submittedDate).toLocaleDateString()}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Priority Level</Label>
              <Badge
                variant={
                  registration.urgency === "high"
                    ? "destructive"
                    : registration.urgency === "medium"
                      ? "default"
                      : "outline"
                }
              >
                {registration.urgency}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Justification */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Attendance Justification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{registration.justification}</p>
        </CardContent>
      </Card>

      {/* Budget Impact Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Budget Impact Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium">Registration Fee</Label>
              <p className="text-lg font-semibold">₦{registration.conferenceFee.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Budget Impact</Label>
              <Badge
                variant={
                  registration.budgetImpact === "high"
                    ? "destructive"
                    : registration.budgetImpact === "medium"
                      ? "default"
                      : "outline"
                }
              >
                {registration.budgetImpact}
              </Badge>
            </div>
            <div>
              <Label className="text-sm font-medium">Department Budget</Label>
              <p className="text-sm text-gray-600">Available funds assessment required</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supervisor Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Supervisor Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add your comments about this registration request..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {registration.status === "pending" && (
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <form action={handleReject}>
            <input type="hidden" name="comments" value={comments} />
            <Button type="submit" variant="outline" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Request
                </>
              )}
            </Button>
          </form>
          <form action={handleApprove}>
            <input type="hidden" name="comments" value={comments} />
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Request
                </>
              )}
            </Button>
          </form>
        </div>
      )}

      {registration.status !== "pending" && (
        <div className="pt-6 border-t">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This registration has already been {registration.status}. No further action is required.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}
