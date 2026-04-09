# Material Management System

**Construction Material Tracking Application for Union Hospital**

Built with Next.js, Supabase, and TailwindCSS

---

## 🎯 Quick Access

| Document | Purpose |
|----------|---------|
| **[QUICKSTART.md](QUICKSTART.md)** | **👈 Start here!** 3-step setup for development |
| **[IMPLEMENTATION-SUMMARY.md](IMPLEMENTATION-SUMMARY.md)** | Complete feature overview & architecture |
| **[SETUP.md](SETUP.md)** | Full deployment guide & troubleshooting |
| **[TESTING.md](TESTING.md)** | Test scenarios for all features |
| **[supabase/migrations/](supabase/migrations/)** | Database migration scripts |

---

## ✨ Features

### ✅ Implemented (MVP Ready)

- **Project Management**: Create projects with unique numbers, budgets, descriptions
- **Material Tracking**: Add/edit/delete materials with part numbers and descriptions
- **Quantity Management**: Track ordered, received, and needed quantities
- **Status Tracking**: Mark materials as needed/ordered/received
- **Cost Calculations**: Automatic total cost computation (quantity × unit price)
- **User Authentication**: Secure email/password login with Supabase
- **Data Isolation**: Row-Level Security ensures users only see their own projects
- **Responsive Design**: Works on desktop and mobile

### 🚀 Ready to Implement (Phase 7)

- Real-time material updates
- Price lookup integration (Home Depot/Lowes API)
- Bulk operations (edit/delete multiple)
- CSV export for reporting
- Advanced dashboards & analytics

---

## 📊 Core Tasks Completed

### Task 1: ✅ Add Materials to Projects
Users can create new materials with:
- Part number (required)
- Material name (required)
- Quantities: ordered, received, needed
- Status: needed/ordered/received
- Unit price (optional)
- Notes / additional details

**Implementation**: [app/projects/[id]/materials/create/](app/projects/[id]/materials/create/)

### Task 2: ✅ Edit & Track Materials
Users can:
- View all materials in a project as a table
- Edit material details with prefilled form
- Delete materials with confirmation
- See real-time cost calculations
- Track material status changes

**Implementation**: [app/projects/[id]/materials/](app/projects/[id]/materials/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier available)
- Supabase project with database credentials (already configured in `.env.local`)

### Setup (3 Steps)

**Step 1: Apply Database Migrations** (5 min)
```
Go to Supabase Dashboard → SQL Editor
Copy & run files from /supabase/migrations/ in order (001, 002, 003, 004)
```

**Step 2: Install Dependencies**
```bash
npm install
```

**Step 3: Start Development Server** (Already Running!)
```bash
npm run dev
# http://localhost:3000
```

See **[QUICKSTART.md](QUICKSTART.md)** for detailed instructions.

---

## 📁 Project Structure

```
ect375-vibe-journal/
├── app/                       # Next.js App Router (pages & layouts)
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout with auth provider
│   ├── globals.css           # Global styles & TailwindCSS
│   ├── auth/                 # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/            # Authenticated user home
│   └── projects/             # Project management
│       ├── page.tsx          # List projects
│       ├── create/           # Create new project
│       └── [id]/materials/   # Material CRUD
│           ├── page.tsx      # List materials ✅ Phase 5
│           ├── create/       # Add material ✅ Phase 4
│           └── [id]/edit/    # Edit material ✅ Phase 5
├── components/               # Reusable React components
│   ├── MainLayout.tsx        # Header & nav
│   ├── ProtectedRoute.tsx    # Auth guard
│   └── MaterialForm.tsx      # Material form component
├── lib/
│   ├── supabase.ts          # Database client
│   ├── types.ts             # TypeScript types
│   └── auth/AuthContext.tsx # Session management
├── supabase/   
│   └── migrations/          # SQL scripts for database setup
├── package.json             # Dependencies
└── [DOCUMENTATION FILES]    # Setup, testing, etc.
```

---

## 🔐 Security

- **Row-Level Security**: Database-enforced user data isolation
- **Supabase Auth**: Industry-standard password hashing & sessions
- **Protected Routes**: Client-side auth guard components
- **TypeScript**: Type-safe database interactions

---

## 📈 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15 (App Router) |
| **Styling** | TailwindCSS + Responsive Design |
| **Language** | TypeScript |
| **Backend** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth (Email/Password) |
| **Real-time** | Supabase Subscriptions (ready to use) |
| **Deployment** | Vercel (recommended) |

---

## 🎮 Usage Example

### 1. Create an Account
```
Sign up at http://localhost:3000/auth/signup
Email: your.email@example.com
Password: SecurePassword123
```

### 2. Create a Project
```
Dashboard → "+ New Project"
Name: "Union Hospital Renovation"
Project #: "UH-2024-001"
Budget: $150,000 (optional)
```

### 3. Add Materials (Phase 4)
```
Project → "+ Add Material"
Part #: "12345-ABC"
Name: "Steel Beam 4x6"
Ordered: 50
Received: 30
Needed: 50
Status: Ordered
Unit Price: $99.99
```

### 4. Track Changes (Phase 5)
```
Materials → "Edit" → Update quantities
Materials → "Delete" → Remove items
View totals → $2,999.70 calculated automatically
```

---

## 📊 Database Schema

### projects
- `id` (UUID, PK)
- `user_id` (FK to auth.users)
- `name`, `project_number`, `budget`, `description`
- `created_at`, `updated_at`

### materials
- `id` (UUID, PK)
- `project_id` (FK to projects)
- `part_number`, `material_name`
- `quantity_ordered`, `quantity_received`, `quantity_needed`
- `status` (needed|ordered|received)
- `unit_price`, `notes`
- `created_at`, `updated_at`

### material_prices
- `id`, `material_id`, `current_price`, `source`, `updated_at`

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub, then:
# 1. Go to vercel.com
# 2. Import from GitHub
# 3. Set environment variables
# 4. Deploy
```

### Other Platforms
```bash
npm run build
npm run start
```

Set environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=[your-url]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-key]
```

---

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - 3-step setup guide
- **[SETUP.md](SETUP.md)** - Full configuration & troubleshooting
- **[IMPLEMENTATION-SUMMARY.md](IMPLEMENTATION-SUMMARY.md)** - Architecture & features
- **[TESTING.md](TESTING.md)** - Test scenarios & checklist
- **[supabase/migrations/README.md](supabase/migrations/README.md)** - Database migrations

---

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript
```

### Environment
```bash
# Create .env.local (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
```

---

## ✅ Implementation Phases

- **Phase 1**: ✅ Project initialization + Next.js setup
- **Phase 2**: ✅ Database schema with RLS policies
- **Phase 3**: ✅ Authentication + protected routes
- **Phase 4**: ✅ **ADD MATERIALS** (Core Task 1)
- **Phase 5**: ✅ **EDIT & TRACK MATERIALS** (Core Task 2)
- **Phase 6**: ✅ Project management foundation
- **Phase 7**: 🚀 Enhanced features (real-time, pricing, reports)

---

## 🤝 Contributing

This is a project for Union Hospital. For suggestions or issues:
1. Test thoroughly in development
2. Document changes
3. Push to main branch
4. Deploy to Vercel

---

## 📞 Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **TailwindCSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org/docs

---

## 📝 License

© 2026 Union Hospital. All rights reserved.

---

## 🎉 Status

✅ **MVP Complete** - Core features ready to test
⏳ **Database Setup** - Apply migrations to Supabase
🚀 **Ready to Deploy** - No blockers for production use

**Next Step**: Follow [QUICKSTART.md](QUICKSTART.md) to set up the database (5 minutes).

---

**Version**: 0.1.0  
**Last Updated**: April 9, 2026  
**Status**: Development (Ready for Testing)

```
Dev Server: http://localhost:3000 ✅ Running
```
