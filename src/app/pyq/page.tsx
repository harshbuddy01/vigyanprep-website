"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search, PlayCircle, Download, FileText, FlaskConical, Atom, Dna,
  Calculator, CheckCircle2, Award, ArrowRight, ShieldCheck, Filter,
  BookOpen, Sparkles, TrendingUp, HelpCircle, Clock, Star, CheckSquare
} from "lucide-react";

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

export default function PyqPage() {
  const [selectedExam, setSelectedExam] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [papers, setPapers] = useState<PyqPaper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLivePyqs() {
      try {
        const res = await fetch("https://api.vigyanprep.com/api/public/pyq");
        if (res.ok) {
          const data = await res.json();
          const liveList = data.papers || data.tests || data.pyqs || [];
          if (Array.isArray(liveList)) {
            const liveData: PyqPaper[] = liveList.map((t: any) => ({
              id: t.id,
              title: t.title || t.name,
              examType: t.exam_type || t.test_type || "IAT",
              year: String(t.pyq_year || t.year || (t.title && t.title.match(/\d{4}/) ? t.title.match(/\d{4}/)[0] : "2025")),
              questionsCount: t.total_questions || t.questions_count || 60,
              duration: t.duration_minutes || 180,
              marks: t.total_marks || (t.total_questions || t.questions_count || 60) * 4,
              subjects: t.subjects || ["Physics", "Chemistry", "Mathematics", "Biology"],
            }));
            setPapers(liveData);
          }
        }
      } catch (err) {
        console.warn("Failed to load PYQs from API", err);
      } finally {
        setLoading(false);
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
    window.location.href = `https://test.vigyanprep.com/instructions?testId=${testId}`;
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1c1815] selection:bg-amber-400 selection:text-black font-sans relative overflow-x-hidden">
      <Navbar />

      {/* Subtle Torn Paper & Grid Background Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#e5dec9_1px,transparent_1px),linear-gradient(to_bottom,#e5dec9_1px,transparent_1px)] [background-size:32px_32px] z-0" />
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#b89446_1px,transparent_1px)] [background-size:16px_16px] z-0" />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION (Matching Reference Image 2)
         ═══════════════════════════════════════════════════════════════════════ */}
      <header className="relative z-10 pt-32 sm:pt-40 pb-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* LEFT: SPIRAL NOTEBOOK CHECKLIST CARD */}
          <div className="lg:col-span-3 hidden sm:block">
            <div className="bg-[#fcfbfa] border-2 border-amber-900/20 rounded-2xl p-6 shadow-xl relative transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              {/* Metal Binder Rings Graphic */}
              <div className="absolute -left-3 top-6 bottom-6 flex flex-col justify-between z-20">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-5 h-3 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 rounded-full border border-gray-600 shadow-sm" />
                ))}
              </div>
              {/* Paperclip */}
              <div className="absolute top-3 right-4 w-4 h-10 border-2 border-neutral-400 rounded-full z-20 opacity-70 transform rotate-12" />

              <div className="pl-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-amber-900/15 pb-2">
                  <span className="text-amber-700 font-extrabold text-sm tracking-wider uppercase flex items-center gap-1">
                    📌 FOCUS
                  </span>
                </div>
                <ul className="space-y-2.5 text-xs font-semibold text-neutral-800">
                  <li className="flex items-center gap-2">
                    <CheckSquare size={16} className="text-amber-700 shrink-0" />
                    <span>Understand</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckSquare size={16} className="text-amber-700 shrink-0" />
                    <span>Practice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckSquare size={16} className="text-amber-700 shrink-0" />
                    <span>Analyze</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckSquare size={16} className="text-amber-700 shrink-0" />
                    <span>Improve</span>
                  </li>
                </ul>
                <div className="pt-2 border-t border-amber-900/15 text-center">
                  <span className="font-serif italic font-extrabold text-lg text-amber-900 block">Succeed.</span>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: TITLE & SUBTITLE */}
          <div className="lg:col-span-6 text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/10 border border-amber-950/20 text-amber-950 text-xs font-bold uppercase tracking-widest shadow-xs">
              <ShieldCheck className="w-4 h-4 text-amber-700" /> Research-Grade Verified PYQ Archive
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1c1815] leading-[1.15]">
              Previous Year Questions <span className="font-serif italic text-amber-800 font-extrabold">& Live Tests</span>
            </h1>

            <p className="text-neutral-700 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
              Attempt official IISER IAT, NISER NEST, IISc & CMI question papers in real-time proctored exam conditions or download verified answer keys.
            </p>
          </div>

          {/* RIGHT: TEXTBOOK STACK & VIGYAN MUG GRAPHIC */}
          <div className="lg:col-span-3 hidden lg:flex flex-col items-center justify-center relative">
            <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-300">
              {/* Stacked Science Textbooks */}
              <div className="space-y-1.5">
                <div className="w-48 h-8 rounded-md bg-[#1b365d] border-2 border-amber-400/40 shadow-md flex items-center px-4 justify-between">
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">PHYSICS</span>
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
                <div className="w-48 h-8 rounded-md bg-[#1a4331] border-2 border-emerald-400/40 shadow-md flex items-center px-4 justify-between">
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">CHEMISTRY</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="w-48 h-8 rounded-md bg-[#4a1c1d] border-2 border-red-400/40 shadow-md flex items-center px-4 justify-between">
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">MATHEMATICS</span>
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                </div>
                <div className="w-48 h-8 rounded-md bg-[#8c6527] border-2 border-amber-300/40 shadow-md flex items-center px-4 justify-between">
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">BIOLOGY</span>
                  <div className="w-2 h-2 rounded-full bg-amber-200" />
                </div>
              </div>

              {/* Ceramic Mug Graphic */}
              <div className="absolute -top-10 -right-6 w-16 h-18 bg-[#1c1815] rounded-xl border-2 border-amber-900/40 shadow-2xl p-2 flex flex-col items-center justify-center">
                <div className="text-[8px] font-serif italic text-amber-200 font-extrabold">Vigyan</div>
                <div className="text-[6px] uppercase tracking-widest text-amber-400 font-bold">PREP</div>
                <div className="absolute -right-3 top-4 w-4 h-7 border-2 border-[#1c1815] rounded-r-full" />
              </div>
            </div>
          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            FLOATING STATS BAR (Matching Reference Image 2)
           ═══════════════════════════════════════════════════════════════════════ */}
        <div className="mt-10 max-w-4xl mx-auto p-4 sm:p-5 rounded-3xl bg-white/80 border-2 border-amber-950/20 backdrop-blur-xl shadow-xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-3 p-2 border-r border-amber-900/10">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 border border-purple-200">
              <FileText size={20} />
            </div>
            <div className="text-left">
              <div className="font-serif text-lg font-bold text-[#1c1815]">1,450+</div>
              <div className="text-[10px] font-bold text-neutral-600 uppercase">Solved Questions</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2 border-r border-amber-900/10">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
              <Award size={20} />
            </div>
            <div className="text-left">
              <div className="font-serif text-lg font-bold text-[#1c1815]">8 Years</div>
              <div className="text-[10px] font-bold text-neutral-600 uppercase">Official Papers</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2 border-r border-amber-900/10">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 border border-blue-200">
              <ShieldCheck size={20} />
            </div>
            <div className="text-left">
              <div className="font-serif text-lg font-bold text-[#1c1815]">100%</div>
              <div className="text-[10px] font-bold text-neutral-600 uppercase">Verified Keys</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 border border-amber-200">
              <BookOpen size={20} />
            </div>
            <div className="text-left">
              <div className="font-serif text-lg font-bold text-[#1c1815]">4 Subjects</div>
              <div className="text-[10px] font-bold text-neutral-600 uppercase">PHY, CHEM, MATH, BIO</div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN CONTENT CONTAINER
         ═══════════════════════════════════════════════════════════════════════ */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 pb-24 space-y-12">

        {/* ═══════════════════════════════════════════════════════════════════════
            PAPER SHOWCASE & USER JOURNEY SECTION (Matching Reference Image 2)
           ═══════════════════════════════════════════════════════════════════════ */}
        <div className="bg-[#fcfbfa] rounded-3xl p-6 sm:p-8 border-2 border-amber-950/20 shadow-2xl space-y-8">
          
          {/* FILTER BAR & SEARCH */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-amber-950/15">
            <div className="flex flex-wrap items-center gap-2">
              {["ALL", "IAT", "NEST", "CMI", "IISc"].map((exam) => (
                <button
                  key={exam}
                  onClick={() => setSelectedExam(exam)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs ${
                    selectedExam === exam
                      ? "bg-[#1c1815] text-amber-300 border border-amber-950/40 shadow-md"
                      : "bg-white border border-amber-900/20 text-neutral-700 hover:border-amber-900/40"
                  }`}
                >
                  {exam === "ALL" ? "All Papers" : exam}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search paper or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-amber-900/20 text-xs font-semibold placeholder:text-neutral-400 focus:outline-none focus:border-amber-900/40 transition"
              />
              <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            </div>
          </div>

          {/* DYNAMIC PAPER LIST & JOURNEY CARDS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT: FEATURED LIVE PAPER CARD (Matching Reference Card) */}
            <div className="lg:col-span-8 space-y-6">
              {loading ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-amber-950/15 space-y-3">
                  <div className="w-8 h-8 border-4 border-amber-900 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-bold text-amber-900">Loading Official Question Archives...</p>
                </div>
              ) : filteredPapers.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-amber-950/15">
                  <p className="text-sm font-bold text-neutral-600">No question papers found matching your search.</p>
                </div>
              ) : (
                filteredPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-amber-950/15 shadow-lg relative overflow-hidden group hover:border-amber-900/40 transition-all"
                  >
                    {/* Floating Book Illustration Background */}
                    <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none transform group-hover:scale-110 transition-transform">
                      <BookOpen size={140} className="text-amber-950" />
                    </div>

                    <div className="relative z-10 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-lg bg-amber-950/10 text-amber-950 text-[10px] font-extrabold uppercase tracking-widest border border-amber-950/20">
                          {paper.examType}
                        </span>
                        <span className="text-xs font-extrabold text-neutral-500">{paper.year} Exam Paper</span>
                      </div>

                      <h3 className="font-serif text-2xl font-extrabold text-[#1c1815]">
                        {paper.title}
                      </h3>

                      {/* Subject Tags */}
                      <div className="flex flex-wrap gap-2">
                        {paper.subjects.map((sub, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[11px] font-bold text-neutral-700">
                            {sub}
                          </span>
                        ))}
                      </div>

                      {/* Metadata Stats */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-neutral-600 pt-2 border-t border-neutral-100">
                        <span className="flex items-center gap-1.5">
                          <HelpCircle size={14} className="text-amber-700" /> {paper.questionsCount} Questions
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-amber-700" /> {paper.duration} Mins
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Star size={14} className="text-amber-700" /> {paper.marks} Marks
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-3">
                        <button
                          onClick={() => launchTest(paper.id)}
                          className="px-6 py-3 rounded-xl bg-[#1c1815] hover:bg-black text-amber-300 text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 border border-amber-500/30"
                        >
                          <PlayCircle size={16} />
                          <span>Start Live Test</span>
                        </button>

                        <button
                          onClick={() => launchTest(paper.id)}
                          className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-extrabold uppercase tracking-wider transition-all border-2 border-amber-950/20 flex items-center gap-2"
                        >
                          <Download size={16} />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* RIGHT: YOUR PYQ JOURNEY PROGRESS CARD (Matching Reference Right Card) */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border-2 border-amber-950/15 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-amber-950/10 pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-950 flex items-center gap-1.5">
                  <TrendingUp size={14} /> YOUR PYQ JOURNEY
                </span>
              </div>

              {/* Progress Graph Illustration */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="h-20 flex items-end justify-between gap-2 pt-4 px-2 border-b border-neutral-200">
                  <div className="w-4 bg-amber-300/40 rounded-t h-[30%]" />
                  <div className="w-4 bg-amber-400/50 rounded-t h-[45%]" />
                  <div className="w-4 bg-amber-500/60 rounded-t h-[40%]" />
                  <div className="w-4 bg-amber-600/70 rounded-t h-[60%]" />
                  <div className="w-4 bg-amber-700/80 rounded-t h-[80%]" />
                  <div className="w-4 bg-amber-900 rounded-t h-[100%]" />
                </div>
                <div className="flex justify-between text-[9px] font-extrabold text-neutral-400 px-1">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>

              {/* Analytics Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-amber-950/5 border border-amber-950/15">
                  <span className="block font-serif text-lg font-bold text-amber-950">12</span>
                  <span className="text-[9px] font-bold text-neutral-600 uppercase">Papers Solved</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-950/5 border border-amber-950/15">
                  <span className="block font-serif text-lg font-bold text-amber-950">87%</span>
                  <span className="text-[9px] font-bold text-neutral-600 uppercase">Accuracy</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-950/5 border border-amber-950/15">
                  <span className="block font-serif text-lg font-bold text-amber-950">36h</span>
                  <span className="text-[9px] font-bold text-neutral-600 uppercase">Time Invested</span>
                </div>
              </div>

              {/* Quote */}
              <div className="p-4 rounded-xl bg-amber-950/10 border border-amber-950/20 text-xs text-amber-950 leading-relaxed font-semibold italic">
                “The more you solve, the clearer your path becomes. Keep going, Future Scientist! 🚀”
              </div>
            </div>

          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            EXPLORE BY SUBJECT GRID (Matching Reference Grid)
           ═══════════════════════════════════════════════════════════════════════ */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-amber-950/15 pb-3">
            <Sparkles size={18} className="text-amber-700" />
            <h2 className="font-serif text-2xl font-bold text-[#1c1815]">Explore by Subject</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* PHYSICS */}
            <div className="p-6 rounded-2xl bg-white border-2 border-amber-950/15 shadow-md hover:shadow-xl transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 flex items-center justify-center">
                <Atom size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1c1815]">Physics PYQs</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Mechanics, Quantum, Electrodynamics & Optics archive.
              </p>
              <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:gap-2 transition-all">
                <span>Explore Physics</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* CHEMISTRY */}
            <div className="p-6 rounded-2xl bg-white border-2 border-amber-950/15 shadow-md hover:shadow-xl transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
                <FlaskConical size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1c1815]">Chemistry PYQs</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Organic mechanisms, Equilibria & Coordination compounds.
              </p>
              <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 hover:gap-2 transition-all">
                <span>Explore Chemistry</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* MATHEMATICS */}
            <div className="p-6 rounded-2xl bg-white border-2 border-amber-950/15 shadow-md hover:shadow-xl transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 flex items-center justify-center">
                <Calculator size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1c1815]">Mathematics PYQs</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Calculus, Linear Algebra & Proof-based CMI/IISc papers.
              </p>
              <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-900 hover:gap-2 transition-all">
                <span>Explore Math</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* BIOLOGY */}
            <div className="p-6 rounded-2xl bg-white border-2 border-amber-950/15 shadow-md hover:shadow-xl transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
                <Dna size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1c1815]">Biology PYQs</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Genetics, Cell Biology, Biotechnology & Plant Physiology.
              </p>
              <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:gap-2 transition-all">
                <span>Explore Biology</span>
                <ArrowRight size={14} />
              </a>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
