"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Atom,
  TrendingUp,
  FileText,
  Play,
  ArrowRight,
  ClipboardList,
  BarChart3,
  Brain,
  Sparkles,
  X,
} from "lucide-react";

export default function HorizontalCbtShowcase() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0c10] text-[#e6e8ec] overflow-hidden select-none border-t border-b border-white/[0.06]">
      {/* Ambient background glow & celestial backdrop */}
      <div className="absolute top-1/3 right-1/4 w-[650px] h-[450px] bg-gradient-to-br from-amber-500/[0.08] via-amber-600/[0.04] to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-amber-700/[0.05] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ═══════════ MAIN 2-COLUMN HERO ═══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-16 lg:mb-20">
          {/* Left Column: Typography, Badges, CTAs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/[0.08] border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Platform Preview</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.12] text-white">
              <span>Same Questions.</span>
              <br />
              <span
                className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 bg-clip-text text-transparent italic font-normal"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
              >
                Real Exam
              </span>{" "}
              <span>Experience.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Our platform{" "}
              <strong className="text-white font-medium">
                perfectly replicates the TCS-iON CBT environment
              </strong>{" "}
              for{" "}
              <strong className="text-white font-medium">
                IISER IAT &amp; NISER NEST
              </strong>{" "}
              — from the 60-question palette to instant All-India percentile rankings.
            </p>

            {/* 4 Feature Pills in Row */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div>
                  <div className="font-bold text-white font-mono">100%</div>
                  <div className="text-[10px] text-neutral-400">NTA Pattern</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Atom className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div>
                  <div className="font-bold text-white font-mono">KaTeX</div>
                  <div className="text-[10px] text-neutral-400">Scientific Formulas</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div>
                  <div className="font-bold text-white font-mono">Instant</div>
                  <div className="text-[10px] text-neutral-400">AIR Percentiles</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div>
                  <div className="font-bold text-white font-mono">Detailed</div>
                  <div className="text-[10px] text-neutral-400">Performance Analysis</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/tests"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_25px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.35)] transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Test Series</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="px-5 py-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 hover:border-amber-400/40 font-semibold text-xs flex items-center gap-2 transition cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-white text-white translate-x-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right Column: Realistic Desktop / Laptop Display */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {/* The Laptop Visual with Books and Ambient Space Glow */}
            <div className="relative w-full max-w-[680px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] group">
              <Image
                src="/images/cbt-laptop-preview.webp"
                alt="VigyanPrep Authentic TCS-iON CBT Platform on Desktop"
                width={720}
                height={480}
                priority
                className="w-full h-auto object-contain rounded-xl select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {/* Click-through overlay to open Student Portal */}
              <a
                href="https://test.vigyanprep.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20 cursor-pointer"
                title="Click to open VigyanPrep Student CBT Test Portal"
              >
                <span className="sr-only">Open VigyanPrep Student CBT Portal</span>
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════ BOTTOM 4-CARD FEATURE STRIP ═══════════ */}
        <div className="pt-10 border-t border-white/[0.07] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Card 1: CBT Like Interface */}
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-full bg-amber-500/[0.08] border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                TCS-iON CBT Like Interface
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Exact interface &amp; question palette for real exam practice.
              </p>
            </div>
          </div>

          {/* Card 2: All-India Rankings */}
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-full bg-amber-500/[0.08] border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                All-India Rankings
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Compare your percentile with aspirants across India.
              </p>
            </div>
          </div>

          {/* Card 3: Detailed Analytics */}
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-full bg-amber-500/[0.08] border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                Detailed Analytics
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Topic-wise strengths, weakness and AI-powered insights.
              </p>
            </div>
          </div>

          {/* Card 4: Adaptive Practice */}
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-full bg-amber-500/[0.08] border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                Adaptive Practice
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Smart question selection based on your performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ WATCH DEMO MODAL ═══════════ */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-[#12141a] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="text-base font-bold text-white">VigyanPrep CBT Environment Tour</h3>
            </div>

            <div className="aspect-video w-full rounded-xl bg-black/60 border border-white/5 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Play className="w-7 h-7 fill-amber-400 translate-x-0.5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Full-Screen CBT Simulator Walkthrough</p>
                <p className="text-xs text-neutral-400 mt-1 max-w-md">
                  Experience the exact NTA TCS-iON room with 60 questions, live KaTeX formula rendering, timer, and All-India percentile scorecard.
                </p>
              </div>
              <a
                href="https://test.vigyanprep.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition"
              >
                Launch Live Portal →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
