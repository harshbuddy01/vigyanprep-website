"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Compass, Award, Atom, FlaskConical, Microscope, Dna } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 pb-20 bg-[#120e08] overflow-hidden">
      {/* Animated Orbitals Canvas / SVG Background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
        <svg className="w-[800px] h-[800px] text-amber-400 animate-spin-slow" viewBox="0 0 500 500" fill="none" stroke="currentColor">
          <ellipse cx="250" cy="250" rx="220" ry="80" strokeWidth="1" strokeDasharray="4 6" transform="rotate(0 250 250)" />
          <ellipse cx="250" cy="250" rx="220" ry="80" strokeWidth="1" strokeDasharray="4 6" transform="rotate(60 250 250)" />
          <ellipse cx="250" cy="250" rx="220" ry="80" strokeWidth="1" strokeDasharray="4 6" transform="rotate(120 250 250)" />
          <circle cx="250" cy="250" r="24" fill="#e8720a" opacity="0.6" />
        </svg>
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,transparent_30%,#120e08_90%)]" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400" /> India&apos;s Premier Science Research Entrance Platform
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl font-bold text-neutral-100 leading-tight tracking-tight">
          Gateway to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500">Future Science</span>
        </h1>

        <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
          Prepare for <strong className="text-amber-200 font-semibold">IISER IAT, NISER NEST, IISc Bangalore & CMI</strong> with uncompromised research-grade test series, 8+ years official PYQ intelligence, and live proctored mock exams.
        </p>

        {/* Action CTA Buttons */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://auth.vigyanprep.com"
            className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:scale-105 transition-all shadow-xl shadow-amber-500/25 flex items-center gap-2"
          >
            Start Learning <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/pyq"
            className="px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-100 border border-amber-500/30 bg-neutral-900/60 backdrop-blur-md hover:border-amber-400 hover:text-amber-300 transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-amber-400" /> Explore PYQ Archives
          </Link>
        </div>

        {/* Feature Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-12 border-t border-white/10 text-left">
          <div className="p-4 rounded-2xl bg-neutral-900/40 border border-white/5">
            <Atom className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className="font-serif font-semibold text-sm text-neutral-200">Physics Mastery</h4>
            <p className="text-[11px] text-neutral-400 mt-1">Mechanics, Quantum & Electrodynamics</p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-900/40 border border-white/5">
            <FlaskConical className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className="font-serif font-semibold text-sm text-neutral-200">Chemistry Precision</h4>
            <p className="text-[11px] text-neutral-400 mt-1">Organic Mechanisms & Physical Equilibria</p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-900/40 border border-white/5">
            <Microscope className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className="font-serif font-semibold text-sm text-neutral-200">Biology Depth</h4>
            <p className="text-[11px] text-neutral-400 mt-1">Genetics, Cell Biology & Biotechnology</p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-900/40 border border-white/5">
            <Dna className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className="font-serif font-semibold text-sm text-neutral-200">Math Rigor</h4>
            <p className="text-[11px] text-neutral-400 mt-1">Calculus, Linear Algebra & CMI Proofs</p>
          </div>
        </div>
      </div>
    </section>
  );
}
