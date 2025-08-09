import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getProfile, getUser } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { getContractsByUserId } from "@/lib/contracts"
import { format } from "date-fns"
import { PlusIcon, FileTextIcon } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const user = await getUser()
  const profile = await getProfile()

  if (!user) {
    redirect("/login")
  }

  const contracts = await getContractsByUserId(user.id)

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Welcome, {profile?.full_name || user.email}!</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Manage your generated contracts and explore new templates.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <PlusIcon className="h-12 w-12 text-blue-600 mb-4" />
          <CardTitle className="text-xl font-bold">Create New Contract</CardTitle>
          <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
            Start from scratch or choose a template to generate a new legal document.
          </CardDescription>
          <Button asChild className="mt-4">
            <Link href="/start">Start Now</Link>
          </Button>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <FileTextIcon className="h-12 w-12 text-blue-600 mb-4" />
          <CardTitle className="text-xl font-bold">Browse Templates</CardTitle>
          <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
            Explore our extensive library of professionally drafted legal templates.
          </CardDescription>
          <Button asChild className="mt-4 bg-transparent" variant="outline">
            <Link href="/templates">View Templates</Link>
          </Button>
        </Card>

        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-2xl">Your Recent Contracts</CardTitle>
            <CardDescription>Contracts you have created or saved.</CardDescription>
          </CardHeader>
          <CardContent>
            {contracts.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">You haven't created any contracts yet.</p>
            ) : (
              <ul className="space-y-4">
                {contracts.map((contract) => (
                  <li key={contract.id} className="flex items-center justify-between rounded-md border p-4">
                    <div>
                      <h3 className="font-semibold">{contract.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Created: {format(new Date(contract.created_at), "PPP")}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/create/${contract.template_id}/contract?contractId=${contract.id}`}>View</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            {contracts.length > 0 && (
              <Button asChild className="mt-6 w-full bg-transparent" variant="outline">
                <Link href="/contracts">View All Contracts</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
