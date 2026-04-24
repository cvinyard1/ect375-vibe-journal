"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/MainLayout";

export default function CreateProjectPage() {
  const [name, setName] = useState("");
  const [projectNumber, setProjectNumber] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        throw new Error("You must be signed in to create a project.");
      }

      const { error: insertError } = await supabase.from("projects").insert([
        {
          user_id: user.id,
          name,
          project_number: projectNumber,
          budget: budget ? parseFloat(budget) : null,
          description: description || null,
        },
      ]);

      if (insertError) {
        throw new Error(insertError.message || "Failed to create project");
      }

      router.push("/projects");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError(JSON.stringify(err) || "Failed to create project");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="section">
          <div className="container max-w-2xl mx-auto">
            <h1 className="section-title text-4xl mb-8">Create New Project</h1>

            <form onSubmit={handleSubmit} className="card">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Project Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="form-control"
                  placeholder="e.g., Union Hospital Renovation"
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectNumber" className="form-label">
                  Project Number *
                </label>
                <input
                  id="projectNumber"
                  type="text"
                  value={projectNumber}
                  onChange={(e) => setProjectNumber(e.target.value)}
                  required
                  className="form-control"
                  placeholder="e.g., UH-2024-001"
                />
                <p className="text-xs text-slate-400 mt-2">Used for organization and identification</p>
              </div>

              <div className="form-group">
                <label htmlFor="budget" className="form-label">
                  Project Budget (Optional)
                </label>
                <input
                  id="budget"
                  type="number"
                  step="0.01"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="form-control"
                  placeholder="e.g., 50000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  placeholder="Add any additional notes or details about the project"
                />
              </div>

              {error && (
                <div className="form-group p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary flex-1 justify-center"
                >
                  <i className="fas fa-plus"></i> {loading ? "Creating..." : "Create Project"}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/projects")}
                  className="btn btn-outline flex-1 justify-center"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
