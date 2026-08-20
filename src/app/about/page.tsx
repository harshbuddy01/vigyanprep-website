"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ChevronRight,
  ChevronLeft
} from "lucide-react";

export default function AboutPage() {
  const [spread, setSpread] = useState<number>(1);

  // Keyboard navigation for turning book pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setSpread((prev) => Math.min(3, prev + 1));
      } else if (e.key === "ArrowLeft") {
        setSpread((prev) => Math.max(1, prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#1c1917] text-[#2c241d] font-serif selection:bg-[#c99742] selection:text-black relative overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      {/* Atmospheric Wooden Desk Backdrop with Ambient Top Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,#2c221a_0%,#0e0c0a_100%)] z-0" />

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
            disabled={spread === 3}
            onClick={() => setSpread((prev) => Math.min(3, prev + 1))}
            className="hidden sm:flex absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#faf5e8] border border-[#d6cbaf] text-[#1c1815] shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 disabled:opacity-0 disabled:pointer-events-none cursor-pointer group"
            title="Next Page (→)"
          >
            <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* ═══════════════════════════════════════════════════════════════════
              THE PHYSICAL OPEN BOOK (PAGES WITH REAL PAPER EDGES & CENTER CREASE)
             ═══════════════════════════════════════════════════════════════════ */}
          <div className="relative bg-[#f8f4e6] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.1),-8px_0_20px_rgba(0,0,0,0.15),8px_0_20px_rgba(0,0,0,0.15)] overflow-hidden border-t border-b border-[#e3d8be] min-h-[580px] sm:min-h-[640px] flex flex-col justify-between">
            
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
              <div className="grid grid-cols-1 md:grid-cols-2 relative z-10 flex-1">
                
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
                        Born from a profound reverence for pure empirical science and mathematical deduction, <strong>VigyanPrep</strong> was established not merely as a test platform, but as an artisanal sanctuary for India&apos;s research scholars. We believe that true scientific learning is an art form—one that bridges the soul of the inquirer with the immutable laws of nature.
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
                          src="/images/sketch-university-campus.jpg"
                          alt="University research campus sketch"
                          fill
                          className="object-cover sepia-[0.2]"
                          priority
                        />
                      </div>
                      
                      <div className="pt-2 text-center">
                        <span className="font-serif italic text-xs text-[#5c4d3e] font-semibold">
                          The 7 IISER Campuses &amp; IISc Bangalore
                        </span>
                      </div>
                    </div>

                    {/* Taped Polaroid 2: First Principles Laboratory */}
                    <div className="relative p-3 bg-white rounded shadow-lg border border-[#ded4bc] max-w-[280px] sm:max-w-[300px] mx-auto rotate-2 hover:rotate-0 transition-transform duration-300">
                      {/* Frosted Scotch Tape */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs rotate-[2deg] z-10" />

                      <div className="relative h-32 sm:h-36 w-full rounded overflow-hidden bg-[#e0d6bd]">
                        <Image
                          src="/images/sketch-student-studying.jpg"
                          alt="Student working on first-principles derivations"
                          fill
                          className="object-cover sepia-[0.2]"
                        />
                      </div>
                      
                      <div className="pt-2 text-center">
                        <span className="font-serif italic text-xs text-[#5c4d3e] font-semibold">
                          First-Principles Problem Solving
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
                SPREAD 2: COMMON INQUIRIES POSTCARD BOARD (PAGES 03 & 04)
               ═════════════════════════════════════════════════════════════════ */}
            {spread === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 relative z-10 flex-1 animate-fadeIn">
                
                {/* LEFT PAGE (PAGE 03) */}
                <div className="p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e5dcbf] bg-[#f8f4e6]">
                  <div className="space-y-6">
                    <div>
                      <span className="font-serif italic text-base text-[#8c672b] tracking-wider block mb-1">
                        Chapter II.
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
                    — 03 —
                  </div>
                </div>

                {/* RIGHT PAGE (PAGE 04) */}
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
                    — 04 —
                  </div>
                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                SPREAD 3: THE HELP DESK DIRECTORY & ACTIONS (PAGES 05 & 06)
               ═════════════════════════════════════════════════════════════════ */}
            {spread === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 relative z-10 flex-1 animate-fadeIn">
                
                {/* LEFT PAGE (PAGE 05) - THE HELP DESK */}
                <div className="p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e5dcbf] bg-[#f8f4e6]">
                  <div className="space-y-6">
                    <div>
                      <span className="font-serif italic text-base text-[#8c672b] tracking-wider block mb-1">
                        Chapter III.
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
                    — 05 —
                  </div>
                </div>

                {/* RIGHT PAGE (PAGE 06) - COMMENCING EXPEDITION */}
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
                    — 06 —
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
                  Pages {spread * 2 - 1} &amp; {spread * 2} of 6
                </span>
                <span className="text-[#695a4c] hidden sm:inline">•</span>
                <span className="text-[#695a4c] italic hidden sm:inline">
                  {spread === 1 && "The Vigyan Chronicles"}
                  {spread === 2 && "Common Inquiries"}
                  {spread === 3 && "The Help Desk"}
                </span>
              </div>

              {/* Spread Indicator Dots */}
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((s) => (
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
                  disabled={spread === 3}
                  onClick={() => setSpread((prev) => Math.min(3, prev + 1))}
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
