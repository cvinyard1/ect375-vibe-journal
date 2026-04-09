"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/MainLayout";
import { Project, Material } from "@/lib/types";
import Link from "next/link";

export default function MaterialsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (projectId) {
      fetchData();
    }
  }, [projectId]);

  const fetchData = async () => {
    try {
      // Fetch project
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (projectError) throw projectError;
      setProject(projectData);

      // Fetch materials
      const { data: materialsData, error: materialsError } = await supabase
        .from("materials")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (materialsError) throw materialsError;
      setMaterials(materialsData || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      router.push("/projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (materialId: string) => {
    if (!confirm("Are you sure you want to delete this material?")) return;

    try {
      const { error } = await supabase.from("materials").delete().eq("id", materialId);
      if (error) throw error;
      setMaterials(materials.filter((m) => m.id !== materialId));
    } catch (err) {
      console.error("Error deleting material:", err);
      alert("Failed to delete material");
    }
  };

  const calculateTotalCost = () => {
    return materials.reduce((total, material) => {
      return total + (material.unit_price || 0) * (material.quantity_received || 0);
    }, 0);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="text-center py-12">
            <div className="text-xl text-slate-300">Loading...</div>
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
              href={`/projects/${projectId}`}
              className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
            >
              ← Back to {project.name}
            </Link>
            <h1 className="text-4xl font-bold text-white">Materials</h1>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-slate-400">
                Total Items: <span className="text-white font-bold">{materials.length}</span>
              </p>
              {calculateTotalCost() > 0 && (
                <p className="text-slate-400">
                  Total Cost: <span className="text-green-400 font-bold">${calculateTotalCost().toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </p>
              )}
            </div>
            <Link
              href={`/projects/${projectId}/materials/create`}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              + Add Material
            </Link>
          </div>

          {materials.length === 0 ? (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">No materials yet</h2>
              <p className="text-slate-400 mb-6">Start adding materials to track for this project</p>
              <Link
                href={`/projects/${projectId}/materials/create`}
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                Add First Material
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto bg-slate-800 border border-slate-700 rounded-lg">
              <table className="w-full">
                <thead className="bg-slate-900 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Part #</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Material Name</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-slate-300">Ordered</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-slate-300">Received</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-slate-300">Needed</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-slate-300">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-300">Unit Price</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {materials.map((material) => (
                    <tr key={material.id} className="hover:bg-slate-700/50 transition">
                      <td className="px-6 py-4 text-sm font-mono text-slate-300">{material.part_number}</td>
                      <td className="px-6 py-4 text-sm text-white">{material.material_name}</td>
                      <td className="px-6 py-4 text-center text-sm text-slate-300">{material.quantity_ordered}</td>
                      <td className="px-6 py-4 text-center text-sm text-slate-300">{material.quantity_received}</td>
                      <td className="px-6 py-4 text-center text-sm text-slate-300">{material.quantity_needed}</td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          material.status === "received" ? "bg-green-900/30 text-green-300" :
                          material.status === "ordered" ? "bg-blue-900/30 text-blue-300" :
                          "bg-yellow-900/30 text-yellow-300"
                        }`}>
                          {material.status.charAt(0).toUpperCase() + material.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-slate-300">
                        {material.unit_price ? `$${material.unit_price.toFixed(2)}` : "—"}
                      </td>
                      <td className="px-6 py-4 text-right text-sm space-x-2">
                        <button
                          onClick={() => router.push(`/projects/${projectId}/materials/${material.id}/edit`)}
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(material.id)}
                          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
