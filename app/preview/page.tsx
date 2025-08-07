import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

export default function PreviewPage() {
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
            <BreadcrumbPage>Preview</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">Contract Preview</CardTitle>
          <CardDescription>Review your generated contract before finalizing.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none rounded-md border p-6 text-gray-800 dark:text-gray-200">
            <h2>Sample Contract Agreement</h2>
            <p>
              This Contract Agreement ("Agreement") is made and entered into on this 1st day of January, 2024, by and
              between:
            </p>
            <p>
              <strong>Party A:</strong> [Your Name/Company Name], with an address at [Your Address].
            </p>
            <p>
              <strong>Party B:</strong> [Other Party Name/Company Name], with an address at [Other Party Address].
            </p>
            <h3>1. Purpose</h3>
            <p>
              The purpose of this Agreement is to outline the terms and conditions under which Party A will provide
              services to Party B.
            </p>
            <h3>2. Services</h3>
            <p>Party A agrees to provide the following services: [Description of Services].</p>
            <h3>3. Payment</h3>
            <p>
              Party B agrees to pay Party A the sum of [Amount] for the services rendered. Payment shall be made on
              [Payment Terms].
            </p>
            <h3>4. Term and Termination</h3>
            <p>
              This Agreement shall commence on [Start Date] and continue until [End Date], unless terminated earlier by
              either party in accordance with the terms herein.
            </p>
            <h3>5. Confidentiality</h3>
            <p>
              Both parties agree to keep all confidential information shared during the course of this Agreement
              strictly confidential.
            </p>
            <h3>6. Governing Law</h3>
            <p>
              This Agreement shall be governed by and construed in accordance with the laws of [Your State/Country].
            </p>
            <h3>7. Signatures</h3>
            <p>IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.</p>
            <p className="mt-8">
              _________________________
              <br />
              Party A Signature
            </p>
            <p className="mt-4">
              _________________________
              <br />
              Party B Signature
            </p>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href="/create/sample-contract">Edit Contract</Link>
            </Button>
            <Button asChild>
              <Link href="/create/sample-contract/download">Download Contract</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
