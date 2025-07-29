import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function MediaLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-green-800 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 bg-green-700" />
              <div>
                <Skeleton className="h-5 w-48 bg-green-700" />
                <Skeleton className="h-4 w-32 bg-green-700 mt-1" />
              </div>
            </div>
            <Skeleton className="h-8 w-64 bg-green-700" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header Skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-[600px] mx-auto" />
        </div>

        {/* Tabs Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-full max-w-md mx-auto" />
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="w-full h-48" />
              <CardHeader>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-9 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
