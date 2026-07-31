"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, ArrowRight, BookOpen, GraduationCap, ShieldCheck, Lock, Mail, User } from "lucide-react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Redirect to auth portal or test engine
    setTimeout(() => {
      window.location.href = "https://auth.vigyanprep.com";
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#120e08] text-amber-50 selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* Blueprint Grid Watermark */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#fcd34d_1px,transparent_1px)] [background-size:28px_28px] z-0" />

      <main className="relative z-10 pt-32 pb-24 px-4 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Left Side: Handcrafted Sketch Illustration & Quotes */}
        <div className="flex-1 space-y-6 text-left max-w-lg">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400" /> Student Portal Access
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 leading-tight">
            Gateway to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Scientific Excellence</span>
          </h1>

          <p className="text-neutral-300 text-sm leading-relaxed font-light">
            Log in to access your proctored test series, official PYQ archives, AIR performance rank analytics, and detailed step-by-step solutions.
          </p>

          {/* Hand-Drawn Sketch Box */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-dashed border-amber-500/30 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-4">
              <svg className="w-12 h-12 text-amber-400 shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(30 50 50)" />
                <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(-30 50 50)" />
                <circle cx="50" cy="50" r="6" fill="#e8720a" />
              </svg>
              <div>
                <h4 className="font-serif text-base font-semibold text-amber-200">Exclusive Premium Series</h4>
                <p className="text-xs text-neutral-400 font-light mt-0.5">Uncompromised research-grade test environment.</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-300/80 font-mono">
              <span>✓ IISER IAT</span>
              <span>✓ NISER NEST</span>
              <span>✓ IISc & CMI</span>
            </div>
          </div>
        </div>

        {/* Right Side: Modern Glassmorphic Login Card */}
        <div className="w-full max-w-md p-8 rounded-3xl bg-neutral-900/90 border border-amber-500/30 backdrop-blur-xl shadow-2xl shadow-black/80">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <button
              onClick={() => setIsSignUp(false)}
              className={`text-sm font-semibold pb-1 transition-colors ${
                !isSignUp ? "text-amber-400 border-b-2 border-amber-400" : "text-neutral-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`text-sm font-semibold pb-1 transition-colors ${
                isSignUp ? "text-amber-400 border-b-2 border-amber-400" : "text-neutral-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/80" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/80" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/80" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Connecting..." : isSignUp ? "Create Account &rarr;" : "Sign In &rarr;"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
