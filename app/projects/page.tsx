"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth/AuthContext";
import { useEffect } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/MainLayout";
import { Project } from "@/lib/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
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
        <div className="py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white">Projects</h1>
            <Link
              href="/projects/create"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              + New Project
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl text-slate-300">Loading projects...</div>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">No projects yet</h2>
              <p className="text-slate-400 mb-6">Create your first project to start tracking materials</p>
              <Link
                href="/projects/create"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                Create First Project
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition cursor-pointer"
                  onClick={() => router.push(`/projects/${project.id}`)}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                  <p className="text-slate-400 text-sm mb-2">
                    Project #: <span className="font-mono">{project.project_number}</span>
                  </p>
                  {project.budget && (
                    <p className="text-slate-400 text-sm mb-4">
                      Budget: <span className="text-green-400">${project.budget.toLocaleString()}</span>
                    </p>
                  )}
                  <p className="text-slate-500 text-xs mb-4">
                    Created: {new Date(project.created_at).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/projects/${project.id}`);
                      }}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
                    >
                      View Materials
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project.id);
                      }}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
