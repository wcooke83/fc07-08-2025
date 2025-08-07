"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, FileText, Clock, Shield, CheckCircle, Scale, Eye } from 'lucide-react'
import { createBrowserClient } from "@/lib/supabase/createBrowserClient"

export default function PreviewPage() {
  const params = useParams()
  const router = useRouter()
  const contractType = params.contractType as string

  const [formData, setFormData] = useState<Record<string, string>>({})
  const [contractContent, setContractContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const supabase = createBrowserClient()
        
        // Load form data from localStorage
        const savedData = localStorage.getItem(`fastcontracts_${contractType}_formdata`)
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          setFormData(parsedData)

          // Get contract template from database - handle multiple or no rows
          const { data: templates, error: templateError } = await supabase
            .from('contract_templates')
            .select('template_content, form_fields')
            .eq('contract_type', contractType)

          if (templateError) {
            console.error('Error fetching template:', templateError)
            // Fallback to hardcoded template if database fetch fails
            const fallbackContract = createFallbackNDAContract(parsedData)
            setContractContent(fallbackContract)
          } else if (templates && templates.length > 0) {
            // Use the first template if multiple exist
            const template = templates[0]
            // Replace placeholders in template with form data
            let content = template.template_content
            
            // Replace various placeholder formats
            Object.entries(parsedData).forEach(([key, value]) => {
              const placeholders = [
                `{{${key}}}`,
                `{${key}}`,
                `[${key.toUpperCase()}]`,
                `{{${key.toUpperCase()}}}`,
                `{${key.toUpperCase()}}`
              ]
              
              placeholders.forEach(placeholder => {
                content = content.replace(new RegExp(placeholder, 'g'), value || `[${key.toUpperCase()}]`)
              })
            })
            
            setContractContent(content)
          } else {
            // No templates found, use fallback
            const fallbackContract = createFallbackNDAContract(parsedData)
            setContractContent(fallbackContract)
          }
        }
      } catch (error) {
        console.error("Error loading data:", error)
        // Fallback to hardcoded template on any error
        const savedData = localStorage.getItem(`fastcontracts_${contractType}_formdata`)
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          const fallbackContract = createFallbackNDAContract(parsedData)
          setContractContent(fallbackContract)
        }
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [contractType])

  const createFallbackNDAContract = (parsedData: Record<string, string>) => {
    return `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${parsedData.effective_date || parsedData.date || '[DATE]'} between ${parsedData.disclosing_party || parsedData.disclosingParty || '[DISCLOSING PARTY]'} ("Disclosing Party") and ${parsedData.receiving_party || parsedData.receivingParty || '[RECEIVING PARTY]'} ("Receiving Party").

RECITALS

WHEREAS, the Disclosing Party possesses certain confidential and proprietary information that it wishes to disclose to the Receiving Party for the purpose of ${parsedData.purpose || '[PURPOSE]'};

WHEREAS, the Receiving Party agrees to maintain the confidentiality of such information;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION

For purposes of this Agreement, "Confidential Information" means any and all information disclosed by the Disclosing Party to the Receiving Party, whether orally, in writing, or in any other form, including but not limited to:

a) Technical data, trade secrets, know-how, research, product plans, products, services, customers, customer lists, markets, software, developments, inventions, processes, formulas, technology, designs, drawings, engineering, hardware configuration information, marketing, finances, or other business information.

b) Any other information that would reasonably be considered confidential under the circumstances.

2. OBLIGATIONS OF RECEIVING PARTY

The Receiving Party agrees to:

a) Hold all Confidential Information in strict confidence;
b) Not disclose Confidential Information to any third parties;
c) Use Confidential Information solely for the purpose stated above;
d) Take reasonable precautions to protect the confidentiality of the information.

3. TERM

This Agreement shall remain in effect for ${parsedData.duration || '[DURATION]'} years from the date of execution.

4. RETURN OF MATERIALS

Upon termination of this Agreement or upon request by the Disclosing Party, the Receiving Party shall promptly return all documents, materials, and other tangible manifestations of Confidential Information.

5. GOVERNING LAW

This Agreement shall be governed by the laws of ${parsedData.governing_law || parsedData.governingLaw || '[GOVERNING LAW]'}.

6. ENTIRE AGREEMENT

This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements relating to the subject matter hereof.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

DISCLOSING PARTY:                    RECEIVING PARTY:

_________________________           _________________________
${parsedData.disclosing_party || parsedData.disclosingParty || '[DISCLOSING PARTY]'}                    ${parsedData.receiving_party || parsedData.receivingParty || '[RECEIVING PARTY]'}

Date: _______________               Date: _______________`
  }

  const handleProceedToDownload = () => {
    router.push(`/create/${contractType}/download`)
  }

  const handleBack = () => {
    router.push(`/create/${contractType}`)
  }

  const progress = 67

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading contract preview...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Non-Disclosure Agreement (NDA)
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Protect confidential information</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Est. 5 min
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Template only
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Step 2 of 3</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{progress}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-8 gap-8">
          <div className="lg:col-span-6">
            <Card className="rounded-xl border bg-card text-card-foreground shadow-lg">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-gray-900 dark:text-white">
                    <FileText className="h-5 w-5 mr-2" />
                    Preview Contract
                  </CardTitle>
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Generated Successfully</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Contract Preview</p>
              </CardHeader>
              <CardContent className="p-6">
                {/* Review Notice */}
                <div className="mb-6 p-4 bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-800 dark:text-white mb-1">Review Your Contract</h3>
                      <p className="text-sm text-blue-700 dark:text-gray-300">
                        Please review the generated contract carefully. Remember to consult with a qualified attorney before using this contract for legal purposes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contract Content - Doubled height from max-h-96 to max-h-[48rem] */}
                <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-6 text-sm leading-relaxed max-h-[48rem] overflow-y-auto">
                  {contractContent ? (
                    <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-serif">
                      {contractContent}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Loading contract content...</p>
                    </div>
                  )}
                </div>

                {/* Legal Notice */}
                <div className="mt-6 p-4 bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Scale className="h-5 w-5 text-amber-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-amber-800 dark:text-white mb-1">Legal Notice</h3>
                      <p className="text-sm text-amber-700 dark:text-gray-300">
                        This is a <strong>template only</strong>. Not a substitute for legal advice. Consult an attorney for legal matters.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleProceedToDownload} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Proceed to Download
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="rounded-xl border bg-card text-card-foreground shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Process Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-sm font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Collect Information</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Fill out all required contract details</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Preview Contract</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Review your generated template</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 opacity-50">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-600 dark:text-gray-400">Download</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Get your template in multiple formats</p>
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
