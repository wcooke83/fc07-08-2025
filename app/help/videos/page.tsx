import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

export default function VideosPage() {
  const videos = [
    {
      id: "1",
      title: "How to Create a Lease Agreement",
      description: "A step-by-step guide to generating a lease agreement using our platform.",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder YouTube embed
    },
    {
      id: "2",
      title: "Customizing Contract Fields",
      description: "Learn how to customize and add specific fields to your contracts.",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder YouTube embed
    },
    {
      id: "3",
      title: "Using AI Suggestions for Contracts",
      description: "Discover how our AI can help you draft better contracts faster.",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder YouTube embed
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/help">Help Center</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Video Tutorials</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Video Tutorials</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Watch our video guides to learn how to use FastContracts.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id}>
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
              <CardDescription>{video.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full rounded-md bg-gray-200 dark:bg-gray-800">
                <iframe
                  className="absolute inset-0 h-full w-full rounded-md"
                  src={video.embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
