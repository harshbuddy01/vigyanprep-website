"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Sparkles, HelpCircle, Newspaper, Award, UserCheck } from "lucide-react";
import { getCookie } from "../lib/cookies";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    // Check shared subdomain cookie & local storage
    const token = getCookie("student_token") || (typeof window !== "undefined" ? localStorage.getItem("student_token") : null);
    const name = getCookie("student_name") || (typeof window !== "undefined" ? localStorage.getItem("student_name") : null);
    
    setIsLoggedIn(!!token);
    if (name) {
      setStudentName(name);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fluid Floating Glass Navbar */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-2 rounded-full transition-all duration-500 border ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-2xl border-amber-500/30 shadow-2xl shadow-black/80"
            : "bg-white/[0.03] backdrop-blur-xl border-white/10 shadow-xl"
        }`}
      >
        {/* Shimmering Logo Pill */}
        <Link href="/" className="px-5 py-2 font-display text-lg font-bold tracking-widest uppercase animate-shimmer">
          Vigyan<span className="text-xs font-sans tracking-normal lowercase opacity-70 ml-1">.prep</span>
        </Link>

        {/* Courses Dropdown */}
        <div className="relative group">
          <button className="px-4 py-2 text-xs font-medium tracking-wide text-white/70 hover:text-white transition-colors rounded-full">
            Courses
          </button>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 p-3 bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 px-3 py-1">Featured Programs</span>
            <Link href="/courses/iat" className="flex items-center gap-3 p-2.5 text-xs text-white hover:bg-white/10 rounded-xl transition">
              <GraduationCap className="w-4 h-4 text-amber-400" /> IISER IAT 2025 Masterclass
            </Link>
            <Link href="/courses/nest" className="flex items-center gap-3 p-2.5 text-xs text-white hover:bg-white/10 rounded-xl transition">
              <Sparkles className="w-4 h-4 text-orange-400" /> NISER NEST 2025 Target Batch
            </Link>
            <Link href="/courses/cmi" className="flex items-center gap-3 p-2.5 text-xs text-white hover:bg-white/10 rounded-xl transition">
              <Award className="w-4 h-4 text-yellow-400" /> CMI & ISI Proof-Based Math
            </Link>
          </div>
        </div>

        {/* PYQ Link */}
        <div className="relative group">
          <Link href="/pyq/iiser" className="px-4 py-2 text-xs font-medium tracking-wide text-white/70 hover:text-white transition-colors rounded-full">
            PYQs
          </Link>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 p-3 bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 px-3 py-1">Verified Question Papers</span>
            <Link href="/pyq/iiser" className="flex items-center gap-3 p-2.5 text-xs text-white hover:bg-white/10 rounded-xl transition">
              <BookOpen className="w-4 h-4 text-amber-400" /> IISER IAT Solved Archive
            </Link>
            <Link href="/pyq/iiser" className="flex items-center gap-3 p-2.5 text-xs text-white hover:bg-white/10 rounded-xl transition">
              <BookOpen className="w-4 h-4 text-orange-400" /> NISER NEST Official Papers
            </Link>
          </div>
        </div>

        {/* Explore Link */}
        <div className="relative group">
          <button className="px-4 py-2 text-xs font-medium tracking-wide text-white/70 hover:text-white transition-colors rounded-full">
            Explore
          </button>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 p-3 bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 flex flex-col gap-1">
            <Link href="/sciencenews" className="flex items-center gap-3 p-2.5 text-xs text-white hover:bg-white/10 rounded-xl transition">
              <Newspaper className="w-4 h-4 text-amber-400" /> Science News & Research
            </Link>
            <Link href="/your-doubt" className="flex items-center gap-3 p-2.5 text-xs text-white hover:bg-white/10 rounded-xl transition">
              <HelpCircle className="w-4 h-4 text-emerald-400" /> Instant Doubt Solver
            </Link>
          </div>
        </div>

        {/* About Link */}
        <Link href="/about" className="px-4 py-2 text-xs font-medium tracking-wide text-white/70 hover:text-white transition-colors rounded-full">
          About
        </Link>
      </nav>

      {/* Top Right Floating Login / Dashboard Button */}
      {isLoggedIn ? (
        <a
          href="https://test.vigyanprep.com/dashboard"
          className="fixed top-6 right-8 z-50 hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/30 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all duration-300 shadow-xl group"
        >
          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{studentName ? `${studentName} (Dashboard)` : "Student Dashboard"}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      ) : (
        <a
          href="https://auth.vigyanprep.com"
          className="fixed top-6 right-8 z-50 hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/12 text-xs font-semibold text-[#f2ead8] hover:bg-white/10 hover:border-amber-400/40 hover:text-amber-300 transition-all duration-300 shadow-xl group"
        >
          <span>Student Login</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      )}
    </>
  );
}
