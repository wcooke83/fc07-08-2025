'use client'

import { useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, XIcon, Sparkles, Shield, Headphones, DollarSign, HelpCircle } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"

type BillingCycle = "monthly" | "yearly"

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly")

  const prices = useMemo(() => {
    // Base monthly prices
    const base = { starter: 19, pro: 49 }
    if (billing === "monthly") {
      return {
        starterAmount: base.starter,
        proAmount: base.pro,
        suffix: "/month",
        note: "Billed monthly"
      }
    }
    // Yearly: 2 months free
    return {
      starterAmount: base.starter * 10,
      proAmount: base.pro * 10,
      suffix: "/year",
      note: "Best value: 2 months free"
    }
  }, [billing])

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

        {/* Billing Toggle */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg border p-1">
          <Button
            variant={billing === "monthly" ? "default" : "ghost"}
            className={billing === "monthly" ? "bg-blue-600 hover:bg-blue-700" : ""}
            onClick={() => setBilling("monthly")}
            aria-pressed={billing === "monthly"}
          >
            Monthly
          </Button>
          <Button
            variant={billing === "yearly" ? "default" : "ghost"}
            className={billing === "yearly" ? "bg-blue-600 hover:bg-blue-700" : ""}
            onClick={() => setBilling("yearly")}
            aria-pressed={billing === "yearly"}
          >
            Yearly
            <Badge className="ml-2 bg-blue-600 hover:bg-blue-700">Save 17%</Badge>
          </Button>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{prices.note}</p>
      </div>

      {/* Plans */}
      <div className="mx-auto grid max-w-sm items-start gap-6 py-12 lg:max-w-none lg:grid-cols-3">
        <Card className="flex flex-col justify-between p-6 bg-muted/30 dark:bg-muted/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-muted/40">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Starter</CardTitle>
              <DollarSign className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </div>
            <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
              Perfect for individuals and small businesses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold">${prices.starterAmount}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{prices.suffix}</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                5 contracts/month
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Standard templates
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Email support
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Basic e-sign
              </li>
            </ul>
            <Button asChild className="mt-6 w-full">
              <Link href="/register">Choose Plan</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="relative flex flex-col justify-between border-2 border-blue-600 p-6 shadow-lg bg-muted/30 dark:bg-muted/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:bg-muted/40">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-blue-600 px-3 py-1 text-xs uppercase tracking-wide">Most Popular</Badge>
          </div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Pro</CardTitle>
              <Sparkles className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </div>
            <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
              Ideal for growing businesses with higher demands.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold">${prices.proAmount}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{prices.suffix}</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
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
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Advanced e-sign + audit logs
              </li>
            </ul>
            <Button asChild className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
              <Link href="/register">Choose Plan</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between p-6 bg-muted/30 dark:bg-muted/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-muted/40">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
              <Shield className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </div>
            <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
              Custom solutions for large organizations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">Custom</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">pricing</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
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

      {/* Comparison Table */}
      <div className="mx-auto max-w-5xl rounded-lg bg-muted/20 p-6">
        <h2 className="mb-4 text-center text-2xl font-semibold">Compare Features</h2>
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Feature</TableHead>
                <TableHead className="text-center">Starter</TableHead>
                <TableHead className="text-center">Pro</TableHead>
                <TableHead className="text-center">Enterprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { feature: "Contracts/month", starter: "5", pro: "Unlimited", ent: "Unlimited" },
                { feature: "Template Library", starter: "Standard", pro: "Premium", ent: "Premium + Custom" },
                { feature: "AI Customization", starter: false, pro: true, ent: true },
                { feature: "Support SLA", starter: "Email", pro: "Priority", ent: "24/7 Priority" },
                { feature: "e-Signature", starter: "Basic", pro: "Advanced", ent: "Advanced + SSO" },
                { feature: "Audit Logs", starter: false, pro: true, ent: true },
                { feature: "API Access", starter: false, pro: false, ent: true },
                { feature: "On-premise", starter: false, pro: false, ent: true },
              ].map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{row.feature}</TableCell>
                  <TableCell className="text-center">
                    {typeof row.starter === "boolean" ? (
                      row.starter ? <CheckIcon className="mx-auto h-4 w-4 text-blue-600" /> : <XIcon className="mx-auto h-4 w-4 text-gray-400" />
                    ) : (
                      <span>{row.starter}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof row.pro === "boolean" ? (
                      row.pro ? <CheckIcon className="mx-auto h-4 w-4 text-blue-600" /> : <XIcon className="mx-auto h-4 w-4 text-gray-400" />
                    ) : (
                      <span>{row.pro}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof row.ent === "boolean" ? (
                      row.ent ? <CheckIcon className="mx-auto h-4 w-4 text-blue-600" /> : <XIcon className="mx-auto h-4 w-4 text-gray-400" />
                    ) : (
                      <span>{row.ent}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
          Need a custom plan? Our team can tailor features to your requirements.
        </p>
      </div>

      {/* FAQ */}
      <div className="mx-auto mt-12 max-w-5xl rounded-lg bg-muted/20 p-6">
        <div className="mb-4 flex items-center justify-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600" aria-hidden="true" />
          <h2 className="text-2xl font-semibold">Pricing FAQs</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="q1">
            <AccordionTrigger>Do you offer a free trial?</AccordionTrigger>
            <AccordionContent>
              Yes. You can start on Starter and explore templates. Upgrade anytime to unlock premium features.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>How does yearly billing work?</AccordionTrigger>
            <AccordionContent>
              Yearly plans are billed upfront with a discount equivalent to 2 months free compared to monthly billing.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Can I cancel or change my plan?</AccordionTrigger>
            <AccordionContent>
              Absolutely. You can upgrade, downgrade, or cancel at any time. Changes take effect at the next billing cycle.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger>Do you offer discounts for nonprofits or education?</AccordionTrigger>
            <AccordionContent>
              Yes, contact our team for tailored discounts for nonprofits, students, and educators.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Help Banner */}
      <div className="mx-auto mt-12 max-w-4xl rounded-lg border bg-muted/30 p-6 text-center">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <Headphones className="h-5 w-5 text-blue-600" aria-hidden="true" />
          <p className="text-base font-medium">Questions about pricing? We&apos;re here to help.</p>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/contact">Contact sales</Link>
          </Button>
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 sm:w-auto">
            <Link href="/register">Start now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
