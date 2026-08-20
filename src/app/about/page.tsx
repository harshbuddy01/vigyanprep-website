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
  CheckCircle2,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Layers,
  GraduationCap,
  Microscope
} from "lucide-react";

interface ExamDetail {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  degree: string;
  duration: string;
  marks: string | number;
  questions: string;
  markingScheme: string;
  stipend: string;
  summary: string;
  whySpecial: string;
  institutes: { name: string; location: string; highlight: string }[];
  pattern: { subject: string; count: string; marks: string }[];
  officialUrl: string;
  pyqUrl: string;
}

const EXAMS_DATA: ExamDetail[] = [
  {
    id: "iat",
    name: "IISER Aptitude Test (IAT)",
    shortName: "IISER IAT",
    badge: "Flagship Research Entrance",
    degree: "5-Year BS-MS Dual Degree & 4-Year BS (Research)",
    duration: "180 Minutes (3 Hours)",
    marks: 240,
    questions: "60 Questions (15 per subject)",
    markingScheme: "+4 for correct, -1 for incorrect, 0 for unattempted",
    stipend: "INSPIRE-SHE & DISHA (₹60,000/yr + ₹20,000/yr Research Project Contingency)",
    summary: "The primary national entrance exam for admission to all 7 autonomous IISERs, IISc Bangalore (BS Research), and IIT Madras (BS Medical Sciences).",
    whySpecial: "IAT evaluates students equally across Physics, Chemistry, Mathematics, and Biology (15 questions each). It rewards conceptual clarity and interdisciplinary scientific reasoning over speed-memorization.",
    institutes: [
      { name: "IISER Pune", location: "Maharashtra", highlight: "Premier natural science center with world-class quantum materials and chemical biology laboratories." },
      { name: "IISER Kolkata", location: "West Bengal", highlight: "Home to the Center of Excellence in Space Sciences (CESSI) and leading Earth sciences faculty." },
      { name: "IISER Mohali", location: "Punjab", highlight: "Advanced NMR spectroscopy facility, structural biophysics, and quantum optics research." },
      { name: "IISER Bhopal", location: "Madhya Pradesh", highlight: "Natural Sciences plus specialized 4-Year BS programs in Data Science and Engineering Sciences." },
      { name: "IISER Thiruvananthapuram", location: "Kerala", highlight: "State-of-the-art materials science, ecological research, and chemical synthesis labs." },
      { name: "IISER Tirupati", location: "Andhra Pradesh", highlight: "Strong research focus on biophysics, cancer biology, and climate science." },
      { name: "IISER Berhampur", location: "Odisha", highlight: "Specialized in coastal ecology, nanomaterials, and high-energy physics." },
      { name: "IISc Bangalore", location: "Karnataka", highlight: "Admissions to 4-Year BS (Research) through top IAT All-India ranks (NIRF #1 University)." },
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
    degree: "5-Year Integrated M.Sc.",
    duration: "210 Minutes (3.5 Hours)",
    marks: 180,
    questions: "68 Questions (Best 3 of 4 Scored)",
    markingScheme: "Single Correct: +2.5 / -1 • Multiple Correct (MSQ): Partial marks with no negative marking",
    stipend: "DAE DISHA Scholarship (₹60,000/yr + ₹20,000/yr Summer Project Grant for all admitted students)",
    summary: "Joint entrance exam for admission to NISER Bhubaneswar and UM-DAE CEBS Mumbai, funded directly by the Department of Atomic Energy (DAE), Government of India.",
    whySpecial: "NEST features a unique scoring policy where questions from all 4 subjects (Physics, Chemistry, Math, Biology) are provided, but only the candidate's best 3 subject scores are counted toward the merit list.",
    institutes: [
      { name: "NISER Bhubaneswar", location: "Odisha", highlight: "Apex autonomous science institute under the Department of Atomic Energy, adjacent to IIT Bhubaneswar." },
      { name: "UM-DAE CEBS Mumbai", location: "Maharashtra", highlight: "Autonomous center located inside the University of Mumbai campus in close research collaboration with BARC and TIFR." }
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
    badge: "Pure Mathematics & Statistics",
    degree: "B.Stat (Hons) at Kolkata / B.Math (Hons) at Bengaluru",
    duration: "4 Hours (UGA: 2 Hours + UGB: 2 Hours)",
    marks: "100 Objective + 100 Subjective Proofs",
    questions: "30 Objective (UGA) + 8 Proofs (UGB)",
    markingScheme: "UGA: +4 / -1 • UGB: Evaluated on mathematical logic, step clarity, and rigor",
    stipend: "100% Free Tuition + ₹5,000/month Living Stipend + Annual Book Allowance for all students",
    summary: "India's premier entrance test for undergraduate mathematical statistics, pure probability, and higher mathematics at the historic Indian Statistical Institute.",
    whySpecial: "ISI evaluates rigorous Olympiad-grade problem-solving and formal proof-writing. Admitted students pay zero tuition fees and receive monthly government stipends.",
    institutes: [
      { name: "ISI Kolkata", location: "West Bengal", highlight: "Birthplace of Indian statistics and home to the flagship B.Stat (Hons) and M.Stat programs." },
      { name: "ISI Bengaluru", location: "Karnataka", highlight: "World-class center for Pure Mathematics, Analysis, and Probability hosting the B.Math (Hons) program." },
      { name: "ISI Delhi", location: "New Delhi", highlight: "Premier research center for Quantitative Economics, Econometrics, and Operations Research." }
    ],
    pattern: [
      { subject: "Forenoon Session (UGA)", count: "30 MCQs", marks: "100 Marks (Objective)" },
      { subject: "Afternoon Session (UGB)", count: "8 Proofs", marks: "100 Marks (Subjective)" }
    ],
    officialUrl: "https://isical.ac.in",
    pyqUrl: "/pyq"
  },
  {
    id: "cmi",
    name: "Chennai Mathematical Institute (CMI) Entrance",
    shortName: "CMI Entrance",
    badge: "Theoretical Computer Science & Math",
    degree: "B.Sc. (Hons.) in Mathematics & Computer Science / Physics",
    duration: "180 Minutes (3 Hours)",
    marks: "100 Marks (Part A: 40 + Part B: 60)",
    questions: "Part A (10 Short Questions) + Part B (6 Proof Problems)",
    markingScheme: "Part A: Objective answers • Part B: Generous step marking for valid mathematical reasoning",
    stipend: "Full Tuition Fee Waivers & Monthly Merit Scholarships of ₹5,000/month",
    summary: "Apex entrance exam for undergraduate studies in pure mathematics, theoretical computer science, algorithms, and theoretical physics in Siruseri, Chennai.",
    whySpecial: "CMI focuses on algorithmic intuition, discrete mathematics, and logical proofs rather than calculation speed. It is globally recognized for alumni admissions to top doctoral programs.",
    institutes: [
      { name: "CMI Chennai", location: "Siruseri, Tamil Nadu", highlight: "Internationally renowned center for algebraic geometry, complexity theory, cryptography, and logic." }
    ],
    pattern: [
      { subject: "Part A (Short Answer)", count: "10 Questions", marks: "40 Marks" },
      { subject: "Part B (Subjective Proofs)", count: "6 Proofs", marks: "60 Marks" }
    ],
    officialUrl: "https://cmi.ac.in",
    pyqUrl: "/pyq"
  },
  {
    id: "iisc",
    name: "IISc Bangalore BS (Research) Admissions",
    shortName: "IISc Research",
    badge: "Rank #1 University in India",
    degree: "4-Year Bachelor of Science (Research) with optional 5th-Year M.Sc.",
    duration: "Admissions via IAT / JEE Advanced / NEET",
    marks: "Cutoff-based",
    questions: "Follows respective exam",
    markingScheme: "Follows respective exam",
    stipend: "INSPIRE-SHE (₹80,000/yr) & IISc Institutional Merit Scholarships",
    summary: "India's highest-ranked institution in the NIRF rankings, offering a world-class 4-year interdisciplinary undergraduate program in natural, chemical, and mathematical sciences.",
    whySpecial: "IISc now accepts top rankers from the IISER Aptitude Test (IAT) alongside JEE Advanced, giving pure science aspirants direct entry into premier research laboratories.",
    institutes: [
      { name: "IISc Bangalore", location: "Karnataka", highlight: "NIRF Rank #1 University in India with over 40 research departments and interdisciplinary laboratories." }
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
  const [activeTab, setActiveTab] = useState<string>("iat");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const currentExam = EXAMS_DATA.find((e) => e.id === activeTab) || EXAMS_DATA[0];

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-900 font-sans selection:bg-amber-400 selection:text-black">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION (CLEAN, BRIGHT, HUMAN-CENTRIC DRIBBBLE STYLE)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 sm:pt-40 pb-20 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold shadow-sm">
            <Sparkles size={14} className="text-amber-600" />
            <span>Dedicated to Pure Science &amp; Research Aspirants</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
            Empowering India&apos;s Next Generation of{" "}
            <span className="text-amber-600 underline decoration-amber-300 decoration-wavy decoration-2 underline-offset-4">
              Scientists &amp; Mathematicians
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
            VigyanPrep is India&apos;s specialized preparation platform built exclusively for{" "}
            <strong>IISER IAT, NISER NEST, ISI Kolkata/Bengaluru, CMI Chennai, and IISc Bangalore</strong> research entrance examinations.
          </p>

          {/* Hero Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/pyq"
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer flex items-center gap-2"
            >
              <BookOpen size={16} />
              <span>Solve Free Past Papers (CBT)</span>
            </Link>

            <a
              href="https://test.vigyanprep.com"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm hover:border-slate-400 transition cursor-pointer flex items-center gap-2"
            >
              <span>Open CBT Test Portal</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* 4 Stat Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">7 IISERs</span>
            <span className="text-xs text-slate-500 font-medium">All Campuses Covered</span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 block">2 DAE Hubs</span>
            <span className="text-xs text-slate-500 font-medium">NISER &amp; CEBS Mumbai</span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block">100% Free</span>
            <span className="text-xs text-slate-500 font-medium">Authentic PYQ Tests</span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 block">₹80k/yr</span>
            <span className="text-xs text-slate-500 font-medium">INSPIRE &amp; DISHA Grants</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          THE STORY BEHIND VIGYANPREP: WHY WE EXIST
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 lg:px-12 max-w-6xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <Sparkles size={13} className="text-amber-500" />
              <span>Our Academic Mission</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Why We Founded VigyanPrep
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              In India, nearly every major coaching institution directs all its energy toward engineering (JEE) and medical (NEET) entrance exams. Millions of students are pushed into formula-drills designed purely for calculation speed.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              However, students who genuinely love <strong>theoretical physics, chemical synthesis, higher mathematics, molecular biology, and scientific research</strong> were left without a dedicated platform.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We created <strong>VigyanPrep</strong> to provide India&apos;s research aspirants with the authentic preparation tools they deserve: full-length Computer-Based Testing (CBT), past year question papers, verified solutions, and structured syllabus modules tailored strictly for IISER, NISER, ISI, and CMI.
            </p>
          </div>

          {/* Right Column: 3 Pillars Card */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900">The 3 Principles of VigyanPrep</h3>
            
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">1. Conceptual Depth Over Formula Speed</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    We train students to understand the &ldquo;why&rdquo; behind equations so they can solve unseen, non-standard research questions with confidence.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">2. Balanced 4-Subject Harmony</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    We help PCM students pick up high-yield scoring Biology concepts and PCB students master core Mathematics fundamentals for IISER IAT.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/60 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">3. 100% Free Authentic Past Papers</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Every student in India gets free access to official past year question papers in a true CBT environment with verified step-by-step explanations.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          INTERACTIVE EXAM EXPLORER (CLEAN TABS & SHOWCASE CARD)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="exams" className="py-16 px-6 lg:px-12 max-w-6xl mx-auto border-t border-slate-200 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <GraduationCap size={14} className="text-amber-600" />
            <span>Curriculum &amp; Exam Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Target Entrance Examinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select an exam below to inspect official paper patterns, marking schemes, admitting campuses, and stipends.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {EXAMS_DATA.map((exam) => {
            const isActive = activeTab === exam.id;
            return (
              <button
                key={exam.id}
                onClick={() => setActiveTab(exam.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {exam.shortName}
              </button>
            );
          })}
        </div>

        {/* Active Exam Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {currentExam.badge}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {currentExam.degree}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {currentExam.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {currentExam.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={currentExam.pyqUrl}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition"
              >
                Solve Free PYQs
              </Link>
              <a
                href={currentExam.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                title="Official Portal"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Duration</span>
              <span className="text-xs font-extrabold text-slate-800">{currentExam.duration}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Marks</span>
              <span className="text-xs font-extrabold text-slate-800">{currentExam.marks}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Questions</span>
              <span className="text-xs font-extrabold text-slate-800">{currentExam.questions.split('(')[0]}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Marking Scheme</span>
              <span className="text-[11px] font-bold text-slate-800 leading-tight block">{currentExam.markingScheme.split('•')[0]}</span>
            </div>
          </div>

          {/* Fellowship Box */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
            <strong className="font-bold text-amber-900 block">💰 Fellowship &amp; Research Stipend:</strong>
            <p className="leading-relaxed">{currentExam.stipend}</p>
          </div>

          {/* Institutes Grid */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900">
              Admitting Premier Campuses ({currentExam.institutes.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentExam.institutes.map((inst, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{inst.name}</span>
                    <span className="text-[10px] text-amber-700 font-medium">{inst.location}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{inst.highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Pattern */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900">Subject Breakdown</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentExam.pattern.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-center space-y-0.5">
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
          THE 4 CORE DISCIPLINES
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 lg:px-12 max-w-6xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Microscope size={14} className="text-amber-600" />
            <span>Academic Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Four Pillars of Pure Science
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Connecting fundamental sciences into a single, unified problem-solving methodology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-amber-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Atom size={24} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Physics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Classical mechanics, rotational motion, wave optics, thermodynamics, electromagnetic theory, and modern quantum physics.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-orange-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center font-bold">
              <Layers size={24} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Chemistry</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Organic reaction mechanisms, molecular orbital theory, coordination chemistry, electrochemistry, and thermodynamics.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-indigo-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Calculator size={24} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Mathematics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Differential and integral calculus, discrete combinatorics, vector algebra, matrices, probability, and rigorous proofs.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-emerald-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Globe2 size={24} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Biology</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cellular genetics, recombinant DNA technology, biomolecules, enzyme kinetics, human physiology, and ecology.
            </p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 lg:px-12 max-w-4xl mx-auto border-t border-slate-200">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <HelpCircle size={14} className="text-amber-600" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
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
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-amber-700 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-amber-600" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          DIRECT MENTORSHIP & CONTACT HELPDESK
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-16 px-6 lg:px-12 max-w-6xl mx-auto border-t border-slate-200 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Phone size={14} className="text-amber-600" />
            <span>Student Support</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Need Guidance With Tests or Admissions?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Our academic mentoring team is available 7 days a week for curriculum questions, test series guidance, and fee waivers.
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
            <h4 className="font-bold text-slate-900 text-sm">Phone Helpline</h4>
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
            <h4 className="font-bold text-slate-900 text-sm">Email Support</h4>
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
            <h4 className="font-bold text-slate-900 text-sm">WhatsApp Mentorship</h4>
            <p className="text-emerald-700 font-mono font-bold">+91 7004283531</p>
            <span className="text-[10px] text-slate-400">Instant Doubt Clearing</span>
          </a>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <Building2 size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Academic Center</h4>
            <p className="text-slate-600 text-xs">VigyanPrep Education Division</p>
            <span className="text-[10px] text-slate-400">Pure Science Entrance Portal</span>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
