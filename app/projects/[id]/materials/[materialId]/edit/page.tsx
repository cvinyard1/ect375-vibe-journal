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
          <div className="text-center py-12">
            <div className="text-xl text-slate-300">Loading material...</div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  if (!material) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="text-center py-12">
            <div className="text-xl text-slate-300">Material not found</div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="py-8 max-w-2xl mx-auto">
          <div className="mb-8">
            <Link
              href={`/projects/${projectId}/materials`}
              className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
            >
              ← Back to Materials
            </Link>
            <h1 className="text-4xl font-bold text-white">Edit Material</h1>
            <p className="text-slate-400">{material.material_name}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <MaterialForm
              initialData={material}
              onSubmit={handleSubmit}
              isLoading={loading}
              error={error}
            />
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
