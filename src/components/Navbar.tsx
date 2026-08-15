"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, UserCheck, Menu, X, FileText, Info, Users, Mail, Microscope, Rocket, Laptop } from "lucide-react";
import { getCookie } from "../lib/cookies";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isMaintenanceActive, setIsMaintenanceActive] = useState<boolean>(() => {
    const fromCookie = getCookie("maintenance_mode");
    if (fromCookie !== null && fromCookie !== undefined) return fromCookie === "true";
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    // Check shared subdomain cookie
    const token = getCookie("student_token");
    if (!token) {
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("student_token");
          localStorage.removeItem("student_name");
          localStorage.removeItem("student_email");
        } catch (e) {}
      }
      setIsLoggedIn(false);
      setStudentName("");
    } else {
      setIsLoggedIn(true);
      const name = getCookie("student_name") || (typeof window !== "undefined" ? localStorage.getItem("student_name") : null);
      if (name) {
        setStudentName(name);
      }
    }

    async function checkMaintenance() {
      try {
        const res = await fetch("https://api.vigyanprep.com/api/public/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.settings?.maintenanceMode !== undefined) {
            setIsMaintenanceActive(!!data.settings.maintenanceMode);
          }
        }
      } catch (err) {
        console.warn("Website maintenance check error:", err);
      }
    }
    checkMaintenance();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));

  const isLightBg = pathname.startsWith("/tests") || pathname.startsWith("/pyq");
  const logoSrc = isLightBg ? "/vigyan-logo.png" : "/vigyan-logo-light.png";

  return (
    <>
      {isMaintenanceActive && (
        <div className="fixed top-0 inset-x-0 z-[3000] bg-amber-500 text-black py-2 px-4 text-center font-sans font-bold text-xs shadow-lg flex items-center justify-center gap-2">
          <span>⚠️ Scheduled Platform Maintenance Active — Live test sessions & submissions are running in protected mode.</span>
        </div>
      )}
      {/* ═══════════════════════════════════════════════════════════════════════
          IDENTICAL HOMEPAGE FLUID GLASS NAVBAR FOR ALL PAGES
         ═══════════════════════════════════════════════════════════════════════ */}
      
      {/* 1. TOP-LEFT LOGO (Identical 96px Transparent Standalone Logo) */}
      <div className="fixed top-4 left-6 sm:left-9 z-[2000] flex items-center">
        <a
          href="https://vigyanprep.com/"
          className="block transition-transform duration-300 hover:scale-105"
          title="VigyanPrep Homepage"
        >
          <img
            src={logoSrc}
            alt="VigyanPrep Official Logo"
            className="h-16 sm:h-24 w-auto object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
          />
        </a>
      </div>

      {/* 2. CENTER FLUID GLASS NAV BAR (Identical to Homepage .fluid-nav) */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[1000] hidden md:flex items-center gap-1 p-2 rounded-[60px] border transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] ${
          isLightBg
            ? "bg-[#1c1815]/90 backdrop-blur-2xl border-amber-950/40 text-amber-100 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            : scrolled
              ? "bg-[#0a0a0a]/80 backdrop-blur-2xl border-amber-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
              : "bg-[#16120b]/85 backdrop-blur-2xl border-white/15"
        }`}
      >
        {/* Home */}
        <div className="relative group">
          <Link
            href="/"
            className={`px-5 py-2.5 rounded-[50px] text-[0.85rem] font-medium tracking-wide transition-all duration-300 block ${
              isActive('/')
                ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                : "text-white/70 hover:text-white"
            }`}
          >
            Home
          </Link>
        </div>

        {/* PYQ */}
        <div className="relative group">
          <Link
            href="/pyq"
            className={`px-5 py-2.5 rounded-[50px] text-[0.85rem] font-medium tracking-wide transition-all duration-300 flex items-center gap-1 ${
              isActive('/pyq')
                ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                : "text-white/70 hover:text-white"
            }`}
          >
            PYQ
          </Link>
          {/* Dropdown */}
          <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-[#0c0c0c]/90 backdrop-blur-3xl border border-white/15 rounded-3xl p-5 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-[0_30px_60px_rgba(0,0,0,0.7)] flex flex-col gap-2 z-50">
            <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold px-3">
              Previous Years
            </div>
            <Link href="/pyq" className="px-3 py-2 rounded-xl text-sm text-white hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-amber-500" /> IISER IAT
            </Link>
            <Link href="/pyq" className="px-3 py-2 rounded-xl text-sm text-white hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-amber-500" /> NISER NEST
            </Link>
            <Link href="/pyq" className="px-3 py-2 rounded-xl text-sm text-white hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-amber-500" /> IISc
            </Link>
            <Link href="/pyq" className="px-3 py-2 rounded-xl text-sm text-white hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-amber-500" /> CMI & ISI
            </Link>
          </div>
        </div>

        {/* Buy Test Series */}
        <div className="relative group">
          <Link
            href="/tests"
            className={`px-5 py-2.5 rounded-[50px] text-[0.85rem] font-semibold tracking-wide transition-all duration-300 block ${
              isActive('/tests')
                ? "text-amber-400 bg-amber-500/20 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                : "text-[#f59e0b] hover:text-amber-300"
            }`}
          >
            Buy Test Series
          </Link>
        </div>

        {/* About */}
        <div className="relative group">
          <Link
            href="/about"
            className={`px-5 py-2.5 rounded-[50px] text-[0.85rem] font-medium tracking-wide transition-all duration-300 flex items-center gap-1 ${
              isActive('/about')
                ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                : "text-white/70 hover:text-white"
            }`}
          >
            About
          </Link>
          {/* Dropdown */}
          <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-[#0c0c0c]/90 backdrop-blur-3xl border border-white/15 rounded-3xl p-5 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-[0_30px_60px_rgba(0,0,0,0.7)] flex flex-col gap-2 z-50">
            <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold px-3">
              Vigyan.prep
            </div>
            <Link href="/about" className="px-3 py-2 rounded-xl text-sm text-white hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2.5">
              <Info className="w-4 h-4 text-amber-500" /> Our Mission
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-xl text-sm text-white hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2.5">
              <Users className="w-4 h-4 text-amber-500" /> Team & Mentors
            </Link>
            <Link href="/about#contact" className="px-3 py-2 rounded-xl text-sm text-white hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-500" /> Contact Us
            </Link>
          </div>
        </div>

        {/* Future */}
        <div className="relative group">
          <Link
            href="/about"
            className="px-5 py-2.5 rounded-[50px] text-[0.85rem] font-medium tracking-wide text-white/70 hover:text-white transition-all duration-300 block"
          >
            Future
          </Link>
          {/* Dropdown */}
          <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-[#0c0c0c]/90 backdrop-blur-3xl border border-white/15 rounded-3xl p-5 min-w-[210px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-[0_30px_60px_rgba(0,0,0,0.7)] flex flex-col gap-2 z-50">
            <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold px-3">
              Career Paths
            </div>
            <Link href="/about" className="px-3 py-2 rounded-xl text-sm text-white hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2.5">
              <Microscope className="w-4 h-4 text-amber-500" /> Research
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-xl text-sm text-white hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2.5">
              <Rocket className="w-4 h-4 text-amber-500" /> Space Science
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-xl text-sm text-white hover:bg-white/10 hover:text-amber-400 transition flex items-center gap-2.5">
              <Laptop className="w-4 h-4 text-amber-500" /> Computational
            </Link>
          </div>
        </div>
      </nav>

      {/* 3. TOP-RIGHT BUTTON (Identical Homepage .top-right-login Style) */}
      <div className="fixed top-6 right-8 z-[1000] hidden md:flex items-center">
        {isLoggedIn ? (
          <a
            href="https://test.vigyanprep.com/dashboard"
            className={`inline-flex items-center gap-2 px-7 py-3 rounded-[60px] backdrop-blur-[24px] saturate-[180%] border text-[0.85rem] font-semibold transition-all duration-400 shadow-xl group ${
              isLightBg
                ? "bg-[#1c1815] text-amber-300 border-amber-950/40 hover:bg-black hover:text-amber-200"
                : "bg-white/[0.03] border-amber-500/40 text-[#f2ead8] hover:text-[#d4a520] hover:border-amber-400 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
            }`}
          >
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>{studentName ? `${studentName.split(' ')[0].toUpperCase()} (Dashboard)` : "HARSH (Dashboard)"}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        ) : (
          <a
            href="https://auth.vigyanprep.com"
            className={`inline-flex items-center gap-2 px-7 py-3 rounded-[60px] backdrop-blur-[24px] saturate-[180%] border text-[0.85rem] font-semibold transition-all duration-400 shadow-xl group ${
              isLightBg
                ? "bg-[#1c1815] text-amber-300 border-amber-950/40 hover:bg-black hover:text-amber-200"
                : "bg-white/[0.03] border-white/15 text-[#f2ead8] hover:text-[#d4a520] hover:border-amber-400/60 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
            }`}
          >
            <span>Login</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        )}
      </div>

      {/* MOBILE HAMBURGER TOGGLE BUTTON */}
      <div className="fixed top-6 right-6 z-[1001] md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-3 rounded-full bg-[#16120b]/90 backdrop-blur-2xl border border-white/20 text-white shadow-xl"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-6 right-6 z-[1000] md:hidden p-6 bg-[#0c0c0c]/95 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition"
          >
            Home
          </Link>
          <Link
            href="/pyq"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition"
          >
            PYQ
          </Link>
          <Link
            href="/tests"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl text-sm font-medium text-amber-400 hover:bg-white/10 transition"
          >
            Buy Test Series
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition"
          >
            About
          </Link>
          
          <div className="pt-3 border-t border-white/10">
            <a
              href={isLoggedIn ? "https://test.vigyanprep.com/dashboard" : "https://auth.vigyanprep.com"}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{isLoggedIn ? `${studentName ? studentName.split(' ')[0].toUpperCase() : 'HARSH'} (Dashboard)` : "Login"}</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
