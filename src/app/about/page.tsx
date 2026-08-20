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
  ChevronLeft,
  ArrowRight
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

const FAQS_LIST = [
  {
    q: "Why is VigyanPrep different from commercial JEE & NEET coachings?",
    a: "Mainstream coachings focus almost entirely on 30-second formula shortcuts and engineering/medical speed tests. Entrance exams for IISER, NISER, ISI, and CMI demand deep deductive proofs, physical intuition from first principles, and 4-subject balance. VigyanPrep is built ground-up exclusively for this research curriculum."
  },
  {
    q: "Are the Previous Year Papers (PYQs) 100% free to attempt?",
    a: "Yes. All official past year papers for IISER IAT and NISER NEST are completely free to attempt in our authentic Computer-Based Testing (CBT) interface with real countdown timers, question palettes, and step-by-step verified explanations."
  },
  {
    q: "Can a PCM student crack IISER IAT without a Biology background?",
    a: "Yes! In IAT, questions are asked across all 4 subjects (15 each). PCM students can maximize marks in Physics, Chemistry, and Math while picking up high-scoring foundational topics in Biology using our structured revision modules."
  },
  {
    q: "What scholarships & stipends do admitted research students receive?",
    a: "Eligible students at IISERs, NISER, and IISc receive DST INSPIRE-SHE or DAE DISHA fellowships of ₹60,000/year plus ₹20,000/year summer research project grants (total ₹80,000/yr). ISI and CMI provide 100% tuition waivers and monthly living stipends."
  }
];

export default function AboutPage() {
  const [spread, setSpread] = useState<number>(1);
  const [selectedGatewayId, setSelectedGatewayId] = useState<string>("iat");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const activeGateway = GATEWAYS.find((g) => g.id === selectedGatewayId) || GATEWAYS[0];

  // Keyboard navigation for turning book pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setSpread((prev) => Math.min(4, prev + 1));
      } else if (e.key === "ArrowLeft") {
        setSpread((prev) => Math.max(1, prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#14110e] text-[#2c241d] font-serif selection:bg-[#c99742] selection:text-black relative overflow-x-hidden">
      <Navbar />

      {/* Atmospheric Wooden Desk Backdrop */}
      <div className="fixed inset-0 pointer-events-none opacity-60 bg-[radial-gradient(ellipse_at_top,#2b2016_0%,#0c0a08_100%)] z-0" />
      <div className="fixed top-8 left-1/2 -translate-x-1/2 w-[960px] h-[550px] bg-amber-500/10 rounded-full blur-[170px] pointer-events-none z-0" />

      {/* Main Interactive Stage */}
      <main className="relative z-10 pt-28 sm:pt-34 pb-20 px-3 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        
        {/* ═══════════════════════════════════════════════════════════════════════
            THE AUTHENTIC OPEN BOOK CONTAINER (WITH REALISTIC SOFT CREASE)
           ═══════════════════════════════════════════════════════════════════════ */}
        <div className="relative">
          
          {/* Floating Left Page-Turn Arrow */}
          <button
            disabled={spread === 1}
            onClick={() => setSpread((prev) => Math.max(1, prev - 1))}
            className="hidden sm:flex absolute -left-5 sm:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#faf5e8] border border-[#d6cbaf] text-[#1c1815] shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 disabled:opacity-0 disabled:pointer-events-none cursor-pointer group"
            title="Previous Page (←)"
          >
            <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Floating Right Page-Turn Arrow */}
          <button
            disabled={spread === 4}
            onClick={() => setSpread((prev) => Math.min(4, prev + 1))}
            className="hidden sm:flex absolute -right-5 sm:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#9e2a2b] border border-[#7d1f20] text-white shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 disabled:opacity-0 disabled:pointer-events-none cursor-pointer group"
            title="Next Page (→)"
          >
            <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Realistic Hardbound Open Book Spread */}
          <div className="relative bg-[#faf5e8] border border-[#d6cbaf] rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_0_12px_#231d17] overflow-hidden min-h-[690px] flex flex-col justify-between">
            
            {/* Subtle 24px Graph Grid Ruling Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* REALISTIC SOFT PAPER CREASE IN THE CENTER (NO HARSH BLACK GRAPHICS) */}
            <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 pointer-events-none bg-gradient-to-r from-transparent via-[#4a3b2c]/8 to-transparent border-r border-[#d9cdb0]/60 z-20" />

            {/* ═════════════════════════════════════════════════════════════════
                SPREAD 1: THE GENESIS CHRONICLES (PAGES 01 & 02)
               ═════════════════════════════════════════════════════════════════ */}
            {spread === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 p-6 sm:p-10 lg:p-14 gap-8 lg:gap-14 animate-fadeIn">
                
                {/* LEFT PAGE: PAGE 01 (THE CHRONICLES ESSAY) */}
                <div className="lg:col-span-6 space-y-6 lg:pr-6 border-b lg:border-b-0 lg:border-r border-[#e0d6bd] pb-8 lg:pb-0 relative flex flex-col justify-between">
                  
                  <div className="space-y-5">
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
                        Born from a profound reverence for pure empirical science and mathematical deduction, <strong>VigyanPrep</strong> was established not merely as a test platform, but as an artisanal sanctuary for India&apos;s research scholars. We believe that true scientific learning is an art form—one that bridges the curiosity of the student with the deep, immutable laws of nature.
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

                  {/* Page 01 Number at Bottom */}
                  <div className="text-center pt-6 border-t border-[#e8dfc9] text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 01 —
                  </div>
                </div>

                {/* RIGHT PAGE: PAGE 02 (REAL TAPED POLAROIDS & FIELD NOTES) */}
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

                    {/* Bottom Field Note Card with Paperclip */}
                    <div className="relative p-5 bg-[#f5ecda] rounded-2xl border border-[#d6c7a7] shadow-sm space-y-2">
                      <div className="paper-clip !-top-3 !right-8" />
                      <h3 className="font-serif font-bold text-sm text-[#1c1815]">Curated Exclusively For Research Scholars</h3>
                      <p className="text-xs text-[#544637] leading-relaxed">
                        100% free official past year papers in authentic Computer-Based Testing (CBT) mode, accompanied by complete mathematical proofs and verified derivations.
                      </p>
                    </div>

                  </div>

                  {/* Page 02 Number at Bottom */}
                  <div className="text-center pt-6 border-t border-[#e8dfc9] text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 02 —
                  </div>

                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                SPREAD 2: TARGET RESEARCH GATEWAYS (PAGES 03 & 04)
               ═════════════════════════════════════════════════════════════════ */}
            {spread === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 p-6 sm:p-10 lg:p-14 gap-8 lg:gap-14 animate-fadeIn">
                
                {/* LEFT PAGE: PAGE 03 (DOSSIER BLUEPRINT) */}
                <div className="lg:col-span-6 space-y-5 lg:pr-6 border-b lg:border-b-0 lg:border-r border-[#e0d6bd] pb-8 lg:pb-0 relative flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="font-serif italic text-base text-[#8c672b] tracking-wider block mb-1">
                        Chapter II.
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1c1815] uppercase tracking-wider">
                        RESEARCH DOSSIERS
                      </h2>
                    </div>

                    {/* Gateway Tabs */}
                    <div className="flex items-center gap-1.5 flex-wrap pb-1">
                      {GATEWAYS.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setSelectedGatewayId(g.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
                            selectedGatewayId === g.id
                              ? "bg-[#1c1815] text-[#faf5e8] shadow"
                              : "bg-[#efe6d1] text-[#4a3f35] hover:bg-[#e4dac1]"
                          }`}
                        >
                          {g.shortName}
                        </button>
                      ))}
                    </div>

                    {/* Active Gateway Box */}
                    <div className="space-y-4 bg-[#f4ebda] p-5 rounded-2xl border border-[#d6c7a7]">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded bg-[#9e2a2b] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                          {activeGateway.code}
                        </span>
                        <span className="text-xs font-serif text-[#695a4c] font-bold">
                          {activeGateway.degree}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#1c1815]">
                          {activeGateway.name}
                        </h3>
                        <p className="text-xs text-[#544637] mt-1 leading-relaxed">
                          {activeGateway.tagline}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 rounded-xl bg-white border border-[#ded3b9]">
                          <span className="text-[10px] uppercase font-mono text-neutral-500 block">Duration</span>
                          <strong className="text-[#1c1815] text-[11px]">{activeGateway.duration}</strong>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-[#ded3b9]">
                          <span className="text-[10px] uppercase font-mono text-neutral-500 block">Marks</span>
                          <strong className="text-[#1c1815] text-[11px]">{activeGateway.marks}</strong>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-[#ded3b9]">
                          <span className="text-[10px] uppercase font-mono text-neutral-500 block">Questions</span>
                          <strong className="text-[#1c1815] text-[11px]">{activeGateway.questions.split(' ')[0]}</strong>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#eadeca] border border-[#cfbe9e] text-xs text-[#3d332a]">
                        <strong className="font-bold block text-[#1c1815] mb-0.5">💰 Fellowship Grant:</strong>
                        <span>{activeGateway.stipend}</span>
                      </div>

                      <div className="flex items-center gap-3 pt-1">
                        <Link
                          href={activeGateway.pyqUrl}
                          className="px-4 py-2 rounded-xl bg-[#9e2a2b] hover:bg-[#852324] text-white font-serif font-bold text-xs shadow transition flex items-center gap-1"
                        >
                          <span>Solve Official Free PYQs</span>
                          <ChevronRight size={14} />
                        </Link>
                        <a
                          href={activeGateway.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-[#d6c7a7] text-[#1c1815] font-serif font-bold text-xs transition inline-flex items-center gap-1"
                        >
                          <span>Official Portal</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Page 03 Number at Bottom */}
                  <div className="text-center pt-6 border-t border-[#e8dfc9] text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 03 —
                  </div>
                </div>

                {/* RIGHT PAGE: PAGE 04 (ADMITTING CAMPUSES) */}
                <div className="lg:col-span-6 space-y-4 lg:pl-6 relative flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl font-bold text-[#1c1815]">
                      Admitting Campuses ({activeGateway.institutes.length})
                    </h3>
                    <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                      {activeGateway.institutes.map((inst, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white border border-[#ded3b9] shadow-xs text-xs space-y-1">
                          <div className="flex items-center justify-between font-serif font-bold text-[#1c1815]">
                            <span className="text-sm">{inst.name}</span>
                            <span className="text-[10px] font-mono text-[#8c672b] font-normal">{inst.location}</span>
                          </div>
                          <p className="text-[11px] text-[#544637] leading-relaxed">{inst.highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Page 04 Number at Bottom */}
                  <div className="text-center pt-6 border-t border-[#e8dfc9] text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 04 —
                  </div>
                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                SPREAD 3: COMMON INQUIRIES PINNED POSTCARDS (PAGES 05 & 06)
               ═════════════════════════════════════════════════════════════════ */}
            {spread === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 p-6 sm:p-10 lg:p-14 gap-8 lg:gap-14 animate-fadeIn">
                
                {/* LEFT PAGE: PAGE 05 (POSTCARDS 1 & 2) */}
                <div className="lg:col-span-6 space-y-6 lg:pr-6 border-b lg:border-b-0 lg:border-r border-[#e0d6bd] pb-8 lg:pb-0 relative flex flex-col justify-between">
                  <div className="space-y-5">
                    <div>
                      <span className="font-serif italic text-base text-[#8c672b] tracking-wider block mb-1">
                        Chapter III.
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1c1815] uppercase tracking-wider">
                        COMMON INQUIRIES
                      </h2>
                      <p className="font-serif italic text-xs text-[#8c672b] mt-1">
                        Tap a postcard to reveal verified academic guidance
                      </p>
                    </div>

                    <div className="space-y-4">
                      {FAQS_LIST.slice(0, 2).map((faq, idx) => {
                        const isExpanded = activeFaq === idx;
                        return (
                          <div
                            key={idx}
                            onClick={() => setActiveFaq(isExpanded ? null : idx)}
                            className="relative p-5 bg-white rounded-xl shadow-md border-l-4 border-l-[#9e2a2b] border border-[#ded4bc] cursor-pointer hover:shadow-lg transition-all space-y-2 group"
                          >
                            <div className="absolute -top-3 left-8 w-20 h-6 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs rotate-[-1deg]" />
                            <div className="flex items-center justify-between">
                              <span className="font-serif italic text-xl font-bold text-[#9e2a2b]">
                                Q.0{idx + 1}
                              </span>
                              <span className="text-[10px] font-serif font-bold tracking-widest text-[#8c672b] uppercase group-hover:underline">
                                {isExpanded ? "Hide Answer" : "Tap to Answer"}
                              </span>
                            </div>
                            <h3 className="font-serif font-bold text-sm text-[#1c1815] leading-snug">
                              {faq.q}
                            </h3>
                            {isExpanded && (
                              <div className="pt-2 border-t border-[#eadeca] text-xs text-[#544637] leading-relaxed">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Page 05 Number at Bottom */}
                  <div className="text-center pt-6 border-t border-[#e8dfc9] text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 05 —
                  </div>
                </div>

                {/* RIGHT PAGE: PAGE 06 (POSTCARDS 3 & 4) */}
                <div className="lg:col-span-6 space-y-6 lg:pl-6 relative flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="space-y-4 pt-8">
                      {FAQS_LIST.slice(2, 4).map((faq, idx) => {
                        const actualIdx = idx + 2;
                        const isExpanded = activeFaq === actualIdx;
                        return (
                          <div
                            key={actualIdx}
                            onClick={() => setActiveFaq(isExpanded ? null : actualIdx)}
                            className="relative p-5 bg-white rounded-xl shadow-md border-l-4 border-l-[#9e2a2b] border border-[#ded4bc] cursor-pointer hover:shadow-lg transition-all space-y-2 group"
                          >
                            <div className="absolute -top-3 left-8 w-20 h-6 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs rotate-[1deg]" />
                            <div className="flex items-center justify-between">
                              <span className="font-serif italic text-xl font-bold text-[#9e2a2b]">
                                Q.0{actualIdx + 1}
                              </span>
                              <span className="text-[10px] font-serif font-bold tracking-widest text-[#8c672b] uppercase group-hover:underline">
                                {isExpanded ? "Hide Answer" : "Tap to Answer"}
                              </span>
                            </div>
                            <h3 className="font-serif font-bold text-sm text-[#1c1815] leading-snug">
                              {faq.q}
                            </h3>
                            {isExpanded && (
                              <div className="pt-2 border-t border-[#eadeca] text-xs text-[#544637] leading-relaxed">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Page 06 Number at Bottom */}
                  <div className="text-center pt-6 border-t border-[#e8dfc9] text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 06 —
                  </div>
                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                SPREAD 4: THE HELP DESK & EXPEDITION (PAGES 07 & 08)
               ═════════════════════════════════════════════════════════════════ */}
            {spread === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 p-6 sm:p-10 lg:p-14 gap-8 lg:gap-14 animate-fadeIn">
                
                {/* LEFT PAGE: PAGE 07 (THE HELP DESK DIRECTORY) */}
                <div className="lg:col-span-6 space-y-5 lg:pr-6 border-b lg:border-b-0 lg:border-r border-[#e0d6bd] pb-8 lg:pb-0 relative flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="font-serif italic text-base text-[#8c672b] tracking-wider block mb-1">
                        Chapter IV.
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1c1815] tracking-tight">
                        The Help <span className="font-serif italic font-normal text-[#8c672b]">Desk</span>
                      </h2>
                      <p className="text-xs text-[#695a4c] font-serif mt-1">
                        For pure science curriculum guidance, test series assistance, or admission queries.
                      </p>
                    </div>

                    <div className="space-y-2.5 text-left font-serif text-xs border-t border-b border-[#e0d6bd] py-4">
                      <a
                        href="tel:+917004283531"
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f2e8d4] text-[#1c1815] transition group border border-transparent hover:border-[#d6cbaf]"
                      >
                        <div className="flex items-center gap-2.5">
                          <Phone size={15} className="text-[#9e2a2b]" />
                          <span className="font-bold">Phone Helpline (+91 7004283531)</span>
                        </div>
                        <span className="text-[#8c672b] group-hover:translate-x-1 transition-transform">→</span>
                      </a>

                      <a
                        href="https://wa.me/917004283531"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f2e8d4] text-[#9e2a2b] font-bold transition group border border-transparent hover:border-[#d6cbaf]"
                      >
                        <div className="flex items-center gap-2.5">
                          <MessageSquare size={15} className="text-[#2d6a4f]" />
                          <span>WhatsApp Mentorship Assistance</span>
                        </div>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </a>

                      <a
                        href="mailto:support@vigyanprep.com"
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f2e8d4] text-[#1c1815] transition group border border-transparent hover:border-[#d6cbaf]"
                      >
                        <div className="flex items-center gap-2.5">
                          <Mail size={15} className="text-[#8c672b]" />
                          <span className="font-bold">Email Helpdesk (support@vigyanprep.com)</span>
                        </div>
                        <span className="text-[#8c672b] group-hover:translate-x-1 transition-transform">→</span>
                      </a>

                      <div className="flex items-center justify-between p-3 rounded-xl text-[#695a4c]">
                        <div className="flex items-center gap-2.5">
                          <Building2 size={15} className="text-neutral-500" />
                          <span>Academic Center (New Delhi, India)</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold">Pure Science Hub</span>
                      </div>
                    </div>
                  </div>

                  {/* Page 07 Number at Bottom */}
                  <div className="text-center pt-6 border-t border-[#e8dfc9] text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 07 —
                  </div>
                </div>

                {/* RIGHT PAGE: PAGE 08 (COMMENCING EXPEDITION) */}
                <div className="lg:col-span-6 space-y-5 lg:pl-6 relative flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="font-serif italic text-base text-[#8c672b] tracking-wider block mb-1">
                        Epilogue
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1c1815] uppercase tracking-wider">
                        COMMENCING YOUR JOURNEY
                      </h3>
                      <p className="text-xs text-[#544637] leading-relaxed mt-1">
                        The pursuit of pure science is not a race of speed; it is a lifelong exploration of deep, fundamental truth.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <a
                        href="https://test.vigyanprep.com"
                        className="p-4 rounded-2xl bg-[#9e2a2b] hover:bg-[#852324] text-white shadow-md transition flex items-center justify-between group"
                      >
                        <div>
                          <strong className="text-sm font-bold block">Launch Official CBT Portal</strong>
                          <span className="text-[10px] text-amber-100">Live Mock Tests &amp; Response Sheets</span>
                        </div>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </a>

                      <Link
                        href="/pyq"
                        className="p-4 rounded-2xl bg-white hover:bg-neutral-50 border border-[#d6cbaf] text-[#1c1815] shadow-xs transition flex items-center justify-between group"
                      >
                        <div>
                          <strong className="text-sm font-bold block">100% Free Past Year Papers</strong>
                          <span className="text-[10px] text-neutral-500">Official IAT &amp; NEST Questions</span>
                        </div>
                        <ChevronRight size={18} className="text-[#8c672b] group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        href="/security"
                        className="p-3.5 rounded-2xl bg-[#f4ebda] border border-[#d6c7a7] text-[#544637] text-xs transition flex items-center justify-between"
                      >
                        <span>Platform Security &amp; Candidate Integrity Advisory</span>
                        <ChevronRight size={14} className="text-[#8c672b]" />
                      </Link>
                    </div>
                  </div>

                  {/* Page 08 Number at Bottom */}
                  <div className="text-center pt-6 border-t border-[#e8dfc9] text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 08 —
                  </div>
                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                BOOK FOOTER: PAGE FLIPPER CONTROLS & SPREAD COUNTER
               ═════════════════════════════════════════════════════════════════ */}
            <div className="p-5 sm:p-6 bg-[#efe5cf] border-t border-[#ded3b9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif z-20">
              
              <div className="flex items-center gap-2">
                <span className="text-[#8c672b] font-bold">
                  Pages {spread * 2 - 1} &amp; {spread * 2} of 8
                </span>
                <span className="text-[#695a4c]">•</span>
                <span className="text-[#695a4c] italic">
                  {spread === 1 && "Chapter I: The Genesis Chronicles"}
                  {spread === 2 && "Chapter II: Target Research Gateways"}
                  {spread === 3 && "Chapter III: Common Inquiries"}
                  {spread === 4 && "Chapter IV: The Help Desk & Epilogue"}
                </span>
              </div>

              {/* Spread Indicator Dots */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpread(s)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      spread === s
                        ? "bg-[#9e2a2b] w-6"
                        : "bg-[#d6cbaf] hover:bg-[#b8a690]"
                    }`}
                    title={`Go to Pages ${s * 2 - 1} & ${s * 2}`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  disabled={spread === 1}
                  onClick={() => setSpread((prev) => Math.max(1, prev - 1))}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-[#d6c7a7] text-[#1c1815] font-bold disabled:opacity-30 cursor-pointer hover:bg-neutral-50 transition flex items-center gap-1"
                >
                  <ChevronLeft size={14} />
                  <span>Previous Page</span>
                </button>
                <button
                  disabled={spread === 4}
                  onClick={() => setSpread((prev) => Math.min(4, prev + 1))}
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
