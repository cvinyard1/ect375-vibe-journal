"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/MainLayout";
import { Project } from "@/lib/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  const fetchProjects = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase.from("projects").delete().eq("id", projectId);

      if (error) throw error;
      setProjects(projects.filter((p) => p.id !== projectId));
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project");
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="section">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="section-title text-4xl mb-2" style={{margin: 0}}>Projects</h1>
                <p className="text-slate-400">Manage your construction projects efficiently</p>
              </div>
              <Link
                href="/projects/create"
                className="btn btn-primary"
              >
                <i className="fas fa-plus"></i> New Project
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="text-xl text-slate-300"><i className="fas fa-spinner fa-spin"></i> Loading projects...</div>
              </div>
            ) : projects.length === 0 ? (
              <div className="card text-center flex flex-col items-center justify-center p-12">
                <div className="card-icon mb-6">
                  <i className="fas fa-folder-open"></i>
                </div>
                <h2 className="card-title">No projects yet</h2>
                <p className="card-text mb-6 max-w-md">Create your first project to start tracking materials</p>
                <Link
                  href="/projects/create"
                  className="btn btn-primary"
                >
                  <i className="fas fa-plus"></i> Create First Project
                </Link>
              </div>
            ) : (
              <div className="grid">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="card flex flex-col cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="card-title m-0 text-xl">{project.name}</h3>
                      <span className="badge badge-primary font-mono">{project.project_number}</span>
                    </div>
                    
                    <p className="card-text flex-grow">
                      {project.description ? project.description.substring(0, 100) + (project.description.length > 100 ? '...' : '') : "No description provided."}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2">
                         <i className="fas fa-calendar text-slate-500"></i>
                         <span className="text-slate-400 text-sm">{new Date(project.created_at).toLocaleDateString()}</span>
                      </div>
                      {project.budget && (
                        <div className="flex items-center gap-2">
                           <i className="fas fa-coins text-green-500"></i>
                           <span className="text-green-400 text-sm">${project.budget.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/projects/${project.id}`);
                        }}
                        className="btn btn-outline flex-1 justify-center"
                      >
                        <i className="fas fa-eye"></i> View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(project.id);
                        }}
                        className="btn btn-danger"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
