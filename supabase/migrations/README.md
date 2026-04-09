# Database Migrations

This directory contains SQL migration files for setting up the database schema.

## How to Apply Migrations

### Option 1: Using Supabase Web Dashboard
1. Go to your Supabase project: https://app.supabase.com
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the contents of each migration file (in order: 001, 002, 003, 004)
5. Paste and execute each query one at a time
6. Verify the tables appear in the **Table Editor**

### Option 2: Using Supabase CLI (Recommended)
```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link your project
supabase link --project-ref <your-project-ref>

# Apply migrations
supabase migration list
```

## Migration Order

Execute migrations in this order:
1. **001_create_projects_table.sql** — Creates projects table with indexes
2. **002_create_materials_table.sql** — Creates materials table with indexes
3. **003_create_material_prices_table.sql** — Creates material_prices table
4. **004_enable_rls_policies.sql** — Enables Row Level Security (RLS) policies for data isolation

## Tables

### `projects`
- Stores construction projects per user
- Fields: id, user_id, name, project_number, budget, description, created_at, updated_at
- RLS: Users can only access their own projects

### `materials`
- Stores materials for each project
- Fields: id, project_id, part_number, material_name, quantity_ordered, quantity_received, quantity_needed, status, unit_price, notes, created_at, updated_at
- RLS: Users can only access materials in their projects

### `material_prices`
- Stores price history for materials
- Fields: id, material_id, current_price, source, updated_at
- RLS: Users can only access prices for materials in their projects

## Security

All tables have Row Level Security (RLS) enabled. This ensures:
- Users can **only** see/modify their own data
- Queries are automatically filtered by auth.uid()
- Unauthorized access attempts return empty results (not errors)

## Verification

After applying migrations, verify by running these queries in Supabase SQL Editor:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```
