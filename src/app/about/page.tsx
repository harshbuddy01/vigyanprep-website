"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  RayOpticsSketch,
  BenzeneOrbitalSketch,
  CalculusIntegralSketch,
  DNAHelixSketch
} from "@/components/ScienceSketches";
import {
  ExternalLink,
  Phone,
  Mail,
  MessageSquare,
  Building2,
  ChevronRight
} from "lucide-react";

interface GatewayDossier {
  id: string;
  code: string;
  name: string;
  shortName: string;
  badge: string;
  degree: string;
  duration: string;
  marks: string | number;
  questions: string;
  markingScheme: string;
  stipend: string;
  tagline: string;
  institutes: { name: string; location: string; highlight: string }[];
  pattern: { subject: string; count: string; marks: string }[];
  officialUrl: string;
  pyqUrl: string;
}

const GATEWAYS: GatewayDossier[] = [
  {
    id: "iat",
    code: "DOSSIER-01",
    name: "IISER Aptitude Test (IAT)",
    shortName: "IISER IAT",
    badge: "Flagship Natural Science",
    degree: "5-Year BS-MS Dual Degree & 4-Year BS (Research)",
    duration: "180 Minutes (3 Hours)",
    marks: 240,
    questions: "60 Questions (15 per subject)",
    markingScheme: "+4 Correct • -1 Incorrect • 0 Unattempted",
    stipend: "INSPIRE-SHE & DISHA (₹60,000/yr + ₹20,000/yr Research Contingency)",
    tagline: "The premier national gateway to all 7 autonomous IISERs, IISc Bangalore, and IIT Madras BS Medical Sciences.",
    institutes: [
      { name: "IISER Pune", location: "Maharashtra", highlight: "Apex natural science hub • Quantum materials & chemical biology." },
      { name: "IISER Kolkata", location: "West Bengal", highlight: "Center of Excellence in Space Sciences (CESSI) & Earth systems." },
      { name: "IISER Mohali", location: "Punjab", highlight: "Advanced NMR spectroscopy facility & quantum optics." },
      { name: "IISER Bhopal", location: "Madhya Pradesh", highlight: "Natural Sciences, Data Science & Chemical Engineering." },
      { name: "IISER Thiruvananthapuram", location: "Kerala", highlight: "Materials science, coastal ecology & synthetic chemistry." },
      { name: "IISER Tirupati", location: "Andhra Pradesh", highlight: "Biophysics, cancer biology & climate systems." },
      { name: "IISER Berhampur", location: "Odisha", highlight: "Coastal ecology & experimental high-energy physics." },
      { name: "IISc Bangalore", location: "Karnataka", highlight: "4-Year BS (Research) through top IAT All-India Ranks (NIRF #1)." },
      { name: "IIT Madras", location: "Tamil Nadu", highlight: "BS in Medical Sciences & Engineering through IAT channel." }
    ],
    pattern: [
      { subject: "Physics", count: "15 Qs", marks: "60 Marks" },
      { subject: "Chemistry", count: "15 Qs", marks: "60 Marks" },
      { subject: "Mathematics", count: "15 Qs", marks: "60 Marks" },
      { subject: "Biology", count: "15 Qs", marks: "60 Marks" }
    ],
    officialUrl: "https://iiseradmission.in",
    pyqUrl: "/pyq/iiser"
  },
  {
    id: "nest",
    code: "DOSSIER-02",
    name: "National Entrance Screening Test (NEST)",
    shortName: "NISER NEST",
    badge: "Atomic Energy Research",
    degree: "5-Year Integrated M.Sc.",
    duration: "210 Minutes (3.5 Hours)",
    marks: 180,
    questions: "68 Questions (Best 3 of 4 Scored)",
    markingScheme: "Single Correct: +2.5 / -1 • Multiple Correct: Partial marks with NO negative marks",
    stipend: "DAE DISHA Scholarship (₹60,000/yr + ₹20,000/yr Summer Project Grant for ALL students)",
    tagline: "Joint entrance exam for NISER Bhubaneswar & UM-DAE CEBS Mumbai under the Department of Atomic Energy (DAE).",
    institutes: [
      { name: "NISER Bhubaneswar", location: "Odisha", highlight: "Apex autonomous research institution under the Department of Atomic Energy." },
      { name: "UM-DAE CEBS Mumbai", location: "Maharashtra", highlight: "Located inside Mumbai University campus in direct research partnership with BARC and TIFR." }
    ],
    pattern: [
      { subject: "Physics", count: "17 Qs", marks: "60 Marks (Best 3 Scored)" },
      { subject: "Chemistry", count: "17 Qs", marks: "60 Marks (Best 3 Scored)" },
      { subject: "Mathematics", count: "17 Qs", marks: "60 Marks (Best 3 Scored)" },
      { subject: "Biology", count: "17 Qs", marks: "60 Marks (Best 3 Scored)" }
    ],
    officialUrl: "https://nestexam.in",
    pyqUrl: "/pyq"
  },
  {
    id: "isi",
    code: "DOSSIER-03",
    name: "Indian Statistical Institute (ISI) Admission Test",
    shortName: "ISI B.Stat / B.Math",
    badge: "Pure Mathematics & Stats",
    degree: "B.Stat (Hons) at Kolkata / B.Math (Hons) at Bengaluru",
    duration: "4 Hours (UGA: 2 hrs + UGB: 2 hrs)",
    marks: "100 Objective + 100 Subjective Proofs",
    questions: "30 Objective (UGA) + 8 Proofs (UGB)",
    markingScheme: "UGA: +4 / -1 • UGB: Graded on proof logic, clarity & mathematical rigor",
    stipend: "100% Free Tuition + ₹5,000/month Stipend + Annual Book Allowance",
    tagline: "The world's gold standard in mathematical statistics, probability theory, and quantitative proofs.",
    institutes: [
      { name: "ISI Kolkata", location: "West Bengal", highlight: "Birthplace of Indian statistics • Flagship B.Stat (Hons) and M.Stat programs." },
      { name: "ISI Bengaluru", location: "Karnataka", highlight: "World-class center for Pure Mathematics & Probability • B.Math (Hons)." },
      { name: "ISI Delhi", location: "New Delhi", highlight: "Premier hub for Quantitative Economics, Econometrics & Operations Research." }
    ],
    pattern: [
      { subject: "Forenoon (UGA)", count: "30 Qs", marks: "100 Marks (Objective)" },
      { subject: "Afternoon (UGB)", count: "8 Proofs", marks: "100 Marks (Subjective)" }
    ],
    officialUrl: "https://isical.ac.in",
    pyqUrl: "/pyq"
  },
  {
    id: "cmi",
    code: "DOSSIER-04",
    name: "Chennai Mathematical Institute (CMI) Entrance",
    shortName: "CMI Entrance",
    badge: "Theoretical CS & Math",
    degree: "B.Sc. (Hons.) in Mathematics & Computer Science / Physics",
    duration: "180 Minutes (3 Hours)",
    marks: "100 Marks (Part A: 40 + Part B: 60)",
    questions: "Part A (10 Short Qs) + Part B (6 Proofs)",
    markingScheme: "Part A: Objective answers • Part B: Generous step credit for valid mathematical reasoning",
    stipend: "Full Tuition Fee Waivers & Monthly Merit Scholarships of ₹5,000/month",
    tagline: "India's apex center for pure mathematics, theoretical computer science, and algorithms.",
    institutes: [
      { name: "CMI Chennai", location: "Siruseri, Tamil Nadu", highlight: "Internationally renowned for algebraic geometry, automata theory & algorithms." }
    ],
    pattern: [
      { subject: "Part A (Short Answer)", count: "10 Qs", marks: "40 Marks" },
      { subject: "Part B (Proofs)", count: "6 Proofs", marks: "60 Marks" }
    ],
    officialUrl: "https://cmi.ac.in",
    pyqUrl: "/pyq"
  },
  {
    id: "iisc",
    code: "DOSSIER-05",
    name: "IISc Bangalore BS (Research) Admissions",
    shortName: "IISc Research",
    badge: "Rank #1 University in India",
    degree: "4-Year Bachelor of Science (Research) with optional 5th-Yr M.Sc.",
    duration: "Admissions via IAT / JEE Advanced / NEET",
    marks: "Cutoff-based",
    questions: "Follows respective exam blueprint",
    markingScheme: "Follows respective exam blueprint",
    stipend: "INSPIRE-SHE (₹80,000/yr) & IISc Institutional Merit Scholarships",
    tagline: "India's highest-ranked institution in the NIRF rankings for interdisciplinary pure sciences.",
    institutes: [
      { name: "IISc Bangalore", location: "Karnataka", highlight: "NIRF Rank #1 University with over 40 research departments and labs." }
    ],
    pattern: [
      { subject: "IAT Channel", count: "60 Qs", marks: "Top ~150-250 AIR" },
      { subject: "JEE Advanced Channel", count: "Official", marks: "Top ~250 AIR" },
      { subject: "NEET Channel", count: "Official", marks: "Top ~100 AIR" }
    ],
    officialUrl: "https://iisc.ac.in/ug",
    pyqUrl: "/pyq/iiser"
  }
];

const POSTCARD_FAQS = [
  {
    num: "Q.01",
    q: "Why is VigyanPrep different from JEE/NEET coachings?",
    a: "Commercial coachings train students exclusively for engineering and medical speed-tests with 30-second formula cramming. Entrance exams for IISER, NISER, ISI, and CMI demand deep deductive proofs, physical intuition from first principles, and 4-subject balance. VigyanPrep is built ground-up exclusively for this research curriculum."
  },
  {
    num: "Q.02",
    q: "Are the Previous Year Papers (PYQs) 100% free?",
    a: "Yes. All official past year papers for IISER IAT and NISER NEST are completely free to attempt in our authentic Computer-Based Testing (CBT) interface with real countdown timers, question palettes, and step-by-step verified explanations."
  },
  {
    num: "Q.03",
    q: "Can a PCM student crack IISER IAT without Biology?",
    a: "Yes! In IAT, questions are asked across all 4 subjects (15 each). PCM students can maximize marks in Physics, Chemistry, and Math while picking up high-scoring foundational topics in Biology using our structured revision modules."
  },
  {
    num: "Q.04",
    q: "What scholarships & stipends do admitted students receive?",
    a: "Eligible students at IISERs, NISER, and IISc receive DST INSPIRE-SHE or DAE DISHA fellowships of ₹60,000/year plus ₹20,000/year summer research project grants (total ₹80,000/yr). ISI and CMI provide 100% tuition waivers and monthly living stipends."
  }
];

export default function AboutPage() {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [selectedGatewayId, setSelectedGatewayId] = useState<string>("iat");
  const [expandedPostcard, setExpandedPostcard] = useState<number | null>(null);

  const activeGateway = GATEWAYS.find((g) => g.id === selectedGatewayId) || GATEWAYS[0];

  return (
    <div className="min-h-screen bg-[#110f0d] text-[#2c241d] font-sans selection:bg-[#c99742] selection:text-black relative overflow-x-hidden">
      <Navbar />

      {/* Desk Wood Texture & Ambient Warm Lamp Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,#2a221b_0%,#0e0c0a_100%)] z-0" />
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Journal Workspace Container */}
      <main className="relative z-10 pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        
        {/* ═══════════════════════════════════════════════════════════════════════
            TOP LEATHER CHAPTER BOOKMARK TABS
           ═══════════════════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-center sm:justify-end gap-2 mb-3 px-2 flex-wrap">
          {[
            { id: 1, label: "Chapter I: The Codex", icon: "📖" },
            { id: 2, label: "Chapter II: Gateways", icon: "🏛️" },
            { id: 3, label: "Chapter III: Disciplines", icon: "🔬" },
            { id: 4, label: "Chapter IV: Postcards", icon: "📮" },
            { id: 5, label: "Chapter V: Dispatch", icon: "✉️" }
          ].map((tab) => {
            const isActive = activeChapter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveChapter(tab.id)}
                className={`px-4 py-2 rounded-t-xl text-xs font-serif font-bold transition-all shadow-md cursor-pointer border-t-2 ${
                  isActive
                    ? "bg-[#faf5e8] text-[#1c1815] border-[#c99742] translate-y-1 shadow-lg z-20 font-black"
                    : "bg-[#241f1a] text-[#b8a690] border-[#3d332a] hover:bg-[#2d2620] hover:text-white"
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            THE OPEN DOUBLE-PAGE RESEARCH LEDGER JOURNAL
           ═══════════════════════════════════════════════════════════════════════ */}
        <div className="relative bg-[#faf5e8] border border-[#d6cbaf] rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_0_12px_#231d17] overflow-hidden min-h-[720px] flex flex-col justify-between">
          
          {/* Subtle 24px Graph Grid Ruling Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Central Book Spine Shadow & Fold Gradient */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-16 pointer-events-none bg-gradient-to-r from-black/10 via-black/25 to-black/10 z-20" />

          {/* ═══════════════════════════════════════════════════════════════════
              CHAPTER I: THE FOUNDING CODEX & SANSKRIT GENESIS
             ═══════════════════════════════════════════════════════════════════ */}
          {activeChapter === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 p-6 sm:p-10 lg:p-14 gap-8 lg:gap-14">
              
              {/* LEFT PAGE: THE CHRONICLES & MANIFESTO */}
              <div className="lg:col-span-6 space-y-6 lg:pr-6 border-b lg:border-b-0 lg:border-r border-[#e0d6bd] pb-8 lg:pb-0 relative">
                
                {/* Red Ledger Margin Line on Left */}
                <div className="hidden sm:block absolute top-0 bottom-0 left-[-16px] w-[1.5px] bg-[#d97768]/40" />

                <div>
                  <span className="font-serif italic text-sm text-[#8c672b] tracking-wider block mb-1">
                    Chapter I.
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1c1815] uppercase tracking-wider leading-[1.08]">
                    THE VIGYAN <br className="hidden sm:inline" />CHRONICLES
                  </h1>
                </div>

                {/* Drop Cap Body */}
                <div className="text-sm sm:text-base text-[#382f27] font-serif leading-relaxed space-y-4">
                  <p className="first-letter:float-left first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-serif first-letter:font-black first-letter:text-[#9e2a2b] first-letter:mr-3 first-letter:leading-[0.85] first-letter:pt-1">
                    Born from a profound reverence for empirical science and mathematical deduction, <strong>VigyanPrep</strong> was established not as a conventional coaching factory, but as an authentic sanctuary for India&apos;s research scholars. We believe that true scientific learning is an art form—one that bridges fundamental first principles with the living spirit of discovery.
                  </p>
                  
                  {/* Parchment Quote Box */}
                  <blockquote className="p-4 rounded-xl bg-[#f0e8d5] border-l-4 border-[#9e2a2b] text-xs sm:text-sm italic text-[#4a3f35] shadow-xs">
                    &ldquo;In a landscape dominated by 30-second formula shortcuts for engineering and medical entrances, we built a dedicated home for those whose passion lies in theoretical physics, molecular biology, pure mathematics, and chemical synthesis.&rdquo;
                  </blockquote>

                  <p className="text-xs sm:text-sm text-[#4a3f35] font-light leading-relaxed">
                    We do not teach mechanical rote tricks; we cultivate <strong>Scientific Thinkers</strong>. Aspirants capable of deriving equations from core postulates, writing rigorous subjective proofs, and exploring the frontiers of IISER, NISER, ISI, CMI, and IISc.
                  </p>
                </div>

                {/* Sanskrit Etymology Stamp */}
                <div className="p-4 rounded-2xl bg-[#efe5cf] border border-[#d8caa8] flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#9e2a2b] text-[#fbf7ee] font-serif font-black text-2xl flex items-center justify-center shrink-0 shadow-sm">
                    वि
                  </div>
                  <div className="text-xs">
                    <strong className="font-serif font-bold text-[#1c1815] block text-sm">विज्ञान (Vi-Gyan)</strong>
                    <span className="text-[#695a4c] font-mono leading-tight block">
                      [ Vi: Empirical, Discerning Inquiry • Gyan: Pure Fundamental Truth ]
                    </span>
                  </div>
                </div>

                {/* Red Circular Rubber Stamp Effect */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-dashed border-[#9e2a2b]/70 text-[#9e2a2b] font-mono text-[10px] uppercase font-bold tracking-widest -rotate-2">
                  <span>★ OFFICIAL PURE SCIENCE SANCTUARY • VERIFIED CBT ★</span>
                </div>
              </div>

              {/* RIGHT PAGE: TAPED POLAROID ARTIFACTS & FIELD NOTES */}
              <div className="lg:col-span-6 space-y-6 lg:pl-6 relative flex flex-col justify-between">
                
                <div className="space-y-6">
                  
                  {/* Pinned Polaroid 1: Research Campus */}
                  <div className="relative p-3.5 bg-white rounded-lg shadow-xl border border-[#ded4bc] max-w-sm mx-auto sm:rotate-2 hover:rotate-0 transition-transform duration-300">
                    
                    {/* Frosted Scotch Tape on Top */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-white/45 backdrop-blur-xs border border-white/60 shadow-xs rotate-[-2deg] z-10" />

                    <div className="relative h-44 sm:h-52 w-full rounded overflow-hidden bg-[#e0d6bd]">
                      <Image
                        src="/images/sketch-university-campus.jpg"
                        alt="IISER and IISc research campus sketch"
                        fill
                        className="object-cover sepia-[0.25]"
                        priority
                      />
                    </div>
                    
                    <div className="pt-2 text-center">
                      <span className="font-serif italic text-xs text-[#5c4d3e] font-semibold">
                        The 7 IISER Campuses, IISc Bangalore &amp; NISER
                      </span>
                    </div>
                  </div>

                  {/* Pinned Polaroid 2: First Principles Laboratory */}
                  <div className="relative p-3.5 bg-white rounded-lg shadow-xl border border-[#ded4bc] max-w-sm mx-auto sm:-rotate-2 hover:rotate-0 transition-transform duration-300">
                    
                    {/* Frosted Scotch Tape on Top */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-white/45 backdrop-blur-xs border border-white/60 shadow-xs rotate-[3deg] z-10" />

                    <div className="relative h-36 sm:h-40 w-full rounded overflow-hidden bg-[#e0d6bd]">
                      <Image
                        src="/images/sketch-student-studying.jpg"
                        alt="Student working on first-principles derivations"
                        fill
                        className="object-cover sepia-[0.25]"
                      />
                    </div>
                    
                    <div className="pt-2 text-center">
                      <span className="font-serif italic text-xs text-[#5c4d3e] font-semibold">
                        Dedication to First-Principles Problem Solving
                      </span>
                    </div>
                  </div>

                </div>

                {/* Bottom Field Note Card with Brass Paper Clip Effect */}
                <div className="relative p-5 bg-[#f5ecda] rounded-2xl border border-[#d6c7a7] shadow-sm space-y-2">
                  {/* Brass Paperclip */}
                  <div className="paper-clip !-top-3 !right-8" />
                  
                  <h3 className="font-serif font-bold text-sm text-[#1c1815]">Field Note: Why 4-Subject Balance Matters</h3>
                  <p className="text-xs text-[#544637] leading-relaxed">
                    In IISER IAT, all 4 subjects (Physics, Chemistry, Math, Biology) carry equal weightage (60 marks each). We empower PCM students to score in Biology and PCB students to conquer Mathematics.
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              CHAPTER II: THE 5 RESEARCH GATEWAYS (INTERACTIVE DOSSIERS)
             ═══════════════════════════════════════════════════════════════════ */}
          {activeChapter === 2 && (
            <div className="p-6 sm:p-10 lg:p-14 relative z-10 space-y-8">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e0d6bd] pb-4">
                <div>
                  <span className="font-serif italic text-sm text-[#8c672b]">Chapter II.</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1c1815] uppercase tracking-wider">
                    TARGET RESEARCH DOSSIERS
                  </h2>
                </div>

                {/* Gateway Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {GATEWAYS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGatewayId(g.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
                        selectedGatewayId === g.id
                          ? "bg-[#1c1815] text-[#faf5e8] shadow"
                          : "bg-[#efe6d1] text-[#4a3f35] hover:bg-[#e4dac1]"
                      }`}
                    >
                      {g.shortName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Gateway Dossier Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Specs */}
                <div className="lg:col-span-6 space-y-5 bg-[#f4ebda] p-6 rounded-2xl border border-[#d6c7a7]">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-[#9e2a2b] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                      {activeGateway.code}
                    </span>
                    <span className="text-xs font-serif text-[#695a4c] font-bold">
                      {activeGateway.degree}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1c1815]">
                      {activeGateway.name}
                    </h3>
                    <p className="text-xs text-[#544637] mt-1 leading-relaxed">
                      {activeGateway.tagline}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-[#ded3b9]">
                      <span className="text-[10px] uppercase font-mono text-neutral-500 block">Duration</span>
                      <strong className="text-[#1c1815]">{activeGateway.duration}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#ded3b9]">
                      <span className="text-[10px] uppercase font-mono text-neutral-500 block">Total Marks</span>
                      <strong className="text-[#1c1815]">{activeGateway.marks}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#ded3b9] col-span-2 sm:col-span-1">
                      <span className="text-[10px] uppercase font-mono text-neutral-500 block">Questions</span>
                      <strong className="text-[#1c1815]">{activeGateway.questions.split(' ')[0]}</strong>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#eadeca] border border-[#cfbe9e] text-xs text-[#3d332a]">
                    <strong className="font-bold block text-[#1c1815] mb-0.5">💰 Fellowship &amp; Stipend:</strong>
                    <span>{activeGateway.stipend}</span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Link
                      href={activeGateway.pyqUrl}
                      className="px-4 py-2 rounded-xl bg-[#9e2a2b] hover:bg-[#852324] text-white font-serif font-bold text-xs shadow transition text-center flex items-center gap-1.5"
                    >
                      <span>Solve Official Free PYQs</span>
                      <ChevronRight size={14} />
                    </Link>
                    <a
                      href={activeGateway.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-[#d6c7a7] text-[#1c1815] font-serif font-bold text-xs transition inline-flex items-center gap-1"
                    >
                      <span>Official Site</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* Right Participating Campuses */}
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#1c1815]">
                    Admitting Premier Campuses ({activeGateway.institutes.length})
                  </h3>
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-2">
                    {activeGateway.institutes.map((inst, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white border border-[#ded3b9] shadow-xs text-xs space-y-1">
                        <div className="flex items-center justify-between font-serif font-bold text-[#1c1815]">
                          <span className="text-sm">{inst.name}</span>
                          <span className="text-[11px] font-mono text-[#8c672b] font-normal">{inst.location}</span>
                        </div>
                        <p className="text-[11px] text-[#544637] leading-relaxed">{inst.highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              CHAPTER III: THE 4 SCIENTIFIC DISCIPLINES (LABORATORY SKETCHES)
             ═══════════════════════════════════════════════════════════════════ */}
          {activeChapter === 3 && (
            <div className="p-6 sm:p-10 lg:p-14 relative z-10 space-y-8">
              <div>
                <span className="font-serif italic text-sm text-[#8c672b]">Chapter III.</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1c1815] uppercase tracking-wider">
                  THE FOUR LABORATORY DISCIPLINES
                </h2>
                <p className="text-xs sm:text-sm text-[#544637] mt-1">
                  Bridging pure sciences into a unified, deductive problem-solving architecture.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Physics */}
                <div className="p-5 rounded-2xl bg-[#f4ebda] border border-[#d6c7a7] space-y-3 shadow-xs">
                  <div className="h-28 rounded-xl bg-white border border-[#ded3b9] flex items-center justify-center p-2">
                    <RayOpticsSketch className="w-16 h-16 text-[#8c672b]" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#1c1815]">I. Physical Principles</h3>
                  <p className="text-xs text-[#544637] leading-relaxed">
                    Mechanics of rigid bodies, wave optics, electromagnetic induction, kinetic theory, and quantum modern physics.
                  </p>
                </div>

                {/* Chemistry */}
                <div className="p-5 rounded-2xl bg-[#f4ebda] border border-[#d6c7a7] space-y-3 shadow-xs">
                  <div className="h-28 rounded-xl bg-white border border-[#ded3b9] flex items-center justify-center p-2">
                    <BenzeneOrbitalSketch className="w-16 h-16 text-[#9e2a2b]" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#1c1815]">II. Molecular Chemistry</h3>
                  <p className="text-xs text-[#544637] leading-relaxed">
                    Organic reaction mechanisms, coordination complexes, chemical thermodynamics, molecular orbitals, and kinetics.
                  </p>
                </div>

                {/* Mathematics */}
                <div className="p-5 rounded-2xl bg-[#f4ebda] border border-[#d6c7a7] space-y-3 shadow-xs">
                  <div className="h-28 rounded-xl bg-white border border-[#ded3b9] flex items-center justify-center p-2">
                    <CalculusIntegralSketch className="w-16 h-16 text-[#2b4c7e]" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#1c1815]">III. Mathematical Rigor</h3>
                  <p className="text-xs text-[#544637] leading-relaxed">
                    Riemann integration, discrete combinatorics, matrix algebra, probability, and Olympiad-grade subjective proofs.
                  </p>
                </div>

                {/* Biology */}
                <div className="p-5 rounded-2xl bg-[#f4ebda] border border-[#d6c7a7] space-y-3 shadow-xs">
                  <div className="h-28 rounded-xl bg-white border border-[#ded3b9] flex items-center justify-center p-2">
                    <DNAHelixSketch className="w-16 h-16 text-[#2d6a4f]" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#1c1815]">IV. Biological Systems</h3>
                  <p className="text-xs text-[#544637] leading-relaxed">
                    Recombinant genetics, cellular physiology, biomolecules, evolutionary ecology, and metabolic pathways.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              CHAPTER IV: PINNED POSTCARDS & FIELD INQUIRIES
             ═══════════════════════════════════════════════════════════════════ */}
          {activeChapter === 4 && (
            <div className="p-6 sm:p-10 lg:p-14 relative z-10 space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="font-serif italic text-sm text-[#8c672b]">Chapter IV.</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1c1815] uppercase tracking-wider">
                  COMMON INQUIRIES
                </h2>
                <p className="font-serif italic text-xs text-[#695a4c]">
                  Tap a postcard to reveal verified academic guidance
                </p>
              </div>

              {/* Taped Postcards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto pt-4">
                {POSTCARD_FAQS.map((faq, idx) => {
                  const isExpanded = expandedPostcard === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setExpandedPostcard(isExpanded ? null : idx)}
                      className="relative p-6 bg-white rounded-xl shadow-md border-l-4 border-l-[#9e2a2b] border border-[#ded4bc] cursor-pointer hover:shadow-lg transition-all duration-200 space-y-3 group"
                    >
                      {/* Frosted Tape */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs rotate-[-1deg]" />

                      <div className="flex items-center justify-between">
                        <span className="font-serif italic text-lg font-bold text-[#9e2a2b]">
                          {faq.num}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8c672b] group-hover:underline">
                          {isExpanded ? "Hide Answer" : "Tap to Answer →"}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-sm text-[#1c1815] leading-snug">
                        {faq.q}
                      </h3>

                      {isExpanded && (
                        <div className="pt-3 border-t border-[#eadeca] text-xs text-[#544637] leading-relaxed font-light">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              CHAPTER V: MENTORSHIP DISPATCH & HELPDESK
             ═══════════════════════════════════════════════════════════════════ */}
          {activeChapter === 5 && (
            <div className="p-6 sm:p-10 lg:p-14 relative z-10 space-y-8">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <span className="font-serif italic text-sm text-[#8c672b]">Chapter V.</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1c1815] uppercase tracking-wider">
                  MENTORSHIP DISPATCH
                </h2>
                <p className="text-xs text-[#695a4c] font-serif italic">
                  Direct academic correspondence with our pure science counselors
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto pt-2 text-xs">
                
                <a
                  href="tel:+917004283531"
                  className="p-6 rounded-2xl bg-white border border-[#ded4bc] hover:border-[#9e2a2b] shadow-sm transition flex flex-col items-center text-center space-y-2 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#f4ebda] text-[#9e2a2b] flex items-center justify-center font-bold">
                    <Phone size={20} />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[#1c1815]">Phone Helpline</h3>
                  <p className="font-mono font-bold text-[#9e2a2b]">+91 7004283531</p>
                  <span className="text-[10px] text-neutral-400">Direct Student Enquiries</span>
                </a>

                <a
                  href="mailto:support@vigyanprep.com"
                  className="p-6 rounded-2xl bg-white border border-[#ded4bc] hover:border-[#9e2a2b] shadow-sm transition flex flex-col items-center text-center space-y-2 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#f4ebda] text-[#9e2a2b] flex items-center justify-center font-bold">
                    <Mail size={20} />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[#1c1815]">Email Helpdesk</h3>
                  <p className="font-mono font-bold text-[#9e2a2b]">support@vigyanprep.com</p>
                  <span className="text-[10px] text-neutral-400">2-4 Hours Response Time</span>
                </a>

                <a
                  href="https://wa.me/917004283531"
                  target="_blank"
                  rel="noreferrer"
                  className="p-6 rounded-2xl bg-white border border-[#ded4bc] hover:border-[#2d6a4f] shadow-sm transition flex flex-col items-center text-center space-y-2 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#e8f4ed] text-[#2d6a4f] flex items-center justify-center font-bold">
                    <MessageSquare size={20} />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[#1c1815]">WhatsApp Chat</h3>
                  <p className="font-mono font-bold text-[#2d6a4f]">+91 7004283531</p>
                  <span className="text-[10px] text-neutral-400">Instant Doubt Clearing</span>
                </a>

                <div className="p-6 rounded-2xl bg-white border border-[#ded4bc] shadow-sm flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-[#f4ebda] text-[#1c1815] flex items-center justify-center font-bold">
                    <Building2 size={20} />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[#1c1815]">Academic Center</h3>
                  <p className="text-neutral-600 text-xs">VigyanPrep Pure Science</p>
                  <span className="text-[10px] text-neutral-400">New Delhi • India</span>
                </div>

              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              JOURNAL FOOTER: PROGRESSIVE CHAPTER TURNING BAR
             ═══════════════════════════════════════════════════════════════════ */}
          <div className="p-5 sm:p-6 bg-[#efe5cf] border-t border-[#ded3b9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif z-20">
            <span className="text-[#695a4c] italic">
              The VigyanPrep Research Ledger • Vol. 2025–2026
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={activeChapter === 1}
                onClick={() => setActiveChapter(Math.max(1, activeChapter - 1))}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-[#d6c7a7] text-[#1c1815] font-bold disabled:opacity-40 cursor-pointer hover:bg-neutral-50 transition"
              >
                ← Previous Page
              </button>
              <button
                disabled={activeChapter === 5}
                onClick={() => setActiveChapter(Math.min(5, activeChapter + 1))}
                className="px-3.5 py-1.5 rounded-lg bg-[#9e2a2b] text-white font-bold disabled:opacity-40 cursor-pointer hover:bg-[#852324] transition"
              >
                Next Chapter →
              </button>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
