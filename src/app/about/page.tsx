"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  BookOpen,
  ArrowRight,
  X,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Phone,
  Mail,
  MessageSquare,
  Building2,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  Layers,
  Award,
  Zap,
  Globe2,
  ShieldCheck,
  Clock,
  Sparkles,
  Check,
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
    oneLiner: "The premier gateway to all 7 IISERs, IISc Bangalore, and IIT Madras BS Medical Sciences.",
    whyChosen:
      "Standard coaching ignores IAT to focus on JEE/NEET. We built VigyanPrep specifically to train aspirants in the deep conceptual reasoning and 4-subject balance that IAT requires.",
    institutes: [
      { name: "IISER Pune", location: "Maharashtra", highlight: "Top-ranked science hub • World-leading quantum materials & chemical biology" },
      { name: "IISER Kolkata", location: "West Bengal", highlight: "Center of Excellence in Space Sciences (CESSI) & Earth systems" },
      { name: "IISER Mohali", location: "Punjab", highlight: "NMR spectroscopy, structural biophysics & quantum computing" },
      { name: "IISER Bhopal", location: "Madhya Pradesh", highlight: "Natural Sciences, Data Science & Engineering Sciences" },
      { name: "IISER Thiruvananthapuram", location: "Kerala", highlight: "Materials science, ecology & oceanic research labs" },
      { name: "IISER Tirupati", location: "Andhra Pradesh", highlight: "Biophysics, cancer biology & climate systems" },
      { name: "IISER Berhampur", location: "Odisha", highlight: "Coastal ecology, materials & high-energy physics" },
      { name: "IISc Bangalore", location: "Karnataka", highlight: "Admissions via top IAT rankers (Top ~150-250 AIR)" },
      { name: "IIT Madras", location: "Tamil Nadu", highlight: "BS in Medical Sciences & Engineering through IAT channel" },
    ],
    pattern: [
      { subject: "Physics", count: "15 Qs", marks: "60 Marks" },
      { subject: "Chemistry", count: "15 Qs", marks: "60 Marks" },
      { subject: "Mathematics", count: "15 Qs", marks: "60 Marks" },
      { subject: "Biology", count: "15 Qs", marks: "60 Marks" },
    ],
    syllabus: [
      { subject: "Physics", topics: ["Classical Mechanics", "Electromagnetism & Waves", "Thermodynamics", "Modern & Nuclear Physics"] },
      { subject: "Chemistry", topics: ["Chemical Bonding & Structure", "Organic Mechanisms", "Thermodynamics & Kinetics", "Coordination Chemistry"] },
      { subject: "Mathematics", topics: ["Calculus & Integrals", "Vectors & 3D Geometry", "Probability & Matrices", "Complex Numbers & Series"] },
      { subject: "Biology", topics: ["Cellular & Molecular Genetics", "Human Physiology", "Plant Biology", "Ecology & Evolution"] },
    ],
    careerPaths: [
      "Direct fully funded Ph.D. admissions at MIT, Harvard, Max Planck, Cambridge, and ETH Zürich.",
      "Scientist & Research Officer appointments at ISRO, DRDO, BARC, and TIFR.",
      "Frontier industry R&D in Quantum Computing, Biotech, Nanotech, and AI Research.",
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
    negativeMarking: "MCQ: +2.5 / -1 • MSQ: Partial credit with NO negative marks",
    stipend: "DAE DISHA Scholarship (₹60,000/yr + ₹20,000/yr Summer Project Grant to ALL students)",
    oneLiner: "Direct entry to NISER Bhubaneswar & UM-DAE CEBS Mumbai with direct BARC interview opportunities.",
    whyChosen:
      "NEST features non-standard multiple-correct questions and a unique 'Best 3 of 4' scoring rule. We provide authentic exam simulation and SMAS cutoff predictors.",
    institutes: [
      { name: "NISER Bhubaneswar", location: "Odisha", highlight: "Apex autonomous research institute funded by Department of Atomic Energy (DAE)" },
      { name: "UM-DAE CEBS Mumbai", location: "Maharashtra", highlight: "Located inside Kalina campus in direct research partnership with BARC and TIFR" },
    ],
    pattern: [
      { subject: "Physics", count: "17 Qs", marks: "60 Marks (Best 3 scored)" },
      { subject: "Chemistry", count: "17 Qs", marks: "60 Marks (Best 3 scored)" },
      { subject: "Mathematics", count: "17 Qs", marks: "60 Marks (Best 3 scored)" },
      { subject: "Biology", count: "17 Qs", marks: "60 Marks (Best 3 scored)" },
    ],
    syllabus: [
      { subject: "Physics", topics: ["Rotational Motion & Gravity", "Electromagnetic Induction", "Optics & Interference", "Fluid & Modern Physics"] },
      { subject: "Chemistry", topics: ["Coordination Chemistry", "Reaction Kinetics", "Organic Synthesis", "Electrochemistry"] },
      { subject: "Mathematics", topics: ["Combinatorics & Series", "Definite Integrals", "Vectors & Coordinate Geometry", "Probability"] },
      { subject: "Biology", topics: ["Biomolecules & Enzymes", "Genetics & Recombinant DNA", "Physiology", "Ecology & Systematics"] },
    ],
    careerPaths: [
      "Direct interview eligibility for Scientific Officer (Grade C) in Bhabha Atomic Research Centre (BARC).",
      "Funded Ph.D. positions at CERN (Geneva), DESY, and top European science institutes.",
      "Frontier careers in Nuclear Fusion, Astrophysics, and Radiation Biology.",
    ],
    officialLink: "https://nestexam.in",
  },
  {
    id: "isi",
    code: "EXAM-03",
    name: "Indian Statistical Institute (ISI) Admission Test",
    shortName: "ISI B.Stat / B.Math",
    category: "math_stats",
    badge: "Elite Mathematics & Stats",
    degree: "B.Stat (Hons) at Kolkata / B.Math (Hons) at Bengaluru",
    duration: "4 Hours (UGA 2 hrs + UGB 2 hrs)",
    marks: "100 Objective + 100 Subjective Proofs",
    questions: "30 Objective (UGA) + 8 Proofs (UGB)",
    negativeMarking: "UGA: +4 / -1 • UGB: Graded on proof logic & mathematical rigor",
    stipend: "100% Free Tuition + ₹5,000/month Stipend + Annual Contingency Allowance",
    oneLiner: "The world's gold standard in mathematical statistics, probability theory, and quantitative proofs.",
    whyChosen:
      "ISI cannot be cracked with speed shortcuts. It demands proof writing and Olympiad-level logic. We offer full subjective step-by-step solution breakdowns.",
    institutes: [
      { name: "ISI Kolkata", location: "West Bengal", highlight: "Birthplace of Indian statistics • Flagship B.Stat (Hons) program" },
      { name: "ISI Bengaluru", location: "Karnataka", highlight: "World-class center for Pure Mathematics & Probability • B.Math (Hons)" },
      { name: "ISI Delhi", location: "New Delhi", highlight: "Premier hub for Quantitative Economics & Operations Research" },
    ],
    pattern: [
      { subject: "Forenoon (UGA)", count: "30 Qs", marks: "100 Marks (Objective MCQ)" },
      { subject: "Afternoon (UGB)", count: "8 Proofs", marks: "100 Marks (Subjective Proofs)" },
    ],
    syllabus: [
      { subject: "Algebra & Number Theory", topics: ["Modular Arithmetic & Primes", "Polynomials & Roots", "Inequalities (AM-GM, Cauchy)", "Matrices & Equations"] },
      { subject: "Combinatorics & Graph", topics: ["Pigeonhole Principle", "Generating Functions", "Recurrence Relations", "Combinatorial Proofs"] },
      { subject: "Geometry & Trig", topics: ["Euclidean Theorems", "Conic Sections", "Complex Geometry", "Trigonometric Proofs"] },
      { subject: "Calculus & Analysis", topics: ["Limits & Differentiability", "Monotonicity & Convexity", "Riemann Integrals", "Sequences & Series"] },
    ],
    careerPaths: [
      "Quantitative Research & High-Frequency Trading at top hedge funds (Jane Street, Citadel, Jump).",
      "Direct Ph.D. in Pure Mathematics or Statistics at Princeton, Stanford, Harvard, and Cambridge.",
      "Frontier Machine Learning and Cryptography research at Google DeepMind, OpenAI, and Meta.",
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
    negativeMarking: "Part A: Objective • Part B: Generous credit for valid mathematical steps",
    stipend: "Full Tuition Fee Waiver & Monthly Scholarship of ₹5,000/month",
    oneLiner: "India's apex center for pure mathematics, theoretical computer science, and algorithms.",
    whyChosen:
      "CMI values how you think over how many formulas you memorized. We provide structured proof walkthroughs and algorithmic intuition training.",
    institutes: [
      { name: "CMI Chennai", location: "Siruseri, Tamil Nadu", highlight: "Internationally renowned for algebraic geometry, automata theory & algorithms" },
    ],
    pattern: [
      { subject: "Part A (Objective)", count: "10 Qs", marks: "40 Marks" },
      { subject: "Part B (Proofs)", count: "6 Proofs", marks: "60 Marks" },
    ],
    syllabus: [
      { subject: "Discrete Math & Logic", topics: ["Induction & Invariants", "Pigeonhole Principle", "Graph Theory & Trees", "Boolean Logic"] },
      { subject: "Algebra & Number Theory", topics: ["Polynomial Equations", "Modular Arithmetic", "Functional Equations", "Inequalities"] },
      { subject: "Calculus & Geometry", topics: ["Derivatives & Max-Min", "Definite Integrals", "Analytic Geometry", "Complex Numbers"] },
    ],
    careerPaths: [
      "Ph.D. in Theoretical Computer Science, Quantum Computing, and Pure Math at MIT, Stanford, and INRIA.",
      "Core Algorithm Engineer & Research Scientist at DeepMind, Microsoft Research, and Google.",
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
    questions: "Follows respective exam",
    negativeMarking: "Follows respective exam",
    stipend: "INSPIRE-SHE (₹80,000/yr) & IISc Institutional Merit Scholarships",
    oneLiner: "India's highest-ranked research institution for interdisciplinary natural and mathematical sciences.",
    whyChosen:
      "With IISc adopting IAT as a core undergraduate admission channel, VigyanPrep provides the high-percentile test sets needed to secure an IISc seat.",
    institutes: [
      { name: "IISc Bangalore", location: "Karnataka", highlight: "NIRF Rank #1 • Over 40 research departments and interdisciplinary labs" },
    ],
    pattern: [
      { subject: "Mode 1: IAT Channel", count: "60 Qs", marks: "Top ~150 AIR" },
      { subject: "Mode 2: JEE Adv Channel", count: "Official", marks: "Top ~250 AIR" },
      { subject: "Mode 3: NEET Channel", count: "Official", marks: "Top ~100 AIR" },
    ],
    syllabus: [
      { subject: "Interdisciplinary Sciences", topics: ["Classical & Modern Physics", "Physical & Organic Chemistry", "Higher Mathematics", "Cellular & Molecular Biology"] },
    ],
    careerPaths: [
      "Direct fast-track Ph.D. admissions at MIT, Stanford, Harvard, Cambridge, and Max Planck.",
      "Lead Research Scientist roles at ISRO, DAE, DRDO, and national labs.",
      "Leadership in Deep-Tech Startups, Bio-Pharmaceuticals, and Space Ventures.",
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
    <div className="min-h-screen bg-[#f8f6f0] text-[#1c1815] selection:bg-amber-400 selection:text-black font-sans relative overflow-x-hidden">
      <Navbar />

      {/* Subtle Warm Grid Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-30 bg-[linear-gradient(to_right,#e5dec9_1px,transparent_1px),linear-gradient(to_bottom,#e5dec9_1px,transparent_1px)] [background-size:32px_32px] z-0" />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO: FRESH, PUNCHY, PHRASE-DRIVEN INTRODUCTION
         ═══════════════════════════════════════════════════════════════════════ */}
      <header className="relative z-10 pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Top Tag Pill */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>The Pure Science Sanctuary</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1c1815] tracking-tight leading-[1.15] mb-4">
            What is <span className="text-amber-600 underline decoration-amber-400 decoration-wavy decoration-2">VigyanPrep</span>?
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed">
            India&apos;s dedicated platform built ground-up for <strong>IISER, NISER, ISI, CMI, and IISc</strong> research entrance examinations.
          </p>
        </div>

        {/* 2-Column Hero Card: Sanskrit Meaning & Campus Sketch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Sanskrit Etymology Card */}
          <div className="lg:col-span-6 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-700 font-extrabold block mb-2">
                Sanskrit Etymology
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1815]">
                विज्ञान (Vi-Gyan)
              </h2>
              <p className="text-xs text-neutral-500 mt-1 font-mono">
                [ Empirical Science Tested Through First Principles ]
              </p>
            </div>

            {/* Vi & Gyan Chips */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                  वि
                </span>
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">Vi (वि) — Empirical &amp; Discerning</h3>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Knowledge that is not memorized blindly, but proven through rigorous experimentation and mathematical deduction.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200/80 flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-orange-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                  ज्ञान
                </span>
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">Gyan (ज्ञान) — Pure Conceptual Truth</h3>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Deep understanding of the fundamental laws governing matter, energy, space, and life.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-500 italic border-l-2 border-amber-600 pl-3">
              &ldquo;We added <strong>Prep</strong> because our sole focus is preparing India&apos;s next generation of scientists and mathematicians.&rdquo;
            </p>
          </div>

          {/* Right: Visual Sketch & Highlights */}
          <div className="lg:col-span-6 bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative h-56 sm:h-64 w-full bg-neutral-100">
              <Image
                src="/images/sketch-university-campus.jpg"
                alt="University research campus sketch"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-500 text-black px-2 py-0.5 rounded-full">
                  Premier Research Hubs
                </span>
                <h3 className="text-lg font-bold mt-1 drop-shadow">
                  IISERs • NISER • ISI • CMI • IISc
                </h3>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="p-6 grid grid-cols-3 gap-3 text-center border-t border-neutral-100 bg-[#fbfaf7]">
              <div>
                <span className="text-lg font-extrabold text-amber-700 block">7 IISERs</span>
                <span className="text-[11px] text-neutral-500 font-medium">All Campuses</span>
              </div>
              <div className="border-x border-neutral-200">
                <span className="text-lg font-extrabold text-amber-700 block">₹0 Fee</span>
                <span className="text-[11px] text-neutral-500 font-medium">Free PYQ Papers</span>
              </div>
              <div>
                <span className="text-lg font-extrabold text-amber-700 block">100% CBT</span>
                <span className="text-[11px] text-neutral-500 font-medium">NTA Engine</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHY CHOOSE PURE SCIENCE: PHRASE-DRIVEN HIGHLIGHTS
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-extrabold">Why We Exist</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1c1815] mt-1">
            Built for Pure Science, Not Rote Coaching
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-2 hover:border-amber-400 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Atom className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#1c1815]">Exclusively Pure Science</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              No JEE/NEET leftovers. Every mock test and solution is built specifically for IAT, NEST, ISI, and CMI exam blueprints.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-2 hover:border-amber-400 transition">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#1c1815]">First-Principles Logic</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              No 30-second formula cramming. We train you in rigorous proofs, multi-step derivations, and conceptual deduction.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-2 hover:border-amber-400 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#1c1815]">Fully Funded Stipends</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Admitted students receive INSPIRE &amp; DAE DISHA fellowships of ₹60,000 to ₹80,000/yr + summer research grants.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-2 hover:border-amber-400 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#1c1815]">Global Ph.D. Horizons</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Direct pipelines to fully funded doctoral programs at Harvard, MIT, Max Planck, Cambridge, CERN, and ETH Zürich.
            </p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          INTERACTIVE EXAM DIRECTORY (CLICK FOR DEEP DIVE MODAL)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="exams" className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-5 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-700 font-extrabold">All Supported Exams</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1c1815] mt-1">
              Explore Research Entrance Exams
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Click any exam card below to see detailed paper pattern, seat matrix, syllabus topics, and fellowships.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search IAT, NEST, ISI, CMI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-amber-500 transition shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-amber-500 text-black shadow-sm font-bold"
                : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300"
            }`}
          >
            All Exams ({EXAMS_LIST.length})
          </button>
          <button
            onClick={() => setSelectedCategory("pure_science")}
            className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === "pure_science"
                ? "bg-amber-500 text-black shadow-sm font-bold"
                : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300"
            }`}
          >
            Pure Sciences (IAT, NEST, IISc)
          </button>
          <button
            onClick={() => setSelectedCategory("math_stats")}
            className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === "math_stats"
                ? "bg-amber-500 text-black shadow-sm font-bold"
                : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300"
            }`}
          >
            Math &amp; Statistics (ISI)
          </button>
          <button
            onClick={() => setSelectedCategory("cs_physics")}
            className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === "cs_physics"
                ? "bg-amber-500 text-black shadow-sm font-bold"
                : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300"
            }`}
          >
            Theoretical CS &amp; Math (CMI)
          </button>
        </div>

        {/* Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              onClick={() => setActiveModalExam(exam)}
              className="group cursor-pointer bg-white border border-neutral-200 hover:border-amber-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    {exam.badge}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">{exam.duration}</span>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-[#1c1815] group-hover:text-amber-700 transition-colors">
                    {exam.name}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed line-clamp-2">
                    {exam.oneLiner}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-[11px]">
                  <div>
                    <span className="text-neutral-500 block">Total Marks</span>
                    <span className="font-bold text-neutral-800">{exam.marks}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Questions</span>
                    <span className="font-bold text-neutral-800">{exam.questions.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500">
                  <span className="font-bold text-neutral-700 block mb-1">Target Institutes:</span>
                  <div className="flex flex-wrap gap-1">
                    {exam.institutes.slice(0, 3).map((inst, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 text-[10px]">
                        {inst.name}
                      </span>
                    ))}
                    {exam.institutes.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold">
                        +{exam.institutes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-800">
                <span>View Full Overview</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Modular Course Expansion Blueprint */}
        <div className="bg-white border border-dashed border-amber-400 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-700 font-extrabold">Roadmap</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1c1815] mt-0.5">
                Upcoming Course Expansions (2026–2027)
              </h3>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 w-fit">
              Modular Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FUTURE_EXPANSIONS.map((exp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-neutral-900">{exp.title}</h4>
                  <span className="text-[9px] font-bold uppercase bg-white px-1.5 py-0.5 rounded border border-neutral-200 text-neutral-600">{exp.tag}</span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed">{exp.desc}</p>
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
          className="fixed inset-0 z-[4000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalExam(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-neutral-50 border-b border-neutral-200 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    {activeModalExam.badge}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    {activeModalExam.degree}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1815]">
                  {activeModalExam.name}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                  {activeModalExam.oneLiner}
                </p>
              </div>

              <button
                onClick={() => setActiveModalExam(null)}
                className="p-2 rounded-full bg-white border border-neutral-200 text-neutral-500 hover:bg-neutral-100 transition shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-neutral-700">
              
              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] uppercase text-neutral-500 block">Duration</span>
                  <span className="font-bold text-neutral-900">{activeModalExam.duration}</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] uppercase text-neutral-500 block">Total Marks</span>
                  <span className="font-bold text-neutral-900">{activeModalExam.marks}</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] uppercase text-neutral-500 block">Questions</span>
                  <span className="font-bold text-neutral-900">{activeModalExam.questions}</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[10px] uppercase text-neutral-500 block">Official Site</span>
                  <a
                    href={activeModalExam.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-amber-700 hover:underline inline-flex items-center gap-1 text-xs justify-center"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Fellowship Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <strong className="font-extrabold uppercase tracking-wide block">💰 Scholarship &amp; Fellowship:</strong>
                <p>{activeModalExam.stipend}</p>
              </div>

              {/* Participating Campuses */}
              <div>
                <h3 className="font-bold text-base text-neutral-900 mb-2">
                  Admitting Premier Campuses ({activeModalExam.institutes.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalExam.institutes.map((inst, i) => (
                    <div key={i} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                      <div className="flex items-center justify-between font-bold text-neutral-900">
                        <span>{inst.name}</span>
                        <span className="text-amber-700 font-normal text-[10px]">{inst.location}</span>
                      </div>
                      <p className="text-neutral-500 text-[11px] mt-0.5">{inst.highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syllabus Breakdown */}
              <div>
                <h3 className="font-bold text-base text-neutral-900 mb-2">
                  Subject Blueprint
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalExam.syllabus.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                      <strong className="text-neutral-900 block mb-1">{s.subject}</strong>
                      <div className="flex flex-wrap gap-1">
                        {s.topics.map((t, tIdx) => (
                          <span key={tIdx} className="px-1.5 py-0.5 rounded bg-white border border-neutral-200 text-[10px] text-neutral-600">
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
                <h3 className="font-bold text-base text-neutral-900 mb-2">
                  Career &amp; Ph.D. Pathways
                </h3>
                <ul className="space-y-1.5 text-xs text-neutral-600">
                  {activeModalExam.careerPaths.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-neutral-500">Free past papers &amp; full mock test series available.</span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/pyq"
                  onClick={() => setActiveModalExam(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white border border-neutral-300 font-bold text-neutral-700 hover:bg-neutral-100 transition text-center"
                >
                  Solve PYQs
                </Link>
                <Link
                  href="/tests"
                  onClick={() => setActiveModalExam(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 font-bold text-black transition text-center shadow-sm"
                >
                  Buy Test Series
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          CONTACT & STUDENT SUPPORT DIRECTORY
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-neutral-200 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-extrabold">Student Support</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1c1815] mt-1">
            Need Help With Tests or Courses?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Our academic support team is available 7 days a week to help with exam questions, fee waivers, and technical queries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <a
            href="tel:+917004283531"
            className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-amber-500 shadow-sm transition group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-neutral-900">Phone Support</h4>
            <p className="text-amber-700 font-mono font-bold">+91 7004283531</p>
            <span className="text-[10px] text-neutral-400">Direct Student Enquiries</span>
          </a>

          <a
            href="mailto:support@vigyanprep.com"
            className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-amber-500 shadow-sm transition group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-neutral-900">Email Support</h4>
            <p className="text-amber-700 font-mono font-bold">support@vigyanprep.com</p>
            <span className="text-[10px] text-neutral-400">2-4 Hours Response Time</span>
          </a>

          <a
            href="https://wa.me/917004283531"
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-emerald-500 shadow-sm transition group flex flex-col items-center text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-neutral-900">WhatsApp Help</h4>
            <p className="text-emerald-700 font-mono font-bold">+91 7004283531</p>
            <span className="text-[10px] text-neutral-400">Instant Doubt Clearing</span>
          </a>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-neutral-900">Academic Hub</h4>
            <p className="text-neutral-600 text-[11px]">Vigyan Prep Education</p>
            <span className="text-[10px] text-neutral-400">Pure Science Entrance Portal</span>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
