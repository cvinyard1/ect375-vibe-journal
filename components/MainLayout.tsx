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
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#6D8196]/95 border-b border-[#FFFFE3]/20 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 bubble-ui">
            <h1 className="text-2xl font-bold text-[#FFFFE3]">Material Manager</h1>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard" className="bubble-ui">
              Dashboard
            </Link>
            <Link href="/projects" className="bubble-ui">
              Projects
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-[#FFFFE3]/90">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="bubble-ui"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">{children}</main>
    </div>
  );
}
