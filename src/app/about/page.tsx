"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#241e12] text-amber-50 selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* HERO: Full-Width Sketch Banner */}
      <header className="relative pt-28 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* University Campus Sketch */}
          <div className="relative w-full rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-black/60">
            <Image
              src="/images/sketch-university-campus.jpg"
              alt="Hand-drawn university campus sketch showing students exploring global research opportunities"
              width={1600}
              height={900}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241e12] via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold uppercase tracking-widest mb-3">
                The Mission & Philosophy
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                What is <em className="text-amber-300">Vigyan</em>?
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* MEANING OF VIGYAN */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Sanskrit Origins</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mt-2 mb-6">
              विज्ञान — Vi + Gyan
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-amber-200">Vi (वि)</strong> — means <em>&ldquo;Supreme, Empirical, Distinguished&rdquo;</em>. It signifies knowledge that is not merely theoretical but tested, observed, and proven through rigorous experimentation.
            </p>
            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-amber-200">Gyan (ज्ञान)</strong> — means <em>&ldquo;Knowledge, Wisdom, Understanding&rdquo;</em>. The deepest form of knowing — not memorization, but true comprehension of the natural world.
            </p>
            <p className="text-neutral-300 leading-relaxed">
              Together, <strong className="text-amber-200">Vigyan (विज्ञान)</strong> is <em>&ldquo;Supreme Empirical Knowledge&rdquo;</em> — the pursuit of understanding through observation, hypothesis, and proof. This is exactly what IISER, NISER, and IISc entrance exams test.
            </p>
          </div>

          {/* Student Studying Sketch */}
          <div className="rounded-2xl overflow-hidden border border-amber-500/20 shadow-xl">
            <Image
              src="/images/sketch-student-studying.jpg"
              alt="Hand-drawn sketch of a student studying science late at night with university in background"
              width={800}
              height={450}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHY VIGYAN.PREP */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Why We Exist</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-100 mt-2">
            Why Vigyan.prep Was Launched
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-neutral-900/50 border border-amber-500/15 hover:border-amber-400/40 transition-all">
            <h3 className="font-serif text-xl font-bold text-amber-100 mb-3">
              🔬 Built Exclusively for Science Research Aspirants
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Generic coaching platforms treat IISER IAT and NISER NEST as afterthoughts behind JEE/NEET. We built Vigyan.prep <strong className="text-amber-200">ground-up, exclusively</strong> for pure science research entrance exams. No filler. No compromise.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-neutral-900/50 border border-amber-500/15 hover:border-amber-400/40 transition-all">
            <h3 className="font-serif text-xl font-bold text-amber-100 mb-3">
              🏆 Uncompromised Premium Test Series
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              You will <strong className="text-amber-200">never find generic low-quality questions</strong> on this platform. Every paper is curated by IISER alumni, PhD researchers, and top rankers who understand the exact exam blueprint.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-neutral-900/50 border border-amber-500/15 hover:border-amber-400/40 transition-all">
            <h3 className="font-serif text-xl font-bold text-amber-100 mb-3">
              🖥️ NTA-Standard Proctored Exam Portal
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Practice in the exact zero-distraction black exam engine used by national testing agencies — with section tabs, question palettes, mark-for-review, and tab-switch proctoring with auto-submission.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-neutral-900/50 border border-amber-500/15 hover:border-amber-400/40 transition-all">
            <h3 className="font-serif text-xl font-bold text-amber-100 mb-3">
              🌍 Pathway to Global Scientific Excellence
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Our students don&apos;t just crack exams — they enter IISERs, NISER, IISc Bangalore, CMI, and later pursue PhDs at MIT, Cambridge, Harvard, ETH Zürich, and Max Planck Institutes.
            </p>
          </div>
        </div>
      </section>

      {/* STUDENT JOURNEY */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 border border-amber-500/25 backdrop-blur-sm">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">The Journey</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mt-2">
              From Aspirant → IISER Researcher → Global Scientist
            </h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-950/40 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center shrink-0 text-sm shadow-lg shadow-amber-500/40">1</div>
              <div>
                <h4 className="font-serif font-bold text-amber-100">Foundation & Concept Mastery</h4>
                <p className="text-xs text-neutral-400 mt-1">Deep-dive into Physics, Chemistry, Math & Biology concepts tailored for IAT & NEST patterns.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-950/40 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center shrink-0 text-sm shadow-lg shadow-amber-500/40">2</div>
              <div>
                <h4 className="font-serif font-bold text-amber-100">Timed PYQ & Mock Testing</h4>
                <p className="text-xs text-neutral-400 mt-1">Attempt 8+ years of official PYQs inside our timed proctored exam engine with instant score diagnostics.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-950/40 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center shrink-0 text-sm shadow-lg shadow-amber-500/40">3</div>
              <div>
                <h4 className="font-serif font-bold text-amber-100">Selection & Global Research Entry</h4>
                <p className="text-xs text-neutral-400 mt-1">Securing top AIR ranks to join IISER Pune, Kolkata, Mohali, Bhopal, TVM, Tirupati, Berhampur & NISER — then onward to global PhD programs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
