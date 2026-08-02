"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight, Check, Award, Atom, Dna, BookOpen,
  Brain, BarChart3, FileText, Lock, LogIn, Sparkles, GraduationCap, Compass, ShieldCheck, CheckCircle2,
  RefreshCw, HelpCircle, Download, ChevronRight
} from "lucide-react";
import {
  RayOpticsSketch,
  BenzeneOrbitalSketch,
  CalculusIntegralSketch,
  DNAHelixSketch
} from "@/components/ScienceSketches";
import { getCookie } from "@/lib/cookies";

interface Plan {
  id: string;
  exam_type: string;
  name: string;
  duration_days: number;
  price: number;
  discount_price: number | null;
  active: boolean;
}

export default function BuyTestPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [selectedExam, setSelectedExam] = useState<string>("ALL");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPlanForPurchase, setSelectedPlanForPurchase] = useState<Plan | null>(null);

  // User auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load Razorpay Script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    // Preload Razorpay script
    loadRazorpayScript();

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
      const isRazorpayReady = await loadRazorpayScript();
      if (!isRazorpayReady) {
        alert("Unable to load Razorpay payment gateway. Please check your network connection and try again.");
        return;
      }

      const res = await fetch("https://api.vigyanprep.com/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          amount: plan.discount_price || plan.price
        })
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || "Order creation failed");

      const options = {
        key: orderData.key || "rzp_live_defaultKey",
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "VIGYAN.prep",
        description: `Test Series Subscription - ${plan.name}`,
        image: "/frontend/images/vigyan-logo.png",
        order_id: orderData.order.id,
        handler: async function (response: any) {
          const verifyRes = await fetch("https://api.vigyanprep.com/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: plan.id
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            alert(`🎉 Payment Successful!\n\nYour ${plan.name} test series has been activated. Redirecting to your Student Dashboard...`);
            window.location.href = "https://test.vigyanprep.com/dashboard";
          } else {
            alert(`⚠️ Payment Verification Warning: ${verifyData.message || 'Signature verification pending'}`);
          }
        },
        prefill: {
          name: typeof window !== 'undefined' ? (localStorage.getItem('student_name') || "") : "",
          email: typeof window !== 'undefined' ? (localStorage.getItem('student_email') || "") : ""
        },
        theme: {
          color: "#d4a520"
        }
      };

      const razorpayWindow = (window as any).Razorpay;
      if (razorpayWindow) {
        const rzp = new razorpayWindow(options);
        rzp.open();
      } else {
        alert("Razorpay payment gateway failed to initialize. Please refresh the page and try again.");
      }
    } catch (err: any) {
      console.error("Razorpay Payment Error:", err);
      alert(`Payment Error: ${err.message || 'Failed to initialize payment gateway'}`);
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

  // Strict exam category filter
  const filteredPlans = plans.filter(plan => {
    const pType = (plan.exam_type || "").toUpperCase();
    const pName = (plan.name || "").toUpperCase();

    if (selectedExam === "ALL") {
      // In "ALL PACKAGES", show trending / top featured test series
      return true;
    }
    if (selectedExam === "IAT") {
      return pType.includes("IAT") || pName.includes("IAT") || pType.includes("IISER") || pName.includes("IISER");
    }
    if (selectedExam === "NEST") {
      return pType.includes("NEST") || pName.includes("NEST") || pType.includes("NISER") || pName.includes("NISER");
    }
    if (selectedExam === "CMI") {
      return pType.includes("CMI") || pName.includes("CMI") || pType.includes("ISI") || pName.includes("ISI");
    }
    return true;
  });

  const displayPlans = filteredPlans;

  const scrollToPricing = (examCode: string) => {
    setSelectedExam(examCode);
    const pricingEl = document.getElementById("pricing-section");
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5eb] text-[#1c1815] selection:bg-amber-400 selection:text-black font-sans relative overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════════
          UNIQUE ARCHITECTURAL EXAMINATION CENTER SKETCH WATERMARK
         ═══════════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* High-Definition Bespoke Architectural Masterplan Sketch for Examination Center */}
        <img
          src="/images/examination_center_sketch.jpg"
          alt="Science Examination Center & Research Auditorium Architectural Masterplan Sketch"
          className="w-full h-full object-cover opacity-[0.32] mix-blend-multiply filter blur-[3px] contrast-115 sepia-[0.10]"
        />
        {/* Warm Light Parchment Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf5eb]/55 via-transparent to-[#f1e6d3]/60" />
        {/* Ambient Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(217,119,6,0.08)_0%,transparent_70%)]" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION (Translucent Glassmorphism with Sharp Defined Border)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content Card */}
          <div className="lg:col-span-8 space-y-6 p-8 sm:p-12 rounded-3xl bg-white/40 backdrop-blur-2xl border-2 border-amber-950/30 shadow-2xl shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.7)] relative overflow-hidden">
            
            {/* Handcrafted Technical Science Overlay */}
            <div className="absolute right-4 top-4 opacity-15 pointer-events-none hidden sm:flex gap-6">
              <RayOpticsSketch className="w-32 h-32 text-amber-950" />
              <BenzeneOrbitalSketch className="w-32 h-32 text-amber-900" />
              <CalculusIntegralSketch className="w-32 h-32 text-amber-950" />
              <DNAHelixSketch className="w-32 h-32 text-emerald-950" />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border-2 border-amber-950/30 text-amber-950 text-xs font-extrabold uppercase tracking-wider shadow-xs relative z-10">
              <Sparkles size={14} className="text-amber-800" /> Curated by IISER & NISER Scholars
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1c1815] leading-[1.1] relative z-10">
              Master Science Entrances. <br />
              <span className="bg-gradient-to-r from-amber-800 via-amber-950 to-amber-900 bg-clip-text text-transparent italic">
                Build Your Research Legacy.
              </span>
            </h1>

            <p className="text-[#1c1815] text-base sm:text-lg max-w-2xl font-extrabold leading-relaxed relative z-10">
              Official pattern test series and solved question archives for <strong className="text-amber-950 font-extrabold">IISER IAT</strong>, <strong className="text-amber-950 font-extrabold">NISER NEST</strong>, <strong className="text-amber-950 font-extrabold">CMI</strong>, and <strong className="text-amber-950 font-extrabold">ISI</strong> admissions.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 relative z-10">
              <button
                onClick={() => scrollToPricing("ALL")}
                className="px-8 py-4 rounded-xl bg-[#1c1815] hover:bg-black text-amber-300 font-extrabold text-sm transition-all shadow-xl shadow-amber-950/30 border border-amber-500/30 flex items-center gap-2 cursor-pointer"
              >
                <span>View Test Series Packages</span>
                <ArrowRight size={18} />
              </button>

              <a
                href="https://vigyanprep.com/pyq"
                className="px-6 py-4 rounded-xl bg-white/50 border-2 border-amber-950/30 text-[#1c1815] hover:text-amber-950 hover:bg-white/80 text-sm font-extrabold transition-all flex items-center gap-2 shadow-xs"
              >
                <BookOpen size={16} className="text-amber-900" />
                <span>Practice Free PYQs</span>
              </a>
            </div>

            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#1c1815] border-t-2 border-amber-950/25 font-extrabold relative z-10">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-amber-900 shrink-0" />
                <span>IISER / NISER Pattern</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain size={16} className="text-amber-900 shrink-0" />
                <span>AI Topic Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-amber-900 shrink-0" />
                <span>Step-by-Step Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-amber-900 shrink-0" />
                <span>All-India Percentile</span>
              </div>
            </div>
          </div>

          {/* Right Hero Side Card */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center p-8 rounded-3xl bg-white/40 backdrop-blur-2xl border-2 border-amber-950/30 shadow-2xl relative shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.7)] text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-950/15 border-2 border-amber-950/30 flex items-center justify-center text-amber-950 mb-2">
              <Compass size={32} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1c1815]">Designed for Aspirants</h3>
            <p className="text-xs text-[#1c1815] leading-relaxed font-extrabold">
              Physics, Chemistry, Mathematics & Biology problem sets crafted to build deep intuition for research entrance exams.
            </p>
            <div className="w-full pt-4 border-t-2 border-amber-950/25">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-950 font-extrabold">
                10,000+ Aspirants Practicing
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          EXAM SELECTION CARDS (Translucent Glassmorphism)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-1 bg-amber-950"></div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-950">Select Exam Category</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1815]">Choose Your Exam Path</h2>
            </div>
            <p className="text-xs text-[#1c1815] max-w-md font-extrabold">
              Click any exam card below to filter test series packages specifically designed for that entrance exam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* IAT Card */}
            <div
              onClick={() => scrollToPricing("IAT")}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer bg-white/40 backdrop-blur-2xl shadow-xl flex flex-col justify-between group relative overflow-hidden shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7)] ${
                selectedExam === "IAT" ? "border-amber-950 ring-4 ring-amber-950/20 bg-white/50" : "border-amber-950/30 hover:border-amber-950/60 hover:bg-white/50"
              }`}
            >
              <RayOpticsSketch className="absolute -right-4 -bottom-4 w-28 h-28 text-amber-950/20 group-hover:scale-110 transition-transform pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-950/15 border border-amber-950/30 flex items-center justify-center mb-4 text-amber-950 group-hover:scale-110 transition">
                  <Atom size={24} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-xl text-[#1c1815]">IAT</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-950/15 text-amber-950 border border-amber-950/30">IISER</span>
                </div>
                <p className="text-xs font-extrabold text-[#1c1815]/80 mb-3">IISER Aptitude Test</p>
                <p className="text-xs text-[#1c1815] leading-relaxed font-extrabold mb-6">
                  Complete test series for BS-MS admissions across 7 IISER campuses. Physics, Chemistry, Math & Biology.
                </p>
              </div>
              <span className="text-xs font-extrabold text-amber-950 flex items-center gap-1 group-hover:translate-x-1 transition">
                View IAT Test Series →
              </span>
            </div>

            {/* NEST Card */}
            <div
              onClick={() => scrollToPricing("NEST")}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer bg-white/40 backdrop-blur-2xl shadow-xl flex flex-col justify-between group relative overflow-hidden shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7)] ${
                selectedExam === "NEST" ? "border-amber-950 ring-4 ring-amber-950/20 bg-white/50" : "border-amber-950/30 hover:border-amber-950/60 hover:bg-white/50"
              }`}
            >
              <BenzeneOrbitalSketch className="absolute -right-4 -bottom-4 w-28 h-28 text-orange-950/20 group-hover:scale-110 transition-transform pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-950/15 border border-orange-950/30 flex items-center justify-center mb-4 text-orange-950 group-hover:scale-110 transition">
                  <Dna size={24} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-xl text-[#1c1815]">NEST</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-orange-950/15 text-orange-950 border border-orange-950/30">NISER</span>
                </div>
                <p className="text-xs font-extrabold text-[#1c1815]/80 mb-3">National Entrance Screening Test</p>
                <p className="text-xs text-[#1c1815] leading-relaxed font-extrabold mb-6">
                  MSc integrated program entrance for NISER Bhubaneswar and UM-DAE CEBS Mumbai. High difficulty physics & math.
                </p>
              </div>
              <span className="text-xs font-extrabold text-orange-950 flex items-center gap-1 group-hover:translate-x-1 transition">
                View NEST Test Series →
              </span>
            </div>

            {/* CMI Card */}
            <div
              onClick={() => scrollToPricing("CMI")}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer bg-white/40 backdrop-blur-2xl shadow-xl flex flex-col justify-between group relative overflow-hidden shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7)] ${
                selectedExam === "CMI" ? "border-amber-950 ring-4 ring-amber-950/20 bg-white/50" : "border-amber-950/30 hover:border-amber-950/60 hover:bg-white/50"
              }`}
            >
              <CalculusIntegralSketch className="absolute -right-4 -bottom-4 w-28 h-28 text-amber-950/20 group-hover:scale-110 transition-transform pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-950/15 border border-amber-950/30 flex items-center justify-center mb-4 text-amber-950 group-hover:scale-110 transition">
                  <BookOpen size={24} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-xl text-[#1c1815]">CMI & ISI</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-950/15 text-amber-950 border border-amber-950/30">MATH</span>
                </div>
                <p className="text-xs font-extrabold text-[#1c1815]/80 mb-3">Chennai Math Institute & ISI</p>
                <p className="text-xs text-[#1c1815] leading-relaxed font-extrabold mb-6">
                  Advanced proof-based & objective mathematics test series for BSc Math & Computer Science programs.
                </p>
              </div>
              <span className="text-xs font-extrabold text-amber-950 flex items-center gap-1 group-hover:translate-x-1 transition">
                View CMI Test Series →
              </span>
            </div>

            {/* ALL Packages Combo Card */}
            <div
              onClick={() => scrollToPricing("ALL")}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer bg-white/45 backdrop-blur-2xl shadow-xl flex flex-col justify-between group relative overflow-hidden shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7)] ${
                selectedExam === "ALL" ? "border-amber-950 ring-4 ring-amber-950/20 bg-white/60" : "border-amber-950/35 hover:border-amber-950 hover:bg-white/50"
              }`}
            >
              <DNAHelixSketch className="absolute -right-4 -bottom-4 w-28 h-28 text-emerald-950/20 group-hover:scale-110 transition-transform pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-950/15 border border-emerald-950/30 flex items-center justify-center mb-4 text-emerald-950 group-hover:scale-110 transition">
                  <Award size={24} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-xl text-[#1c1815]">ALL PACKAGES</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-950/15 text-emerald-950 border border-emerald-950/30">TRENDING</span>
                </div>
                <p className="text-xs font-extrabold text-amber-950 mb-3">Complete Research Entrance Series</p>
                <p className="text-xs text-[#1c1815] leading-relaxed font-extrabold mb-6">
                  Featured trending test series packages unlocking papers across IISER IAT, NISER NEST, CMI, and ISI archives.
                </p>
              </div>
              <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1 group-hover:translate-x-1 transition">
                View Trending Packages →
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PRICING & SUBSCRIPTION PACKAGES (Strict Exam Filtering)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="pricing-section" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border-2 border-amber-950/30 text-amber-950 text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <Sparkles size={14} className="text-amber-800" /> Transparent Pricing
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1c1815]">
              Official Test Series Packages
            </h2>
            <p className="text-xs sm:text-sm text-[#1c1815] font-extrabold">
              Select your test series package below to instantly unlock scheduled CBT mock tests, passcode entry, and detailed step-by-step solutions.
            </p>
          </div>

          {/* Exam Filter Pills */}
          <div className="flex justify-center gap-2 flex-wrap">
            {["ALL", "IAT", "NEST", "CMI"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedExam(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                  selectedExam === cat
                    ? "bg-[#1c1815] text-amber-300 shadow-xl shadow-amber-950/30 border border-amber-500/30"
                    : "bg-white/40 backdrop-blur-xl text-[#1c1815] hover:text-amber-950 border-2 border-amber-950/30 shadow-xs"
                }`}
              >
                {cat === "ALL" ? "All Packages (Trending)" : cat}
              </button>
            ))}
          </div>

          {loadingPlans ? (
            <div className="text-center py-20 bg-white/40 backdrop-blur-2xl border-2 border-amber-950/30 rounded-3xl shadow-2xl">
              <RefreshCw className="animate-spin text-amber-950 w-8 h-8 mx-auto mb-2" />
              <p className="text-xs text-[#1c1815] font-mono font-bold">Loading Test Series Packages...</p>
            </div>
          ) : displayPlans.length === 0 ? (
            <div className="text-center py-16 bg-white/40 backdrop-blur-2xl border-2 border-amber-950/30 rounded-3xl p-8 max-w-lg mx-auto shadow-2xl space-y-4">
              <BookOpen className="w-12 h-12 text-amber-900 mx-auto opacity-70" />
              <h3 className="font-serif text-xl font-bold text-[#1c1815]">No Packages Available for {selectedExam}</h3>
              <p className="text-xs text-[#1c1815] font-extrabold">
                New test series packages for {selectedExam} are currently being configured by our admin faculty.
              </p>
              <button
                onClick={() => setSelectedExam("ALL")}
                className="px-6 py-2.5 bg-[#1c1815] text-amber-300 rounded-xl text-xs font-extrabold uppercase tracking-wider"
              >
                View All Packages
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPlans.map((plan, idx) => {
                const isPopular = idx === 0 || plan.name.toLowerCase().includes("all") || plan.name.toLowerCase().includes("pro");
                const price = plan.discount_price || plan.price;

                return (
                  <div
                    key={plan.id}
                    className={`relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-2xl backdrop-blur-2xl shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.7)] ${
                      isPopular
                        ? "bg-[#1c1815] text-white border-2 border-amber-500/40 shadow-2xl"
                        : "bg-white/40 border-2 border-amber-950/35 hover:border-amber-950/60"
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute top-0 right-0 bg-[#1c1815] text-amber-300 text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-bl-2xl tracking-widest shadow-md border-b border-l border-amber-500/30">
                        ⭐ MOST POPULAR
                      </div>
                    )}

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                          isPopular ? "bg-amber-500/20 border border-amber-500/30 text-amber-300" : "bg-amber-950/15 border border-amber-950/30 text-amber-950"
                        }`}>
                          {plan.exam_type || "TEST SERIES"}
                        </span>
                        <h3 className={`font-serif text-2xl font-bold pt-2 ${isPopular ? "text-white" : "text-[#1c1815]"}`}>{plan.name}</h3>
                        <p className={`text-xs font-extrabold ${isPopular ? "text-neutral-300" : "text-[#1c1815]/80"}`}>
                          Valid for {plan.duration_days} days full access across all devices
                        </p>
                      </div>

                      {/* Pricing Display */}
                      <div className={`flex items-baseline gap-3 py-3 border-y-2 ${isPopular ? "border-white/15" : "border-amber-950/25"}`}>
                        <span className={`text-4xl font-extrabold font-serif ${isPopular ? "text-white" : "text-[#1c1815]"}`}>₹{price}</span>
                        {plan.discount_price && (
                          <span className={`text-sm line-through ${isPopular ? "text-neutral-400" : "text-neutral-600 font-bold"}`}>₹{plan.price}</span>
                        )}
                        <span className="text-xs text-emerald-950 font-extrabold ml-auto bg-emerald-200/60 border border-emerald-400 px-2.5 py-1 rounded-full">
                          Save 40% OFF
                        </span>
                      </div>

                      {/* Feature Bullet Points */}
                      <ul className={`space-y-3 text-xs font-extrabold ${isPopular ? "text-neutral-200" : "text-[#1c1815]"}`}>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className={isPopular ? "text-amber-400 shrink-0" : "text-amber-950 shrink-0"} />
                          <span>Full Length Official CBT Pattern Mocks</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className={isPopular ? "text-amber-400 shrink-0" : "text-amber-950 shrink-0"} />
                          <span>Real-Time All-India Merit Leaderboard</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className={isPopular ? "text-amber-400 shrink-0" : "text-amber-950 shrink-0"} />
                          <span>Detailed Physics, Chemistry, Math & Biology Solutions</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className={isPopular ? "text-amber-400 shrink-0" : "text-amber-950 shrink-0"} />
                          <span>Passcode Protected CBT Test Engine Entry</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-8">
                      <button
                        onClick={() => handleBuyClick(plan)}
                        className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg ${
                          isPopular
                            ? "bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 hover:opacity-95 shadow-amber-500/20 cursor-pointer"
                            : "bg-white/50 hover:bg-white/80 border-2 border-amber-950/35 text-[#1c1815] cursor-pointer"
                        }`}
                      >
                        <span>Buy Test Series (₹{price})</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && selectedPlanForPurchase && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#fcfbfa] border-2 border-amber-950/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-950/15 border border-amber-950/30 flex items-center justify-center text-amber-950 mx-auto mb-3">
                <LogIn size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1c1815]">Student Login Required</h3>
              <p className="text-xs text-neutral-700 font-extrabold">
                Please sign in to your student account to complete purchasing <strong>{selectedPlanForPurchase.name}</strong>.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href="https://auth.vigyanprep.com"
                className="w-full py-3.5 bg-[#1c1815] text-amber-300 font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-black transition flex items-center justify-center gap-2 shadow-xl shadow-amber-950/30 border border-amber-500/30"
              >
                <span>Login to Student Account</span>
                <ArrowRight size={16} />
              </a>

              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full py-3 bg-white/40 border-2 border-amber-950/30 text-[#1c1815] hover:bg-white/70 rounded-xl text-xs font-extrabold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
