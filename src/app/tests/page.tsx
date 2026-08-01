"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight, Check, Sparkles, Award, Atom, Dna, Network, FunctionSquare, BookOpen,
  Brain, BarChart3, FileText, Settings2, ShieldCheck, CheckCircle2, Lock, User, LogIn
} from "lucide-react";

interface Plan {
  id: string;
  exam_type: string;
  name: string;
  duration_days: number;
  price: number;
  discount_price: number | null;
  active: boolean;
}

interface ScheduledTest {
  id: string;
  title: string;
  exam_type: string;
  window_start: string;
  window_end: string;
  duration_minutes: number;
  description: string;
  status: string;
}

export default function BuyTestPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [scheduledTests, setScheduledTests] = useState<ScheduledTest[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [selectedExam, setSelectedExam] = useState<string>("ALL");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPlanForPurchase, setSelectedPlanForPurchase] = useState<Plan | null>(null);

  // User auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check local student auth token
    const token = typeof window !== 'undefined' ? (localStorage.getItem('student_token') || localStorage.getItem('token')) : null;
    setIsLoggedIn(!!token);

    async function fetchData() {
      try {
        const [plansRes, testsRes] = await Promise.all([
          fetch("https://api.vigyanprep.com/api/public/plans"),
          fetch("https://api.vigyanprep.com/api/public/tests")
        ]);

        if (plansRes.ok) {
          const plansData = await plansRes.json();
          setPlans(plansData.plans || []);
        }

        if (testsRes.ok) {
          const testsData = await testsRes.json();
          setScheduledTests(testsData.tests || []);
        }
      } catch (err) {
        console.error("Failed to load test series plans:", err);
      } finally {
        setLoadingPlans(false);
      }
    }

    fetchData();
  }, []);

  const handleBuyClick = (plan: Plan) => {
    setSelectedPlanForPurchase(plan);
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      // Trigger Razorpay payment gateway
      alert(`🚀 Redirecting to Razorpay checkout for ${plan.name} (₹${plan.discount_price || plan.price})...`);
    }
  };

  const filteredPlans = selectedExam === "ALL" 
    ? plans 
    : plans.filter(p => p.exam_type.toUpperCase() === selectedExam.toUpperCase());

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white selection:bg-amber-500 selection:text-black font-sans">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION (DARK & ELEGANT WITH CHALKBOARD SCIENCE WATERMARK)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0c0c0c]">
        {/* Chalkboard Math & Physics Background Sketches Watermark */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] flex items-center justify-end pr-12">
          <svg className="w-full max-w-xl text-amber-200" viewBox="0 0 600 400" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M 50 200 Q 150 100 250 200 T 450 200" strokeDasharray="4 4" />
            <circle cx="250" cy="200" r="80" strokeDasharray="6 6" />
            <text x="350" y="120" fill="currentColor" fontSize="24" fontFamily="serif">E = mc²</text>
            <text x="180" y="320" fill="currentColor" fontSize="20" fontFamily="serif">∫ f(x)dx</text>
            <path d="M 400 250 L 520 350 M 400 350 L 520 250" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white leading-tight">
              Prepare Smarter. <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent italic">
                Think Deeper.
              </span>
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
              Premium test series & PYQs for <strong className="text-amber-300 font-semibold">IISER Aptitude Test (IAT)</strong>, NEST, CMI, ISI and more.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#pricing-plans"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-neutral-950 font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <span>Explore Test Series</span>
                <ArrowRight size={18} />
              </a>

              <a
                href="/pyq/iiser"
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-gray-200 hover:text-amber-300 hover:border-amber-400/40 text-sm font-semibold transition-all flex items-center gap-2"
              >
                <BookOpen size={16} className="text-amber-400" />
                <span>Try a Free Test</span>
              </a>
            </div>

            {/* Value Props Pills Bar */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-300 font-medium border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                <span>Real Exam Interface</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain size={15} className="text-amber-400 shrink-0" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-amber-400 shrink-0" />
                <span>Detailed Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 size={15} className="text-amber-400 shrink-0" />
                <span>Track Your Progress</span>
              </div>
            </div>
          </div>

          {/* Right Floating Banner Art */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-end justify-center space-y-4 text-right pr-4 opacity-80">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-amber-400/90 font-bold">FOCUS</span>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-amber-300/80 font-bold">PRACTICE</span>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-amber-200/70 font-bold">PROGRESS</span>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-orange-400/90 font-bold">EXCEL</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CHOOSE YOUR EXAM GRID (MATCHING REFERENCE IMAGE 1 LIGHT CARDS)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-[#f8fafc] text-slate-900">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-0.5 bg-amber-500"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Select Exam Category</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">Choose Your Exam</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* IAT Card */}
            <div
              onClick={() => setSelectedExam("IAT")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white shadow-sm hover:shadow-md flex flex-col justify-between ${
                selectedExam === "IAT" ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200 hover:border-amber-400"
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 text-blue-600">
                  <Atom size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">IAT</h3>
                <p className="text-xs text-slate-500 mb-3">IISER Aptitude Test</p>
                <p className="text-xs text-slate-600 leading-relaxed font-light mb-6">
                  Designed for IISER admissions. Physics, Chemistry, Mathematics, Biology.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                View Series →
              </span>
            </div>

            {/* NEST Card */}
            <div
              onClick={() => setSelectedExam("NEST")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white shadow-sm hover:shadow-md flex flex-col justify-between ${
                selectedExam === "NEST" ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200 hover:border-amber-400"
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-4 text-purple-600">
                  <Dna size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">NEST</h3>
                <p className="text-xs text-slate-500 mb-3">National Entrance Screening Test</p>
                <p className="text-xs text-slate-600 leading-relaxed font-light mb-6">
                  For B.Sc. in National Institutes Across India (NISER & UM-DAE CEBS).
                </p>
              </div>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                View Series →
              </span>
            </div>

            {/* CMI Card */}
            <div
              onClick={() => setSelectedExam("CMI")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white shadow-sm hover:shadow-md flex flex-col justify-between ${
                selectedExam === "CMI" ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200 hover:border-amber-400"
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 text-emerald-600">
                  <Network size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">CMI</h3>
                <p className="text-xs text-slate-500 mb-3">Chennai Mathematical Institute</p>
                <p className="text-xs text-slate-600 leading-relaxed font-light mb-6">
                  Entrance exam for CMI B.Sc. Mathematics & Computer Science.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                View Series →
              </span>
            </div>

            {/* ISI Card */}
            <div
              onClick={() => setSelectedExam("ISI")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white shadow-sm hover:shadow-md flex flex-col justify-between ${
                selectedExam === "ISI" ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200 hover:border-amber-400"
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4 text-orange-600">
                  <FunctionSquare size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">ISI</h3>
                <p className="text-xs text-slate-500 mb-3">Indian Statistical Institute</p>
                <p className="text-xs text-slate-600 leading-relaxed font-light mb-6">
                  Admission to ISI B.Stat / B.Math undergraduate programs.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                View Series →
              </span>
            </div>

            {/* More Exams Card */}
            <div
              onClick={() => setSelectedExam("ALL")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white shadow-sm hover:shadow-md flex flex-col justify-between ${
                selectedExam === "ALL" ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200 hover:border-amber-400"
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4 text-slate-700">
                  <BookOpen size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">More Exams</h3>
                <p className="text-xs text-slate-500 mb-3">IISc, KVPY, TIFR</p>
                <p className="text-xs text-slate-600 leading-relaxed font-light mb-6">
                  Explore all comprehensive test packages across science research.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1 group-hover:translate-x-1 transition">
                Explore All →
              </span>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              BLACK FEATURE BANNER (MATCHING REFERENCE IMAGE 1)
             ═══════════════════════════════════════════════════════════════════ */}
          <div className="bg-[#0f0f11] text-white p-8 rounded-2xl shadow-xl grid grid-cols-2 md:grid-cols-5 gap-6 border border-white/10 mt-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Atom size={18} />
                <span>Real Exam Experience</span>
              </div>
              <p className="text-xs text-gray-400">Exactly like the real exam interface</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Brain size={18} />
                <span>AI-Powered Analysis</span>
              </div>
              <p className="text-xs text-gray-400">Identify weak topics instantly</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <BarChart3 size={18} />
                <span>Rank & Percentile</span>
              </div>
              <p className="text-xs text-gray-400">Know where you stand in India</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <FileText size={18} />
                <span>Detailed Solutions</span>
              </div>
              <p className="text-xs text-gray-400">Concept clarity by expert mentors</p>
            </div>

            <div className="space-y-1 col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Settings2 size={18} />
                <span>Smart Adaptive Tests</span>
              </div>
              <p className="text-xs text-gray-400">Practice that adapts to your speed</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          LIVE PRICING & SUBSCRIPTION CARDS SECTION
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="pricing-plans" className="py-20 px-6 bg-[#0c0c0c] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              Live Subscription Passes
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Choose Your Preparation Pass
            </h2>
            <p className="text-gray-400 text-base">
              Get unlimited access to all full-length 24-hour Allen-model mock test series, chapter practice tests, and verified PYQs.
            </p>
          </div>

          {loadingPlans ? (
            <div className="text-center py-12 text-amber-400 font-mono">Loading subscription plans...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPlans.map((plan) => {
                const finalPrice = plan.discount_price || plan.price;
                return (
                  <div
                    key={plan.id}
                    className="bg-[#141416] border border-amber-500/30 rounded-3xl p-8 flex flex-col justify-between hover:border-amber-400 transition-all shadow-2xl relative overflow-hidden group"
                  >
                    {/* Top Ribbon */}
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-black font-bold text-[10px] uppercase px-4 py-1.5 rounded-bl-xl tracking-wider">
                      {plan.exam_type} PASS
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                        <p className="text-xs text-gray-400 mt-1">{plan.duration_days} Days Full Access</p>
                      </div>

                      <div className="flex items-baseline gap-3 pb-6 border-b border-white/10">
                        <span className="text-4xl font-black text-amber-400">₹{finalPrice}</span>
                        {plan.discount_price && (
                          <span className="text-sm line-through text-gray-500">₹{plan.price}</span>
                        )}
                        <span className="text-xs text-gray-400 font-mono">/ {plan.duration_days} Days</span>
                      </div>

                      <ul className="space-y-3 text-xs text-gray-300">
                        <li className="flex items-center gap-2">
                          <Check size={16} className="text-amber-400" />
                          <span>All 24-Hour Scheduled Allen Model Mock Tests</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={16} className="text-amber-400" />
                          <span>Unlimited Practice on PYQ Archive</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={16} className="text-amber-400" />
                          <span>AI Percentile & All India Rank Predictor</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={16} className="text-amber-400" />
                          <span>Step-by-Step Detailed Solution Keys</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-8">
                      <button
                        onClick={() => handleBuyClick(plan)}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-neutral-950 font-bold text-sm hover:opacity-95 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                      >
                        <span>Subscribe & Buy Pass</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredPlans.length === 0 && (
                <div className="col-span-full py-16 text-center bg-[#141416] rounded-3xl border border-white/10 text-gray-400 space-y-3">
                  <p>No active subscription plans found for <strong>{selectedExam}</strong>.</p>
                  <button onClick={() => setSelectedExam("ALL")} className="text-amber-400 text-xs font-bold underline">
                    View All Exam Plans
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS & QUOTE FOOTER BAR (MATCHING REFERENCE IMAGE 1)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-6 bg-white text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-slate-900">10,000+</p>
              <p className="text-[11px] text-slate-500 font-semibold uppercase">Students Enrolled</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">50,000+</p>
              <p className="text-[11px] text-slate-500 font-semibold uppercase">Tests Attempted</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">95%</p>
              <p className="text-[11px] text-slate-500 font-semibold uppercase">Students Improved</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">500+</p>
              <p className="text-[11px] text-slate-500 font-semibold uppercase">PYQ Papers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">Top 100</p>
              <p className="text-[11px] text-slate-500 font-semibold uppercase">Ranks Achieved</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-slate-900 font-serif italic text-right max-w-xs">
            <p className="text-lg font-bold text-amber-900">“Discipline today. <br />Scientist tomorrow.”</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          LOGIN REQUIRED MODAL (FOR UNAUTHENTICATED BUYERS)
         ═══════════════════════════════════════════════════════════════════════ */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#141416] border border-amber-500/40 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <Lock size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Student Sign In Required</h3>
              <p className="text-xs text-gray-400">
                Please log in or create a student account to purchase the <strong className="text-amber-300">{selectedPlanForPurchase?.name}</strong>.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href="https://auth.vigyanprep.com"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition shadow-lg"
              >
                <LogIn size={18} />
                <span>Log In / Sign Up to Continue</span>
              </a>

              <button
                onClick={() => setShowAuthModal(false)}
                className="text-xs text-gray-500 hover:text-gray-300 transition pt-2"
              >
                Cancel and return to plans
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
