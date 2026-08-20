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
  Phone,
  Mail,
  MessageSquare,
  Building2,
  Check,
  ArrowUpRight,
  Sparkles,
  ChevronDown
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

const FAQS = [
  {
    q: "Why is VigyanPrep different from regular JEE/NEET coachings?",
    a: "Mainstream coachings focus entirely on 30-second formula shortcuts and engineering/medical speed tests. Entrance exams for IISER, NISER, ISI, and CMI require multi-step deductive proofs, cross-domain synthesis between 4 subjects, and deep first-principles intuition. VigyanPrep is built exclusively for this pure science curriculum."
  },
  {
    q: "Are the Previous Year Papers (PYQs) really 100% free on VigyanPrep?",
    a: "Yes! All official past year papers for IISER IAT and NISER NEST with full CBT timer simulation and step-by-step verified explanations are completely free for every student."
  },
  {
    q: "Do I need to take both Math and Biology for IISER IAT?",
    a: "IAT evaluates all 4 subjects (Physics, Chemistry, Mathematics, and Biology, 15 questions each). Even students with a PCM or PCB background can secure high ranks by mastering their strong 3 subjects and learning high-yield fundamentals in the 4th subject using our targeted modules."
  },
  {
    q: "What scholarships and stipends do students get upon selection?",
    a: "Admitted students at IISERs, NISER, and IISc typically receive DST INSPIRE-SHE or DAE DISHA fellowships worth ₹60,000/year + ₹20,000/year summer project grants. ISI and CMI provide 100% tuition waivers plus monthly living stipends."
  }
];

export default function AboutPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalExam, setActiveModalExam] = useState<ExamCardData | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
    <div className="min-h-screen bg-[#070709] text-[#f4f4f6] selection:bg-amber-400 selection:text-black font-sans relative overflow-x-hidden">
      <Navbar />

      {/* Atmospheric Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed top-1/3 -right-48 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: HERO HEADER (MODERN DRIBBBLE HERO STAGE)
         ═══════════════════════════════════════════════════════════════════════ */}
      <header className="relative z-10 pt-36 sm:pt-44 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl text-amber-300 text-xs font-mono font-medium tracking-wide shadow-2xl hover:border-amber-400/40 transition">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>The Pure Science &amp; Research Sanctuary</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Built for thinkers who ask <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent italic font-serif">
              Why
            </span>
            , not just <span className="underline decoration-white/20 underline-offset-8 decoration-2">how fast</span>.
          </h1>

          <p className="text-sm sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            VigyanPrep is India&apos;s apex preparation platform designed ground-up for <strong>IISER IAT, NISER NEST, ISI Kolkata, CMI Chennai, and IISc Bangalore</strong> research entrance examinations.
          </p>

          {/* Quick Action CTA Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
            <a
              href="https://test.vigyanprep.com"
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black shadow-[0_0_30px_rgba(251,191,36,0.3)] transition transform hover:-translate-y-0.5 font-extrabold tracking-wide cursor-pointer"
            >
              Launch CBT Test Portal →
            </a>
            <Link
              href="/pyq"
              className="px-6 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition backdrop-blur-md cursor-pointer"
            >
              Solve Free Past Papers
            </Link>
          </div>
        </div>

        {/* 4 Interactive Stat Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl text-center space-y-1 hover:border-amber-400/40 transition">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">12+</span>
            <span className="text-[11px] text-neutral-400 block font-medium">Premier Campuses</span>
          </div>
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl text-center space-y-1 hover:border-amber-400/40 transition">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">₹80k/yr</span>
            <span className="text-[11px] text-neutral-400 block font-medium">INSPIRE &amp; DISHA Stipends</span>
          </div>
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl text-center space-y-1 hover:border-amber-400/40 transition">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">4-in-1</span>
            <span className="text-[11px] text-neutral-400 block font-medium">Physics, Chem, Math, Bio</span>
          </div>
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl text-center space-y-1 hover:border-amber-400/40 transition">
            <span className="text-2xl sm:text-3xl font-black text-orange-400 font-mono tracking-tight">100%</span>
            <span className="text-[11px] text-neutral-400 block font-medium">Free PYQ CBT Engine</span>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: THE PROBLEM VS THE VIGYANPREP MANDATE (SIDE-BY-SIDE)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">The Pure Science Paradigm</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why Standard Coaching Fails Pure Science Aspirants
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card Left: The Traditional Coaching Trap */}
          <div className="p-8 sm:p-10 rounded-3xl bg-red-950/[0.15] border border-red-500/20 backdrop-blur-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                <span>The Commercial Coaching Trap</span>
              </div>
              <h3 className="text-2xl font-bold text-white leading-snug">
                Formula Memorization &amp; Speed-Trick Shortcuts
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                Mainstream coaching factories force millions of students into rote question-pattern drilling designed exclusively for engineering speed tests. When these students encounter non-standard research questions at IISER or proof-writing at ISI/CMI, their memorized shortcuts collapse.
              </p>
            </div>

            <ul className="space-y-3 text-xs text-neutral-300 border-t border-red-500/20 pt-6">
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold">✕</span>
                <span>Ignores biology for PCM students and math for PCB students.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold">✕</span>
                <span>Zero training in subjective proof-writing or multi-statement assertions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold">✕</span>
                <span>Treats pure science and research degrees as a fallback option.</span>
              </li>
            </ul>
          </div>

          {/* Card Right: The VigyanPrep Sanctuary */}
          <div className="p-8 sm:p-10 rounded-3xl bg-amber-950/[0.2] border border-amber-500/30 backdrop-blur-xl space-y-6 flex flex-col justify-between shadow-[0_0_50px_rgba(245,158,11,0.05)]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={13} />
                <span>The VigyanPrep Methodology</span>
              </div>
              <h3 className="text-2xl font-bold text-white leading-snug">
                First-Principles Deduction &amp; Interdisciplinary Harmony
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                We cultivate true scientific thinking. Every problem is solved from fundamental physical postulates, connecting organic reaction kinetics with biological thermodynamics and calculus-driven mechanics.
              </p>
            </div>

            <ul className="space-y-3 text-xs text-neutral-200 border-t border-amber-500/20 pt-6">
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Comprehensive 4-subject balance (Physics + Chem + Math + Bio) tailored for IAT.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Olympiad-grade proof breakdowns for ISI B.Stat/B.Math and CMI.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Direct mentorship towards INSPIRE-SHE &amp; DAE DISHA fellowships.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: THE 4 SCIENTIFIC PILLARS (INTERACTIVE VISUAL CARDS)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">Pedagogical Framework</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Four Core Disciplines
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Handcrafted curriculum designed to link fundamental sciences into a coherent mental model.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1: Physics */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl hover:border-amber-400/50 transition-all duration-300 space-y-4 group">
            <div className="h-32 rounded-2xl bg-stone-900/80 border border-stone-800/80 flex items-center justify-center p-2 group-hover:scale-[1.02] transition">
              <RayOpticsSketch className="w-20 h-20 text-amber-400/80" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">Discipline 01</span>
              <h3 className="text-lg font-bold text-white">Physical Principles</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Rigid body dynamics, electromagnetic field induction, wave optics, and relativistic quantum phenomena.
              </p>
            </div>
          </div>

          {/* Pillar 2: Chemistry */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl hover:border-orange-400/50 transition-all duration-300 space-y-4 group">
            <div className="h-32 rounded-2xl bg-stone-900/80 border border-stone-800/80 flex items-center justify-center p-2 group-hover:scale-[1.02] transition">
              <BenzeneOrbitalSketch className="w-20 h-20 text-orange-400/80" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">Discipline 02</span>
              <h3 className="text-lg font-bold text-white">Molecular Chemistry</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Coordination complexes, stereochemistry, orbital hybridization, and chemical reaction dynamics.
              </p>
            </div>
          </div>

          {/* Pillar 3: Mathematics */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl hover:border-yellow-400/50 transition-all duration-300 space-y-4 group">
            <div className="h-32 rounded-2xl bg-stone-900/80 border border-stone-800/80 flex items-center justify-center p-2 group-hover:scale-[1.02] transition">
              <CalculusIntegralSketch className="w-20 h-20 text-yellow-300/80" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-yellow-300 font-bold uppercase tracking-wider">Discipline 03</span>
              <h3 className="text-lg font-bold text-white">Mathematical Rigor</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Riemann integration, discrete combinatorics, matrix algebra, and Olympiad-grade subjective proof logic.
              </p>
            </div>
          </div>

          {/* Pillar 4: Biology */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl hover:border-emerald-400/50 transition-all duration-300 space-y-4 group">
            <div className="h-32 rounded-2xl bg-stone-900/80 border border-stone-800/80 flex items-center justify-center p-2 group-hover:scale-[1.02] transition">
              <DNAHelixSketch className="w-20 h-20 text-emerald-400/80" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Discipline 04</span>
              <h3 className="text-lg font-bold text-white">Biological Systems</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Recombinant genetics, enzyme kinetics, evolutionary biology, and cellular metabolic pathways.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4: APEX RESEARCH DOSSIERS (DRIBBBLE BENTO GRID)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="exams" className="relative z-10 py-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/[0.08] scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">Research Gateway Dossiers</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
              Target Examinations &amp; Institutes
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Click any gateway below to inspect paper patterns, seat matrices, fellowship values, and syllabus blueprints.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search IAT, NEST, ISI, CMI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition font-mono backdrop-blur-md"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === "all"
                ? "bg-amber-400 text-black shadow-lg font-bold"
                : "bg-white/[0.03] border border-white/10 text-neutral-300 hover:border-white/20"
            }`}
          >
            All Gateways ({EXAMS_LIST.length})
          </button>
          <button
            onClick={() => setSelectedCategory("pure_science")}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === "pure_science"
                ? "bg-amber-400 text-black shadow-lg font-bold"
                : "bg-white/[0.03] border border-white/10 text-neutral-300 hover:border-white/20"
            }`}
          >
            Natural Sciences (IAT, NEST, IISc)
          </button>
          <button
            onClick={() => setSelectedCategory("math_stats")}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === "math_stats"
                ? "bg-amber-400 text-black shadow-lg font-bold"
                : "bg-white/[0.03] border border-white/10 text-neutral-300 hover:border-white/20"
            }`}
          >
            Math &amp; Statistics (ISI)
          </button>
          <button
            onClick={() => setSelectedCategory("cs_physics")}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === "cs_physics"
                ? "bg-amber-400 text-black shadow-lg font-bold"
                : "bg-white/[0.03] border border-white/10 text-neutral-300 hover:border-white/20"
            }`}
          >
            Theoretical CS &amp; Proofs (CMI)
          </button>
        </div>

        {/* Dossier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              onClick={() => setActiveModalExam(exam)}
              className="group cursor-pointer p-7 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/50 backdrop-blur-xl shadow-2xl hover:shadow-[0_0_40px_rgba(245,158,11,0.1)] transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    {exam.badge}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">{exam.duration}</span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    {exam.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed line-clamp-2 font-light">
                    {exam.oneLiner}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3.5 rounded-2xl bg-black/40 border border-white/5 text-xs">
                  <div>
                    <span className="text-neutral-500 text-[10px] uppercase font-bold block">Total Marks</span>
                    <span className="font-mono font-bold text-white">{exam.marks}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 text-[10px] uppercase font-bold block">Questions</span>
                    <span className="font-mono font-bold text-white">{exam.questions.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="text-xs">
                  <span className="font-bold text-neutral-300 block mb-1.5">Elite Campuses:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {exam.institutes.slice(0, 3).map((inst, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-lg bg-white/[0.04] border border-white/10 text-neutral-300 text-[10px] font-mono">
                        {inst.name}
                      </span>
                    ))}
                    {exam.institutes.length > 3 && (
                      <span className="px-2 py-0.5 rounded-lg bg-amber-400/10 text-amber-300 text-[10px] font-mono font-bold">
                        +{exam.institutes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                <span>View Full Blueprint</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5: INTERACTIVE EXAM DETAIL MODAL
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeModalExam && (
        <div
          className="fixed inset-0 z-[5000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalExam(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#101014] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 bg-white/[0.02] border-b border-white/10 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    {activeModalExam.badge}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    {activeModalExam.degree}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeModalExam.name}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
                  {activeModalExam.oneLiner}
                </p>
              </div>

              <button
                onClick={() => setActiveModalExam(null)}
                className="p-2.5 rounded-full bg-white/[0.05] border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-neutral-300">
              
              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <span className="text-[10px] uppercase text-neutral-400 font-bold block">Duration</span>
                  <span className="font-mono font-bold text-white">{activeModalExam.duration}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <span className="text-[10px] uppercase text-neutral-400 font-bold block">Total Marks</span>
                  <span className="font-mono font-bold text-white">{activeModalExam.marks}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <span className="text-[10px] uppercase text-neutral-400 font-bold block">Questions</span>
                  <span className="font-mono font-bold text-white">{activeModalExam.questions}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <span className="text-[10px] uppercase text-neutral-400 font-bold block">Official Portal</span>
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

              {/* Fellowship Callout */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                <strong className="font-extrabold uppercase tracking-wide block text-amber-300">💰 Fellowships &amp; Research Stipends:</strong>
                <p className="leading-relaxed font-light">{activeModalExam.stipend}</p>
              </div>

              {/* Campuses */}
              <div>
                <h3 className="font-bold text-sm text-white mb-2.5">
                  Admitting Premier Institutes ({activeModalExam.institutes.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalExam.institutes.map((inst, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>{inst.name}</span>
                        <span className="text-amber-400 font-mono text-[10px]">{inst.location}</span>
                      </div>
                      <p className="text-neutral-400 text-[11px] font-light leading-relaxed">{inst.highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subject Breakdown */}
              <div>
                <h3 className="font-bold text-sm text-white mb-2.5">
                  Subject Blueprint
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalExam.syllabus.map((s, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs">
                      <strong className="text-amber-300 block mb-1.5 font-bold">{s.subject}</strong>
                      <div className="flex flex-wrap gap-1.5">
                        {s.topics.map((t, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] text-neutral-300">
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
                <h3 className="font-bold text-sm text-white mb-2.5">
                  Global Ph.D. &amp; Research Horizons
                </h3>
                <ul className="space-y-2 text-xs text-neutral-300 font-light">
                  {activeModalExam.careerPaths.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Actions */}
            <div className="p-5 bg-white/[0.02] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-neutral-400">Past papers &amp; test series ready on portal.</span>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Link
                  href="/pyq"
                  onClick={() => setActiveModalExam(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 font-bold text-white hover:bg-white/10 transition text-center"
                >
                  Solve Free PYQs
                </Link>
                <a
                  href="https://test.vigyanprep.com"
                  onClick={() => setActiveModalExam(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 font-extrabold text-black transition text-center shadow-lg"
                >
                  Open CBT Portal
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6: FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto border-t border-white/[0.08]">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">Frequently Asked Questions</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-amber-300 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? "rotate-180 text-amber-400" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-neutral-400 leading-relaxed font-light border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7: DIRECT ADVISORY & SUPPORT DIRECTORY
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative z-10 py-16 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-white/[0.08] scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">Direct Student Advisory</span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Speak Directly With Mentors
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Reach out 7 days a week for curriculum queries, test series guidance, or fee waiver support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <a
            href="tel:+917004283531"
            className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/60 shadow-xl transition group flex flex-col items-center text-center space-y-2.5"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">Phone Advisory</h4>
            <p className="text-amber-400 font-mono font-bold">+91 7004283531</p>
            <span className="text-[10px] text-neutral-500">Mon-Sun • 9 AM - 9 PM</span>
          </a>

          <a
            href="mailto:support@vigyanprep.com"
            className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/60 shadow-xl transition group flex flex-col items-center text-center space-y-2.5"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">Email Helpdesk</h4>
            <p className="text-amber-400 font-mono font-bold">support@vigyanprep.com</p>
            <span className="text-[10px] text-neutral-500">2-4 Hours Response Time</span>
          </a>

          <a
            href="https://wa.me/917004283531"
            target="_blank"
            rel="noreferrer"
            className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-400/60 shadow-xl transition group flex flex-col items-center text-center space-y-2.5"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">WhatsApp Mentorship</h4>
            <p className="text-emerald-400 font-mono font-bold">+91 7004283531</p>
            <span className="text-[10px] text-neutral-500">Direct Chat with Counselors</span>
          </a>

          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] shadow-xl flex flex-col items-center text-center space-y-2.5">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.05] text-neutral-300 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">Academic Center</h4>
            <p className="text-neutral-300 text-xs">VigyanPrep Pure Science Division</p>
            <span className="text-[10px] text-neutral-500">New Delhi • India</span>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
