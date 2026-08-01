"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight, Check, Award, Atom, Dna, BookOpen,
  Brain, BarChart3, FileText, Lock, LogIn, Sparkles, GraduationCap, Compass, ShieldCheck, CheckCircle2
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

  useEffect(() => {
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
        description: `Subscription Pass - ${plan.name}`,
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
            alert(`🎉 Payment Successful!\n\nYour ${plan.name} has been activated. Redirecting to your Student Dashboard...`);
            window.location.href = "https://test.vigyanprep.com/dashboard";
          } else {
            alert(`⚠️ Payment Verification Warning: ${verifyData.message || 'Signature verification pending'}`);
          }
        },
        prefill: {
          name: localStorage.getItem('student_name') || "",
          email: localStorage.getItem('student_email') || ""
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
        alert("Razorpay SDK is loading. Please try again in a few seconds.");
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
  const displayPlans = filteredPlans.length > 0 ? filteredPlans : plans;

  const scrollToPricing = (examCode: string) => {
    setSelectedExam(examCode);
    const pricingEl = document.getElementById("pricing-section");
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#141009] text-[#f2ead8] selection:bg-amber-500 selection:text-black font-sans">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════════
          RICH WARM ACADEMIC HERO SECTION
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden border-b border-amber-500/20 bg-gradient-to-b from-[#1f170c] via-[#16110a] to-[#141009]">
        {/* Academic Hand-Drawn Science Overlay */}
        <div className="absolute right-6 top-10 opacity-15 pointer-events-none hidden lg:flex gap-6">
          <RayOpticsSketch className="w-36 h-36 text-amber-400" />
          <BenzeneOrbitalSketch className="w-36 h-36 text-orange-400" />
          <CalculusIntegralSketch className="w-36 h-36 text-amber-300" />
          <DNAHelixSketch className="w-36 h-36 text-emerald-400" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-inner">
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

          <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-b from-[#1e170d] to-[#141009] border border-amber-500/30 shadow-2xl relative">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6">
              <Compass size={32} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-center text-amber-200 mb-2">Designed for Aspirants</h3>
            <p className="text-xs text-neutral-300 text-center leading-relaxed font-light mb-6">
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
          EXAM SELECTION CARDS (WARM ACADEMIC STYLE)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#141009] via-[#1a140b] to-[#141009] border-b border-amber-500/15">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-amber-500"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Select Exam Category</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">Choose Your Exam Path</h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-md">
              Click any exam card below to filter subscription passes & test series packages specifically designed for that entrance exam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* IAT Card */}
            <div
              onClick={() => scrollToPricing("IAT")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-[#1e170d]/80 backdrop-blur-md shadow-xl flex flex-col justify-between group relative overflow-hidden ${
                selectedExam === "IAT" ? "border-amber-400 ring-2 ring-amber-400/30" : "border-amber-500/20 hover:border-amber-400/60"
              }`}
            >
              <RayOpticsSketch className="absolute -right-4 -bottom-4 w-28 h-28 text-amber-400/15 group-hover:scale-110 transition-transform pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-4 text-amber-300 group-hover:scale-110 transition">
                  <Atom size={24} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-xl text-white">IAT</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">IISER</span>
                </div>
                <p className="text-xs font-semibold text-neutral-400 mb-3">IISER Aptitude Test</p>
                <p className="text-xs text-neutral-300 leading-relaxed font-light mb-6">
                  Complete test series for BS-MS admissions across 7 IISER campuses. Physics, Chemistry, Math & Biology.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition">
                View IAT Passes →
              </span>
            </div>

            {/* NEST Card */}
            <div
              onClick={() => scrollToPricing("NEST")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-[#1e170d]/80 backdrop-blur-md shadow-xl flex flex-col justify-between group relative overflow-hidden ${
                selectedExam === "NEST" ? "border-amber-400 ring-2 ring-amber-400/30" : "border-amber-500/20 hover:border-amber-400/60"
              }`}
            >
              <BenzeneOrbitalSketch className="absolute -right-4 -bottom-4 w-28 h-28 text-orange-400/15 group-hover:scale-110 transition-transform pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-400/10 border border-orange-400/30 flex items-center justify-center mb-4 text-orange-300 group-hover:scale-110 transition">
                  <Dna size={24} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-xl text-white">NEST</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-400/20 text-orange-300 border border-orange-400/30">NISER</span>
                </div>
                <p className="text-xs font-semibold text-neutral-400 mb-3">National Entrance Screening Test</p>
                <p className="text-xs text-neutral-300 leading-relaxed font-light mb-6">
                  MSc integrated program entrance for NISER Bhubaneswar and UM-DAE CEBS Mumbai. High difficulty physics & math.
                </p>
              </div>
              <span className="text-xs font-bold text-orange-400 flex items-center gap-1 group-hover:translate-x-1 transition">
                View NEST Passes →
              </span>
            </div>

            {/* CMI Card */}
            <div
              onClick={() => scrollToPricing("CMI")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-[#1e170d]/80 backdrop-blur-md shadow-xl flex flex-col justify-between group relative overflow-hidden ${
                selectedExam === "CMI" ? "border-amber-400 ring-2 ring-amber-400/30" : "border-amber-500/20 hover:border-amber-400/60"
              }`}
            >
              <CalculusIntegralSketch className="absolute -right-4 -bottom-4 w-28 h-28 text-amber-300/15 group-hover:scale-110 transition-transform pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-300/10 border border-amber-300/30 flex items-center justify-center mb-4 text-amber-200 group-hover:scale-110 transition">
                  <BookOpen size={24} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-xl text-white">CMI & ISI</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-300/20 text-amber-200 border border-amber-300/30">MATH</span>
                </div>
                <p className="text-xs font-semibold text-neutral-400 mb-3">Chennai Math Institute & ISI</p>
                <p className="text-xs text-neutral-300 leading-relaxed font-light mb-6">
                  Advanced proof-based & objective mathematics test series for BSc Math & Computer Science programs.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition">
                View CMI Passes →
              </span>
            </div>

            {/* ALL Pass Combo Card */}
            <div
              onClick={() => scrollToPricing("ALL")}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-[#241a0e] shadow-xl flex flex-col justify-between group relative overflow-hidden ${
                selectedExam === "ALL" ? "border-amber-400 ring-2 ring-amber-400/40" : "border-amber-500/40 hover:border-amber-400"
              }`}
            >
              <DNAHelixSketch className="absolute -right-4 -bottom-4 w-28 h-28 text-emerald-400/15 group-hover:scale-110 transition-transform pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mb-4 text-emerald-300 group-hover:scale-110 transition">
                  <Award size={24} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-xl text-white">ALL PASS</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">COMBO</span>
                </div>
                <p className="text-xs font-semibold text-amber-400 mb-3">Complete Research Entrance Pass</p>
                <p className="text-xs text-neutral-300 leading-relaxed font-light mb-6">
                  Single pass unlocking all test papers across IISER IAT, NISER NEST, CMI, and ISI past year archives.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition">
                View All Access Pass →
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PRICING & SUBSCRIPTION PACKAGES (DEVELOPER DESIGN)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="pricing-section" className="py-24 px-6 bg-gradient-to-b from-[#141009] to-[#1c150c] relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles size={14} className="text-amber-400" /> Transparent Pricing
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Official Test Series & All-Access Passes
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light">
              Select your subscription plan below to instantly unlock scheduled CBT test series, passcode entry, and step-by-step solutions.
            </p>
          </div>

          {/* Exam Filter Pills */}
          <div className="flex justify-center gap-2 flex-wrap">
            {["ALL", "IAT", "NEST", "CMI"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedExam(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedExam === cat
                    ? "bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20"
                    : "bg-black/40 border border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                {cat === "ALL" ? "All Packages" : cat}
              </button>
            ))}
          </div>

          {loadingPlans ? (
            <div className="text-center py-20 bg-[#16110a] border border-amber-500/20 rounded-3xl">
              <p className="text-xs text-neutral-400 font-mono">Loading Subscription Passes...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPlans.map((plan, idx) => {
                const isPopular = idx === 0 || plan.name.toLowerCase().includes("all") || plan.name.toLowerCase().includes("pro");
                const price = plan.discount_price || plan.price;

                return (
                  <div
                    key={plan.id}
                    className={`relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-2xl ${
                      isPopular
                        ? "bg-gradient-to-b from-[#281e10] via-[#1c150c] to-[#141009] border-2 border-amber-400 shadow-amber-500/10"
                        : "bg-[#18120a] border border-amber-500/20 hover:border-amber-400/50"
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-orange-500 text-neutral-950 text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-bl-2xl tracking-widest shadow-md">
                        ⭐ MOST POPULAR
                      </div>
                    )}

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-widest">
                          {plan.exam_type || "ALL ACCESS"}
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-white pt-2">{plan.name}</h3>
                        <p className="text-xs text-neutral-400 font-light">
                          Valid for {plan.duration_days} days full access across all devices
                        </p>
                      </div>

                      {/* Pricing Display */}
                      <div className="flex items-baseline gap-3 py-2 border-y border-white/10">
                        <span className="text-4xl font-extrabold font-serif text-white">₹{price}</span>
                        {plan.discount_price && (
                          <span className="text-sm line-through text-neutral-500">₹{plan.price}</span>
                        )}
                        <span className="text-xs text-emerald-400 font-bold ml-auto">Save 40% OFF</span>
                      </div>

                      {/* Feature Bullet Points */}
                      <ul className="space-y-3 text-xs text-neutral-300">
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className="text-amber-400 shrink-0" />
                          <span>Full Length Official CBT Pattern Mocks</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className="text-amber-400 shrink-0" />
                          <span>Real-Time All-India Merit Leaderboard</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className="text-amber-400 shrink-0" />
                          <span>Detailed Physics, Chemistry, Math & Biology Solutions</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className="text-amber-400 shrink-0" />
                          <span>Passcode Protected CBT Test Engine Entry</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-8">
                      <button
                        onClick={() => handleBuyClick(plan)}
                        className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg ${
                          isPopular
                            ? "bg-gradient-to-r from-amber-400 to-orange-500 text-neutral-950 hover:opacity-95 shadow-amber-500/20"
                            : "bg-white/10 border border-white/15 text-white hover:bg-amber-400 hover:text-neutral-950"
                        }`}
                      >
                        <span>Subscribe & Buy Pass (₹{price})</span>
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1c150c] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto mb-3">
                <LogIn size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">Student Login Required</h3>
              <p className="text-xs text-neutral-300">
                Please sign in to your student account to complete purchasing <strong>{selectedPlanForPurchase.name}</strong>.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href="https://auth.vigyanprep.com"
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-95 transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>Login to Student Account</span>
                <ArrowRight size={16} />
              </a>

              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full py-3 bg-white/5 border border-white/10 text-neutral-400 hover:text-white rounded-xl text-xs font-semibold transition"
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
