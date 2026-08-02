"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, UserCheck, Menu, X } from "lucide-react";
import { getCookie } from "../lib/cookies";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
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

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          3 DECOUPLED FLOATING GLASS PILLS (Left Logo | Middle Nav | Right Student Sign In)
         ═══════════════════════════════════════════════════════════════════════ */}
      
      {/* 1. LEFT FLOATING PILL: LOGO PLACEHOLDER */}
      <div className="fixed top-5 left-6 sm:left-10 z-50 flex items-center">
        <Link
          href="/"
          className={`flex items-center gap-2.5 px-4 py-2 rounded-full border-2 transition-all duration-300 ${
            scrolled
              ? "bg-white/85 backdrop-blur-2xl border-amber-950/30 shadow-xl"
              : "bg-white/75 backdrop-blur-xl border-amber-950/20 shadow-md"
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-800 text-white font-serif font-bold text-base flex items-center justify-center shadow-md">
            V
          </div>
          <div className="text-left">
            <span className="font-serif italic font-extrabold text-base text-[#1c1815] tracking-tight">
              VIGYAN<span className="font-sans text-[10px] uppercase text-amber-900 font-extrabold ml-1">.prep</span>
            </span>
            <span className="block text-[7px] font-extrabold tracking-widest text-amber-900 uppercase">RESEARCH ENTRANCES</span>
          </div>
        </Link>
      </div>

      {/* 2. MIDDLE FLOATING PILL: NAVIGATION LINKS */}
      <nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1.5 p-1.5 rounded-full border-2 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-2xl border-amber-950/30 shadow-xl"
            : "bg-white/75 backdrop-blur-xl border-amber-950/20 shadow-md"
        }`}
      >
        <Link
          href="/"
          className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all ${
            isActive('/')
              ? "bg-[#1c1815] text-amber-300 shadow-md"
              : "text-[#1c1815] hover:bg-white/60 hover:text-amber-950"
          }`}
        >
          Home
        </Link>

        <Link
          href="/tests"
          className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all ${
            isActive('/tests')
              ? "bg-[#1c1815] text-amber-300 shadow-md"
              : "text-[#1c1815] hover:bg-white/60 hover:text-amber-950"
          }`}
        >
          Test Series
        </Link>

        <Link
          href="/pyq/iiser"
          className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all ${
            isActive('/pyq/iiser')
              ? "bg-[#1c1815] text-amber-300 shadow-md"
              : "text-[#1c1815] hover:bg-white/60 hover:text-amber-950"
          }`}
        >
          PYQs
        </Link>

        <Link
          href="/about"
          className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all ${
            isActive('/about')
              ? "bg-[#1c1815] text-amber-300 shadow-md"
              : "text-[#1c1815] hover:bg-white/60 hover:text-amber-950"
          }`}
        >
          About Us
        </Link>
      </nav>

      {/* 3. RIGHT FLOATING PILL: STUDENT SECTION BUTTON */}
      <div className="fixed top-5 right-6 sm:right-10 z-50 hidden md:flex items-center">
        {isLoggedIn ? (
          <a
            href="https://test.vigyanprep.com/dashboard"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1c1815] hover:bg-black border border-amber-500/30 text-xs font-extrabold text-amber-300 transition-all duration-300 shadow-lg shadow-amber-950/20 group"
          >
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>{studentName ? `${studentName.split(' ')[0]}'s Portal` : "Student Portal"}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        ) : (
          <a
            href="https://auth.vigyanprep.com"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1c1815] hover:bg-black border border-amber-500/30 text-xs font-extrabold text-amber-300 transition-all duration-300 shadow-lg shadow-amber-950/20 group"
          >
            <span>Student Sign In</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        )}
      </div>

      {/* MOBILE HAMBURGER TOGGLE BUTTON */}
      <div className="fixed top-5 right-6 z-50 md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-2xl border-2 border-amber-950/30 text-[#1c1815] shadow-lg"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-6 right-6 z-50 md:hidden p-5 bg-white/95 backdrop-blur-2xl border-2 border-amber-950/25 rounded-3xl shadow-2xl space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl text-xs font-extrabold text-[#1c1815] hover:bg-amber-950/10 transition"
          >
            Home
          </Link>
          <Link
            href="/tests"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl text-xs font-extrabold text-[#1c1815] hover:bg-amber-950/10 transition"
          >
            Test Series
          </Link>
          <Link
            href="/pyq/iiser"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl text-xs font-extrabold text-[#1c1815] hover:bg-amber-950/10 transition"
          >
            PYQs
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl text-xs font-extrabold text-[#1c1815] hover:bg-amber-950/10 transition"
          >
            About Us
          </Link>
          
          <div className="pt-2 border-t border-amber-950/15">
            <a
              href={isLoggedIn ? "https://test.vigyanprep.com/dashboard" : "https://auth.vigyanprep.com"}
              className="w-full py-3 bg-[#1c1815] text-amber-300 font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md"
            >
              <span>{isLoggedIn ? "Open Student Portal" : "Student Sign In"}</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
