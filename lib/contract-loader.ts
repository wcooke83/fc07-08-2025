import { ContractTemplate } from './contracts'

// Mock contract templates data
const contractTemplates: ContractTemplate[] = [
  {
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
]

export async function getContractTemplates(): Promise<ContractTemplate[]> {
  return contractTemplates
}

export function generateContractContent(template: ContractTemplate, formData: Record<string, string>): string {
  let content = template.template_content
  
  // Replace placeholders with actual data
  Object.entries(formData).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`
    content = content.replace(new RegExp(placeholder, 'g'), value)
  })
  
  return content
}
