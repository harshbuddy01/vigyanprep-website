"use client";

import React, { useState, useMemo } from "react";
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
  Search,
  X,
  ExternalLink,
  ChevronRight,
  Phone,
  Mail,
  MessageSquare,
  Building2,
  Atom,
  Calculator,
  Award,
  Globe2,
  Check,
  Compass
} from "lucide-react";

interface ExamCardData {
  id: string;
  code: string;
  name: string;
  shortName: string;
  category: "pure_science" | "math_stats" | "cs_physics";
  badge: string;
  degree: string;
  duration: string;
  marks: string | number;
  questions: string;
  negativeMarking: string;
  stipend: string;
  oneLiner: string;
  whyChosen: string;
  institutes: { name: string; location: string; highlight: string }[];
  pattern: { subject: string; count: string; marks: string }[];
  syllabus: { subject: string; topics: string[] }[];
  careerPaths: string[];
  officialLink: string;
}

const EXAMS_LIST: ExamCardData[] = [
  {
    id: "iat",
    code: "EXAM-01",
    name: "IISER Aptitude Test (IAT)",
    shortName: "IISER IAT",
    category: "pure_science",
    badge: "Flagship Natural Science",
    degree: "5-Year BS-MS Dual Degree & 4-Year BS (Research)",
    duration: "180 Mins (3 Hours)",
    marks: 240,
    questions: "60 Questions (15 per subject)",
    negativeMarking: "+4 Correct • -1 Incorrect • 0 Unattempted",
    stipend: "INSPIRE-SHE & DISHA (₹60,000/yr + ₹20,000/yr Research Contingency)",
    oneLiner: "The premier national gateway to all 7 IISERs, IISc Bangalore, and IIT Madras BS Medical Sciences.",
    whyChosen:
      "Mainstream engineering coaching ignores IAT to focus on formula speed-tests. We built VigyanPrep specifically to cultivate the deep 4-subject conceptual harmony and deductive reasoning that IISER demands.",
    institutes: [
      { name: "IISER Pune", location: "Maharashtra", highlight: "Apex natural science hub • Quantum materials, chemical biology & high-performance computing" },
      { name: "IISER Kolkata", location: "West Bengal", highlight: "Center of Excellence in Space Sciences (CESSI), solar physics & earth systems" },
      { name: "IISER Mohali", location: "Punjab", highlight: "World-class NMR spectroscopy facility, structural biophysics & quantum optics" },
      { name: "IISER Bhopal", location: "Madhya Pradesh", highlight: "Natural Sciences, Data Science, Chemical Engineering & Biological Systems" },
      { name: "IISER Thiruvananthapuram", location: "Kerala", highlight: "Materials science, ecology, chemical synthesis & oceanic research labs" },
      { name: "IISER Tirupati", location: "Andhra Pradesh", highlight: "Biophysics, structural biochemistry, cancer biology & climate science" },
      { name: "IISER Berhampur", location: "Odisha", highlight: "Coastal ecology, nanomaterials & experimental high-energy physics" },
      { name: "IISc Bangalore", location: "Karnataka", highlight: "Admissions via top IAT rankers (Top ~150-250 AIR) into 4-Yr BS Research" },
      { name: "IIT Madras", location: "Tamil Nadu", highlight: "BS in Medical Sciences & Engineering through dedicated IAT channel" },
    ],
    pattern: [
      { subject: "Physics", count: "15 Qs", marks: "60 Marks" },
      { subject: "Chemistry", count: "15 Qs", marks: "60 Marks" },
      { subject: "Mathematics", count: "15 Qs", marks: "60 Marks" },
      { subject: "Biology", count: "15 Qs", marks: "60 Marks" },
    ],
    syllabus: [
      { subject: "Physics", topics: ["Classical Mechanics & Rigid Bodies", "Electromagnetism & Wave Optics", "Thermodynamics & Kinetic Theory", "Modern & Nuclear Physics"] },
      { subject: "Chemistry", topics: ["Chemical Bonding & Molecular Orbitals", "Organic Reaction Mechanisms", "Thermodynamics & Chemical Kinetics", "Coordination Chemistry & Electrochemistry"] },
      { subject: "Mathematics", topics: ["Differential & Integral Calculus", "Vectors, Matrices & 3D Geometry", "Probability Distributions", "Sequences, Series & Complex Numbers"] },
      { subject: "Biology", topics: ["Cellular & Molecular Genetics", "Human & Plant Physiology", "Biomolecules & Enzyme Kinetics", "Ecology, Evolution & Biodiversity"] },
    ],
    careerPaths: [
      "Direct fully funded Ph.D. admissions at MIT, Harvard, Max Planck, Cambridge, Oxford, and ETH Zürich.",
      "Scientist & Research Officer appointments at ISRO, DRDO, BARC, TIFR, and CSIR national laboratories.",
      "Frontier industry R&D in Quantum Computing, Synthetic Biology, Nanomaterials, and Deep-Tech AI.",
    ],
    officialLink: "https://iiseradmission.in",
  },
  {
    id: "nest",
    code: "EXAM-02",
    name: "National Entrance Screening Test (NEST)",
    shortName: "NISER NEST",
    category: "pure_science",
    badge: "Atomic Energy Research",
    degree: "5-Year Integrated M.Sc.",
    duration: "210 Mins (3.5 Hours)",
    marks: 180,
    questions: "68 Questions (Best 3 of 4 Scored)",
    negativeMarking: "MCQ: +2.5 / -1 • MSQ: Partial credit with NO negative marking",
    stipend: "DAE DISHA Scholarship (₹60,000/yr + ₹20,000/yr Summer Project Grant for ALL students)",
    oneLiner: "Direct entry to NISER Bhubaneswar & UM-DAE CEBS Mumbai under the Department of Atomic Energy.",
    whyChosen:
      "NEST features non-standard multiple-correct questions (MSQs) and a unique 'Best 3 of 4 Subjects' scoring rule. We provide authentic exam simulation and sectional cutoff analytics.",
    institutes: [
      { name: "NISER Bhubaneswar", location: "Odisha", highlight: "Apex autonomous research institution under the Department of Atomic Energy (DAE)" },
      { name: "UM-DAE CEBS Mumbai", location: "Maharashtra", highlight: "Located inside University of Mumbai Kalina campus in direct partnership with BARC & TIFR" },
    ],
    pattern: [
      { subject: "Physics", count: "17 Qs", marks: "60 Marks (Best 3 Scored)" },
      { subject: "Chemistry", count: "17 Qs", marks: "60 Marks (Best 3 Scored)" },
      { subject: "Mathematics", count: "17 Qs", marks: "60 Marks (Best 3 Scored)" },
      { subject: "Biology", count: "17 Qs", marks: "60 Marks (Best 3 Scored)" },
    ],
    syllabus: [
      { subject: "Physics", topics: ["Rotational Dynamics & Gravity", "Electromagnetic Induction & AC", "Wave Optics & Interference", "Fluid Dynamics & Modern Physics"] },
      { subject: "Chemistry", topics: ["Coordination Chemistry & Isomerism", "Reaction Kinetics & Equilibrium", "Aromatic Chemistry & Biomolecules", "Electrochemistry & Solid State"] },
      { subject: "Mathematics", topics: ["Combinatorics & Probability", "Definite Integrals & Areas", "Vectors & Coordinate Geometry", "Differential Equations & Trigonometry"] },
      { subject: "Biology", topics: ["Biomolecules & Metabolic Pathways", "Genetics & Recombinant DNA", "Systemic Physiology", "Ecology & Systematics"] },
    ],
    careerPaths: [
      "Direct interview eligibility for Scientific Officer (Grade C) in Bhabha Atomic Research Centre (BARC).",
      "Funded Ph.D. positions at CERN (Geneva), DESY (Germany), FermiLab, and premier European institutes.",
      "Frontier careers in Nuclear Fusion, High-Energy Astrophysics, and Structural Biophysics.",
    ],
    officialLink: "https://nestexam.in",
  },
  {
    id: "isi",
    code: "EXAM-03",
    name: "Indian Statistical Institute (ISI) Admission Test",
    shortName: "ISI B.Stat / B.Math",
    category: "math_stats",
    badge: "Elite Mathematics & Statistics",
    degree: "B.Stat (Hons) at Kolkata / B.Math (Hons) at Bengaluru",
    duration: "4 Hours (UGA 2 hrs + UGB 2 hrs)",
    marks: "100 Objective + 100 Subjective Proofs",
    questions: "30 Objective (UGA) + 8 Proofs (UGB)",
    negativeMarking: "UGA: +4 / -1 • UGB: Evaluated on proof logic, clarity & mathematical rigor",
    stipend: "100% Free Tuition + ₹5,000/month Living Stipend + Annual Book Allowance",
    oneLiner: "The world's gold standard in mathematical statistics, probability theory, and quantitative proofs.",
    whyChosen:
      "ISI cannot be cracked with formula speed-tricks. It demands proof writing and Olympiad-level logic. We provide rigorous subjective step-by-step solution breakdowns.",
    institutes: [
      { name: "ISI Kolkata", location: "West Bengal", highlight: "Birthplace of Indian statistics • Flagship B.Stat (Hons) and M.Stat programs" },
      { name: "ISI Bengaluru", location: "Karnataka", highlight: "World-class center for Pure Mathematics & Probability • B.Math (Hons)" },
      { name: "ISI Delhi", location: "New Delhi", highlight: "Premier center for Quantitative Economics, Econometrics & Operations Research" },
    ],
    pattern: [
      { subject: "Forenoon Session (UGA)", count: "30 Qs", marks: "100 Marks (Objective MCQ)" },
      { subject: "Afternoon Session (UGB)", count: "8 Proofs", marks: "100 Marks (Subjective Proofs)" },
    ],
    syllabus: [
      { subject: "Algebra & Number Theory", topics: ["Modular Arithmetic & Primes", "Polynomials & Roots", "Classical Inequalities (AM-GM, Cauchy-Schwarz)", "Matrices & Systems"] },
      { subject: "Combinatorics & Graph", topics: ["Pigeonhole Principle", "Generating Functions", "Recurrence Relations", "Combinatorial Proofs & Counting"] },
      { subject: "Geometry & Trig", topics: ["Euclidean Theorems", "Conic Sections & Locus", "Complex Geometry", "Trigonometric Identities & Equations"] },
      { subject: "Calculus & Analysis", topics: ["Limits, Continuity & Differentiability", "Monotonicity & Convexity", "Riemann Integrals & Series", "Sequences & Convergence"] },
    ],
    careerPaths: [
      "Quantitative Research & High-Frequency Trading at top global hedge funds (Jane Street, Citadel, Jump Trading, DE Shaw).",
      "Direct Ph.D. in Pure Mathematics or Statistics at Princeton, Stanford, Harvard, Cambridge, and UC Berkeley.",
      "Frontier Machine Learning and Cryptography research at Google DeepMind, OpenAI, and Meta FAIR.",
    ],
    officialLink: "https://isical.ac.in",
  },
  {
    id: "cmi",
    code: "EXAM-04",
    name: "Chennai Mathematical Institute (CMI) Entrance",
    shortName: "CMI Entrance",
    category: "cs_physics",
    badge: "Theoretical CS & Pure Math",
    degree: "B.Sc. (Hons.) in Mathematics & Computer Science / Physics",
    duration: "180 Mins (3 Hours)",
    marks: "100 Marks (Part A: 40 + Part B: 60)",
    questions: "Part A (10 Short Qs) + Part B (6 Proofs)",
    negativeMarking: "Part A: Objective • Part B: Generous credit awarded for valid mathematical steps",
    stipend: "Full Tuition Fee Waiver & Monthly Scholarship of ₹5,000/month",
    oneLiner: "India's apex center for pure mathematics, theoretical computer science, and algorithms.",
    whyChosen:
      "CMI values how you think over how many formulas you memorized. We provide structured proof walkthroughs and algorithmic intuition training.",
    institutes: [
      { name: "CMI Chennai", location: "Siruseri, Tamil Nadu", highlight: "Internationally renowned for algebraic geometry, automata theory, complexity & cryptography" },
    ],
    pattern: [
      { subject: "Part A (Objective)", count: "10 Qs", marks: "40 Marks" },
      { subject: "Part B (Proofs)", count: "6 Proofs", marks: "60 Marks" },
    ],
    syllabus: [
      { subject: "Discrete Math & Logic", topics: ["Mathematical Induction & Invariants", "Pigeonhole Principle", "Graph Theory & Trees", "Boolean Logic & Relations"] },
      { subject: "Algebra & Number Theory", topics: ["Polynomial Equations", "Divisibility & Modular Arithmetic", "Functional Equations", "Inequalities"] },
      { subject: "Calculus & Geometry", topics: ["Derivatives & Optimization", "Definite Integrals", "Analytic Geometry", "Complex Numbers & Roots of Unity"] },
    ],
    careerPaths: [
      "Ph.D. in Theoretical Computer Science, Quantum Computing, and Pure Math at MIT, Stanford, INRIA, and Oxford.",
      "Core Algorithm Engineer & Research Scientist at Google DeepMind, Microsoft Research, and Apple.",
      "Quantitative Strategist and Developer at premier global trading desks.",
    ],
    officialLink: "https://cmi.ac.in",
  },
  {
    id: "iisc",
    code: "EXAM-05",
    name: "IISc Bangalore BS (Research) Admissions",
    shortName: "IISc Research",
    category: "pure_science",
    badge: "Rank #1 University in India",
    degree: "4-Year Bachelor of Science (Research) with optional 1-Yr M.Sc.",
    duration: "Via IISER IAT / JEE Advanced / NEET",
    marks: "Cutoff-based",
    questions: "Follows respective exam blueprint",
    negativeMarking: "Follows respective exam blueprint",
    stipend: "INSPIRE-SHE (₹80,000/yr) & IISc Institutional Merit Scholarships",
    oneLiner: "India's highest-ranked research institution for interdisciplinary natural and mathematical sciences.",
    whyChosen:
      "With IISc adopting IAT as a core undergraduate admission channel, VigyanPrep provides the high-percentile test sets needed to secure an IISc seat.",
    institutes: [
      { name: "IISc Bangalore", location: "Karnataka", highlight: "NIRF Rank #1 • Over 40 research departments and world-renowned interdisciplinary laboratories" },
    ],
    pattern: [
      { subject: "Mode 1: IAT Channel", count: "60 Qs", marks: "Top ~150-250 AIR" },
      { subject: "Mode 2: JEE Adv Channel", count: "Official", marks: "Top ~250 AIR" },
      { subject: "Mode 3: NEET Channel", count: "Official", marks: "Top ~100 AIR" },
    ],
    syllabus: [
      { subject: "Interdisciplinary Sciences", topics: ["Classical & Modern Physics", "Physical & Organic Chemistry", "Higher Mathematics", "Cellular & Molecular Biology"] },
    ],
    careerPaths: [
      "Direct fast-track Ph.D. admissions at MIT, Stanford, Harvard, Cambridge, and Max Planck Institutes.",
      "Lead Research Scientist roles at ISRO, DAE, DRDO, and national laboratories.",
      "Founding leadership in Deep-Tech Startups, Bio-Pharmaceuticals, and Space Ventures.",
    ],
    officialLink: "https://iisc.ac.in/ug",
  },
];

const FUTURE_EXPANSIONS = [
  { title: "CUET PG Natural Sciences", tag: "2026-27", desc: "M.Sc. admissions across Central Universities in Physics, Chemistry, Math & Biology." },
  { title: "IIT JAM (M.Sc. Entrance)", tag: "2026-27", desc: "Direct entry to 2-year M.Sc. and Joint M.Sc.-Ph.D. programs across all IITs and IISc." },
  { title: "TIFR Graduate Studies (GS)", tag: "In Progress", desc: "Apex national fellowship exam for Integrated Ph.D. at Tata Institute of Fundamental Research." },
  { title: "Science Olympiads (INMO/NSE)", tag: "Integration", desc: "Problem sets bridging Olympiad-level deductive thinking with research entrance papers." },
];

export default function AboutPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalExam, setActiveModalExam] = useState<ExamCardData | null>(null);

  const filteredExams = useMemo(() => {
    return EXAMS_LIST.filter((exam) => {
      const matchCat =
        selectedCategory === "all" ||
        (selectedCategory === "pure_science" && exam.category === "pure_science") ||
        (selectedCategory === "math_stats" && exam.category === "math_stats") ||
        (selectedCategory === "cs_physics" && exam.category === "cs_physics");

      const matchSearch =
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.institutes.some((inst) => inst.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#f2ead8] selection:bg-amber-500 selection:text-black font-sans relative overflow-x-hidden">
      <Navbar />

      {/* Subtle Archival Blueprint Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:40px_40px] z-0" />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO: EDITORIAL RESEARCH SANCTUARY
         ═══════════════════════════════════════════════════════════════════════ */}
      <header className="relative z-10 pt-36 sm:pt-40 pb-16 px-6 lg:px-12 max-w-7xl mx-auto border-b border-stone-800/80">
        
        {/* Top Tag Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest shadow-inner">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>The Pure Science &amp; Mathematical Sanctuary</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            What is <span className="italic text-amber-400 font-serif">VigyanPrep</span>?
          </h1>
          <p className="text-sm sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl mx-auto">
            India&apos;s dedicated academic institution built ground-up for <strong>IISER, NISER, ISI, CMI, and IISc</strong> research entrance examinations.
          </p>
        </div>

        {/* 2-Column Hero Card: Sanskrit Meaning & Campus Sketch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Sanskrit Etymology Card */}
          <div className="lg:col-span-6 bg-[#161412] border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-mono font-bold block mb-1">
                Sanskrit Etymology
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                विज्ञान (Vi-Gyan)
              </h2>
              <p className="text-xs text-stone-400 mt-1 font-mono">
                [ Empirical Science Tested Through First Principles ]
              </p>
            </div>

            {/* Vi & Gyan Chips */}
            <div className="space-y-3 relative z-10">
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-start gap-3.5">
                <span className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-serif font-extrabold text-base flex items-center justify-center shrink-0">
                  वि
                </span>
                <div>
                  <h3 className="font-serif font-bold text-sm text-white">Vi (वि) — Empirical &amp; Discerning</h3>
                  <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                    Knowledge that is not memorized blindly, but proven through rigorous experimentation and mathematical deduction.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-start gap-3.5">
                <span className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 font-serif font-extrabold text-base flex items-center justify-center shrink-0">
                  ज्ञान
                </span>
                <div>
                  <h3 className="font-serif font-bold text-sm text-white">Gyan (ज्ञान) — Pure Conceptual Truth</h3>
                  <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                    Deep understanding of the fundamental laws governing matter, energy, space, and life.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-400 italic border-l-2 border-amber-500 pl-3">
              &ldquo;We added <strong>Prep</strong> because our sole focus is preparing India&apos;s next generation of scientists, mathematicians, and research scholars.&rdquo;
            </p>
          </div>

          {/* Right: Technical Diagrams & Highlights */}
          <div className="lg:col-span-6 bg-[#161412] border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-mono font-bold block">
                The Pure Science Mandate
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                Designed for Scientific Thinkers, Not Formula Machines
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Traditional engineering and medical coachings train students on speed-pattern drills. Pure research entrances (IAT, NEST, ISI, CMI) demand an entirely different mindset: structural proofs, 4-subject interdisciplinary linkage, and experimental intuition.
              </p>
            </div>

            {/* Scientific Sketches Matrix */}
            <div className="grid grid-cols-4 gap-2.5 p-3 rounded-2xl bg-stone-900/90 border border-stone-800">
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <RayOpticsSketch className="w-8 h-8 text-amber-400/80" />
                <span className="text-[10px] font-mono text-stone-400 mt-1 font-bold">Physics</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <BenzeneOrbitalSketch className="w-8 h-8 text-orange-400/80" />
                <span className="text-[10px] font-mono text-stone-400 mt-1 font-bold">Chemistry</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <CalculusIntegralSketch className="w-8 h-8 text-amber-300/80" />
                <span className="text-[10px] font-mono text-stone-400 mt-1 font-bold">Maths</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <DNAHelixSketch className="w-8 h-8 text-emerald-400/80" />
                <span className="text-[10px] font-mono text-stone-400 mt-1 font-bold">Biology</span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 text-center border-t border-stone-800/80 pt-4">
              <div>
                <span className="text-xl font-black text-amber-400 font-mono block">7 IISERs</span>
                <span className="text-[10px] text-stone-400 uppercase font-bold">All Campuses</span>
              </div>
              <div className="border-x border-stone-800/80">
                <span className="text-xl font-black text-amber-400 font-mono block">₹0 Fee</span>
                <span className="text-[10px] text-stone-400 uppercase font-bold">Free PYQ Papers</span>
              </div>
              <div>
                <span className="text-xl font-black text-amber-400 font-mono block">100% CBT</span>
                <span className="text-[10px] text-stone-400 uppercase font-bold">NTA Standard</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHY CHOOSE PURE SCIENCE: 4 PILLARS
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 px-6 lg:px-12 max-w-7xl mx-auto border-b border-stone-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">Our Pedagogical Manifesto</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Built for Pure Science, Not Rote Coaching
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            How VigyanPrep prepares students differently from commercial coaching institutes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-[#161412] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-3 hover:border-amber-500/40 transition group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold group-hover:scale-105 transition">
              <Atom className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-white">Exclusively Pure Science</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              No JEE/NEET leftovers. Every mock test and question set is crafted specifically for IAT, NEST, ISI, and CMI exam blueprints.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#161412] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-3 hover:border-amber-500/40 transition group">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold group-hover:scale-105 transition">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-white">First-Principles Logic</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              No 30-second shortcut gimmicks. We train you in rigorous proofs, multi-step derivations, and conceptual deduction.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#161412] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-3 hover:border-amber-500/40 transition group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold group-hover:scale-105 transition">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-white">Fully Funded Fellowships</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Admitted students receive INSPIRE &amp; DAE DISHA fellowships of ₹60,000 to ₹80,000/yr + summer research project grants.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#161412] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-3 hover:border-amber-500/40 transition group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold group-hover:scale-105 transition">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-white">Global Ph.D. Horizons</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Direct pipelines to fully funded doctoral programs at Harvard, MIT, Max Planck, Cambridge, CERN, and ETH Zürich.
            </p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          INTERACTIVE EXAM DIRECTORY
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="exams" className="relative z-10 py-16 px-6 lg:px-12 max-w-7xl mx-auto border-b border-stone-800/80 scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">Comprehensive Exam Dossiers</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-1">
              Explore Research Entrance Pathways
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Click any exam card below to inspect syllabus blueprints, seat matrices, paper patterns, and fellowships.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search IAT, NEST, ISI, CMI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-900 border border-stone-700 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 transition shadow-inner font-mono"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === "all"
                ? "bg-amber-500 text-black shadow-lg font-bold"
                : "bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700"
            }`}
          >
            All Gateways ({EXAMS_LIST.length})
          </button>
          <button
            onClick={() => setSelectedCategory("pure_science")}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === "pure_science"
                ? "bg-amber-500 text-black shadow-lg font-bold"
                : "bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700"
            }`}
          >
            Pure Sciences (IAT, NEST, IISc)
          </button>
          <button
            onClick={() => setSelectedCategory("math_stats")}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === "math_stats"
                ? "bg-amber-500 text-black shadow-lg font-bold"
                : "bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700"
            }`}
          >
            Math &amp; Statistics (ISI)
          </button>
          <button
            onClick={() => setSelectedCategory("cs_physics")}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === "cs_physics"
                ? "bg-amber-500 text-black shadow-lg font-bold"
                : "bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700"
            }`}
          >
            Theoretical CS &amp; Math (CMI)
          </button>
        </div>

        {/* Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              onClick={() => setActiveModalExam(exam)}
              className="group cursor-pointer bg-[#161412] border border-stone-800 hover:border-amber-500/60 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {exam.badge}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">{exam.duration}</span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                    {exam.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1.5 leading-relaxed line-clamp-2">
                    {exam.oneLiner}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-stone-900/80 border border-stone-800 text-xs">
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase font-bold block">Total Marks</span>
                    <span className="font-mono font-bold text-white">{exam.marks}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase font-bold block">Questions</span>
                    <span className="font-mono font-bold text-white">{exam.questions.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="text-xs text-stone-400">
                  <span className="font-bold text-stone-300 block mb-1">Target Institutes:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {exam.institutes.slice(0, 3).map((inst, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-[10px] font-mono">
                        {inst.name}
                      </span>
                    ))}
                    {exam.institutes.length > 3 && (
                      <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 text-[10px] font-mono font-bold">
                        +{exam.institutes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3.5 border-t border-stone-800 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                <span>View Full Overview</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Modular Course Expansion Blueprint */}
        <div className="bg-[#161412] border border-dashed border-amber-500/40 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">Expansion Roadmap</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                Upcoming Course Expansions (2026–2027)
              </h3>
            </div>
            <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 w-fit">
              Modular Curriculum
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FUTURE_EXPANSIONS.map((exp, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-xs text-white">{exp.title}</h4>
                  <span className="text-[9px] font-mono font-bold uppercase bg-stone-800 px-1.5 py-0.5 rounded text-amber-400">{exp.tag}</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          INTERACTIVE EXAM DETAIL MODAL / POPUP
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeModalExam && (
        <div
          className="fixed inset-0 z-[4000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalExam(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#141210] border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-stone-900 border-b border-stone-800 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {activeModalExam.badge}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {activeModalExam.degree}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {activeModalExam.name}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1">
                  {activeModalExam.oneLiner}
                </p>
              </div>

              <button
                onClick={() => setActiveModalExam(null)}
                className="p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white transition shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-300">
              
              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800">
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Duration</span>
                  <span className="font-mono font-bold text-white">{activeModalExam.duration}</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800">
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Total Marks</span>
                  <span className="font-mono font-bold text-white">{activeModalExam.marks}</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800">
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Questions</span>
                  <span className="font-mono font-bold text-white">{activeModalExam.questions}</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800">
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Official Site</span>
                  <a
                    href={activeModalExam.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-amber-400 hover:underline inline-flex items-center gap-1 text-xs justify-center"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Fellowship Box */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                <strong className="font-extrabold uppercase tracking-wide block text-amber-300">💰 Scholarship &amp; Fellowship:</strong>
                <p className="leading-relaxed">{activeModalExam.stipend}</p>
              </div>

              {/* Participating Campuses */}
              <div>
                <h3 className="font-serif font-bold text-sm text-white mb-2.5">
                  Admitting Premier Campuses ({activeModalExam.institutes.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalExam.institutes.map((inst, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-stone-900 border border-stone-800 text-xs">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>{inst.name}</span>
                        <span className="text-amber-400 font-mono text-[10px]">{inst.location}</span>
                      </div>
                      <p className="text-stone-400 text-[11px] mt-0.5">{inst.highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syllabus Blueprint */}
              <div>
                <h3 className="font-serif font-bold text-sm text-white mb-2.5">
                  Subject Blueprint
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalExam.syllabus.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-stone-900 border border-stone-800 text-xs">
                      <strong className="text-amber-300 block mb-1 font-serif">{s.subject}</strong>
                      <div className="flex flex-wrap gap-1">
                        {s.topics.map((t, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded-md bg-stone-800 border border-stone-700 text-[10px] text-stone-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Horizons */}
              <div>
                <h3 className="font-serif font-bold text-sm text-white mb-2.5">
                  Career &amp; Ph.D. Pathways
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-300">
                  {activeModalExam.careerPaths.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-5 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-stone-400">Free past papers &amp; full mock test series available.</span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/pyq"
                  onClick={() => setActiveModalExam(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-800 border border-stone-700 font-bold text-white hover:bg-stone-700 transition text-center"
                >
                  Solve Free PYQs
                </Link>
                <a
                  href="https://test.vigyanprep.com"
                  onClick={() => setActiveModalExam(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 font-extrabold text-black transition text-center shadow-md"
                >
                  Open Test Portal
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          CONTACT & STUDENT SUPPORT DIRECTORY
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative z-10 py-16 px-6 lg:px-12 max-w-6xl mx-auto scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">Direct Student Support</span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Need Guidance With Tests or Admissions?
          </h3>
          <p className="text-xs sm:text-sm text-stone-400">
            Our academic mentoring team is available 7 days a week for curriculum queries, test series guidance, and fee waivers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <a
            href="tel:+917004283531"
            className="p-5 rounded-3xl bg-[#161412] border border-stone-800 hover:border-amber-500/60 shadow-xl transition group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-white">Phone Advisory</h4>
            <p className="text-amber-400 font-mono font-bold">+91 7004283531</p>
            <span className="text-[10px] text-stone-400">Direct Student Enquiries</span>
          </a>

          <a
            href="mailto:support@vigyanprep.com"
            className="p-5 rounded-3xl bg-[#161412] border border-stone-800 hover:border-amber-500/60 shadow-xl transition group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-white">Email Advisory</h4>
            <p className="text-amber-400 font-mono font-bold">support@vigyanprep.com</p>
            <span className="text-[10px] text-stone-400">2-4 Hours Response Time</span>
          </a>

          <a
            href="https://wa.me/917004283531"
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-3xl bg-[#161412] border border-stone-800 hover:border-emerald-500/60 shadow-xl transition group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-white">WhatsApp Mentorship</h4>
            <p className="text-emerald-400 font-mono font-bold">+91 7004283531</p>
            <span className="text-[10px] text-stone-400">Instant Doubt Clearing</span>
          </a>

          <div className="p-5 rounded-3xl bg-[#161412] border border-stone-800 shadow-xl flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-white">Academic Center</h4>
            <p className="text-stone-300 text-[11px]">VigyanPrep Research Division</p>
            <span className="text-[10px] text-stone-400">Pure Science Entrance Portal</span>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
