"use client"

import type React from "react"

import { useState } from "react"

import { CardDescription } from "@/components/ui/card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Clock, Users, CheckCircle, Video } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function ScheduleDemoPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    teamSize: "",
    useCase: "",
    preferredTime: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to your backend
    console.log("Demo request:", formData)
    setIsSubmitted(true)
  }

  const demoFeatures = [
    {
      icon: Video,
      title: "Personalized Walkthrough",
      description: "Get a customized demo based on your specific use case and requirements",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Learn from our product experts who understand your industry needs",
    },
    {
      icon: Clock,
      title: "30-Minute Session",
      description: "Comprehensive overview of features in just 30 minutes of your time",
    },
    {
      icon: CheckCircle,
      title: "Q&A Session",
      description: "Get answers to all your questions about FastContracts",
    },
  ]

  const timeSlots = [
    "9:00 AM - 9:30 AM",
    "10:00 AM - 10:30 AM",
    "11:00 AM - 11:30 AM",
    "1:00 PM - 1:30 PM",
    "2:00 PM - 2:30 PM",
    "3:00 PM - 3:30 PM",
    "4:00 PM - 4:30 PM",
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>

            <h1 className="text-4xl font-bold mb-4">Demo Scheduled!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for your interest in FastContracts. We've received your demo request and will contact you within
              24 hours to confirm your preferred time slot.
            </p>

            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle>What happens next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Confirmation Call</h4>
                    <p className="text-sm text-muted-foreground">
                      Our team will call you within 24 hours to confirm your demo time
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Calendar Invite</h4>
                    <p className="text-sm text-muted-foreground">
                      You'll receive a calendar invite with the meeting link
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Demo Session</h4>
                    <p className="text-sm text-muted-foreground">
                      Join the 30-minute personalized demo at your scheduled time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-x-4">
              <Button asChild>
                <a href="/">Back to Home</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/help">Browse Help Center</a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-3xl">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/help">Help Center</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Schedule a Demo</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Schedule a Demo</CardTitle>
            <CardDescription>Fill out the form below to request a personalized demo of our platform.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company (Optional)</Label>
              <Input id="company" placeholder="Acme Inc." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea id="message" placeholder="Tell us about your needs..." className="min-h-[100px]" />
            </div>
            <Button type="submit" className="w-full">
              Request Demo
            </Button>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-gray-950 mt-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Schedule a Demo</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              See FastContracts in action with a personalized demo tailored to your business needs
            </p>
          </div>
        </section>

        {/* Demo Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What You'll Get</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {demoFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
