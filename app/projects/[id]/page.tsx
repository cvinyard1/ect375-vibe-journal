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
          <div className="text-center py-12">
            <div className="text-xl text-slate-300">Loading project...</div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  if (!project) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="text-center py-12">
            <div className="text-xl text-slate-300">Project not found</div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="py-8">
          <div className="mb-8">
            <Link
              href="/projects"
              className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
            >
              ← Back to Projects
            </Link>
            <h1 className="text-4xl font-bold text-white">{project.name}</h1>
            <p className="text-slate-400 text-lg">
              Project #{project.project_number}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-sm font-medium text-slate-400 mb-2">Project Number</h3>
              <p className="text-2xl font-bold text-white font-mono">{project.project_number}</p>
            </div>

            {project.budget && (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-sm font-medium text-slate-400 mb-2">Budget</h3>
                <p className="text-2xl font-bold text-green-400">
                  ${project.budget.toLocaleString()}
                </p>
              </div>
            )}

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-sm font-medium text-slate-400 mb-2">Created</h3>
              <p className="text-lg text-white">{new Date(project.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {project.description && (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <p className="text-slate-300">{project.description}</p>
            </div>
          )}

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Materials</h2>
              <Link
                href={`/projects/${projectId}/materials/create`}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                + Add Material
              </Link>
            </div>

            <Link
              href={`/projects/${projectId}/materials`}
              className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              View All Materials
            </Link>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
