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
  intro: string;
  whyChoose: string;
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
    markingScheme: "+4 for Correct • -1 for Incorrect • 0 for Unattempted",
    stipend: "INSPIRE-SHE & DISHA (₹60,000/yr + ₹20,000/yr Research Contingency)",
    intro: "The premier national entrance exam for admission to all 7 autonomous IISERs, IISc Bangalore (BS Research), and IIT Madras (BS Medical Sciences).",
    whyChoose: "Direct admission into India's top pure science laboratories without JEE Advanced rank pressure. Equal 4-subject weightage (Physics, Chemistry, Math, Biology - 15 questions each) testing first-principles conceptual intuition.",
    institutes: [
      { name: "IISER Pune", location: "Maharashtra", highlight: "Premier natural science center • Quantum materials & chemical biology." },
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
    duration: "180 Minutes (3 Hours)",
    marks: 180,
    questions: "All MCQs • Best 3 of 4 Subjects Counted",
    markingScheme: "+3 for Correct • -1 for Incorrect • 0 for Unattempted",
    stipend: "DAE DISHA Scholarship (₹60,000/yr + ₹20,000/yr Summer Project Grant to ALL students)",
    intro: "National entrance screening test for admission to NISER Bhubaneswar and UM-DAE CEBS Mumbai, autonomous research institutions directly funded by the Department of Atomic Energy (DAE), Govt. of India.",
    whyChoose: "Direct pathway into nuclear and quantum research with guaranteed DAE DISHA fellowship (₹80k/yr). Graduates maintaining >7.5 CGPA receive direct interview eligibility for Bhabha Atomic Research Centre (BARC) Scientific Officer recruitment.",
    institutes: [
      { name: "NISER Bhubaneswar", location: "Odisha", highlight: "Apex autonomous research institution under the Department of Atomic Energy." },
      { name: "UM-DAE CEBS Mumbai", location: "Maharashtra", highlight: "Located inside Mumbai University campus in direct research collaboration with BARC & TIFR." }
    ],
    pattern: [
      { subject: "Physics", count: "17-20 MCQs", marks: "60 Marks (Best 3 Scored)" },
      { subject: "Chemistry", count: "17-20 MCQs", marks: "60 Marks (Best 3 Scored)" },
      { subject: "Mathematics", count: "17-20 MCQs", marks: "60 Marks (Best 3 Scored)" },
      { subject: "Biology", count: "17-20 MCQs", marks: "60 Marks (Best 3 Scored)" }
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
    markingScheme: "UGA: +4 / -1 • UGB: Evaluated on mathematical rigor & logical proof steps",
    stipend: "100% Free Tuition + ₹5,000/month Living Stipend + Annual Book Grant",
    intro: "India's legendary entrance examination for mathematical statistics, probability theory, and pure mathematics at the historic Indian Statistical Institute.",
    whyChoose: "The global gold standard in quantitative thinking. Students pay zero tuition fees, receive monthly stipends, and enter world-class doctoral programs or elite quantitative research roles at DeepMind, Jane Street, and Citadel.",
    institutes: [
      { name: "ISI Kolkata", location: "West Bengal", highlight: "Birthplace of Indian statistics • Flagship B.Stat (Hons) and M.Stat programs." },
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
    intro: "Apex entrance exam for undergraduate studies in pure mathematics, theoretical computer science, algorithms, and theoretical physics in Siruseri, Chennai.",
    whyChoose: "Unrivaled training in discrete mathematics, algorithms, and algebraic geometry with global academic prestige. Generous scholarships and zero tuition for meritorious students.",
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
    intro: "India's highest-ranked university in NIRF rankings, offering a 4-year interdisciplinary undergraduate program in natural, chemical, and mathematical sciences.",
    whyChoose: "Direct access to over 40 research departments and state-of-the-art national research facilities. Now accepts top rankers from the IISER Aptitude Test (IAT).",
    institutes: [
      { name: "IISc Bangalore", location: "Karnataka", highlight: "NIRF Rank #1 University with world-class faculty and global research labs." }
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
    <div className="min-h-screen bg-[#14100c] text-[#2c241d] font-serif selection:bg-[#c99742] selection:text-black relative overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      {/* Atmospheric Archival Library Background with Warm Soft Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/images/archival_library_backdrop.jpg"
          alt="Antique grand university research library with warm golden reading lamps"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(15,12,9,0.85)_100%)]" />
      </div>

      {/* Main Interactive Stage */}
      <main className="relative z-10 pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex-1 flex flex-col justify-center items-center">
        
        {/* The Open Hardbound Book Container */}
        <div className="relative w-full max-w-5xl my-auto">
          
          {/* Floating Left Page-Turn Arrow */}
          <button
            disabled={spread === 1}
            onClick={() => setSpread((prev) => Math.max(1, prev - 1))}
            className="hidden sm:flex absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#faf5e8] border border-[#d6cbaf] text-[#1c1815] shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 disabled:opacity-0 disabled:pointer-events-none cursor-pointer group"
            title="Previous Page (←)"
          >
            <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Floating Right Page-Turn Arrow */}
          <button
            disabled={spread === 4}
            onClick={() => setSpread((prev) => Math.min(4, prev + 1))}
            className="hidden sm:flex absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#faf5e8] border border-[#d6cbaf] text-[#1c1815] shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 disabled:opacity-0 disabled:pointer-events-none cursor-pointer group"
            title="Next Page (→)"
          >
            <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* ═══════════════════════════════════════════════════════════════════
              THE PHYSICAL OPEN BOOK (PAGES WITH REAL PAPER EDGES & CENTER CREASE)
             ═══════════════════════════════════════════════════════════════════ */}
          <div className="relative bg-[#f8f4e6] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.1),-8px_0_20px_rgba(0,0,0,0.15),8px_0_20px_rgba(0,0,0,0.15)] overflow-hidden border-t border-b border-[#e3d8be] min-h-[590px] sm:min-h-[660px] flex flex-col justify-between">
            
            {/* Realistic Page Thickness / Paper Stack Layers Underneath */}
            <div className="absolute -bottom-1.5 left-2 right-2 h-2 bg-[#ece1c6] rounded-b-sm border-t border-[#d8caa6] -z-10 shadow-md" />
            <div className="absolute -bottom-3 left-4 right-4 h-2 bg-[#dfd1b2] rounded-b-sm border-t border-[#cbbca0] -z-20 shadow-md" />

            {/* Central Book Spine Soft Gutter Shadow */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-16 pointer-events-none bg-gradient-to-r from-transparent via-black/10 to-transparent z-20" />
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#d3c5a3] z-20" />

            {/* ═════════════════════════════════════════════════════════════════
                SPREAD 1: THE GENESIS CHRONICLES (PAGES 01 & 02)
               ═════════════════════════════════════════════════════════════════ */}
            {spread === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 relative z-10 flex-1 animate-fadeIn">
                
                {/* LEFT PAGE (PAGE 01) - LINED JOURNAL ESSAY */}
                <div className="p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e5dcbf] bg-[#f8f4e6]">
                  
                  {/* Red Vertical Ledger Margin Rule */}
                  <div className="hidden sm:block absolute top-0 bottom-0 left-7 w-[1.5px] bg-[#d97768]/35" />

                  {/* Horizontal Lined Paper Background Effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:100%_32px] mt-24" />

                  <div className="space-y-6 sm:pl-4">
                    <div>
                      <span className="font-serif italic text-base text-[#8c672b] tracking-wider block mb-1">
                        Chapter I.
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1c1815] uppercase tracking-wider leading-[1.08]">
                        THE VIGYAN <br />CHRONICLES
                      </h2>
                    </div>

                    {/* Essay Body with Drop Cap */}
                    <div className="text-sm sm:text-base text-[#382f27] font-serif leading-[1.8] space-y-4">
                      <p className="first-letter:float-left first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-serif first-letter:font-black first-letter:text-[#9e2a2b] first-letter:mr-3 first-letter:leading-[0.85] first-letter:pt-1">
                        Born from a profound reverence for pure empirical science and mathematical deduction, <strong>VigyanPrep</strong>{" "}was established not merely as a test platform, but as an artisanal sanctuary for India&apos;s research scholars. We believe that true scientific learning is an art form—one that bridges the soul of the inquirer with the immutable laws of nature.
                      </p>
                      
                      {/* Pull Quote */}
                      <blockquote className="p-3.5 rounded-lg bg-[#efe5cf]/70 border-l-3 border-[#9e2a2b] text-xs sm:text-sm italic text-[#4a3f35] leading-relaxed shadow-xs">
                        &ldquo;Our journey began with a single mission: mapping the rigorous terrain of IISER, NISER, ISI, and CMI. Driven by an intense passion for pure fundamental science over rote formula drills.&rdquo;
                      </blockquote>

                      <p className="text-xs sm:text-sm text-[#4a3f35] font-light leading-relaxed">
                        We do not employ formula crammers; we cultivate <strong>Scientific Thinkers</strong>. Students whose intuition is grounded in first principles, capable of proving theorems, predicting reactions, and mastering the frontiers of physics, chemistry, mathematics, and biology.
                      </p>
                    </div>

                    {/* Red Circular Rubber Stamp */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-dashed border-[#9e2a2b]/60 text-[#9e2a2b] font-mono text-[9px] uppercase font-bold tracking-widest -rotate-2">
                      <span>★ OFFICIAL PURE SCIENCE SANCTUARY • APPROVED CBT ★</span>
                    </div>
                  </div>

                  {/* Page 01 Number */}
                  <div className="text-center pt-6 text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 01 —
                  </div>
                </div>

                {/* RIGHT PAGE (PAGE 02) - TAPED POLAROIDS & FIELD NOTES */}
                <div className="p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between bg-[#f6f1e0]">
                  
                  <div className="space-y-6">
                    
                    {/* Taped Polaroid 1: University Campus */}
                    <div className="relative p-3 bg-white rounded shadow-lg border border-[#ded4bc] max-w-[280px] sm:max-w-[300px] mx-auto -rotate-2 hover:rotate-0 transition-transform duration-300">
                      {/* Frosted Scotch Tape */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs rotate-[-1deg] z-10" />

                      <div className="relative h-36 sm:h-44 w-full rounded overflow-hidden bg-[#e0d6bd]">
                        <Image
                          src="/images/iiser_campus_real.jpg"
                          alt="Premier Indian research institute campus (IISER & IISc)"
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                      
                      <div className="pt-2 text-center">
                        <span className="font-serif italic text-xs text-[#5c4d3e] font-semibold">
                          The 7 IISER Campuses, NISER &amp; IISc Bangalore
                        </span>
                      </div>
                    </div>

                    {/* Taped Polaroid 2: First Principles Laboratory */}
                    <div className="relative p-3 bg-white rounded shadow-lg border border-[#ded4bc] max-w-[280px] sm:max-w-[300px] mx-auto rotate-2 hover:rotate-0 transition-transform duration-300">
                      {/* Frosted Scotch Tape */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs rotate-[2deg] z-10" />

                      <div className="relative h-32 sm:h-36 w-full rounded overflow-hidden bg-[#e0d6bd]">
                        <Image
                          src="/images/pure_science_lab_real.jpg"
                          alt="Undergraduate student working on first-principles physics and optics derivations"
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="pt-2 text-center">
                        <span className="font-serif italic text-xs text-[#5c4d3e] font-semibold">
                          First-Principles Laboratory Research
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Cursive Seal Note */}
                  <div className="text-right pt-4">
                    <span className="font-serif italic text-xs text-[#8c7864] block">
                      Curated exclusively for pure science research scholars
                    </span>
                    <div className="text-center pt-2 text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                      — 02 —
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                SPREAD 2: TARGET RESEARCH GATEWAYS (PAGES 03 & 04)
               ═════════════════════════════════════════════════════════════════ */}
            {spread === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 relative z-10 flex-1 animate-fadeIn">
                
                {/* LEFT PAGE (PAGE 03) - BLUEPRINT & WHY CHOOSE */}
                <div className="p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e5dcbf] bg-[#f8f4e6]">
                  <div className="space-y-4">
                    <div>
                      <span className="font-serif italic text-base text-[#8c672b] tracking-wider block mb-1">
                        Chapter II.
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-[#1c1815] uppercase tracking-wider">
                        RESEARCH DOSSIERS
                      </h2>
                    </div>

                    {/* Gateway Switcher Tabs */}
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

                    {/* Active Gateway Detailed Box */}
                    <div className="space-y-3 bg-[#f4ebda] p-4.5 rounded-xl border border-[#d6c7a7] text-xs">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-[#9e2a2b] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                          {activeGateway.code}
                        </span>
                        <span className="font-serif text-[#695a4c] font-bold">
                          {activeGateway.degree}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1c1815]">
                        {activeGateway.name}
                      </h3>

                      <p className="text-[#544637] leading-relaxed">
                        {activeGateway.intro}
                      </p>

                      {/* Why Choose Callout */}
                      <div className="p-3 rounded-lg bg-[#efe5cf] border-l-3 border-[#8c672b] text-[#3d332a] space-y-1">
                        <strong className="font-bold block text-[#1c1815]">Why Choose This Gateway:</strong>
                        <p className="text-[11px] leading-relaxed">{activeGateway.whyChoose}</p>
                      </div>

                      {/* Pattern Grid */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded-lg bg-white border border-[#ded3b9]">
                          <span className="text-[9px] uppercase font-mono text-neutral-500 block">Duration</span>
                          <strong className="text-[#1c1815] text-[11px]">{activeGateway.duration}</strong>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#ded3b9]">
                          <span className="text-[9px] uppercase font-mono text-neutral-500 block">Marking</span>
                          <strong className="text-[#1c1815] text-[10px]">{activeGateway.markingScheme.split('•')[0]}</strong>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#ded3b9]">
                          <span className="text-[9px] uppercase font-mono text-neutral-500 block">Questions</span>
                          <strong className="text-[#1c1815] text-[10px]">{activeGateway.questions.split('•')[0]}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <Link
                          href={activeGateway.pyqUrl}
                          className="px-3.5 py-1.5 rounded-lg bg-[#9e2a2b] hover:bg-[#852324] text-white font-serif font-bold text-xs shadow transition flex items-center gap-1"
                        >
                          <span>Solve Free PYQs</span>
                          <ChevronRight size={13} />
                        </Link>
                        <a
                          href={activeGateway.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-50 border border-[#d6c7a7] text-[#1c1815] font-serif font-bold text-xs transition inline-flex items-center gap-1"
                        >
                          <span>Official Website</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Page 03 Number */}
                  <div className="text-center pt-4 text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 03 —
                  </div>
                </div>

                {/* RIGHT PAGE (PAGE 04) - ADMITTING CAMPUSES */}
                <div className="p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between bg-[#f6f1e0]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1c1815]">
                        Admitting Campuses ({activeGateway.institutes.length})
                      </h3>
                      <span className="text-xs font-mono text-[#8c672b] font-bold">
                        {activeGateway.shortName}
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
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

                    {/* Fellowship Grant Note */}
                    <div className="p-3 rounded-xl bg-[#eadeca] border border-[#cfbe9e] text-xs text-[#3d332a]">
                      <strong className="font-bold block text-[#1c1815] mb-0.5">💰 Fellowship Grant:</strong>
                      <span>{activeGateway.stipend}</span>
                    </div>
                  </div>

                  {/* Page 04 Number */}
                  <div className="text-center pt-4 text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 04 —
                  </div>
                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                SPREAD 3: COMMON INQUIRIES POSTCARDS (PAGES 05 & 06)
               ═════════════════════════════════════════════════════════════════ */}
            {spread === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 relative z-10 flex-1 animate-fadeIn">
                
                {/* LEFT PAGE (PAGE 05) */}
                <div className="p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e5dcbf] bg-[#f8f4e6]">
                  <div className="space-y-6">
                    <div>
                      <span className="font-serif italic text-base text-[#8c672b] tracking-wider block mb-1">
                        Chapter III.
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1c1815] uppercase tracking-wider">
                        COMMON INQUIRIES
                      </h2>
                      <p className="font-serif italic text-xs text-[#8c672b] mt-0.5">
                        Tap a postcard to read verified guidance
                      </p>
                    </div>

                    {/* Postcard 1 */}
                    <div className="relative p-5 bg-white rounded shadow-md border border-[#ded4bc] -rotate-1 space-y-2">
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs rotate-[-1deg]" />
                      <div className="flex items-center justify-between">
                        <span className="font-serif italic text-xl font-bold text-[#9e2a2b]">Q.</span>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#8c672b] font-bold">Inquiry 01</span>
                      </div>
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-[#1c1815] leading-snug">
                        Why is VigyanPrep different from commercial JEE/NEET coachings?
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#544637] leading-relaxed pt-1 border-t border-[#f0e8d5]">
                        Mainstream coachings focus entirely on 30-second formula shortcuts. Entrance exams for IISER, NISER, ISI, and CMI demand deep deductive proofs, physical intuition from first principles, and balanced multi-subject mastery.
                      </p>
                    </div>

                    {/* Postcard 2 */}
                    <div className="relative p-5 bg-white rounded shadow-md border border-[#ded4bc] rotate-1 space-y-2">
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs rotate-[1deg]" />
                      <div className="flex items-center justify-between">
                        <span className="font-serif italic text-xl font-bold text-[#9e2a2b]">Q.</span>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#8c672b] font-bold">Inquiry 02</span>
                      </div>
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-[#1c1815] leading-snug">
                        Are the Previous Year Papers (PYQs) 100% free to attempt?
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#544637] leading-relaxed pt-1 border-t border-[#f0e8d5]">
                        Yes. All official past year papers for IISER IAT and NISER NEST are completely free to attempt in our authentic Computer-Based Testing (CBT) interface with real countdown timers and verified solutions.
                      </p>
                    </div>
                  </div>

                  <div className="text-center pt-6 text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 05 —
                  </div>
                </div>

                {/* RIGHT PAGE (PAGE 06) */}
                <div className="p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between bg-[#f6f1e0]">
                  <div className="space-y-6 pt-2">
                    {/* Postcard 3 */}
                    <div className="relative p-5 bg-white rounded shadow-md border border-[#ded4bc] rotate-1 space-y-2">
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs rotate-[-1deg]" />
                      <div className="flex items-center justify-between">
                        <span className="font-serif italic text-xl font-bold text-[#9e2a2b]">Q.</span>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#8c672b] font-bold">Inquiry 03</span>
                      </div>
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-[#1c1815] leading-snug">
                        Can a PCM student crack IISER IAT without Biology?
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#544637] leading-relaxed pt-1 border-t border-[#f0e8d5]">
                        Yes! In IAT, questions are asked across all 4 subjects (15 each). PCM students can maximize marks in Physics, Chemistry, and Math while picking up high-scoring foundational topics in Biology using our structured modules.
                      </p>
                    </div>

                    {/* Postcard 4 */}
                    <div className="relative p-5 bg-white rounded shadow-md border border-[#ded4bc] -rotate-1 space-y-2">
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs rotate-[1deg]" />
                      <div className="flex items-center justify-between">
                        <span className="font-serif italic text-xl font-bold text-[#9e2a2b]">Q.</span>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#8c672b] font-bold">Inquiry 04</span>
                      </div>
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-[#1c1815] leading-snug">
                        What scholarships &amp; stipends do admitted students receive?
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#544637] leading-relaxed pt-1 border-t border-[#f0e8d5]">
                        Eligible students at IISERs, NISER, and IISc receive DST INSPIRE-SHE or DAE DISHA fellowships of ₹60,000/year plus ₹20,000/year summer research project grants (total ₹80,000/yr). ISI and CMI provide 100% tuition waivers and monthly stipends.
                      </p>
                    </div>
                  </div>

                  <div className="text-center pt-6 text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 06 —
                  </div>
                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                SPREAD 4: THE HELP DESK & COMMENCING EXPEDITION (PAGES 07 & 08)
               ═════════════════════════════════════════════════════════════════ */}
            {spread === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 relative z-10 flex-1 animate-fadeIn">
                
                {/* LEFT PAGE (PAGE 07) - THE HELP DESK */}
                <div className="p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e5dcbf] bg-[#f8f4e6]">
                  <div className="space-y-6">
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

                    <div className="space-y-3 text-left font-serif text-xs border-t border-b border-[#e0d6bd] py-4">
                      <a
                        href="tel:+917004283531"
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-[#efe5cf] text-[#1c1815] transition group"
                      >
                        <span className="font-bold">Phone Helpline (+91 7004283531)</span>
                        <span className="text-[#8c672b] group-hover:translate-x-1 transition-transform">→</span>
                      </a>

                      <a
                        href="https://wa.me/917004283531"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-[#efe5cf] text-[#9e2a2b] font-bold transition group"
                      >
                        <span>WhatsApp Mentorship Assistance</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </a>

                      <a
                        href="mailto:support@vigyanprep.com"
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-[#efe5cf] text-[#1c1815] transition group"
                      >
                        <span className="font-bold">Email Helpdesk (support@vigyanprep.com)</span>
                        <span className="text-[#8c672b] group-hover:translate-x-1 transition-transform">→</span>
                      </a>

                      <div className="flex items-center justify-between p-3 text-[#695a4c]">
                        <span>Academic Center (New Delhi, India)</span>
                        <span className="text-[10px] font-mono font-bold">Pure Science Division</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-6 text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 07 —
                  </div>
                </div>

                {/* RIGHT PAGE (PAGE 08) - COMMENCING EXPEDITION */}
                <div className="p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between bg-[#f6f1e0]">
                  <div className="space-y-6">
                    <div>
                      <span className="font-serif italic text-base text-[#8c672b] tracking-wider block mb-1">
                        Epilogue
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1c1815] uppercase tracking-wider">
                        COMMENCE JOURNEY
                      </h3>
                      <p className="text-xs text-[#544637] leading-relaxed mt-1">
                        The pursuit of pure science is not a race of speed; it is an exploration of fundamental truth.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <a
                        href="https://test.vigyanprep.com"
                        className="p-4 rounded-xl bg-[#9e2a2b] hover:bg-[#852324] text-white shadow transition flex items-center justify-between group"
                      >
                        <div>
                          <strong className="text-xs sm:text-sm font-bold block">Launch Official CBT Portal</strong>
                          <span className="text-[10px] text-amber-100">Live Mock Tests &amp; Response Sheets</span>
                        </div>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </a>

                      <Link
                        href="/pyq"
                        className="p-4 rounded-xl bg-white hover:bg-neutral-50 border border-[#d6cbaf] text-[#1c1815] shadow-xs transition flex items-center justify-between group"
                      >
                        <div>
                          <strong className="text-xs sm:text-sm font-bold block">100% Free Past Year Papers</strong>
                          <span className="text-[10px] text-neutral-500">Official IAT &amp; NEST Questions</span>
                        </div>
                        <ChevronRight size={18} className="text-[#8c672b] group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        href="/security"
                        className="p-3 rounded-xl bg-[#f4ebda] border border-[#d6c7a7] text-[#544637] text-xs transition flex items-center justify-between"
                      >
                        <span>Platform Security Advisory</span>
                        <ChevronRight size={14} className="text-[#8c672b]" />
                      </Link>
                    </div>
                  </div>

                  <div className="text-center pt-6 text-xs font-serif text-[#8c672b] tracking-widest font-bold">
                    — 08 —
                  </div>
                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                BOOK FOOTER: PAGE FLIPPER CONTROLS & SPREAD COUNTER
               ═════════════════════════════════════════════════════════════════ */}
            <div className="p-4 sm:p-5 bg-[#efe5cf] border-t border-[#ded3b9] flex items-center justify-between text-xs font-serif z-20">
              
              <div className="flex items-center gap-2">
                <span className="text-[#8c672b] font-bold">
                  Pages {spread * 2 - 1} &amp; {spread * 2} of 8
                </span>
                <span className="text-[#695a4c] hidden sm:inline">•</span>
                <span className="text-[#695a4c] italic hidden sm:inline">
                  {spread === 1 && "The Vigyan Chronicles"}
                  {spread === 2 && "Target Research Gateways (IAT, NEST, ISI, CMI, IISc)"}
                  {spread === 3 && "Common Inquiries (Postcard Board)"}
                  {spread === 4 && "The Help Desk & Epilogue"}
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
                  className="px-3 py-1.5 rounded bg-white border border-[#d6c7a7] text-[#1c1815] font-bold disabled:opacity-30 cursor-pointer hover:bg-neutral-50 transition flex items-center gap-1 text-[11px]"
                >
                  <ChevronLeft size={13} />
                  <span>Previous</span>
                </button>
                <button
                  disabled={spread === 4}
                  onClick={() => setSpread((prev) => Math.min(4, prev + 1))}
                  className="px-3 py-1.5 rounded bg-[#9e2a2b] text-white font-bold disabled:opacity-30 cursor-pointer hover:bg-[#852324] transition flex items-center gap-1 text-[11px]"
                >
                  <span>Next</span>
                  <ChevronRight size={13} />
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
