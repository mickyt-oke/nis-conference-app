"use client"

import { useState, lazy, Suspense } from "react"
import { Layout } from "@/components/layout"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useLanguage } from "@/contexts/language-context"

// Lazy load gallery components
const GalleryGrid = lazy(() => import("./gallery-grid").then((module) => ({ default: module.GalleryGrid })))
const GalleryFilters = lazy(() => import("./gallery-filters").then((module) => ({ default: module.GalleryFilters })))

export default function GalleryPage() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Simulate loading
  setTimeout(() => setIsLoading(false), 1500)

  return (
    <Layout showLoading={isLoading}>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">{t("gallery")}</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Explore our comprehensive collection of conference photos, videos, and memorable moments
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Suspense fallback={<LoadingSpinner />}>
              <GalleryFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <GalleryGrid category={selectedCategory} searchQuery={searchQuery} />
            </Suspense>
          </div>
        </section>
      </div>
    </Layout>
  )
}
