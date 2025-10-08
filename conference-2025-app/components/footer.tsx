import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Globe, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/placeholder.svg?height=50&width=50"
                alt="NIS Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-lg">Nigeria Immigration Service</h3>
                <p className="text-green-200 text-sm">Conference Portal</p>
              </div>
            </div>
            {/* <p className="text-green-200 text-sm leading-relaxed">
              The official conference management platform for the Nigeria Immigration Service, facilitating professional
              development and knowledge sharing across the organization.
            </p> */}
            <div className="flex space-x-4">
              <Link href="#" className="text-green-200 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-green-200 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-green-200 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-green-200 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-green-200 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/conferences" className="text-green-200 hover:text-white transition-colors text-sm">
                  Conferences
                </Link>
              </li>
              <li>
                <Link href="/documents" className="text-green-200 hover:text-white transition-colors text-sm">
                  Document Repository
                </Link>
              </li>
              <li>
                <Link href="/speakers" className="text-green-200 hover:text-white transition-colors text-sm">
                  Speakers
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-green-200 hover:text-white transition-colors text-sm">
                  Registration
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-green-200 hover:text-white transition-colors text-sm">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Other Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                  Conference Management
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                  Archives
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                  Speakers &amp; Presenters
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                  NIS Directory
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                  NIS Legal Frameworks
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                  Research Papers &amp; Publications
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-green-300 mt-1 flex-shrink-0" />
                <div className="text-sm text-green-200">
                  <p>Nigeria Immigration Service</p>
                  <p>Umar Yar-Adua Exp Way</p>
                  <p>Airport Road, Sauka, Abuja</p>
                  <p>Federal Capital Territory, Nigeria</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-300 flex-shrink-0" />
                <span className="text-sm text-green-200">+234-9-234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-green-300 flex-shrink-0" />
                <span className="text-sm text-green-200">conference@immigration.gov.ng</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-green-300 flex-shrink-0" />
                <span className="text-sm text-green-200">conference.immigration.gov.ng</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Footer Links */}
      <div className="border-t border-green-800">
        <div className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-medium mb-3">Legal & Compliance</h5>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-green-200 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-green-200 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility" className="text-green-200 hover:text-white transition-colors text-sm">
                    Accessibility Statement
                  </Link>
                </li>
                <li>
                  <Link href="/foi" className="text-green-200 hover:text-white transition-colors text-sm">
                    Freedom of Information
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-medium mb-3">Support & Help</h5>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-green-200 hover:text-white transition-colors text-sm">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-green-200 hover:text-white transition-colors text-sm">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-green-200 hover:text-white transition-colors text-sm">
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="text-green-200 hover:text-white transition-colors text-sm">
                    Feedback & Suggestions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-medium mb-3">Related Links</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://immigration.gov.ng"
                    className="text-green-200 hover:text-white transition-colors text-sm"
                  >
                    Main NIS Website
                  </Link>
                </li>
                
                <li>
                  <Link href="#" className="text-green-200 hover:text-white transition-colors text-sm">
                    News & Updates
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-green-800 bg-green-950">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-green-300">© 2025 Nigeria Immigration Service. All rights reserved.</div>
            <div className="flex items-center space-x-4 text-sm text-green-300">
              <span>Conference Management System v1.0</span>
              <span>•</span>
              <span>Powered by NIS ICT Web Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
