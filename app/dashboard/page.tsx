"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/MainLayout";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="section">
          <div className="container">
            <div className="section-header">
              <h1 className="section-title text-4xl mb-4">Dashboard</h1>
              <p className="section-subtitle">Welcome to the Material Management System</p>
            </div>

            <div className="grid">
              {/* Quick Links */}
              <div className="card">
                <div className="card-icon">
                  <i className="fas fa-folder-open"></i>
                </div>
                <h2 className="card-title">My Projects</h2>
                <p className="card-text">View and manage your construction projects</p>
                <Link
                  href="/projects"
                  className="btn btn-primary"
                >
                  <i className="fas fa-arrow-right"></i> Go to Projects
                </Link>
              </div>

              <div className="card">
                <div className="card-icon" style={{background: 'linear-gradient(135deg, var(--success-color), var(--success-hover))'}}>
                  <i className="fas fa-plus-circle"></i>
                </div>
                <h2 className="card-title">Create New Project</h2>
                <p className="card-text">Start tracking materials for a new project</p>
                <Link
                  href="/projects/create"
                  className="btn btn-success"
                >
                  <i className="fas fa-plus"></i> Create Project
                </Link>
              </div>
            </div>

            {/* Assignment 2 Tasks */}
            <div className="card mt-8" style={{animationDelay: "0.4s"}}>
              <h2 className="card-title mb-4">Assignment 2 Tasks</h2>
              <p className="card-text mb-4">
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
