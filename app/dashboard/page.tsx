"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/MainLayout";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
            <p className="text-slate-300 mb-12">Welcome to the Material Management System</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Links */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
                <h2 className="text-xl font-bold text-white mb-2">My Projects</h2>
                <p className="text-slate-400 mb-4">View and manage your construction projects</p>
                <Link
                  href="/projects"
                  className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Go to Projects
                </Link>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
                <h2 className="text-xl font-bold text-white mb-2">Create New Project</h2>
                <p className="text-slate-400 mb-4">Start tracking materials for a new project</p>
                <Link
                  href="/projects/create"
                  className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                >
                  Create Project
                </Link>
              </div>
            </div>

            {/* Assignment 2 Tasks */}
            <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Assignment 2 Tasks</h2>
              <p className="text-slate-400 mb-4">
                The app is designed to meet the core Assignment 2 requirements:
              </p>
              <ol className="list-decimal list-inside space-y-3 text-slate-300">
                <li>Store materials that are ordered, received, and needed for each project.</li>
                <li>Keep each project separated by project number for organization.</li>
                <li>Enter part number, material name, and quantity values for each item.</li>
                <li>Persist material records in Supabase so they can be viewed and edited later.</li>
                <li>Calculate total price from unit price values to support cost tracking.</li>
              </ol>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
