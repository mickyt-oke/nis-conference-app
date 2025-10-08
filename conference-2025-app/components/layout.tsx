"use client"

import type React from "react"
import { useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Shield, Play, Radio, Menu } from "lucide-react"
import { Footer } from "@/components/footer"
import { LoadingSpinner } from "@/components/loading-spinner"
import { LanguageSelector } from "@/components/language-selector"
import { BackToTop } from "@/components/back-to-top"
import { useLanguage } from "@/contexts/language-context"

interface LayoutProps {
  children: React.ReactNode
  showLoading?: boolean
}

export function Layout({ children, showLoading = false }: LayoutProps) {
  const { t } = useLanguage()
  const [isLive, setIsLive] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (showLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-800 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
              <div className="relative">
                <Image
                  src="/nis-logo.png"
                  alt="Nigeria Immigration Service Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
               
              </div>
              <div>
                <h1 className="text-xl font-bold">Nigeria Immigration Service</h1>
                <p className="text-sm text-green-100">Conference Management System</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link href="/" className="hover:text-green-200 transition-colors">
                {t("home")}
              </Link>
              <Link href="/conferences" className="hover:text-green-200 transition-colors">
                {t("conferences")}
              </Link>
              <Link href="/speakers" className="hover:text-green-200 transition-colors">
                {t("speakers")}
              </Link>
              <Link href="/documents" className="hover:text-green-200 transition-colors">
                {t("documents")}
              </Link>
              <Link href="/gallery" className="hover:text-green-200 transition-colors">
                {t("gallery")}
              </Link>
              <Link href="/register" className="hover:text-green-200 transition-colors">
                {t("register")}
              </Link>

              {/* Language Selector */}
              <LanguageSelector />

              {/* Livestream Button */}
              <Link href="/media">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white border-0 flex items-center gap-2"
                >
                  {isLive && <Radio className="h-4 w-4 animate-pulse" />}
                  <Play className="h-4 w-4" />
                  {isLive ? t("live") : t("stream")}
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-green-800 bg-transparent"
                >
                  {t("login")}
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-green-800 text-white border-green-700">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-semibold">Navigation</h2>
                </div>
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className="hover:text-green-200 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("home")}
                  </Link>
                  <Link
                    href="/conferences"
                    className="hover:text-green-200 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("conferences")}
                  </Link>
                  <Link
                    href="/speakers"
                    className="hover:text-green-200 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("speakers")}
                  </Link>
                  <Link
                    href="/documents"
                    className="hover:text-green-200 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("documents")}
                  </Link>
                  <Link
                    href="/gallery"
                    className="hover:text-green-200 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("gallery")}
                  </Link>
                  <Link
                    href="/register"
                    className="hover:text-green-200 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("register")}
                  </Link>

                  <div className="pt-4 border-t border-green-700">
                    <div className="mb-4">
                      <LanguageSelector />
                    </div>

                    <Link href="/media" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white border-0 flex items-center gap-2 w-full mb-3"
                      >
                        {isLive && <Radio className="h-4 w-4 animate-pulse" />}
                        <Play className="h-4 w-4" />
                        {isLive ? t("live") : t("stream")}
                      </Button>
                    </Link>

                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white text-white hover:bg-white hover:text-green-800 bg-transparent w-full"
                      >
                        {t("login")}
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}
