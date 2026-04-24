"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/MainLayout";
import { MaterialForm } from "@/components/MaterialForm";
import Link from "next/link";

export default function CreateMaterialPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from("materials")
        .insert([
          {
            project_id: projectId,
            ...data,
          },
        ]);

      if (insertError) throw insertError;
      router.push(`/projects/${projectId}/materials`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create material");
    } finally {
      setLoading(false);
    }
  };

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
              <h1 className="section-title text-4xl" style={{margin: 0}}>Add New Material</h1>
            </div>

            <div className="card">
              <MaterialForm
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
