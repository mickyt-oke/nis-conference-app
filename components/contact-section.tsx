"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"

export function ContactSection() {
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: "",
    subject: "",
    message: "",
  })

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    setIsSubscribing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Successfully subscribed to our newsletter!")
    setEmail("")
    setIsSubscribing(false)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!contactForm.name || !contactForm.email || !contactForm.enquiryType || !contactForm.message) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("Your enquiry has been submitted successfully! We'll get back to you within 24 hours.")
    setContactForm({
      name: "",
      email: "",
      phone: "",
      enquiryType: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@immigration.gov.ng", "conference@immigration.gov.ng"],
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+234 9 461 2345", "+234 9 461 2346"],
      description: "Call us during office hours",
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: ["Nigeria Immigration Service Headquarters", "Sauka, Airport Road, Abuja, Nigeria"],
      description: "Visit our main office",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday: 9:00 AM - 2:00 PM"],
      description: "We're here to help",
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Globe, href: "#", label: "Website" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch With Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about the conference or need assistance? We're here to help. Contact us through any of the
            channels below or fill out our enquiry form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-l-4 border-l-green-600">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <info.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{info.description}</p>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-gray-700">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Social Media Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="bg-gray-100 hover:bg-green-100 p-2 rounded-lg transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5 text-gray-600 hover:text-green-600" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form and Newsletter */}
          <div className="lg:col-span-2 space-y-8">
            {/* Newsletter Subscription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-green-600" />
                  Subscribe to Our Newsletter
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Stay updated with the latest conference news, announcements, and immigration updates.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" disabled={isSubscribing} className="bg-green-600 hover:bg-green-700">
                    {isSubscribing ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Enquiry Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  Send Us An Enquiry
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email Address *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="enquiry-type">Enquiry Type *</Label>
                      <Select
                        value={contactForm.enquiryType}
                        onValueChange={(value) => setContactForm({ ...contactForm, enquiryType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select enquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Enquiry</SelectItem>
                          <SelectItem value="conference">Conference Registration</SelectItem>
                          <SelectItem value="speaker">Speaker Application</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="media">Media & Press</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="Enter the subject of your enquiry"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Please provide details about your enquiry..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700">
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Enquiry
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Immediate Assistance?</h3>
          <p className="text-gray-600 mb-4">
            For urgent conference-related matters, please call our dedicated conference hotline
          </p>
          <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
            <Phone className="h-5 w-5" />
            <span>+234 9 461 2350 (Conference Hotline)</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Available 24/7 during conference period</p>
        </div>
      </div>
    </section>
  )
}
