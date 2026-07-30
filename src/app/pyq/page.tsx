"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, PlayCircle, Download, FileText, FlaskConical, Atom, Dna, Calculator, CheckCircle2, Award } from "lucide-react";

interface PyqPaper {
  id: string;
  title: string;
  examType: string;
  year: string;
  questionsCount: number;
  duration: number;
  marks: number;
  subjects: string[];
}

const fallbackPapers: PyqPaper[] = [
  {
    id: "pyq_iat_2024",
    title: "IISER IAT 2024 Official Question Paper",
    examType: "IAT",
    year: "2024",
    questionsCount: 60,
    duration: 180,
    marks: 240,
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
  },
  {
    id: "pyq_nest_2024",
    title: "NISER NEST 2024 Official Question Paper",
    examType: "NEST",
    year: "2024",
    questionsCount: 68,
    duration: 210,
    marks: 200,
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
  },
  {
    id: "pyq_iat_2023",
    title: "IISER IAT 2023 Official Question Paper",
    examType: "IAT",
    year: "2023",
    questionsCount: 60,
    duration: 180,
    marks: 240,
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
  },
  {
    id: "pyq_nest_2023",
    title: "NISER NEST 2023 Official Question Paper",
    examType: "NEST",
    year: "2023",
    questionsCount: 68,
    duration: 210,
    marks: 200,
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
  },
  {
    id: "pyq_iat_2022",
    title: "IISER IAT 2022 Official Question Paper",
    examType: "IAT",
    year: "2022",
    questionsCount: 60,
    duration: 180,
    marks: 240,
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
  },
  {
    id: "pyq_cmi_2024",
    title: "CMI B.Math & B.Sc Entrance 2024",
    examType: "CMI",
    year: "2024",
    questionsCount: 20,
    duration: 180,
    marks: 100,
    subjects: ["Mathematics", "Advanced Calculus"],
  },
];

export default function PyqPage() {
  const [selectedExam, setSelectedExam] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [papers, setPapers] = useState<PyqPaper[]>(fallbackPapers);

  useEffect(() => {
    async function loadLivePyqs() {
      try {
        const res = await fetch("https://api.vigyanprep.com/api/public/pyq");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.tests) && data.tests.length > 0) {
            const liveData: PyqPaper[] = data.tests.map((t: any) => ({
              id: t.id,
              title: t.title,
              examType: t.test_type || "IAT",
              year: "2024",
              questionsCount: t.total_questions || 60,
              duration: t.duration_minutes || 180,
              marks: (t.total_questions || 60) * 4,
              subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
            }));
            setPapers([...liveData, ...fallbackPapers]);
          }
        }
      } catch (err) {
        console.warn("API offline, using pre-rendered question bank", err);
      }
    }
    loadLivePyqs();
  }, []);

  const filteredPapers = papers.filter((p) => {
    const matchesExam = selectedExam === "ALL" || p.examType.toUpperCase() === selectedExam.toUpperCase();
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.year.includes(searchQuery);
    return matchesExam && matchesSearch;
  });

  const launchTest = (testId: string) => {
    window.location.href = `https://test.vigyanprep.com/exam?testId=${testId}`;
  };

  return (
    <div className="min-h-screen bg-[#141009] text-amber-50 selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* Blueprint Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#fcd34d_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      {/* Hero Header */}
      <header className="relative z-10 pt-36 pb-16 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6">
          <Award className="w-4 h-4 text-amber-400" /> Research-Grade Verified PYQ Archive
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-amber-100 via-amber-200 to-amber-500 bg-clip-text text-transparent mb-6">
          Previous Year Questions & Live Tests
        </h1>
        <p className="text-neutral-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Attempt official IISER IAT, NISER NEST, IISc & CMI question papers in real-time proctored exam conditions or download verified answer keys.
        </p>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 p-6 rounded-2xl bg-neutral-900/60 border border-amber-500/20 backdrop-blur-md">
          <div>
            <div className="font-serif text-3xl font-bold text-amber-400">1,450+</div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Solved Questions</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-amber-400">8 Years</div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Official Papers</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-amber-400">100%</div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Verified Keys</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-amber-400">4 Subjects</div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Phy, Chem, Math, Bio</div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
        {/* Subject Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-neutral-900/80 to-neutral-950/80 border border-amber-500/20 hover:border-amber-400 transition-all">
            <Atom className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">Physics PYQs</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">Mechanics, Quantum, Electrodynamics & Optics archive.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-b from-neutral-900/80 to-neutral-950/80 border border-amber-500/20 hover:border-amber-400 transition-all">
            <FlaskConical className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">Chemistry PYQs</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">Organic mechanisms, Equilibria & Coordination compounds.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-b from-neutral-900/80 to-neutral-950/80 border border-amber-500/20 hover:border-amber-400 transition-all">
            <Calculator className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">Mathematics PYQs</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">Calculus, Linear Algebra & Proof-based CMI/ISI papers.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-b from-neutral-900/80 to-neutral-950/80 border border-amber-500/20 hover:border-amber-400 transition-all">
            <Dna className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">Biology PYQs</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">Genetics, Cell Biology, Biotechnology & Plant Physiology.</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="flex flex-wrap gap-2">
            {["ALL", "IAT", "NEST", "CMI"].map((exam) => (
              <button
                key={exam}
                onClick={() => setSelectedExam(exam)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedExam === exam
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/20"
                    : "bg-neutral-900/80 border border-white/10 text-neutral-300 hover:border-amber-400"
                }`}
              >
                {exam === "ALL" ? "All Papers" : exam}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
            <input
              type="text"
              placeholder="Search paper or year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral-900/90 border border-amber-500/20 text-xs text-amber-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-neutral-900/70 border border-amber-500/20 hover:border-amber-400 transition-all hover:-translate-y-1 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 border border-orange-500/40 text-orange-400">
                    {paper.examType}
                  </span>
                  <span className="font-serif text-lg font-bold text-amber-300">{paper.year}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-neutral-100 mb-3">{paper.title}</h3>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {paper.subjects.map((s) => (
                    <span key={s} className="px-2.5 py-0.5 rounded-md text-[10px] bg-white/5 text-neutral-400 border border-white/5">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 pt-4 border-t border-white/5 mb-5">
                  <span>{paper.questionsCount} Questions</span>
                  <span>{paper.duration} Mins</span>
                  <span>{paper.marks} Marks</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => launchTest(paper.id)}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold text-xs hover:opacity-90 transition-all shadow-md shadow-amber-500/20"
                  >
                    <PlayCircle className="w-4 h-4" /> Live Test
                  </button>
                  <button
                    onClick={() => alert(`Downloading ${paper.title} PDF...`)}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-amber-500/30 text-amber-200 font-medium text-xs hover:bg-amber-500/10 transition-all"
                  >
                    <Download className="w-4 h-4" /> PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
