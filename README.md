# FastContracts

FastContracts is an AI-powered legal contract generation platform built with Next.js, Supabase, and Vercel. It allows users to quickly create, customize, and manage legal documents using intelligent templates and AI assistance.

## Features

- **AI-Powered Contract Generation**: Generate contracts by filling out simple forms, with AI assisting in customization and clause suggestions.
- **Extensive Template Library**: A wide range of professionally drafted legal templates (NDAs, employment contracts, lease agreements, etc.).
- **User Authentication**: Secure user registration and login powered by Supabase Auth.
- **Contract Management**: Save, view, and download generated contracts.
- **Responsive Design**: A modern, responsive UI built with Tailwind CSS and Shadcn UI.
- **Server Actions**: Efficient data mutations and API calls using Next.js Server Actions.
- **Middleware for Authentication**: Protect routes and manage user sessions.

## Technologies Used

- **Next.js 14 (App Router)**: React framework for building full-stack web applications.
- **React**: Frontend library for building user interfaces.
- **Supabase**: Open-source Firebase alternative for database (PostgreSQL), authentication, and storage.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Shadcn UI**: Reusable UI components built with Radix UI and Tailwind CSS.
- **Zod**: TypeScript-first schema declaration and validation library.
- **Lucide React**: Beautifully crafted open-source icons.
- **Vercel**: Platform for deploying Next.js applications.

## Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/your-repo/fastcontracts.git
cd fastcontracts
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 3. Set up Supabase

If you don't have a Supabase project, create one at [Supabase](https://supabase.com/).

#### Database Setup

Run the SQL scripts in the `scripts/` directory to set up your database schema and seed initial data.

1.  **`scripts/create-supabase-tables-with-data.sql`**: Creates the `profiles`, `contract_templates`, and `contracts` tables and inserts initial contract templates.
2.  **`scripts/supabase-setup.sql`**: Sets up Row Level Security (RLS) policies for your tables.

You can run these scripts directly in your Supabase SQL Editor.

#### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables. You can find these in your Supabase project settings (Settings -> API).

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY" # Used for server-side operations, keep this secret!

# Optional: Email configuration for password reset/email verification (if not using Supabase's default email service)
EMAIL_FROM="noreply@example.com"
CONTACT_EMAIL="contact@example.com"
EMAIL_HOST="smtp.example.com"
EMAIL_PORT="587"
EMAIL_SECURE="true"
EMAIL_USER="your_smtp_user"
EMAIL_PASS="your_smtp_password"

# Application specific settings
REGISTRATION_ENABLED="true" # Set to "false" to disable new user registrations
CONTRACT_CREATION_ENABLED="true" # Set to "false" to disable contract creation flow
NEXT_PUBLIC_APP_NAME="FastContracts" # Your application name
NEXT_PUBLIC_APP_URL="http://localhost:3000" # Your application URL (for local development)
\`\`\`

**Important:** For deployment on Vercel, you must set these environment variables directly in your Vercel project settings, not just in `.env.local`.

### 4. Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

Deploy your Next.js application to Vercel. Ensure your environment variables are configured in your Vercel project settings.

## Project Structure

\`\`\`
.
├── app/
│   ├── api/                  # API Routes (e.g., auth, contracts)
│   ├── auth/                 # Authentication related pages (reset, verify)
│   ├── contracts/            # User's saved contracts dashboard
│   ├── create/               # Contract creation flow (dynamic routes for contract types)
│   ├── dashboard/            # User dashboard
│   ├── features/             # Features page
│   ├── help/                 # Help center pages (articles, videos, demo)
│   ├── legal/                # Legal pages (terms, privacy, disclaimer)
│   ├── login/                # Login page
│   ├── register/             # Registration page
│   ├── start/                # Initial contract creation selection page
│   ├── templates/            # Browse contract templates
│   ├── globals.css           # Global Tailwind CSS styles
│   ├── layout.tsx            # Root layout for the application
│   └── page.tsx              # Homepage
├── components/
│   ├── ui/                   # Shadcn UI components (auto-generated)
│   ├── auth-modal.tsx        # Authentication modal
│   ├── contract-form.tsx     # Form for contract field input
│   ├── footer.tsx            # Global footer
│   ├── legal-disclaimer.tsx  # Legal disclaimer component
│   ├── mobile-menu.tsx       # Mobile navigation menu
│   ├── process-overview.tsx  # Component explaining the contract creation process
│   ├── progress-bar.tsx      # Progress bar for multi-step forms
│   ├── progress-options.tsx  # Navigation buttons for multi-step forms
│   ├── register-form-client.tsx # Client-side registration form
│   ├── site-header.tsx       # Global header/navigation
│   ├── theme-provider.tsx    # Dark/Light mode provider
│   ├── theme-toggle.tsx      # Dark/Light mode toggle button
│   └── user-menu.tsx         # User dropdown menu
├── data/
│   ├── contracts.json        # Example contract data (for local testing/seeding)
│   └── templates/            # Raw contract template files (.txt)
├── hooks/
│   ├── use-mobile.ts         # Custom hook for mobile detection
│   └── use-toast.ts          # Custom hook for toast notifications
├── lib/
│   ├── auth-client.ts        # Client-side authentication utilities
│   ├── auth-server.ts        # Server-side authentication utilities
│   ├── auth.ts               # Shared authentication logic
│   ├── config.ts             # Application configuration (env vars)
│   ├── contract-loader.ts    # Utility to load contract templates from files
│   ├── contracts.ts          # Utilities for contract data handling (Supabase interaction)
│   ├── database.ts           # Database connection utilities
│   ├── dummy-data.ts         # Placeholder/dummy data generation
│   ├── email-templates.ts    # Email template definitions
│   ├── email.ts              # Email sending utility
│   ├── pkce.ts               # PKCE utilities for OAuth
│   └── supabase/             # Supabase client initialization and types
│       ├── client.ts
│       ├── createBrowserClient.ts
│       ├── createPagesServerClient.ts
│       ├── createServerClient.ts
│       ├── createServerSupabaseClient.ts
│       └── types.ts
├── public/                   # Static assets (images, favicons)
├── scripts/                  # SQL scripts for database setup
├── styles/                   # Additional global styles (if any)
├── middleware.ts             # Next.js middleware for authentication and routing
├── next.config.mjs           # Next.js configuration
├── package.json              # Project dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is open-source and available under the [MIT License](LICENSE).
