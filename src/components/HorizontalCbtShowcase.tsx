"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  ArrowRight,
  ClipboardList,
  BarChart3,
  Brain,
  ShieldCheck,
  ChevronRight,
  User,
  ExternalLink,
  Flame,
  Check,
} from "lucide-react";

export default function HorizontalCbtShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(10038); // 02:47:18

  const steps = [
    {
      id: "dashboard",
      num: "01",
      title: "Student Dashboard",
      subtitle: "Personalized syllabus progress, streak & mock catalog",
      icon: BookOpen,
      duration: 6000,
    },
    {
      id: "exam-room",
      num: "02",
      title: "TCS-iON Exam Hall",
      subtitle: "60-Q palette, authentic NTA timer & LaTeX equations",
      icon: ClipboardList,
      duration: 7000,
    },
    {
      id: "scorecard",
      num: "03",
      title: "Instant AIR Scorecard",
      subtitle: "Live All-India percentile & subject accuracy breakdown",
      icon: Award,
      duration: 6000,
    },
    {
      id: "adaptive",
      num: "04",
      title: "Adaptive Drill",
      subtitle: "Targeted weak-topic questions curated by AI",
      icon: Brain,
      duration: 6000,
    },
  ];

  // Auto-play timer for step progression
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, steps[activeStep].duration);
    return () => clearInterval(interval);
  }, [isPlaying, activeStep]);

  // Live countdown timer for the exam hall view
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 10800));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0806] text-[#f2ead8] overflow-hidden select-none border-t border-b border-[#d4a520]/20">
      {/* ─── AMBIENT ATMOSPHERE ─── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,165,32,0.14),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(232,114,10,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ─── SECTION HEADER ─── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4a520]/10 border border-[#d4a520]/30 text-[#d4a520] text-xs font-mono font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIVE PLATFORM SIMULATOR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Same Questions.{" "}
            <span
              className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#fcd34d] via-[#d4a520] to-[#e8720a]"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
            >
              Real Exam Experience.
            </span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Engineered exclusively for <strong className="text-white font-medium">IISER IAT &amp; NISER NEST</strong> aspirants.
            Practice inside the exact NTA computer-based test simulator before exam day.
          </p>
        </div>

        {/* ─── STEP NAVIGATION CARDS WITH PROGRESS BARS ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`relative text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                  isActive
                    ? "bg-[#18140e] border-[#d4a520]/50 shadow-[0_4px_24px_rgba(212,165,32,0.18)]"
                    : "bg-[#100e0a]/80 border-white/[0.08] hover:border-white/[0.18] hover:bg-[#15120c]"
                }`}
              >
                {/* Active Step Progress Indicator Bar */}
                {isActive && isPlaying && (
                  <div
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#d4a520] to-[#e8720a] animate-[progress_linear_forwards]"
                    style={{
                      width: "100%",
                      animationDuration: `${step.duration}ms`,
                    }}
                  />
                )}
                {isActive && !isPlaying && (
                  <div className="absolute top-0 left-0 h-1 w-full bg-[#d4a520]" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-mono font-bold ${isActive ? "text-[#d4a520]" : "text-neutral-500"}`}>
                    {step.num}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg border ${
                      isActive
                        ? "bg-[#d4a520]/15 border-[#d4a520]/30 text-[#d4a520]"
                        : "bg-white/[0.04] border-white/[0.06] text-neutral-400"
                    }`}
                  >
                    <Icon size={14} />
                  </div>
                </div>

                <div className={`text-xs sm:text-sm font-bold truncate ${isActive ? "text-white" : "text-neutral-300"}`}>
                  {step.title}
                </div>
                <div className="text-[11px] text-neutral-500 truncate mt-0.5 hidden sm:block">
                  {step.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── PLAYBACK CONTROLS STRIP ─── */}
        <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-4 px-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Simulating: <strong className="text-white">{steps[activeStep].title}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 border border-white/[0.08] flex items-center gap-1.5 transition cursor-pointer"
              title={isPlaying ? "Pause automated tour" : "Resume automated tour"}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>{isPlaying ? "Pause" : "Auto-Play"}</span>
            </button>
            <button
              onClick={() => {
                setActiveStep(0);
                setIsPlaying(true);
              }}
              className="p-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 border border-white/[0.08] transition cursor-pointer"
              title="Restart tour from Step 1"
            >
              <RotateCcw size={12} />
            </button>
          </div>
        </div>

        {/* ─── MACBOOK HARDWARE CHASSIS ─── */}
        <div className="relative rounded-2xl bg-[#0f0e0c] border border-white/[0.15] p-2.5 sm:p-4 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(212,165,32,0.08)]">
          {/* Top Browser / macOS Window Header */}
          <div className="h-10 px-4 bg-[#14120e] rounded-t-xl border-b border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-neutral-500 hidden sm:inline">VigyanPrep CBT Engine v3.4</span>
            </div>

            {/* URL Bar */}
            <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-black/50 border border-white/[0.08] text-[11px] text-neutral-300">
              <span className="text-[#d4a520]">🔒</span>
              <span>test.vigyanprep.com</span>
              <span className="text-neutral-500">/{steps[activeStep].id}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] text-emerald-400 hidden sm:inline">24ms • Mumbai</span>
            </div>
          </div>

          {/* ─── DISPLAY SCREEN CANVAS ─── */}
          <div className="min-h-[460px] sm:min-h-[520px] bg-[#0c0a07] rounded-b-xl p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between">
            {/* Ambient Screen Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4a520]/[0.04] blur-3xl pointer-events-none" />

            {/* ═════════ VIEW 1: DASHBOARD ═════════ */}
            {activeStep === 0 && (
              <div className="space-y-6 animate-fade-in">
                {/* Student Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#16120b] border border-[#d4a520]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d4a520] to-[#e8720a] text-black font-extrabold flex items-center justify-center text-sm shadow-md">
                      HA
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Welcome back, Harsh Anand</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                          Verified Candidate
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5 font-mono">
                        Target: IISER Pune / IISc BS (Research) • Exam Session 2026
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Flame size={15} />
                      <span className="font-bold">12-Day Streak</span>
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="text-neutral-400">
                      Completed: <strong className="text-white">8 Mocks</strong>
                    </div>
                  </div>
                </div>

                {/* Live Mock Spotlight Banner */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-[#1c160c] via-[#16120b] to-[#120f08] border border-[#d4a520]/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#d4a520] font-bold uppercase tracking-wider mb-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      <span>OFFICIAL 24-HOUR TEST WINDOW LIVE NOW</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      IISER IAT 2026 Grand All-India Mock 01 (Certified)
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 mt-2">
                      <span>⏱️ 180 Minutes</span>
                      <span>•</span>
                      <span>🎯 60 Questions (+4, -1)</span>
                      <span>•</span>
                      <span>👥 1,842 Candidates Registered</span>
                    </div>
                  </div>

                  <Link
                    href="https://test.vigyanprep.com"
                    target="_blank"
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d4a520] to-[#e8720a] hover:opacity-90 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition shrink-0"
                  >
                    <span>Enter Test Hall</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* 4 Subject Mastery Bars */}
                <div>
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                    Subject-Wise Mastery (Based on Last 3 Mocks)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#14120e] border border-white/[0.08]">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-bold text-white">Physics</span>
                        <span className="font-mono text-[#d4a520] font-bold">52/60 (92%)</span>
                      </div>
                      <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#d4a520] to-[#e8720a] w-[92%]" />
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono mt-1.5">Strong: Wave Optics, Modern Physics</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#14120e] border border-white/[0.08]">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-bold text-white">Chemistry</span>
                        <span className="font-mono text-emerald-400 font-bold">56/60 (95%)</span>
                      </div>
                      <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[95%]" />
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono mt-1.5">Strong: Coordination, Thermodynamics</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#14120e] border border-white/[0.08]">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-bold text-white">Mathematics</span>
                        <span className="font-mono text-blue-400 font-bold">48/60 (85%)</span>
                      </div>
                      <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[85%]" />
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono mt-1.5">Focus: Permutations, Integrals</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#14120e] border border-white/[0.08]">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-bold text-white">Biology</span>
                        <span className="font-mono text-purple-400 font-bold">40/60 (80%)</span>
                      </div>
                      <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-[80%]" />
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono mt-1.5">Focus: Genetics, Cellular Signaling</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═════════ VIEW 2: TCS-iON EXAM HALL ═════════ */}
            {activeStep === 1 && (
              <div className="space-y-4 animate-fade-in font-sans">
                {/* Exam Hall Header Bar */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#14120e] border border-white/[0.08] text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white">IISER Aptitude Test (IAT) 2026</span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono text-[10px]">
                      PHYSICS SECTION
                    </span>
                  </div>

                  <div className="flex items-center gap-4 font-mono">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold">
                      <Clock size={13} />
                      <span>{formatTimer(timerSeconds)}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <User size={14} className="text-neutral-400" />
                      <span className="text-neutral-300">Harsh Anand</span>
                    </div>
                  </div>
                </div>

                {/* 2-Column Split: Question View (Left) & 60-Question Palette (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Left: Question Card with Real Scientific Notation */}
                  <div className="lg:col-span-8 p-4 sm:p-5 rounded-xl bg-[#14120e] border border-white/[0.08] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-2.5 mb-3 border-b border-white/[0.08]">
                        <span className="font-bold text-white">Question No. 14</span>
                        <span>Marks: <strong className="text-emerald-400">+4.0</strong> / <strong className="text-rose-400">-1.0</strong></span>
                      </div>

                      {/* Question Text */}
                      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-serif">
                        A ray of monochromatic light is incident on an equilateral prism of refractive index{" "}
                        <span className="font-mono text-[#d4a520] bg-black/40 px-1.5 py-0.5 rounded border border-white/10">μ = √2</span>{" "}
                        at an angle of incidence <span className="font-mono text-[#d4a520]">i = 45°</span>. If the ray suffers minimum deviation, what is the angle of minimum deviation{" "}
                        <span className="font-mono text-[#d4a520]">δₘ</span> inside the optical medium?
                      </p>

                      {/* 4 Interactive Options */}
                      <div className="mt-4 space-y-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-white flex items-center justify-between font-mono">
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center text-[10px]">
                              A
                            </span>
                            <span>δₘ = 30°</span>
                          </div>
                          <Check size={14} className="text-emerald-400" />
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-neutral-300 flex items-center gap-2.5 font-mono">
                          <span className="w-5 h-5 rounded-full bg-white/10 text-neutral-300 font-bold flex items-center justify-center text-[10px]">
                            B
                          </span>
                          <span>δₘ = 45°</span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-neutral-300 flex items-center gap-2.5 font-mono">
                          <span className="w-5 h-5 rounded-full bg-white/10 text-neutral-300 font-bold flex items-center justify-center text-[10px]">
                            C
                          </span>
                          <span>δₘ = 60°</span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-neutral-300 flex items-center gap-2.5 font-mono">
                          <span className="w-5 h-5 rounded-full bg-white/10 text-neutral-300 font-bold flex items-center justify-center text-[10px]">
                            D
                          </span>
                          <span>δₘ = 90°</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Toolbar */}
                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/[0.08] text-xs">
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-md bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/30 font-medium">
                          Mark for Review
                        </button>
                        <button className="px-3 py-1.5 rounded-md bg-white/[0.05] text-neutral-400 border border-white/[0.08]">
                          Clear Response
                        </button>
                      </div>
                      <button className="px-4 py-1.5 rounded-md bg-[#d4a520] hover:bg-[#e8720a] text-black font-bold flex items-center gap-1.5 transition">
                        <span>Save &amp; Next</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Right: Authentic TCS-iON 60-Question Palette */}
                  <div className="lg:col-span-4 p-4 rounded-xl bg-[#14120e] border border-white/[0.08] flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2.5 pb-2 border-b border-white/[0.08]">
                        Question Palette (60 Qs)
                      </div>

                      {/* Legend */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400 mb-3 pb-2 border-b border-white/[0.08]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <span>Answered (24)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          <span>Not Answered (8)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#7c3aed]" />
                          <span>Review (4)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                          <span>Not Visited (24)</span>
                        </div>
                      </div>

                      {/* Mini Question Grid */}
                      <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-6 gap-1.5 text-[10px] font-mono font-bold">
                        {Array.from({ length: 30 }).map((_, i) => {
                          const qNum = i + 1;
                          let style = "bg-neutral-800 text-neutral-400 border-neutral-700";
                          if (qNum <= 13) style = "bg-emerald-600 text-white border-emerald-500";
                          if (qNum === 14) style = "bg-emerald-500 text-white ring-2 ring-[#d4a520] font-black";
                          if (qNum === 15 || qNum === 16) style = "bg-rose-600 text-white border-rose-500";
                          if (qNum === 17) style = "bg-[#7c3aed] text-white border-[#8b5cf6]";

                          return (
                            <div
                              key={qNum}
                              className={`h-6 rounded flex items-center justify-center border ${style}`}
                            >
                              {qNum}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button className="w-full mt-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg transition">
                      Submit Exam
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ═════════ VIEW 3: AIR SCORECARD ═════════ */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                {/* Result Verified Header */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-[#14120e] to-[#14120e] border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                      <Award size={26} />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                        Official Exam Performance Audit
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        IISER IAT 2026 Grand Simulation 01 • Scorecard
                      </h3>
                      <div className="text-xs text-neutral-400 font-mono mt-0.5">
                        Submission ID: #IAT-88412 • Verified by NTA Scoring Normalizer
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                      198 <span className="text-xs text-neutral-400 font-normal">/ 240</span>
                    </div>
                    <div className="text-xs font-mono text-emerald-400 font-bold">
                      Net Accuracy: 91.2%
                    </div>
                  </div>
                </div>

                {/* 3 Metric Hero Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#14120e] border border-[#d4a520]/30 text-center">
                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      All-India Percentile
                    </div>
                    <div className="text-3xl font-extrabold text-[#d4a520] font-mono mt-1">
                      99.64 %ile
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono mt-1">
                      Among 1,842 verified aspirants
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#14120e] border border-emerald-500/30 text-center">
                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      Projected Rank (AIR)
                    </div>
                    <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">
                      AIR #34
                    </div>
                    <div className="text-[11px] text-emerald-400/90 font-mono mt-1">
                      Eligible for IISER Pune &amp; IISc BS
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#14120e] border border-blue-500/30 text-center">
                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      Speed &amp; Accuracy
                    </div>
                    <div className="text-3xl font-extrabold text-blue-400 font-mono mt-1">
                      1.8m / Q
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono mt-1">
                      51 Correct • 5 Incorrect • 4 Skipped
                    </div>
                  </div>
                </div>

                {/* Subject Net Score Strip */}
                <div className="p-4 rounded-xl bg-[#14120e] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-neutral-500">Physics:</span>{" "}
                      <strong className="text-white">+52 / 60</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500">Chemistry:</span>{" "}
                      <strong className="text-white">+56 / 60</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500">Maths:</span>{" "}
                      <strong className="text-white">+48 / 60</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500">Biology:</span>{" "}
                      <strong className="text-white">+42 / 60</strong>
                    </div>
                  </div>

                  <Link
                    href="https://test.vigyanprep.com"
                    target="_blank"
                    className="text-[#d4a520] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View Step-by-Step KaTeX Solutions</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            )}

            {/* ═════════ VIEW 4: ADAPTIVE REVISION ═════════ */}
            {activeStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-5 rounded-xl bg-[#14120e] border border-[#d4a520]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#d4a520]/15 text-[#d4a520] border border-[#d4a520]/30 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                      <Brain size={12} />
                      <span>AI DIAGNOSTIC ENGINE</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      Targeted Adaptive Drills based on Exam Error Patterns
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-1">
                      System automatically isolates weak formulas and generates high-yield practice sets.
                    </p>
                  </div>

                  <button className="px-5 py-2.5 rounded-lg bg-[#d4a520] hover:bg-[#e8720a] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition shrink-0">
                    <span>Start 10-Q Drill</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* 3 AI Suggested Topic Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#14120e] border border-rose-500/25 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-rose-400 font-bold">Physics • Optics</span>
                      <span className="text-rose-400">Accuracy 65%</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Wave Optics &amp; Interference</h4>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      Missed 2 questions on Young&apos;s Double Slit fringe shift under thin film.
                    </p>
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-[#d4a520] bg-black/40 px-2 py-1 rounded border border-white/10">
                        15 High-Yield Questions Ready
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#14120e] border border-amber-500/25 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 font-bold">Chemistry • Organic</span>
                      <span className="text-amber-400">Accuracy 72%</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Reaction Mechanisms (SN1/SN2)</h4>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      Needs review on carbocation rearrangement and stereochemical inversion.
                    </p>
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-[#d4a520] bg-black/40 px-2 py-1 rounded border border-white/10">
                        12 High-Yield Questions Ready
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#14120e] border border-blue-500/25 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-blue-400 font-bold">Maths • Calculus</span>
                      <span className="text-blue-400">Accuracy 78%</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Definite Integrals &amp; Area</h4>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      Practice recommended for piecewise limits and periodic integration.
                    </p>
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-[#d4a520] bg-black/40 px-2 py-1 rounded border border-white/10">
                        18 High-Yield Questions Ready
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs font-mono text-neutral-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>Active Bookmarks: <strong className="text-white">16 questions saved</strong> for final 48h revision</span>
                  </div>
                  <span className="text-[#d4a520]">Synced with Student Portal</span>
                </div>
              </div>
            )}

            {/* Bottom Bar inside Screen */}
            <div className="pt-4 mt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>NTA &amp; TCS-iON Architecture Verified • 100% Client-Side Anti-Cheat</span>
              </div>

              <a
                href="https://test.vigyanprep.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d4a520] hover:text-[#fcd34d] transition flex items-center gap-1.5 font-bold"
              >
                <span>Launch Live Student CBT Hall</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM 4 FEATURE HIGHLIGHTS (BENTO GRID) ─── */}
        <div className="mt-14 pt-12 border-t border-[#d4a520]/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-xl bg-[#120f0a] border border-white/[0.08] hover:border-[#d4a520]/40 transition duration-300">
            <div className="w-10 h-10 rounded-lg bg-[#d4a520]/15 border border-[#d4a520]/30 text-[#d4a520] flex items-center justify-center mb-3.5">
              <ClipboardList size={20} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              TCS-iON CBT Interface
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Exact palette, question timer, and scoring rules matching the real exam hall.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#120f0a] border border-white/[0.08] hover:border-[#d4a520]/40 transition duration-300">
            <div className="w-10 h-10 rounded-lg bg-[#d4a520]/15 border border-[#d4a520]/30 text-[#d4a520] flex items-center justify-center mb-3.5">
              <BarChart3 size={20} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              All-India Percentiles
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Benchmark your rank and category cutoffs against thousands of real science aspirants.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#120f0a] border border-white/[0.08] hover:border-[#d4a520]/40 transition duration-300">
            <div className="w-10 h-10 rounded-lg bg-[#d4a520]/15 border border-[#d4a520]/30 text-[#d4a520] flex items-center justify-center mb-3.5">
              <Award size={20} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              LaTeX Equation Master
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Crystal-clear vector KaTeX formatting for complex organic structures and multi-variable integrals.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#120f0a] border border-white/[0.08] hover:border-[#d4a520]/40 transition duration-300">
            <div className="w-10 h-10 rounded-lg bg-[#d4a520]/15 border border-[#d4a520]/30 text-[#d4a520] flex items-center justify-center mb-3.5">
              <Brain size={20} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              Adaptive Error Engine
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Isolates weak sub-topics automatically and recommends high-yield 10-minute micro-drills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
