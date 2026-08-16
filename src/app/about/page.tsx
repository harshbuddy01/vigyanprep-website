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
  Shield,
  FileText,
  Clock,
  Check,
  Compass,
  ScrollText,
} from "lucide-react";

interface ExamFolio {
  id: string;
  folioNumber: string;
  name: string;
  shortName: string;
  latinMotto?: string;
  badge: string;
  category: "pure_science" | "math_stats" | "cs_physics";
  tagline: string;
  governingBody: string;
  degreesConferred: string;
  duration: string;
  totalMarks: number | string;
  questionCount: string;
  markingRules: string;
  stipendFellowship: string;
  summary: string;
  institutes: {
    name: string;
    campus: string;
    description: string;
  }[];
  patternBreakdown: {
    section: string;
    questions: string;
    marks: string;
    nature: string;
  }[];
  syllabusDepth: {
    subject: string;
    keyAreas: string[];
    rigorNote: string;
  }[];
  careerHorizons: string[];
  vigyanDifference: string[];
  officialPortal: string;
}

const RESEARCH_EXAM_FOLIOS: ExamFolio[] = [
  {
    id: "iat",
    folioNumber: "FOLIO I",
    name: "IISER Aptitude Test (IAT)",
    shortName: "IISER IAT",
    latinMotto: "Discite ad explorandum • Learn to explore",
    badge: "Flagship Natural Sciences",
    category: "pure_science",
    tagline: "The premier national gateway to the 7 Indian Institutes of Science Education and Research, IISc Bangalore, and IIT Madras BS Medical Sciences.",
    governingBody: "Joint Admissions Committee (JAC) • Ministry of Education, Govt. of India",
    degreesConferred: "5-Year BS-MS Dual Degree & 4-Year BS (Research)",
    duration: "180 Minutes (3 Hours)",
    totalMarks: 240,
    questionCount: "60 Questions (15 per subject)",
    markingRules: "+4 Marks for Correct Answer • -1 Mark for Incorrect Answer • 0 for Unattempted",
    stipendFellowship: "Eligible for INSPIRE-SHE & DISHA Fellowships (₹60,000/year + ₹20,000/year Summer Research Grant)",
    summary:
      "The IISER Aptitude Test is India's highest-standard examination for students dedicated to fundamental scientific inquiry. Unlike engineering exams that reward rapid formula substitution, IAT evaluates conceptual clarity, scientific reasoning, and interdisciplinary problem-solving across all four natural sciences.",
    institutes: [
      { name: "IISER Pune", campus: "Maharashtra", description: "Flagship research hub renowned for theoretical astrophysics, chemical biology, and quantum materials." },
      { name: "IISER Kolkata", campus: "West Bengal", description: "Home to the Centre of Excellence in Space Sciences India (CESSI) and pioneering Earth sciences." },
      { name: "IISER Mohali", campus: "Punjab", description: "Leading institute in nuclear magnetic resonance (NMR), structural biology, and quantum computing." },
      { name: "IISER Bhopal", campus: "Madhya Pradesh", description: "Interdisciplinary center offering BS in Natural Sciences, Data Science, and Engineering Sciences." },
      { name: "IISER Thiruvananthapuram", campus: "Kerala", description: "Advanced experimental physics, molecular ecology, and oceanic materials research." },
      { name: "IISER Tirupati", campus: "Andhra Pradesh", description: "Frontier center in biophysics, climate sciences, and cancer biology." },
      { name: "IISER Berhampur", campus: "Odisha", description: "Specialized in coastal ecosystems, high-energy materials, and computational sciences." },
      { name: "IISc Bangalore (BS Research)", campus: "Karnataka", description: "Admits top IAT rankers (Top ~150 AIR) into India's #1 institution for scientific research." },
      { name: "IIT Madras (BS Medical Sciences)", campus: "Tamil Nadu", description: "Pioneering interdisciplinary medical science and biomedical technology research." },
    ],
    patternBreakdown: [
      { section: "Physics", questions: "15 Questions", marks: "60 Marks", nature: "Single Correct Objective MCQ" },
      { section: "Chemistry", questions: "15 Questions", marks: "60 Marks", nature: "Single Correct Objective MCQ" },
      { section: "Mathematics", questions: "15 Questions", marks: "60 Marks", nature: "Single Correct Objective MCQ" },
      { section: "Biology", questions: "15 Questions", marks: "60 Marks", nature: "Single Correct Objective MCQ" },
    ],
    syllabusDepth: [
      {
        subject: "Physics",
        keyAreas: ["Classical Mechanics & Rigid Body Dynamics", "Electromagnetism & Wave Optics", "Thermodynamics & Statistical Physics", "Atomic, Nuclear & Modern Physics"],
        rigorNote: "Tests conceptual derivations rather than standard formula speed.",
      },
      {
        subject: "Chemistry",
        keyAreas: ["Chemical Bonding & Molecular Orbital Theory", "Organic Reaction Mechanisms & Stereochemistry", "Chemical Kinetics & Ionic Equilibrium", "Coordination Compounds & Transition Metals"],
        rigorNote: "High emphasis on fundamental chemical logic and reaction kinetics.",
      },
      {
        subject: "Mathematics",
        keyAreas: ["Differential & Integral Calculus", "Vectors, 3D Geometry & Linear Algebra", "Combinatorics & Probability Distributions", "Sequences, Series & Complex Analysis"],
        rigorNote: "Requires analytical deduction and geometric visualization.",
      },
      {
        subject: "Biology",
        keyAreas: ["Molecular Genetics & Cell Biology", "Human & Plant Physiology", "Ecology, Evolution & Biodiversity", "Biomolecules & Enzymology"],
        rigorNote: "Designed to be accessible for PCM students with fundamental biological logic.",
      },
    ],
    careerHorizons: [
      "Direct Ph.D. admissions with full international fellowships at Harvard, MIT, Cambridge, Max Planck, Oxford, and ETH Zürich.",
      "Scientist & Research Officer appointments at ISRO, DRDO, BARC, TIFR, and CSIR National Laboratories.",
      "Industrial R&D leadership in Quantum Computing, Semiconductor Nanotech, Drug Discovery, and Clean Energy.",
      "Quantitative modeling, algorithmic research, and data science leadership in global analytical firms.",
    ],
    vigyanDifference: [
      "Exact replica of the NTA zero-distraction proctored testing engine with live countdown and section palette.",
      "Authentic previous year question solutions with step-by-step mathematical proofs and theoretical context.",
      "Balanced PCM & PCB preparation strategies ensuring single-stream students maximize their fourth subject score.",
    ],
    officialPortal: "https://iiseradmission.in",
  },
  {
    id: "nest",
    folioNumber: "FOLIO II",
    name: "National Entrance Screening Test (NEST)",
    shortName: "NISER NEST",
    latinMotto: "Ex atomo ad universum • From the atom to the cosmos",
    badge: "Atomic Energy Research",
    category: "pure_science",
    tagline: "India's apex entrance for Department of Atomic Energy integrated master's programs at NISER Bhubaneswar & UM-DAE CEBS Mumbai.",
    governingBody: "National Institute of Science Education and Research (NISER) & Department of Atomic Energy (DAE)",
    degreesConferred: "5-Year Integrated M.Sc. in Physics, Chemistry, Mathematics, and Biology",
    duration: "210 Minutes (3.5 Hours)",
    totalMarks: 180,
    questionCount: "68 Questions (17 per section, Best 3 of 4 scored)",
    markingRules: "MCQ: +2.5 / -1 • MSQ (Multiple Correct): Partial Marking with NO Negative Marks",
    stipendFellowship: "DAE DISHA Fellowship of ₹60,000/year (₹5,000/month) + ₹20,000/year Summer Project Grant to ALL students",
    summary:
      "Conducted jointly by NISER Bhubaneswar and UM-DAE CEBS Mumbai, NEST selects researchers for India's atomic energy, nuclear science, and basic science ecosystem. High-ranking graduates have direct interview eligibility for recruitment as Scientific Officer (Grade C) at the Bhabha Atomic Research Centre (BARC).",
    institutes: [
      { name: "NISER Bhubaneswar", campus: "Odisha", description: "Autonomous apex research institute under the Department of Atomic Energy with state-of-the-art nuclear and condensed matter physics facilities." },
      { name: "UM-DAE CEBS Mumbai", campus: "Maharashtra", description: "Located inside University of Mumbai Kalina campus, operating in direct research partnership with BARC and TIFR scientists." },
    ],
    patternBreakdown: [
      { section: "Physics", questions: "17 Questions (MCQ + MSQ)", marks: "60 Marks", nature: "Scored in Best 3 of 4" },
      { section: "Chemistry", questions: "17 Questions (MCQ + MSQ)", marks: "60 Marks", nature: "Scored in Best 3 of 4" },
      { section: "Mathematics", questions: "17 Questions (MCQ + MSQ)", marks: "60 Marks", nature: "Scored in Best 3 of 4" },
      { section: "Biology", questions: "17 Questions (MCQ + MSQ)", marks: "60 Marks", nature: "Scored in Best 3 of 4" },
    ],
    syllabusDepth: [
      {
        subject: "Physics",
        keyAreas: ["Rotational Mechanics & Gravitation", "Electromagnetic Theory & Modern Physics", "Wave Interference, Optics & Thermodynamics", "Fluid Dynamics & Nuclear Physics"],
        rigorNote: "Questions are non-standard with multi-step analytical constraints.",
      },
      {
        subject: "Chemistry",
        keyAreas: ["Coordination Chemistry & Transition Elements", "Chemical Thermodynamics & Reaction Kinetics", "Organic Synthesis & Stereochemistry", "Surface Chemistry & Electrochemistry"],
        rigorNote: "Heavy emphasis on thermodynamic proofs and electronic structures.",
      },
      {
        subject: "Mathematics",
        keyAreas: ["Combinatorics, Sequences & Series", "Definite Integration & Differential Equations", "Analytical Geometry & Vector Spaces", "Probability & Matrices"],
        rigorNote: "Requires rigorous algebraic manipulation and logical deduction.",
      },
      {
        subject: "Biology",
        keyAreas: ["Biochemistry, Enzymology & Cell Signaling", "Molecular Genetics & Recombinant DNA", "Plant & Animal Systems Physiology", "Ecology, Ethology & Evolution"],
        rigorNote: "Experimental and data-interpretation questions.",
      },
    ],
    careerHorizons: [
      "Direct interview eligibility for Scientific Officer (Group A / Grade C) in Bhabha Atomic Research Centre (BARC) and DAE units.",
      "Funded Ph.D. positions at CERN (Geneva), Max Planck Institutes (Germany), and top American institutions.",
      "Frontier research careers in Nuclear Fusion, Astrophysics, Quantum Materials, and Structural Biophysics.",
    ],
    vigyanDifference: [
      "Accurate simulation of NEST's unique 'Best 3 of 4' subject scoring algorithm and SMAS cutoff calculation.",
      "Full coverage of multi-select (MSQ) questions with official partial credit logic.",
      "Dedicated test sets calibrated to the 3.5-hour deep analytical endurance requirement.",
    ],
    officialPortal: "https://nestexam.in",
  },
  {
    id: "isi",
    folioNumber: "FOLIO III",
    name: "Indian Statistical Institute Admission Test",
    shortName: "ISI B.Stat / B.Math",
    latinMotto: "Bhinneshvaikyasya Darshanam • Unity in Diversity",
    badge: "Elite Mathematics & Statistics",
    category: "math_stats",
    tagline: "The world's gold standard in mathematical statistics, probability theory, and discrete mathematics.",
    governingBody: "Indian Statistical Institute (Kolkata, Bengaluru, Delhi) • Ministry of Statistics & Programme Implementation",
    degreesConferred: "Bachelor of Statistics (Hons) at Kolkata / Bachelor of Mathematics (Hons) at Bengaluru",
    duration: "4 Hours (2 Hours Objective UGA + 2 Hours Subjective Proofs UGB)",
    totalMarks: "100 (UGA) + 100 (UGB Proofs)",
    questionCount: "30 Objective (UGA) + 8 Subjective Proofs (UGB)",
    markingRules: "UGA: +4 / -1 • UGB: Graded subjectively on proof clarity, rigor, and mathematical correctness",
    stipendFellowship: "100% Free Tuition + ₹5,000/month Monthly Scholarship + Annual Contingency Allowance to all admitted students",
    summary:
      "Founded in 1931 by Professor P.C. Mahalanobis, ISI is universally recognized as one of the world's most intellectually rigorous academies for mathematical statistics. Admitting only ~50-60 students nationwide, its undergraduate programs are renowned for producing world-class mathematicians, quantitative researchers, and theorists.",
    institutes: [
      { name: "ISI Kolkata", campus: "West Bengal", description: "The historic headquarters of Indian statistics • Flagship B.Stat (Hons) program and theoretical statistics center." },
      { name: "ISI Bengaluru", campus: "Karnataka", description: "World-class center for Pure Mathematics, Probability Theory, and Theoretical Computer Science • B.Math (Hons)." },
      { name: "ISI Delhi", campus: "New Delhi", description: "Leading center for Quantitative Economics, Statistical Computing, and Operations Research." },
    ],
    patternBreakdown: [
      { section: "Forenoon Session (UGA)", questions: "30 Multiple Choice Questions", marks: "120 Marks (Scaled to 100)", nature: "Objective Mathematics" },
      { section: "Afternoon Session (UGB)", questions: "8 Subjective Proof Questions", marks: "100 Marks", nature: "Descriptive Proof-Writing" },
    ],
    syllabusDepth: [
      {
        subject: "Algebra & Number Theory",
        keyAreas: ["Modular Arithmetic, Divisibility, Primes & Congruences", "Polynomial Roots, Symmetric Polynomials & Irreducibility", "Classical Inequalities (AM-GM, Cauchy-Schwarz, Jensen)", "Linear Algebra & Systems of Equations"],
        rigorNote: "Proof-level depth equivalent to national and international Olympiads.",
      },
      {
        subject: "Combinatorics & Graph Theory",
        keyAreas: ["Pigeonhole Principle & Extremal Arguments", "Inclusion-Exclusion & Generating Functions", "Recurrence Relations & Combinatorial Proofs", "Basic Graph Theory & Combinatorial Geometry"],
        rigorNote: "Tests pure deductive ingenuity without routine formulas.",
      },
      {
        subject: "Geometry & Trigonometry",
        keyAreas: ["Classical Euclidean Geometry Proofs & Circle Properties", "Coordinate Geometry & Conic Sections", "Trigonometric Equations & Complex Numbers in Geometry"],
        rigorNote: "Requires synthetic and analytic proof construction.",
      },
      {
        subject: "Calculus & Real Analysis",
        keyAreas: ["Rigorous Limits, Continuity & Differentiability", "Monotonicity, Mean Value Theorems & Convexity", "Riemann Integration, Bounds & Improper Integrals", "Sequences, Series & Convergence Criteria"],
        rigorNote: "Focuses on rigorous eps-delta intuition and foundational proofs.",
      },
    ],
    careerHorizons: [
      "Quantitative Research & High-Frequency Trading at top hedge funds (Jane Street, Citadel, Jump Trading, Tower Research).",
      "Direct Ph.D. in Pure Mathematics or Statistics at Princeton, Stanford, Harvard, UC Berkeley, and Cambridge.",
      "Frontier Machine Learning and Cryptography research at Google DeepMind, OpenAI, Microsoft Research, and Meta AI.",
    ],
    vigyanDifference: [
      "Subjective UGB proof-writing breakdowns with multiple alternative deduction pathways explained.",
      "Timed UGA objective mock modules reflecting the exact difficulty spectrum of past 15 years.",
    ],
    officialPortal: "https://isical.ac.in",
  },
  {
    id: "cmi",
    folioNumber: "FOLIO IV",
    name: "Chennai Mathematical Institute Entrance Exam",
    shortName: "CMI Entrance",
    latinMotto: "Satyena Sarvam Pratishthitam • In Truth Everything is Established",
    badge: "Theoretical CS & Pure Math",
    category: "cs_physics",
    tagline: "India's premier academy for pure mathematics, theoretical computer science, and mathematical physics.",
    governingBody: "Chennai Mathematical Institute (CMI)",
    degreesConferred: "B.Sc. (Hons.) in Mathematics & Computer Science / Mathematics & Physics",
    duration: "180 Minutes (3 Hours)",
    totalMarks: 100,
    questionCount: "Part A (10 Short Answer) + Part B (6 Subjective Proofs)",
    markingRules: "Part A: Objective scoring • Part B: Rigorous proof grading with substantial credit for valid partial steps",
    stipendFellowship: "Full Tuition Fee Waiver & Monthly Scholarship of ₹5,000/month for top candidates",
    summary:
      "Founded by Prof. C.S. Seshadri in 1989, CMI is an internationally celebrated center of mathematical excellence. Its undergraduate curriculum uniquely integrates foundational pure mathematics with deep theoretical computer science, algorithm design, and modern physics.",
    institutes: [
      { name: "Chennai Mathematical Institute (CMI)", campus: "Siruseri, Tamil Nadu", description: "Internationally renowned for algebraic geometry, automata theory, algorithms, and quantum field theory." },
    ],
    patternBreakdown: [
      { section: "Part A", questions: "10 Short Answer / Objective Questions", marks: "40 Marks", nature: "Quick Precision & Problem Solving" },
      { section: "Part B", questions: "6 In-Depth Proof Questions", marks: "60 Marks", nature: "Complete Deductive Mathematical Proofs" },
    ],
    syllabusDepth: [
      {
        subject: "Discrete Mathematics & Logic",
        keyAreas: ["Mathematical Induction & Invariants", "Pigeonhole Principle & Combinatorial Logic", "Graph Theory & Trees", "Relations, Partitions & Boolean Logic"],
        rigorNote: "Tests algorithmic intuition and creative mathematical reasoning.",
      },
      {
        subject: "Algebra & Number Theory",
        keyAreas: ["Polynomial Equations & Roots of Unity", "Modular Arithmetic & Diophantine Equations", "Functional Equations & Invertibility", "Inequalities & Optimization"],
        rigorNote: "Olympiad-style creative algebraic constructions.",
      },
      {
        subject: "Calculus & Geometry",
        keyAreas: ["Differentiation, Tangents & Extreme Values", "Definite Integrals, Bounds & Sequences", "Analytic Geometry & Coordinate Proofs", "Complex Numbers in Geometry"],
        rigorNote: "Focuses on deep conceptual understanding of continuous functions.",
      },
    ],
    careerHorizons: [
      "Ph.D. in Theoretical Computer Science, Quantum Computing, and Pure Math at MIT, Stanford, Princeton, and INRIA France.",
      "Core Algorithm Engineer & Theoretical Research Scientist at DeepMind, Microsoft Research, IBM Quantum, and Google.",
      "Quantitative Strategist and Quantitative Developer at premier trading desks globally.",
    ],
    vigyanDifference: [
      "Detailed proof solution library with structural explanations of proof construction techniques.",
      "Pedagogy that links high school math to undergraduate discrete mathematics and theoretical computer science.",
    ],
    officialPortal: "https://cmi.ac.in",
  },
  {
    id: "iisc",
    folioNumber: "FOLIO V",
    name: "IISc Bangalore Bachelor of Science (Research)",
    shortName: "IISc Research",
    latinMotto: "Kalyanaya Shastram • Science for the Welfare of Humanity",
    badge: "India's #1 University (NIRF)",
    category: "pure_science",
    tagline: "India's crown jewel of scientific research — 4-Year Bachelor of Science (Research) Degree.",
    governingBody: "Indian Institute of Science (IISc Bangalore)",
    degreesConferred: "4-Year Bachelor of Science (Research) with optional 1-Year Master's (M.Sc.)",
    duration: "Admissions via IISER IAT / JEE Advanced / NEET-UG",
    totalMarks: "Cutoff-based on respective exam",
    questionCount: "Governed by chosen entrance channel",
    markingRules: "Follows respective exam guidelines",
    stipendFellowship: "INSPIRE-SHE Fellowship (₹80,000/year) and IISc Institutional Merit Scholarships",
    summary:
      "Founded in 1909 by Jamsetji Tata and the Maharaja of Mysore, IISc Bangalore represents the apex of Indian scientific scholarship. Its 4-Year BS (Research) program provides a broad foundation across Physics, Chemistry, Mathematics, Biology, Environmental Sciences, and Materials before specialization.",
    institutes: [
      { name: "IISc Bangalore", campus: "Bengaluru, Karnataka", description: "Rank #1 University in India (NIRF) • Over 40 research departments and world-class laboratories." },
    ],
    patternBreakdown: [
      { section: "Admissions Mode 1", questions: "IISER IAT Channel", marks: "Top ~150 AIR Cutoff", nature: "4-Subject Natural Sciences" },
      { section: "Admissions Mode 2", questions: "JEE Advanced Channel", marks: "Top ~250-350 Cutoff", nature: "PCM Mathematics & Physics" },
      { section: "Admissions Mode 3", questions: "NEET-UG Channel", marks: "Top ~100-200 Cutoff", nature: "PCB Life Sciences" },
    ],
    syllabusDepth: [
      {
        subject: "Interdisciplinary Natural Sciences",
        keyAreas: ["Classical & Modern Physics", "Physical, Organic & Inorganic Chemistry", "Analytical Calculus & Algebra", "Cellular & Molecular Biology"],
        rigorNote: "Demands mastery across both biological and physical-mathematical sciences.",
      },
    ],
    careerHorizons: [
      "Direct fast-track Ph.D. admissions at MIT, Stanford, Harvard, Cambridge, Oxford, and Max Planck.",
      "Lead Research Scientist roles at ISRO, DAE, DRDO, CSIR, and national laboratories.",
      "Pioneering leadership in Deep-Tech, Biotechnology, Space Ventures, and Semiconductor R&D.",
    ],
    vigyanDifference: [
      "High-difficulty test papers calibrated specifically for the 99.8+ percentile benchmark needed for IISc admission.",
    ],
    officialPortal: "https://iisc.ac.in/ug",
  },
];

const UPCOMING_MODULES = [
  {
    code: "MOD-01",
    title: "CUET PG Natural Sciences",
    status: "Curriculum Design 2026-27",
    description: "Central Universities postgraduate entrance for M.Sc. in Physics, Chemistry, Mathematics, and Life Sciences.",
  },
  {
    code: "MOD-02",
    title: "IIT JAM (Joint Admission Test for M.Sc.)",
    status: "Curriculum Design 2026-27",
    description: "Gateway to 2-year M.Sc., M.Sc.-Ph.D. Dual Degree programs across all IITs and IISc Bangalore.",
  },
  {
    code: "MOD-03",
    title: "TIFR Graduate Studies (TIFR GS)",
    status: "Under Architecture",
    description: "India's highest fellowship entrance for Integrated Ph.D. and Ph.D. at Tata Institute of Fundamental Research.",
  },
  {
    code: "MOD-04",
    title: "National Science Olympiads",
    status: "Module Integration",
    description: "Foundational problem sets bridging Olympiad-level deduction (INMO, NSEP, NSEC, NSEB) with research entrances.",
  },
];

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFolio, setSelectedFolio] = useState<ExamFolio | null>(null);
  const [activeDossierTab, setActiveDossierTab] = useState<"overview" | "campuses" | "pattern" | "syllabus" | "career">("overview");

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedFolio(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredFolios = useMemo(() => {
    return RESEARCH_EXAM_FOLIOS.filter((folio) => {
      const matchesCategory =
        activeCategory === "all" ||
        (activeCategory === "pure_science" && folio.category === "pure_science") ||
        (activeCategory === "math_stats" && folio.category === "math_stats") ||
        (activeCategory === "cs_physics" && folio.category === "cs_physics");

      const matchesSearch =
        folio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        folio.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        folio.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        folio.institutes.some((inst) => inst.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#15120e] text-[#f5efe6] selection:bg-[#c59b4c] selection:text-[#15120e] font-sans antialiased">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════════
          CHAPTER I: THE OPENING ESSAY & MANIFESTO
         ═══════════════════════════════════════════════════════════════════════ */}
      <article className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-stone-800/80">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Metadata */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#c59b4c] border-b border-stone-800 pb-3 mb-8 font-mono">
            <span>Academic Treatise • No. 01</span>
            <span>VigyanPrep Foundation</span>
            <span>Est. 2024</span>
          </div>

          {/* Sanskrit Devanagari Inscription */}
          <div className="text-center my-8">
            <div className="text-4xl sm:text-6xl font-serif text-[#f5efe6] font-normal tracking-wide">
              विज्ञानम्
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-stone-400 mt-2 font-mono">
              [ vi-gyānam • Supreme Empirical Inquiry ]
            </div>
          </div>

          {/* Title Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#f5efe6] text-center leading-[1.15] mb-10">
            What is <em className="italic font-serif text-[#c59b4c]">Vigyan</em>, and why did we build this sanctuary?
          </h1>

          {/* Sketch Plate: Figure 1 */}
          <figure className="my-12 rounded-2xl overflow-hidden border border-stone-800 bg-[#1c1712] shadow-2xl">
            <Image
              src="/images/sketch-university-campus.jpg"
              alt="Archival pen and ink sketch of a university research quadrangle and library"
              width={1600}
              height={750}
              className="w-full h-auto object-cover opacity-90 filter grayscale contrast-110 hover:filter-none transition-all duration-700"
              priority
            />
            <figcaption className="p-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400 font-mono">
              <span>Fig. 1.0 — The Academic Quadrangle of Pure Scientific Research</span>
              <span>Archival Drawing</span>
            </figcaption>
          </figure>

          {/* Two-Column Essay Body */}
          <div className="prose prose-invert max-w-none text-stone-300 text-base sm:text-lg leading-[1.8] space-y-6 font-serif">
            <p className="first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:mr-4 first-letter:text-[#c59b4c] first-letter:leading-none">
              In the classical epistemological tradition of India, knowledge is not regarded as a static compilation of facts to be rehearsed under timed pressure. It is divided into two distinct orders: <strong>Gyan (ज्ञान)</strong>, the deep theoretical comprehension of reality, and <strong>Vigyan (विज्ञान)</strong>, the empirical, tested, and discerning pursuit of truth through first-principles observation, hypothesis, and rigorous mathematical proof.
            </p>

            <p>
              The prefix <em>Vi (वि)</em> signifies distinction, analytical discernment, and empirical rigor. In modern parlance, <strong>Vigyan</strong> is the scientific method itself—the refusal to accept an assertion without deductive proof, experimentation, and reproducible evidence. It is the exact mindset that forged the foundational breakthroughs of Aryabhata, Bhaskara, Srinivasa Ramanujan, Satyendra Nath Bose, and C.V. Raman.
            </p>

            {/* Editorial Pullquote */}
            <blockquote className="my-10 p-6 sm:p-8 border-l-2 border-[#c59b4c] bg-[#1c1712]/70 rounded-r-2xl not-italic">
              <p className="text-xl sm:text-2xl font-serif text-[#f5efe6] leading-relaxed mb-3">
                &ldquo;A student trained solely to crack engineering speed drills memorizes formulas. A scientist trained in Vigyan derives the universe from first principles.&rdquo;
              </p>
              <cite className="text-xs uppercase tracking-widest text-[#c59b4c] font-mono block not-italic">
                — The VigyanPrep Academic Manifesto
              </cite>
            </blockquote>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#f5efe6] font-normal pt-6 border-t border-stone-800">
              The Crisis of Modern Science Education
            </h2>

            <p>
              Over the last two decades, commercial test preparation in India has transformed into an industrial coaching factory. Millions of students are drilled into 45-second mechanical shortcuts, trick-memorization, and robotic pattern recognition tailored exclusively for mass engineering and medical entrances.
            </p>

            <p>
              In this factory model, pure scientific research was treated as an afterthought—a second choice for candidates who missed engineering cutoffs. But India&apos;s apex research academies—the <strong>7 IISERs, NISER Bhubaneswar, UM-DAE CEBS, the Indian Statistical Institute (ISI), Chennai Mathematical Institute (CMI), and IISc Bangalore</strong>—do not seek formula memorizers. They demand authentic mathematical proofs, interdisciplinary physical intuition, and experimental reasoning.
            </p>

            <p>
              We established <strong className="text-[#f5efe6]">VigyanPrep</strong> to build an uncompromised, zero-distraction sanctuary exclusively dedicated to these premier scientific institutions. We provide the authentic examination environment, proof-based mathematical walkthroughs, and PhD-level analytical pedagogy that serious science aspirants deserve.
            </p>
          </div>

          {/* Student Journey Sketch: Figure 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-14 pt-10 border-t border-stone-800">
            <div className="md:col-span-6 rounded-2xl overflow-hidden border border-stone-800 bg-[#1c1712]">
              <Image
                src="/images/sketch-student-studying.jpg"
                alt="Student studying fundamental physics and mathematics late into the night"
                width={800}
                height={550}
                className="w-full h-auto object-cover opacity-90"
              />
            </div>
            <div className="md:col-span-6 space-y-4 font-serif">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c59b4c] font-mono block">
                The Philosophy of Mastery
              </span>
              <h3 className="text-2xl font-normal text-[#f5efe6]">
                Three Pillars of the Vigyan Pedagogy
              </h3>
              <ul className="space-y-3 text-sm text-stone-300 font-sans leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c59b4c] mt-2 shrink-0" />
                  <span><strong>First-Principles Deduction:</strong> Every formula in Physics, Chemistry, and Mathematics is derived conceptually before application.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c59b4c] mt-2 shrink-0" />
                  <span><strong>Authentic Proof Rigor:</strong> Complete subjective walkthroughs for proof-based examinations like ISI and CMI.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c59b4c] mt-2 shrink-0" />
                  <span><strong>Zero-Distraction CBT Fidelity:</strong> Exact replica of the national testing interface without ads, popups, or gaming gimmicks.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </article>

      {/* ═══════════════════════════════════════════════════════════════════════
          CHAPTER II: THE APEX RESEARCH EXAM COMPENDIUM
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="exams" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#c59b4c] font-mono block mb-2">
              Chapter II • The Archival Compendium
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#f5efe6]">
              Premier Research Admissions
            </h2>
            <p className="text-stone-400 text-sm mt-2 max-w-xl font-serif">
              An exhaustive academic index of India&apos;s apex undergraduate research examinations. Click any folio to review the institutional dossier.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="text"
              placeholder="Filter by exam, campus, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#1c1712] border border-stone-800 text-xs text-[#f5efe6] placeholder-stone-500 focus:outline-none focus:border-[#c59b4c] transition"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-md transition-all border ${
              activeCategory === "all"
                ? "bg-[#c59b4c] text-[#15120e] font-bold border-[#c59b4c]"
                : "bg-transparent text-stone-400 border-stone-800 hover:text-[#f5efe6] hover:border-stone-700"
            }`}
          >
            [All Folios ({RESEARCH_EXAM_FOLIOS.length})]
          </button>
          <button
            onClick={() => setActiveCategory("pure_science")}
            className={`px-4 py-2 rounded-md transition-all border ${
              activeCategory === "pure_science"
                ? "bg-[#c59b4c] text-[#15120e] font-bold border-[#c59b4c]"
                : "bg-transparent text-stone-400 border-stone-800 hover:text-[#f5efe6] hover:border-stone-700"
            }`}
          >
            [Natural Sciences: IAT • NEST • IISc]
          </button>
          <button
            onClick={() => setActiveCategory("math_stats")}
            className={`px-4 py-2 rounded-md transition-all border ${
              activeCategory === "math_stats"
                ? "bg-[#c59b4c] text-[#15120e] font-bold border-[#c59b4c]"
                : "bg-transparent text-stone-400 border-stone-800 hover:text-[#f5efe6] hover:border-stone-700"
            }`}
          >
            [Mathematical Statistics: ISI]
          </button>
          <button
            onClick={() => setActiveCategory("cs_physics")}
            className={`px-4 py-2 rounded-md transition-all border ${
              activeCategory === "cs_physics"
                ? "bg-[#c59b4c] text-[#15120e] font-bold border-[#c59b4c]"
                : "bg-transparent text-stone-400 border-stone-800 hover:text-[#f5efe6] hover:border-stone-700"
            }`}
          >
            [Theoretical CS &amp; Math: CMI]
          </button>
        </div>

        {/* Compendium Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {filteredFolios.map((folio) => (
            <div
              key={folio.id}
              onClick={() => {
                setSelectedFolio(folio);
                setActiveDossierTab("overview");
              }}
              className="cursor-pointer group p-6 sm:p-8 rounded-2xl bg-[#1c1712] border border-stone-800 hover:border-[#c59b4c]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-black/60 relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Folio Metadata Strip */}
                <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 text-xs font-mono">
                  <span className="text-[#c59b4c] font-bold">{folio.folioNumber}</span>
                  <span className="text-stone-400">{folio.duration}</span>
                </div>

                {/* Main Titles */}
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#f5efe6] group-hover:text-[#c59b4c] transition-colors">
                    {folio.name}
                  </h3>
                  {folio.latinMotto && (
                    <div className="text-[11px] italic text-stone-400 font-serif mt-0.5">
                      {folio.latinMotto}
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans line-clamp-2">
                  {folio.tagline}
                </p>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#15120e] border border-stone-800/80 text-[11px] font-mono">
                  <div>
                    <span className="text-stone-500 block">Total Marks</span>
                    <span className="text-[#f5efe6] font-bold">{folio.totalMarks}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Questions</span>
                    <span className="text-[#f5efe6] font-bold">{folio.questionCount.split(' ')[0]} Qs</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Degree</span>
                    <span className="text-[#c59b4c] font-bold truncate block">{folio.degreesConferred.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Campuses Tag Strip */}
                <div className="text-[11px] font-mono text-stone-400">
                  <span className="text-stone-500 block mb-1">Apex Campuses:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {folio.institutes.slice(0, 3).map((inst, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
                        {inst.name}
                      </span>
                    ))}
                    {folio.institutes.length > 3 && (
                      <span className="px-2 py-0.5 rounded bg-[#c59b4c]/10 text-[#c59b4c] font-bold">
                        +{folio.institutes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-5 mt-5 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono text-[#c59b4c] group-hover:translate-x-1 transition-transform">
                <span>[ Read Academic Dossier → ]</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            FUTURE ARCHITECTURAL HORIZONS (MODULAR SCALING)
           ═══════════════════════════════════════════════════════════════════ */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#1c1712] border border-stone-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6 mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#c59b4c] font-mono block mb-1">
                Extensible Architecture
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#f5efe6]">
                Upcoming Academic Course Modules (2026–2027)
              </h3>
            </div>
            <span className="text-xs font-mono text-stone-400 bg-stone-900 px-3 py-1.5 rounded-lg border border-stone-800 shrink-0">
              Future Expansion Engine
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
            {UPCOMING_MODULES.map((mod, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#15120e] border border-stone-800/80 space-y-2">
                <div className="flex items-center justify-between text-[#c59b4c]">
                  <span>{mod.code}</span>
                  <span className="text-[10px] text-stone-500 uppercase">{mod.status}</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#f5efe6]">{mod.title}</h4>
                <p className="text-[11px] text-stone-400 font-sans leading-relaxed">{mod.description}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          INTERACTIVE ACADEMIC DOSSIER MODAL
         ═══════════════════════════════════════════════════════════════════════ */}
      {selectedFolio && (
        <div
          className="fixed inset-0 z-[4000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedFolio(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#17130e] border border-stone-700 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dossier Header */}
            <div className="p-6 sm:p-8 bg-[#1c1712] border-b border-stone-800 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#c59b4c]">
                  <span>{selectedFolio.folioNumber}</span>
                  <span>•</span>
                  <span>{selectedFolio.governingBody}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#f5efe6]">
                  {selectedFolio.name}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 font-sans max-w-2xl">
                  {selectedFolio.tagline}
                </p>
              </div>

              <button
                onClick={() => setSelectedFolio(null)}
                className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition shrink-0"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dossier Tabs */}
            <div className="flex items-center gap-2 px-6 sm:px-8 border-b border-stone-800 bg-[#15120e] overflow-x-auto scrollbar-none font-mono text-xs">
              <button
                onClick={() => setActiveDossierTab("overview")}
                className={`py-3.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  activeDossierTab === "overview"
                    ? "border-[#c59b4c] text-[#c59b4c] font-bold"
                    : "border-transparent text-stone-400 hover:text-stone-200"
                }`}
              >
                [1. Overview &amp; Fellowship]
              </button>

              <button
                onClick={() => setActiveDossierTab("campuses")}
                className={`py-3.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  activeDossierTab === "campuses"
                    ? "border-[#c59b4c] text-[#c59b4c] font-bold"
                    : "border-transparent text-stone-400 hover:text-stone-200"
                }`}
              >
                [2. Participating Institutes]
              </button>

              <button
                onClick={() => setActiveDossierTab("pattern")}
                className={`py-3.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  activeDossierTab === "pattern"
                    ? "border-[#c59b4c] text-[#c59b4c] font-bold"
                    : "border-transparent text-stone-400 hover:text-stone-200"
                }`}
              >
                [3. Paper Blueprint]
              </button>

              <button
                onClick={() => setActiveDossierTab("syllabus")}
                className={`py-3.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  activeDossierTab === "syllabus"
                    ? "border-[#c59b4c] text-[#c59b4c] font-bold"
                    : "border-transparent text-stone-400 hover:text-stone-200"
                }`}
              >
                [4. Syllabus Rigor]
              </button>

              <button
                onClick={() => setActiveDossierTab("career")}
                className={`py-3.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  activeDossierTab === "career"
                    ? "border-[#c59b4c] text-[#c59b4c] font-bold"
                    : "border-transparent text-stone-400 hover:text-stone-200"
                }`}
              >
                [5. Research Horizons]
              </button>
            </div>

            {/* Dossier Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm text-stone-300 font-sans">
              
              {/* TAB 1: OVERVIEW & FELLOWSHIP */}
              {activeDossierTab === "overview" && (
                <div className="space-y-6 font-serif">
                  <div>
                    <h3 className="text-xl text-[#f5efe6] font-normal mb-2">Examination Summary &amp; Scope</h3>
                    <p className="text-stone-300 text-base leading-relaxed">{selectedFolio.summary}</p>
                  </div>

                  {/* Stipend Card */}
                  <div className="p-5 rounded-xl bg-[#1c1712] border border-stone-800 font-sans space-y-2">
                    <span className="text-xs uppercase tracking-widest text-[#c59b4c] font-mono block">
                      Fellowship &amp; Research Stipend
                    </span>
                    <p className="text-sm text-stone-200 leading-relaxed">{selectedFolio.stipendFellowship}</p>
                  </div>

                  {/* Governing Authority */}
                  <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                    <div className="p-3.5 rounded-lg bg-[#15120e] border border-stone-800">
                      <span className="text-stone-500 block">Conferred Degrees</span>
                      <span className="text-[#f5efe6] font-bold mt-1 block">{selectedFolio.degreesConferred}</span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#15120e] border border-stone-800">
                      <span className="text-stone-500 block">Official Portal</span>
                      <a
                        href={selectedFolio.officialPortal}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#c59b4c] hover:underline inline-flex items-center gap-1 mt-1 font-bold"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CAMPUSES */}
              {activeDossierTab === "campuses" && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl text-[#f5efe6] font-normal">
                    Admitting Institutes &amp; Centers of Excellence ({selectedFolio.institutes.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedFolio.institutes.map((inst, i) => (
                      <div key={i} className="p-4 rounded-xl bg-[#1c1712] border border-stone-800 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-[#f5efe6]">
                          <span>{inst.name}</span>
                          <span className="text-[#c59b4c] font-mono font-normal">{inst.campus}</span>
                        </div>
                        <p className="text-xs text-stone-400 leading-relaxed font-sans">{inst.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: PATTERN */}
              {activeDossierTab === "pattern" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 font-mono text-xs text-center">
                    <div className="p-4 rounded-xl bg-[#1c1712] border border-stone-800">
                      <span className="text-stone-500 block">Duration</span>
                      <span className="text-lg text-[#f5efe6] font-serif font-bold mt-1 block">{selectedFolio.duration}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#1c1712] border border-stone-800">
                      <span className="text-stone-500 block">Total Marks</span>
                      <span className="text-lg text-[#f5efe6] font-serif font-bold mt-1 block">{selectedFolio.totalMarks}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#1c1712] border border-stone-800">
                      <span className="text-stone-500 block">Total Questions</span>
                      <span className="text-lg text-[#f5efe6] font-serif font-bold mt-1 block">{selectedFolio.questionCount}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-widest text-[#c59b4c] font-mono">Sectional Matrix</h4>
                    <div className="border border-stone-800 rounded-xl overflow-hidden font-mono text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-[#15120e] text-stone-400 border-b border-stone-800">
                          <tr>
                            <th className="p-3">Section</th>
                            <th className="p-3">Questions</th>
                            <th className="p-3">Marks</th>
                            <th className="p-3">Format</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800/80">
                          {selectedFolio.patternBreakdown.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-stone-900/40">
                              <td className="p-3 font-bold text-[#f5efe6]">{row.section}</td>
                              <td className="p-3 text-stone-300">{row.questions}</td>
                              <td className="p-3 text-[#c59b4c]">{row.marks}</td>
                              <td className="p-3 text-stone-400">{row.nature}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#15120e] border border-stone-800 text-xs font-mono text-stone-300">
                    <strong className="text-[#c59b4c]">Marking Protocol:</strong> {selectedFolio.markingRules}
                  </div>
                </div>
              )}

              {/* TAB 4: SYLLABUS RIGOR */}
              {activeDossierTab === "syllabus" && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl text-[#f5efe6] font-normal">Subject-Wise Curricular Depth</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedFolio.syllabusDepth.map((sub, sIdx) => (
                      <div key={sIdx} className="p-4 rounded-xl bg-[#1c1712] border border-stone-800 space-y-2.5">
                        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                          <h4 className="font-bold text-[#f5efe6] text-sm">{sub.subject}</h4>
                        </div>
                        <ul className="space-y-1 text-xs text-stone-300">
                          {sub.keyAreas.map((area, aIdx) => (
                            <li key={aIdx} className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-[#c59b4c]" />
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2 border-t border-stone-800/80 text-[11px] text-[#c59b4c] italic font-serif">
                          Note: {sub.rigorNote}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: CAREER */}
              {activeDossierTab === "career" && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl text-[#f5efe6] font-normal">Global Postgraduate &amp; Research Destinations</h3>
                  <div className="space-y-3">
                    {selectedFolio.careerHorizons.map((car, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1c1712] border border-stone-800 text-xs sm:text-sm text-stone-200">
                        <Check className="w-4 h-4 text-[#c59b4c] shrink-0 mt-0.5" />
                        <span>{car}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Dossier Footer Action Bar */}
            <div className="p-4 sm:p-6 bg-[#15120e] border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
              <span className="text-stone-500">Practice with official past year examinations.</span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/pyq"
                  onClick={() => setSelectedFolio(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-stone-900 border border-stone-700 text-[#f5efe6] hover:bg-stone-800 transition text-center"
                >
                  View Past Papers Archive
                </Link>
                <Link
                  href="/tests"
                  onClick={() => setSelectedFolio(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#c59b4c] text-[#15120e] font-bold hover:bg-[#d6aa57] transition text-center"
                >
                  Join Proctored Test Series
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          CHAPTER III: DIRECT ACADEMIC HELP DESK
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-stone-800 scroll-mt-20">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#1c1712] border border-stone-800 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c59b4c] font-mono block">
              Chapter III • Communications
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#f5efe6]">
              Academic Support &amp; Leadership Directory
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 font-serif">
              Have queries regarding paper solutions, proctored mock access, or fee waivers? Our academic desk responds within 2–4 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            
            <a
              href="tel:+917004283531"
              className="p-5 rounded-xl bg-[#15120e] border border-stone-800 hover:border-[#c59b4c] transition group flex flex-col items-center text-center space-y-2"
            >
              <Phone className="w-5 h-5 text-[#c59b4c]" />
              <div className="font-bold text-[#f5efe6]">Telephone Desk</div>
              <div className="text-[#c59b4c]">+91 7004283531</div>
              <span className="text-[10px] text-stone-500 font-sans">Direct Student Inquiries</span>
            </a>

            <a
              href="mailto:support@vigyanprep.com"
              className="p-5 rounded-xl bg-[#15120e] border border-stone-800 hover:border-[#c59b4c] transition group flex flex-col items-center text-center space-y-2"
            >
              <Mail className="w-5 h-5 text-[#c59b4c]" />
              <div className="font-bold text-[#f5efe6]">Institutional Email</div>
              <div className="text-[#c59b4c] truncate max-w-full">support@vigyanprep.com</div>
              <span className="text-[10px] text-stone-500 font-sans">Academic &amp; Solution Desk</span>
            </a>

            <a
              href="https://wa.me/917004283531"
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-xl bg-[#15120e] border border-stone-800 hover:border-[#c59b4c] transition group flex flex-col items-center text-center space-y-2"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <div className="font-bold text-[#f5efe6]">WhatsApp Support</div>
              <div className="text-emerald-400">+91 7004283531</div>
              <span className="text-[10px] text-stone-500 font-sans">Quick Doubt Clearing</span>
            </a>

            <div className="p-5 rounded-xl bg-[#15120e] border border-stone-800 flex flex-col items-center text-center space-y-2">
              <Building2 className="w-5 h-5 text-[#c59b4c]" />
              <div className="font-bold text-[#f5efe6]">Headquarters</div>
              <div className="text-stone-300 font-sans text-xs">Vigyan Prep Education</div>
              <span className="text-[10px] text-stone-500 font-sans">India&apos;s Pure Science Entrance Hub</span>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
