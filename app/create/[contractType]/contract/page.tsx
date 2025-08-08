"use client"

import { Label } from "@/components/ui/label"
import { useEffect, useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProgressBar } from "@/components/progress-bar"
import { Loader2, ArrowLeft, Save } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { createBrowserClient } from "@/lib/supabase/createBrowserClient"
import { useAuth } from "@/lib/auth-client"
import { generateContractContent } from "@/lib/contract-loader"

interface FormField {
  id: string
  label: string
  type: "text" | "textarea" | "date" | "number"
  placeholder?: string
  defaultValue?: string
  required: boolean
}

interface ContractTemplate {
  id: string
  name: string
  description: string
  content_template: string
  form_fields: FormField[]
  slug: string
}

interface Contract {
  id: string
  form_data: Record<string, string>
  template_id: string
  user_id: string
  status: string
}

interface ContractPageProps {
  params: {
    contractType: string
  }
  searchParams: {
    contractId?: string
  }
}

export default function ContractPage({ params, searchParams }: ContractPageProps) {
  const contractId = searchParams.contractId
  const contractType = params.contractType
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const supabase = createBrowserClient()

  const [template, setTemplate] = useState<ContractTemplate | null>(null)
  const [contract, setContract] = useState<Contract | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const fetchTemplate = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("contract_templates")
        .select("*")
        .eq("slug", contractType)
        .single()

      if (error) {
        console.error("Template fetch error:", error)
        throw new Error(`Template not found: ${error.message}`)
      }

      if (!data) {
        throw new Error("Template not found")
      }

      setTemplate(data as ContractTemplate)
      
      // Initialize form data with template defaults
      const initialFormData: Record<string, string> = {}
      if (data.form_fields && Array.isArray(data.form_fields)) {
        data.form_fields.forEach((field: FormField) => {
          initialFormData[field.id] = field.defaultValue || ""
        })
      }
      setFormData(initialFormData)
      
      return data as ContractTemplate
    } catch (error: any) {
      console.error("Error fetching template:", error)
      toast({
        title: "Error",
        description: `Failed to load contract template: ${error.message}`,
        variant: "destructive",
      })
      throw error
    }
  }, [contractType, supabase])

  const fetchContract = useCallback(async (templateData: ContractTemplate) => {
    if (!contractId || !user) return null

    try {
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("id", contractId)
        .eq("user_id", user.id)
        .single()

      if (error) {
        console.error("Contract fetch error:", error)
        throw new Error(`Contract not found: ${error.message}`)
      }

      if (!data) {
        throw new Error("Contract not found")
      }

      setContract(data as Contract)
      
      // Merge contract data with template defaults
      const mergedFormData: Record<string, string> = {}
      if (templateData.form_fields && Array.isArray(templateData.form_fields)) {
        templateData.form_fields.forEach((field: FormField) => {
          mergedFormData[field.id] = data.form_data?.[field.id] || field.defaultValue || ""
        })
      }
      setFormData(mergedFormData)
      
      return data as Contract
    } catch (error: any) {
      console.error("Error fetching contract:", error)
      toast({
        title: "Error",
        description: `Failed to load contract: ${error.message}`,
        variant: "destructive",
      })
      throw error
    }
  }, [contractId, user, supabase])

  const loadData = useCallback(async () => {
    if (authLoading) return
    
    if (!user) {
      const redirectUrl = `/create/${contractType}/contract${contractId ? `?contractId=${contractId}` : ""}`
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`)
      return
    }

    setLoading(true)
    try {
      const templateData = await fetchTemplate()
      if (contractId) {
        await fetchContract(templateData)
      }
    } catch (error) {
      // Error handling is done in the individual fetch functions
      router.push("/start")
    } finally {
      setLoading(false)
    }
  }, [authLoading, user, contractId, contractType, fetchTemplate, fetchContract, router])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSaveAndContinue = async () => {
    if (!template || !user) return

    // Validate required fields
    const missingFields = template.form_fields.filter(
      field => field.required && !formData[field.id]?.trim()
    )

    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.map(f => f.label).join(", ")}`,
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      const generatedContent = generateContractContent(template.content_template, formData)

      const contractData = {
        user_id: user.id,
        template_id: template.id,
        template_name: template.name,
        form_data: formData,
        content: generatedContent,
        status: "draft",
        updated_at: new Date().toISOString(),
      }

      let newContractId = contractId

      if (contractId) {
        // Update existing contract
        const { error } = await supabase
          .from("contracts")
          .update(contractData)
          .eq("id", contractId)
          .eq("user_id", user.id)

        if (error) throw error
      } else {
        // Create new contract
        const { data, error } = await supabase
          .from("contracts")
          .insert({
            ...contractData,
            created_at: new Date().toISOString(),
          })
          .select("id")
          .single()

        if (error) throw error
        if (data) {
          newContractId = data.id
        }
      }

      toast({
        title: "Success",
        description: "Contract saved successfully! Redirecting to preview...",
      })
      
      // Small delay to show the success message
      setTimeout(() => {
        router.push(`/create/${contractType}/preview?contractId=${newContractId}`)
      }, 1000)
      
    } catch (error: any) {
      console.error("Error saving contract:", error)
      toast({
        title: "Error",
        description: `Failed to save contract: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || loading || !template) {
    return (
      <div className="flex min-h-screen flex-col">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">
              {authLoading ? "Checking authentication..." : "Loading contract template..."}
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto py-8">
          <div className="mb-8 flex items-center justify-between">
            <Button variant="outline" onClick={() => router.back()} className="px-8">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <h1 className="text-3xl font-bold">{template.name}</h1>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
              <CardDescription>
                Fill in the details for your {template.name}.
                {contractId && " (Editing existing contract)"}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {template.form_fields && template.form_fields.length > 0 ? (
                template.form_fields.map((field) => (
                  <div key={field.id} className="grid gap-2">
                    <Label htmlFor={field.id}>
                      {field.label} {field.required && <span className="text-destructive">*</span>}
                    </Label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        onChange={handleInputChange}
                        required={field.required}
                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    ) : (
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        onChange={handleInputChange}
                        required={field.required}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No form fields configured for this template.</p>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveAndContinue} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save & Continue
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
