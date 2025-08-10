import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
              wrong URL.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/help">Get Help</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
