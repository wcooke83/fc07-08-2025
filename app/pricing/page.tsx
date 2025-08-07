import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

export default function PricingPage() {
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
            <BreadcrumbPage>Pricing</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Flexible Pricing Plans</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Choose the plan that best fits your needs, from individual use to large enterprises.
        </p>
      </div>

      <div className="mx-auto grid max-w-sm items-start gap-6 py-12 lg:max-w-none lg:grid-cols-3">
        <Card className="flex flex-col justify-between p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Starter</CardTitle>
            <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
              Perfect for individuals and small businesses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">$19</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">per month</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />5 contracts/month
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Standard templates
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Email support
              </li>
            </ul>
            <Button asChild className="mt-6 w-full">
              <Link href="/register">Choose Plan</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between p-6 border-2 border-blue-600 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Pro</CardTitle>
            <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
              Ideal for growing businesses with higher demands.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">$49</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">per month</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Unlimited contracts
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Premium templates
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Priority support
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                AI customization
              </li>
            </ul>
            <Button asChild className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
              <Link href="/register">Choose Plan</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
            <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
              Custom solutions for large organizations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">Custom</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">pricing</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Volume discounts
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Dedicated account manager
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                API access
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                On-premise deployment
              </li>
            </ul>
            <Button asChild className="mt-6 w-full bg-transparent" variant="outline">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
