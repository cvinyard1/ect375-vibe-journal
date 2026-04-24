"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/MainLayout";
import { Project } from "@/lib/types";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (error) throw error;
      setProject(data);
    } catch (err) {
      console.error("Error fetching project:", err);
      router.push("/projects");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="section text-center py-12">
            <div className="text-xl text-slate-300"><i className="fas fa-spinner fa-spin"></i> Loading project...</div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  if (!project) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="section text-center py-12">
            <div className="text-xl text-slate-300">Project not found</div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="section">
          <div className="container">
            <div className="mb-8">
              <Link
                href="/projects"
                className="text-blue-400 hover:text-blue-300 mb-4 inline-block transition"
              >
                <i className="fas fa-arrow-left"></i> Back to Projects
              </Link>
              <h1 className="section-title text-4xl mb-2" style={{margin: 0}}>{project.name}</h1>
              <p className="text-slate-400 text-lg">
                Project #{project.project_number}
              </p>
            </div>

            <div className="grid">
              <div className="card">
                <h3 className="text-sm font-medium text-slate-400 mb-2">Project Number</h3>
                <p className="text-2xl font-bold font-mono text-white">{project.project_number}</p>
              </div>

              {project.budget && (
                <div className="card">
                  <h3 className="text-sm font-medium text-slate-400 mb-2">Budget</h3>
                  <p className="text-2xl font-bold text-green-400">
                    ${project.budget.toLocaleString()}
                  </p>
                </div>
              )}

              <div className="card">
                <h3 className="text-sm font-medium text-slate-400 mb-2">Created</h3>
                <p className="text-2xl font-bold text-white">{new Date(project.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            {project.description && (
              <div className="card mb-8">
                <h3 className="card-title mb-2">Description</h3>
                <p className="card-text mb-0">{project.description}</p>
              </div>
            )}

            <div className="card">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h2 className="card-title m-0">Materials</h2>
                <Link
                  href={`/projects/${projectId}/materials/create`}
                  className="btn btn-success"
                >
                  <i className="fas fa-plus"></i> Add Material
                </Link>
              </div>

              <Link
                href={`/projects/${projectId}/materials`}
                className="btn btn-primary"
              >
                <i className="fas fa-list"></i> View All Materials
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
