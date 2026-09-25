"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Laptop,
  CheckCircle2,
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
  Check,
  ShieldCheck,
  TrendingUp,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

interface StepMeta {
  id: number;
  label: string;
  badge: string;
  title: string;
  subtitle: string;
  url: string;
}

const STEPS: StepMeta[] = [
  {
    id: 0,
    label: "01. Mock Catalog",
    badge: "Student Portal",
    title: "Official Test Series Catalog",
    subtitle: "Browse IISER IAT & NISER NEST full-length mocks, schedule tests, and access hall tickets.",
    url: "https://test.vigyanprep.com/dashboard",
  },
  {
    id: 1,
    label: "02. NTA CBT Room",
    badge: "TCS-iON Exact Match",
    title: "Authentic Exam Hall Simulation",
    subtitle: "The exact 60-question NTA palette, live countdown timer, and KaTeX-rendered scientific formulas.",
    url: "https://test.vigyanprep.com/exam/iat-2026-mock-1",
  },
  {
    id: 2,
    label: "03. Instant AIR Scorecard",
    badge: "Real-Time Ranking",
    title: "All-India Percentile & Scorecard",
    subtitle: "Immediate post-submission analytics, predicted college cutoffs, and subject accuracy charts.",
    url: "https://test.vigyanprep.com/results/iat-2026-mock-1",
  },
  {
    id: 3,
    label: "04. Adaptive Concept Drill",
    badge: "Personalized AI",
    title: "Adaptive Weak-Spot Mastery",
    subtitle: "Targeted 10-question micro-drills, chapter mastery rings, and 1-click revision bookmarks.",
    url: "https://test.vigyanprep.com/adaptive",
  },
];

const STEP_DURATION_MS = 6500; // 6.5s per step for comfortable reading

export default function HorizontalCbtShowcase() {
  const [activeStep, setActiveStep] = useState<number>(1); // Start on the CBT room for maximum impact
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // CBT Exam Screen State
  const [activeSubject, setActiveSubject] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("B");
  const [activeQuestion, setActiveQuestion] = useState<number>(14);
  const [timerSeconds, setTimerSeconds] = useState<number>(9854); // 02:44:14
  const [isMarkedReview, setIsMarkedReview] = useState<boolean>(false);

  // Adaptive Screen State
  const [isBookmarked, setIsBookmarked] = useState<boolean>(true);
  const [showSolution, setShowSolution] = useState<boolean>(true);
  const [selectedAdaptiveOption, setSelectedAdaptiveOption] = useState<string>("C");

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 10800));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format seconds to HH:MM:SS
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Auto-play progress loop
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepIntervalMs = 50;
    const increment = (stepIntervalMs / STEP_DURATION_MS) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((curr) => (curr + 1) % STEPS.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepIntervalMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, isHovered]);

  const handleStepSelect = (idx: number) => {
    setActiveStep(idx);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#07080a] text-neutral-100 overflow-hidden border-t border-neutral-800/80">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-amber-600/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/4 w-[600px] h-[400px] bg-emerald-600/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-medium tracking-wide uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Interactive Platform Tour
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Reimagine How You{" "}
            <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
              Prepare
            </span>{" "}
            For Science
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Experience the authentic TCS-iON CBT environment, real-time KaTeX math formulas, 60-question palette,
            and instant All-India percentiles before your actual exam day.
          </p>

          {/* Quick Pillar Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-neutral-300">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% NTA Pattern Replicated</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>LaTeX Scientific Formulas</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              <span>Instant All-India Percentiles</span>
            </div>
          </div>
        </div>

        {/* Step Selector Tabs with Progress Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full sm:w-auto flex-1">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepSelect(idx)}
                  className={`group relative text-left p-3 rounded-xl border transition-all duration-200 overflow-hidden ${
                    isActive
                      ? "bg-neutral-900/90 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.12)] text-white"
                      : "bg-neutral-950/60 border-neutral-800/80 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700/80"
                  }`}
                >
                  {/* Progress fill bar */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[11px] font-mono tracking-wider font-semibold uppercase ${
                        isActive ? "text-amber-400" : "text-neutral-500 group-hover:text-neutral-400"
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800/80 text-neutral-400">
                      {step.badge}
                    </span>
                  </div>
                  <div className="text-xs font-medium truncate text-neutral-200">{step.title}</div>
                </button>
              );
            })}
          </div>

          {/* Autoplay Controls */}
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={togglePlayPause}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs transition"
              title={isPlaying ? "Pause automated preview" : "Resume automated preview"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-mono">Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="text-[11px] font-mono">Paused</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                setActiveStep(0);
                setProgress(0);
              }}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition"
              title="Restart from beginning"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ═══════════════ MAIN HORIZONTAL DESKTOP SCREEN ═══════════════ */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full rounded-2xl bg-[#090b0e] border border-neutral-700/60 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_60px_rgba(245,158,11,0.08)] overflow-hidden transition-all duration-300"
        >
          {/* Top Browser Chrome Bar */}
          <div className="h-10 px-4 bg-[#12151b] border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400 select-none">
            {/* macOS traffic light dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
              <span className="ml-3 hidden sm:inline text-[11px] font-mono text-neutral-500">
                VigyanPrep CBT Environment v3.4
              </span>
            </div>

            {/* URL Address Bar */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0a0c10] border border-neutral-800/80 text-[11px] font-mono text-neutral-300 max-w-[280px] sm:max-w-md w-full mx-2 justify-center truncate">
              <span className="text-emerald-400 font-bold">🔒</span>
              <span className="text-neutral-400 truncate">{STEPS[activeStep].url}</span>
            </div>

            {/* Right Status */}
            <div className="flex items-center gap-3 text-[11px]">
              <div className="hidden md:flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>24ms Ping</span>
              </div>
              <span className="hidden lg:inline text-neutral-500 font-mono">TCS-iON Engine</span>
            </div>
          </div>

          {/* Screen Content Canvas */}
          <div className="min-h-[500px] lg:min-h-[560px] bg-[#0c0e14] p-3 sm:p-5 flex flex-col justify-between">
            {/* ─────────── STEP 0: TEST CATALOG ─────────── */}
            {activeStep === 0 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                {/* Student Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-neutral-900 to-[#12161f] border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-sm">
                      AS
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">Ananya Sharma</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Hall Ticket Verified
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400 font-mono">
                        Roll: IAT26-88412 • Target: IISER Pune / IISc BS Research
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-center">
                      <div className="text-[10px] text-neutral-400 font-mono uppercase">Avg Accuracy</div>
                      <div className="text-xs font-bold text-emerald-400">87.5%</div>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-center">
                      <div className="text-[10px] text-neutral-400 font-mono uppercase">Full Mocks</div>
                      <div className="text-xs font-bold text-amber-400">8 Solved</div>
                    </div>
                  </div>
                </div>

                {/* Available Tests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Test 1 */}
                  <div className="p-4 rounded-xl bg-[#11141c] border border-amber-500/40 shadow-lg relative flex flex-col justify-between">
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      LIVE MOCK
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                        Full-Length CBT #01
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1 mb-2">IISER IAT 2026 Grand Simulation</h4>
                      <p className="text-xs text-neutral-400 mb-3">
                        Strict 180 min timer, official syllabus distribution (+4 / -1 marks), 60 questions.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300 font-mono mb-4">
                        <div className="bg-neutral-950/80 p-1.5 rounded border border-neutral-800/80">
                          ⏱️ 180 Mins
                        </div>
                        <div className="bg-neutral-950/80 p-1.5 rounded border border-neutral-800/80">
                          🎯 240 Marks
                        </div>
                        <div className="bg-neutral-950/80 p-1.5 rounded border border-neutral-800/80">
                          👥 1,842 Taken
                        </div>
                        <div className="bg-neutral-950/80 p-1.5 rounded border border-neutral-800/80">
                          📊 NTA Scaled
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStepSelect(1)}
                      className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md transition"
                    >
                      <span>Enter Test Hall</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Test 2 */}
                  <div className="p-4 rounded-xl bg-[#11141c] border border-neutral-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          Full-Length CBT #02
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                          NEST Shift-1
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1 mb-2">NISER NEST 2026 Simulation</h4>
                      <p className="text-xs text-neutral-400 mb-3">
                        210 Mins • Sectional cutoffs • Physics, Chemistry, Math & Biology with numerical questions.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300 font-mono mb-4">
                        <div className="bg-neutral-950/80 p-1.5 rounded border border-neutral-800/80">
                          ⏱️ 210 Mins
                        </div>
                        <div className="bg-neutral-950/80 p-1.5 rounded border border-neutral-800/80">
                          🎯 200 Marks
                        </div>
                        <div className="bg-neutral-950/80 p-1.5 rounded border border-neutral-800/80">
                          👥 960 Taken
                        </div>
                        <div className="bg-neutral-950/80 p-1.5 rounded border border-neutral-800/80">
                          🏛️ NISER/CEBS
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStepSelect(1)}
                      className="w-full py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <span>View Test Room</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Test 3 */}
                  <div className="p-4 rounded-xl bg-[#11141c] border border-neutral-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          Official PYQ
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Solved Archive
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1 mb-2">IISER IAT 2025 Official Paper</h4>
                      <p className="text-xs text-neutral-400 mb-3">
                        Re-take the exact 2025 paper with verified answers, LaTeX step-by-step solutions, and AI rank
                        projection.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300 font-mono mb-4">
                        <div className="bg-neutral-950/80 p-1.5 rounded border border-neutral-800/80">
                          ⭐ Score: 178/240
                        </div>
                        <div className="bg-neutral-950/80 p-1.5 rounded border border-neutral-800/80">
                          🏅 AIR 42 Equiv
                        </div>
                        <div className="bg-neutral-950/80 p-1.5 rounded border border-neutral-800/80">
                          🧪 100% KaTeX
                        </div>
                        <div className="bg-neutral-950/80 p-1.5 rounded border border-neutral-800/80">
                          📖 Verified Key
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStepSelect(2)}
                      className="w-full py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <span>Review Analysis</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom Catalog Footer */}
                <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                  <span>💡 24 Full Mocks + 12 Year PYQs Ready for Instant CBT Attempt</span>
                  <span className="text-amber-400 font-medium cursor-pointer hover:underline">
                    Filter by Subject / Year →
                  </span>
                </div>
              </div>
            )}

            {/* ─────────── STEP 1: AUTHENTIC CBT EXAM ROOM ─────────── */}
            {activeStep === 1 && (
              <div className="flex flex-col h-full space-y-3 animate-in fade-in duration-300">
                {/* Candidate & Test Header Bar */}
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#141720] border border-neutral-800 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white tracking-wide">IISER IAT 2026 • Full Mock 01</span>
                    <span className="hidden sm:inline text-neutral-500">|</span>
                    <span className="hidden sm:inline text-neutral-400 font-mono">Candidate: Ananya Sharma (Roll: 2608412)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-amber-500/40 text-amber-400 font-mono font-bold">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>{formatTime(timerSeconds)}</span>
                    </div>
                    <span className="hidden md:inline px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px]">
                      Eng ▾
                    </span>
                  </div>
                </div>

                {/* Subject Selector Tabs */}
                <div className="flex items-center justify-between border-b border-neutral-800 pb-1 text-xs">
                  <div className="flex items-center gap-1 sm:gap-2">
                    {["Physics (15 Qs)", "Chemistry (15 Qs)", "Mathematics (15 Qs)", "Biology (15 Qs)"].map(
                      (subj, idx) => (
                        <button
                          key={subj}
                          onClick={() => setActiveSubject(idx)}
                          className={`px-3 py-1.5 rounded-t-lg font-medium text-[11px] sm:text-xs transition ${
                            activeSubject === idx
                              ? "bg-amber-500/15 text-amber-400 border-b-2 border-amber-400 font-semibold"
                              : "text-neutral-400 hover:text-neutral-200"
                          }`}
                        >
                          {subj}
                        </button>
                      )
                    )}
                  </div>
                  <div className="hidden lg:flex items-center gap-2 text-[10px] text-neutral-400">
                    <span className="text-emerald-400 font-mono font-bold">+4</span> /{" "}
                    <span className="text-red-400 font-mono font-bold">-1</span> Marking Scheme
                  </div>
                </div>

                {/* Main Split: Question Pane (65%) vs Palette (35%) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
                  {/* Left: Question Pane */}
                  <div className="lg:col-span-8 p-4 rounded-xl bg-[#11141c] border border-neutral-800 flex flex-col justify-between">
                    <div>
                      {/* Question meta */}
                      <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2 mb-3">
                        <span className="font-semibold text-white text-xs">
                          Question No. {activeQuestion}{" "}
                          <span className="text-neutral-500 font-normal ml-2">Single Correct Choice MCQ</span>
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          +4.00 / -1.00
                        </span>
                      </div>

                      {/* Question text with KaTeX equation */}
                      <div className="text-neutral-200 text-xs sm:text-sm leading-relaxed mb-4">
                        A monochromatic light beam of wavelength{" "}
                        <span className="font-serif italic text-amber-300">λ = 589 nm</span> is incident on a Young’s
                        double slit with separation{" "}
                        <span className="font-serif italic text-amber-300">d = 0.25 mm</span>. The interference fringes
                        are observed on a screen placed at distance{" "}
                        <span className="font-serif italic text-amber-300">D = 1.2 m</span>.
                        <br />
                        <br />
                        If the entire apparatus is immersed in a liquid of refractive index{" "}
                        <span className="font-serif italic text-amber-300">μ = 1.33</span>, what is the new fringe width{" "}
                        <span className="font-serif italic text-amber-300">β′</span>?
                      </div>

                      {/* Options List */}
                      <div className="space-y-2 mb-4">
                        {[
                          { key: "A", val: "β′ = 2.83 mm" },
                          { key: "B", val: "β′ = 2.12 mm  (Correct Fringe Width in Liquid)" },
                          { key: "C", val: "β′ = 3.76 mm" },
                          { key: "D", val: "β′ = 1.59 mm" },
                        ].map((opt) => {
                          const isSelected = selectedOption === opt.key;
                          return (
                            <button
                              key={opt.key}
                              onClick={() => setSelectedOption(opt.key)}
                              className={`w-full p-2.5 rounded-lg border text-left flex items-center gap-3 transition text-xs sm:text-sm ${
                                isSelected
                                  ? "bg-amber-500/15 border-amber-500/60 text-white font-medium shadow-sm"
                                  : "bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                              }`}
                            >
                              <span
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                                  isSelected ? "bg-amber-400 text-black" : "bg-neutral-800 text-neutral-400"
                                }`}
                              >
                                {opt.key}
                              </span>
                              <span className="font-mono">{opt.val}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-neutral-800/80">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsMarkedReview(!isMarkedReview)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                            isMarkedReview
                              ? "bg-purple-950/80 border-purple-500 text-purple-300"
                              : "bg-neutral-900 border-neutral-700 text-neutral-300 hover:text-white"
                          }`}
                        >
                          {isMarkedReview ? "✓ Marked for Review" : "Mark for Review"}
                        </button>
                        <button
                          onClick={() => setSelectedOption("")}
                          className="px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white text-xs transition"
                        >
                          Clear
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveQuestion((prev) => (prev < 60 ? prev + 1 : 1));
                          }}
                          className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition shadow-md"
                        >
                          Save & Next →
                        </button>
                        <button
                          onClick={() => handleStepSelect(2)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-medium transition"
                        >
                          Submit Test
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Question Palette (TCS-iON 60 Qs Grid) */}
                  <div className="lg:col-span-4 p-3 rounded-xl bg-[#11141c] border border-neutral-800 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white mb-2 flex items-center justify-between">
                        <span>Question Palette</span>
                        <span className="text-[10px] text-neutral-400 font-mono">60 Questions</span>
                      </div>

                      {/* Legend */}
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono text-neutral-300 mb-3 p-2 rounded bg-neutral-950/80 border border-neutral-800/80">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-sm bg-emerald-500 text-black flex items-center justify-center font-bold text-[8px]">
                            24
                          </span>
                          <span>Answered</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-sm bg-red-500 text-white flex items-center justify-center font-bold text-[8px]">
                            6
                          </span>
                          <span>Not Answered</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-sm bg-purple-500 text-white flex items-center justify-center font-bold text-[8px]">
                            2
                          </span>
                          <span>Review</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-sm bg-neutral-700 text-neutral-300 flex items-center justify-center font-bold text-[8px]">
                            28
                          </span>
                          <span>Not Visited</span>
                        </div>
                      </div>

                      {/* Numbered Palette Grid (Showing 40 cells for clean responsive fit) */}
                      <div className="grid grid-cols-6 sm:grid-cols-8 gap-1 max-h-[220px] overflow-y-auto p-1 pr-2">
                        {Array.from({ length: 40 }).map((_, i) => {
                          const qNum = i + 1;
                          const isCurrent = qNum === activeQuestion;
                          let bgClass = "bg-neutral-800 text-neutral-400"; // not visited
                          if (qNum <= 24) bgClass = "bg-emerald-600/90 text-white"; // answered
                          else if (qNum <= 30) bgClass = "bg-red-600/90 text-white"; // not answered
                          else if (qNum === 31 || qNum === 32) bgClass = "bg-purple-600/90 text-white"; // review

                          return (
                            <button
                              key={qNum}
                              onClick={() => setActiveQuestion(qNum)}
                              className={`h-7 rounded text-[10px] font-mono font-bold flex items-center justify-center transition ${bgClass} ${
                                isCurrent ? "ring-2 ring-amber-400 ring-offset-1 ring-offset-neutral-900 scale-105" : ""
                              }`}
                            >
                              {qNum}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-neutral-800 text-[10px] text-neutral-400 text-center font-mono">
                      Click any question number to jump immediately
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─────────── STEP 2: INSTANT ALL-INDIA SCORECARD ─────────── */}
            {activeStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                {/* Result Header */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-neutral-900 via-[#131822] to-neutral-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                        Post-Exam Performance Dossier
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Top 0.5% All-India
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">IISER IAT 2026 Mock 01 • Result Certified</h3>
                    <p className="text-xs text-neutral-400">
                      Evaluated under official NTA negative marking guidelines with 12,480 peer attempts.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStepSelect(3)}
                      className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs flex items-center gap-1.5 transition shadow"
                    >
                      <span>Fix Weak Areas (Adaptive)</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 4 High-Impact KPI Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#11141c] border border-neutral-800">
                    <div className="text-[11px] text-neutral-400 font-mono uppercase mb-1">Total Net Score</div>
                    <div className="text-2xl font-extrabold text-amber-400 font-mono">196 / 240</div>
                    <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>+24 vs previous attempt</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#11141c] border border-neutral-800">
                    <div className="text-[11px] text-neutral-400 font-mono uppercase mb-1">Projected Rank</div>
                    <div className="text-2xl font-extrabold text-white font-mono">AIR 14</div>
                    <div className="text-[10px] text-neutral-400 mt-1">Out of 12,480 candidates</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#11141c] border border-neutral-800">
                    <div className="text-[11px] text-neutral-400 font-mono uppercase mb-1">Percentile</div>
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono">99.42 %ile</div>
                    <div className="text-[10px] text-neutral-400 mt-1">Target: IISER Pune / IISc</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#11141c] border border-neutral-800">
                    <div className="text-[11px] text-neutral-400 font-mono uppercase mb-1">Accuracy</div>
                    <div className="text-2xl font-extrabold text-blue-400 font-mono">88.5%</div>
                    <div className="text-[10px] text-neutral-400 mt-1">48 Correct • 6 Wrong • 6 Skip</div>
                  </div>
                </div>

                {/* Subject Accuracy Breakdown Bars */}
                <div className="p-4 rounded-xl bg-[#11141c] border border-neutral-800">
                  <div className="text-xs font-bold text-white mb-3 flex items-center justify-between">
                    <span>Subject-Wise Mastery Breakdown</span>
                    <span className="text-[11px] text-neutral-400 font-mono">IAT Standard (60 Marks / Subject)</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    {/* Physics */}
                    <div>
                      <div className="flex justify-between text-neutral-300 mb-1">
                        <span className="font-semibold text-white">Physics</span>
                        <span className="text-amber-400">52 / 60 (92% Accuracy)</span>
                      </div>
                      <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 w-[92%]" />
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-1">Strong: Wave Optics, Kinematics, Modern Physics</div>
                    </div>

                    {/* Chemistry */}
                    <div>
                      <div className="flex justify-between text-neutral-300 mb-1">
                        <span className="font-semibold text-white">Chemistry</span>
                        <span className="text-emerald-400">56 / 60 (95% Accuracy)</span>
                      </div>
                      <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[95%]" />
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-1">Strong: Chemical Thermodynamics, Coordination Compounds</div>
                    </div>

                    {/* Mathematics */}
                    <div>
                      <div className="flex justify-between text-neutral-300 mb-1">
                        <span className="font-semibold text-white">Mathematics</span>
                        <span className="text-blue-400">48 / 60 (85% Accuracy)</span>
                      </div>
                      <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[85%]" />
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-1">Needs Practice: Permutations & Definite Integrals</div>
                    </div>

                    {/* Biology */}
                    <div>
                      <div className="flex justify-between text-neutral-300 mb-1">
                        <span className="font-semibold text-white">Biology</span>
                        <span className="text-purple-400">40 / 60 (80% Accuracy)</span>
                      </div>
                      <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-400 w-[80%]" />
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-1">Needs Practice: Genetics & Cellular Respiration</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─────────── STEP 3: ADAPTIVE REVISION & BOOKMARKS ─────────── */}
            {activeStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                {/* Header */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-neutral-900 to-[#12161f] border border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1">
                      AI Adaptive Practice Drill
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Targeted Weak-Spot Eradication: Rotational Dynamics
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-neutral-400">Chapter Mastery</div>
                    <div className="text-lg font-extrabold text-amber-400 font-mono">78% → 86%</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                  {/* Left: Interactive Micro-Drill Question */}
                  <div className="lg:col-span-8 p-4 rounded-xl bg-[#11141c] border border-neutral-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2 mb-3">
                        <span className="text-xs font-semibold text-white">
                          Targeted Drill Question 4 of 10 • Physics
                        </span>

                        {/* Interactive Bookmark Button */}
                        <button
                          onClick={() => setIsBookmarked(!isBookmarked)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition ${
                            isBookmarked
                              ? "bg-amber-500/20 border-amber-500/60 text-amber-300"
                              : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-400 text-amber-400" : ""}`} />
                          <span>{isBookmarked ? "Bookmarked for Exam Day" : "Bookmark Question"}</span>
                        </button>
                      </div>

                      <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed mb-4">
                        A solid cylinder of mass <span className="font-serif italic text-amber-300">M</span> and radius{" "}
                        <span className="font-serif italic text-amber-300">R</span> rolls down an inclined plane of
                        inclination angle <span className="font-serif italic text-amber-300">θ</span> without slipping.
                        Find the acceleration of its center of mass{" "}
                        <span className="font-serif italic text-amber-300">a_cm</span>.
                      </div>

                      {/* Options */}
                      <div className="space-y-2 mb-4">
                        {[
                          { key: "A", text: "a_cm = g sin θ" },
                          { key: "B", text: "a_cm = (1/2) g sin θ" },
                          { key: "C", text: "a_cm = (2/3) g sin θ  (Correct Derivation)" },
                          { key: "D", text: "a_cm = (3/4) g sin θ" },
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => setSelectedAdaptiveOption(opt.key)}
                            className={`w-full p-2.5 rounded-lg border text-left flex items-center gap-3 transition text-xs sm:text-sm font-mono ${
                              selectedAdaptiveOption === opt.key
                                ? "bg-emerald-500/15 border-emerald-500/60 text-white font-semibold"
                                : "bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                                selectedAdaptiveOption === opt.key
                                  ? "bg-emerald-400 text-black"
                                  : "bg-neutral-800 text-neutral-400"
                              }`}
                            >
                              {opt.key}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        ))}
                      </div>

                      {/* Step-by-Step KaTeX Explanation Drawer */}
                      {showSolution && (
                        <div className="p-3 rounded-lg bg-neutral-950/90 border border-neutral-800 text-xs font-mono space-y-1.5 text-neutral-300">
                          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Step-by-Step Solution & Physics Derivation</span>
                          </div>
                          <div>1. For rolling without slipping: a_cm = α · R</div>
                          <div>2. Torque equation about center of mass: f_s · R = I_cm · α = (1/2 M R²) · (a_cm / R)</div>
                          <div>3. Force down incline: M g sin θ - f_s = M a_cm ⇒ f_s = 1/2 M a_cm</div>
                          <div>4. Substituting: M g sin θ = 3/2 M a_cm ⇒ a_cm = (2/3) g sin θ</div>
                          <div className="text-emerald-400 font-bold">✓ Option C is verified correct.</div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 mt-3">
                      <button
                        onClick={() => setShowSolution(!showSolution)}
                        className="text-xs text-neutral-400 hover:text-white transition"
                      >
                        {showSolution ? "Hide Derivation" : "Show Full Derivation"}
                      </button>

                      <button
                        onClick={() => handleStepSelect(0)}
                        className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition shadow"
                      >
                        Back to Test Catalog →
                      </button>
                    </div>
                  </div>

                  {/* Right: Saved Bookmarks & Chapter Progress */}
                  <div className="lg:col-span-4 p-3 rounded-xl bg-[#11141c] border border-neutral-800 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white mb-2 flex items-center justify-between">
                        <span>Personal Revision Queue</span>
                        <span className="text-[10px] text-amber-400 font-mono">14 Bookmarked</span>
                      </div>

                      <div className="space-y-2">
                        <div className="p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800 text-xs">
                          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1">
                            <span className="text-amber-400">Physics • Wave Optics</span>
                            <span>Q14 from Mock 01</span>
                          </div>
                          <div className="text-neutral-200 line-clamp-1">Fringe width with liquid immersion μ = 1.33</div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800 text-xs">
                          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1">
                            <span className="text-emerald-400">Chemistry • Kinetics</span>
                            <span>Q28 from IAT 2025</span>
                          </div>
                          <div className="text-neutral-200 line-clamp-1">Arrhenius activation energy temperature dependence</div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800 text-xs">
                          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1">
                            <span className="text-blue-400">Math • Calculus</span>
                            <span>Q45 from Mock 02</span>
                          </div>
                          <div className="text-neutral-200 line-clamp-1">Leibniz integral rule for parametric limits</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-neutral-800">
                      <div className="text-[11px] text-neutral-400 font-mono mb-1">Weak-Area Eradication Rate</div>
                      <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 w-[78%]" />
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-1 flex justify-between">
                        <span>78% complete</span>
                        <span className="text-emerald-400">Target: 95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Monitor Status Edge */}
          <div className="h-9 px-4 bg-[#0d1015] border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-neutral-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Live Demo Session
              </span>
              <span className="hidden sm:inline text-neutral-600">•</span>
              <span className="hidden sm:inline text-neutral-400">
                Click any step tab or question above to test interactivity
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://test.vigyanprep.com"
                className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 transition"
              >
                <span>Launch Live Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            href="https://test.vigyanprep.com/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold text-sm shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition transform hover:-translate-y-0.5"
          >
            Start Free IISER IAT / NEST CBT Mock →
          </a>

          <Link
            href="/pyq"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 text-sm font-medium transition"
          >
            Explore Solved PYQ Archive
          </Link>
        </div>
      </div>
    </section>
  );
}
