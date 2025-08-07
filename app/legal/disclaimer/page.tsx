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

export default function DisclaimerPage() {
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
            <BreadcrumbPage>Legal Disclaimer</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardContent>
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Legal Disclaimer</h1>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">Last updated: January 1, 2024</p>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                The information provided by FastContracts on{" "}
                <Link href="/" className="underline">
                  https://www.fastcontracts.com
                </Link>{" "}
                (the "Site") is for general informational purposes only. All information on the Site is provided in good
                faith, however, we make no representation or warranty of any kind, express or implied, regarding the
                accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
              </p>
              <p>
                UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A
                RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE
                AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.
              </p>
              <h3>Professional Disclaimer</h3>
              <p>
                The Site cannot and does not contain legal advice. The legal information is provided for general
                informational and educational purposes only and is not a substitute for professional legal advice.
                Accordingly, before taking any actions based upon such information, we encourage you to consult with the
                appropriate legal professionals. We do not provide any kind of legal advice.
              </p>
              <p>THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THIS SITE IS SOLELY AT YOUR OWN RISK.</p>
              <h3>External Links Disclaimer</h3>
              <p>
                The Site may contain (or you may be sent through the Site) links to other websites or content belonging to
                or originating from third parties or links to websites and features in banners or other advertising. Such
                external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability,
                availability, or completeness by us.
              </p>
              <p>
                WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY
                INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN
                ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
                TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
