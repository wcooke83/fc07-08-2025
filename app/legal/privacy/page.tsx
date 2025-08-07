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

export default function PrivacyPolicyPage() {
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
            <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardContent>
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Privacy Policy</h1>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">Last updated: January 1, 2024</p>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We collect information you provide directly to us, such as:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
                <li>Account information (name, email, company)</li>
                <li>Contract content and customizations</li>
                <li>Payment and billing information</li>
                <li>Communications with our support team</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
                <li>Provide and improve our services</li>
                <li>Process payments and send receipts</li>
                <li>Send important updates and notifications</li>
                <li>Provide customer support</li>
                <li>Analyze usage patterns to improve our platform</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy. We may share information with trusted service providers who
                assist us in operating our platform.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We implement appropriate security measures to protect your personal information against unauthorized access,
                alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security
                audits.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Data Retention</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We retain your information for as long as your account is active or as needed to provide services. You may
                request deletion of your account and associated data at any time.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Data portability</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">7. Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized
                content. You can control cookie settings through your browser.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new
                policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                If you have any questions about this Privacy Policy, please contact us at privacy@fastcontracts.com.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
