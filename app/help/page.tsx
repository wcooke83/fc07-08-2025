import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import Link from "next/link"

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">How can we help?</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Search our knowledge base or browse articles to find answers.
        </p>
        <div className="relative mx-auto mt-6 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input className="w-full pl-10" placeholder="Search for articles..." type="search" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Learn how to set up your account and create your first contract.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link className="text-blue-600 hover:underline" href="/help/articles/1">
                  Creating Your First Contract
                </Link>
              </li>
              <li>
                <Link className="text-blue-600 hover:underline" href="/help/articles/2">
                  Account Setup and Profile
                </Link>
              </li>
              <li>
                <Link className="text-blue-600 hover:underline" href="/help/articles/3">
                  Navigating the Dashboard
                </Link>
              </li>
            </ul>
            <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
              <Link href="/help/articles">View All Articles</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contract Management</CardTitle>
            <CardDescription>Tips and tricks for managing your contracts efficiently.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link className="text-blue-600 hover:underline" href="/help/articles/4">
                  Editing Existing Contracts
                </Link>
              </li>
              <li>
                <Link className="text-blue-600 hover:underline" href="/help/articles/5">
                  Downloading and Sharing Contracts
                </Link>
              </li>
              <li>
                <Link className="text-blue-600 hover:underline" href="/help/articles/6">
                  Archiving and Deleting Contracts
                </Link>
              </li>
            </ul>
            <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
              <Link href="/help/articles">View All Articles</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
            <CardDescription>Find solutions to common issues and technical problems.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link className="text-blue-600 hover:underline" href="/help/articles/7">
                  Login and Account Issues
                </Link>
              </li>
              <li>
                <Link className="text-blue-600 hover:underline" href="/help/articles/8">
                  Contract Generation Errors
                </Link>
              </li>
              <li>
                <Link className="text-blue-600 hover:underline" href="/help/articles/9">
                  Payment and Billing Problems
                </Link>
              </li>
            </ul>
            <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
              <Link href="/help/articles">View All Articles</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Video Tutorials</CardTitle>
            <CardDescription>Watch step-by-step guides on using our platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link className="text-blue-600 hover:underline" href="/help/videos/1">
                  How to Create a Lease Agreement
                </Link>
              </li>
              <li>
                <Link className="text-blue-600 hover:underline" href="/help/videos/2">
                  Customizing Contract Fields
                </Link>
              </li>
              <li>
                <Link className="text-blue-600 hover:underline" href="/help/videos/3">
                  Using AI Suggestions
                </Link>
              </li>
            </ul>
            <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
              <Link href="/help/videos">View All Videos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule a Demo</CardTitle>
            <CardDescription>Request a personalized demo with our sales team.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need a more in-depth look at how FastContracts can help your business? Schedule a demo with one of our
              experts.
            </p>
            <Button className="mt-4 w-full" asChild>
              <Link href="/help/demo">Schedule Now</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Can't find what you're looking for? Get in touch with our support team.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Our support team is available to assist you with any questions or issues.
            </p>
            <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
