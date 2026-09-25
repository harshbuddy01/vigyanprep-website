"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Clock,
  BookOpen,
  Award,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  BarChart3,
  Bookmark,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  Zap,
  Target,
  Brain,
} from "lucide-react";

/* ───── Step Meta ───── */
interface StepMeta {
  id: number;
  label: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

const STEPS: StepMeta[] = [
  {
    id: 0,
    icon: BookOpen,
    label: "Test Catalog",
    title: "Browse & Launch Full-Length CBTs",
    subtitle: "Official IISER IAT & NISER NEST mock tests with hall tickets",
  },
  {
    id: 1,
    icon: Target,
    label: "NTA CBT Room",
    title: "Authentic TCS-iON Exam Simulation",
    subtitle: "60-question palette, live timer, LaTeX equations, +4/-1 marking",
  },
  {
    id: 2,
    icon: BarChart3,
    label: "AIR Scorecard",
    title: "Instant All-India Rank & Percentile",
    subtitle: "Post-submission analytics with subject-wise accuracy breakdown",
  },
  {
    id: 3,
    icon: Brain,
    label: "Adaptive Drill",
    title: "AI-Powered Weak-Spot Mastery",
    subtitle: "Targeted micro-drills, chapter progress rings, and bookmarks",
  },
];

const STEP_DURATION = 7000;

export default function HorizontalCbtShowcase() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  /* ── CBT exam state ── */
  const [selectedOpt, setSelectedOpt] = useState("B");
  const [activeQ, setActiveQ] = useState(14);
  const [timer, setTimer] = useState(9854);
  const [markedReview, setMarkedReview] = useState(false);

  /* ── Adaptive state ── */
  const [bookmarked, setBookmarked] = useState(true);
  const [showSoln, setShowSoln] = useState(true);
  const [adaptiveOpt, setAdaptiveOpt] = useState("C");

  /* Live countdown */
  useEffect(() => {
    const t = setInterval(() => setTimer((p) => (p > 0 ? p - 1 : 10800)), 1000);
    return () => clearInterval(t);
  }, []);

  const fmtTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  /* Auto-play */
  useEffect(() => {
    if (!playing || hovered) return;
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActive((c) => (c + 1) % STEPS.length);
          return 0;
        }
        return p + (50 / STEP_DURATION) * 100;
      });
    }, 50);
    return () => clearInterval(iv);
  }, [playing, hovered]);

  const pick = (i: number) => {
    setActive(i);
    setProgress(0);
  };

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: "linear-gradient(180deg, #07080a 0%, #0a0d14 40%, #0f1420 100%)" }}>
      {/* ═══ Ambient Glow Orbs ═══ */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-gradient-to-b from-amber-500/[0.12] via-amber-600/[0.06] to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/[0.08] to-transparent blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-gradient-to-l from-emerald-600/[0.06] to-transparent blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ═══════════ HEADER ═══════════ */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/[0.08] mb-6">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400 tracking-wide">Interactive Platform Preview</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            <span className="text-white">Reimagine How You</span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent italic" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Prepare
            </span>
            <span className="text-white"> For Science</span>
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            The only platform that <span className="text-white font-medium">perfectly replicates the TCS-iON CBT environment</span> for IISER IAT & NISER NEST — from the 60-question palette to instant All-India percentile rankings.
          </p>

          {/* 3 Trust Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              { icon: ShieldCheck, text: "100% NTA Pattern", color: "text-emerald-400" },
              { icon: Sparkles, text: "KaTeX Scientific Formulas", color: "text-amber-400" },
              { icon: TrendingUp, text: "Instant AIR Percentiles", color: "text-blue-400" },
            ].map((p) => (
              <div key={p.text} className="flex items-center gap-2 text-sm text-neutral-300">
                <p.icon className={`w-4 h-4 ${p.color}`} />
                <span>{p.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════ STEP NAVIGATION ═══════════ */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-6 mb-8">
          {/* Step Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
            {STEPS.map((step, i) => {
              const isActive = active === i;
              const Icon = step.icon;
              return (
                <button
                  key={i}
                  onClick={() => pick(i)}
                  className={`relative group text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-br from-[#161b28] to-[#0f1420] border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.1)]"
                      : "bg-[#0c0f17]/60 border-white/[0.06] hover:border-white/[0.12] hover:bg-[#0e1219]"
                  }`}
                >
                  {/* Progress bar */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  )}

                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-amber-500/20 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                        : "bg-white/[0.05] text-neutral-400 group-hover:text-neutral-300"
                    }`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                      isActive ? "text-amber-400" : "text-neutral-500"
                    }`}>
                      0{i + 1}
                    </span>
                  </div>

                  <h4 className={`text-sm font-bold mb-1 ${isActive ? "text-white" : "text-neutral-300"}`}>
                    {step.label}
                  </h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">
                    {step.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Play Controls */}
          <div className="flex lg:flex-col items-center gap-2 shrink-0 self-center lg:self-stretch justify-center">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="w-10 h-10 rounded-xl bg-[#0f1420] hover:bg-[#161b28] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition"
              title={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { setActive(0); setProgress(0); }}
              className="w-10 h-10 rounded-xl bg-[#0f1420] hover:bg-[#161b28] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition"
              title="Restart"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ═══════════ MAIN FLOATING MONITOR ═══════════ */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative group"
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-amber-500/20 via-transparent to-blue-500/10 opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

          <div className="relative rounded-3xl bg-[#0a0d14] border border-white/[0.1] shadow-[0_40px_120px_rgba(0,0,0,0.9),0_0_80px_rgba(245,158,11,0.06)] overflow-hidden">
            {/* ── Browser Chrome ── */}
            <div className="h-12 sm:h-14 px-5 sm:px-6 bg-gradient-to-b from-[#14182200] to-[#0d1018] border-b border-white/[0.08] flex items-center justify-between select-none">
              <div className="flex items-center gap-4">
                {/* Traffic lights */}
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-[0_0_6px_rgba(255,95,86,0.4)]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-[0_0_6px_rgba(255,189,46,0.4)]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-[0_0_6px_rgba(39,201,63,0.4)]" />
                </div>
                <span className="hidden sm:block text-xs font-mono text-neutral-500">VigyanPrep CBT Engine v3.4</span>
              </div>

              {/* URL bar */}
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#080a0f] border border-white/[0.06] text-xs font-mono text-neutral-400 max-w-xs sm:max-w-md truncate mx-4 flex-1 justify-center">
                <span className="text-emerald-400 text-sm">🔒</span>
                <span className="truncate">test.vigyanprep.com</span>
              </div>

              <div className="hidden md:flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>24ms • Mumbai</span>
              </div>
            </div>

            {/* ── Screen Content ── */}
            <div className="min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] bg-gradient-to-b from-[#0c0f18] to-[#090c14] p-4 sm:p-6">
              {/* ─── SCREEN 0: CATALOG ─── */}
              {active === 0 && (
                <div className="space-y-5 animate-fade-in">
                  {/* Student banner */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#111628] via-[#0f1320] to-[#0d1018] border border-white/[0.08]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-extrabold text-lg shadow-lg shadow-amber-500/20">
                        AS
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 mb-0.5">
                          <span className="font-bold text-white text-base">Ananya Sharma</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                            ✓ Hall Ticket Verified
                          </span>
                        </div>
                        <span className="text-xs text-neutral-400 font-mono">Roll: IAT26-88412 • Target: IISER Pune / IISc BS Research</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center px-4 py-2 rounded-xl bg-[#080a10] border border-white/[0.06]">
                        <div className="text-[10px] font-mono text-neutral-500 uppercase">Accuracy</div>
                        <div className="text-base font-extrabold text-emerald-400 font-mono">87.5%</div>
                      </div>
                      <div className="text-center px-4 py-2 rounded-xl bg-[#080a10] border border-white/[0.06]">
                        <div className="text-[10px] font-mono text-neutral-500 uppercase">Mocks Done</div>
                        <div className="text-base font-extrabold text-amber-400 font-mono">8</div>
                      </div>
                    </div>
                  </div>

                  {/* 3 Test Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Card 1 - Featured */}
                    <div className="relative p-5 rounded-2xl bg-gradient-to-b from-[#151a2a] to-[#0f1320] border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.06)] flex flex-col">
                      <div className="absolute top-4 right-4">
                        <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          LIVE MOCK
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Full-Length CBT #01</span>
                      <h4 className="text-base font-bold text-white mt-2 mb-3">IISER IAT 2026 Grand Simulation</h4>
                      <p className="text-xs text-neutral-400 mb-4 flex-1">180 min strict timer • Official syllabus distribution • +4 / -1 scoring • 60 questions</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-300 mb-5">
                        <div className="bg-[#080a10] p-2 rounded-lg border border-white/[0.04] text-center">⏱️ 180 Mins</div>
                        <div className="bg-[#080a10] p-2 rounded-lg border border-white/[0.04] text-center">🎯 240 Marks</div>
                        <div className="bg-[#080a10] p-2 rounded-lg border border-white/[0.04] text-center">👥 1,842 Taken</div>
                        <div className="bg-[#080a10] p-2 rounded-lg border border-white/[0.04] text-center">📊 NTA Scaled</div>
                      </div>
                      <button onClick={() => pick(1)} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5">
                        Enter Test Hall <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Card 2 */}
                    <div className="p-5 rounded-2xl bg-[#0f1320] border border-white/[0.06] hover:border-white/[0.12] transition-all flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Full-Length CBT #02</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/25">NEST</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">NISER NEST 2026 Simulation</h4>
                      <p className="text-xs text-neutral-400 mb-4 flex-1">210 Mins • Sectional cutoffs • Physics, Chemistry, Math & Biology with numerical questions.</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-300 mb-5">
                        <div className="bg-[#080a10] p-2 rounded-lg border border-white/[0.04] text-center">⏱️ 210 Mins</div>
                        <div className="bg-[#080a10] p-2 rounded-lg border border-white/[0.04] text-center">🎯 200 Marks</div>
                        <div className="bg-[#080a10] p-2 rounded-lg border border-white/[0.04] text-center">👥 960 Taken</div>
                        <div className="bg-[#080a10] p-2 rounded-lg border border-white/[0.04] text-center">🏛️ NISER/CEBS</div>
                      </div>
                      <button onClick={() => pick(1)} className="w-full py-3 rounded-xl bg-[#161b28] hover:bg-[#1c2236] border border-white/[0.08] text-neutral-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all">
                        View Test Room <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Card 3 */}
                    <div className="p-5 rounded-2xl bg-[#0f1320] border border-white/[0.06] hover:border-white/[0.12] transition-all flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Official PYQ</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">Solved</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">IISER IAT 2025 Official Paper</h4>
                      <p className="text-xs text-neutral-400 mb-4 flex-1">Re-take the exact 2025 paper with verified answers, LaTeX step-by-step solutions, and AI rank projection.</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-300 mb-5">
                        <div className="bg-[#080a10] p-2 rounded-lg border border-white/[0.04] text-center">⭐ 178/240</div>
                        <div className="bg-[#080a10] p-2 rounded-lg border border-white/[0.04] text-center">🏅 AIR 42</div>
                        <div className="bg-[#080a10] p-2 rounded-lg border border-white/[0.04] text-center">🧪 KaTeX</div>
                        <div className="bg-[#080a10] p-2 rounded-lg border border-white/[0.04] text-center">📖 Verified</div>
                      </div>
                      <button onClick={() => pick(2)} className="w-full py-3 rounded-xl bg-[#161b28] hover:bg-[#1c2236] border border-white/[0.08] text-neutral-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all">
                        Review Analysis <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SCREEN 1: CBT EXAM ROOM ─── */}
              {active === 1 && (
                <div className="flex flex-col h-full gap-4 animate-fade-in">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[#111628] border border-white/[0.08]">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-bold text-white">IISER IAT 2026 • Full Mock 01</span>
                      <span className="hidden sm:inline text-neutral-500 font-mono text-xs">Candidate: Ananya Sharma (2608412)</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#080a10] border border-amber-500/30 text-amber-400 font-mono font-bold text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{fmtTime(timer)}</span>
                    </div>
                  </div>

                  {/* Subject Tabs */}
                  <div className="flex items-center gap-1 overflow-x-auto">
                    {["Physics (15 Qs)", "Chemistry (15 Qs)", "Mathematics (15 Qs)", "Biology (15 Qs)"].map((s, i) => (
                      <button key={s} className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${i === 0 ? "bg-amber-500/15 text-amber-400 border border-amber-500/25" : "text-neutral-400 hover:text-neutral-200 border border-transparent"}`}>
                        {s}
                      </button>
                    ))}
                    <div className="ml-auto hidden lg:block text-xs font-mono text-neutral-500">
                      <span className="text-emerald-400 font-bold">+4</span> / <span className="text-red-400 font-bold">-1</span> Marking
                    </div>
                  </div>

                  {/* Split: Question + Palette */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
                    {/* Question */}
                    <div className="lg:col-span-8 p-5 rounded-2xl bg-[#0f1320] border border-white/[0.06] flex flex-col">
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                        <span className="font-bold text-white text-sm">Question {activeQ} <span className="text-neutral-500 font-normal ml-2">Single Correct MCQ</span></span>
                        <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">+4.00 / -1.00</span>
                      </div>

                      <div className="text-neutral-200 text-sm leading-relaxed mb-5">
                        A monochromatic light beam of wavelength <span className="text-amber-300 font-semibold italic">λ = 589 nm</span> is incident on a Young&apos;s double slit with separation <span className="text-amber-300 font-semibold italic">d = 0.25 mm</span>. The interference fringes are observed on a screen at distance <span className="text-amber-300 font-semibold italic">D = 1.2 m</span>.
                        <br /><br />
                        If the apparatus is immersed in a liquid of refractive index <span className="text-amber-300 font-semibold italic">μ = 1.33</span>, find the new fringe width <span className="text-amber-300 font-semibold italic">β′</span>.
                      </div>

                      {/* Options */}
                      <div className="space-y-2.5 mb-5">
                        {[
                          { k: "A", v: "β′ = 2.83 mm" },
                          { k: "B", v: "β′ = 2.12 mm" },
                          { k: "C", v: "β′ = 3.76 mm" },
                          { k: "D", v: "β′ = 1.59 mm" },
                        ].map((o) => (
                          <button key={o.k} onClick={() => setSelectedOpt(o.k)} className={`w-full p-3.5 rounded-xl border flex items-center gap-3.5 transition-all text-sm ${selectedOpt === o.k ? "bg-amber-500/10 border-amber-500/40 text-white shadow-[0_0_15px_rgba(245,158,11,0.06)]" : "bg-[#080a10] border-white/[0.06] text-neutral-300 hover:border-white/[0.12]"}`}>
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0 ${selectedOpt === o.k ? "bg-amber-400 text-black" : "bg-[#161b28] text-neutral-400"}`}>{o.k}</span>
                            <span className="font-mono">{o.v}</span>
                          </button>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.06]">
                        <div className="flex gap-2">
                          <button onClick={() => setMarkedReview(!markedReview)} className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${markedReview ? "bg-purple-500/10 border-purple-500/30 text-purple-300" : "bg-[#080a10] border-white/[0.06] text-neutral-400 hover:text-white"}`}>
                            {markedReview ? "✓ Marked" : "Mark Review"}
                          </button>
                          <button onClick={() => setSelectedOpt("")} className="px-3 py-2 rounded-xl bg-[#080a10] border border-white/[0.06] text-neutral-400 hover:text-white text-xs transition">Clear</button>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setActiveQ((p) => p < 60 ? p + 1 : 1)} className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition shadow-md">Save & Next →</button>
                          <button onClick={() => pick(2)} className="px-3.5 py-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold transition hover:bg-red-500/20">Submit</button>
                        </div>
                      </div>
                    </div>

                    {/* Palette */}
                    <div className="lg:col-span-4 p-4 rounded-2xl bg-[#0f1320] border border-white/[0.06] flex flex-col">
                      <div className="flex items-center justify-between text-sm font-bold text-white mb-3">
                        <span>Question Palette</span>
                        <span className="text-[11px] text-neutral-500 font-mono">60 Questions</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-300 mb-4 p-2.5 rounded-xl bg-[#080a10] border border-white/[0.04]">
                        <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded bg-emerald-500" /> Answered (24)</div>
                        <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded bg-red-500" /> Unanswered (6)</div>
                        <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded bg-purple-500" /> Review (2)</div>
                        <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded bg-neutral-700" /> Not Visited (28)</div>
                      </div>
                      <div className="grid grid-cols-8 gap-1.5 flex-1 content-start">
                        {Array.from({ length: 40 }).map((_, i) => {
                          const n = i + 1;
                          const cur = n === activeQ;
                          let bg = "bg-neutral-800 text-neutral-400";
                          if (n <= 24) bg = "bg-emerald-600 text-white";
                          else if (n <= 30) bg = "bg-red-600 text-white";
                          else if (n <= 32) bg = "bg-purple-600 text-white";
                          return (
                            <button key={n} onClick={() => setActiveQ(n)} className={`h-7 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center transition ${bg} ${cur ? "ring-2 ring-amber-400 ring-offset-1 ring-offset-[#0f1320] scale-110" : ""}`}>
                              {n}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SCREEN 2: SCORECARD ─── */}
              {active === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-[#111628] via-[#0f1320] to-[#111628] border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">Performance Dossier</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 font-mono font-bold">Top 0.5%</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white">IISER IAT 2026 Mock 01 • Certified</h3>
                      <p className="text-xs text-neutral-400 mt-0.5">Evaluated under NTA guidelines • 12,480 peer attempts</p>
                    </div>
                    <button onClick={() => pick(3)} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/15 transition hover:-translate-y-0.5">
                      Fix Weak Areas <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Net Score", value: "196 / 240", color: "text-amber-400", sub: "+24 vs previous" },
                      { label: "Projected AIR", value: "14", color: "text-white", sub: "Out of 12,480" },
                      { label: "Percentile", value: "99.42%", color: "text-emerald-400", sub: "Target: IISER Pune" },
                      { label: "Accuracy", value: "88.5%", color: "text-blue-400", sub: "48 Correct • 6 Wrong" },
                    ].map((k) => (
                      <div key={k.label} className="p-5 rounded-2xl bg-[#0f1320] border border-white/[0.06]">
                        <div className="text-[11px] font-mono text-neutral-500 uppercase mb-2">{k.label}</div>
                        <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${k.color}`}>{k.value}</div>
                        <div className="text-[11px] text-neutral-400 mt-1">{k.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Subject Bars */}
                  <div className="p-5 rounded-2xl bg-[#0f1320] border border-white/[0.06]">
                    <h4 className="text-sm font-bold text-white mb-4">Subject-Wise Mastery</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {[
                        { name: "Physics", score: "52/60", pct: 92, color: "from-amber-500 to-amber-300", note: "Strong: Wave Optics, Modern Physics" },
                        { name: "Chemistry", score: "56/60", pct: 95, color: "from-emerald-500 to-emerald-300", note: "Strong: Thermodynamics, Coordination" },
                        { name: "Mathematics", score: "48/60", pct: 85, color: "from-blue-500 to-cyan-400", note: "Practice: Permutations, Integrals" },
                        { name: "Biology", score: "40/60", pct: 80, color: "from-purple-500 to-pink-400", note: "Practice: Genetics, Respiration" },
                      ].map((s) => (
                        <div key={s.name}>
                          <div className="flex justify-between text-sm mb-1.5">
                            <span className="font-bold text-white">{s.name}</span>
                            <span className="font-mono text-neutral-300">{s.score} ({s.pct}%)</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-[#080a10] overflow-hidden">
                            <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`} style={{ width: `${s.pct}%` }} />
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-1">{s.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SCREEN 3: ADAPTIVE ─── */}
              {active === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#111628] to-[#0f1320] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">AI Adaptive Practice</span>
                      <h3 className="text-lg font-extrabold text-white mt-1">Rotational Dynamics — Weak-Spot Eradication</h3>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-mono text-neutral-500">Mastery</div>
                      <div className="text-xl font-extrabold text-amber-400 font-mono">78% → 86%</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-8 p-5 rounded-2xl bg-[#0f1320] border border-white/[0.06] flex flex-col">
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                        <span className="text-sm font-bold text-white">Drill Q4 of 10 • Physics</span>
                        <button onClick={() => setBookmarked(!bookmarked)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${bookmarked ? "bg-amber-500/15 border-amber-500/30 text-amber-300" : "bg-[#080a10] border-white/[0.06] text-neutral-400 hover:text-white"}`}>
                          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-amber-400 text-amber-400" : ""}`} />
                          {bookmarked ? "Bookmarked" : "Bookmark"}
                        </button>
                      </div>

                      <div className="text-sm text-neutral-200 leading-relaxed mb-5">
                        A solid cylinder of mass <span className="text-amber-300 font-semibold italic">M</span> and radius <span className="text-amber-300 font-semibold italic">R</span> rolls down an inclined plane at angle <span className="text-amber-300 font-semibold italic">θ</span> without slipping. Find the center-of-mass acceleration <span className="text-amber-300 font-semibold italic">a_cm</span>.
                      </div>

                      <div className="space-y-2.5 mb-5">
                        {[
                          { k: "A", v: "a = g sin θ" },
                          { k: "B", v: "a = ½ g sin θ" },
                          { k: "C", v: "a = ⅔ g sin θ  ✓" },
                          { k: "D", v: "a = ¾ g sin θ" },
                        ].map((o) => (
                          <button key={o.k} onClick={() => setAdaptiveOpt(o.k)} className={`w-full p-3.5 rounded-xl border flex items-center gap-3.5 text-sm font-mono transition ${adaptiveOpt === o.k ? "bg-emerald-500/10 border-emerald-500/30 text-white" : "bg-[#080a10] border-white/[0.06] text-neutral-300 hover:border-white/[0.12]"}`}>
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${adaptiveOpt === o.k ? "bg-emerald-400 text-black" : "bg-[#161b28] text-neutral-400"}`}>{o.k}</span>
                            {o.v}
                          </button>
                        ))}
                      </div>

                      {showSoln && (
                        <div className="p-4 rounded-xl bg-[#080a10] border border-white/[0.06] text-xs font-mono space-y-1.5 text-neutral-300">
                          <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-2">
                            <Sparkles className="w-3.5 h-3.5" /> Step-by-Step Derivation
                          </div>
                          <div>1. Rolling condition: a_cm = α · R</div>
                          <div>2. Torque: f_s · R = ½MR² · (a/R) → f_s = ½Ma</div>
                          <div>3. Net force: Mg sin θ - f_s = Ma → Mg sin θ = 3/2 Ma</div>
                          <div className="text-emerald-400 font-bold pt-1">∴ a_cm = (2/3)g sin θ — Option C verified ✓</div>
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.06]">
                        <button onClick={() => setShowSoln(!showSoln)} className="text-xs text-neutral-400 hover:text-white transition">{showSoln ? "Hide Solution" : "Show Solution"}</button>
                        <button onClick={() => pick(0)} className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-md transition">Back to Catalog →</button>
                      </div>
                    </div>

                    {/* Bookmarks sidebar */}
                    <div className="lg:col-span-4 p-4 rounded-2xl bg-[#0f1320] border border-white/[0.06] flex flex-col">
                      <div className="flex items-center justify-between text-sm font-bold text-white mb-3">
                        <span>Revision Queue</span>
                        <span className="text-[11px] text-amber-400 font-mono">14 Saved</span>
                      </div>
                      <div className="space-y-2.5 flex-1">
                        {[
                          { sub: "Physics • Wave Optics", q: "Fringe width with liquid μ = 1.33", src: "Mock 01 Q14", color: "text-amber-400" },
                          { sub: "Chemistry • Kinetics", q: "Arrhenius activation energy", src: "IAT 2025 Q28", color: "text-emerald-400" },
                          { sub: "Math • Calculus", q: "Leibniz integral parametric limits", src: "Mock 02 Q45", color: "text-blue-400" },
                        ].map((b) => (
                          <div key={b.q} className="p-3 rounded-xl bg-[#080a10] border border-white/[0.04]">
                            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-1">
                              <span className={b.color}>{b.sub}</span>
                              <span>{b.src}</span>
                            </div>
                            <div className="text-xs text-neutral-300 line-clamp-1">{b.q}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/[0.06]">
                        <div className="text-[11px] font-mono text-neutral-500 mb-1.5">Weak-Area Coverage</div>
                        <div className="h-2.5 rounded-full bg-[#080a10] overflow-hidden">
                          <div className="h-full w-[78%] bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full" />
                        </div>
                        <div className="flex justify-between text-[10px] text-neutral-500 mt-1"><span>78%</span><span className="text-emerald-400">Target 95%</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Bottom Status ── */}
            <div className="h-10 px-6 bg-[#080a10] border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-neutral-400">Live Preview</span>
                </span>
                <span className="hidden sm:inline text-neutral-600">•</span>
                <span className="hidden sm:inline">Click any tab or button above to explore</span>
              </div>
              <a href="https://test.vigyanprep.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition">
                Launch Portal <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════ BOTTOM CTA ═══════════ */}
        <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://test.vigyanprep.com/login"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-sm shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:shadow-[0_0_50px_rgba(245,158,11,0.35)] transition-all transform hover:-translate-y-1 text-center"
          >
            Start Free IISER IAT / NEST Mock →
          </a>
          <Link
            href="/pyq"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0f1420] hover:bg-[#161b28] border border-white/[0.08] text-neutral-200 text-sm font-semibold transition text-center"
          >
            Explore Solved PYQ Archive
          </Link>
        </div>
      </div>

      {/* Inline animation styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
