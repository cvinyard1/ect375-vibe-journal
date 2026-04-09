# 🗺️ Navigation & User Flow Guide

## Site Map

```
http://localhost:3000/
├── / (Landing Page)
│   ├── "Sign Up" → /auth/signup
│   └── "Login" → /auth/login
│
├── /auth/
│   ├── /signup (Public - Create Account)
│   │   └── Submit → /auth/login
│   └── /login (Public - Sign In)
│       └── Submit → /dashboard
│
├── /dashboard (Protected - User Home)
│   ├── "Go to Projects" → /projects
│   ├── "+ New Project" → /projects/create
│   └── Dashboard Overview & Quick Links
│
└── /projects (Protected)
    ├── /projects (List all projects)
    │   ├── "+ New Project" → /projects/create
    │   ├── [Project Card] → /projects/[id]
    │   └── [Project Card] → "View Materials" → /projects/[id]/materials
    │
    ├── /projects/create (Create Project)
    │   ├── Form: name, projectNumber, budget, description
    │   └── Submit → /projects
    │
    ├── /projects/[projectId] (Project Detail)
    │   ├── "View All Materials" → /projects/[id]/materials
    │   ├── "+ Add Material" → /projects/[id]/materials/create
    │   └── Project Info Card
    │
    └── /projects/[projectId]/materials
        ├── /materials (List Materials) ✅ Phase 5
        │   ├── Table display of all materials
        │   ├── "+ Add Material" → /materials/create
        │   ├── [Material Row] "Edit" → /materials/[id]/edit
        │   ├── [Material Row] "Delete" → Confirmation → Delete
        │   └── Total Cost Display
        │
        ├── /materials/create (Add Material) ✅ Phase 4
        │   ├── Form: part#, name, quantities, status, price, notes
        │   ├── Submit → /materials
        │   └── Cancel → /materials
        │
        └── /materials/[materialId]/edit (Edit Material) ✅ Phase 5
            ├── Form: (prefilled with existing data)
            ├── Modify any field
            ├── Submit → /materials
            ├── Delete Button → Confirmation → Delete
            └── Cancel → /materials
```

---

## 👤 User Journey Examples

### New User Journey

```
1. Land on http://localhost:3000
   ↓
2. Click "Sign Up"
   ↓
3. Enter email & password → "Sign Up"
   ↓
4. Redirected to /auth/login
   ↓
5. Enter same email & password → "Sign In"
   ↓
6. Redirected to /dashboard (first time login)
   ↓
7. Click "+ New Project"
   ↓
8. Fill form: "Union Hospital Renovation", "UH-2024-001", budget
   ↓
9. Click "Create Project"
   ↓
10. Redirected to /projects (see new project card)
    ↓
11. Click project → /projects/[id]
    ↓
12. Click "+ Add Material"
    ↓
13. Fill form: part#, name, quantities, status
    ↓
14. Click "Save Material"
    ↓
15. Redirected to /materials (see new material in table)
```

### Returning User Journey

```
1. Go to http://localhost:3000
   ↓
2. Already logged in? → Redirected to /dashboard
   ↓
3. Click "Projects"
   ↓
4. See list of all projects
   ↓
5. Click project → /projects/[id]
   ↓
6. Click "View All Materials"
   ↓
7. See materials table
   ↓
8. Click "Edit" on any row
   ↓
9. Update quantities & save
   ↓
10. See updated material & recalculated costs
```

---

## 📱 Mobile Navigation

**On Mobile (< 768px):**
- Header remains sticky
- Navigation collapses (responsive)
- Tables stack vertically
- Forms optimize for touch
- All buttons remain accessible

**Responsive Breakpoints:**
```
Mobile:  < 640px
Tablet:  640px - 1024px  
Desktop: > 1024px
```

---

## 🔐 Authentication Flow

```
UNAUTHENTICATED USER
        ↓
    [Try to access protected route?]
        ↓
    YES → Redirected to /auth/login
        ↓
    NO → Can access public pages (/, /auth/login, /auth/signup)

SIGN UP FLOW:
    /auth/signup
        ↓
    [Enter email & password]
        ↓
    [Submit]
        ↓
    ✅ Account created in Supabase
        ↓
    Redirected to /auth/login
        ↓
    [Enter email & password]
        ↓
    [Submit]
        ↓
    ✅ JWT session created
        ↓
    Redirected to /dashboard

LOGOUT FLOW:
    Click "Logout" in header
        ↓
    ✅ Session cleared
        ↓
    Redirected to /
```

---

## 💾 Data Flow: Add Material

```
User on /projects/[id]/materials/create
    ↓
[Fill Material Form]
- part_number: "12345-ABC"
- material_name: "Steel Beam"
- quantity_ordered: 50
- quantity_received: 30
- quantity_needed: 50
- status: "ordered"
- unit_price: 99.99
- notes: "Critical path"
    ↓
[Click "Save Material"]
    ↓
MaterialForm.handleSubmit() 
    ↓
supabase.from('materials').insert({
    project_id: [projectId],
    part_number: "12345-ABC",
    material_name: "Steel Beam",
    ... all fields
})
    ↓
✅ Inserted into database
    ↓
Redirected to /materials
    ↓
[Server fetches materials list]
    ↓
✅ New material displayed in table
```

---

## 💾 Data Flow: Edit Material

```
User on /projects/[id]/materials
    ↓
[Click "Edit" on material row]
    ↓
Navigate to /materials/[materialId]/edit
    ↓
[Fetch material data from database]
    ↓
[Form prefilled with existing data]
    ↓
[User modifies: quantity_received: 30 → 45]
    ↓
[Click "Save Material"]
    ↓
supabase.from('materials').update({
    quantity_received: 45,
    ... other changed fields
}).eq('id', [materialId])
    ↓
✅ Updated in database
    ↓
Redirected to /materials
    ↓
[Server fetches materials list]
    ↓
✅ Material row updated
✅ Cost recalculated: 45 × $99.99 = $4,499.55
```

---

## 📊 Variables & State

### App Level (AuthContext)
```
session: Session | null
user: User | null
loading: boolean
```

### Page Level Examples

**Projects Page:**
```
projects: Project[]
loading: boolean
```

**Materials Page:**
```
materials: Material[]
project: Project | null
loading: boolean
```

**Material Form:**
```
partNumber: string
materialName: string
quantityOrdered: string
quantityReceived: string
quantityNeeded: string
status: "needed" | "ordered" | "received"
unitPrice: string
notes: string
loading: boolean
error: string | null
```

---

## 🎨 UI Components Hierarchy

```
RootLayout
├── AuthProvider (wrapper)
│   └── MainLayout (conditional)
│       ├── Header
│       │   ├── Logo/Title
│       │   ├── Nav Links (Dashboard, Projects)
│       │   └── User Menu (Email, Logout)
│       └── Main Content
│           ├── ProtectedRoute (guard)
│           └── Page Content
│               ├── Forms
│               ├── Tables
│               ├── Cards
│               └── Buttons
```

---

## 🔄 State Management Flow

```
User Action (click button)
    ↓
Event Handler (onClick, onSubmit)
    ↓
Update Local State (useState)
    ↓
Call Supabase API (async)
    ↓
Update State Again
    ↓
Re-render Component
    ↓
Display Updated UI
```

**Example: Edit Material**
```
Click "Save Material" button
    ↓
handleSubmit(e) called
    ↓
setLoading(true)
    ↓
supabase.from('materials').update(...).eq('id', id)
    ↓
if (error) setError(error.message)
if (success) router.push('/materials')
    ↓
setLoading(false)
    ↓
Component re-renders
    ↓
User redirected to materials list
```

---

## 📋 Form Fields Reference

### Project Creation Form
```
name (required)          → "Union Hospital Renovation"
project_number (unique)  → "UH-2024-001"
budget (optional)        → 150000
description (optional)   → "Main building renovation"
```

### Material Creation Form
```
part_number (required)     → "12345-ABC"
material_name (required)   → "Steel Beam 4x6"
quantity_ordered           → 50
quantity_received          → 30
quantity_needed            → 50
status (required)          → "ordered" | "received" | "needed"
unit_price (optional)      → 99.99
notes (optional)           → "On critical path"
```

---

## 🎯 Key Component Props

### MainLayout
```tsx
interface Props {
  children: React.ReactNode
}

Features:
- Header with navigation
- User email display
- Logout button
- Responsive layout
```

### ProtectedRoute
```tsx
interface Props {
  children: React.ReactNode
}

Features:
- Checks auth session
- Loading spinner while checking
- Redirects to login if not authenticated
```

### MaterialForm
```tsx
interface Props {
  initialData?: Material
  onSubmit: (data: Partial<Material>) => Promise<void>
  isLoading: boolean
  error: string | null
}

Features:
- Reusable for create & edit
- Pre-fills on edit
- Validates all inputs
- Shows error messages
```

---

## 💡 Common Button Flows

| Button | On Click | Redirects To |
|--------|----------|--------------|
| "Sign Up" (home) | → /auth/signup | N/A |
| "Login" (home) | → /auth/login | N/A |
| "Sign Up" (form) | POST to auth → | /auth/login |
| "Sign In" (form) | POST to auth → | /dashboard |
| "+ New Project" | → /projects/create | N/A |
| "Create Project" | POST project → | /projects |
| "View Materials" | → /projects/[id]/materials | N/A |
| "+ Add Material" | → /projects/[id]/materials/create | N/A |
| "Save Material" (create) | POST material → | /projects/[id]/materials |
| "Edit" (in table) | → /projects/[id]/materials/[id]/edit | N/A |
| "Save Material" (edit) | UPDATE material → | /projects/[id]/materials |
| "Delete" (material) | Confirm → DELETE → | /projects/[id]/materials |
| "Delete" (project) | Confirm → DELETE → | /projects |
| "Logout" | Clear session → | / |
| "Back" links | → Previous page | N/A |

---

## 🔍 Data Fetch Patterns

### Page Load - List Projects
```
1. Component mounts
2. useEffect fires
3. supabase.from('projects').select()
4. RLS filters by current user
5. setProjects(data)
6. Re-render with data
```

### Page Load - View Material Details
```
1. Component mounts
2. Extract [materialId] from URL params
3. useEffect fires with dependency
4. supabase.from('materials').select().eq('id', materialId).single()
5. RLS checks user has access
6. setMaterial(data)
7. Form pre-fills with data
```

### Form Submit
```
1. User clicks "Save Material"
2. handleSubmit() called
3. Validate form data
4. setLoading(true)
5. supabase.from('materials').insert()
6. RLS checks user_id matches session
7. if (success) redirect
8. if (error) show error message
9. setLoading(false)
```

---

## 🛡️ Error Handling Patterns

```
TRY-CATCH on all API calls:
    try {
        const { data, error } = await supabase...
        if (error) throw error
        // Handle success
    } catch (err) {
        setError(err.message)
        // Show error to user
    }

Form validation:
    - Check required fields
    - Validate email format
    - Check password rules
    - Show inline errors

RLS Errors:
    - Usually returns empty results (not errors)
    - Sometimes returns 403 Permission Denied
    - Automatic redirect to login handles most cases
```

---

## 📊 Table Display Pattern

```
Materials List Table:
├── Header Row
│   ├── Part # | Material Name | Ordered | Received | Needed | Status | Price | Actions
│   └── (column alignments)
├── Body Rows (for each material)
│   ├── Data cells
│   └── Action buttons (Edit, Delete)
└── Footer
    └── Total Cost Calculation
```

**Cost Calculation:**
```
Total = ∑(material.unit_price × material.quantity_received)

Example:
Item 1: $99.99 × 30 = $2,999.70
Item 2: $50.00 × 20 = $1,000.00
Item 3: $75.00 × 15 = $1,125.00
TOTAL: $5,124.70
```

---

## 🎓 This Guide Helps With

- ✅ Understanding application structure
- ✅ Following user workflows
- ✅ Navigating documentation
- ✅ Testing user journeys
- ✅ Debugging data flows
- ✅ Understanding component architecture

**For detailed code review:** See `IMPLEMENTATION-SUMMARY.md`

**For testing scenarios:** See `TESTING.md`

**For deployment:** See `SETUP.md`
