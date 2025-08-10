import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, FileText, Zap, Shield, Clock, Users, ArrowRight, AlertCircle } from 'lucide-react'
import Link from "next/link"
import { Suspense } from "react"

function ConfigurationAlert({ searchParams }: { searchParams: { error?: string } }) {
  if (searchParams.error === "supabase_not_configured") {
    return (
      <Alert className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <strong>Configuration Required:</strong> Supabase is not configured. Authentication features are disabled.
          Please set up your Supabase project and update the environment variables to enable user accounts and saved
          contracts.
        </AlertDescription>
      </Alert>
    )
  }
  return null
}

export default function HomePage({ searchParams }: { searchParams: { error?: string } }) {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Generate professional contracts in minutes, not hours",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Legally Sound",
      description: "Templates reviewed by legal professionals",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Multiple Types",
      description: "NDAs, employment contracts, service agreements, and more",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Share and collaborate on contracts with your team",
    },
  ]

  const contractTypes = [
    {
      title: "Non-Disclosure Agreement",
      description: "Protect confidential information",
      badge: "Popular",
      href: "/create/nda",
    },
    {
      title: "Service Agreement",
      description: "Define service terms and conditions",
      badge: "Business",
      href: "/create/service-agreement",
    },
    {
      title: "Employment Contract",
      description: "Hire employees with clear terms",
      badge: "HR",
      href: "/create/employment-contract",
    },
    {
      title: "Contractor Agreement",
      description: "Work with independent contractors",
      badge: "Freelance",
      href: "/create/contractor-agreement",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Suspense fallback={null}>
            <ConfigurationAlert searchParams={searchParams} />
          </Suspense>

          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              ⚡ Generate contracts in minutes
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Create Professional{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Legal Contracts
              </span>{" "}
              Instantly
            </h1>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
              Stop wasting time on paperwork. Generate legally sound contracts with our AI-powered platform in just a
              few clicks.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/start">
                  Start Creating <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg bg-transparent">
                <Link href="/templates">View Templates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Choose FastContracts?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Built for modern businesses that need reliable legal documents without the complexity
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="text-center bg-white dark:bg-black border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-colors">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contract Types Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Popular Contract Types
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choose from our library of professionally crafted contract templates
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid gap-6 sm:grid-cols-2">
              {contractTypes.map((contract, index) => (
                <Card key={index} className="group cursor-pointer transition-all hover:shadow-lg">
                  <Link href={contract.href}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {contract.title}
                        </CardTitle>
                        <Badge variant="secondary">{contract.badge}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{contract.description}</CardDescription>
                      <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400">
                        Create now <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Simple 3-Step Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From template selection to final document in just three easy steps
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Choose Template",
                  description: "Select from our library of legal contract templates",
                  icon: <FileText className="h-8 w-8" />,
                },
                {
                  step: "2",
                  title: "Fill Details",
                  description: "Complete the form with your specific contract details",
                  icon: <Clock className="h-8 w-8" />,
                },
                {
                  step: "3",
                  title: "Download & Use",
                  description: "Get your professional contract ready to sign",
                  icon: <CheckCircle className="h-8 w-8" />,
                },
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    {process.icon}
                  </div>
                  <div className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">Step {process.step}</div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{process.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 dark:bg-blue-700 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Create Your First Contract?
            </h2>
            <p className="mb-8 text-xl text-blue-100">
              Join thousands of businesses who trust FastContracts for their legal document needs
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link href="/start">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
