"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight, Check, Award, Atom, Dna, Network, FunctionSquare, BookOpen,
  Brain, BarChart3, FileText, Settings2, Lock, LogIn, Sparkles, GraduationCap, Compass
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

import { getCookie } from "@/lib/cookies";

export default function BuyTestPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [selectedExam, setSelectedExam] = useState<string>("ALL");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPlanForPurchase, setSelectedPlanForPurchase] = useState<Plan | null>(null);

  // User auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check shared cookies and fallback to local storage
    const token = getCookie("student_token") || (typeof window !== 'undefined' ? (localStorage.getItem('student_token') || localStorage.getItem('token')) : null);
    setIsLoggedIn(!!token);
    if (token && typeof window !== 'undefined' && !localStorage.getItem('student_token')) {
      localStorage.setItem('student_token', token);
    }

    async function fetchPlans() {
      try {
        const res = await fetch("https://api.vigyanprep.com/api/public/plans");
        if (res.ok) {
          const plansData = await res.json();
          setPlans(plansData.plans || []);
        }
      } catch (err) {
        console.error("Failed to load test series plans:", err);
      } finally {
        setLoadingPlans(false);
      }
    }

    fetchPlans();
  }, []);

  const openRazorpayCheckout = async (plan: Plan) => {
    try {
      const res = await fetch("https://api.vigyanprep.com/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          amount: plan.discount_price || plan.price,
          testSeriesId: plan.id
        })
      });
      const data = await res.json();
      if (!data.success || !data.order) {
        alert("Payment initialization error: " + (data.error || "Unable to create Razorpay order"));
        return;
      }

      const options = {
        key: data.order.key || "rzp_test_mockKey123",
        amount: data.order.amount,
        currency: "INR",
        name: "Vigyan.prep",
        description: `${plan.name} Subscription Pass`,
        order_id: data.order.id,
        handler: async function (response: any) {
          await fetch("https://api.vigyanprep.com/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: plan.id
            })
          });
          alert(`🎉 Payment Successful! Your ${plan.name} has been activated.`);
          window.location.href = "https://test.vigyanprep.com/dashboard";
        },
        prefill: {
          name: "Science Student",
          email: "student@vigyanprep.com"
        },
        theme: {
          color: "#d4a520"
        }
      };

      if (typeof window !== "undefined" && !(window as any).Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        };
        document.body.appendChild(script);
      } else if (typeof window !== "undefined" && (window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (err: any) {
      alert("Error launching payment checkout: " + err.message);
    }
  };

  const handleBuyClick = (plan: Plan) => {
    setSelectedPlanForPurchase(plan);
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      openRazorpayCheckout(plan);
    }
  };

  // Robust flexible exam matching so no card is hidden due to minor naming differences
  const isExamMatch = (planExamType: string, targetExam: string) => {
    if (targetExam === "ALL") return true;
    if (!planExamType) return true;
    const pType = planExamType.toUpperCase();
    const tExam = targetExam.toUpperCase();

    if (pType.includes(tExam) || tExam.includes(pType)) return true;
    if (pType.includes("ALL") || pType.includes("PASS") || pType.includes("SERIES") || pType.includes("FULL")) return true;

    return false;
  };

  const filteredPlans = plans.filter(p => isExamMatch(p.exam_type, selectedExam));

  // Fallback: If filter returns no items, show all active plans so student always sees available passes
  const displayPlans = filteredPlans.length > 0 ? filteredPlans : plans;

  const scrollToPricing = (examCode: string) => {
    setSelectedExam(examCode);
    const pricingEl = document.getElementById("pricing-section");
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a08] text-[#f2ead8] selection:bg-amber-500 selection:text-black font-sans">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════════
          HANDCRAFTED ARTISTIC HERO SECTION FOR SCIENCE ASPIRANTS
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden border-b border-amber-500/15 bg-gradient-to-b from-[#141009] via-[#0d0b07] to-[#0b0a08]">
        {/* Subtle Constellation & Geometric Science Grid Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d4a520_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles size={14} className="text-amber-400" /> Curated by IISER & NISER Scholars
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Master Science Entrances. <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent italic">
                Build Your Research Legacy.
              </span>
            </h1>

            <p className="text-neutral-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
              Official pattern test series and solved question archives for <strong className="text-amber-300 font-semibold">IISER IAT</strong>, <strong className="text-amber-300 font-semibold">NISER NEST</strong>, <strong className="text-amber-300 font-semibold">CMI</strong>, and <strong className="text-amber-300 font-semibold">ISI</strong> admissions.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToPricing("ALL")}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-neutral-950 font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <span>View Subscription Passes</span>
                <ArrowRight size={18} />
              </button>

              <a
                href="/pyq/iiser"
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-neutral-200 hover:text-amber-300 hover:border-amber-400/40 text-sm font-semibold transition-all flex items-center gap-2"
              >
                <BookOpen size={16} className="text-amber-400" />
                <span>Practice Free PYQs</span>
              </a>
            </div>

            {/* Handcrafted Feature Pillars */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-neutral-300 border-t border-white/10">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-amber-400 shrink-0" />
                <span>IISER / NISER Pattern</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain size={16} className="text-amber-400 shrink-0" />
                <span>AI Topic Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-amber-400 shrink-0" />
                <span>Step-by-Step Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-amber-400 shrink-0" />
                <span>All-India Percentile</span>
              </div>
            </div>
          </div>

          {/* Right Handcrafted Science Card Motif */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 border border-amber-500/30 shadow-2xl relative">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6">
              <Compass size={32} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-center text-amber-200 mb-2">Designed for Aspirants</h3>
            <p className="text-xs text-neutral-400 text-center leading-relaxed font-light mb-6">
              Physics, Chemistry, Mathematics & Biology problem sets crafted to build deep intuition for research entrance exams.
            </p>
            <div className="w-full pt-4 border-t border-white/10 text-center">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                10,000+ Aspirants Practicing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          HANDCRAFTED EXAM CATEGORY SELECTION CARDS
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-[#f8fafc] text-slate-900">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-amber-500"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Select Exam Category</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">Choose Your Exam Path</h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Click any exam card below to filter subscription passes & test series packages specifically designed for that entrance exam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* IAT Card */}
            <div
              onClick={() => scrollToPricing("IAT")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white shadow-sm hover:shadow-md flex flex-col justify-between group ${
                selectedExam === "IAT" ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200 hover:border-amber-400"
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition">
                  <Atom size={24} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-xl text-slate-900">IAT</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">IISER</span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mb-3">IISER Aptitude Test</p>
                <p className="text-xs text-slate-600 leading-relaxed font-light mb-6">
                  Complete test series for BS-MS admissions across 7 IISER campuses. Physics, Chemistry, Math & Biology.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                View IAT Passes →
              </span>
            </div>

            {/* NEST Card */}
            <div
              onClick={() => scrollToPricing("NEST")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white shadow-sm hover:shadow-md flex flex-col justify-between group ${
                selectedExam === "NEST" ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200 hover:border-amber-400"
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition">
                  <Dna size={24} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-xl text-slate-900">NEST</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">NISER</span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mb-3">National Entrance Screening Test</p>
                <p className="text-xs text-slate-600 leading-relaxed font-light mb-6">
                  Targeted mock series for NISER Bhubaneswar & UM-DAE CEBS Mumbai integrated M.Sc. programs.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                View NEST Passes →
              </span>
            </div>

            {/* CMI Card */}
            <div
              onClick={() => scrollToPricing("CMI")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white shadow-sm hover:shadow-md flex flex-col justify-between group ${
                selectedExam === "CMI" ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200 hover:border-amber-400"
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 text-emerald-600 group-hover:scale-110 transition">
                  <Network size={24} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-xl text-slate-900">CMI</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">MATH</span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mb-3">Chennai Mathematical Institute</p>
                <p className="text-xs text-slate-600 leading-relaxed font-light mb-6">
                  Rigorous proof-based mathematics and computer science problem sets tailored for CMI entrance.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                View CMI Passes →
              </span>
            </div>

            {/* ISI Card */}
            <div
              onClick={() => scrollToPricing("ISI")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white shadow-sm hover:shadow-md flex flex-col justify-between group ${
                selectedExam === "ISI" ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200 hover:border-amber-400"
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4 text-orange-600 group-hover:scale-110 transition">
                  <FunctionSquare size={24} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-xl text-slate-900">ISI</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800">STAT</span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mb-3">Indian Statistical Institute</p>
                <p className="text-xs text-slate-600 leading-relaxed font-light mb-6">
                  Advanced B.Stat & B.Math test series focusing on analytical problem solving & statistics.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                View ISI Passes →
              </span>
            </div>
          </div>

          {/* Platform Pillars Banner */}
          <div className="bg-[#0f0e0c] text-white p-8 rounded-2xl shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 border border-white/10 mt-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Atom size={18} />
                <span>Real CBT Interface</span>
              </div>
              <p className="text-xs text-neutral-400">Authentic test interface experience</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Brain size={18} />
                <span>Topic Analytics</span>
              </div>
              <p className="text-xs text-neutral-400">Identify and strengthen weak areas</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <BarChart3 size={18} />
                <span>Percentile Predictor</span>
              </div>
              <p className="text-xs text-neutral-400">Know your stand among all-India test takers</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <FileText size={18} />
                <span>Verified Solutions</span>
              </div>
              <p className="text-xs text-neutral-400">Detailed step-by-step explanations</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          LIVE PRICING & SUBSCRIPTION PASSES SECTION
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="pricing-section" className="py-20 px-6 bg-[#0e0c09] border-t border-amber-500/15">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              Available Test Passes
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Choose Your Subscription Pass
            </h2>
            <p className="text-neutral-300 text-base">
              Select a pass below to unlock full-length test series, chapter practice sets, and verified PYQ archives.
            </p>

            {/* Exam Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {["ALL", "IAT", "NEST", "CMI", "ISI"].map((exam) => (
                <button
                  key={exam}
                  onClick={() => setSelectedExam(exam)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedExam === exam
                      ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20"
                      : "bg-neutral-900 border border-white/10 text-neutral-300 hover:border-amber-400/40"
                  }`}
                >
                  {exam === "ALL" ? "All Passes" : `${exam} Pass`}
                </button>
              ))}
            </div>
          </div>

          {loadingPlans ? (
            <div className="text-center py-16 text-amber-400 font-mono">Loading subscription plans...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayPlans.map((plan) => {
                const finalPrice = plan.discount_price || plan.price;
                return (
                  <div
                    key={plan.id}
                    className="bg-[#15120d] border border-amber-500/30 rounded-3xl p-8 flex flex-col justify-between hover:border-amber-400 transition-all shadow-2xl relative overflow-hidden group"
                  >
                    {/* Top Ribbon */}
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-orange-500 text-neutral-950 font-bold text-[10px] uppercase px-4 py-1.5 rounded-bl-xl tracking-wider">
                      {plan.exam_type}
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {plan.exam_type && !plan.name.toUpperCase().includes(plan.exam_type.toUpperCase())
                            ? `${plan.exam_type} — `
                            : ''}
                          {plan.name}
                        </h3>
                        <p className="text-xs text-amber-300 mt-1 font-semibold">{plan.exam_type} Pass &middot; {plan.duration_days} Days Full Access</p>
                      </div>

                      <div className="flex items-baseline gap-3 pb-6 border-b border-white/10">
                        <span className="text-4xl font-black text-amber-400">₹{finalPrice}</span>
                        {plan.discount_price && (
                          <span className="text-sm line-through text-neutral-500">₹{plan.price}</span>
                        )}
                        <span className="text-xs text-neutral-400 font-mono">/ {plan.duration_days} Days</span>
                      </div>

                      <ul className="space-y-3.5 text-xs text-neutral-200">
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className="text-amber-400 shrink-0" />
                          <span>Full-Length Official Pattern Mock Tests</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className="text-amber-400 shrink-0" />
                          <span>Complete Chapter-Wise Practice Bank</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className="text-amber-400 shrink-0" />
                          <span>All India Percentile & Rank Predictor</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className="text-amber-400 shrink-0" />
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

              {displayPlans.length === 0 && (
                <div className="col-span-full py-16 text-center bg-[#15120d] rounded-3xl border border-white/10 text-neutral-400 space-y-3">
                  <p>No subscription passes found right now.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STUDENT STATS & MOTIVATIONAL FOOTER
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-6 bg-white text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-serif font-bold text-slate-900">10,000+</p>
              <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">Students Practicing</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-slate-900">50,000+</p>
              <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">Tests Attempted</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-slate-900">500+</p>
              <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">PYQ Questions</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-slate-900">Top 100</p>
              <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">Ranks Achieved</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-slate-900 font-serif italic text-right max-w-xs shadow-sm">
            <p className="text-lg font-bold text-amber-900">“Discipline today. <br />Scientist tomorrow.”</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STUDENT AUTHENTICATION MODAL
         ═══════════════════════════════════════════════════════════════════════ */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#15120d] border border-amber-500/40 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto">
              <Lock size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Student Sign In Required</h3>
              <p className="text-xs text-neutral-300">
                Please log in or create a student account to subscribe to <strong className="text-amber-300">{selectedPlanForPurchase?.name}</strong>.
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
                className="text-xs text-neutral-400 hover:text-white transition pt-2"
              >
                Cancel and return to passes
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
