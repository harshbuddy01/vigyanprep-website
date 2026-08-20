"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ExternalLink,
  Phone,
  Mail,
  MessageSquare,
  Building2,
  Atom,
  Calculator,
  Globe2,
  BookOpen,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Layers,
  GraduationCap,
  Microscope,
  Compass,
  ArrowUpRight,
  Shield
} from "lucide-react";

interface GatewayInfo {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  colorScheme: string;
  degree: string;
  duration: string;
  marks: string | number;
  questions: string;
  markingScheme: string;
  stipend: string;
  tagline: string;
  whyChosen: string;
  institutes: { name: string; location: string; highlight: string }[];
  pattern: { subject: string; count: string; marks: string }[];
  officialUrl: string;
  pyqUrl: string;
}

const GATEWAYS: GatewayInfo[] = [
  {
    id: "iat",
    name: "IISER Aptitude Test (IAT)",
    shortName: "IISER IAT",
    badge: "Flagship Natural Science",
    colorScheme: "amber",
    degree: "5-Year BS-MS Dual Degree & 4-Year BS (Research)",
    duration: "180 Minutes (3 Hours)",
    marks: 240,
    questions: "60 Questions (15 per subject)",
    markingScheme: "+4 for Correct • -1 for Incorrect • 0 for Unattempted",
    stipend: "INSPIRE-SHE & DISHA (₹60,000/yr + ₹20,000/yr Summer Project Grant)",
    tagline: "The premier national gateway to all 7 IISERs, IISc Bangalore, and IIT Madras BS Medical Sciences.",
    whyChosen: "IAT evaluates candidates equally across Physics, Chemistry, Mathematics, and Biology (15 questions each). It rewards deep conceptual intuition and interdisciplinary deduction over mechanical formula memorization.",
    institutes: [
      { name: "IISER Pune", location: "Maharashtra", highlight: "Apex natural science center • Quantum materials, chemical biology & high-performance computing." },
      { name: "IISER Kolkata", location: "West Bengal", highlight: "Center of Excellence in Space Sciences (CESSI), solar physics & earth systems." },
      { name: "IISER Mohali", location: "Punjab", highlight: "Advanced NMR spectroscopy facility, structural biophysics & quantum optics." },
      { name: "IISER Bhopal", location: "Madhya Pradesh", highlight: "Natural Sciences plus 4-Year BS in Data Science & Engineering Sciences." },
      { name: "IISER Thiruvananthapuram", location: "Kerala", highlight: "Materials science, coastal ecology & synthetic chemistry laboratories." },
      { name: "IISER Tirupati", location: "Andhra Pradesh", highlight: "Biophysics, structural biochemistry, cancer biology & climate systems." },
      { name: "IISER Berhampur", location: "Odisha", highlight: "Coastal ecology, functional nanomaterials & experimental high-energy physics." },
      { name: "IISc Bangalore", location: "Karnataka", highlight: "Admissions to 4-Year BS (Research) through top IAT All-India Ranks (NIRF #1)." },
      { name: "IIT Madras", location: "Tamil Nadu", highlight: "BS in Medical Sciences & Engineering through dedicated IAT admission channel." }
    ],
    pattern: [
      { subject: "Physics", count: "15 Questions", marks: "60 Marks" },
      { subject: "Chemistry", count: "15 Questions", marks: "60 Marks" },
      { subject: "Mathematics", count: "15 Questions", marks: "60 Marks" },
      { subject: "Biology", count: "15 Questions", marks: "60 Marks" }
    ],
    officialUrl: "https://iiseradmission.in",
    pyqUrl: "/pyq/iiser"
  },
  {
    id: "nest",
    name: "National Entrance Screening Test (NEST)",
    shortName: "NISER NEST",
    badge: "Atomic Energy Research",
    colorScheme: "emerald",
    degree: "5-Year Integrated M.Sc.",
    duration: "210 Minutes (3.5 Hours)",
    marks: 180,
    questions: "68 Questions (Best 3 of 4 Scored)",
    markingScheme: "Single Correct: +2.5 / -1 • Multiple Correct: Partial credit with NO negative marking",
    stipend: "DAE DISHA Scholarship (₹60,000/yr + ₹20,000/yr Summer Project Grant to ALL students)",
    tagline: "Joint entrance exam for NISER Bhubaneswar & UM-DAE CEBS Mumbai under the Department of Atomic Energy (DAE).",
    whyChosen: "NEST features a unique scoring rule: candidates attempt 4 subjects (Physics, Chemistry, Math, Biology), but only the best 3 subject scores are counted. Graduates with >7.5 CGPA get direct BARC interview eligibility.",
    institutes: [
      { name: "NISER Bhubaneswar", location: "Odisha", highlight: "Apex autonomous research institution under the Department of Atomic Energy." },
      { name: "UM-DAE CEBS Mumbai", location: "Maharashtra", highlight: "Located inside the Mumbai University Kalina campus in direct research partnership with BARC and TIFR." }
    ],
    pattern: [
      { subject: "Physics", count: "17 Questions", marks: "60 Marks (Best 3 Scored)" },
      { subject: "Chemistry", count: "17 Questions", marks: "60 Marks (Best 3 Scored)" },
      { subject: "Mathematics", count: "17 Questions", marks: "60 Marks (Best 3 Scored)" },
      { subject: "Biology", count: "17 Questions", marks: "60 Marks (Best 3 Scored)" }
    ],
    officialUrl: "https://nestexam.in",
    pyqUrl: "/pyq"
  },
  {
    id: "isi",
    name: "Indian Statistical Institute (ISI) Admission Test",
    shortName: "ISI B.Stat / B.Math",
    badge: "Pure Mathematics & Stats",
    colorScheme: "indigo",
    degree: "B.Stat (Hons) at Kolkata / B.Math (Hons) at Bengaluru",
    duration: "4 Hours (UGA: 2 hrs + UGB: 2 hrs)",
    marks: "100 Objective + 100 Subjective Proofs",
    questions: "30 Objective (UGA) + 8 Proofs (UGB)",
    markingScheme: "UGA: +4 / -1 • UGB: Evaluated on mathematical logic, step clarity & rigor",
    stipend: "100% Free Tuition + ₹5,000/month Stipend + Annual Book Allowance for all admitted students",
    tagline: "India's gold standard in mathematical statistics, pure probability, and quantitative logic.",
    whyChosen: "ISI cannot be cracked with formula shortcuts. It demands proof writing and Olympiad-level logic. Admitted students pay zero tuition fees and receive monthly government stipends.",
    institutes: [
      { name: "ISI Kolkata", location: "West Bengal", highlight: "Birthplace of Indian statistics • Flagship B.Stat (Hons) & M.Stat programs." },
      { name: "ISI Bengaluru", location: "Karnataka", highlight: "World-class center for Pure Mathematics & Probability • B.Math (Hons)." },
      { name: "ISI Delhi", location: "New Delhi", highlight: "Premier hub for Quantitative Economics, Econometrics & Operations Research." }
    ],
    pattern: [
      { subject: "Forenoon (UGA)", count: "30 MCQs", marks: "100 Marks (Objective)" },
      { subject: "Afternoon (UGB)", count: "8 Proofs", marks: "100 Marks (Subjective)" }
    ],
    officialUrl: "https://isical.ac.in",
    pyqUrl: "/pyq"
  },
  {
    id: "cmi",
    name: "Chennai Mathematical Institute (CMI) Entrance",
    shortName: "CMI Entrance",
    badge: "Theoretical CS & Math",
    colorScheme: "purple",
    degree: "B.Sc. (Hons.) in Mathematics & Computer Science / Physics",
    duration: "180 Minutes (3 Hours)",
    marks: "100 Marks (Part A: 40 + Part B: 60)",
    questions: "Part A (10 Short Qs) + Part B (6 Proofs)",
    markingScheme: "Part A: Objective answers • Part B: Generous step credit for valid mathematical reasoning",
    stipend: "Full Tuition Fee Waivers & Monthly Merit Scholarships of ₹5,000/month",
    tagline: "India's apex center for pure mathematics, theoretical computer science, and algorithms.",
    whyChosen: "CMI emphasizes algorithmic intuition, discrete mathematics, and logical proofs rather than arithmetic speed. It is globally recognized for alumni admissions to top doctoral programs.",
    institutes: [
      { name: "CMI Chennai", location: "Siruseri, Tamil Nadu", highlight: "Internationally renowned for algebraic geometry, automata theory, complexity & cryptography." }
    ],
    pattern: [
      { subject: "Part A (Short Answer)", count: "10 Questions", marks: "40 Marks" },
      { subject: "Part B (Proofs)", count: "6 Proofs", marks: "60 Marks" }
    ],
    officialUrl: "https://cmi.ac.in",
    pyqUrl: "/pyq"
  },
  {
    id: "iisc",
    name: "IISc Bangalore BS (Research) Admissions",
    shortName: "IISc Research",
    badge: "Rank #1 University in India",
    colorScheme: "blue",
    degree: "4-Year Bachelor of Science (Research) with optional 5th-Yr M.Sc.",
    duration: "Admissions via IAT / JEE Advanced / NEET",
    marks: "Cutoff-based",
    questions: "Follows respective exam blueprint",
    markingScheme: "Follows respective exam blueprint",
    stipend: "INSPIRE-SHE (₹80,000/yr) & IISc Institutional Merit Scholarships",
    tagline: "India's highest-ranked institution in the NIRF rankings for interdisciplinary pure sciences.",
    whyChosen: "IISc now accepts top rankers from the IISER Aptitude Test (IAT) alongside JEE Advanced, giving pure science aspirants direct entry into premier research laboratories.",
    institutes: [
      { name: "IISc Bangalore", location: "Karnataka", highlight: "NIRF Rank #1 University with over 40 research departments and state-of-the-art facilities." }
    ],
    pattern: [
      { subject: "IAT Channel", count: "60 Questions", marks: "Top ~150-250 AIR" },
      { subject: "JEE Advanced Channel", count: "Official", marks: "Top ~250 AIR" },
      { subject: "NEET Channel", count: "Official", marks: "Top ~100 AIR" }
    ],
    officialUrl: "https://iisc.ac.in/ug",
    pyqUrl: "/pyq/iiser"
  }
];

const FAQS = [
  {
    q: "How is VigyanPrep different from regular JEE and NEET coaching?",
    a: "Mainstream coaching institutes focus almost entirely on engineering (JEE) or medical (NEET) speed tests with 30-second formula shortcuts. Research entrances like IISER IAT, NISER NEST, ISI, and CMI require multi-step deductive proofs, balanced 4-subject knowledge, and deep conceptual clarity. VigyanPrep is built specifically for this pure science curriculum."
  },
  {
    q: "Are the Previous Year Papers (PYQs) completely free on VigyanPrep?",
    a: "Yes. All official past year papers for IISER IAT and NISER NEST are 100% free to attempt in our authentic Computer-Based Testing (CBT) interface with real timers and complete step-by-step verified solutions."
  },
  {
    q: "I am a PCM student. Can I crack IISER IAT without a Biology background?",
    a: "Yes, many successful IISER students have PCM or PCB backgrounds. In IAT, questions are asked across all 4 subjects (15 each). PCM students can maximize their score in Physics, Chemistry, and Math while picking up high-yield scoring topics in Biology using our dedicated revision modules."
  },
  {
    q: "What scholarships and stipends do students receive at IISERs and NISER?",
    a: "Admitted students who meet eligibility criteria receive DST INSPIRE-SHE or DAE DISHA scholarships of ₹60,000 per year plus ₹20,000 per year for summer research project grants (total ₹80,000/year). ISI and CMI provide full tuition waivers and monthly stipends."
  },
  {
    q: "How does the Computer-Based Test (CBT) portal work on VigyanPrep?",
    a: "Our CBT portal mirrors the exact TCS iON / NTA examination interface used in official exams, including the standard question palette (Visited, Answered, Marked for Review), countdown timer, sectional switching, and an integrated scientific calculator."
  }
];

export default function AboutPage() {
  const [selectedExamId, setSelectedExamId] = useState<string>("iat");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const activeGateway = GATEWAYS.find((g) => g.id === selectedExamId) || GATEWAYS[0];

  return (
    <div className="min-h-screen bg-[#fafaf8] text-slate-900 font-sans selection:bg-amber-400 selection:text-black">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: HERO (HIGH-END EDITORIAL COMPOSITION)
         ═══════════════════════════════════════════════════════════════════════ */}
      <header className="relative pt-32 sm:pt-40 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-300/80 text-amber-950 text-xs font-bold shadow-sm">
              <Sparkles size={14} className="text-amber-700" />
              <span>Dedicated to Pure Science &amp; Research Aspirants</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
              Where India&apos;s Future{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 underline decoration-amber-300 decoration-wavy decoration-2 underline-offset-8">
                Scientists &amp; Mathematicians
              </span>{" "}
              Prepare.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
              VigyanPrep is the dedicated preparation platform built specifically for{" "}
              <strong>IISER IAT, NISER NEST, ISI Kolkata, CMI Chennai, and IISc Bangalore</strong> research entrance examinations.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/pyq"
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer flex items-center gap-2"
              >
                <BookOpen size={16} />
                <span>Solve Free Past Papers</span>
              </Link>

              <a
                href="https://test.vigyanprep.com"
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm hover:border-slate-400 transition cursor-pointer flex items-center gap-2"
              >
                <span>Launch CBT Exam Portal</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200 text-slate-800">
              <div>
                <span className="text-2xl font-black text-slate-950 font-mono block">7 IISERs</span>
                <span className="text-xs text-slate-500 font-medium">All Campuses Covered</span>
              </div>
              <div className="border-x border-slate-200 px-3">
                <span className="text-2xl font-black text-amber-700 font-mono block">₹80,000/yr</span>
                <span className="text-xs text-slate-500 font-medium">INSPIRE &amp; DISHA Grants</span>
              </div>
              <div>
                <span className="text-2xl font-black text-emerald-700 font-mono block">100% Free</span>
                <span className="text-xs text-slate-500 font-medium">Authentic PYQ Tests</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Candidate Research Card & Live CBT Simulation Pill */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-serif font-black flex items-center justify-center text-sm shadow-sm">
                    वि
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">VigyanPrep Pure Science</h3>
                    <span className="text-[10px] text-slate-500 font-mono">IAT • NEST • ISI • CMI • IISc</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                  ● CBT Engine Live
                </span>
              </div>

              {/* Simulation Item 1 */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-900">IISER Aptitude Test (IAT 2025)</span>
                  <span className="font-mono text-[11px] font-bold text-amber-800">180 Mins • 240 Marks</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                  <div className="p-1.5 rounded-lg bg-white border border-amber-200 font-medium text-slate-700">Physics: 15Q</div>
                  <div className="p-1.5 rounded-lg bg-white border border-amber-200 font-medium text-slate-700">Chem: 15Q</div>
                  <div className="p-1.5 rounded-lg bg-white border border-amber-200 font-medium text-slate-700">Math: 15Q</div>
                  <div className="p-1.5 rounded-lg bg-white border border-amber-200 font-medium text-slate-700">Bio: 15Q</div>
                </div>
              </div>

              {/* Simulation Item 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">NISER NEST (Atomic Energy)</span>
                  <span className="font-mono text-[11px] font-bold text-slate-600">Best 3 of 4 Scored</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                  DAE DISHA scholarship recipient pathway with direct BARC Scientific Officer interview eligibility.
                </p>
              </div>

              {/* Bottom Assurance Note */}
              <div className="flex items-center gap-2 text-[11px] text-slate-600 pt-2">
                <Shield size={14} className="text-amber-600 shrink-0" />
                <span>Zero JEE/NEET formula shortcuts. Pure conceptual derivations only.</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: WHY WE FOUNDED VIGYANPREP (THE EDITORIAL MANIFESTO)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-slate-200">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Compass size={13} className="text-amber-600" />
            <span>Our Founding Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Why India Needed a Dedicated Pure Science Platform
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Standard coaching factories treat basic sciences as an afterthought. We built VigyanPrep to give research aspirants the focus they deserve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-amber-400 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
                <Atom size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-950">First-Principles Logic</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Entrance exams for IISER, NISER, ISI, and CMI test your ability to derive equations from physical postulates, not your capacity to memorize formula charts.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-amber-800">
              ✓ Multi-Step Conceptual Derivations
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-emerald-400 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
                <Layers size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-950">Interdisciplinary Harmony</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We help PCM students pick up scoring Biology fundamentals and PCB students master core Mathematics, giving them the 4-subject balance needed for IAT.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-emerald-800">
              ✓ Physics + Chem + Math + Bio
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-indigo-400 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold">
                <Calculator size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-950">Formal Proof-Writing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For ISI B.Stat/B.Math and CMI, we train students in rigorous subjective proof construction, mathematical induction, and discrete problem-solving.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-indigo-800">
              ✓ Olympiad-Grade Proof Solutions
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: APEX RESEARCH GATEWAYS (INTERACTIVE TABBED DOSSIER)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="gateways" className="py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-slate-200 scroll-mt-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <GraduationCap size={14} className="text-amber-600" />
            <span>Official Curriculum &amp; Admission Dossiers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Explore Target Research Gateways
          </h2>
          <p className="text-sm text-slate-600">
            Click an exam tab below to review its degree offerings, marking scheme, participating campuses, and fellowships.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {GATEWAYS.map((g) => {
            const isSelected = selectedExamId === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setSelectedExamId(g.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-950 text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {g.shortName}
              </button>
            );
          })}
        </div>

        {/* Detailed Showcase Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-md space-y-8">
          
          {/* Card Top Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  {activeGateway.badge}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {activeGateway.degree}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                {activeGateway.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeGateway.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={activeGateway.pyqUrl}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition"
              >
                Solve Free PYQs
              </Link>
              <a
                href={activeGateway.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                title="Official Portal"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Duration</span>
              <span className="text-xs font-black text-slate-900">{activeGateway.duration}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Marks</span>
              <span className="text-xs font-black text-slate-900">{activeGateway.marks}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Questions</span>
              <span className="text-xs font-black text-slate-900">{activeGateway.questions.split('(')[0]}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Marking Scheme</span>
              <span className="text-[11px] font-bold text-slate-900 block leading-tight">{activeGateway.markingScheme.split('•')[0]}</span>
            </div>
          </div>

          {/* Fellowship Box */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
            <strong className="font-extrabold text-amber-900 block">💰 Fellowship &amp; Research Stipend:</strong>
            <p className="leading-relaxed font-normal">{activeGateway.stipend}</p>
          </div>

          {/* Participating Campuses */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-950">
              Admitting Premier Campuses ({activeGateway.institutes.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeGateway.institutes.map((inst, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-950">
                    <span>{inst.name}</span>
                    <span className="text-[10px] text-amber-700 font-medium">{inst.location}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{inst.highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Breakdown */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-950">Subject Breakdown</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {activeGateway.pattern.map((p, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-center space-y-1">
                  <strong className="text-slate-900 block font-bold">{p.subject}</strong>
                  <span className="text-slate-500 text-[11px] block">{p.count}</span>
                  <span className="text-amber-700 text-[11px] font-bold block">{p.marks}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4: THE 4 SCIENTIFIC PILLARS
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-slate-200">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Microscope size={14} className="text-amber-600" />
            <span>Academic Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Four Core Disciplines in Pure Science
          </h2>
          <p className="text-sm text-slate-600">
            Every question module is crafted to connect fundamental sciences into a single, cohesive problem-solving framework.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-amber-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Atom size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-950">Physics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Classical mechanics, rotational motion, wave optics, thermodynamics, electromagnetic theory, and modern quantum physics.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-orange-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center font-bold">
              <Layers size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-950">Chemistry</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Organic reaction mechanisms, molecular orbital theory, coordination chemistry, electrochemistry, and chemical kinetics.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-indigo-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Calculator size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-950">Mathematics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Differential and integral calculus, discrete combinatorics, vector algebra, matrices, probability distributions, and rigorous proofs.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-emerald-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Globe2 size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-950">Biology</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cellular genetics, recombinant DNA technology, biomolecules, enzyme kinetics, systemic physiology, and ecology.
            </p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5: FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto border-t border-slate-200">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <HelpCircle size={14} className="text-amber-600" />
            <span>Common Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-950 hover:text-amber-700 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-amber-600" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6: DIRECT STUDENT MENTORSHIP & HELPDESK
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-slate-200 scroll-mt-20">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Phone size={14} className="text-amber-600" />
            <span>Student Support</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Speak Directly With Our Academic Team
          </h3>
          <p className="text-sm text-slate-600">
            Reach out 7 days a week for curriculum questions, test series guidance, or fee waivers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <a
            href="tel:+917004283531"
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-500 shadow-sm transition group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Phone size={20} />
            </div>
            <h4 className="font-bold text-slate-950 text-sm">Phone Helpline</h4>
            <p className="text-amber-700 font-mono font-bold">+91 7004283531</p>
            <span className="text-[10px] text-slate-400">Direct Student Enquiries</span>
          </a>

          <a
            href="mailto:support@vigyanprep.com"
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-500 shadow-sm transition group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Mail size={20} />
            </div>
            <h4 className="font-bold text-slate-950 text-sm">Email Support</h4>
            <p className="text-amber-700 font-mono font-bold">support@vigyanprep.com</p>
            <span className="text-[10px] text-slate-400">2-4 Hours Response Time</span>
          </a>

          <a
            href="https://wa.me/917004283531"
            target="_blank"
            rel="noreferrer"
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm transition group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <MessageSquare size={20} />
            </div>
            <h4 className="font-bold text-slate-950 text-sm">WhatsApp Mentorship</h4>
            <p className="text-emerald-700 font-mono font-bold">+91 7004283531</p>
            <span className="text-[10px] text-slate-400">Instant Doubt Clearing</span>
          </a>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <Building2 size={20} />
            </div>
            <h4 className="font-bold text-slate-950 text-sm">Academic Center</h4>
            <p className="text-slate-600 text-xs">VigyanPrep Education Division</p>
            <span className="text-[10px] text-slate-400">Pure Science Entrance Portal</span>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7: BOTTOM CTA BANNER (WARM GOLDEN GRADIENT)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 text-slate-950 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-950">
              Start Your Pure Science Journey
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Ready to Practice With Real Exam Blueprints?
            </h3>
            <p className="text-xs sm:text-sm text-slate-900 font-medium">
              Attempt 100% free official past year papers in our Computer-Based Testing (CBT) portal today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/pyq"
              className="px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs shadow-lg transition"
            >
              Solve Free PYQs
            </Link>
            <a
              href="https://test.vigyanprep.com"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs shadow-sm transition"
            >
              Open Test Portal
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
