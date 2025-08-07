import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

export default function TermsOfServicePage() {
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
            <BreadcrumbPage>Terms of Service</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardContent>
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Terms of Service</h1>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">Last updated: January 1, 2024</p>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                By accessing and using FastContracts ("Service"), you accept and agree to be bound by the terms and
                provision of this agreement.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                FastContracts is an AI-powered platform that helps users create, customize, and manage legal contracts. Our
                service provides templates and tools to generate legally sound documents.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                To access certain features of the Service, you must register for an account. You are responsible for
                maintaining the confidentiality of your account credentials and for all activities that occur under your
                account.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Acceptable Use</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
                <li>Create contracts for illegal purposes</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful or malicious content</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Legal Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                While our contracts are reviewed by legal professionals, FastContracts does not provide legal advice. We
                recommend consulting with a qualified attorney for complex legal matters.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">6. Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                Service.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                FastContracts shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                resulting from your use of the Service.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">8. Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We reserve the right to modify these terms at any time. We will notify users of significant changes via
                email or through the Service.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">9. Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                If you have any questions about these Terms of Service, please contact us at legal@fastcontracts.com.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
