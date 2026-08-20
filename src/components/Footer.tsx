"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Heart, Sparkles, Mail, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0c0a08] pt-16 pb-12 px-6 text-[#f2ead8] border-t border-white/10">
      <div className="max-w-6xl mx-auto rounded-3xl p-8 sm:p-14 bg-[#0d0a08] border border-white/10 shadow-2xl relative overflow-hidden space-y-12">
        
        {/* Glow Overlay */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top CTA Row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-10 border-b border-white/10 relative z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">Start Your Journey</span>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-wider text-white mt-2 leading-tight">
              Begin Your Science Prep Today
            </h2>
          </div>
          <a
            href="https://auth.vigyanprep.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all duration-300 shadow-xl group"
          >
            <span>Enroll Now</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs relative z-10">
          <div className="space-y-3">
            <a href="https://vigyanprep.com/" title="Go to VigyanPrep Homepage" className="inline-block group">
              <img
                src="/vigyan-logo-light.png"
                alt="VigyanPrep Official Logo"
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <p className="text-neutral-400 font-light leading-relaxed">
              India&apos;s premier research entrance platform for IISER IAT, NISER NEST, IISc &amp; CMI entrance exams.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-amber-400">Target Exams</h4>
            <ul className="space-y-2 text-neutral-300 font-light">
              <li><Link href="/tests" className="hover:text-white transition">IISER IAT 2026</Link></li>
              <li><Link href="/tests" className="hover:text-white transition">NISER NEST 2026</Link></li>
              <li><Link href="/tests" className="hover:text-white transition">IISc Bangalore & CMI</Link></li>
              <li><Link href="/pyq" className="hover:text-white transition">Solved Question Papers</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-amber-400">Platform</h4>
            <ul className="space-y-2 text-neutral-300 font-light">
              <li><Link href="/about" className="hover:text-white transition">About Our Mission</Link></li>
              <li><Link href="/security" className="hover:text-white transition">Security &amp; Integrity</Link></li>
              <li><Link href="/pyq" className="hover:text-white transition">Practice Archive</Link></li>
              <li><a href="https://test.vigyanprep.com" className="hover:text-white transition">Test Portal</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-amber-400">Contact & Support</h4>
            <ul className="space-y-2 text-neutral-300 font-light">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <a href="mailto:support@vigyanprep.com" className="hover:text-white transition">support@vigyanprep.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">📞</span>
                <a href="tel:+917004283531" className="hover:text-white transition">+91 7004283531</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <a href="https://wa.me/917004283531" target="_blank" rel="noreferrer" className="hover:text-white transition">WhatsApp Assistance</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4 relative z-10">
          <p>© {new Date().getFullYear()} Vigyan.prep • All Rights Reserved</p>
          <div className="flex items-center gap-3">
            <Link href="/security" className="hover:text-neutral-300 transition">Privacy & Security</Link>
            <span className="text-neutral-600">•</span>
            <Link href="/about" className="hover:text-neutral-300 transition">About</Link>
          </div>
          <p className="font-serif italic text-neutral-400">Gateway to Future Science</p>
        </div>

      </div>
    </footer>
  );
}
