import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UsersIcon, LightbulbIcon, ShieldCheckIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>About Us</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">About FastContracts</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Revolutionizing legal document creation with AI.
        </p>
      </div>

      <section className="py-12">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              At FastContracts, our mission is to empower individuals and businesses by simplifying the complex process
              of legal document creation. We believe that access to legally sound contracts should be fast, affordable,
              and straightforward, without compromising on quality or compliance.
            </p>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              We leverage cutting-edge artificial intelligence to transform traditional legal drafting into an
              intuitive, efficient, and accessible experience for everyone.
            </p>
          </div>
          <img
            alt="Our Mission"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            height="300"
            src="/placeholder.svg?height=300&width=500"
            width="500"
          />
        </div>
      </section>

      <section className="py-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Our Values</h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            The principles that guide our work and our commitment to you.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="text-center p-6">
            <LightbulbIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-xl font-bold">Innovation</CardTitle>
            <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
              Continuously pushing the boundaries of AI to offer smarter, more efficient legal solutions.
            </CardDescription>
          </Card>
          <Card className="text-center p-6">
            <ShieldCheckIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-xl font-bold">Accuracy & Trust</CardTitle>
            <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
              Ensuring the highest standards of legal accuracy and data security for your peace of mind.
            </CardDescription>
          </Card>
          <Card className="text-center p-6">
            <UsersIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-xl font-bold">Accessibility</CardTitle>
            <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
              Making legal services accessible and understandable for everyone, regardless of their background.
            </CardDescription>
          </Card>
        </div>
      </section>

      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We are always looking for passionate individuals to join us in our mission. If you are excited about the
          intersection of AI and law, check out our career opportunities.
        </p>
        <Button asChild className="mt-6">
          <Link href="/contact">View Careers</Link>
        </Button>
      </section>
    </div>
  )
}
