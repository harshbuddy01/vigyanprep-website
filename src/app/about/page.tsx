"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sparkles,
  BookOpen,
  Compass,
  GraduationCap,
  Award,
  Globe2,
  CheckCircle2,
  Atom,
  FlaskConical,
  Microscope,
  Scroll,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#120e08] text-amber-50 selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* Blueprint Grid Watermark */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#fcd34d_1px,transparent_1px)] [background-size:28px_28px] z-0" />

      {/* HERO SECTION */}
      <header className="relative z-10 pt-36 pb-20 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4 text-amber-400" /> The Philosophy & Mission
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-amber-100 via-amber-200 to-amber-500 bg-clip-text text-transparent mb-6 leading-tight">
          What is <em className="italic text-amber-400 font-serif">Vigyan</em>?
        </h1>

        <p className="text-neutral-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-light">
          Derived from the ancient Sanskrit <span className="text-amber-300 font-semibold">&lsquo;விज्ञान&rsquo; (Vi + Gyan)</span> — where <strong className="text-amber-200">Vi</strong> signifies &ldquo;Supreme & Empirical&rdquo; and <strong className="text-amber-200">Gyan</strong> represents &ldquo;Knowledge&rdquo;.
        </p>

        {/* Handcrafted Sketch Illustration Header */}
        <div className="relative mt-12 max-w-3xl mx-auto p-8 rounded-3xl bg-neutral-900/60 border border-amber-500/20 backdrop-blur-md overflow-hidden">
          {/* SVG Hand-Drawn Sketch Graphics */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Sketch Item 1 */}
            <div className="flex flex-col items-center p-4 border border-dashed border-amber-500/30 rounded-2xl bg-neutral-950/40">
              <svg className="w-16 h-16 text-amber-400 mb-3" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                {/* Hand-drawn Desk Lamp & Book */}
                <path d="M20 80 Q 25 40 50 30 T 70 20" strokeDasharray="3 3" />
                <path d="M60 15 L 80 25 L 65 35 Z" fill="rgba(212,165,32,0.2)" />
                <path d="M30 85 L 70 85 M 35 75 L 65 75 M 40 65 L 60 65" />
                <circle cx="70" cy="23" r="10" stroke="var(--gold-light)" strokeDasharray="2 2" />
              </svg>
              <h4 className="font-serif text-base font-semibold text-amber-200">1. Late Night Inquiry</h4>
              <p className="text-xs text-neutral-400 text-center mt-1">Curious minds sketching hypotheses under the study lamp.</p>
            </div>

            {/* Sketch Item 2 */}
            <div className="flex flex-col items-center p-4 border border-dashed border-amber-500/30 rounded-2xl bg-neutral-950/40">
              <svg className="w-16 h-16 text-amber-400 mb-3" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                {/* Hand-drawn Atomic Orbitals & Formulas */}
                <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(30 50 50)" />
                <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(-30 50 50)" />
                <circle cx="50" cy="50" r="6" fill="#e8720a" />
                <path d="M15 20 L 35 20 M 25 10 L 25 30" stroke="rgba(242,234,216,0.5)" />
              </svg>
              <h4 className="font-serif text-base font-semibold text-amber-200">2. Empirical Rigor</h4>
              <p className="text-xs text-neutral-400 text-center mt-1">Rigorous proctored PYQ practice & analytical depth.</p>
            </div>

            {/* Sketch Item 3 */}
            <div className="flex flex-col items-center p-4 border border-dashed border-amber-500/30 rounded-2xl bg-neutral-950/40">
              <svg className="w-16 h-16 text-amber-400 mb-3" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                {/* Hand-drawn University Spires / Global Gateways */}
                <path d="M20 85 L 20 50 L 35 35 L 50 50 L 50 85 Z" />
                <path d="M50 85 L 50 40 L 65 25 L 80 40 L 80 85 Z" />
                <path d="M35 35 L 35 20 L 30 20" />
                <circle cx="65" cy="45" r="5" stroke="var(--gold-light)" />
              </svg>
              <h4 className="font-serif text-base font-semibold text-amber-200">3. Global Research</h4>
              <p className="text-xs text-neutral-400 text-center mt-1">Entry to IISERs, NISER, IISc & premier global universities.</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <span className="font-sans text-xs text-amber-300/80 italic">
              &ldquo;We don&apos;t build commercial test engines. We engineer the launchpad for tomorrow&apos;s Nobel Laureates.&rdquo;
            </span>
          </div>
        </div>
      </header>

      {/* WHY VIGYAN.PREP WAS LAUNCHED */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Uncompromising Quality</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold mt-2 text-neutral-100">
            Why We Launched Vigyan.prep
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-neutral-900/70 border border-amber-500/20 hover:border-amber-400 transition-all">
            <div className="p-3 w-fit rounded-2xl bg-amber-500/10 text-amber-400 mb-6">
              <Scroll className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-amber-100 mb-3">
              Built Exclusively for Science Aspirants
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              Generic coaching platforms treat IISER IAT and NISER NEST as secondary afterthoughts behind JEE/NEET. Vigyan.prep was built ground-up <strong className="text-amber-200">exclusively for pure science research entrance exams</strong>.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-neutral-900/70 border border-amber-500/20 hover:border-amber-400 transition-all">
            <div className="p-3 w-fit rounded-2xl bg-amber-500/10 text-amber-400 mb-6">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-amber-100 mb-3">
              Uncompromised Premium Guarantee
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              You will <strong className="text-amber-200">never find generic low-quality filler questions</strong> across our platform. Every question paper is curated by IISER alumni, PhD researchers, and top rankers to mirror exact exam blueprints.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-neutral-900/70 border border-amber-500/20 hover:border-amber-400 transition-all">
            <div className="p-3 w-fit rounded-2xl bg-amber-500/10 text-amber-400 mb-6">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-amber-100 mb-3">
              Proctored Black Exam Portal
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              Practice in the exact zero-distraction black portal engine used by national testing agencies, complete with NTA-style palettes, section timers, and tab-switch warning proctoring.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 rounded-3xl bg-neutral-900/70 border border-amber-500/20 hover:border-amber-400 transition-all">
            <div className="p-3 w-fit rounded-2xl bg-amber-500/10 text-amber-400 mb-6">
              <Globe2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-amber-100 mb-3">
              Pathway to Global Scientific Excellence
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              Our students go beyond cracking exams — they step into IISERs, NISER, IISc Bangalore, CMI, and later pursue PhDs at MIT, Cambridge, Harvard, and Max Planck Institutes.
            </p>
          </div>
        </div>
      </section>

      {/* HANDCRAFTED STUDENT JOURNEY TIMELINE */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 border border-amber-500/30 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">The Student Journey</span>
            <h3 className="font-serif text-3xl font-bold text-amber-100 mt-2">
              From Aspirant to Scientific Leader
            </h3>
          </div>

          <div className="space-y-8 relative before:absolute before:left-4 sm:before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:to-orange-500">
            {/* Step 1 */}
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="sm:w-1/2 sm:pr-8 text-left sm:text-right">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Step 01</span>
                <h4 className="font-serif text-xl font-bold text-amber-100 mt-1">Foundation & Concept Mastery</h4>
                <p className="text-xs text-neutral-300 mt-2 font-light">Deep dive into Physics, Chemistry, Math & Biology concepts tailored for IISER IAT & NEST patterns.</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center z-10 shrink-0 shadow-lg shadow-amber-500/50">
                1
              </div>
              <div className="sm:w-1/2 sm:pl-8" />
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="sm:w-1/2 sm:pr-8" />
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center z-10 shrink-0 shadow-lg shadow-amber-500/50">
                2
              </div>
              <div className="sm:w-1/2 sm:pl-8 text-left">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Step 02</span>
                <h4 className="font-serif text-xl font-bold text-amber-100 mt-1">Timed PYQ & Mock Testing</h4>
                <p className="text-xs text-neutral-300 mt-2 font-light">Attempt 8+ years of official PYQs inside our timed proctored exam engine with instant score diagnostics.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="sm:w-1/2 sm:pr-8 text-left sm:text-right">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Step 03</span>
                <h4 className="font-serif text-xl font-bold text-amber-100 mt-1">Selection & Institutional Entry</h4>
                <p className="text-xs text-neutral-300 mt-2 font-light">Securing top AIR Ranks in IAT/NEST to join IISER Pune, Kolkata, Mohali, Bhopal, TVM, Tirupati, Berhampur & NISER.</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center z-10 shrink-0 shadow-lg shadow-amber-500/50">
                3
              </div>
              <div className="sm:w-1/2 sm:pl-8" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
