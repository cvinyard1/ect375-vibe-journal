# Quick Start Guide

## TL;DR - Get Running in 3 Steps

### 1. Apply Database Migrations

**Go to Supabase Dashboard:**
1. Open https://app.supabase.com → Select your project
2. Go to **SQL Editor** → Click **New Query**
3. Copy & paste from `/supabase/migrations/001_create_projects_table.sql`
4. Click **Run**
5. Repeat for files 002, 003, and 004 (in order!)

> **Verification**: Check **Table Editor** and you should see `projects`, `materials`, `material_prices` tables

### 2. Development Server (Already Running)

The dev server is already running on **http://localhost:3000**

To restart anytime:
```bash
npm run dev
```

### 3. Access the App

- **Landing Page**: http://localhost:3000
- **Create Account**: http://localhost:3000/auth/signup
- **Login**: http://localhost:3000/auth/login (use the email you just signed up with)

---

## Quick User Flow

1. **Sign up** with any email/password
2. **Create a project** (Dashboard → "+ New Project")
   - Give it a name (e.g., "Union Hospital Renovation")
   - Enter project number (e.g., "UH-2024-001")
   - Set budget (optional)
3. **Add materials** (Project page → "+ Add Material")
   - Part number (e.g., "12345-RX")
   - Material name (e.g., "Steel Beam 4x6")
   - Quantities: ordered, received, needed
   - Status: select from dropdown
   - Price per unit (optional)
4. **View & edit** materials in the materials list
5. **See totals** at top of materials page

---

## File Structure Overview

```
Key Files to Know:
├── SETUP.md                    ← Full deployment guide
├── package.json                ← Dependencies
├── app/dashboard/page.tsx      ← Authenticated landing
├── app/projects/page.tsx       ← List projects
├── app/projects/create/        ← New project
├── app/projects/[id]/materials/
│   ├── page.tsx               ← List materials
│   ├── create/                ← Add material (Phase 4 ✅)
│   └── [id]/edit/             ← Edit material (Phase 5 ✅)
└── supabase/migrations/        ← Database setup SQL files
```

---

## Troubleshooting

**Q: I see "Permission denied" errors**
- A: Database migrations not applied. Follow Step 1 above.

**Q: Can't login / No email received**
- A: Supabase email auth is working but may go to spam. Check spam folder.

**Q: Materials not showing up**
- A: Verify RLS policies enabled in Supabase → SQL Editor → check `004_enable_rls_policies.sql` was run.

**Q: Dev server crashes**
- A: Run `npm install` again, then `npm run dev`

---

## Next: Implement Phase 7 Features

When ready to add advanced features:
- **Real-time updates**: Add Supabase `.on()` subscriptions in components
- **Price lookup**: Integrate Home Depot / Lowes API
- **Bulk operations**: Add bulk edit/delete UI
- **CSV export**: Generate reports for budgeting

See `SETUP.md` for full documentation.

---

**Status**: MVP Complete ✅ | Database Setup Needed ⏳ | Ready to Test 🚀
