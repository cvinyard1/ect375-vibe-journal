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
          <div className="section text-center py-12">
            <div className="text-xl text-slate-300"><i className="fas fa-spinner fa-spin"></i> Loading...</div>
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
                href={`/projects/${projectId}`}
                className="text-blue-400 hover:text-blue-300 mb-4 inline-block transition"
              >
                <i className="fas fa-arrow-left"></i> Back to {project.name}
              </Link>
              <h1 className="section-title text-4xl" style={{margin: 0}}>Materials</h1>
            </div>

            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
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
                className="btn btn-success"
              >
                <i className="fas fa-plus"></i> Add Material
              </Link>
            </div>

            {materials.length === 0 ? (
              <div className="card text-center flex flex-col items-center justify-center p-12">
                <div className="card-icon mb-6" style={{background: 'linear-gradient(135deg, var(--secondary-color), var(--secondary-hover))'}}>
                  <i className="fas fa-box-open"></i>
                </div>
                <h2 className="card-title">No materials yet</h2>
                <p className="card-text mb-6">Start adding materials to track for this project</p>
                <Link
                  href={`/projects/${projectId}/materials/create`}
                  className="btn btn-primary"
                >
                  <i className="fas fa-plus"></i> Add First Material
                </Link>
              </div>
            ) : (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="font-mono">Part #</th>
                      <th>Material Name</th>
                      <th className="text-center">Ordered</th>
                      <th className="text-center">Received</th>
                      <th className="text-center">Needed</th>
                      <th className="text-center">Status</th>
                      <th className="text-right">Unit Price</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((material) => (
                      <tr key={material.id}>
                        <td className="font-mono text-slate-300">{material.part_number}</td>
                        <td className="text-white">{material.material_name}</td>
                        <td className="text-center text-slate-300">{material.quantity_ordered}</td>
                        <td className="text-center text-slate-300">{material.quantity_received}</td>
                        <td className="text-center text-slate-300">{material.quantity_needed}</td>
                        <td className="text-center">
                          <span className={`badge ${
                            material.status === "received" ? "badge-success" :
                            material.status === "ordered" ? "badge-primary" :
                            "badge-warning"
                          }`}>
                            {material.status}
                          </span>
                        </td>
                        <td className="text-right text-slate-300 font-mono">
                          {material.unit_price ? `$${material.unit_price.toFixed(2)}` : "—"}
                        </td>
                        <td className="text-right space-x-2">
                          <button
                            onClick={() => router.push(`/projects/${projectId}/materials/${material.id}/edit`)}
                            className="btn btn-outline"
                            style={{padding: '0.25rem 0.75rem', fontSize: '0.875rem'}}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(material.id)}
                            className="btn btn-danger"
                            style={{padding: '0.25rem 0.75rem', fontSize: '0.875rem'}}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
