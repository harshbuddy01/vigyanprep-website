"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, UserCheck, Menu, X, Sparkles } from "lucide-react";
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
          HOMEPAGE-MATCHING RICH TEAK & AMBER GOLD FLOATING GLASS NAVBAR
         ═══════════════════════════════════════════════════════════════════════ */}
      
      {/* 1. LEFT FLOATING PILL: OFFICIAL LOGO */}
      <div className="fixed top-5 left-6 sm:left-10 z-50 flex items-center">
        <a
          href="https://vigyanprep.com/"
          className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 group ${
            scrolled
              ? "bg-[#161310]/95 backdrop-blur-2xl border-amber-500/40 shadow-2xl shadow-black/80"
              : "bg-[#1c1815]/90 backdrop-blur-xl border-amber-500/30 shadow-xl shadow-black/60"
          }`}
          title="Go to VigyanPrep Homepage"
        >
          <img
            src="/vigyan-logo-light.png"
            alt="VigyanPrep Official Logo"
            className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden lg:block text-[8px] font-extrabold tracking-widest text-amber-400/90 uppercase border-l border-amber-500/30 pl-2.5">
            RESEARCH ENTRANCES
          </span>
        </a>
      </div>

      {/* 2. MIDDLE FLOATING PILL: HOMEPAGE GRADIENT NAVIGATION LINKS */}
      <nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1.5 p-1.5 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-[#161310]/95 backdrop-blur-2xl border-amber-500/40 shadow-2xl shadow-black/80"
            : "bg-[#1c1815]/90 backdrop-blur-xl border-amber-500/30 shadow-xl shadow-black/60"
        }`}
      >
        <Link
          href="/"
          className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all ${
            isActive('/')
              ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/30"
              : "text-amber-100/90 hover:bg-white/10 hover:text-amber-300"
          }`}
        >
          Home
        </Link>

        <Link
          href="/tests"
          className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all ${
            isActive('/tests')
              ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/30"
              : "text-amber-100/90 hover:bg-white/10 hover:text-amber-300"
          }`}
        >
          Test Series
        </Link>

        <Link
          href="/pyq/iiser"
          className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all ${
            isActive('/pyq/iiser')
              ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/30"
              : "text-amber-100/90 hover:bg-white/10 hover:text-amber-300"
          }`}
        >
          PYQs
        </Link>

        <Link
          href="/about"
          className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all ${
            isActive('/about')
              ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/30"
              : "text-amber-100/90 hover:bg-white/10 hover:text-amber-300"
          }`}
        >
          About Us
        </Link>
      </nav>

      {/* 3. RIGHT FLOATING PILL: HOMEPAGE GOLDEN STUDENT BUTTON */}
      <div className="fixed top-5 right-6 sm:right-10 z-50 hidden md:flex items-center">
        {isLoggedIn ? (
          <a
            href="https://test.vigyanprep.com/dashboard"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 border border-amber-300/40 text-xs font-extrabold text-black transition-all duration-300 shadow-xl shadow-amber-500/30 group"
          >
            <UserCheck className="w-4 h-4 text-black" />
            <span>{studentName ? `${studentName.split(' ')[0]}'s Portal` : "Student Portal"}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        ) : (
          <a
            href="https://auth.vigyanprep.com"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 border border-amber-300/40 text-xs font-extrabold text-black transition-all duration-300 shadow-xl shadow-amber-500/30 group"
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
          className="p-2.5 rounded-2xl bg-[#1c1815]/90 backdrop-blur-2xl border border-amber-500/40 text-amber-300 shadow-xl"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-6 right-6 z-50 md:hidden p-5 bg-[#161310]/95 backdrop-blur-2xl border border-amber-500/40 rounded-3xl shadow-2xl space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl text-xs font-extrabold text-amber-100 hover:bg-white/10 transition"
          >
            Home
          </Link>
          <Link
            href="/tests"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl text-xs font-extrabold text-amber-100 hover:bg-white/10 transition"
          >
            Test Series
          </Link>
          <Link
            href="/pyq/iiser"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl text-xs font-extrabold text-amber-100 hover:bg-white/10 transition"
          >
            PYQs
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl text-xs font-extrabold text-amber-100 hover:bg-white/10 transition"
          >
            About Us
          </Link>
          
          <div className="pt-2 border-t border-amber-500/20">
            <a
              href={isLoggedIn ? "https://test.vigyanprep.com/dashboard" : "https://auth.vigyanprep.com"}
              className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg"
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
