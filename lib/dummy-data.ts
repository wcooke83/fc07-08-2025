import type { ContractTemplate } from "./contracts"

export const dummyContractTemplates: ContractTemplate[] = [
  {
    id: "contractor-agreement",
    slug: "contractor-agreement",
    name: "Independent Contractor Agreement",
    description:
      "A contract between a client and an independent contractor outlining the terms of a project or service.",
    content: `
This Independent Contractor Agreement (the "Agreement") is made and entered into as of [Date], by and between [Client Name] ("Client"), located at [Client Address], and [Contractor Name] ("Contractor"), located at [Contractor Address].

**1. Services.** Contractor agrees to perform the following services for Client: [Description of Services].

**2. Term.** This Agreement shall commence on [Start Date] and shall continue until [End Date], unless terminated earlier as provided herein.

**3. Compensation.** Client agrees to pay Contractor the sum of [Amount] for the services, payable [Payment Terms].

**4. Independent Contractor Status.** Contractor is an independent contractor and not an employee of Client. Contractor shall be solely responsible for all taxes, insurance, and other expenses.

**5. Confidentiality.** Contractor agrees to keep all Client information confidential.

**6. Governing Law.** This Agreement shall be governed by the laws of [State/Country].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

[Client Name]
By: _________________________
Name: [Client Signer Name]
Title: [Client Signer Title]

[Contractor Name]
By: _________________________
Name: [Contractor Signer Name]
Title: [Contractor Signer Title]
`,
    formFields: [
      { id: "Date", label: "Agreement Date", type: "date", required: true },
      { id: "Client Name", label: "Client Name", type: "text", required: true },
      { id: "Client Address", label: "Client Address", type: "text", required: true },
      { id: "Contractor Name", label: "Contractor Name", type: "text", required: true },
      { id: "Contractor Address", label: "Contractor Address", type: "text", required: true },
      { id: "Description of Services", label: "Description of Services", type: "textarea", required: true },
      { id: "Start Date", label: "Start Date", type: "date", required: true },
      { id: "End Date", label: "End Date", type: "date", required: true },
      { id: "Amount", label: "Compensation Amount", type: "text", required: true, placeholder: "$1,000.00" },
      { id: "Payment Terms", label: "Payment Terms", type: "text", required: true, placeholder: "upon completion" },
      { id: "State/Country", label: "Governing Law (State/Country)", type: "text", required: true },
      { id: "Client Signer Name", label: "Client Signer Name", type: "text", required: true },
      { id: "Client Signer Title", label: "Client Signer Title", type: "text", required: true },
      { id: "Contractor Signer Name", label: "Contractor Signer Name", type: "text", required: true },
      { id: "Contractor Signer Title", label: "Contractor Signer Title", type: "text", required: true },
    ],
  },
  {
    id: "employment-contract",
    slug: "employment-contract",
    name: "Employment Contract",
    description: "A standard employment agreement between an employer and an employee.",
    content: `
This Employment Contract (the "Agreement") is made and entered into as of [Date], by and between [Company Name] ("Employer"), located at [Company Address], and [Employee Name] ("Employee"), residing at [Employee Address].

**1. Position.** Employer hereby employs Employee in the position of [Job Title].

**2. Duties.** Employee shall perform duties as described in the attached Job Description.

**3. Start Date.** Employee's employment shall commence on [Start Date].

**4. Compensation.** Employee's annual salary shall be [Salary Amount], payable [Payment Frequency].

**5. Benefits.** Employee shall be eligible for [Benefits Description].

**6. Confidentiality.** Employee agrees to keep all company information confidential.

**7. Termination.** This Agreement may be terminated by either party with [Notice Period] written notice.

**8. Governing Law.** This Agreement shall be governed by the laws of [State/Country].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

[Company Name]
By: _________________________
Name: [Employer Signer Name]
Title: [Employer Signer Title]

[Employee Name]
By: _________________________
Name: [Employee Signer Name]
`,
    formFields: [
      { id: "Date", label: "Agreement Date", type: "date", required: true },
      { id: "Company Name", label: "Company Name", type: "text", required: true },
      { id: "Company Address", label: "Company Address", type: "text", required: true },
      { id: "Employee Name", label: "Employee Name", type: "text", required: true },
      { id: "Employee Address", label: "Employee Address", type: "text", required: true },
      { id: "Job Title", label: "Job Title", type: "text", required: true },
      { id: "Start Date", label: "Start Date", type: "date", required: true },
      { id: "Salary Amount", label: "Annual Salary", type: "text", required: true, placeholder: "$50,000.00" },
      { id: "Payment Frequency", label: "Payment Frequency", type: "text", required: true, placeholder: "bi-weekly" },
      { id: "Benefits Description", label: "Benefits Description", type: "textarea", required: true },
      { id: "Notice Period", label: "Termination Notice Period", type: "text", required: true, placeholder: "2 weeks" },
      { id: "State/Country", label: "Governing Law (State/Country)", type: "text", required: true },
      { id: "Employer Signer Name", label: "Employer Signer Name", type: "text", required: true },
      { id: "Employer Signer Title", label: "Employer Signer Title", type: "text", required: true },
      { id: "Employee Signer Name", label: "Employee Signer Name", type: "text", required: true },
    ],
  },
  {
    id: "nda",
    slug: "nda",
    name: "Non-Disclosure Agreement (NDA)",
    description: "A legal agreement to protect confidential information shared between parties.",
    content: `
This Non-Disclosure Agreement (the "Agreement") is made and entered into as of [Date], by and between [Disclosing Party Name] ("Disclosing Party"), located at [Disclosing Party Address], and [Receiving Party Name] ("Receiving Party"), located at [Receiving Party Address].

**1. Confidential Information.** "Confidential Information" means any and all information disclosed by Disclosing Party to Receiving Party, whether orally, in writing, or by any other means, that is designated as confidential or that, by its nature, would reasonably be understood to be confidential. This includes, but is not limited to, [Examples of Confidential Information].

**2. Non-Disclosure Obligation.** Receiving Party agrees to hold all Confidential Information in strict confidence and not to disclose it to any third party without the prior written consent of Disclosing Party.

**3. Use of Confidential Information.** Receiving Party agrees to use the Confidential Information solely for the purpose of [Purpose of Disclosure].

**4. Term.** This Agreement shall remain in effect for a period of [Term Length] from the Effective Date.

**5. Return of Information.** Upon termination of this Agreement, Receiving Party shall return or destroy all Confidential Information.

**6. Governing Law.** This Agreement shall be governed by the laws of [State/Country].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

[Disclosing Party Name]
By: _________________________
Name: [Disclosing Party Signer Name]
Title: [Disclosing Party Signer Title]

[Receiving Party Name]
By: _________________________
Name: [Receiving Party Signer Name]
Title: [Receiving Party Signer Title]
`,
    formFields: [
      { id: "Date", label: "Agreement Date", type: "date", required: true },
      { id: "Disclosing Party Name", label: "Disclosing Party Name", type: "text", required: true },
      { id: "Disclosing Party Address", label: "Disclosing Party Address", type: "text", required: true },
      { id: "Receiving Party Name", label: "Receiving Party Name", type: "text", required: true },
      { id: "Receiving Party Address", label: "Receiving Party Address", type: "text", required: true },
      {
        id: "Examples of Confidential Information",
        label: "Examples of Confidential Information",
        type: "textarea",
        required: true,
      },
      { id: "Purpose of Disclosure", label: "Purpose of Disclosure", type: "textarea", required: true },
      { id: "Term Length", label: "Term Length (e.g., 5 years)", type: "text", required: true },
      { id: "State/Country", label: "Governing Law (State/Country)", type: "text", required: true },
      { id: "Disclosing Party Signer Name", label: "Disclosing Party Signer Name", type: "text", required: true },
      { id: "Disclosing Party Signer Title", label: "Disclosing Party Signer Title", type: "text", required: true },
      { id: "Receiving Party Signer Name", label: "Receiving Party Signer Name", type: "text", required: true },
      { id: "Receiving Party Signer Title", label: "Receiving Party Signer Title", type: "text", required: true },
    ],
  },
  {
    id: "lease-agreement",
    slug: "lease-agreement",
    name: "Residential Lease Agreement",
    description: "A contract between a landlord and a tenant for residential property.",
    content: `
This Residential Lease Agreement (the "Agreement") is made and entered into as of [Date], by and between [Landlord Name] ("Landlord"), and [Tenant Name] ("Tenant").

**1. Property.** Landlord agrees to lease to Tenant the property located at [Property Address] (the "Premises").

**2. Term.** This lease shall commence on [Start Date] and shall continue for a term of [Lease Term Length], ending on [End Date].

**3. Rent.** Tenant shall pay Landlord monthly rent of [Monthly Rent Amount], due on the [Rent Due Day] of each month.

**4. Security Deposit.** Tenant shall pay a security deposit of [Security Deposit Amount].

**5. Utilities.** Tenant shall be responsible for [Utilities Responsibility].

**6. Maintenance.** Tenant shall maintain the Premises in a clean and sanitary condition.

**7. Governing Law.** This Agreement shall be governed by the laws of [State/Country].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

[Landlord Name]
By: _________________________
Name: [Landlord Signer Name]

[Tenant Name]
By: _________________________
Name: [Tenant Signer Name]
`,
    formFields: [
      { id: "Date", label: "Agreement Date", type: "date", required: true },
      { id: "Landlord Name", label: "Landlord Name", type: "text", required: true },
      { id: "Tenant Name", label: "Tenant Name", type: "text", required: true },
      { id: "Property Address", label: "Property Address", type: "text", required: true },
      { id: "Start Date", label: "Lease Start Date", type: "date", required: true },
      { id: "Lease Term Length", label: "Lease Term Length (e.g., 12 months)", type: "text", required: true },
      { id: "End Date", label: "Lease End Date", type: "date", required: true },
      {
        id: "Monthly Rent Amount",
        label: "Monthly Rent Amount",
        type: "text",
        required: true,
        placeholder: "$1,500.00",
      },
      { id: "Rent Due Day", label: "Rent Due Day (e.g., 1st)", type: "text", required: true },
      {
        id: "Security Deposit Amount",
        label: "Security Deposit Amount",
        type: "text",
        required: true,
        placeholder: "$1,500.00",
      },
      {
        id: "Utilities Responsibility",
        label: "Utilities Responsibility",
        type: "textarea",
        required: true,
        placeholder: "all utilities except water",
      },
      { id: "State/Country", label: "Governing Law (State/Country)", type: "text", required: true },
      { id: "Landlord Signer Name", label: "Landlord Signer Name", type: "text", required: true },
      { id: "Tenant Signer Name", label: "Tenant Signer Name", type: "text", required: true },
    ],
  },
  {
    id: "partnership-agreement",
    slug: "partnership-agreement",
    name: "Partnership Agreement",
    description: "A legal document outlining the responsibilities and profit-sharing for business partners.",
    content: `
This Partnership Agreement (the "Agreement") is made and entered into as of [Date], by and between [Partner 1 Name] ("Partner 1"), and [Partner 2 Name] ("Partner 2").

**1. Business Name.** The name of the partnership shall be [Partnership Name].

**2. Purpose.** The purpose of the partnership is to [Purpose of Partnership].

**3. Capital Contributions.**
Partner 1 shall contribute [Partner 1 Contribution].
Partner 2 shall contribute [Partner 2 Contribution].

**4. Profit and Loss Sharing.** Profits and losses shall be shared as follows:
Partner 1: [Partner 1 Profit Share]%
Partner 2: [Partner 2 Profit Share]%

**5. Management and Duties.**
Partner 1 shall be responsible for [Partner 1 Duties].
Partner 2 shall be responsible for [Partner 2 Duties].

**6. Term.** The partnership shall commence on [Start Date] and shall continue until dissolved as provided herein.

**7. Governing Law.** This Agreement shall be governed by the laws of [State/Country].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

[Partner 1 Name]
By: _________________________

[Partner 2 Name]
By: _________________________
`,
    formFields: [
      { id: "Date", label: "Agreement Date", type: "date", required: true },
      { id: "Partner 1 Name", label: "Partner 1 Name", type: "text", required: true },
      { id: "Partner 2 Name", label: "Partner 2 Name", type: "text", required: true },
      { id: "Partnership Name", label: "Partnership Name", type: "text", required: true },
      { id: "Purpose of Partnership", label: "Purpose of Partnership", type: "textarea", required: true },
      {
        id: "Partner 1 Contribution",
        label: "Partner 1 Capital Contribution",
        type: "text",
        required: true,
        placeholder: "$10,000.00 cash",
      },
      {
        id: "Partner 2 Contribution",
        label: "Partner 2 Capital Contribution",
        type: "text",
        required: true,
        placeholder: "$10,000.00 equipment",
      },
      {
        id: "Partner 1 Profit Share",
        label: "Partner 1 Profit Share (%)",
        type: "number",
        required: true,
        placeholder: "50",
      },
      {
        id: "Partner 2 Profit Share",
        label: "Partner 2 Profit Share (%)",
        type: "number",
        required: true,
        placeholder: "50",
      },
      { id: "Partner 1 Duties", label: "Partner 1 Duties", type: "textarea", required: true },
      { id: "Partner 2 Duties", label: "Partner 2 Duties", type: "textarea", required: true },
      { id: "Start Date", label: "Partnership Start Date", type: "date", required: true },
      { id: "State/Country", label: "Governing Law (State/Country)", type: "text", required: true },
    ],
  },
  {
    id: "sales-agreement",
    slug: "sales-agreement",
    name: "Sales Agreement",
    description: "A contract for the sale of goods between a buyer and a seller.",
    content: `
This Sales Agreement (the "Agreement") is made and entered into as of [Date], by and between [Seller Name] ("Seller"), located at [Seller Address], and [Buyer Name] ("Buyer"), located at [Buyer Address].

**1. Goods.** Seller agrees to sell, and Buyer agrees to purchase, the following goods: [Description of Goods].

**2. Purchase Price.** The total purchase price for the Goods is [Purchase Price Amount], payable by [Payment Method].

**3. Delivery.** The Goods shall be delivered to [Delivery Address] on or before [Delivery Date].

**4. Warranty.** Seller warrants that the Goods are [Warranty Details].

**5. Governing Law.** This Agreement shall be governed by the laws of [State/Country].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

[Seller Name]
By: _________________________
Name: [Seller Signer Name]
Title: [Seller Signer Title]

[Buyer Name]
By: _________________________
Name: [Buyer Signer Name]
Title: [Buyer Signer Title]
`,
    formFields: [
      { id: "Date", label: "Agreement Date", type: "date", required: true },
      { id: "Seller Name", label: "Seller Name", type: "text", required: true },
      { id: "Seller Address", label: "Seller Address", type: "text", required: true },
      { id: "Buyer Name", label: "Buyer Name", type: "text", required: true },
      { id: "Buyer Address", label: "Buyer Address", type: "text", required: true },
      { id: "Description of Goods", label: "Description of Goods", type: "textarea", required: true },
      {
        id: "Purchase Price Amount",
        label: "Purchase Price Amount",
        type: "text",
        required: true,
        placeholder: "$5,000.00",
      },
      { id: "Payment Method", label: "Payment Method", type: "text", required: true, placeholder: "bank transfer" },
      { id: "Delivery Address", label: "Delivery Address", type: "text", required: true },
      { id: "Delivery Date", label: "Delivery Date", type: "date", required: true },
      {
        id: "Warranty Details",
        label: "Warranty Details",
        type: "textarea",
        required: true,
        placeholder: "as-is, no warranty",
      },
      { id: "State/Country", label: "Governing Law (State/Country)", type: "text", required: true },
      { id: "Seller Signer Name", label: "Seller Signer Name", type: "text", required: true },
      { id: "Seller Signer Title", label: "Seller Signer Title", type: "text", required: true },
      { id: "Buyer Signer Name", label: "Buyer Signer Name", type: "text", required: true },
      { id: "Buyer Signer Title", label: "Buyer Signer Title", type: "text", required: true },
    ],
  },
  {
    id: "service-agreement",
    slug: "service-agreement",
    name: "Service Agreement",
    description: "A contract outlining the terms and conditions for services provided by a service provider.",
    content: `
This Service Agreement (the "Agreement") is made and entered into as of [Date], by and between [Service Provider Name] ("Service Provider"), located at [Service Provider Address], and [Client Name] ("Client"), located at [Client Address].

**1. Services.** Service Provider agrees to perform the following services for Client: [Description of Services].

**2. Term.** This Agreement shall commence on [Start Date] and shall continue until [End Date], unless terminated earlier as provided herein.

**3. Compensation.** Client agrees to pay Service Provider the sum of [Amount] for the services, payable [Payment Terms].

**4. Independent Contractor Status.** Service Provider is an independent contractor and not an employee of Client.

**5. Confidentiality.** Service Provider agrees to keep all Client information confidential.

**6. Governing Law.** This Agreement shall be governed by the laws of [State/Country].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

[Service Provider Name]
By: _________________________
Name: [Service Provider Signer Name]
Title: [Service Provider Signer Title]

[Client Name]
By: _________________________
Name: [Client Signer Name]
Title: [Client Signer Title]
`,
    formFields: [
      { id: "Date", label: "Agreement Date", type: "date", required: true },
      { id: "Service Provider Name", label: "Service Provider Name", type: "text", required: true },
      { id: "Service Provider Address", label: "Service Provider Address", type: "text", required: true },
      { id: "Client Name", label: "Client Name", type: "text", required: true },
      { id: "Client Address", label: "Client Address", type: "text", required: true },
      { id: "Description of Services", label: "Description of Services", type: "textarea", required: true },
      { id: "Start Date", label: "Start Date", type: "date", required: true },
      { id: "End Date", label: "End Date", type: "date", required: true },
      { id: "Amount", label: "Compensation Amount", type: "text", required: true, placeholder: "$2,500.00" },
      { id: "Payment Terms", label: "Payment Terms", type: "text", required: true, placeholder: "upon completion" },
      { id: "State/Country", label: "Governing Law (State/Country)", type: "text", required: true },
      { id: "Service Provider Signer Name", label: "Service Provider Signer Name", type: "text", required: true },
      { id: "Service Provider Signer Title", label: "Service Provider Signer Title", type: "text", required: true },
      { id: "Client Signer Name", label: "Client Signer Name", type: "text", required: true },
      { id: "Client Signer Title", label: "Client Signer Title", type: "text", required: true },
    ],
  },
]
