import { createServerClient } from './supabase/createServerClient'
import { createBrowserClient } from './supabase/createBrowserClient'

export interface ContractTemplate {
  id: string
  name: string
  description: string
  type: string
  form_fields: FormField[]
  template_content: string
  estimated_time?: string
  category?: string
}

export interface FormField {
  id: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'date' | 'number'
  placeholder?: string
  required: boolean
  options?: string[]
}

export interface Contract {
  id: string
  user_id: string | null
  type: string
  form_data: Record<string, string>
  content: string
  created_at: string
  updated_at: string
}

// Fallback NDA template for when database is unavailable
const fallbackNDATemplate: ContractTemplate = {
  id: 'nda',
  name: 'Non-Disclosure Agreement (NDA)',
  description: 'Protect confidential information between parties',
  type: 'nda',
  estimated_time: '5 min',
  category: 'Legal',
  form_fields: [
    {
      id: 'disclosing_party',
      label: 'Disclosing Party Name',
      type: 'text',
      placeholder: 'Company or individual sharing information',
      required: true
    },
    {
      id: 'receiving_party',
      label: 'Receiving Party Name',
      type: 'text',
      placeholder: 'Company or individual receiving information',
      required: true
    },
    {
      id: 'effective_date',
      label: 'Effective Date',
      type: 'date',
      required: true
    },
    {
      id: 'purpose',
      label: 'Purpose of Disclosure',
      type: 'textarea',
      placeholder: 'Describe the purpose for sharing confidential information',
      required: true
    },
    {
      id: 'duration',
      label: 'Agreement Duration (years)',
      type: 'select',
      options: ['1', '2', '3', '5', '10'],
      required: true
    }
  ],
  template_content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on {{effective_date}} between {{disclosing_party}} ("Disclosing Party") and {{receiving_party}} ("Receiving Party").

PURPOSE: The purpose of this Agreement is {{purpose}}.

CONFIDENTIAL INFORMATION: For purposes of this Agreement, "Confidential Information" shall include all information or material that has or could have commercial value or other utility in the business in which Disclosing Party is engaged.

OBLIGATIONS: Receiving Party agrees to:
1. Hold and maintain the Confidential Information in strict confidence
2. Not disclose the Confidential Information to any third parties
3. Use the Confidential Information solely for the purpose stated above

TERM: This Agreement shall remain in effect for {{duration}} years from the date first written above.

GOVERNING LAW: This Agreement shall be governed by and construed in accordance with the laws of [State/Country].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

_________________________          _________________________
{{disclosing_party}}                {{receiving_party}}
Disclosing Party                     Receiving Party`
}

export async function getContractTemplate(type: string): Promise<ContractTemplate | null> {
  console.log(`🔍 [CONTRACTS] Fetching template for type: ${type}`)
  
  try {
    // Try to get from server-side first
    let supabase
    try {
      supabase = createServerClient()
      console.log("📡 [CONTRACTS] Using server client")
    } catch {
      supabase = createBrowserClient()
      console.log("📡 [CONTRACTS] Using browser client")
    }

    console.log("📊 [CONTRACTS] Querying contract_templates table...")
    const { data, error } = await supabase
      .from('contract_templates')
      .select('*')
      .eq('contract_type', type)
      .eq('is_active', true)
      .limit(1)

    console.log("📊 [CONTRACTS] Database query result:")
    console.log("- Error:", error)
    console.log("- Data:", data)
    console.log("- Data length:", data?.length || 0)

    if (error) {
      console.error("❌ [CONTRACTS] Database error:", error)
      if (type === 'nda') {
        console.log("🔄 [CONTRACTS] Using fallback NDA template")
        return fallbackNDATemplate
      }
      return null
    }

    if (!data || data.length === 0) {
      console.warn(`⚠️ [CONTRACTS] No template found for type: ${type}`)
      if (type === 'nda') {
        console.log("🔄 [CONTRACTS] Using fallback NDA template")
        return fallbackNDATemplate
      }
      return null
    }

    const template = data[0]
    console.log("✅ [CONTRACTS] Found template:", {
      id: template.id,
      contract_type: template.contract_type,
      has_form_fields: !!template.form_fields,
      has_template_content: !!template.template_content
    })

    // Convert database template to our format
    const convertedTemplate: ContractTemplate = {
      id: template.contract_type,
      name: template.contract_type
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      description: `Professional ${template.contract_type.replace('-', ' ')} template`,
      type: template.contract_type,
      form_fields: template.form_fields || [],
      template_content: template.template_content || '',
      estimated_time: '5-10 min',
      category: 'Legal'
    }

    console.log("🔄 [CONTRACTS] Converted template:", {
      name: convertedTemplate.name,
      type: convertedTemplate.type,
      form_fields_count: convertedTemplate.form_fields.length,
      template_content_length: convertedTemplate.template_content.length
    })

    return convertedTemplate

  } catch (error) {
    console.error("💥 [CONTRACTS] Exception in getContractTemplate:", error)
    if (type === 'nda') {
      console.log("🔄 [CONTRACTS] Using fallback NDA template due to exception")
      return fallbackNDATemplate
    }
    return null
  }
}

export async function getContractTemplates(): Promise<ContractTemplate[]> {
  console.log("🔍 [CONTRACTS] Fetching all contract templates")
  
  try {
    let supabase
    try {
      supabase = createServerClient()
      console.log("📡 [CONTRACTS] Using server client")
    } catch {
      supabase = createBrowserClient()
      console.log("📡 [CONTRACTS] Using browser client")
    }

    const { data, error } = await supabase
      .from('contract_templates')
      .select('*')
      .eq('is_active', true)
      .order('contract_type')

    console.log("📊 [CONTRACTS] Database query result:")
    console.log("- Error:", error)
    console.log("- Data length:", data?.length || 0)

    if (error) {
      console.error("❌ [CONTRACTS] Database error:", error)
      return [fallbackNDATemplate]
    }

    if (!data || data.length === 0) {
      console.warn("⚠️ [CONTRACTS] No templates found in database")
      return [fallbackNDATemplate]
    }

    const templates = data.map(template => ({
      id: template.contract_type,
      name: template.contract_type
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      description: `Professional ${template.contract_type.replace('-', ' ')} template`,
      type: template.contract_type,
      form_fields: template.form_fields || [],
      template_content: template.template_content || '',
      estimated_time: '5-10 min',
      category: 'Legal'
    }))

    console.log("✅ [CONTRACTS] Successfully fetched templates:", templates.length)
    return templates

  } catch (error) {
    console.error("💥 [CONTRACTS] Exception in getContractTemplates:", error)
    return [fallbackNDATemplate]
  }
}

export async function getContractById(id: string): Promise<Contract | null> {
  // In a real app, this would query the database
  // For now, return null as we're using localStorage
  return null
}

export async function getContractsByUserId(userId: string): Promise<Contract[]> {
  const supabase = createServerClient()
  
  try {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contracts:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching contracts:', error)
    return []
  }
}

export async function saveContract(formData: FormData, userId: string | null): Promise<{ success: boolean; contractId?: string; error?: string }> {
  try {
    const contractType = formData.get('contractType') as string
    const template = await getContractTemplate(contractType)
    
    if (!template) {
      return { success: false, error: 'Contract template not found' }
    }

    // Extract form data
    const extractedData: Record<string, string> = {}
    template.form_fields.forEach(field => {
      const value = formData.get(field.id) as string
      if (value) {
        extractedData[field.id] = value
      }
    })

    // Generate contract content by replacing placeholders
    let content = template.template_content
    Object.entries(extractedData).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`
      content = content.replace(new RegExp(placeholder, 'g'), value)
    })

    const contractData = {
      id: `contract_${Date.now()}`,
      user_id: userId,
      type: contractType,
      form_data: extractedData,
      content: content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Save to localStorage for demo purposes
    localStorage.setItem(`contract_${contractType}`, JSON.stringify(contractData))

    return { success: true, contractId: contractData.id }
  } catch (error) {
    console.error('Error saving contract:', error)
    return { success: false, error: 'Failed to save contract' }
  }
}
