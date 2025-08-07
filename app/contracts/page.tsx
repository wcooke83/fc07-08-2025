"use client"

import { useEffect } from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Search, Filter, Download, Eye, Trash2, FileText } from 'lucide-react'
import Link from "next/link"
import { useAuth } from "@/lib/auth-client"
import { toast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { createBrowserClient } from "@/lib/supabase/createBrowserClient"

type Contract = {
  id: string
  title: string
  template_id: string
  contract_type: string
  status: string
  created_at: string
  user_id: string
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "draft" | "completed" | "pending">("all")

  const { user, loading: authLoading } = useAuth()
  const supabase = createBrowserClient()

  const fetchContracts = async () => {
    if (authLoading || !user) {
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      let query = supabase.from("contracts").select("*").eq("user_id", user.id)

      if (filterStatus !== "all") {
        query = query.eq("status", filterStatus)
      }

      if (searchTerm) {
        query = query.ilike("title", `%${searchTerm}%`)
      }

      const { data, error } = await query.order("created_at", { ascending: false })

      if (error) {
        throw error
      }
      setContracts(data || [])
    } catch (error: any) {
      console.error("Error fetching contracts:", error.message)
      toast({
        title: "Error",
        description: `Failed to load contracts: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContracts()
  }, [user, authLoading, filterStatus, searchTerm])

  const handleDeleteContract = async (contractId: string) => {
    if (!confirm("Are you sure you want to delete this contract?")) {
      return
    }

    try {
      const { error } = await supabase.from("contracts").delete().eq("id", contractId)

      if (error) {
        throw error
      }

      setContracts(contracts.filter((contract) => contract.id !== contractId))
      toast({
        title: "Success",
        description: "Contract deleted successfully.",
      })
    } catch (error: any) {
      console.error("Error deleting contract:", error.message)
      toast({
        title: "Error",
        description: `Failed to delete contract: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please log in to view your contracts.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <main className="flex-1 w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">My Contracts</CardTitle>
            <CardDescription>Manage and download your contracts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-bold">My Contracts</h1>
              <Button asChild>
                <Link href="/start">
                  <FileText className="mr-2 h-4 w-4" /> Create New Contract
                </Link>
              </Button>
            </div>

            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by contract title..."
                  className="w-full pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Filter className="h-4 w-4" />
                    Status:{" "}
                    {filterStatus === "all" ? "All" : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("draft")}>Draft</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("completed")}>Completed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>Pending</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {contracts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                You haven't created any contracts yet.{" "}
                <Link href="/start" className="text-primary hover:underline">
                  Start one now!
                </Link>
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.title}</TableCell>
                        <TableCell>{contract.template_id || "Unknown Template"}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              contract.status === "completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : contract.status === "draft"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {contract.status}
                          </span>
                        </TableCell>
                        <TableCell>{format(new Date(contract.created_at), "PPP")}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/create/${contract.contract_type}/preview?contractId=${contract.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/create/${contract.contract_type}/download?contractId=${contract.id}`}>
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Link>
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteContract(contract.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
