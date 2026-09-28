"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight, Check, Award, Atom, Dna, BookOpen,
  Brain, BarChart3, FileText, Lock, LogIn, Sparkles, GraduationCap, Compass, ShieldCheck, CheckCircle2,
  RefreshCw, HelpCircle, Download, ChevronRight, X
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
  bundle_includes: string[] | null;
}

export default function BuyTestPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [selectedExam, setSelectedExam] = useState<string>("ALL");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPlanForPurchase, setSelectedPlanForPurchase] = useState<Plan | null>(null);

  // 24-Hour VIP Trial Request Modal State
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [trialName, setTrialName] = useState("");
  const [trialEmail, setTrialEmail] = useState("");
  const [trialTargetExam, setTrialTargetExam] = useState("IAT");
  const [trialPhone, setTrialPhone] = useState("");
  const [trialSubmitting, setTrialSubmitting] = useState(false);
  const [trialSubmitted, setTrialSubmitted] = useState(false);
  const [trialError, setTrialError] = useState<string | null>(null);
  const [trialResponseMessage, setTrialResponseMessage] = useState<string>("");

  // User auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userHasTrial, setUserHasTrial] = useState(false);
  const [userHasPaidPass, setUserHasPaidPass] = useState(false);
  const [trialPassDetails, setTrialPassDetails] = useState<{
    name: string;
    expiresAt: string | null;
    hoursRemaining: number;
    minutesRemaining: number;
    formattedTimeLeft: string;
  } | null>(null);
  // Tracks which exam types the student already has an active subscription for
  const [subscribedExamTypes, setSubscribedExamTypes] = useState<string[]>([]);
  // Tracks if the student owns an active All-in-One (Bundle) pass
  const [userHasBundle, setUserHasBundle] = useState(false);
  const [userBundleCoveredExams, setUserBundleCoveredExams] = useState<string[]>([]);

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

    // If the student is logged in, fetch their active subscriptions
    // so we can distinguish demo/trial passes from paid enrollments
    async function fetchSubscriptions(authToken: string) {
      try {
        const res = await fetch("https://api.vigyanprep.com/api/student/subscriptions", {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        if (res.ok) {
          const data = await res.json();
          const examTypes: string[] = [];
          let hasPaidBundle = false;
          let hasTrial = false;
          let trialInfo = null;
          let hasPaid = false;
          const bundleExams: string[] = [];

          for (const sub of data.subscriptions || []) {
            const isTrial = sub.is_trial === true ||
              sub.plan_id === 'e0000000-0000-0000-0000-000000000024' ||
              (sub.plan?.name || sub.plan_name || '').toLowerCase().includes('trial') ||
              (sub.plan?.name || sub.plan_name || '').toLowerCase().includes('demo') ||
              sub.amount_paid === 0;

            const planExamType = (sub.plan?.exam_type || sub.exam_type || '').toUpperCase();
            const rawBundleIncludes = sub.bundle_includes || sub.plan?.bundle_includes || [];
            const bundleIncludes: string[] = Array.isArray(rawBundleIncludes)
              ? rawBundleIncludes.map((e: string) => String(e).toUpperCase())
              : [];

            if (isTrial) {
              hasTrial = true;
              const expiresAt = sub.expires_at ? new Date(sub.expires_at) : null;
              const now = new Date();
              let hoursLeft = 24;
              let minsLeft = 0;
              let formatted = "24 Hours Left";
              if (expiresAt) {
                const diffMs = expiresAt.getTime() - now.getTime();
                if (diffMs > 0) {
                  hoursLeft = Math.floor(diffMs / (1000 * 60 * 60));
                  minsLeft = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                  formatted = `${hoursLeft}h ${minsLeft}m remaining`;
                } else {
                  formatted = "Expired";
                }
              }
              trialInfo = {
                name: sub.plan?.name || "24-Hour VIP Demo Pass",
                expiresAt: sub.expires_at,
                hoursRemaining: hoursLeft,
                minutesRemaining: minsLeft,
                formattedTimeLeft: formatted
              };
            } else {
              hasPaid = true;
              if (planExamType === 'BUNDLE' && bundleIncludes.length > 0) {
                hasPaidBundle = true;
                bundleIncludes.forEach((e: string) => {
                  if (!bundleExams.includes(e)) bundleExams.push(e);
                  if (!examTypes.includes(e)) examTypes.push(e);
                });
              } else if (planExamType && !examTypes.includes(planExamType)) {
                examTypes.push(planExamType);
              }
            }
          }

          setUserHasTrial(hasTrial);
          setTrialPassDetails(trialInfo);
          setUserHasPaidPass(hasPaid);
          setUserHasBundle(hasPaidBundle);
          setUserBundleCoveredExams(bundleExams);
          setSubscribedExamTypes(examTypes);

          if (typeof window !== 'undefined') {
            if (hasTrial && !hasPaid) {
              localStorage.setItem("student_is_demo", "true");
            } else {
              localStorage.removeItem("student_is_demo");
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
      }
    }

    fetchPlans();
    if (token) fetchSubscriptions(token);
  }, []);

  // Helper: determine button state for a plan card
  // Returns: 'access' | 'upgrade' | 'buy'
  const getPlanButtonState = (plan: Plan): 'access' | 'upgrade' | 'buy' => {
    if (!isLoggedIn) return 'buy';

    // If student only has a Demo Pass, every paid plan is an UPGRADE opportunity
    if (userHasTrial && !userHasPaidPass) {
      if (isTrialPlan(plan)) return 'access';
      return 'upgrade';
    }

    if (subscribedExamTypes.length === 0) return 'buy';

    const isBundle = plan.exam_type === 'BUNDLE' && Array.isArray(plan.bundle_includes) && plan.bundle_includes.length > 0;
    if (isBundle) {
      const covered = plan.bundle_includes!.filter(e => subscribedExamTypes.includes(e));
      if (covered.length === plan.bundle_includes!.length) return 'access'; // all exams covered
      if (covered.length > 0) return 'upgrade'; // partially covered → upgrade
      return 'buy';
    }
    // Single exam plan
    return subscribedExamTypes.includes(plan.exam_type) ? 'access' : 'buy';
  };

  const openRazorpayCheckout = async (plan: Plan) => {
    try {
      const isRazorpayReady = await loadRazorpayScript();
      if (!isRazorpayReady) {
        alert("Unable to load Razorpay payment gateway. Please check your network connection and try again.");
        return;
      }

      const token = getCookie("student_token") || (typeof window !== 'undefined' ? (localStorage.getItem('student_token') || localStorage.getItem('token')) : null);
      let studentEmail = (typeof window !== 'undefined' ? (getCookie("student_email") || localStorage.getItem('student_email') || localStorage.getItem('user_email') || localStorage.getItem('email')) : '') || '';
      let studentName = (typeof window !== 'undefined' ? (getCookie("student_name") || localStorage.getItem('student_name') || localStorage.getItem('user_name') || localStorage.getItem('name')) : '') || '';

      if (!studentEmail) {
        const enteredEmail = window.prompt("📧 Please enter your Student Email to activate your test series subscription:", "");
        if (!enteredEmail || !enteredEmail.includes("@")) {
          alert("A valid email is required to assign your exam pass and test series access.");
          return;
        }
        studentEmail = enteredEmail.trim().toLowerCase();
        if (typeof window !== 'undefined') {
          localStorage.setItem('student_email', studentEmail);
        }
      }

      const res = await fetch("https://api.vigyanprep.com/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          planId: plan.id,
          amount: plan.discount_price || plan.price
        })
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.success) throw new Error(orderData.error || orderData.message || "Order creation failed");

      const options = {
        key: orderData.key || (orderData.order && orderData.order.key) || "rzp_live_TKAmZ5QydRUNs1",
        amount: orderData.order.amount,
        currency: orderData.order.currency || "INR",
        name: "VIGYAN.prep",
        description: `Test Series Subscription - ${plan.name}`,
        image: "/frontend/images/vigyan-logo.png",
        order_id: orderData.order.id,
        handler: async function (response: any) {
          const verifyRes = await fetch("https://api.vigyanprep.com/api/payment/verify", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              ...(token ? { "Authorization": `Bearer ${token}` } : {})
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: plan.id,
              studentEmail: studentEmail,
              studentName: studentName || 'Student',
              amount: plan.discount_price || plan.price
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            alert(`🎉 Payment Successful!\n\nYour ${plan.name} test series has been activated for ${studentEmail}. Redirecting to your Student Dashboard...`);
            window.location.href = "https://test.vigyanprep.com/dashboard";
          } else {
            alert(`⚠️ Payment Verification Warning: ${verifyData.message || 'Signature verification pending'}`);
          }
        },
        prefill: {
          name: studentName,
          email: studentEmail
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

  const isTrialPlan = (plan: Plan) => {
    return (
      plan.price === 0 ||
      plan.id === 'e0000000-0000-0000-0000-000000000024' ||
      (plan.name || '').toLowerCase().includes('trial') ||
      (plan.name || '').toLowerCase().includes('demo')
    );
  };

  const handleBuyClick = (plan: Plan) => {
    if (isTrialPlan(plan)) {
      setSelectedPlanForPurchase(plan);
      setTrialError(null);
      setTrialSubmitted(false);
      if (typeof window !== 'undefined') {
        const storedEmail = getCookie("student_email") || localStorage.getItem('student_email') || localStorage.getItem('user_email') || '';
        const storedName = getCookie("student_name") || localStorage.getItem('student_name') || localStorage.getItem('user_name') || '';
        if (storedEmail) setTrialEmail(storedEmail);
        if (storedName) setTrialName(storedName);
      }
      setShowTrialModal(true);
      return;
    }

    setSelectedPlanForPurchase(plan);
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      openRazorpayCheckout(plan);
    }
  };

  const handleTrialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialEmail || !trialEmail.includes("@")) {
      setTrialError("Please enter a valid student email address.");
      return;
    }
    if (!trialName || !trialName.trim()) {
      setTrialError("Please enter your name.");
      return;
    }

    setTrialSubmitting(true);
    setTrialError(null);

    try {
      const res = await fetch("https://api.vigyanprep.com/api/public/trial-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trialName.trim(),
          email: trialEmail.trim().toLowerCase(),
          targetExam: trialTargetExam,
          phone: trialPhone.trim()
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTrialSubmitted(true);
        setTrialResponseMessage(
          data.message ||
          "We have received your email. Our team will verify and activate your demo pass within 1 to 2 hours. Kindly please wait, you will receive a confirmation email shortly."
        );
        if (typeof window !== 'undefined') {
          localStorage.setItem('student_email', trialEmail.trim().toLowerCase());
          if (trialName) localStorage.setItem('student_name', trialName.trim());
        }
      } else {
        setTrialError(data.error || "Unable to submit your demo request. Please try again or reach out on WhatsApp.");
      }
    } catch (err: any) {
      console.error("Trial request submission error:", err);
      setTrialError("Network error. Please check your internet connection and try again.");
    } finally {
      setTrialSubmitting(false);
    }
  };

  // Strict exam category filter with complete Bundle coverage
  const filteredPlans = plans.filter(plan => {
    if (selectedExam === "ALL") {
      // In "ALL PACKAGES", show all active test series packages
      return true;
    }

    const pType = (plan.exam_type || "").toUpperCase();
    const pName = (plan.name || "").toUpperCase();
    const bundleList: string[] = Array.isArray(plan.bundle_includes)
      ? plan.bundle_includes.map(e => String(e).toUpperCase())
      : [];

    const matchesKeywords = (keywords: string[]) => {
      // 1. Matches exam_type
      if (keywords.some(k => pType.includes(k))) return true;
      // 2. Matches plan name
      if (keywords.some(k => pName.includes(k))) return true;
      // 3. Matches bundle_includes array
      if (bundleList.some(b => keywords.some(k => b.includes(k)))) return true;
      return false;
    };

    if (selectedExam === "IAT") {
      return matchesKeywords(["IAT", "IISER"]);
    }
    if (selectedExam === "NEST") {
      return matchesKeywords(["NEST", "NISER"]);
    }
    if (selectedExam === "JEE") {
      return matchesKeywords(["JEE"]);
    }
    if (selectedExam === "CMI") {
      return matchesKeywords(["CMI", "ISI", "IISC"]);
    }
    return matchesKeywords([selectedExam.toUpperCase()]);
  });

  // Smart Display Logic:
  // If student owns an active All-in-One (Bundle) pass:
  // - Don't show redundant individual cards (e.g. IAT, NEST, JEE) that are already included in their bundle
  // - Show the Master Bundle card prominently at the top
  // - Only show separate unowned exams (like CMI)
  const displayPlans = filteredPlans
    .filter(plan => {
      const isPlanBundle = (plan.exam_type || '').toUpperCase() === 'BUNDLE' || 
        (Array.isArray(plan.bundle_includes) && plan.bundle_includes.length > 1);
      
      // If student owns a PAID bundle, hide individual plans for exams already included in their bundle
      if (userHasBundle && userHasPaidPass && !isPlanBundle) {
        const planExam = (plan.exam_type || '').toUpperCase();
        if (userBundleCoveredExams.includes(planExam)) {
          return false; // Redundant! Already included in student's active bundle
        }
      }
      return true;
    })
    .sort((a, b) => {
      // Put bundle / subscribed pass first
      const isBundleA = (a.exam_type || '').toUpperCase() === 'BUNDLE' || (Array.isArray(a.bundle_includes) && a.bundle_includes.length > 1);
      const isBundleB = (b.exam_type || '').toUpperCase() === 'BUNDLE' || (Array.isArray(b.bundle_includes) && b.bundle_includes.length > 1);
      if (isBundleA && !isBundleB) return -1;
      if (!isBundleA && isBundleB) return 1;
      return 0;
    });

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
          className="w-full h-full object-cover opacity-[0.38] mix-blend-multiply filter blur-[1.5px] contrast-120 sepia-[0.10]"
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
            {["ALL", "IAT", "NEST", "JEE", "CMI"].map((cat) => (
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

          {/* 1. Active 24-Hour VIP Demo Account Banner */}
          {userHasTrial && !userHasPaidPass && (
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1c1815] via-[#241e18] to-[#1c1815] border-2 border-amber-400/80 text-amber-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-start gap-4 sm:gap-5 relative z-10">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-black flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
                  ⚡
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-serif font-bold text-xl sm:text-2xl text-white">
                      You are in 24-Hour VIP Demo Mode
                    </h4>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-xs">
                      Demo Account Active
                    </span>
                    {trialPassDetails?.formattedTimeLeft && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider bg-amber-950/80 border border-amber-400/40 text-amber-300">
                        ⏱️ {trialPassDetails.formattedTimeLeft}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed max-w-2xl">
                    You currently have temporary evaluation access to scheduled CBT mocks. <strong className="text-amber-300 font-bold">Upgrade to a Full Pass below</strong> to lock in your All-India Merit Rank, save your chapter mistake reviews permanently, and unlock 365-day access to all mocks.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0 relative z-10">
                <button
                  onClick={() => {
                    const pricingEl = document.getElementById('pricing-grid');
                    if (pricingEl) pricingEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-center cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>Upgrade to Full Pass (Save 50%)</span>
                </button>
                <a
                  href="https://test.vigyanprep.com/dashboard"
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 text-center"
                >
                  <span>Go to Test Portal</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          )}

          {/* 2. Active All-in-One Master Pass Banner (Only for Paid Enrolled Students) */}
          {userHasBundle && userHasPaidPass && (
            <div className="p-6 rounded-3xl bg-emerald-950/15 border-2 border-emerald-500/40 text-emerald-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-lg backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                  ✓
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-serif font-bold text-lg text-[#1c1815]">
                      All-in-One Master Pass Active
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                      Enrolled
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900 font-extrabold leading-relaxed">
                    You have full access to all scheduled CBT mocks for <strong>{userBundleCoveredExams.join(', ')}</strong>. Individual cards already covered by your pass are hidden for your convenience.
                  </p>
                </div>
              </div>
              <a
                href="https://test.vigyanprep.com/dashboard"
                className="w-full md:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shrink-0 transition shadow-md flex items-center justify-center gap-2 text-center"
              >
                <span>Go to Student Portal</span>
                <span>→</span>
              </a>
            </div>
          )}

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
            <div id="pricing-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPlans.map((plan, idx) => {
                const isPlanTrial = isTrialPlan(plan);
                const isPopular = !isPlanTrial && (idx === 0 || plan.name.toLowerCase().includes("all") || plan.name.toLowerCase().includes("pro"));
                const displayPrice = plan.discount_price || plan.price;
                const originalPrice = plan.price;
                const discountPercent = plan.discount_price && originalPrice > plan.discount_price
                  ? Math.round(((originalPrice - plan.discount_price) / originalPrice) * 100)
                  : 0;
                const isPlanBundle = plan.exam_type === 'BUNDLE' && Array.isArray(plan.bundle_includes) && plan.bundle_includes.length > 0;
                const buttonState = getPlanButtonState(plan);

                // For upgrade: find which exams the student still needs from this bundle
                const newExamsInBundle = isPlanBundle
                  ? (plan.bundle_includes || []).filter(e => !subscribedExamTypes.includes(e))
                  : [];

                return (
                  <div
                    key={plan.id}
                    className={`relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-2xl backdrop-blur-2xl shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.7)] ${
                      isPlanTrial
                        ? "bg-gradient-to-b from-[#1c1815] via-[#201c18] to-[#1c1815] text-white border-2 border-amber-400/60 shadow-amber-500/10 shadow-2xl"
                        : isPopular
                        ? "bg-[#1c1815] text-white border-2 border-amber-500/40 shadow-2xl"
                        : "bg-white/40 border-2 border-amber-950/35 hover:border-amber-950/60"
                    }`}
                  >
                    {isPlanTrial && (
                      <div className={`absolute top-0 right-0 text-[10px] font-black uppercase px-4 py-1.5 rounded-bl-2xl tracking-widest shadow-md flex items-center gap-1.5 ${
                        userHasTrial && !userHasPaidPass
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                          : "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black"
                      }`}>
                        {userHasTrial && !userHasPaidPass ? (
                          <>
                            <Check size={12} className="stroke-[3]" />
                            <span>CURRENTLY ACTIVE</span>
                          </>
                        ) : (
                          <span>⚡ 24-HOUR VIP DEMO</span>
                        )}
                      </div>
                    )}
                    {!isPlanTrial && userHasTrial && !userHasPaidPass && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[10px] font-black uppercase px-4 py-1.5 rounded-bl-2xl tracking-widest shadow-md flex items-center gap-1">
                        <Sparkles size={12} />
                        <span>UPGRADE AVAILABLE</span>
                      </div>
                    )}
                    {!isPlanTrial && !userHasTrial && isPopular && buttonState !== 'access' && (
                      <div className="absolute top-0 right-0 bg-[#1c1815] text-amber-300 text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-bl-2xl tracking-widest shadow-md border-b border-l border-amber-500/30">
                        ⭐ MOST POPULAR
                      </div>
                    )}
                    {!isPlanTrial && buttonState === 'access' && (
                      <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-bl-2xl tracking-widest shadow-md">
                        {isPlanBundle ? '✓ ALL-IN-ONE PASS ACTIVE' : '✓ SUBSCRIBED'}
                      </div>
                    )}
                    {!isPlanTrial && !userHasTrial && buttonState === 'upgrade' && (
                      <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-bl-2xl tracking-widest shadow-md">
                        ↑ UPGRADE AVAILABLE
                      </div>
                    )}

                    <div className="space-y-6">
                      <div className="space-y-2">
                        {/* Exam type badge(s): show bundle tags for bundle plans */}
                        {isPlanBundle && plan.bundle_includes ? (
                          <div className="flex flex-wrap gap-1.5">
                            {plan.bundle_includes.map(exam => (
                              <span key={exam} className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                                subscribedExamTypes.includes(exam)
                                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                                  : isPopular || isPlanTrial ? 'bg-amber-500/20 border-amber-400/30 text-amber-300' : 'bg-purple-100 border-purple-300 text-purple-800'
                              }`}>
                                {subscribedExamTypes.includes(exam) ? '✓ ' : ''}{exam}
                              </span>
                            ))}
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                              isPopular || isPlanTrial ? 'bg-amber-500/20 border-amber-500/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-800'
                            }`}>{isPlanTrial ? 'TRIAL PASS' : 'BUNDLE'}</span>
                          </div>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                            isPopular || isPlanTrial ? "bg-amber-500/20 border border-amber-500/30 text-amber-300" : "bg-amber-950/15 border border-amber-950/30 text-amber-950"
                          }`}>
                            {plan.exam_type || "TEST SERIES"}
                          </span>
                        )}
                        <h3 className={`font-serif text-2xl font-bold pt-2 ${isPopular || isPlanTrial ? "text-white" : "text-[#1c1815]"}`}>{plan.name}</h3>
                        <p className={`text-xs font-extrabold ${isPopular || isPlanTrial ? "text-neutral-300" : "text-[#1c1815]/80"}`}>
                          {isPlanTrial ? "Instant 24-Hour full evaluation access to CBT portal" : `Valid for ${plan.duration_days} days full access across all devices`}
                        </p>
                        {/* Upgrade hint: show what new exams this bundle unlocks */}
                        {!isPlanTrial && buttonState === 'upgrade' && newExamsInBundle.length > 0 && (
                          <p className="text-xs font-extrabold text-purple-300 bg-purple-500/15 border border-purple-400/20 rounded-lg px-3 py-1.5">
                            🔓 Unlocks: {newExamsInBundle.join(' + ')} access
                          </p>
                        )}
                      </div>

                      {/* Pricing Display */}
                      {isPlanTrial ? (
                        userHasTrial && !userHasPaidPass ? (
                          <div className="flex items-baseline gap-3 py-3 border-y-2 border-emerald-500/40">
                            <span className="text-3xl font-extrabold font-serif text-emerald-400">ACTIVE</span>
                            <span className="text-xs text-neutral-300 font-extrabold uppercase tracking-wider">
                              VIP Demo Pass
                            </span>
                            <span className="text-xs font-extrabold ml-auto px-2.5 py-1 rounded-full text-emerald-300 bg-emerald-500/20 border border-emerald-500/40">
                              {trialPassDetails?.formattedTimeLeft || "24h Active"}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-3 py-3 border-y-2 border-amber-500/30">
                            <span className="text-4xl font-extrabold font-serif text-amber-400">FREE</span>
                            <span className="text-xs text-neutral-300 font-extrabold uppercase tracking-wider">
                              24h VIP Demo
                            </span>
                            <span className="text-xs font-extrabold ml-auto px-2.5 py-1 rounded-full text-amber-300 bg-amber-500/20 border border-amber-500/40">
                              No Payment Needed
                            </span>
                          </div>
                        )
                      ) : (
                        <div className={`flex items-baseline gap-3 py-3 border-y-2 ${isPopular ? "border-white/15" : "border-amber-950/25"}`}>
                          <span className={`text-4xl font-extrabold font-serif ${isPopular ? "text-white" : "text-[#1c1815]"}`}>₹{displayPrice}</span>
                          {plan.discount_price && (
                            <span className={`text-sm line-through ${isPopular ? "text-neutral-400" : "text-neutral-600 font-bold"}`}>₹{plan.price}</span>
                          )}
                          {discountPercent > 0 && (
                            <span className={`text-xs font-extrabold ml-auto px-2.5 py-1 rounded-full border ${
                              isPopular
                                ? "text-emerald-300 bg-emerald-950/80 border-emerald-500/50"
                                : "text-emerald-950 bg-emerald-200/70 border-emerald-400"
                            }`}>
                              Save {discountPercent}% OFF
                            </span>
                          )}
                        </div>
                      )}

                      {/* Feature Bullet Points */}
                      <ul className={`space-y-3 text-xs font-extrabold ${isPopular || isPlanTrial ? "text-neutral-200" : "text-[#1c1815]"}`}>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className={isPopular || isPlanTrial ? "text-amber-400 shrink-0" : "text-amber-950 shrink-0"} />
                          <span>{isPlanTrial ? "Official NTA CBT Interface & Scientific Calculator" : "Full Length Official CBT Pattern Mocks"}</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className={isPopular || isPlanTrial ? "text-amber-400 shrink-0" : "text-amber-950 shrink-0"} />
                          <span>{isPlanTrial ? "Full Practice Tests: IAT 01-03, JEE 01 & NEST" : "Real-Time All-India Merit Leaderboard"}</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className={isPopular || isPlanTrial ? "text-amber-400 shrink-0" : "text-amber-950 shrink-0"} />
                          <span>{isPlanTrial ? "Diagnostic Percentage & Chapter Mistake Review" : "Detailed Physics, Chemistry, Math & Biology Solutions"}</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Check size={16} className={isPopular || isPlanTrial ? "text-amber-400 shrink-0" : "text-amber-950 shrink-0"} />
                          <span>{isPlanTrial ? "Valid Exactly 24 Hours from Account Activation" : "Passcode Protected CBT Test Engine Entry"}</span>
                        </li>
                      </ul>
                    </div>

                    {/* Smart CTA Button */}
                    <div className="pt-8">
                      {isPlanTrial ? (
                        userHasTrial && !userHasPaidPass ? (
                          <div className="space-y-2">
                            <a
                              href="https://test.vigyanprep.com/dashboard"
                              className="w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25 text-center"
                            >
                              <CheckCircle2 size={16} />
                              <span>Demo Pass In Use — Go to Tests</span>
                              <ArrowRight size={16} />
                            </a>
                            <p className="text-[11px] text-center text-amber-300/80 font-medium">
                              ⚡ Evaluating now. Choose a Full Pass below to save all your mock attempts.
                            </p>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleBuyClick(plan)}
                            className="w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 hover:brightness-110 shadow-amber-500/25 cursor-pointer"
                          >
                            <Sparkles size={16} />
                            <span>Request 24h VIP Demo Pass</span>
                            <ArrowRight size={16} />
                          </button>
                        )
                      ) : userHasTrial && !userHasPaidPass ? (
                        /* HIGH CONVERSION: Demo user upgrading to a paid full pass */
                        <div className="space-y-2">
                          <button
                            onClick={() => handleBuyClick(plan)}
                            className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg cursor-pointer ${
                              isPopular
                                ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 hover:brightness-110 shadow-amber-500/30"
                                : "bg-[#1c1815] hover:bg-black text-amber-300 border border-amber-500/40"
                            }`}
                          >
                            <Sparkles size={16} />
                            <span>Upgrade to Full Pass (₹{displayPrice})</span>
                            <ArrowRight size={16} />
                          </button>
                          <p className={`text-[10.5px] text-center font-medium ${isPopular ? "text-neutral-400" : "text-neutral-600"}`}>
                            Instant conversion • Preserves all your trial scores &amp; analysis
                          </p>
                        </div>
                      ) : buttonState === 'access' ? (
                        <a
                          href="https://test.vigyanprep.com/dashboard"
                          className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg ${
                            isPopular
                              ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/30"
                              : "bg-emerald-100 hover:bg-emerald-200 border-2 border-emerald-500/50 text-emerald-800"
                          }`}
                        >
                          <CheckCircle2 size={16} />
                          <span>{isPlanBundle ? 'Access All Mocks → Go to Dashboard' : 'Access Tests → Go to Dashboard'}</span>
                        </a>
                      ) : buttonState === 'upgrade' ? (
                        <button
                          onClick={() => handleBuyClick(plan)}
                          className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg ${
                            isPopular
                              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:opacity-95 shadow-purple-500/30 cursor-pointer"
                              : "bg-purple-50 hover:bg-purple-100 border-2 border-purple-400/50 text-purple-800 cursor-pointer"
                          }`}
                        >
                          <span>Upgrade to Bundle (₹{displayPrice})</span>
                          <ArrowRight size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBuyClick(plan)}
                          className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg ${
                            isPopular
                              ? "bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 hover:opacity-95 shadow-amber-500/20 cursor-pointer"
                              : "bg-white/50 hover:bg-white/80 border-2 border-amber-950/35 text-[#1c1815] cursor-pointer"
                          }`}
                        >
                          <span>Buy Test Series (₹{displayPrice})</span>
                          <ArrowRight size={16} />
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              SCHOLAR EQUAL OPPORTUNITY & NEED-BASED FINANCIAL ASSISTANCE CARD
             ═══════════════════════════════════════════════════════════════════ */}
          <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-white/60 backdrop-blur-2xl border-2 border-amber-950/30 shadow-2xl space-y-6">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/10 border border-amber-950/20 text-amber-950 text-xs font-bold uppercase tracking-wider">
                  <Award size={14} className="text-amber-800" />
                  <span>Equal Opportunity for Every Science Aspirant</span>
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1c1815] leading-snug">
                  Financial Constraints Will Never Stand Between You &amp; Pure Science Research.
                </h3>
                
                <p className="text-xs sm:text-sm text-[#1c1815]/90 font-semibold leading-relaxed">
                  At <strong>VigyanPrep</strong>, we believe genuine passion for pure sciences and research at <strong>IISER, NISER, CMI, and ISI</strong> should never be restricted by financial circumstances. If you are a dedicated student who wants to practice our test series but cannot afford the fee, <strong>please reach out to us directly</strong>. We provide 100% complimentary access and need-based fee waivers to deserving aspirants with complete dignity and respect.
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-amber-950 pt-2">
                  <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-amber-950/20">
                    <CheckCircle2 size={15} className="text-emerald-700" /> 100% Free Need-Based Access
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-amber-950/20">
                    <ShieldCheck size={15} className="text-amber-800" /> Zero Judgment, Full Dignity
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-amber-950/20">
                    <Sparkles size={15} className="text-amber-800" /> Instant Activation
                  </span>
                </div>
              </div>

              {/* Direct Action Contact Card */}
              <div className="p-6 rounded-2xl bg-[#1c1815] text-white border-2 border-amber-500/30 shadow-xl space-y-4 shrink-0 lg:w-80">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Direct Contact &amp; Support Desk</span>
                  <h4 className="text-base font-bold text-white mt-1">Talk to Us Directly</h4>
                  <p className="text-xs text-neutral-300 mt-1">Call or WhatsApp for fee waivers, package assistance, or payment support.</p>
                </div>

                <div className="space-y-2 pt-1">
                  <a
                    href="tel:+917004283531"
                    className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
                  >
                    <span>📞 Call: +91 7004283531</span>
                  </a>

                  <a
                    href="https://wa.me/917004283531?text=Hello%20VigyanPrep%2C%20I%20am%20preparing%20for%20IISER%2FNISER%20and%20would%20like%20to%20request%20student%20assistance%2Ftest%20series%20access."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
                  >
                    <span>💬 WhatsApp: +91 7004283531</span>
                  </a>
                </div>

                <p className="text-[10px] text-center text-neutral-400">
                  Email: <a href="mailto:support@vigyanprep.com" className="text-amber-300 hover:underline">support@vigyanprep.com</a>
                </p>
              </div>
            </div>
          </div>

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

      {/* 24-Hour VIP Demo Pass Request Modal */}
      {showTrialModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1c1815] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-white relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowTrialModal(false);
                setTrialSubmitted(false);
                setTrialError(null);
              }}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <X size={20} />
            </button>

            {!trialSubmitted ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider">
                    <Sparkles size={13} className="text-amber-400" />
                    <span>24-Hour VIP Demo Pass</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Request Your Free 24h Demo Pass
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                    Experience our official CBT test engine, authentic question palette, and detailed solution reviews. Our academic team will verify and activate your pass within 1-2 hours.
                  </p>
                </div>

                {trialError && (
                  <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs font-semibold flex items-start gap-2.5">
                    <span className="text-red-400 font-bold">⚠️</span>
                    <span>{trialError}</span>
                  </div>
                )}

                <form onSubmit={handleTrialSubmit} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                      Student Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={trialName}
                      onChange={(e) => setTrialName(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/15 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                      Student Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@gmail.com"
                      value={trialEmail}
                      onChange={(e) => setTrialEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/15 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition"
                    />
                    <p className="text-[11px] text-neutral-400">
                      We will dispatch your login credentials and activation confirmation to this email.
                    </p>
                  </div>

                  {/* Target Exam */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                      Target Exam
                    </label>
                    <select
                      value={trialTargetExam}
                      onChange={(e) => setTrialTargetExam(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/15 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition cursor-pointer"
                    >
                      <option value="IAT">IISER IAT 2026 (Aptitude Test)</option>
                      <option value="NEST">NISER NEST 2026</option>
                      <option value="JEE">JEE Main 2026 (Physics, Chem, Math)</option>
                      <option value="ISI">ISI B.Stat / B.Math</option>
                      <option value="CMI">CMI Entrance</option>
                      <option value="ALL">All Science Exams (Full VIP Access)</option>
                    </select>
                  </div>

                  {/* Optional WhatsApp/Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center justify-between">
                      <span>WhatsApp / Mobile Number</span>
                      <span className="text-[10px] text-neutral-400 font-normal uppercase">Optional</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210 (For WhatsApp invite)"
                      value={trialPhone}
                      onChange={(e) => setTrialPhone(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/15 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={trialSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 disabled:opacity-50 text-neutral-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer"
                    >
                      {trialSubmitting ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          <span>Submit Request for 24h Pass</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowTrialModal(false)}
                      className="w-full py-2.5 text-xs text-neutral-400 hover:text-white transition font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success / Confirmation State */
              <div className="text-center space-y-6 py-2">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 size={32} />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
                    Request Received Successfully
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    We Have Received Your Email!
                  </h3>
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed font-medium text-left">
                    <p>
                      <strong>{trialResponseMessage || "We have received your email. Our team will verify and activate your demo pass within 1 to 2 hours. Kindly please wait, you will receive a confirmation email shortly."}</strong>
                    </p>
                  </div>
                </div>

                {/* Details Summary */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 text-left space-y-2 text-xs">
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Student:</span>
                    <span className="text-white font-bold">{trialName}</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Email:</span>
                    <span className="font-mono text-amber-300 font-bold">{trialEmail}</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Target Exam:</span>
                    <span className="text-white font-bold">{trialTargetExam}</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Validity:</span>
                    <span className="text-emerald-400 font-bold">24 Hours from activation</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Test Portal:</span>
                    <a href="https://test.vigyanprep.com" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline font-mono">
                      test.vigyanprep.com
                    </a>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="text-left text-xs text-neutral-300 space-y-2 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                    <span>What happens next?</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-neutral-300 list-disc list-inside">
                    <li>Our team reviews and activates your trial pass within 1-2 hours.</li>
                    <li>You will receive an email from <strong className="text-white">noreply@vigyanprep.com</strong> with your temporary login password.</li>
                    <li>Log in at <strong className="text-white">test.vigyanprep.com</strong> to start taking mock tests.</li>
                  </ul>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <a
                    href={`https://wa.me/917004283531?text=${encodeURIComponent(`Hello VigyanPrep Team! I just requested a 24-hour demo pass for ${trialEmail} (${trialTargetExam}). Could you please activate my account?`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>💬 Need Faster Activation? WhatsApp Us</span>
                  </a>

                  <button
                    onClick={() => {
                      setShowTrialModal(false);
                      setTrialSubmitted(false);
                    }}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-extrabold transition cursor-pointer"
                  >
                    Back to Test Series
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
