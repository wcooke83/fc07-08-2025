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

export default function ArticlePage({ params }: { params: { id: string } }) {
  const articleId = params.id
  // In a real application, you would fetch article content based on articleId
  const article = {
    title: `Understanding Contract Type ${articleId}`,
    content: `
      <p>This is a detailed article about contract type ${articleId}. It covers various aspects such as its purpose, key clauses, and common use cases.</p>
      <p>Contracts are legally binding agreements between two or more parties that outline the terms and conditions of a particular arrangement. They are essential in business and personal transactions to ensure clarity, protect rights, and provide a framework for dispute resolution.</p>
      <h3>Key Elements of a Contract</h3>
      <ul>
        <li>Offer and Acceptance</li>
        <li>Consideration</li>
        <li>Legal Capacity</li>
        <li>Legality of Purpose</li>
        <li>Mutual Assent</li>
      </ul>
      <p>Understanding these elements is crucial for drafting and interpreting contracts effectively. Always consult with legal professionals for specific advice.</p>
    `,
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/help">Help Center</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/help/articles">Articles</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{article.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{article.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        </CardContent>
      </Card>
    </div>
  )
}
