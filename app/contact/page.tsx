import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { siteConfig } from "@/lib/config"

export default function ContactPage() {
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
            <BreadcrumbPage>Contact Us</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Get in Touch</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          We'd love to hear from you! Reach out to us with any questions or feedback.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Information</CardTitle>
            <CardDescription>Reach us through various channels.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-3">
              <MailIcon className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 dark:text-gray-300">{siteConfig.mailSupport}</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 dark:text-gray-300">+1 (123) 456-7890</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPinIcon className="h-5 w-5 text-blue-600 mt-1" />
              <span className="text-gray-700 dark:text-gray-300">
                123 Main Street, Suite 456
                <br />
                Anytown, USA 12345
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">Send Us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Inquiry about FastContracts" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message here..." className="min-h-[120px]" required />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
