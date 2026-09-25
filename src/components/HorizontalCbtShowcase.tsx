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
  ExternalLink,
} from "lucide-react";

export default function HorizontalCbtShowcase() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative w-full bg-[#08090c] text-[#e6e8ec] overflow-hidden select-none border-t border-b border-white/[0.06]">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-amber-500/[0.07] via-amber-600/[0.03] to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-amber-600/[0.04] blur-[120px] pointer-events-none rounded-full" />

      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP & TABLET VIEW (md and up):
          Pixel-Perfect Uncut Retina Artwork with Interactive SaaS Hotspots
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_60px_rgba(245,158,11,0.05)] border border-white/[0.08] group">
          {/* Main Uncut Retina Showcase Visual */}
          <Image
            src="/images/cbt-showcase-retina.webp"
            alt="VigyanPrep Authentic TCS-iON CBT Platform — Same Questions. Real Exam Experience."
            width={2048}
            height={1246}
            priority
            quality={95}
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* ─── INTERACTIVE CLICK HOTSPOTS ─── */}

          {/* Hotspot 1: Explore Test Series Button */}
          <Link
            href="/tests"
            className="absolute left-[3.8%] top-[54.5%] w-[16.5%] h-[6.8%] rounded-full cursor-pointer transition-all duration-250 hover:bg-amber-400/[0.15] hover:ring-2 hover:ring-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center group/btn"
            title="Explore VigyanPrep Test Series & Free CBT Mocks"
          >
            <span className="sr-only">Explore Test Series</span>
          </Link>

          {/* Hotspot 2: Watch Demo Button */}
          <button
            type="button"
            onClick={() => setShowDemoModal(true)}
            className="absolute left-[20.8%] top-[54.5%] w-[12%] h-[6.8%] rounded-full cursor-pointer transition-all duration-250 hover:bg-white/[0.12] hover:ring-2 hover:ring-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center group/demo"
            title="Watch Full-Screen Interactive CBT Simulator Demo"
          >
            <span className="sr-only">Watch Demo</span>
          </button>

          {/* Hotspot 3: Laptop Display — Links directly to live Student Portal */}
          <a
            href="https://test.vigyanprep.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-[40.5%] top-[14.5%] w-[56.5%] h-[64%] rounded-2xl cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-amber-400/40 hover:bg-amber-500/[0.03]"
            title="Click to launch the live VigyanPrep Student CBT Test Portal"
          >
            <span className="sr-only">Open Student CBT Portal</span>
            {/* Subtle floating launch indicator on hover */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-amber-400 flex items-center gap-1.5 shadow-xl">
              <span>Launch Live CBT</span>
              <ExternalLink size={12} />
            </div>
          </a>

          {/* Hotspots 4-7: Bottom 4 Feature Cards */}
          <Link
            href="/tests"
            className="absolute left-[2.5%] bottom-[2.5%] w-[23%] h-[16%] rounded-xl cursor-pointer transition-all hover:bg-white/[0.04] hover:ring-1 hover:ring-white/20"
            title="Learn about TCS-iON CBT Like Interface"
          >
            <span className="sr-only">TCS-iON CBT Interface</span>
          </Link>

          <Link
            href="/tests"
            className="absolute left-[26.5%] bottom-[2.5%] w-[23%] h-[16%] rounded-xl cursor-pointer transition-all hover:bg-white/[0.04] hover:ring-1 hover:ring-white/20"
            title="Learn about All-India Rankings"
          >
            <span className="sr-only">All-India Rankings</span>
          </Link>

          <Link
            href="/pyq"
            className="absolute left-[50.5%] bottom-[2.5%] w-[23%] h-[16%] rounded-xl cursor-pointer transition-all hover:bg-white/[0.04] hover:ring-1 hover:ring-white/20"
            title="Learn about Detailed Analytics"
          >
            <span className="sr-only">Detailed Analytics</span>
          </Link>

          <a
            href="https://test.vigyanprep.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-[74.5%] bottom-[2.5%] w-[23%] h-[16%] rounded-xl cursor-pointer transition-all hover:bg-white/[0.04] hover:ring-1 hover:ring-white/20"
            title="Learn about Adaptive Practice"
          >
            <span className="sr-only">Adaptive Practice</span>
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE VIEW (< md screens):
          Fully Responsive Clean Vertical Stack — Razor-Sharp Legibility
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="block md:hidden px-4 py-16 space-y-8 max-w-xl mx-auto">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/[0.08] border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Platform Preview</span>
        </div>

        {/* Mobile Headline */}
        <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-white">
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

        {/* Mobile Subtitle */}
        <p className="text-neutral-400 text-sm leading-relaxed">
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

        {/* Mobile 4 Feature Badges */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="flex items-center gap-2 text-xs text-neutral-300 bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.06]">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white font-mono">100%</div>
              <div className="text-[10px] text-neutral-400">NTA Pattern</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-300 bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.06]">
            <Atom className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white font-mono">KaTeX</div>
              <div className="text-[10px] text-neutral-400">Formulas</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-300 bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.06]">
            <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white font-mono">Instant</div>
              <div className="text-[10px] text-neutral-400">AIR Percentile</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-300 bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.06]">
            <FileText className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white font-mono">Detailed</div>
              <div className="text-[10px] text-neutral-400">Analysis</div>
            </div>
          </div>
        </div>

        {/* Mobile CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
          <Link
            href="/tests"
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-center"
          >
            <span>Explore Test Series</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={() => setShowDemoModal(true)}
            className="w-full py-3.5 px-5 rounded-full bg-zinc-900 border border-white/10 text-zinc-200 font-semibold text-xs flex items-center justify-center gap-2"
          >
            <Play className="w-3 h-3 fill-white text-white" />
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Mobile Laptop Visual */}
        <div className="relative pt-4">
          <Image
            src="/images/cbt-laptop-preview.webp"
            alt="VigyanPrep Student CBT Test Portal"
            width={720}
            height={480}
            className="w-full h-auto rounded-xl border border-white/[0.08] shadow-2xl"
          />
        </div>

        {/* Mobile 4 Feature Cards */}
        <div className="space-y-3 pt-4 border-t border-white/[0.07]">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <ClipboardList className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">TCS-iON CBT Like Interface</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">Exact interface &amp; question palette for real exam practice.</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">All-India Rankings</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">Compare your percentile with aspirants across India.</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <FileText className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Detailed Analytics</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">Topic-wise strengths, weakness and AI-powered insights.</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <Brain className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Adaptive Practice</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">Smart question selection based on your performance.</div>
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
