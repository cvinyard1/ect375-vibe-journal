# Testing Guide

## Pre-Testing Checklist

- [ ] Database migrations applied (check Supabase Table Editor for 3 tables)
- [ ] Dev server running on http://localhost:3000
- [ ] `.env.local` has valid Supabase credentials

---

## Test Scenarios

### 1️⃣ Authentication (Sign Up & Login)

**Sign Up Flow:**
1. Go to http://localhost:3000
2. Click "**Sign Up**"
3. Enter email: `test@example.com`
4. Enter password: `TestPassword123!`
5. Confirm password
6. Click "**Sign Up**"
7. ✅ Redirects to login page with success message

**Login Flow:**
1. Enter email: `test@example.com`
2. Enter password: `TestPassword123!`
3. Click "**Sign In**"
4. ✅ Redirects to Dashboard

**Expected Behavior:**
- Session persists on page refresh
- Logout button appears in header with user email
- Try accessing `/projects` without login → redirected to login page

---

### 2️⃣ Project Creation (Phase 6)

**Create Project:**
1. From Dashboard, click "**Create Project**" or go to `/projects/create`
2. Fill form:
   - Project Name: `Union Hospital Renovation`
   - Project Number: `UH-2024-001`
   - Budget: `150000`
   - Description: `Main building renovation project`
3. Click "**Create Project**"
4. ✅ Redirected to projects list
5. ✅ New project appears as card

**Expected Data:**
```
{
  name: "Union Hospital Renovation"
  project_number: "UH-2024-001"
  budget: 150000
  description: "Main building renovation project"
}
```

---

### 3️⃣ Add Material (Phase 4 - Core Task 1)

**Create Material:**
1. Click your project card → "**View Materials**"
2. Click "**+ Add Material**"
3. Fill form:
   - Part #: `12345-RX`
   - Material Name: `Steel Beam 4x6`
   - Quantity Ordered: `50`
   - Quantity Received: `30`
   - Quantity Needed: `50`
   - Status: `ordered`
   - Unit Price: `99.99`
   - Notes: `Critical path item`
4. Click "**Save Material**"
5. ✅ Redirected to materials list
6. ✅ Material appears in table

**Expected Table Row:**
```
Part #: 12345-RX
Name: Steel Beam 4x6
Ordered: 50 | Received: 30 | Needed: 50
Status: Ordered (blue badge)
Unit Price: $99.99
Total Cost: $2,999.70 (30 × $99.99)
```

**Test Variations:**
- Add material with no price → Unit Price shows "—"
- Add material with status "**received**" → Check green badge
- Add material with status "**needed**"  → Check yellow badge
- Add second material → Verify total cost updates

---

### 4️⃣ Edit Material (Phase 5 - Core Task 2)

**Edit Material:**
1. From materials list, click "**Edit**" on any material
2. ✅ Form prefills with existing data
3. Change values:
   - Quantity Received: change to `45`
   - Status: change to `received`
   - Unit Price: change to `105.00`
4. Click "**Save Material**"
5. ✅ Updates reflected in list immediately

**Verification:**
- Old values gone, new values displayed
- Cost calculation updated (45 × $105.00 = $4,725.00)
- Status badge changed to green ("Received")

---

### 5️⃣ Delete Material

**Delete Material:**
1. From materials list, click "**Delete**" on a material
2. ✅ Confirmation dialog appears: "Are you sure?"
3. Click "**Cancel**" → Material stays
4. Click "**Delete**" again, then confirm
5. ✅ Material removed from list
6. ✅ Total cost recalculated

---

### 6️⃣ Cost Tracking

**Verify Calculations:**
1. Create 3 materials:
   - Item A: 10 × $50.00 = $500.00
   - Item B: 20 × $25.00 = $500.00
   - Item C: 5 × $100.00 = $500.00
2. ✅ Total displayed: $1,500.00

**Test Edge Cases:**
- Material with $0 price → No calculation error
- Material with no price (null) → Skipped in total
- Edit quantity and price → Total updates
- Delete material → Total recalculates

---

### 7️⃣ Project Listing

**List All Projects:**
1. Go to `/projects`
2. ✅ See all your created projects as cards
3. ✅ Each shows: name, project number, budget, created date
4. ✅ "View Materials" button links to materials list
5. ✅ "Delete" button removes project

**Multi-Project Test:**
1. Create 5 different projects
2. Add different materials to each
3. Verify isolation: Materials from Project A don't appear in Project B
4. ✅ Each user task appears under correct project

---

### 8️⃣ Data Isolation (Row-Level Security)

**Test RLS Policies:**
1. Create Account A: `user1@test.com`
2. Create project & materials as User A
3. Logout
4. Create Account B: `user2@test.com`  
5. Login as User B
6. Go to `/projects`
7. ✅ Can only see User B's projects (NOT User A's)
8. ✅ Browser console shows no RLS errors

---

### 9️⃣ Form Validation

**Test Validation:**
1. Try creating material with:
   - Empty Part # → Red error, can't submit
   - Empty Material Name → Red error
   - Negative quantities → Prevented or zeroed
   - Invalid email on signup → Error message
   - Password mismatch on signup → "Passwords do not match"

---

### 🔟 Navigation & UI

**Test Header:**
1. Logged in → Header shows user email + "Logout" button
2. Click "Material Manager" logo → Goes to dashboard
3. Click "Dashboard" nav → Goes to `/dashboard`
4. Click "Projects" nav → Goes to `/projects`
5. Click "Logout" → Clears session, redirects to home

**Test Responsive Design:**
1. Open DevTools (F12) → Mobile view
2. ✅ Materials table stacks on mobile
3. ✅ Forms are readable on mobile
4. ✅ Navigation responsive/collapsible

---

## Error Scenarios

### What Should NOT Happen

❌ **Should NOT see:**
- Other users' projects after login
- 403 Permission Denied errors (RLS returns empty instead)
- Crashed pages with blank screens
- Form submissions with invalid data

### What Should Handle Gracefully

✅ **Should show error message for:**
- Invalid email/password at login
- Duplicate project numbers (if business rule enforced)
- Network errors on save
- Deleted resources accessed via back button

---

## Performance Checks

1. **Page Load**: Materials list should load in <1 second
2. **Form Submit**: Save material should complete in <2 seconds
3. **Navigation**: Page transitions smooth, no lag
4. **Real-time**: Open 2 tabs, edit in one → updates in other (when real-time enabled)

---

## Database Verification

**Check Supabase Tables:**

1. Go to https://app.supabase.com → Table Editor
2. Select `projects` table:
   ```
   SELECT * FROM projects;
   ```
   ✅ Shows your test project rows

3. Select `materials` table:
   ```
   SELECT * FROM materials;
   ```
   ✅ Shows your test material rows with correct project_id

4. Verify RLS is enabled:
   - Each table should have a lock icon
   - Check policies in **SQL Editor** → Run:
   ```sql
   SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname='public';
   ```
   ✅ All should show `rowsecurity = true`

---

## Troubleshooting During Testing

| Issue | Solution |
|-------|----------|
| Can't login | Check email/password, verify table created |
| Materials not showing | Check RLS policies applied, verify project_id matches |
| Can see other users' data | RLS not enabled, re-run migration 004 |
| Form errors on save | Check browser console for validation errors |
| Page shows "Loading..." forever | Check network tab, verify Supabase connection |
| Quantities show $0 | Calculate: quantity × unit_price, check if price is null |

---

## Sign-Off Checklist

After testing, confirm:

- [ ] Can create account and login
- [ ] Can create projects with budgets
- [ ] **Can add materials to projects** ✅ (Phase 4)
- [ ] **Can edit materials** ✅ (Phase 5)
- [ ] **Can delete materials** ✅ (Phase 5)
- [ ] **Can track costs** ✅ (Phase 5)
- [ ] Can logout and session clears
- [ ] Can view projects list with all projects
- [ ] Cannot see other users' data (RLS working)
- [ ] Mobile view is responsive
- [ ] No console errors during workflow

---

## Performance Baseline

Record these before optimizing:

- Dashboard load: ___ ms
- Projects list load: ___ ms
- Materials list load: ___ ms
- Add material submit: ___ ms
- Edit material submit: ___ ms

---

## Notes for Future Testing

- When real-time subscriptions added: Test 2-tab simultaneous editing
- When price integration added: Test API calls don't block UI
- When bulk operations added: Test performance with 100+ materials
- When export added: Test CSV file generation and download

---

**Test Date**: ___________  
**Tester**: ___________  
**Environment**: Development (localhost)  
**Status**: ◯ Pass | ◯ Fail | ◯ Blocked
