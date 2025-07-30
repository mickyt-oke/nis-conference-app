"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Users, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
  const { toast } = useToast()
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribeEmail, setSubscribeEmail] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    enquiryType: "general",
  })

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully Subscribed!",
        description: "You'll receive updates about upcoming conferences and events.",
      })
      setSubscribeEmail("")
      setIsSubscribing(false)
    }, 1000)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      })
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        enquiryType: "general",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  const enquiryTypes = [
    { value: "general", label: "General Inquiry", icon: MessageSquare },
    { value: "conference", label: "Conference Registration", icon: Calendar },
    { value: "speaker", label: "Speaker Application", icon: Users },
    { value: "technical", label: "Technical Support", icon: Phone },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800">
            Get in Touch
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our conferences or need assistance? We're here to help you every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-green-600" />
                  Contact Information
                </CardTitle>
                <CardDescription>Reach out to us through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Address</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Nigeria Immigration Service
                      <br />
                      Federal Secretariat Complex
                      <br />
                      Shehu Shagari Way, Abuja
                      <br />
                      Federal Capital Territory, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Main Line: +234-9-234-5678
                      <br />
                      Conference Desk: +234-9-234-5679
                      <br />
                      Emergency: +234-9-234-5680
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      General: info@immigration.gov.ng
                      <br />
                      Conference: conference@immigration.gov.ng
                      <br />
                      Support: support@immigration.gov.ng
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Office Hours</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Monday - Friday: 8:00 AM - 5:00 PM
                      <br />
                      Saturday: 9:00 AM - 2:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Newsletter Subscription
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Stay updated with conference announcements and immigration news
                  </p>
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={subscribeEmail}
                      onChange={(e) => setSubscribeEmail(e.target.value)}
                      required
                      className="text-sm"
                    />
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-sm"
                      disabled={isSubscribing}
                    >
                      {isSubscribing ? "Subscribing..." : "Subscribe to Updates"}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-5 w-5 mr-2 text-green-600" />
                  Send us a Message
                </CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="enquiry-type">Enquiry Type</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {enquiryTypes.map((type) => (
                        <label
                          key={type.value}
                          className={`cursor-pointer rounded-lg border-2 p-3 text-center transition-all hover:border-green-300 ${
                            contactForm.enquiryType === type.value ? "border-green-600 bg-green-50" : "border-gray-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name="enquiry-type"
                            value={type.value}
                            checked={contactForm.enquiryType === type.value}
                            onChange={(e) => setContactForm({ ...contactForm, enquiryType: e.target.value })}
                            className="sr-only"
                          />
                          <type.icon className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                          <div className="text-xs font-medium">{type.label}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Please provide details about your inquiry..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
