"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { toast } from "sonner"

export function ContactSection() {
  const { t } = useLanguage()
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [email, setEmail] = useState("")
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    enquiryType: "",
    message: "",
  })

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("Successfully subscribed to newsletter!")
    setEmail("")
    setIsSubscribing(false)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Message sent successfully! We will get back to you soon.")
    setContactForm({ fullName: "", email: "", enquiryType: "", message: "" })
    setIsSending(false)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("contactUs")}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("contactDesc")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-green-600" />
                  {t("getInTouch")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Nigeria Immigration Service</p>
                    <p>Umar Yar-Adua Expressway</p>
                    <p>Airport Road, Sauka, Abuja</p>
                    <p>Federal Capital Territory, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">+234-9-234-5678</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">conference@immigration.gov.ng</span>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-sm">{t("officeHours")}</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{t("mondayFriday")}</p>
                    <p>{t("saturday")}</p>
                    <p>{t("sundayClosed")}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="font-medium text-sm mb-3">{t("followUs")}</p>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="p-2 bg-transparent">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="p-2 bg-transparent">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="p-2 bg-transparent">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="p-2 bg-transparent">
                      <Youtube className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">{t("newsletterSignup")}</CardTitle>
                <CardDescription>{t("newsletterDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubscribing}>
                    {isSubscribing ? t("loading") : t("subscribe")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("contactEnquiry")}</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">{t("fullName")}</Label>
                      <Input
                        id="fullName"
                        value={contactForm.fullName}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, fullName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t("emailAddress")}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="enquiryType">{t("enquiryType")}</Label>
                    <Select
                      value={contactForm.enquiryType}
                      onValueChange={(value) => setContactForm((prev) => ({ ...prev, enquiryType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select enquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">{t("general")}</SelectItem>
                        <SelectItem value="conference">{t("conference")}</SelectItem>
                        <SelectItem value="speaker">{t("speaker")}</SelectItem>
                        <SelectItem value="technical">{t("technical")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">{t("message")}</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSending}>
                    {isSending ? t("loading") : t("sendMessage")}
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
