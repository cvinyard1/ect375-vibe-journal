# Material Management System - Setup & Deployment Guide

## Project Overview

A Next.js/Supabase web application for construction material tracking. Users can:
- Create and manage construction projects with project numbers and budgets
- Add materials to projects (part number, name, quantities: ordered/received/needed)
- Track material status (needed, ordered, received)
- Update and edit materials as project needs change
- View total costs per project

## Technology Stack

- **Frontend**: Next.js 15 with TypeScript and TailwindCSS
- **Backend**: Supabase (PostgreSQL database + Authentication)
- **Real-time**: Supabase subscriptions for live updates (ready to implement)
- **Styling**: TailwindCSS for responsive UI

## Project Structure

```
ect375-vibe-journal/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with AuthProvider
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # TailwindCSS directives
│   ├── auth/
│   │   ├── login/               # Login page
│   │   └── signup/              # Signup page
│   ├── dashboard/               # Dashboard for authenticated users
│   └── projects/
│       ├── page.tsx             # List all projects
│       ├── create/              # Create new project
│       ├── [id]/                # Project detail
│       └── [id]/materials/      # Materials management
│           ├── page.tsx         # List materials for project
│           ├── create/          # Add new material
│           └── [materialId]/edit/ # Edit material
├── components/                  # Reusable React components
│   ├── MainLayout.tsx           # Header + navigation
│   ├── ProtectedRoute.tsx       # Auth guard wrapper
│   └── MaterialForm.tsx         # Form for adding/editing materials
├── lib/
│   ├── supabase.ts             # Supabase client singleton
│   ├── auth/
│   │   └── AuthContext.tsx     # Auth context provider & hook
│   └── types.ts                # TypeScript database types
├── supabase/
│   └── migrations/             # SQL migration files
│       ├── 001_create_projects_table.sql
│       ├── 002_create_materials_table.sql
│       ├── 003_create_material_prices_table.sql
│       ├── 004_enable_rls_policies.sql
│       └── README.md           # Migration instructions
└── package.json                # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (https://supabase.com)
- A Supabase project with database credentials

### Step 1: Environment Setup

Your `.env.local` file should already contain:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
```

> These are already configured based on the existing setup.

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup Database Schema

**Important:** You must apply the SQL migrations to set up the database tables.

#### Option A: Supabase Web Dashboard (Recommended for beginners)

1. Go to https://app.supabase.com and select your project
2. Navigate to **SQL Editor** section
3. Click **New Query** 
4. Copy the contents from `/supabase/migrations/001_create_projects_table.sql`
5. Paste and click **Run**
6. Repeat steps 3-5 for:
   - `002_create_materials_table.sql`
   - `003_create_material_prices_table.sql`
   - `004_enable_rls_policies.sql`

Verify in Supabase:
- Navigate to **Table Editor**
- You should see: `projects`, `materials`, `material_prices` tables
- Check that all tables have RLS enabled (small lock icon on table names)

#### Option B: Supabase CLI (For advanced users)

```bash
# Install CLI globally
npm install -g supabase

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Apply migrations
supabase migration up
```

### Step 4: Enable Email Authentication (Supabase)

1. Go to Supabase dashboard → **Authentication** → **Providers**
2. Ensure **Email** provider is enabled (default is on)
3. Go to **URL Configuration** 
4. Set:
   - Site URL: `http://localhost:3000` (development) or your production URL
   - Redirect URLs: `http://localhost:3000/auth/callback`

### Step 5: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Features Implemented

### ✅ Phase 1: Project Initialization
- Next.js 15 with App Router
- TypeScript configuration
- TailwindCSS styling setup
- Supabase client initialization

### ✅ Phase 2: Database Schema
- `projects` table with RLS policies
- `materials` table with RLS policies
- `material_prices` table (for future price tracking)
- Proper indexes for performance

### ✅ Phase 3: Authentication & Layout
- Supabase Auth integration (email/password)
- Login and signup pages
- Protected routes with auth guard
- Main layout with navigation and logout

### ✅ Phase 4: Add Materials (Core Feature 1)
- Create new materials with:
  - Part number and material name
  - Quantities: ordered, received, needed
  - Status: needed, ordered, received
  - Unit price (optional)
  - Notes field
- Form validation and error handling

### ✅ Phase 5: Edit & Track Materials (Core Feature 2)
- View all materials in a project as a table
- Edit material details with prefilled form
- Delete materials with confirmation
- Display total cost calculations
- Real-time updates ready (Supabase subscriptions)

### ✅ Phase 6: Project Management
- Create new projects with:
  - Project name and project number (unique per user)
  - Budget (optional)
  - Description (optional)
- List all user projects
- View project details
- Delete projects

### 🚀 Phase 7: Enhanced Features (Ready for Implementation)

**Price Lookup Integration (Stretch Goal)**
- Manual price entry currently supported
- Ready to integrate with supplier APIs:
  - Option A: Home Depot API
  - Option B: Lowes API
  - Option C: Custom supplier API
- Architecture supports adding these integrations

**Future Enhancements**
- Real-time updates (using Supabase `on()` subscriptions)
- Bulk operations (bulk edit/delete)
- CSV export for reporting
- Advanced reporting & dashboards
- Project templates
- Material consumption tracking

## Using the Application

### Creating a Project

1. Click **"+ New Project"** on the Projects page or Dashboard
2. Fill in:
   - Project Name (e.g., "Union Hospital Renovation")
   - Project Number (e.g., "UH-2024-001") — unique per project
   - Budget (optional)
   - Description (optional)
3. Click **Create Project**

### Adding Materials to a Project

1. Navigate to a project and click **"+ Add Material"**
2. Fill in material details:
   - **Part #**: Supplier part number (e.g., "12345-RX")
   - **Material Name**: Description (e.g., "Steel Beam 4x6")
   - **Quantity Ordered**: How many ordered
   - **Quantity Received**: How many arrived
   - **Quantity Needed**: How many you need
   - **Status**: needed/ordered/received
   - **Unit Price**: Cost per unit (optional)
   - **Notes**: Any additional info
3. Click **Save Material**

### Editing Materials

1. Go to project → **"View All Materials"**
2. Click **Edit** button on any material row
3. Update the information and click **Save Material**

### Tracking Progress

- Monitor **Quantity Ordered** vs **Quantity Received** to track shipments
- Update **Status** to reflect material state
- View **Total Cost** calculation at the top of the materials list

## Database Schema

### `projects` Table

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| user_id | UUID | FK to auth.users |
| name | VARCHAR(255) | Project name |
| project_number | VARCHAR(100) | Unique per user, for organization |
| budget | DECIMAL(15,2) | Optional project budget |
| description | TEXT | Optional project details |
| created_at | TIMESTAMP | Auto-set on creation |
| updated_at | TIMESTAMP | Auto-updated |

### `materials` Table

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| project_id | UUID | FK to projects |
| part_number | VARCHAR(100) | Supplier part number |
| material_name | VARCHAR(255) | Material description |
| quantity_ordered | INTEGER | Amount ordered |
| quantity_received | INTEGER | Amount received |
| quantity_needed | INTEGER | Amount required |
| status | VARCHAR(50) | ordered / received / needed |
| unit_price | DECIMAL(10,2) | Price per unit |
| notes | TEXT | Additional notes |
| created_at | TIMESTAMP | Auto-set |
| updated_at | TIMESTAMP | Auto-updated |

### `material_prices` Table

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| material_id | UUID | FK to materials |
| current_price | DECIMAL(10,2) | Price snapshot |
| source | VARCHAR(255) | Price source (e.g., "Home Depot") |
| updated_at | TIMESTAMP | When price was recorded |

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com and connect your GitHub repo
3. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click Deploy

### Deploy to Other Platforms

The app can be deployed to any Node.js host:
- Netlify
- AWS Amplify
- Railway
- Heroku
- Self-hosted servers

Build command: `npm run build`
Start command: `npm run start`

## Security Notes

- **Row-Level Security (RLS)** ensures users only see their own data
- Supabase Auth handles password hashing and session management
- All database queries are automatically filtered by user ID
- Never expose `NEXT_PUBLIC_SUPABASE_ANON_KEY` in server-side code (it's public by design)
- For additional security, consider adding a private key for admin operations

## Troubleshooting

### "Permission denied" on database queries
- Ensure RLS policies are enabled (in `/supabase/migrations/004_enable_rls_policies.sql`)
- Verify your user is authenticated before querying

### "No tables found"
- Verify all 4 SQL migrations have been applied
- Check in Supabase Web Dashboard → Table Editor

### Session not persisting after refresh
- AuthContext uses `onAuthStateChange()` hook to persist sessions
- Verify `.env.local` has correct Supabase credentials

### Material not appearing after creation
- Check browser console for errors
- Verify RLS policies allow insert (check user_id matches auth.uid())

## Monitoring & Analytics

Consider adding:
- Sentry for error tracking
- Vercel Analytics for performance
- LogRocket for session replay

## Cost Estimation (Supabase)

- **Free Tier**: Up to 50k rows, 500MB storage, suitable for development
- **Pro Tier**: $25/month, unlimited API calls, 8GB storage, better for production

Current schema uses minimal resources.

## Next Steps

1. **Test the app**: Create accounts, projects, and materials
2. **Database migrations**: Follow Option A or B in Step 3 above
3. **Customize branding**: Edit logo, colors, company name
4. **Add team features**: Implement project sharing and team members
5. **Price integration**: Integrate with supplier APIs for auto price lookup
6. **Mobile app**: Build React Native version for on-site material entry

## Support & Documentation

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **TailwindCSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs/

---

**Version**: 0.1.0  
**Last Updated**: April 2026  
**Status**: MVP - Core features complete, ready for database setup
