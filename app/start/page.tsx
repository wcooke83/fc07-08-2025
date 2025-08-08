"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowRight, FileText, Clock, Users, Shield, CheckCircle, Search, Filter, Star, Zap, Award, TrendingUp, Sparkles, Grid3X3, List, Eye, BookOpen, Building2, Scale, Home, Handshake, CreditCard, UserCheck, X, SortAsc } from 'lucide-react'
import Link from "next/link"
import { createBrowserClient } from '@/lib/supabase/createBrowserClient'

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
  popularity?: number
  difficulty?: 'Easy' | 'Medium' | 'Advanced'
  tags?: string[]
}

export default function EnhancedContractTemplates() {
  const [templates, setTemplates] = useState<ContractTemplate[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<ContractTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [previewModal, setPreviewModal] = useState<{ isOpen: boolean; template: ContractTemplate | null }>({
    isOpen: false,
    template: null
  })

  const supabase = createBrowserClient()

  useEffect(() => {
    fetchTemplates()
  }, [])

  useEffect(() => {
    let filtered = templates

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(template => 
        formatContractName(template).toLowerCase().includes(searchQuery.toLowerCase()) ||
        getContractDescription(template).toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.contract_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(template => getContractCategory(template.contract_type) === selectedCategory)
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(template => template.difficulty === selectedDifficulty)
    }

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return formatContractName(a).localeCompare(formatContractName(b))
        case "time":
          return getEstimatedTimeMinutes(a) - getEstimatedTimeMinutes(b)
        case "popular":
          return (b.popularity || 0) - (a.popularity || 0)
        case "recent":
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        default:
          return 0
      }
    })

    setFilteredTemplates(filtered)

    // Update active filters
    const filters = []
    if (selectedCategory !== "all") filters.push(getCategoryLabel(selectedCategory))
    if (selectedDifficulty !== "all") filters.push(selectedDifficulty)
    if (searchQuery) filters.push(`"${searchQuery}"`)
    setActiveFilters(filters)
  }, [templates, searchQuery, selectedCategory, selectedDifficulty, sortBy])

  const fetchTemplates = async () => {
    console.log("🔍 [START] Starting fetchTemplates function...")
    setIsLoading(true)
    
    try {
      console.log("📡 [START] Attempting to fetch contract templates...")
      const { data, error, count } = await supabase
        .from('contract_templates')
        .select('*', { count: 'exact' })
        .order('contract_type')
      
      console.log("📊 [START] Query result:")
      console.log("- Error:", error)
      console.log("- Count:", count)
      console.log("- Data length:", data?.length || 0)
      
      if (error) {
        console.error("❌ [START] Database error:", error)
        setTemplates(getFallbackTemplates())
        return
      }
      
      if (!data || data.length === 0) {
        console.warn("⚠️ [START] No data returned from database")
        setTemplates(getFallbackTemplates())
        return
      }
      
      // Filter active templates
      const activeTemplates = data.filter(template => template.is_active !== false)
      console.log("✅ [START] Successfully loaded templates:")
      console.log(`- Total templates: ${data.length}`)
      console.log(`- Active templates: ${activeTemplates.length}`)
      
      setTemplates(activeTemplates.length > 0 ? activeTemplates : data)
      
    } catch (error: any) {
      console.error("💥 [START] Exception in fetchTemplates:")
      console.error("- Name:", error.name)
      console.error("- Message:", error.message)
      
      setTemplates(getFallbackTemplates())
    } finally {
      console.log("🏁 [START] fetchTemplates completed")
      setIsLoading(false)
    }
  }

  const openPreviewModal = (template: ContractTemplate) => {
    setPreviewModal({ isOpen: true, template })
  }

  const closePreviewModal = () => {
    setPreviewModal({ isOpen: false, template: null })
  }

  const getFallbackTemplates = (): ContractTemplate[] => {
    const fallbackTemplates: ContractTemplate[] = [
      {
        id: 'nda',
        contract_type: 'nda',
        name: 'Non-Disclosure Agreement',
        description: 'Protect confidential information between parties with comprehensive confidentiality terms and legal safeguards',
        template_content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on [effective_date] between [disclosing_party] ("Disclosing Party") and [receiving_party] ("Receiving Party").

PURPOSE: The purpose of this Agreement is [purpose].

CONFIDENTIAL INFORMATION: For purposes of this Agreement, "Confidential Information" shall include all information or material that has or could have commercial value or other utility in the business in which Disclosing Party is engaged.

OBLIGATIONS: Receiving Party agrees to:
1. Hold and maintain the Confidential Information in strict confidence
2. Not disclose the Confidential Information to any third parties
3. Use the Confidential Information solely for the purpose stated above

TERM: This Agreement shall remain in effect for [duration] years from the date first written above.

GOVERNING LAW: This Agreement shall be governed by and construed in accordance with the laws of [State/Country].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

_________________________          _________________________
[disclosing_party]                [receiving_party]
Disclosing Party                     Receiving Party`,
        form_fields: [],
        is_active: true,
        estimated_time: '5-10 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        popularity: 95,
        difficulty: 'Easy',
        tags: ['Confidentiality', 'Business', 'Legal Protection']
      },
      {
        id: 'employment-contract',
        contract_type: 'employment-contract',
        name: 'Employment Contract',
        description: 'Define comprehensive terms of employment relationship including duties, compensation, and benefits',
        template_content: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into on [start_date] between [company_name] ("Company") and [employee_name] ("Employee").

POSITION: Employee shall serve as [job_title] and shall perform duties as assigned by the Company.

COMPENSATION: Employee shall receive a salary of $[annual_salary] per year, payable in accordance with Company's standard payroll practices.

BENEFITS: Employee shall be entitled to participate in Company benefit programs including:
- Health insurance
- Paid time off
- Retirement plans (if applicable)

TERM: This agreement shall commence on [start_date] and continue until terminated by either party.

TERMINATION: Either party may terminate this agreement with [notice_period] days written notice.

CONFIDENTIALITY: Employee agrees to maintain confidentiality of all proprietary Company information.

GOVERNING LAW: This Agreement shall be governed by the laws of [state].

_________________________          _________________________
[company_name]                    [employee_name]
Company Representative              Employee`,
        form_fields: [],
        is_active: true,
        estimated_time: '10-15 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        popularity: 88,
        difficulty: 'Medium',
        tags: ['HR', 'Employment', 'Compensation']
      },
      {
        id: 'service-agreement',
        contract_type: 'service-agreement',
        name: 'Service Agreement',
        description: 'Outline detailed terms for professional service provision, deliverables, and payment schedules',
        template_content: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into on [effective_date] between [service_provider] ("Provider") and [client_name] ("Client").

SERVICES: Provider agrees to provide the following services: [service_description]

DELIVERABLES: Provider shall deliver [deliverables] by [completion_date].

COMPENSATION: Client agrees to pay Provider $[total_amount] for the services described herein.

PAYMENT TERMS: Payment shall be made [payment_terms].

INTELLECTUAL PROPERTY: All work product created under this Agreement shall belong to [ip_owner].

TERMINATION: Either party may terminate this Agreement with [notice_period] days written notice.

GOVERNING LAW: This Agreement shall be governed by the laws of [governing_state].

_________________________          _________________________
[service_provider]                [client_name]
Service Provider                    Client`,
        form_fields: [],
        is_active: true,
        estimated_time: '8-12 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        popularity: 92,
        difficulty: 'Easy',
        tags: ['Services', 'Business', 'Freelance']
      },
      {
        id: 'lease-agreement',
        contract_type: 'lease-agreement',
        name: 'Property Lease Agreement',
        description: 'Establish comprehensive rental terms and conditions for residential or commercial property leasing',
        template_content: `LEASE AGREEMENT

This Lease Agreement ("Agreement") is entered into on [lease_start_date] between [landlord_name] ("Landlord") and [tenant_name] ("Tenant").

PROPERTY: Landlord hereby leases to Tenant the property located at [property_address].

TERM: The lease term shall be for [lease_duration] beginning [lease_start_date] and ending [lease_end_date].

RENT: Tenant agrees to pay monthly rent of $[monthly_rent] due on the [rent_due_date] of each month.

SECURITY DEPOSIT: Tenant shall pay a security deposit of $[security_deposit] upon signing this Agreement.

USE OF PROPERTY: The property shall be used solely for [property_use] purposes.

MAINTENANCE: [maintenance_responsibility] shall be responsible for property maintenance and repairs.

TERMINATION: This lease may be terminated [termination_terms].

GOVERNING LAW: This Agreement shall be governed by the laws of [state].

_________________________          _________________________
[landlord_name]                   [tenant_name]
Landlord                           Tenant`,
        form_fields: [],
        is_active: true,
        estimated_time: '12-18 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        popularity: 75,
        difficulty: 'Medium',
        tags: ['Property', 'Real Estate', 'Rental']
      },
      {
        id: 'partnership-agreement',
        contract_type: 'partnership-agreement',
        name: 'Business Partnership Agreement',
        description: 'Define business partnership terms including profit sharing, responsibilities, and decision-making processes',
        template_content: `PARTNERSHIP AGREEMENT

This Partnership Agreement ("Agreement") is entered into on [effective_date] between [partner1_name] and [partner2_name] ("Partners").

BUSINESS PURPOSE: The partnership shall engage in [business_purpose].

CAPITAL CONTRIBUTIONS: 
- [partner1_name] shall contribute $[partner1_contribution]
- [partner2_name] shall contribute $[partner2_contribution]

PROFIT/LOSS SHARING: Profits and losses shall be shared [profit_sharing_ratio].

MANAGEMENT: [management_structure] shall have authority for day-to-day operations.

DECISION MAKING: Major decisions require [decision_requirement].

WITHDRAWAL: A partner may withdraw from the partnership [withdrawal_terms].

DISSOLUTION: The partnership may be dissolved [dissolution_terms].

GOVERNING LAW: This Agreement shall be governed by the laws of [state].

_________________________          _________________________
[partner1_name]                   [partner2_name]
Partner 1                          Partner 2`,
        form_fields: [],
        is_active: true,
        estimated_time: '20-25 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        popularity: 68,
        difficulty: 'Advanced',
        tags: ['Partnership', 'Business', 'Equity']
      },
      {
        id: 'sales-agreement',
        contract_type: 'sales-agreement',
        name: 'Sales Purchase Agreement',
        description: 'Document comprehensive terms of sale transactions, warranties, and payment conditions',
        template_content: `SALES AGREEMENT

This Sales Agreement ("Agreement") is entered into on [sale_date] between [seller_name] ("Seller") and [buyer_name] ("Buyer").

ITEM(S) SOLD: Seller agrees to sell and Buyer agrees to purchase [item_description].

PURCHASE PRICE: The total purchase price is $[purchase_price].

PAYMENT TERMS: Payment shall be made [payment_terms].

DELIVERY: Seller shall deliver the item(s) [delivery_terms].

WARRANTIES: Seller warrants that [warranty_terms].

RISK OF LOSS: Risk of loss shall transfer to Buyer [risk_transfer].

RETURNS: [return_policy].

GOVERNING LAW: This Agreement shall be governed by the laws of [state].

_________________________          _________________________
[seller_name]                     [buyer_name]
Seller                             Buyer`,
        form_fields: [],
        is_active: true,
        estimated_time: '8-12 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        popularity: 82,
        difficulty: 'Easy',
        tags: ['Sales', 'Commerce', 'Transaction']
      },
      {
        id: 'contractor-agreement',
        contract_type: 'contractor-agreement',
        name: 'Independent Contractor Agreement',
        description: 'Define independent contractor relationships with clear scope, deliverables, and payment terms',
        template_content: `INDEPENDENT CONTRACTOR AGREEMENT

This Independent Contractor Agreement ("Agreement") is entered into on [effective_date] between [company_name] ("Company") and [contractor_name] ("Contractor").

SERVICES: Contractor shall provide [service_description].

INDEPENDENT CONTRACTOR STATUS: Contractor is an independent contractor and not an employee of Company.

COMPENSATION: Company shall pay Contractor [compensation_amount] [payment_schedule].

DELIVERABLES: Contractor shall deliver [deliverables] by [deadline].

INTELLECTUAL PROPERTY: [ip_ownership] shall own all work product created under this Agreement.

CONFIDENTIALITY: Contractor agrees to maintain confidentiality of Company's proprietary information.

TERMINATION: Either party may terminate this Agreement [termination_terms].

GOVERNING LAW: This Agreement shall be governed by the laws of [state].

_________________________          _________________________
[company_name]                    [contractor_name]
Company                            Contractor`,
        form_fields: [],
        is_active: true,
        estimated_time: '10-15 min',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        popularity: 85,
        difficulty: 'Medium',
        tags: ['Contractor', 'Freelance', 'Services']
      }
    ]
    return fallbackTemplates
  }

  const formatContractName = (template: ContractTemplate) => {
    if (template.name) return template.name
    return template.contract_type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const getContractDescription = (template: ContractTemplate) => {
    return template.description || `Professional ${template.contract_type.replace('-', ' ')} template`
  }

  const getEstimatedTime = (template: ContractTemplate) => {
    return template.estimated_time || '5-10 min'
  }

  const getEstimatedTimeMinutes = (template: ContractTemplate) => {
    const time = getEstimatedTime(template)
    const match = time.match(/(\d+)/)
    return match ? parseInt(match[1]) : 10
  }

  const getContractCategory = (contractType: string) => {
    const categories: Record<string, string> = {
      'nda': 'legal',
      'employment-contract': 'employment',
      'service-agreement': 'business',
      'lease-agreement': 'property',
      'partnership-agreement': 'business',
      'sales-agreement': 'business',
      'contractor-agreement': 'employment'
    }
    return categories[contractType] || 'legal'
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'legal': 'Legal',
      'business': 'Business',
      'employment': 'Employment',
      'property': 'Property'
    }
    return labels[category] || category
  }

  const getContractIcon = (contractType: string) => {
    const icons: Record<string, any> = {
      'nda': Shield,
      'employment-contract': Users,
      'service-agreement': Handshake,
      'lease-agreement': Building2,
      'partnership-agreement': UserCheck,
      'sales-agreement': CreditCard,
      'contractor-agreement': BookOpen,
    }
    return icons[contractType] || FileText
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
      case 'Medium': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400'
      case 'Advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getPopularityBadge = (popularity: number) => {
    if (popularity >= 90) return { label: 'Most Popular', color: 'bg-gradient-to-r from-yellow-400 to-orange-500' }
    if (popularity >= 80) return { label: 'Popular', color: 'bg-gradient-to-r from-blue-500 to-purple-500' }
    return null
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedDifficulty("all")
  }

  const removeFilter = (filter: string) => {
    if (filter.startsWith('"') && filter.endsWith('"')) {
      setSearchQuery("")
    } else if (['Easy', 'Medium', 'Advanced'].includes(filter)) {
      setSelectedDifficulty("all")
    } else {
      setSelectedCategory("all")
    }
  }

  const categories = [
    { value: "all", label: "All Categories", icon: Grid3X3 },
    { value: "legal", label: "Legal", icon: Scale },
    { value: "business", label: "Business", icon: Building2 },
    { value: "employment", label: "Employment", icon: Users },
    { value: "property", label: "Property", icon: Home }
  ]

  const difficulties = [
    { value: "all", label: "All Levels" },
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Advanced", label: "Advanced" }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <div className="relative mx-auto mb-8 w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-900"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-spin"></div>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Loading Templates</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">Preparing your contract templates...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8 shadow-lg">
              <Sparkles className="h-5 w-5 mr-2" />
              AI-Powered Legal Templates
            </div>
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Professional
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"> Contract Templates</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Create legally sound contracts in minutes with our expertly crafted templates. 
              Trusted by thousands of businesses worldwide for their legal document needs.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Expert Reviewed
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-blue-500 mr-2" />
                Legally Compliant
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-purple-500 mr-2" />
                Regularly Updated
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 mb-12">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <Input
              placeholder="Search by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-0 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 transition-colors rounded-2xl shadow-inner"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12 border-0 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => {
                    const IconComponent = category.icon
                    return (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center">
                          <IconComponent className="h-4 w-4 mr-2" />
                          {category.label}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="h-12 border-0 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <Award className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 border-0 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="time">Quickest First</SelectItem>
                  <SelectItem value="recent">Recently Updated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border-0 bg-gray-50 dark:bg-gray-700 rounded-xl p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="flex-1 h-10"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="flex-1 h-10"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {filter}
                    <button
                      onClick={() => removeFilter(filter)}
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-7 px-2">
                  Clear all
                </Button>
              </div>
            </div>
          )}

          {/* Results Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredTemplates.length}</span> of {templates.length} templates
              {searchQuery && (
                <span className="ml-2">
                  for "<span className="font-medium text-blue-600 dark:text-blue-400">{searchQuery}</span>"
                </span>
              )}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Avg. {filteredTemplates.length > 0 ? Math.round(filteredTemplates.reduce((acc, t) => acc + getEstimatedTimeMinutes(t), 0) / filteredTemplates.length) : 0} min setup
            </span>
          </div>
        </div>

        {/* Contract Templates Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          : "space-y-6 mb-16"
        }>
          {filteredTemplates.map((template) => {
            const IconComponent = getContractIcon(template.contract_type)
            const popularityBadge = getPopularityBadge(template.popularity || 0)
            
            if (viewMode === 'list') {
              return (
                <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {formatContractName(template)}
                            </h3>
                            {popularityBadge && (
                              <Badge className={`${popularityBadge.color} text-white border-0`}>
                                <Star className="h-3 w-3 mr-1" />
                                {popularityBadge.label}
                              </Badge>
                            )}
                            <Badge className={`text-xs ${getDifficultyColor(template.difficulty || 'Easy')}`}>
                              {template.difficulty}
                            </Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">
                            {getContractDescription(template)}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {getEstimatedTime(template)}
                            </span>
                            <span className="flex items-center">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              {template.popularity}% popularity
                            </span>
                            {template.tags && (
                              <div className="flex gap-1">
                                {template.tags.slice(0, 2).map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="px-3"
                          onClick={() => openPreviewModal(template)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Link href={`/create/${template.contract_type}`}>
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6">
                            Create Contract
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            }
            
            return (
              <Card key={template.id} className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                <div className="relative">
                  {popularityBadge && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className={`${popularityBadge.color} text-white border-0 shadow-lg`}>
                        <Star className="h-3 w-3 mr-1" />
                        {popularityBadge.label}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <Badge className={`text-xs mb-2 ${getDifficultyColor(template.difficulty || 'Easy')}`}>
                          {template.difficulty}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {getEstimatedTime(template)}
                        </div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight mb-3">
                      {formatContractName(template)}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-4">
                      {getContractDescription(template)}
                    </CardDescription>

                    {/* Tags */}
                    {template.tags && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {template.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                          {template.popularity}% popular
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Users className="h-4 w-4 mr-1" />
                          Professional grade
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        onClick={() => openPreviewModal(template)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Link href={`/create/${template.contract_type}`}>
                        <Button className="flex-[2] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg font-medium">
                          Create Contract
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Enhanced No Results Message */}
        {filteredTemplates.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <div className="relative mx-auto mb-8 w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full"></div>
              <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No Templates Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              We couldn't find any templates matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Clear All Filters
              </Button>
              <Button variant="outline">
                Browse All Templates
              </Button>
            </div>
          </div>
        )}

        {/* Enhanced Features Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 dark:border-gray-700/50 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose FastContracts?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines legal expertise with modern technology to deliver the most comprehensive contract creation experience available.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Generate professional contracts in minutes with our streamlined process and intelligent form filling.
              </p>
            </div>
            <div className="text-center group">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Legally Sound</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Templates crafted by legal experts and regularly updated to ensure compliance with current laws.
              </p>
            </div>
            <div className="text-center group">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Professional Quality</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Download in multiple formats with perfect formatting and professional presentation every time.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-3xl p-8 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2 text-lg">Important Legal Notice</h3>
              <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                These are template documents for informational purposes only and do not constitute legal advice. 
                While our templates are professionally crafted, we strongly recommend consulting with a qualified attorney 
                before using any contract for legal purposes to ensure it meets your specific needs and complies with applicable laws.
              </p>
            </div>
          </div>
        </div>
        
        {/* Preview Modal */}
        <Dialog open={previewModal.isOpen} onOpenChange={(open) => !open && closePreviewModal()}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {previewModal.template && formatContractName(previewModal.template)} - Preview
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 overflow-y-auto max-h-[60vh] bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="bg-white dark:bg-gray-900 rounded border shadow-sm p-8 font-mono text-sm leading-relaxed">
                {previewModal.template?.template_content.split('\n').map((line, index) => (
                  <div key={index} className={line.trim() === '' ? 'h-4' : ''}>
                    {line.includes('[') && line.includes(']') ? (
                      <span className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1 rounded">
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Note:</span> Blue highlighted text represents fields you'll fill out when creating the contract.
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={closePreviewModal}>
                  Close Preview
                </Button>
                <Link href={`/create/${previewModal.template?.contract_type}`}>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Create This Contract
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
