import React, { useState } from "react";
import { UseLogin } from "../../hooks/useLogin";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setuserPassword] = useState("");
  const { loading, login } = UseLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ userName, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96">
      <div className="w-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center border-b border-white/10">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-white/40 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition-all"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition-all"
              value={password}
              onChange={(e) => setuserPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-1 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white font-semibold text-sm tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-white/40 text-sm">
            No account?{" "}
            <a href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Create one
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
