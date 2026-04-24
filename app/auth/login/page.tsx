"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("Login page - Auth state:", { session: !!session, authLoading });
    
    if (!authLoading && session) {
      console.log("User already logged in, redirecting to dashboard");
      router.push("/dashboard");
    }
  }, [session, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("Attempting login for:", email);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Login result:", { data: !!data, error: authError });

      if (authError) {
        setError(authError.message);
      } else {
        console.log("Login successful, redirect will happen via AuthContext");
        // Redirect will happen via the useEffect above when session updates
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while auth is being checked
  if (authLoading) {
    return (
      <div className="hero min-h-screen items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
          <p className="text-slate-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If user is already logged in, show redirect message
  if (session) {
    return (
      <div className="hero min-h-screen items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
          <p className="text-slate-400">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero min-h-screen flex items-center justify-center" style={{padding: "2rem"}}>
      <div className="card w-full max-w-md p-8" style={{animation: "fadeInUp 0.6s ease-out"}}>
        <div className="text-center mb-8">
           <i className="fas fa-cogs text-4xl text-blue-500 mb-4"></i>
           <h1 className="text-3xl font-bold mb-2">Login</h1>
           <p className="text-slate-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="form-group p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300 text-sm mt-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-slate-700 pt-6">
          <p className="text-slate-400">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300 font-medium transition">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
