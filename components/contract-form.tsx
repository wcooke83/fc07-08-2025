"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { generateContractAction } from "@/app/create/[contractType]/actions"
import { Loader2, FileText, AlertTriangle, Scale } from "lucide-react"

interface ContractField {
  id: string
  label: string
  type: "text" | "textarea" | "date" | "number" | "email" | "select"
  required?: boolean
  placeholder?: string
  description?: string
  options?: string[]
}

interface ContractTemplate {
  id: string
  name: string
  slug: string
  content: string
  description: string
  form_fields: ContractField[]
}

interface ContractFormProps {
  template: ContractTemplate
  initialData?: Record<string, string>
  contractId?: string
}

export function ContractForm({ template, initialData, contractId }: ContractFormProps) {
  console.log("🔍 ContractForm received template:", {
    id: template?.id,
    name: template?.name,
    hasFormFields: !!template?.form_fields,
    formFieldsType: typeof template?.form_fields,
    formFieldsLength: template?.form_fields?.length,
    formFields: template?.form_fields,
  })

  const router = useRouter()
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState<Record<string, string>>(initialData || {})
  const [agreement, setAgreement] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Ensure form_fields is an array
  const formFields = Array.isArray(template?.form_fields) ? template.form_fields : []

  console.log("📝 Form fields to render:", formFields.length, formFields)

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }))

    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    formFields.forEach((field) => {
      if (field.required && (!formData[field.id] || formData[field.id].trim() === "")) {
        newErrors[field.id] = `${field.label} is required`
      }
    })

    if (!agreement) {
      newErrors.agreement = "You must agree to the terms to continue"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("🚀 Form submission started")
    console.log("📝 Form data:", formData)
    console.log("✅ Agreement accepted:", agreement)

    if (!validateForm()) {
      console.log("❌ Form validation failed")
      return
    }

    setIsGenerating(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append("contractType", template.contract_type || template.slug)

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
        console.log(`📝 Adding to FormData: ${key} = ${value}`)
      })

      console.log("🔄 Calling generateContractAction...")
      const result = await generateContractAction(formDataObj, null)

      console.log("📊 Action result:", result)

      if (result.success) {
        toast({
          title: "Contract Generated",
          description: "Redirecting to preview...",
        })
        console.log("✅ Success! Redirecting to preview...")
        router.push(`/create/${template.contract_type || template.slug}/preview`)
      } else {
        console.error("❌ Generation failed:", result.error)
        toast({
          title: "Generation Failed",
          description: result.error || "An unknown error occurred.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("❌ Error generating contract:", error)
      toast({
        title: "Error",
        description: "Failed to generate contract. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const renderField = (field: ContractField) => {
    const value = formData[field.id] || ""
    const error = errors[field.id]

    console.log(`🔍 Rendering field: ${field.id} (${field.type})`)

    return (
      <div key={field.id} className="space-y-2">
        <Label htmlFor={field.id}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>

        {field.type === "textarea" ? (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            className="min-h-[100px]"
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        ) : field.type === "select" ? (
          <Select value={value} onValueChange={(val) => handleInputChange(field.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id={field.id}
            type={
              field.type === "number"
                ? "number"
                : field.type === "date"
                  ? "date"
                  : field.type === "email"
                    ? "email"
                    : "text"
            }
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        )}

        {field.description && <p className="text-sm text-muted-foreground">{field.description}</p>}

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }

  if (!template) {
    console.error("❌ No template provided to ContractForm")
    return (
      <div className="text-center py-8">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">No template data available</p>
      </div>
    )
  }

  if (formFields.length === 0) {
    console.warn("⚠️ No form fields available")
    return (
      <div className="text-center py-8">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <p className="text-yellow-600">No form fields configured for this contract type</p>
        <p className="text-sm text-gray-500 mt-2">Template: {template.name}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contract Information
          </CardTitle>
          <CardDescription>Fill out the form below to generate your contract</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{formFields.map(renderField)}</div>

            {/* Legal Disclaimer */}
            <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <Scale className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                <div className="space-y-2">
                  <div className="font-medium">Important Legal Disclaimer</div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Templates Only:</span> The contracts generated by this website are
                        templates for informational and educational purposes only.
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Not Legal Advice:</span> This service does not provide legal
                        advice, legal representation, or legal services of any kind.
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Scale className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Consult an Attorney:</span> You should consult with a qualified
                        attorney in your jurisdiction before using any contract for legal purposes.
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3 mt-3">
                    <div className="font-medium text-yellow-800 dark:text-yellow-200">No Liability:</div>
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">
                      FastContracts and its operators disclaim all liability for any legal issues, disputes, or damages
                      that may arise from the use of these contract templates. Use at your own risk.
                    </div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            {/* Agreement Checkbox */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreement"
                checked={agreement}
                onCheckedChange={(checked) => {
                  setAgreement(checked as boolean)
                  if (errors.agreement) {
                    setErrors((prev) => ({ ...prev, agreement: "" }))
                  }
                }}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="agreement" className="text-sm cursor-pointer">
                  I understand and agree that this contract template is for informational purposes only, does not
                  constitute legal advice, and that I should consult with a qualified attorney before using this
                  contract for any legal purpose. I use this template at my own risk.
                </Label>
                {errors.agreement && <p className="text-sm text-red-500">{errors.agreement}</p>}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Back
              </Button>

              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Contract...
                  </>
                ) : (
                  <>
                    Generate Contract
                    <FileText className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
