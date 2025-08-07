import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckIcon,
  LightbulbIcon,
  RocketIcon,
  ShieldCheckIcon,
  FileTextIcon,
  UsersIcon,
  DownloadIcon,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import Button from "@/components/ui/button"

export default function FeaturesPage() {
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
            <BreadcrumbPage>Features</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Powerful Features for Your Legal Needs</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Discover how FastContracts simplifies and accelerates your legal document workflow.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <LightbulbIcon className="h-10 w-10 text-blue-600 mb-3" />
            <CardTitle className="text-xl font-bold">AI-Powered Generation</CardTitle>
            <CardDescription>
              Leverage advanced artificial intelligence to generate accurate and comprehensive contracts based on your
              specific inputs and requirements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Intelligent clause suggestions
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Automated field population
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Contextual legal advice (informational)
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileTextIcon className="h-10 w-10 text-blue-600 mb-3" />
            <CardTitle className="text-xl font-bold">Extensive Template Library</CardTitle>
            <CardDescription>
              Access a wide range of professionally drafted and legally sound contract templates for various industries
              and purposes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                NDAs, Employment, Lease, Service Agreements
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Regularly updated for compliance
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Customizable to your needs
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <RocketIcon className="h-10 w-10 text-blue-600 mb-3" />
            <CardTitle className="text-xl font-bold">Speed and Efficiency</CardTitle>
            <CardDescription>
              Generate complex legal documents in minutes, not hours, significantly reducing your administrative burden
              and legal costs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Intuitive step-by-step process
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Instant preview and download
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Time-saving automation
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <ShieldCheckIcon className="h-10 w-10 text-blue-600 mb-3" />
            <CardTitle className="text-xl font-bold">Legal Compliance & Security</CardTitle>
            <CardDescription>
              Our templates are designed with legal compliance in mind, and your data is protected with robust security
              measures.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Adherence to legal standards
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Secure data handling
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Regular security audits
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <UsersIcon className="h-10 w-10 text-blue-600 mb-3" />
            <CardTitle className="text-xl font-bold">User-Friendly Interface</CardTitle>
            <CardDescription>
              Designed for ease of use, our platform ensures a smooth and accessible experience for all users,
              regardless of legal expertise.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Intuitive navigation
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Clear instructions
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Accessible design principles
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <DownloadIcon className="h-10 w-10 text-blue-600 mb-3" />
            <CardTitle className="text-xl font-bold">Flexible Export Options</CardTitle>
            <CardDescription>
              Download your generated contracts in various formats, including PDF and Microsoft Word, for easy sharing
              and editing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                PDF for final versions
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                DOCX for further editing
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-blue-600" />
                Print-ready documents
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to experience the future of legal drafting?</h2>
        <Button asChild className="mt-4">
          <Link href="/start">Get Started Free</Link>
        </Button>
      </div>
    </div>
  )
}
