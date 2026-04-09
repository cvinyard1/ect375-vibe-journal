export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Material Management System
        </h1>
        <p className="text-xl text-slate-300 mb-8">
          Construction material tracking for Union Hospital
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/auth/login"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Login
          </a>
          <a
            href="/auth/signup"
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
