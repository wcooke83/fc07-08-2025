"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, FileText, Clock, Shield, AlertCircle, Loader2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { getContractTemplate, getContractById } from "@/lib/contracts"
import { generateContractAction } from "./actions"
import { LegalDisclaimer } from "@/components/legal-disclaimer"
import Link from "next/link"

export default function CreateContractPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const contractType = params.contractType as string
  const contractId = searchParams.get("contractId")

  const [template, setTemplate] = useState<any>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load template and existing contract data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        console.log("🔍 Loading template for contract type:", contractType)
        const templateData = await getContractTemplate(contractType)
        console.log("📊 Template data received:", {
          found: !!templateData,
          name: templateData?.name,
          hasFormFields: !!templateData?.form_fields,
          formFieldsLength: templateData?.form_fields?.length,
          formFields: templateData?.form_fields,
        })

        if (!templateData) {
          console.error("❌ No template found for contract type:", contractType)
          setTemplate(null)
          setIsLoading(false)
          return
        }

        setTemplate(templateData)

        // If contractId is provided, load existing form data
        if (contractId) {
          const existingContract = await getContractById(contractId)
          if (existingContract) {
            setFormData(existingContract.form_data)
            setDisclaimerAccepted(true) // Assume disclaimer was accepted if contract exists
          }
        } else {
          // Load from localStorage as fallback
          const savedData = localStorage.getItem(`fastcontracts_${contractType}_formdata`)
          const savedDisclaimer = localStorage.getItem(`fastcontracts_${contractType}_disclaimer`)

          if (savedData) {
            try {
              const parsedData = JSON.parse(savedData)
              setFormData(parsedData)
            } catch (error) {
              console.error("❌ Error parsing saved form data:", error)
            }
          }

          if (savedDisclaimer === "true") {
            setDisclaimerAccepted(true)
          }
        }
      } catch (error) {
        console.error("❌ Error loading template:", error)
        setTemplate(null)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [contractType, contractId])

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(`fastcontracts_${contractType}_formdata`, JSON.stringify(formData))
    }
  }, [formData, contractType])

  // Save disclaimer acceptance
  useEffect(() => {
    if (disclaimerAccepted) {
      localStorage.setItem(`fastcontracts_${contractType}_disclaimer`, "true")
    }
  }, [disclaimerAccepted, contractType])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Loader2 className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold mb-2">Loading Contract Template</h1>
            <p className="text-gray-600">Please wait while we load the contract details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Contract Not Found</h1>
            <p className="text-gray-600 mb-6">The contract type "{contractType}" was not found.</p>
            <Link href="/contracts">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Contracts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const progress = (1 / 3) * 100

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!disclaimerAccepted) {
      newErrors.disclaimer = "You must accept the legal disclaimer to proceed"
    }

    // Check if form_fields exists and is an array
    if (template.form_fields && Array.isArray(template.form_fields)) {
      template.form_fields.forEach((field: any) => {
        if (field.required) {
          const value = formData[field.id]
          if (!value || !value.trim()) {
            newErrors[field.id] = `${field.label} is required`
          }
        }
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGenerateContract = async () => {
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "There are some required fields that need to be completed.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const formDataObj = new FormData()
      formDataObj.append("contractType", contractType)

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      // Pass null for anonymous users - RLS policy should allow this
      const result = await generateContractAction(formDataObj, null)

      if (result.success && result.contractId) {
        toast({
          title: "Contract Generated Successfully!",
          description: "Your contract template has been generated and is ready for review.",
        })
        // Navigate to preview page
        router.push(`/create/${contractType}/preview`)
      } else {
        toast({
          title: "Generation Failed",
          description: result.error || "An unknown error occurred.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate contract. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleBack = () => {
    router.push("/contracts")
  }

  const renderFormField = (field: any) => {
    const hasError = errors[field.id]
    const errorClass = hasError ? "border-red-500 focus:border-red-500" : ""

    switch (field.type) {
      case "text":
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>
              {field.label} {field.required && "*"}
            </Label>
            <Input
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => updateFormData(field.id, e.target.value)}
              className={errorClass}
            />
            {hasError && (
              <div className="flex items-center mt-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors[field.id]}
              </div>
            )}
          </div>
        )

      case "textarea":
        return (
          <div key={field.id} className="md:col-span-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && "*"}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              rows={3}
              value={formData[field.id] || ""}
              onChange={(e) => updateFormData(field.id, e.target.value)}
              className={errorClass}
            />
            {hasError && (
              <div className="flex items-center mt-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors[field.id]}
              </div>
            )}
          </div>
        )

      case "select":
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>
              {field.label} {field.required && "*"}
            </Label>
            <Select value={formData[field.id] || ""} onValueChange={(value) => updateFormData(field.id, value)}>
              <SelectTrigger className={errorClass}>
                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasError && (
              <div className="flex items-center mt-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors[field.id]}
              </div>
            )}
          </div>
        )

      case "date":
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>
              {field.label} {field.required && "*"}
            </Label>
            <Input
              id={field.id}
              type="date"
              value={formData[field.id] || ""}
              onChange={(e) => updateFormData(field.id, e.target.value)}
              className={errorClass}
            />
            {hasError && (
              <div className="flex items-center mt-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors[field.id]}
              </div>
            )}
          </div>
        )

      case "number":
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>
              {field.label} {field.required && "*"}
            </Label>
            <Input
              id={field.id}
              type="number"
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => updateFormData(field.id, e.target.value)}
              className={errorClass}
            />
            {hasError && (
              <div className="flex items-center mt-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors[field.id]}
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  // Ensure form_fields is an array
  const formFields = Array.isArray(template?.form_fields) ? template.form_fields : []

  console.log("🔍 Rendering with template:", template)
  console.log("📝 Form fields:", formFields)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/contracts" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contracts
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{template.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{template.description}</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Est. {template.estimated_time || "5 min"}
              </div>
              <div className="flex items-center">
                <Shield className="h-10 w-10 mr-1" />
                Template only
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step 1 of 3</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-8 gap-8">
          <div className="lg:col-span-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Contract Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">
                      Contract Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {formFields.length > 0 ? (
                        formFields.map((field: any) => renderFormField(field))
                      ) : (
                        <div className="col-span-2 text-center py-8">
                          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                          <p className="text-gray-600">No form fields configured for this contract type.</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Template: {template.name} | Fields: {JSON.stringify(template.form_fields)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="h-4"></div>

                  <LegalDisclaimer />

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="disclaimer"
                        checked={disclaimerAccepted}
                        onCheckedChange={(checked) => setDisclaimerAccepted(checked as boolean)}
                        className={`mt-1 ${errors.disclaimer ? "border-red-500" : ""}`}
                      />
                      <Label htmlFor="disclaimer" className="text-sm leading-relaxed">
                        <strong>I understand and agree</strong> that this contract template is for informational
                        purposes only, does not constitute legal advice, and that I should consult with a qualified
                        attorney before using this contract for any legal purpose. I use this template at my own risk.
                      </Label>
                    </div>
                    {errors.disclaimer && (
                      <div className="flex items-center text-sm text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.disclaimer}
                      </div>
                    )}
                  </div>

                  <div className="h-4"></div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>

                    <Button
                      onClick={handleGenerateContract}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={!disclaimerAccepted || isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          Generate Contract
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Process Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 opacity-100">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-100 dark:bg-blue-900">
                    <span className="text-blue-600 text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Collect Information</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Fill out all required contract details</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 opacity-50">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100 dark:bg-gray-800">
                    <span className="text-gray-600 text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Preview Contract</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Review your generated template</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 opacity-50">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100 dark:bg-gray-800">
                    <span className="text-gray-600 text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Download</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Get your template in multiple formats</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Only Notice */}
            <Card className="rounded-xl border bg-card text-card-foreground shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-amber-50 dark:bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-7 w-7 text-amber-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Template Only</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Not legal advice - consult an attorney
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
