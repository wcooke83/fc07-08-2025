"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, FileText, Clock, Users, Shield, CheckCircle } from 'lucide-react'
import Link from "next/link"
import { createClient } from '@supabase/supabase-js'

interface ContractTemplate {
  id: string
  contract_type: string
  name: string | null
  description: string | null
  template_content: string
  form_fields: any
  is_active: boolean | null
  estimated_time: string | null
  created_at: string
  updated_at: string
}

export default function StartPage() {
  const [templates, setTemplates] = useState<ContractTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTemplates = async () => {
    console.log("🔍 [START] Starting fetchTemplates function...")
    setIsLoading(true)
    
    try {
      // Create Supabase client directly with environment variables
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      console.log("🔍 [START] Environment check:")
      console.log("- Supabase URL exists:", !!supabaseUrl)
      console.log("- Supabase Key exists:", !!supabaseAnonKey)
      console.log("- URL (first 20 chars):", supabaseUrl?.substring(0, 20))
      
      if (!supabaseUrl || !supabaseAnonKey) {
        console.error("❌ [START] Missing Supabase environment variables")
        setTemplates(getFallbackTemplates())
        return
      }
      
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false
        }
      })
      
      console.log("📡 [START] Supabase client created directly")
      
      // Test basic connection with a simple query
      console.log("🔍 [START] Testing basic connection...")
      const { data: healthCheck, error: healthError } = await supabase
        .from('contract_templates')
        .select('id')
        .limit(1)
      
      console.log("📊 [START] Health check result:")
      console.log("- Error:", healthError)
      console.log("- Data:", healthCheck)
      
      if (healthError) {
        console.error("❌ [START] Health check failed:", healthError)
        
        // Check if it's an RLS issue
        if (healthError.message?.includes('RLS') || healthError.message?.includes('policy')) {
          console.log("🔍 [START] Possible RLS issue detected, trying with service role...")
          // Note: In production, you'd use a server-side API route for this
        }
        
        setTemplates(getFallbackTemplates())
        return
      }
      
      // Try to get all records with detailed logging
      console.log("📊 [START] Querying all contract templates...")
      const { data, error, count } = await supabase
        .from('contract_templates')
        .select('*', { count: 'exact' })
        .order('contract_type')
      
      console.log("📊 [START] Detailed query result:")
      console.log("- Error:", error)
      console.log("- Count:", count)
      console.log("- Data array length:", data?.length || 0)
      console.log("- Raw data:", data)
      
      if (error) {
        console.error("❌ [START] Query error details:")
        console.error("- Code:", error.code)
        console.error("- Message:", error.message)
        console.error("- Details:", error.details)
        console.error("- Hint:", error.hint)
        setTemplates(getFallbackTemplates())
        return
      }
      
      if (!data || data.length === 0) {
        console.warn("⚠️ [START] No data returned from query")
        console.log("🔍 [START] Trying alternative query approaches...")
        
        // Try without ordering
        const { data: altData, error: altError } = await supabase
          .from('contract_templates')
          .select('*')
        
        console.log("📊 [START] Alternative query result:")
        console.log("- Error:", altError)
        console.log("- Data length:", altData?.length || 0)
        
        if (altData && altData.length > 0) {
          console.log("✅ [START] Found data with alternative query")
          setTemplates(altData)
          return
        }
        
        // Try with explicit schema
        const { data: schemaData, error: schemaError } = await supabase
          .from('public.contract_templates')
          .select('*')
        
        console.log("📊 [START] Schema-explicit query result:")
        console.log("- Error:", schemaError)
        console.log("- Data length:", schemaData?.length || 0)
        
        if (schemaData && schemaData.length > 0) {
          console.log("✅ [START] Found data with schema-explicit query")
          setTemplates(schemaData)
          return
        }
        
        setTemplates(getFallbackTemplates())
        return
      }
      
      // Filter active templates in JavaScript if needed
      const activeTemplates = data.filter(template => template.is_active !== false)
      console.log("✅ [START] Active templates found:", activeTemplates.length)
      console.log("📋 [START] Template details:")
      activeTemplates.forEach((template, index) => {
        console.log(`  ${index + 1}. ${template.contract_type} (${template.name || 'No name'})`)
      })
      
      setTemplates(activeTemplates.length > 0 ? activeTemplates : data)
      
    } catch (error) {
      console.error("💥 [START] Exception in fetchTemplates:")
      console.error("- Name:", error.name)
      console.error("- Message:", error.message)
      console.error("- Stack:", error.stack)
      setTemplates(getFallbackTemplates())
    } finally {
      console.log("🏁 [START] fetchTemplates completed")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTemplates()
  }, [])

  const getFallbackTemplates = (): ContractTemplate[] => {
    console.log("🔄 [START] Creating fallback templates")
    const fallbackTemplates: ContractTemplate[] = [
      {
        id: 'nda',
        contract_type: 'nda',
        name: 'Non-Disclosure Agreement',
        description: 'Protect confidential information between parties',
        template_content: 'NDA Template Content',
        form_fields: [],
        is_active: true,
        estimated_time: '5-10 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'employment-contract',
        contract_type: 'employment-contract',
        name: 'Employment Contract',
        description: 'Define terms of employment relationship',
        template_content: 'Employment Contract Template Content',
        form_fields: [],
        is_active: true,
        estimated_time: '10-15 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'service-agreement',
        contract_type: 'service-agreement',
        name: 'Service Agreement',
        description: 'Outline terms for service provision',
        template_content: 'Service Agreement Template Content',
        form_fields: [],
        is_active: true,
        estimated_time: '8-12 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'lease-agreement',
        contract_type: 'lease-agreement',
        name: 'Lease Agreement',
        description: 'Establish rental terms and conditions',
        template_content: 'Lease Agreement Template Content',
        form_fields: [],
        is_active: true,
        estimated_time: '12-15 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'partnership-agreement',
        contract_type: 'partnership-agreement',
        name: 'Partnership Agreement',
        description: 'Define business partnership terms',
        template_content: 'Partnership Agreement Template Content',
        form_fields: [],
        is_active: true,
        estimated_time: '15-20 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'sales-agreement',
        contract_type: 'sales-agreement',
        name: 'Sales Agreement',
        description: 'Document terms of sale transactions',
        template_content: 'Sales Agreement Template Content',
        form_fields: [],
        is_active: true,
        estimated_time: '8-12 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'contractor-agreement',
        contract_type: 'contractor-agreement',
        name: 'Contractor Agreement',
        description: 'Define independent contractor relationships',
        template_content: 'Contractor Agreement Template Content',
        form_fields: [],
        is_active: true,
        estimated_time: '10-15 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
    console.log("🔄 [START] Created", fallbackTemplates.length, "fallback templates")
    return fallbackTemplates
  }

  const formatContractName = (template: ContractTemplate) => {
    if (template.name) {
      return template.name
    }
    return template.contract_type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const getContractDescription = (template: ContractTemplate) => {
    if (template.description) {
      return template.description
    }
    
    const fallbackDescriptions: Record<string, string> = {
      'nda': 'Protect confidential information between parties',
      'employment-contract': 'Define terms of employment relationship',
      'service-agreement': 'Outline terms for service provision',
      'lease-agreement': 'Establish rental terms and conditions',
      'partnership-agreement': 'Define business partnership terms',
      'sales-agreement': 'Document terms of sale transactions',
      'contractor-agreement': 'Define independent contractor relationships'
    }
    return fallbackDescriptions[template.contract_type] || `Professional ${template.contract_type.replace('-', ' ')} template`
  }

  const getEstimatedTime = (template: ContractTemplate) => {
    return template.estimated_time || '5-10 min'
  }

  const getContractIcon = (contractType: string) => {
    switch (contractType) {
      case 'nda':
        return Shield
      case 'employment-contract':
        return Users
      case 'service-agreement':
        return CheckCircle
      case 'lease-agreement':
        return FileText
      case 'partnership-agreement':
        return Users
      case 'sales-agreement':
        return CheckCircle
      case 'contractor-agreement':
        return Users
      default:
        return FileText
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold mb-2">Loading Contract Templates</h1>
            <p className="text-gray-600">Please wait while we load available contracts...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Contract Type
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select from our professionally crafted contract templates. Each template is designed to be legally sound and easy to customize.
          </p>
          {/* Debug Information */}
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Debug Information</h3>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <div>Templates loaded: {templates.length}</div>
              <div>Loading state: {isLoading ? 'true' : 'false'}</div>
              <div className="text-left">
                <div>Templates data:</div>
                <pre className="mt-1 text-xs bg-blue-100 dark:bg-blue-800 p-2 rounded overflow-auto max-h-32">
                  {JSON.stringify(templates.map(t => ({ 
                    id: t.id, 
                    type: t.contract_type, 
                    name: t.name,
                    active: t.is_active,
                    estimated_time: t.estimated_time
                  })), null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {templates.map((template) => {
            const IconComponent = getContractIcon(template.contract_type)
            return (
              <Card key={template.id} className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200 dark:hover:border-blue-800">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {getEstimatedTime(template)}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {formatContractName(template)}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {getContractDescription(template)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Professional template
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Shield className="h-4 w-4 mr-2 text-blue-500" />
                      Legal disclaimer included
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FileText className="h-4 w-4 mr-2 text-purple-500" />
                      Multiple download formats
                    </div>
                  </div>
                  <Link href={`/create/${template.contract_type}`}>
                    <Button className="w-full mt-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      Create Contract
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* No Templates Message */}
        {templates.length === 0 && (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Contract Templates Available
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're currently setting up contract templates. Please check back soon.
            </p>
          </div>
        )}

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Why Choose FastContracts?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Fast & Easy</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Generate professional contracts in minutes, not hours
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Legally Sound</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Templates crafted with legal best practices in mind
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Multiple Formats</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Download in PDF, Word, and other popular formats
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-1">Important Legal Notice</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                These are template documents for informational purposes only. They do not constitute legal advice. 
                Always consult with a qualified attorney before using any contract for legal purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
