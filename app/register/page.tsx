"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Mic, Shield, Calendar, DollarSign, Mail, CheckCircle, AlertCircle, Loader2, Layout as LucideLayout } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { submitRegistration } from "./actions"
import { useActionState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Layout } from "@/components/layout"

export default function RegisterPage() {
  const [selectedType, setSelectedType] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [state, formAction] = useActionState(submitRegistration, null)
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  const conferences = [
    {
      id: "strategic-2024",
      name: "Annual Strategic Planning Conference 2024",
      date: "March 15-17, 2024",
      location: "Abuja",
      fee: 25000,
      status: "Open",
    },
    {
      id: "border-security-2024",
      name: "Border Security Summit 2024",
      date: "June 10-12, 2024",
      location: "Lagos",
      fee: 30000,
      status: "Open",
    },
    {
      id: "digital-workshop-2024",
      name: "Digital Transformation Workshop",
      date: "September 5-7, 2024",
      location: "Port Harcourt",
      fee: 20000,
      status: "Open",
    },
  ]

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    formData.append("registrationType", selectedType)
    await formAction(formData)
    setIsSubmitting(false)
  }

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
      {/* Header */}
      <header className="bg-green-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Conference Registration</h1>
              <p className="text-green-200">Register for NIS conferences and events</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Success/Error Messages */}
        {state?.success && (
          <Alert className="mb-8 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Registration Successful!</strong> {state.message}
            </AlertDescription>
          </Alert>
        )}

        {state && !state.success && (
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Registration Failed:</strong> {state.message}
              {state.errors && Object.keys(state.errors).length > 0 && (
                <ul className="mt-2 list-disc pl-5">
                  {Object.entries(state.errors).map(([field, messages]: [string, any]) => (
                    <li key={field}>
                      {Array.isArray(messages) ? messages.join(", ") : messages}
                    </li>
                  ))}
                </ul>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Registration Type Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Registration Type</CardTitle>
            <CardDescription>Choose the type of registration that applies to you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedType === "attendee" ? "ring-2 ring-green-500 bg-green-50" : ""
                }`}
                onClick={() => setSelectedType("attendee")}
              >
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Conference Attendee</h3>
                  <p className="text-sm text-gray-600 mb-4">General participation in conferences and workshops</p>
                  <Badge variant="outline">Open Registration</Badge>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedType === "speaker" ? "ring-2 ring-green-500 bg-green-50" : ""
                }`}
                onClick={() => setSelectedType("speaker")}
              >
                <CardContent className="p-6 text-center">
                  <Mic className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Speaker/Presenter</h3>
                  <p className="text-sm text-gray-600 mb-4">Apply to present at conferences and share expertise</p>
                  <Badge variant="outline">Application Required</Badge>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedType === "team" ? "ring-2 ring-green-500 bg-green-50" : ""
                }`}
                onClick={() => setSelectedType("team")}
              >
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">NIS Planning Committee</h3>
                  <p className="text-sm text-gray-600 mb-4">Local Organizing Committee</p>
                  <Badge variant="outline">Staff Only</Badge>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Registration Forms */}
        {selectedType && (
          <form action={handleSubmit}>
            <Tabs value={selectedType} className="space-y-6">
              {/* Attendee Registration */}
              <TabsContent value="attendee">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-green-600" />
                      Conference Attendee Registration
                    </CardTitle>
                    <CardDescription>Register to attend NIS conferences and networking events</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" name="firstName" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" name="lastName" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" name="email" type="email" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" name="phone" type="tel" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="organization">Organization</Label>
                        <Input id="organization" name="organization" />
                      </div>
                      <div>
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input id="jobTitle" name="jobTitle" />
                      </div>
                    </div>

                    {/* Conference Selection */}
                    <div>
                      <Label htmlFor="conference">Select Conference *</Label>
                      <Select name="conference" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a conference" />
                        </SelectTrigger>
                        <SelectContent>
                          {conferences.map((conf) => (
                            <SelectItem key={conf.id} value={conf.id}>
                              <div className="flex justify-between items-center w-full">
                                <div>
                                  <p className="font-medium">{conf.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {conf.date} • {conf.location}
                                  </p>
                                </div>
                                <Badge variant="outline">₦{conf.fee.toLocaleString()}</Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dietary Requirements */}
                    <div>
                      <Label htmlFor="dietary">Dietary Requirements</Label>
                      <Textarea
                        id="dietary"
                        name="dietary"
                        placeholder="Please specify any dietary restrictions or allergies"
                        rows={3}
                      />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" name="terms" required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-green-600 hover:underline">
                          Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-green-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing Registration...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Register & Send Confirmation
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Speaker Registration */}
              <TabsContent value="speaker">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mic className="w-5 h-5 mr-2 text-blue-600" />
                      Speaker/Presenter Application
                    </CardTitle>
                    <CardDescription>Apply to present at NIS conferences and share your expertise</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="speakerFirstName">First Name *</Label>
                        <Input id="speakerFirstName" name="firstName" required />
                      </div>
                      <div>
                        <Label htmlFor="speakerLastName">Last Name *</Label>
                        <Input id="speakerLastName" name="lastName" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="speakerEmail">Email Address *</Label>
                        <Input id="speakerEmail" name="email" type="email" required />
                      </div>
                      <div>
                        <Label htmlFor="speakerPhone">Phone Number *</Label>
                        <Input id="speakerPhone" name="phone" type="tel" required />
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="speakerOrganization">Organization *</Label>
                        <Input id="speakerOrganization" name="organization" required />
                      </div>
                      <div>
                        <Label htmlFor="speakerTitle">Professional Title *</Label>
                        <Input id="speakerTitle" name="jobTitle" required />
                      </div>
                    </div>

                    {/* Biography */}
                    <div>
                      <Label htmlFor="biography">Professional Biography *</Label>
                      <Textarea
                        id="biography"
                        name="biography"
                        placeholder="Provide a brief professional biography (max 500 words)"
                        rows={4}
                        required
                      />
                    </div>

                    {/* Presentation Details */}
                    <div>
                      <Label htmlFor="presentationTitle">Presentation Title *</Label>
                      <Input id="presentationTitle" name="presentationTitle" required />
                    </div>

                    <div>
                      <Label htmlFor="presentationAbstract">Presentation Abstract *</Label>
                      <Textarea
                        id="presentationAbstract"
                        name="presentationAbstract"
                        placeholder="Provide a detailed abstract of your presentation (max 300 words)"
                        rows={4}
                        required
                      />
                    </div>

                    {/* Conference Preference */}
                    <div>
                      <Label htmlFor="preferredConference">Preferred Conference *</Label>
                      <Select name="conference" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your preferred conference" />
                        </SelectTrigger>
                        <SelectContent>
                          {conferences.map((conf) => (
                            <SelectItem key={conf.id} value={conf.id}>
                              {conf.name} - {conf.date}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Expertise Areas */}
                    <div>
                      <Label htmlFor="expertise">Areas of Expertise</Label>
                      <Textarea
                        id="expertise"
                        name="expertise"
                        placeholder="List your key areas of expertise (comma-separated)"
                        rows={2}
                      />
                    </div>

                    {/* Previous Speaking Experience */}
                    <div>
                      <Label htmlFor="experience">Previous Speaking Experience</Label>
                      <Textarea
                        id="experience"
                        name="experience"
                        placeholder="Describe your previous speaking engagements and experience"
                        rows={3}
                      />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center space-x-2">
                      <Checkbox id="speakerTerms" name="terms" required />
                      <Label htmlFor="speakerTerms" className="text-sm">
                        I agree to the speaker terms and conditions and understand that my application will be reviewed
                      </Label>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Submit Application & Send Confirmation
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Team Member Registration */}
              <TabsContent value="team">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-purple-600" />
                      NIS Team Member Registration
                    </CardTitle>
                    <CardDescription>Internal staff registration requiring supervisor approval</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="teamFirstName">First Name *</Label>
                        <Input id="teamFirstName" name="firstName" required />
                      </div>
                      <div>
                        <Label htmlFor="teamLastName">Last Name *</Label>
                        <Input id="teamLastName" name="lastName" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="teamEmail">Official Email Address *</Label>
                        <Input
                          id="teamEmail"
                          name="email"
                          type="email"
                          placeholder="name@immigration.gov.ng"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="teamPhone">Phone Number *</Label>
                        <Input id="teamPhone" name="phone" type="tel" required />
                      </div>
                    </div>

                    {/* Staff Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="staffId">Staff ID *</Label>
                        <Input id="staffId" name="staffId" required />
                      </div>
                      <div>
                        <Label htmlFor="department">Department *</Label>
                        <Select name="department" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administration">Administration</SelectItem>
                            <SelectItem value="border-control">Border Control</SelectItem>
                            <SelectItem value="visa-services">Visa Services</SelectItem>
                            <SelectItem value="enforcement">Enforcement</SelectItem>
                            <SelectItem value="training">Training & Development</SelectItem>
                            <SelectItem value="it">Information Technology</SelectItem>
                            <SelectItem value="legal">Legal Affairs</SelectItem>
                            <SelectItem value="finance">Finance & Accounts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="position">Current Position *</Label>
                        <Input id="position" name="jobTitle" required />
                      </div>
                      <div>
                        <Label htmlFor="grade">Grade Level</Label>
                        <Input id="grade" name="gradeLevel" placeholder="e.g., GL 12" />
                      </div>
                    </div>

                    {/* Supervisor Information */}
                    <div className="border-t pt-6">
                      <h4 className="font-semibold mb-4">Supervisor Information</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="supervisorName">Supervisor Name *</Label>
                          <Input id="supervisorName" name="supervisorName" required />
                        </div>
                        <div>
                          <Label htmlFor="supervisorEmail">Supervisor Email *</Label>
                          <Input
                            id="supervisorEmail"
                            name="supervisorEmail"
                            type="email"
                            placeholder="supervisor@immigration.gov.ng"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Conference Selection */}
                    <div>
                      <Label htmlFor="teamConference">Select Conference *</Label>
                      <Select name="conference" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a conference" />
                        </SelectTrigger>
                        <SelectContent>
                          {conferences.map((conf) => (
                            <SelectItem key={conf.id} value={conf.id}>
                              <div>
                                <p className="font-medium">{conf.name}</p>
                                <p className="text-sm text-gray-500">
                                  {conf.date} • {conf.location}
                                </p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Justification */}
                    <div>
                      <Label htmlFor="justification">Attendance Justification *</Label>
                      <Textarea
                        id="justification"
                        name="justification"
                        placeholder="Explain how attending this conference will benefit your role and the department"
                        rows={4}
                        required
                      />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center space-x-2">
                      <Checkbox id="teamTerms" name="terms" required />
                      <Label htmlFor="teamTerms" className="text-sm">
                        I confirm that I have discussed this attendance with my supervisor and agree to the terms and
                        conditions
                      </Label>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting for Approval...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Submit for Approval & Send Confirmation
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        )}

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <Calendar className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="font-semibold mb-2">Registration Deadlines</h3>
              <p className="text-sm text-gray-600">
                Register at least 2 weeks before the conference date to secure your spot and receive early bird pricing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Mail className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Email Confirmations</h3>
              <p className="text-sm text-gray-600">
                You'll receive immediate email confirmation with registration details and further instructions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <DollarSign className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="font-semibold mb-2">Payment Information</h3>
              <p className="text-sm text-gray-600">
                Payment instructions will be included in your confirmation email. Multiple payment options available.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </Layout>
  )
}
