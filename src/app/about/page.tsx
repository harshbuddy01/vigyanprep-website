"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ExternalLink,
  Phone,
  Mail,
  MessageSquare,
  Building2,
  ChevronRight,
  ChevronLeft
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
    markingScheme: "Single Correct: +2.5 / -1 • Multiple Correct: Partial credit with NO negative marks",
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
    num: "Q.",
    q: "Why is VigyanPrep different from commercial JEE/NEET coachings?",
    a: "Mainstream coachings focus entirely on 30-second formula shortcuts and engineering/medical speed tests. Entrance exams for IISER, NISER, ISI, and CMI demand deep deductive proofs, physical intuition from first principles, and 4-subject balance. VigyanPrep is built ground-up exclusively for this research curriculum."
  },
  {
    num: "Q.",
    q: "Are the Previous Year Papers (PYQs) completely free to attempt?",
    a: "Yes. All official past year papers for IISER IAT and NISER NEST are 100% free to attempt in our authentic Computer-Based Testing (CBT) interface with real countdown timers, question palettes, and step-by-step verified explanations."
  },
  {
    num: "Q.",
    q: "Can a PCM student crack IISER IAT without a Biology background?",
    a: "Yes! In IAT, questions are asked across all 4 subjects (15 each). PCM students can maximize marks in Physics, Chemistry, and Math while picking up high-scoring foundational topics in Biology using our structured revision modules."
  },
  {
    num: "Q.",
    q: "What scholarships & stipends do admitted research students receive?",
    a: "Eligible students at IISERs, NISER, and IISc receive DST INSPIRE-SHE or DAE DISHA fellowships of ₹60,000/year plus ₹20,000/year summer research project grants (total ₹80,000/yr). ISI and CMI provide 100% tuition waivers and monthly living stipends."
  }
];

const CHAPTERS = [
  { id: 1, title: "The Genesis", subtitle: "Our Founding Story", icon: "📖" },
  { id: 2, title: "Target Gateways", subtitle: "5 Research Entrances", icon: "🏛️" },
  { id: 3, title: "Common Inquiries", subtitle: "Taped Postcards", icon: "📮" },
  { id: 4, title: "The Help Desk", subtitle: "Direct Mentorship", icon: "✉️" }
];

export default function AboutPage() {
  const [currentSpread, setCurrentSpread] = useState<number>(1);
  const [selectedGatewayId, setSelectedGatewayId] = useState<string>("iat");
  const [expandedPostcard, setExpandedPostcard] = useState<number | null>(null);

  const activeGateway = GATEWAYS.find((g) => g.id === selectedGatewayId) || GATEWAYS[0];

  // Keyboard navigation for turning book pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentSpread((prev) => Math.min(4, prev + 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentSpread((prev) => Math.max(1, prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#14110e] text-[#2c241d] font-serif selection:bg-[#c99742] selection:text-black relative overflow-x-hidden">
      <Navbar />

      {/* Atmospheric Wooden Desk Backdrop with Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-60 bg-[radial-gradient(ellipse_at_top,#2b2016_0%,#0c0a08_100%)] z-0" />
      <div className="fixed top-8 left-1/2 -translate-x-1/2 w-[960px] h-[550px] bg-amber-500/10 rounded-full blur-[170px] pointer-events-none z-0" />

      {/* Main Interactive Stage */}
      <main className="relative z-10 pt-28 sm:pt-34 pb-20 px-3 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        
        {/* Top Header Bar with Live Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#9e2a2b] text-[#faf5e8] font-serif font-black flex items-center justify-center text-sm shadow-md">
              वि
            </div>
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-bold text-[#faf5e8] tracking-wide">
                The VigyanPrep Codex
              </h1>
              <p className="text-[11px] text-[#b8a690] font-sans">
                Interactive Pure Science Research Ledger • 2025–2026 Edition
              </p>
            </div>
          </div>

          {/* Quick Page Navigator Tabs */}
          <div className="flex items-center gap-1.5 bg-[#231d17] p-1.5 rounded-2xl border border-[#3d332a] shadow-inner">
            {CHAPTERS.map((ch) => {
              const isCurrent = currentSpread === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => setCurrentSpread(ch.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCurrent
                      ? "bg-[#faf5e8] text-[#1c1815] shadow-md font-black"
                      : "text-[#b8a690] hover:text-[#faf5e8] hover:bg-[#2d251e]"
                  }`}
                >
                  <span>{ch.icon}</span>
                  <span className="hidden md:inline">{ch.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            THE OPEN BOOK CONTAINER (WITH FLOATING TURNING ARROWS)
           ═══════════════════════════════════════════════════════════════════════ */}
        <div className="relative">
          
          {/* Floating Left Page-Turn Arrow */}
          <button
            disabled={currentSpread === 1}
            onClick={() => setCurrentSpread((prev) => Math.max(1, prev - 1))}
            className="hidden sm:flex absolute -left-5 sm:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#faf5e8] border border-[#d6cbaf] text-[#1c1815] shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 disabled:opacity-0 disabled:pointer-events-none cursor-pointer group"
            title="Previous Page (←)"
          >
            <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Floating Right Page-Turn Arrow */}
          <button
            disabled={currentSpread === 4}
            onClick={() => setCurrentSpread((prev) => Math.min(4, prev + 1))}
            className="hidden sm:flex absolute -right-5 sm:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#9e2a2b] border border-[#7d1f20] text-white shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 disabled:opacity-0 disabled:pointer-events-none cursor-pointer group"
            title="Next Page (→)"
          >
            <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Book Open Double-Page Window */}
          <div className="relative bg-[#faf5e8] border border-[#d6cbaf] rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_0_12px_#231d17] overflow-hidden min-h-[680px] flex flex-col justify-between">
            
            {/* Subtle 24px Graph Grid Ruling Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Central Book Spine Shadow & Fold Gradient */}
            <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-16 pointer-events-none bg-gradient-to-r from-black/10 via-black/25 to-black/10 z-20" />

            {/* ═════════════════════════════════════════════════════════════════
                SPREAD 1: THE GENESIS CHRONICLES (CHAPTER I)
               ═════════════════════════════════════════════════════════════════ */}
            {currentSpread === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 p-6 sm:p-10 lg:p-14 gap-8 lg:gap-14 animate-fadeIn">
                
                {/* LEFT PAGE: THE CHRONICLES ESSAY */}
                <div className="lg:col-span-6 space-y-6 lg:pr-6 border-b lg:border-b-0 lg:border-r border-[#e0d6bd] pb-8 lg:pb-0 relative">
                  
                  {/* Red Ledger Margin Line on Left */}
                  <div className="hidden sm:block absolute top-0 bottom-0 left-[-16px] w-[1.5px] bg-[#d97768]/40" />

                  <div>
                    <span className="font-serif italic text-base text-[#8c672b] tracking-wider block mb-1">
                      Chapter I.
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1c1815] uppercase tracking-wider leading-[1.08]">
                      THE VIGYAN <br className="hidden sm:inline" />CHRONICLES
                    </h2>
                  </div>

                  {/* Drop Cap Essay */}
                  <div className="text-sm sm:text-base text-[#382f27] font-serif leading-relaxed space-y-4">
                    <p className="first-letter:float-left first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-serif first-letter:font-black first-letter:text-[#9e2a2b] first-letter:mr-3 first-letter:leading-[0.85] first-letter:pt-1">
                      Born from a profound reverence for empirical science and mathematical deduction, <strong>VigyanPrep</strong> was established not merely as a test platform, but as an artisanal sanctuary for India&apos;s research scholars. We believe that true scientific learning is an art form—one that bridges the curiosity of the student with the deep, immutable laws of nature.
                    </p>
                    
                    {/* Parchment Quote Box */}
                    <blockquote className="p-4 rounded-xl bg-[#f0e8d5] border-l-4 border-[#9e2a2b] text-xs sm:text-sm italic text-[#4a3f35] shadow-xs">
                      &ldquo;Our journey began with a clear mission: mapping the rigorous terrain of IISER, NISER, ISI, and CMI. Driven by an intense passion for foundational science over rote formula drills.&rdquo;
                    </blockquote>

                    <p className="text-xs sm:text-sm text-[#4a3f35] font-light leading-relaxed">
                      We do not cultivate formula-memorizers; we cultivate <strong>Scientific Artisans</strong>. Students whose intuition is grounded in first principles, capable of proving theorems, predicting chemical thermodynamics, and unlocking fellowships at premier research institutions.
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
                    <span>★ OFFICIAL PURE SCIENCE SANCTUARY • APPROVED CBT ★</span>
                  </div>
                </div>

                {/* RIGHT PAGE: REAL TAPED POLAROIDS & FIELD NOTES */}
                <div className="lg:col-span-6 space-y-6 lg:pl-6 relative flex flex-col justify-between">
                  
                  <div className="space-y-6">
                    
                    {/* Pinned Polaroid 1: Research Campus */}
                    <div className="relative p-3.5 bg-white rounded-lg shadow-xl border border-[#ded4bc] max-w-sm mx-auto sm:rotate-2 hover:rotate-0 transition-transform duration-300">
                      {/* Frosted Scotch Tape on Top */}
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-white/45 backdrop-blur-xs border border-white/60 shadow-xs rotate-[-2deg] z-10" />

                      <div className="relative h-44 sm:h-52 w-full rounded overflow-hidden bg-[#e0d6bd]">
                        <Image
                          src="/images/sketch-university-campus.jpg"
                          alt="University research campus sketch"
                          fill
                          className="object-cover sepia-[0.25]"
                          priority
                        />
                      </div>
                      
                      <div className="pt-2 text-center">
                        <span className="font-serif italic text-xs text-[#5c4d3e] font-semibold">
                          The 7 IISER Campuses, NISER &amp; IISc Bangalore
                        </span>
                      </div>
                    </div>

                    {/* Pinned Polaroid 2: First Principles Study */}
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
                          First-Principles Problem Solving
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Field Note Card with Paperclip */}
                  <div className="relative p-5 bg-[#f5ecda] rounded-2xl border border-[#d6c7a7] shadow-sm space-y-2">
                    <div className="paper-clip !-top-3 !right-8" />
                    <h3 className="font-serif font-bold text-sm text-[#1c1815]">Curated Exclusively For Research Scholars</h3>
                    <p className="text-xs text-[#544637] leading-relaxed">
                      100% free official past year papers in authentic Computer-Based Testing (CBT) mode, accompanied by complete mathematical proofs and verified derivations.
                    </p>
                  </div>

                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                SPREAD 2: TARGET RESEARCH GATEWAYS (CHAPTER II)
               ═════════════════════════════════════════════════════════════════ */}
            {currentSpread === 2 && (
              <div className="p-6 sm:p-10 lg:p-14 relative z-10 space-y-8 animate-fadeIn">
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e0d6bd] pb-4">
                  <div>
                    <span className="font-serif italic text-sm text-[#8c672b]">Chapter II.</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1c1815] uppercase tracking-wider">
                      RESEARCH ADMISSION DOSSIERS
                    </h2>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {GATEWAYS.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGatewayId(g.id)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
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

                {/* Gateway Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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

            {/* ═════════════════════════════════════════════════════════════════
                SPREAD 3: COMMON INQUIRIES PINNED POSTCARDS (CHAPTER III)
               ═════════════════════════════════════════════════════════════════ */}
            {currentSpread === 3 && (
              <div className="p-6 sm:p-10 lg:p-14 relative z-10 space-y-8 animate-fadeIn">
                <div className="text-center max-w-xl mx-auto space-y-1">
                  <span className="font-serif italic text-base text-[#8c672b]">Chapter III.</span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1c1815] uppercase tracking-wider">
                    Common Inquiries
                  </h2>
                  <p className="font-serif italic text-base text-[#8c672b]">
                    Tap a postcard to reveal verified academic guidance
                  </p>
                </div>

                {/* Pinned Vintage Postcards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto pt-4">
                  {POSTCARD_FAQS.map((faq, idx) => {
                    const isExpanded = expandedPostcard === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setExpandedPostcard(isExpanded ? null : idx)}
                        className="relative p-6 bg-white rounded-xl shadow-md border-l-4 border-l-[#9e2a2b] border border-[#ded4bc] cursor-pointer hover:shadow-xl transition-all duration-200 space-y-3 group"
                      >
                        {/* Translucent Masking Tape at Top */}
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-white/45 backdrop-blur-xs border border-white/60 shadow-xs rotate-[-1deg]" />

                        <div className="flex items-center justify-between">
                          <span className="font-serif italic text-2xl font-bold text-[#9e2a2b]">
                            {faq.num}
                          </span>
                          <span className="text-[11px] font-serif font-bold tracking-widest text-[#8c672b] uppercase group-hover:underline">
                            {isExpanded ? "Hide Answer" : "Tap to Answer"}
                          </span>
                        </div>

                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#1c1815] leading-snug">
                          {faq.q}
                        </h3>

                        {isExpanded && (
                          <div className="pt-3 border-t border-[#eadeca] text-xs sm:text-sm text-[#544637] leading-relaxed font-normal">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                SPREAD 4: THE HELP DESK DIRECTORY (CHAPTER IV)
               ═════════════════════════════════════════════════════════════════ */}
            {currentSpread === 4 && (
              <div className="p-6 sm:p-10 lg:p-14 relative z-10 flex flex-col justify-center items-center text-center space-y-8 animate-fadeIn min-h-[580px]">
                
                {/* Paper Clip */}
                <div className="paper-clip !-top-3 !right-1/2 !translate-x-1/2" />

                <div className="space-y-2 max-w-lg">
                  <span className="font-serif italic text-base text-[#8c672b]">Chapter IV.</span>
                  <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#1c1815] tracking-tight">
                    The Help <span className="font-serif italic font-normal text-[#8c672b]">Desk</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#695a4c] font-serif leading-relaxed">
                    For pure science curriculum guidance, test series assistance, or general admission queries.
                  </p>
                </div>

                {/* Lined Directory List */}
                <div className="w-full max-w-xl space-y-3 text-left font-serif text-sm border-t border-b border-[#e0d6bd] py-6">
                  
                  <a
                    href="tel:+917004283531"
                    className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[#f2e8d4] text-[#1c1815] transition group border border-transparent hover:border-[#d6cbaf]"
                  >
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-[#9e2a2b]" />
                      <span className="font-bold">Phone Helpline (+91 7004283531)</span>
                    </div>
                    <span className="text-[#8c672b] group-hover:translate-x-1 transition-transform">→</span>
                  </a>

                  <a
                    href="https://wa.me/917004283531"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[#f2e8d4] text-[#9e2a2b] font-bold transition group border border-transparent hover:border-[#d6cbaf]"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare size={16} className="text-[#2d6a4f]" />
                      <span>WhatsApp Mentorship Assistance</span>
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>

                  <a
                    href="mailto:support@vigyanprep.com"
                    className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[#f2e8d4] text-[#1c1815] transition group border border-transparent hover:border-[#d6cbaf]"
                  >
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-[#8c672b]" />
                      <span className="font-bold">Email Helpdesk (support@vigyanprep.com)</span>
                    </div>
                    <span className="text-[#8c672b] group-hover:translate-x-1 transition-transform">→</span>
                  </a>

                  <div className="flex items-center justify-between p-3.5 rounded-xl text-[#695a4c]">
                    <div className="flex items-center gap-3">
                      <Building2 size={16} className="text-neutral-500" />
                      <span>Academic Center (New Delhi, India)</span>
                    </div>
                    <span className="text-xs font-mono font-bold">Pure Science Division</span>
                  </div>

                </div>

                <div className="text-xs text-[#8c672b] font-serif italic">
                  Our academic counselors are available 7 days a week (9:00 AM – 9:00 PM IST)
                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                BOOK FOOTER: PAGE FLIPPER & ARROW PROGRESS CONTROLS
               ═════════════════════════════════════════════════════════════════ */}
            <div className="p-5 sm:p-6 bg-[#efe5cf] border-t border-[#ded3b9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif z-20">
              
              <div className="flex items-center gap-2">
                <span className="text-[#8c672b] font-bold">
                  Page {currentSpread} of 4
                </span>
                <span className="text-[#695a4c]">•</span>
                <span className="text-[#695a4c] italic">
                  {CHAPTERS[currentSpread - 1]?.title}
                </span>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {CHAPTERS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setCurrentSpread(ch.id)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      currentSpread === ch.id
                        ? "bg-[#9e2a2b] w-6"
                        : "bg-[#d6cbaf] hover:bg-[#b8a690]"
                    }`}
                    title={`Jump to ${ch.title}`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  disabled={currentSpread === 1}
                  onClick={() => setCurrentSpread((prev) => Math.max(1, prev - 1))}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-[#d6c7a7] text-[#1c1815] font-bold disabled:opacity-30 cursor-pointer hover:bg-neutral-50 transition flex items-center gap-1"
                >
                  <ChevronLeft size={14} />
                  <span>Previous Page</span>
                </button>
                <button
                  disabled={currentSpread === 4}
                  onClick={() => setCurrentSpread((prev) => Math.min(4, prev + 1))}
                  className="px-3.5 py-1.5 rounded-lg bg-[#9e2a2b] text-white font-bold disabled:opacity-30 cursor-pointer hover:bg-[#852324] transition flex items-center gap-1"
                >
                  <span>Next Page</span>
                  <ChevronRight size={14} />
                </button>
              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
