"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/MainLayout";
import { MaterialForm } from "@/components/MaterialForm";
import { Material } from "@/lib/types";
import Link from "next/link";

export default function EditMaterialPage() {
  const params = useParams();
  const projectId = params.id as string;
  const materialId = params.materialId as string;
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchMaterial();
  }, [materialId]);

  const fetchMaterial = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from("materials")
        .select("*")
        .eq("id", materialId)
        .single();

      if (fetchError) throw fetchError;
      setMaterial(data);
    } catch (err) {
      console.error("Error fetching material:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch material");
      router.push(`/projects/${projectId}/materials`);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from("materials")
        .update(data)
        .eq("id", materialId);

      if (updateError) throw updateError;
      router.push(`/projects/${projectId}/materials`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update material");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="section text-center py-12">
            <div className="text-xl text-slate-300"><i className="fas fa-spinner fa-spin"></i> Loading material...</div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  if (!material) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="section text-center py-12">
            <div className="text-xl text-slate-300">Material not found</div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="section">
          <div className="container max-w-2xl mx-auto">
            <div className="mb-8">
              <Link
                href={`/projects/${projectId}/materials`}
                className="text-blue-400 hover:text-blue-300 mb-4 inline-block transition"
              >
                <i className="fas fa-arrow-left"></i> Back to Materials
              </Link>
              <h1 className="section-title text-4xl mb-2" style={{margin: 0}}>Edit Material</h1>
              <p className="text-slate-400 font-mono text-lg">{material.material_name}</p>
            </div>

            <div className="card">
              <MaterialForm
                initialData={material}
                onSubmit={handleSubmit}
                isLoading={loading}
                error={error}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
