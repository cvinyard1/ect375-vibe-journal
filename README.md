# Material Management For local Hospital

A premium, state-of-the-art construction material tracking application designed for local healthcare facilities. This platform provides seamless project management, material logistics, and real-time cost tracking to ensure construction projects remain on schedule and within budget.

---

## 🚀 Vibe Coding Stack

This project was built using the modern **Vibe Coding** approach, leveraging high-performance tools for rapid, high-quality development:

- **Framework**: [Next.js](https://nextjs.org/) (React 19, App Router)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, RLS)
- **AI Agent**: [Antigravity](https://github.com/google-deepmind/antigravity)

---

## ✨ Key Features

- **Project Lifecycle Management**: Create and track hospital renovation projects with dedicated budgets and descriptions.
- **Advanced Material Logistics**: 
  - Track part numbers, descriptions, and real-time availability.
  - Manage quantities: *Ordered*, *Received*, and *Needed*.
  - Status-driven workflows: *Needed* → *Ordered* → *Received*.
- **Intelligent Analytics**: Automated cost calculations based on unit prices and quantities.
- **Enterprise Security**: Row-Level Security (RLS) ensures absolute data isolation between users.
- **Responsive Architecture**: Fully optimized for desktop, tablet, and mobile devices.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- Supabase Account (for database & authentication)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/material-management.git
   cd material-management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### Running the Application
To start the development server with hot-reloading:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Pages, Layouts, API)
├── components/           # Reusable UI Components
├── lib/                  # Utilities, Supabase Client, and Types
├── supabase/             # Database Migrations and Schema
├── public/               # Static Assets
└── package.json          # Dependencies and Scripts
```

---

## 🤖 AI Attribution

> [!TIP]
> **Built using Vibe Coding methodology.** 
> This application was architected and developed with the assistance of **Antigravity**, focusing on rapid iteration and premium design standards.

---

## 📝 License

© 2026 Local Hospital Material Management System. All rights reserved.
