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
    <div>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <i className="fas fa-cogs"></i>
            <span>Material Manager</span>
          </div>
          <ul className="nav-menu">
            <li><Link href="/dashboard" className="nav-link" data-tooltip="Welcome to your dashboard">Dashboard</Link></li>
            <li><Link href="/projects" className="nav-link" data-tooltip="Manage your projects">Projects</Link></li>
            <li>
              <span className="text-slate-400">{user?.email}</span>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="btn btn-danger"
                data-tooltip="Sign out of your account"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container" style={{ paddingTop: '6rem' }}>
        {children}
      </main>
    </div>
  );
}
