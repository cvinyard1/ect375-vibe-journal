"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Material Manager</h1>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition">
              Dashboard
            </Link>
            <Link href="/projects" className="text-slate-300 hover:text-white transition">
              Projects
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-slate-300">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
