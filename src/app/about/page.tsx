"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  BookOpen,
  GraduationCap,
  Sparkles,
  Layers,
  Award,
  ArrowRight,
  X,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Phone,
  Mail,
  MessageSquare,
  Building2,
  Atom,
  Binary,
  Compass,
  Cpu,
  Globe2,
  FlaskConical,
  Microscope,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface ExamDetails {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  category: "pure_science" | "math_stats" | "cs_physics" | "upcoming";
  tagline: string;
  organizer: string;
  degreeAwarded: string;
  duration: string;
  totalMarks: number | string;
  questionCount: number | string;
  patternSummary: string;
  negativeMarking: string;
  stipendInfo: string;
  institutes: { name: string; location: string; highlight: string }[];
  overview: string;
  whyChosen: string;
  keySubjects: string[];
  syllabusBreakdown: { subject: string; keyTopics: string[]; weightage: string }[];
  careerHorizons: string[];
  vigyanAdvantage: string[];
  officialUrl: string;
  pyqAvailable: boolean;
}

const EXAMS_DATABASE: ExamDetails[] = [
  {
    id: "iat",
    name: "IISER Aptitude Test (IAT)",
    shortName: "IISER IAT",
    badge: "Flagship Pure Science",
    category: "pure_science",
    tagline: "The Premier Gateway to India's 7 Indian Institutes of Science Education & Research and IISc Bangalore",
    organizer: "Joint Admissions Committee (JAC) / IISERs",
    degreeAwarded: "5-Year BS-MS Dual Degree & 4-Year BS (Research)",
    duration: "180 Minutes (3 Hours)",
    totalMarks: 240,
    questionCount: "60 Questions (15 per subject)",
    patternSummary: "Physics (15), Chemistry (15), Mathematics (15), Biology (15). Single Correct MCQ.",
    negativeMarking: "+4 for correct, -1 for incorrect, 0 for unattempted",
    stipendInfo: "INSPIRE-SHE & DISHA Scholarships (₹60,000/year + ₹20,000 research contingency)",
    institutes: [
      { name: "IISER Pune", location: "Maharashtra", highlight: "NIRF Top Science Hub • World-leading Physics & Chemical Biology" },
      { name: "IISER Kolkata", location: "West Bengal", highlight: "Centre of Excellence in Space Sciences (CESSI) & Earth Sciences" },
      { name: "IISER Mohali", location: "Punjab", highlight: "Pioneering Quantum Computing, Structural Biology & Nano-Science" },
      { name: "IISER Bhopal", location: "Madhya Pradesh", highlight: "BS in Engineering Sciences, Data Science & Natural Sciences" },
      { name: "IISER Thiruvananthapuram", location: "Kerala", highlight: "Advanced Materials & Ocean Science Research Labs" },
      { name: "IISER Tirupati", location: "Andhra Pradesh", highlight: "Ecology, Biophysics & Interdisciplinary Research Centre" },
      { name: "IISER Berhampur", location: "Odisha", highlight: "Coastal Ecology, Materials & High-Energy Physics" },
      { name: "IISc Bangalore (BS Research)", location: "Karnataka", highlight: "Admissions via IAT channel (Rank ~ Top 100-250)" },
      { name: "IIT Madras (BS Medical Science)", location: "Tamil Nadu", highlight: "Admissions through IAT for interdisciplinary medical research" },
    ],
    overview:
      "The IISER Aptitude Test (IAT) is India's most prestigious entrance examination for school leavers passionate about fundamental sciences. Unlike conventional engineering tests that reward speed and mechanical calculations, IAT tests deep conceptual intuition, first-principles logic, and interdisciplinary problem-solving across Physics, Chemistry, Mathematics, and Biology.",
    whyChosen:
      "VigyanPrep was created primarily because standard coaching institutes treat IAT as an afterthought behind JEE and NEET. We offer rigorous, proctored mock testing, authentic previous year papers, and PhD-level analytical solutions tailored specifically to the IAT examination blueprint.",
    keySubjects: ["Physics (15 Qs)", "Chemistry (15 Qs)", "Mathematics (15 Qs)", "Biology (15 Qs)"],
    syllabusBreakdown: [
      {
        subject: "Physics",
        keyTopics: ["Mechanics & Rotational Dynamics", "Electromagnetism & Waves", "Thermodynamics & Kinetic Theory", "Optics & Modern Physics"],
        weightage: "25% (60 Marks)",
      },
      {
        subject: "Chemistry",
        keyTopics: ["Chemical Bonding & Periodic Trends", "Organic Reaction Mechanisms", "Chemical Kinetics & Equilibrium", "Coordination Compounds"],
        weightage: "25% (60 Marks)",
      },
      {
        subject: "Mathematics",
        keyTopics: ["Calculus & Differential Equations", "Vectors & 3D Geometry", "Combinatorics & Probability", "Matrices & Complex Numbers"],
        weightage: "25% (60 Marks)",
      },
      {
        subject: "Biology",
        keyTopics: ["Genetics & Molecular Biology", "Cell Structure & Biochemistry", "Ecology & Evolution", "Human & Plant Physiology"],
        weightage: "25% (60 Marks)",
      },
    ],
    careerHorizons: [
      "Direct Ph.D. admissions with full fellowships at Harvard, MIT, Cambridge, Max Planck, Oxford, ETH Zürich & Caltech",
      "Scientist & Research Officer positions at ISRO, DRDO, BARC, TIFR, and CSIR National Laboratories",
      "High-impact R&D roles in Quantum Computing, Semiconductor Nanotech, Artificial Intelligence, and Biotech",
      "Quantitative Modeling, Data Science, and algorithmic research roles in global analytical institutions",
    ],
    vigyanAdvantage: [
      "NTA-standard zero-distraction black proctored test engine replicating the exact official CBT environment",
      "Comprehensive chapter-wise and full-length PYQ tests covering 2017 to 2025 with step-by-step mathematical proofs",
      "Balanced PCM / PCB strategy modules designed to help single-stream students maximize their 4th subject score",
      "Instant percentile analytics, weak-area diagnostic mapping, and question-level peer difficulty metrics",
    ],
    officialUrl: "https://iiseradmission.in",
    pyqAvailable: true,
  },
  {
    id: "nest",
    name: "National Entrance Screening Test (NEST)",
    shortName: "NISER NEST",
    badge: "Atomic Energy Research",
    category: "pure_science",
    tagline: "India's Apex Entrance for Atomic Energy-Backed Integrated M.Sc. Programs at NISER and UM-DAE CEBS",
    organizer: "National Institute of Science Education and Research (NISER) & DAE",
    degreeAwarded: "5-Year Integrated M.Sc. in Physics, Chemistry, Mathematics, Biology",
    duration: "210 Minutes (3.5 Hours)",
    totalMarks: 180,
    questionCount: "68 Questions (17 per section, Best 3 of 4 scored)",
    patternSummary: "4 Subject Sections (Physics, Chemistry, Maths, Biology). Total score is calculated from the BEST 3 subject scores (60 marks each = 180).",
    negativeMarking: "MCQs: +2.5 for correct, -1 for incorrect. MSQs (Multiple Correct): Partial marking with NO negative marking.",
    stipendInfo: "DAE DISHA Fellowship of ₹60,000/year (₹5,000/month) + ₹20,000/year Summer Project Contingency Grant to ALL enrolled students",
    institutes: [
      { name: "NISER Bhubaneswar", location: "Odisha", highlight: "Autonomous Institute under Department of Atomic Energy (DAE) • World-class High Energy & Nuclear Physics Labs" },
      { name: "UM-DAE CEBS Mumbai", location: "Maharashtra", highlight: "University of Mumbai - DAE Centre for Excellence in Basic Sciences • Located inside Kalina Campus with direct BARC research synergy" },
    ],
    overview:
      "NEST is conducted collaboratively by NISER Bhubaneswar and UM-DAE CEBS Mumbai for students seeking direct entry into high-end nuclear, atomic, basic science, and energy research. Graduates of NISER and CEBS have direct interview opportunities for recruitment as Scientific Officer (Grade C) at the Bhabha Atomic Research Centre (BARC) and DAE units.",
    whyChosen:
      "NEST questions are famous for their analytical depth, non-standard conceptual framing, and multiple-correct question rigor. VigyanPrep equips aspirants with precise test series designed by NISER alumni and researchers to crack NEST's unique Section-wise Minimum Admissible Score (SMAS).",
    keySubjects: ["Physics (17 Qs)", "Chemistry (17 Qs)", "Mathematics (17 Qs)", "Biology (17 Qs)"],
    syllabusBreakdown: [
      {
        subject: "Physics",
        keyTopics: ["Rotational Mechanics & Gravitation", "Electromagnetic Induction & Modern Physics", "Wave Optics & Interference", "Fluid Dynamics & Thermodynamics"],
        weightage: "60 Marks (Best 3 scored)",
      },
      {
        subject: "Chemistry",
        keyTopics: ["Coordination Chemistry & Transition Elements", "Thermodynamics & Reaction Kinetics", "Organic Reaction Pathways & Biomolecules", "Surface Chemistry & Electrochemistry"],
        weightage: "60 Marks (Best 3 scored)",
      },
      {
        subject: "Mathematics",
        keyTopics: ["Combinatorics, Sequences & Series", "Definite Integrals & Differential Equations", "Analytical Geometry & Vectors", "Probability & Matrices"],
        weightage: "60 Marks (Best 3 scored)",
      },
      {
        subject: "Biology",
        keyTopics: ["Biochemistry & Enzymology", "Cellular & Molecular Genetics", "Physiology & Homeostasis", "Ecology & Systematics"],
        weightage: "60 Marks (Best 3 scored)",
      },
    ],
    careerHorizons: [
      "Direct interview eligibility for Scientific Officer (Group A / Grade C) in Bhabha Atomic Research Centre (BARC) and DAE units",
      "Funded Ph.D. programs at top European (Max Planck, CERN, DESY) and American Ivy League scientific universities",
      "Frontier careers in Nuclear Energy, Astrophysics, Radiation Biology, and Quantum Materials",
    ],
    vigyanAdvantage: [
      "Targeted SMAS (Section-wise Minimum Admissible Score) and MAS calculation engine for exact rank prediction",
      "Full coverage of multi-select (MSQ) questions with exact official partial marking rules",
      "Curated test sets specifically calibrated to NEST's 3.5-hour endurance requirement",
    ],
    officialUrl: "https://nestexam.in",
    pyqAvailable: true,
  },
  {
    id: "isi",
    name: "Indian Statistical Institute Admission Test",
    shortName: "ISI B.Stat / B.Math",
    badge: "Elite Mathematics & Statistics",
    category: "math_stats",
    tagline: "The World's Gold Standard in Mathematical Statistics, Probability Theory, and Analytic Mastery",
    organizer: "Indian Statistical Institute (ISI Kolkata & Bengaluru)",
    degreeAwarded: "Bachelor of Statistics (Hons) at Kolkata / Bachelor of Mathematics (Hons) at Bengaluru",
    duration: "4 Hours (2 Hours Objective UGA + 2 Hours Subjective Proofs UGB)",
    totalMarks: "100 (UGA: 30 Qs) + 100 (UGB: 8 Descriptive Proofs)",
    questionCount: "30 Objective + 8 Subjective Proof Questions",
    patternSummary: "Forenoon: Multiple Choice (UGA) 30 Questions. Afternoon: Subjective Proof-Writing (UGB) 8 Questions requiring rigorous mathematical justification.",
    negativeMarking: "UGA: +4 for correct, -1 for incorrect. UGB: Descriptive marking based on clarity and correctness of proofs.",
    stipendInfo: "100% Tuition Waiver + ₹5,000/month Monthly Fellowship + Annual Contingency Allowance to all admitted students",
    institutes: [
      { name: "ISI Kolkata", location: "West Bengal", highlight: "Birthplace of Modern Statistics in India • Flagship B.Stat (Hons) program" },
      { name: "ISI Bengaluru", location: "Karnataka", highlight: "Centre for Pure Mathematics, Probability & Theoretical Computer Science • B.Math (Hons)" },
      { name: "ISI Delhi", location: "New Delhi", highlight: "Premier Centre for Quantitative Economics, Statistical Computing & Optimization" },
    ],
    overview:
      "Founded by Professor P.C. Mahalanobis, the Indian Statistical Institute is universally acclaimed as one of the world's most rigorous institutions for mathematics and statistics. Its undergraduate programs—B.Stat at Kolkata and B.Math at Bengaluru—are fiercely competitive, admitting only around 50 to 60 students per batch nationwide.",
    whyChosen:
      "ISI entrance cannot be cracked with formula memorization. It requires authentic mathematical proofs, elegant number theoretic arguments, and creative algebraic constructions. VigyanPrep provides comprehensive proof-writing rubrics, subjective solution breakdowns, and UGA timed test modules.",
    keySubjects: ["Algebra & Polynomials", "Combinatorics & Graph Theory", "Number Theory", "Euclidean Geometry", "Calculus & Analysis"],
    syllabusBreakdown: [
      {
        subject: "Algebra & Number Theory",
        keyTopics: ["Modular Arithmetic, Divisibility & Primes", "Polynomial Roots, Symmetric Polynomials", "Inequalities (AM-GM, Cauchy-Schwarz)", "Matrices, Determinants & System of Equations"],
        weightage: "35% of UGB Proofs",
      },
      {
        subject: "Combinatorics & Probability",
        keyTopics: ["Pigeonhole Principle & Inclusion-Exclusion", "Recurrence Relations & Generating Functions", "Combinatorial Proofs & Graph Foundations", "Basic Probability Models"],
        weightage: "25% of UGB Proofs",
      },
      {
        subject: "Geometry & Trigonometry",
        keyTopics: ["Classical Euclidean Theorems & Circle Properties", "Coordinate Geometry & Conic Sections", "Trigonometric Sums & Functional Equations"],
        weightage: "20% of UGB Proofs",
      },
      {
        subject: "Calculus & Real Analysis",
        keyTopics: ["Limits, Continuity & Differentiability", "Monotonicity, Extrema & Convexity", "Riemann Integration & Area Evaluation", "Sequences & Convergence"],
        weightage: "20% of UGB Proofs",
      },
    ],
    careerHorizons: [
      "Quantitative Research & High-Frequency Trading (HFT) at top global hedge funds (Jane Street, Citadel, Jump Trading)",
      "Ph.D. in Pure Mathematics / Statistics at Princeton, Stanford, Harvard, UC Berkeley, Paris-Saclay, and Cambridge",
      "Frontier Machine Learning and Cryptography research at Google DeepMind, OpenAI, Microsoft Research, and Meta",
      "Actuarial Science leadership and Chief Risk / Analytics Officer roles worldwide",
    ],
    vigyanAdvantage: [
      "Subjective UGB proof-writing breakdowns with complete step-by-step deduction explanations",
      "Timed UGA CBT objective mocks replicating the precise difficulty level of past 15 years",
      "Mentorship and review frameworks modeled on Olympiad and research mathematics training",
    ],
    officialUrl: "https://isical.ac.in",
    pyqAvailable: true,
  },
  {
    id: "cmi",
    name: "Chennai Mathematical Institute Entrance Exam",
    shortName: "CMI Entrance",
    badge: "Theoretical CS & Pure Math",
    category: "cs_physics",
    tagline: "India's Apex Center for Pure Mathematics, Theoretical Computer Science, and Mathematical Physics",
    organizer: "Chennai Mathematical Institute (CMI)",
    degreeAwarded: "B.Sc. (Hons.) in Mathematics and Computer Science / Mathematics and Physics",
    duration: "180 Minutes (3 Hours)",
    totalMarks: "100 Marks (Part A: 40 Marks + Part B: 60 Marks)",
    questionCount: "Part A (10 Objective/Short Answer) + Part B (6 Subjective Proofs)",
    patternSummary: "Part A tests quick accuracy in arithmetic, algebra, and discrete math. Part B consists of 6 in-depth proof questions requiring complete deductive reasoning.",
    negativeMarking: "Part A: Specific rules per question. Part B: Graded subjectively with generous credit for valid partial steps.",
    stipendInfo: "Full Tuition Fee Waiver & Monthly Scholarship of ₹5,000/month for top candidates",
    institutes: [
      { name: "Chennai Mathematical Institute (CMI)", location: "SIPCOT IT Park, Siruseri, Tamil Nadu", highlight: "Global reputation in Algebraic Geometry, Algorithms, Automata Theory & Quantum Field Theory" },
    ],
    overview:
      "CMI is an internationally renowned autonomous research institute founded by Prof. C.S. Seshadri. It offers India's most intellectually stimulating undergraduate curriculum combining foundational pure mathematics with rigorous theoretical computer science and modern physics.",
    whyChosen:
      "CMI papers are famous for clean, elegant questions that test how a student thinks rather than how many questions they have memorized. VigyanPrep offers specialized proof training, algorithmic thinking modules, and past CMI entrance solution libraries.",
    keySubjects: ["Discrete Mathematics & Logic", "Calculus & Real Analysis", "Algebra & Combinatorics", "Geometry & Complex Numbers"],
    syllabusBreakdown: [
      {
        subject: "Discrete Mathematics & Proofs",
        keyTopics: ["Mathematical Induction & Invariants", "Pigeonhole Principle & Extremal Arguments", "Graph Theory & Combinatorial Geometry", "Boolean Logic & Relations"],
        weightage: "35% of Exam",
      },
      {
        subject: "Algebra & Number Theory",
        keyTopics: ["Polynomial Equations & Roots of Unity", "Integers, Modulo Congruence & GCD", "Functional Equations & Invertibility", "Inequalities & Optimization"],
        weightage: "30% of Exam",
      },
      {
        subject: "Calculus & Geometry",
        keyTopics: ["Differentiation, Tangents & Maxima-Minima", "Definite Integrals & Sequences", "Coordinate Geometry & Analytic Proofs", "Complex Numbers in Geometry"],
        weightage: "35% of Exam",
      },
    ],
    careerHorizons: [
      "Ph.D. in Theoretical Computer Science, Cryptography, and Pure Math at MIT, Stanford, Princeton, and INRIA France",
      "Core Algorithm Engineer & Theoretical Research Scientist at DeepMind, Microsoft Research, IBM Quantum, and Google",
      "Quantitative Strategist and Quantitative Developer at premier trading desks globally",
    ],
    vigyanAdvantage: [
      "Rigorous Part B proof solution archive with multiple alternative solution techniques explained",
      "Conceptual modules linking school mathematics to higher-level discrete algorithms and proofs",
    ],
    officialUrl: "https://cmi.ac.in",
    pyqAvailable: true,
  },
  {
    id: "iisc",
    name: "IISc Bangalore BS (Research) Admissions",
    shortName: "IISc Research",
    badge: "India's #1 University (NIRF)",
    category: "pure_science",
    tagline: "India's Apex Scientific Institution — 4-Year Bachelor of Science (Research) Degree",
    organizer: "Indian Institute of Science (IISc Bangalore)",
    degreeAwarded: "4-Year Bachelor of Science (Research) with optional 1-Year Master's (M.Sc.)",
    duration: "Admissions through IISER IAT / JEE Advanced / NEET-UG",
    totalMarks: "Based on IAT / JEE Adv Cutoff",
    questionCount: "Follows respective entrance exam format",
    patternSummary: "Admissions to IISc 4-Year BS (Research) are offered via the IISER IAT channel, JEE Advanced channel, and NEET-UG channel.",
    negativeMarking: "Governed by the respective entrance examination rules.",
    stipendInfo: "Eligible for INSPIRE-SHE (₹80,000/year) and IISc Institutional Fellowships for top students",
    institutes: [
      { name: "IISc Bangalore", location: "Karnataka", highlight: "Rank #1 University in India (NIRF) • India's premier multi-disciplinary basic and applied science research campus" },
    ],
    overview:
      "Established in 1909 through the visionary partnership of Jamsetji Nusserwanji Tata and the Maharaja of Mysore, IISc Bangalore is the crown jewel of Indian scientific inquiry. The 4-Year BS (Research) curriculum allows students to explore Physics, Chemistry, Mathematics, Biology, Earth & Environmental Sciences, and Materials Science before specializing in their chosen discipline.",
    whyChosen:
      "With IISc adopting the IISER Aptitude Test (IAT) as one of its primary undergraduate admission modes, VigyanPrep provides the highest standard of preparation to help students reach the top percentile cutoff needed for IISc admission.",
    keySubjects: ["Interdisciplinary Physics", "Chemical Sciences", "Mathematical Sciences", "Biological Sciences", "Earth & Environmental Sciences"],
    syllabusBreakdown: [
      {
        subject: "Interdisciplinary Natural Sciences",
        keyTopics: ["Classical & Modern Physics", "Physical, Organic & Inorganic Chemistry", "Higher Secondary Mathematics", "Modern Cellular & Molecular Biology"],
        weightage: "Equal 4-Subject Mastery Required",
      },
    ],
    careerHorizons: [
      "Direct fast-track Ph.D. admissions at MIT, Stanford, Harvard, Cambridge, Oxford, and Max Planck",
      "Lead Research Scientist roles at ISRO, DAE, DRDO, CSIR, and national laboratories",
      "Leadership in Deep-Tech Startups, Bio-Pharmaceutical Innovation, and Space Exploration Ventures",
    ],
    vigyanAdvantage: [
      "Comprehensive test series targeting the ultra-competitive 99.8+ percentile needed for IISc BS admission",
      "In-depth interdisciplinary study material bridging high-school curriculum with university-level intuition",
    ],
    officialUrl: "https://iisc.ac.in/ug",
    pyqAvailable: true,
  },
];

const FUTURE_STREAMS = [
  {
    name: "CUET PG Science",
    tag: "Upcoming 2026-27",
    description: "Central Universities entrance for M.Sc. in Physics, Chemistry, Mathematics, and Life Sciences.",
    icon: FlaskConical,
  },
  {
    name: "IIT JAM (Joint Admission Test for M.Sc.)",
    tag: "Upcoming 2026-27",
    description: "Direct entry to 2-year M.Sc., M.Sc.-Ph.D. Dual Degree programs across IITs and IISc.",
    icon: Atom,
  },
  {
    name: "TIFR Graduate Studies (TIFR GS / JGEEBILS)",
    tag: "Under Architecture",
    description: "Apex fellowship exam for Integrated Ph.D. and Ph.D. programs at Tata Institute of Fundamental Research.",
    icon: Microscope,
  },
  {
    name: "Science Olympiads (NSEP, NSEC, NSEB, INMO)",
    tag: "Curriculum Integration",
    description: "Foundational problem sets bridging Olympiad-level thinking with premier undergraduate research entrances.",
    icon: Award,
  },
];

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<ExamDetails | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<"overview" | "pattern" | "syllabus" | "career" | "advantage">("overview");

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedExam(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter exams
  const filteredExams = useMemo(() => {
    return EXAMS_DATABASE.filter((exam) => {
      const matchesCategory =
        activeCategory === "all" ||
        (activeCategory === "pure_science" && exam.category === "pure_science") ||
        (activeCategory === "math_stats" && exam.category === "math_stats") ||
        (activeCategory === "cs_physics" && exam.category === "cs_physics");

      const matchesSearch =
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.institutes.some((inst) => inst.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#241e12] text-amber-50 selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION: THE ESSENCE OF VIGYAN
         ═══════════════════════════════════════════════════════════════════════ */}
      <header className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-amber-500/10 via-orange-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Eyebrow badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-widest uppercase shadow-lg shadow-black/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>The Ethos &amp; Academic Manifesto</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              What is <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400">Vigyan</span>?
            </h1>
            <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl mx-auto">
              Why we founded <strong className="text-amber-300 font-semibold">VigyanPrep</strong> as India&apos;s dedicated sanctuary for pure sciences, higher mathematics, and scientific research admissions.
            </p>
          </div>

          {/* Visual Sketch Hero Card */}
          <div className="relative w-full rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-black/80 bg-neutral-950/80 mb-16">
            <Image
              src="/images/sketch-university-campus.jpg"
              alt="Hand-drawn architectural sketch of university campus and global research library"
              width={1600}
              height={700}
              className="w-full h-64 sm:h-96 md:h-[450px] object-cover opacity-85"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241e12] via-[#241e12]/40 to-transparent" />
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  Sanskrit Etymology
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                  विज्ञानम् (Vi-Gyanam) • The Empirical Pursuit of Universal Truth
                </h2>
              </div>
              <a
                href="#exams"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-xl shadow-amber-500/20 shrink-0"
              >
                <span>Explore Exam Matrix</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          ETYMOLOGY & PHILOSOPHY: VI + GYAN
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Conceptual Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
                Linguistic &amp; Philosophical Roots
              </span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-100 leading-tight">
              Why We Chose The Name <br />
              <span className="text-amber-400 italic font-serif">&ldquo;Vigyan Prep&rdquo;</span>
            </h2>

            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              <p>
                In the classical Sanskrit lexicon, the word <strong className="text-amber-200 font-semibold">विज्ञान (Vigyan)</strong> is composed of two profound linguistic pillars:
              </p>

              {/* Vi Card */}
              <div className="p-5 rounded-2xl bg-neutral-900/70 border border-amber-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-serif font-bold text-lg flex items-center justify-center border border-amber-500/40">
                    वि
                  </div>
                  <h3 className="font-serif font-bold text-lg text-amber-200">
                    Vi (वि) — Distinguished, Empirical, Discerning
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Signifies knowledge that is not based on blind dogma or superficial memorization. It represents <em>empirical discernment</em>—the scientific method of systematic hypothesis, rigorous experimentation, and mathematical proof.
                </p>
              </div>

              {/* Gyan Card */}
              <div className="p-5 rounded-2xl bg-neutral-900/70 border border-amber-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 font-serif font-bold text-lg flex items-center justify-center border border-orange-500/40">
                    ज्ञान
                  </div>
                  <h3 className="font-serif font-bold text-lg text-amber-200">
                    Gyan (ज्ञान) — Pure Conceptual Consciousness
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  The deepest understanding of the fundamental principles governing nature, matter, energy, space, time, and life.
                </p>
              </div>

              <p className="pt-2 text-neutral-200 leading-relaxed border-l-2 border-amber-500/40 pl-4 italic">
                &ldquo;Together, <strong>Vigyan (विज्ञान)</strong> is <em>Supreme Empirical Science</em>. We added <strong>Prep</strong> because our sole mission is to prepare the next generation of Indian scientists, mathematicians, and thinkers to conquer India&apos;s apex research entrance examinations.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Handcrafted Sketch & Stat Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/25 shadow-2xl bg-neutral-950">
              <Image
                src="/images/sketch-student-studying.jpg"
                alt="Hand-drawn sketch of a student solving deep science problems late at night"
                width={800}
                height={550}
                className="w-full h-auto object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-xs text-amber-300 font-serif italic">
                  &ldquo;A scientist is not someone who gives the right answers, but one who asks the right questions.&rdquo;
                </p>
              </div>
            </div>

            {/* Core Values Strip */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 text-center">
                <div className="text-2xl font-serif font-bold text-amber-400">100%</div>
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider mt-1">Research Exam Focus</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 text-center">
                <div className="text-2xl font-serif font-bold text-amber-400">₹0 Fee</div>
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider mt-1">Free PYQ Practice</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHY WE CHOSE ONLY PREMIER RESEARCH EXAMS (THE PROBLEM WE SOLVE)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-amber-500/25 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">The Academic Gap</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2 mb-4">
              Why We Chose These Specific Exams
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              India has millions of engineering and medical test prep websites. But for students whose true calling is fundamental science and pure mathematics, the options were virtually nonexistent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <div className="p-6 rounded-2xl bg-neutral-950/60 border border-white/10 hover:border-amber-400/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Atom className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-100">
                1. Beyond Rote Coaching Factories
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Traditional coaching platforms train students for speed and pattern repetition. But exams like <strong>IISER IAT, NISER NEST, ISI, and CMI</strong> demand conceptual understanding, formal proof construction, and scientific reasoning.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-2xl bg-neutral-950/60 border border-white/10 hover:border-amber-400/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-100">
                2. Gateway to Fully Funded Global Ph.D.s
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Graduates from IISERs, NISER, CEBS, and CMI receive direct fully funded Ph.D. offers from MIT, Harvard, Max Planck, CERN, and ETH Zürich with ₹60,000 to ₹80,000/yr Indian undergraduate research fellowships.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-6 rounded-2xl bg-neutral-950/60 border border-white/10 hover:border-amber-400/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-100">
                3. Future-Proof Modular Architecture
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We engineered VigyanPrep with an extensible course engine. As our scientific community grows, we are scaling into <strong>CUET PG Science, IIT JAM, TIFR GS, and Science Olympiads</strong> without losing our pure-science purity.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          INTERACTIVE EXAM UNIVERSE & DEEP DIVE EXPLORER
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="exams" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Comprehensive Directory</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2 mb-4">
            Explore All Research Exams
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Click on any examination below for a full deep dive into its syllabus blueprint, admitting institutes, marking scheme, and post-graduation research careers.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-neutral-900/60 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === "all"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              All Exams ({EXAMS_DATABASE.length})
            </button>
            <button
              onClick={() => setActiveCategory("pure_science")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === "pure_science"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Pure Sciences (IAT, NEST, IISc)
            </button>
            <button
              onClick={() => setActiveCategory("math_stats")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === "math_stats"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Math &amp; Statistics (ISI)
            </button>
            <button
              onClick={() => setActiveCategory("cs_physics")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === "cs_physics"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Theoretical CS &amp; Math (CMI)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search IAT, NEST, ISI, CMI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-950/80 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400/50"
            />
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              onClick={() => {
                setSelectedExam(exam);
                setActiveModalTab("overview");
              }}
              className="group cursor-pointer p-6 rounded-2xl bg-neutral-900/60 border border-amber-500/20 hover:border-amber-400/60 hover:bg-neutral-900/90 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
                    {exam.badge}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    {exam.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  {exam.name}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                  {exam.tagline}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-neutral-950/60 border border-white/5 text-[11px] text-neutral-400 mb-4">
                  <div>
                    <span className="text-neutral-300 font-medium block">Total Marks</span>
                    <span className="text-amber-400 font-bold">{exam.totalMarks}</span>
                  </div>
                  <div>
                    <span className="text-neutral-300 font-medium block">Questions</span>
                    <span className="text-amber-400 font-bold">{exam.questionCount}</span>
                  </div>
                </div>

                {/* Institutes Sample */}
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-300 font-bold">
                    Participating Institutes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exam.institutes.slice(0, 3).map((inst, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300">
                        {inst.name}
                      </span>
                    ))}
                    {exam.institutes.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 font-bold">
                        +{exam.institutes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                <span>View Full Deep Dive</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* FUTURE EXPANSION HORIZON SECTION */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/40 border border-dashed border-amber-500/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Expanding Architecture</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Upcoming Course Horizons (2026–2027)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
                Our scalable test framework is actively being extended to cover higher undergraduate &amp; graduate basic science admissions across India.
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider shrink-0">
              Future Modules
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FUTURE_STREAMS.map((stream, idx) => {
              const Icon = stream.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl bg-neutral-950/50 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <Icon className="w-5 h-5 text-amber-400" />
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-amber-300 border border-white/10">
                      {stream.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-amber-100">{stream.name}</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">{stream.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          INTERACTIVE DEEP DIVE MODAL FOR EXAM
         ═══════════════════════════════════════════════════════════════════════ */}
      {selectedExam && (
        <div
          className="fixed inset-0 z-[4000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedExam(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#16120b] border border-amber-500/30 rounded-3xl shadow-2xl shadow-black overflow-hidden my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-neutral-900 to-[#16120b] border-b border-white/10 flex items-start justify-between gap-4 relative">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300">
                    {selectedExam.badge}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    {selectedExam.degreeAwarded}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                  {selectedExam.name}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 font-light">
                  {selectedExam.tagline}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedExam(null)}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 sm:px-8 border-b border-white/10 bg-neutral-950/60 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveModalTab("overview")}
                className={`py-3.5 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeModalTab === "overview"
                    ? "border-amber-400 text-amber-400"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Overview &amp; Campuses</span>
              </button>

              <button
                onClick={() => setActiveModalTab("pattern")}
                className={`py-3.5 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeModalTab === "pattern"
                    ? "border-amber-400 text-amber-400"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Paper Pattern</span>
              </button>

              <button
                onClick={() => setActiveModalTab("syllabus")}
                className={`py-3.5 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeModalTab === "syllabus"
                    ? "border-amber-400 text-amber-400"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Syllabus Blueprint</span>
              </button>

              <button
                onClick={() => setActiveModalTab("career")}
                className={`py-3.5 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeModalTab === "career"
                    ? "border-amber-400 text-amber-400"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Research &amp; Careers</span>
              </button>

              <button
                onClick={() => setActiveModalTab("advantage")}
                className={`py-3.5 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeModalTab === "advantage"
                    ? "border-amber-400 text-amber-400"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>The Vigyan Advantage</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm text-neutral-300">
              
              {/* TAB 1: OVERVIEW & CAMPUSES */}
              {activeModalTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-amber-200 mb-2">About The Examination</h3>
                    <p className="text-neutral-300 leading-relaxed">{selectedExam.overview}</p>
                  </div>

                  {/* Stipend Card */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
                    <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-200 text-xs uppercase tracking-wider">Scholarship &amp; Research Stipend</h4>
                      <p className="text-xs text-neutral-300 mt-1">{selectedExam.stipendInfo}</p>
                    </div>
                  </div>

                  {/* Admitting Campuses */}
                  <div>
                    <h3 className="font-serif text-lg font-bold text-amber-200 mb-3">
                      Admitting Premier Campuses ({selectedExam.institutes.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedExam.institutes.map((inst, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-neutral-950/60 border border-white/5">
                          <div className="flex items-center justify-between text-xs font-bold text-white">
                            <span>{inst.name}</span>
                            <span className="text-[10px] text-amber-400 font-normal">{inst.location}</span>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-1 leading-normal">{inst.highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PAPER PATTERN */}
              {activeModalTab === "pattern" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-neutral-950/60 border border-white/5 text-center">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Exam Duration</span>
                      <span className="font-serif text-lg font-bold text-amber-300 mt-1 block">{selectedExam.duration}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-neutral-950/60 border border-white/5 text-center">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Total Marks</span>
                      <span className="font-serif text-lg font-bold text-amber-300 mt-1 block">{selectedExam.totalMarks}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-neutral-950/60 border border-white/5 text-center">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Questions</span>
                      <span className="font-serif text-lg font-bold text-amber-300 mt-1 block">{selectedExam.questionCount}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-neutral-950/60 border border-white/5 text-center">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Official Portal</span>
                      <a
                        href={selectedExam.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline mt-2"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-neutral-950/70 border border-white/10 space-y-4">
                    <h3 className="font-serif text-base font-bold text-amber-200">Question Format &amp; Marking Scheme</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{selectedExam.patternSummary}</p>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                      <strong>Marking Policy:</strong> {selectedExam.negativeMarking}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SYLLABUS BLUEPRINT */}
              {activeModalTab === "syllabus" && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-amber-200">Subject-Wise Blueprint</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedExam.syllabusBreakdown.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-neutral-950/70 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <h4 className="font-bold text-white text-sm">{item.subject}</h4>
                          <span className="text-[10px] text-amber-400 font-bold px-2 py-0.5 rounded-full bg-amber-500/10">
                            {item.weightage}
                          </span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-neutral-300">
                          {item.keyTopics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CAREERS */}
              {activeModalTab === "career" && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-amber-200">Global Horizons &amp; Scientific Career Trajectories</h3>
                  <div className="space-y-3">
                    {selectedExam.careerHorizons.map((career, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950/60 border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">{career}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: VIGYAN ADVANTAGE */}
              {activeModalTab === "advantage" && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-amber-200">How VigyanPrep Helps You Crack {selectedExam.shortName}</h3>
                  <div className="space-y-3">
                    {selectedExam.vigyanAdvantage.map((adv, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950/60 border border-white/5">
                        <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">{adv}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Action Bar */}
            <div className="p-4 sm:p-6 bg-neutral-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-neutral-400 text-center sm:text-left">
                Direct access to official previous year questions &amp; NTA test series.
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/pyq"
                  onClick={() => setSelectedExam(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition text-center"
                >
                  Practice PYQ Papers
                </Link>
                <Link
                  href="/tests"
                  onClick={() => setSelectedExam(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs uppercase tracking-wider hover:scale-105 transition text-center shadow-lg shadow-amber-500/20"
                >
                  Join Test Series
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          THE STUDENT JOURNEY
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 border border-amber-500/25 backdrop-blur-sm">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">The Roadmap</span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100 mt-2">
              From Aspirant → Researcher → Global Scientist
            </h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-950/50 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center shrink-0 text-sm shadow-lg shadow-amber-500/40">
                1
              </div>
              <div>
                <h4 className="font-serif font-bold text-amber-100 text-base">First-Principles Conceptual Intuition</h4>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                  Moving away from formula memorization into genuine conceptual mastery of physics derivations, reaction mechanisms, mathematical proofs, and biological systems.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-950/50 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center shrink-0 text-sm shadow-lg shadow-amber-500/40">
                2
              </div>
              <div>
                <h4 className="font-serif font-bold text-amber-100 text-base">Proctored Timed CBT Mock Simulations</h4>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                  Attempt official past year papers in our exact NTA zero-distraction black test portal with live countdown timers, palette flags, and instant percentile diagnostics.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-950/50 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center shrink-0 text-sm shadow-lg shadow-amber-500/40">
                3
              </div>
              <div>
                <h4 className="font-serif font-bold text-amber-100 text-base">Admissions to Top Research Campuses &amp; Fellowships</h4>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                  Securing top AIR ranks to join IISER Pune, Kolkata, Mohali, Bhopal, TVM, Tirupati, Berhampur, NISER Bhubaneswar, CEBS Mumbai, ISI, CMI, and IISc with INSPIRE / DISHA fellowships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CONTACT & ACADEMIC HELP DESK
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/70 border border-amber-500/25 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Get In Touch</span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
              Academic Support &amp; Student Help Desk
            </h3>
            <p className="text-sm text-neutral-400 max-w-lg mx-auto mt-2 font-light">
              Have questions regarding test series passes, fee waivers, or doubt clearing? Our research academic desk is here for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="tel:+917004283531"
              className="p-6 rounded-2xl bg-neutral-950/60 border border-white/10 hover:border-amber-400/50 transition-all group flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">Direct Phone Desk</h4>
              <p className="text-xs text-amber-300 font-mono">+91 7004283531</p>
              <span className="text-[11px] text-neutral-400">Available for Student Enquiries</span>
            </a>

            <a
              href="mailto:support@vigyanprep.com"
              className="p-6 rounded-2xl bg-neutral-950/60 border border-white/10 hover:border-amber-400/50 transition-all group flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">Direct Email Support</h4>
              <p className="text-xs text-amber-300 font-mono">support@vigyanprep.com</p>
              <span className="text-[11px] text-neutral-400">Response within 2-4 hours</span>
            </a>

            <a
              href="https://wa.me/917004283531"
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-neutral-950/60 border border-white/10 hover:border-emerald-400/50 transition-all group flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">WhatsApp Support</h4>
              <p className="text-xs text-emerald-400 font-mono">+91 7004283531</p>
              <span className="text-[11px] text-emerald-400 font-semibold">Quick Doubt &amp; Fee Waiver</span>
            </a>

            <div className="p-6 rounded-2xl bg-neutral-950/60 border border-white/10 flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">Headquarters</h4>
              <p className="text-xs text-neutral-300">Vigyan Prep Education Research</p>
              <span className="text-[11px] text-neutral-400">India&apos;s Pure Science Entrance Hub</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
