"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, FileText, Download, Clock, Shield, CheckCircle, Scale } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { AuthModal } from "@/components/auth-modal"

export default function DownloadContractPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const contractType = params.contractType as string
  const [contractData, setContractData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const response = await fetch("/api/auth/user", {
        credentials: "include",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (response.ok) {
        const userData = await response.json()
        if (userData && userData.user && userData.user.id) {
          setUserData(userData.user)
        } else {
          setUserData(null)
        }
      } else {
        setUserData(null)
      }
    } catch (error) {
      console.error("Error checking user:", error)
      setUserData(null)
    }
  }

  useEffect(() => {
    const loadContractData = () => {
      try {
        // Try to get contract data from localStorage
        const savedContract = localStorage.getItem(`contract_${contractType}`)
        if (savedContract) {
          const parsedContract = JSON.parse(savedContract)
          setContractData(parsedContract)
        } else {
          console.warn("No contract data found")
        }
      } catch (error) {
        console.error("Error loading contract data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadContractData()
  }, [contractType])

  const progress = 100 // Step 3 of 3

  const checkAuthAndProceed = async (action: () => void) => {
    setIsCheckingAuth(true)

    if (!userData || !userData.id) {
      setShowAuthModal(true)
      setIsCheckingAuth(false)
      return
    }

    // User is authenticated, save contract and proceed
    await saveContractToUser()
    setIsCheckingAuth(false)
    action()
  }

  const saveContractToUser = async () => {
    if (contractData && userData) {
      try {
        const response = await fetch("/api/contracts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: contractData.type,
            content: contractData.content,
            formData: contractData.form_data || contractData.formData,
          }),
        })

        if (response.ok) {
          toast({
            title: "Contract saved!",
            description: "Your contract has been saved to your account.",
          })
        }
      } catch (error) {
        console.error("Error saving contract:", error)
      }
    }
  }

  const handleAuthSuccess = async (mode: "login" | "register" | "forgot-password") => {
    setShowAuthModal(false)

    if (mode === "forgot-password") {
      toast({
        title: "Password reset email sent",
        description: "Please check your email for the reset link.",
      })
      return
    }

    await checkUser() // Refresh user state

    // Save contract to newly created user
    await saveContractToUser()

    if (mode === "register") {
      toast({
        title: "Welcome!",
        description: "Your account has been created and contract saved.",
      })
    } else if (mode === "login") {
      toast({
        title: "Welcome back!",
        description: "You've been signed in and your contract has been saved.",
      })
    }
  }

  const handleDownload = (format: string) => {
    if (!contractData) {
      toast({
        title: "No Contract Data",
        description: "Please generate a contract first.",
        variant: "destructive",
      })
      return
    }

    const performDownload = () => {
      // Create download content
      const content = contractData.content || "Contract content not available"
      let filename = `${contractType}-contract`
      let mimeType = "text/plain"

      switch (format) {
        case "pdf":
          filename += ".pdf"
          mimeType = "application/pdf"
          break
        case "docx":
          filename += ".docx"
          mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          break
        case "txt":
          filename += ".txt"
          mimeType = "text/plain"
          break
      }

      // Create and trigger download
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Download Started",
        description: `Your ${format.toUpperCase()} contract is being downloaded.`,
      })
    }

    checkAuthAndProceed(performDownload)
  }

  const handleComplete = () => {
    const proceedToDashboard = () => {
      // Clear the saved data and redirect to dashboard
      localStorage.removeItem(`contract_${contractType}`)
      localStorage.removeItem(`fastcontracts_${contractType}_formdata`)
      localStorage.removeItem(`fastcontracts_${contractType}_disclaimer`)
      router.push("/dashboard")
    }

    checkAuthAndProceed(proceedToDashboard)
  }

  const handleBack = () => {
    router.push(`/create/${contractType}/preview`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold mb-2">Loading Contract</h1>
            <p className="text-gray-600">Please wait while we prepare your download...</p>
          </div>
        </div>
      </div>
    )
  }

  const contractTitle =
    contractType === "nda"
      ? "Non-Disclosure Agreement (NDA)"
      : contractType.charAt(0).toUpperCase() + contractType.slice(1) + " Contract"

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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{contractTitle}</h1>
              <p className="text-gray-600 dark:text-gray-300">Protect confidential information</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Est. 5 min
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
            <span className="text-sm font-medium text-gray-900 dark:text-white">Step 3 of 3</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-8 gap-8">
          <div className="lg:col-span-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <FileText className="h-5 w-5 mr-2" />
                  Download Contract
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Download Your Contract</h3>

                    {/* Contract Ready Message */}
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-green-900 dark:text-green-100">Contract Ready!</h4>
                          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                            Your contract template has been generated and is ready for download. Choose your preferred
                            format above. Remember to have it reviewed by a qualified attorney before use.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Download Options */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {/* PDF Document */}
                      <div className="text-center bg-white dark:bg-black border border-gray-200 dark:border-slate-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-slate-400 transition-colors flex flex-col">
                        <div className="bg-red-100 dark:bg-red-900/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <FileText className="h-8 w-8 text-red-600 dark:text-red-400" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">PDF Document</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                          Professional format, ready to print and sign
                        </p>
                        <Button 
                          onClick={() => handleDownload('pdf')}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-auto"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>

                      {/* Word Document */}
                      <div className="text-center bg-white dark:bg-black border border-gray-200 dark:border-slate-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-slate-400 transition-colors flex flex-col">
                        <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Word Document</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                          Fully editable Microsoft Word format
                        </p>
                        <Button 
                          onClick={() => handleDownload('docx')}
                          variant="outline"
                          className="w-full mt-auto"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download DOCX
                        </Button>
                      </div>

                      {/* Plain Text */}
                      <div className="text-center bg-white dark:bg-black border border-gray-200 dark:border-slate-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-slate-400 transition-colors flex flex-col">
                        <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Plain Text</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                          Simple text format for any application
                        </p>
                        <Button 
                          onClick={() => handleDownload('txt')}
                          variant="outline"
                          className="w-full mt-auto"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download TXT
                        </Button>
                      </div>
                    </div>

                    {/* Legal Notice */}
                    <div className="bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-600 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <Scale className="h-5 w-5 text-amber-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-amber-900 dark:text-white">Legal Notice</h4>
                          <p className="text-sm text-amber-700 dark:text-slate-300 mt-1">
                            <strong>This is a template only.</strong> Not a substitute for legal advice. Consult an
                            attorney for legal matters.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                      <Button variant="outline" onClick={handleBack} className="px-8 bg-transparent">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>

                      <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700 text-white">
                        Complete
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Process Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 opacity-100">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-green-100 dark:bg-green-900">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Collect Information</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Fill out all required contract details</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 opacity-100">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-green-100 dark:bg-green-900">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Preview Contract</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Review your generated template</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 opacity-100">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-100 dark:bg-blue-900">
                    <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Download</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-300">Not legal advice - consult an attorney</p>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Auth Modal */}
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onSuccess={handleAuthSuccess} />
      </div>
    </div>
  )
}
