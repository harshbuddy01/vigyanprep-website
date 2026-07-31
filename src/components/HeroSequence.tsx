"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Award, Compass, ShieldCheck } from "lucide-react";

export default function HeroSequence() {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilled(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen pt-36 pb-20 px-6 flex flex-col items-center justify-between bg-[#16120b] overflow-hidden">
      {/* Blueprint Radial Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,transparent_45%,rgba(36,30,18,0.6)_70%,rgba(22,18,11,0.95)_100%)]" />

      {/* Background Blueprint Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#d4a520_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Main Content Box */}
      <div className="relative z-10 max-w-5xl w-full mx-auto text-center space-y-8 my-auto">
        {/* Top Tag Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest shadow-lg">
          <ShieldCheck className="w-4 h-4 text-amber-400" /> Research-Grade Entrance Preparation
        </div>

        {/* Dynamic Typography Hero Title */}
        <div className="space-y-3">
          <div className={`dynamic-fill-word mx-auto ${filled ? "filled" : ""}`}>
            VIGYAN
            <span className="fill-overlay">VIGYAN</span>
          </div>
          <h2 className="font-serif italic text-2xl sm:text-4xl text-[#f2ead8] font-light max-w-3xl mx-auto leading-tight">
            Gateway to Future Science • <em className="not-italic font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">IISER IAT & NISER NEST</em>
          </h2>
        </div>

        {/* Subtitle Description */}
        <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
          Master IISER Aptitude Test (IAT), NISER NEST, IISc Bangalore, and CMI with India’s most comprehensive computer-based test platform and research-backed study modules.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/courses/iat"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-black font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-xl shadow-amber-500/20"
          >
            <span>Explore Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pyq/iiser"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 border border-white/20 text-[#f2ead8] hover:border-amber-400 hover:text-amber-300 hover:bg-white/10 font-medium text-xs uppercase tracking-wider transition-all"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Attempt Free PYQs</span>
          </Link>
        </div>

        {/* Platform Stat Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
          <div className="text-center">
            <div className="font-serif text-3xl font-bold text-amber-400">98.4%</div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">IAT Qualification</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl font-bold text-amber-400">1,450+</div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">Solved Questions</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl font-bold text-amber-400">AIR 12</div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">Top IISER Ranker</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl font-bold text-amber-400">100%</div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">Research Faculty</div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Cue Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-2 mt-8">
        <span className="text-[10px] uppercase tracking-widest text-white/40 font-light">Scroll to Explore</span>
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
          <div className="w-full h-2 bg-amber-400 absolute animate-pip" />
        </div>
      </div>
    </section>
  );
}
