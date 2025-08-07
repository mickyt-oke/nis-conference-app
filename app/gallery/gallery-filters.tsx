"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface GalleryFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

const categories = [
  { id: "all", name: "All" },
  { id: "conferences", name: "Conferences" },
  { id: "training", name: "Training" },
  { id: "events", name: "Events" },
  { id: "facilities", name: "Facilities" },
]

export function GalleryFilters({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: GalleryFiltersProps) {
  const { t } = useLanguage()

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search gallery..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className={selectedCategory === category.id ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
