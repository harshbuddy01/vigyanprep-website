"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Lock,
  Server,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  Mail,
  Fingerprint
} from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#070605] text-[#f2ead8] font-sans selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={14} className="text-amber-400" />
            <span>VigyanPrep Trust &amp; Academic Security Center</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-wider text-white leading-tight">
            Security &amp; Examination Integrity
          </h1>

          <p className="max-w-2xl mx-auto text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            VigyanPrep provides high-security Computer-Based Testing (CBT) and encrypted academic infrastructure for India&apos;s most prestigious science research examinations: IISER IAT, NISER NEST, IISc &amp; CMI.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        
        {/* Core Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-[#0e0c0a] border border-white/10 space-y-4 shadow-xl hover:border-amber-500/30 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Lock size={22} />
            </div>
            <h3 className="font-display text-xl uppercase tracking-wide text-white">End-to-End Encryption</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              All question banks, student answer sheets, and payment transactions are secured with TLS 1.3 encryption in transit and AES-256 at rest with Row-Level Security (RLS).
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0e0c0a] border border-white/10 space-y-4 shadow-xl hover:border-amber-500/30 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Fingerprint size={22} />
            </div>
            <h3 className="font-display text-xl uppercase tracking-wide text-white">Anti-Cheat Proctoring</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Our live examination environment enforces full-screen lockouts, focus-loss tracking, heartbeat sync, and tamper-resistant cryptographic response verification.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0e0c0a] border border-white/10 space-y-4 shadow-xl hover:border-amber-500/30 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Server size={22} />
            </div>
            <h3 className="font-display text-xl uppercase tracking-wide text-white">Fair All-India Ranking</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Official percentiles and merit ranks are calculated on verified, live-attempted test takers only, excluding absent students from the denominator.
            </p>
          </div>
        </section>

        {/* Examination Integrity & Console Security Advisory */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#0d0b09] border border-amber-500/30 space-y-6 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 text-amber-400">
            <AlertTriangle size={24} />
            <h2 className="font-display text-2xl uppercase tracking-wider text-white">Browser Console &amp; Script Security Advisory</h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
            If you were directed here from the browser console warning (<code>🛑 STOP! This is a browser feature intended for authorized developers...</code>):
          </p>

          <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 text-xs text-neutral-300 space-y-2">
            <p className="font-bold text-red-400">⚠️ Never paste untrusted scripts into the developer console:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li>Pasting code from untrusted sources (Self-XSS) can compromise your account access, tokens, or personal score data.</li>
              <li>Official test submissions cannot be altered via client-side console modifications; all question keys and timers are securely validated server-side.</li>
              <li>Any attempt to inject malicious automation scripts will result in permanent disqualification from live rank lists.</li>
            </ul>
          </div>
        </section>

        {/* Academic Integrity Policy */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl uppercase tracking-wider text-white flex items-center gap-2">
            <FileCheck className="text-amber-400" size={22} />
            <span>Academic Code of Conduct</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-[#0e0c0a] border border-white/10 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-1">Single Active Session Rule</strong>
                <span className="text-neutral-400">Only one active test attempt is permitted per student profile at any given time.</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e0c0a] border border-white/10 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-1">Answer Key Secrecy</strong>
                <span className="text-neutral-400">Correct answers and derivations for live scheduled tests are completely hidden until official publication.</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e0c0a] border border-white/10 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-1">Candidate Roll Number Verification</strong>
                <span className="text-neutral-400">Each hall ticket and response sheet is issued with a cryptographically verifiable Unique Candidate ID.</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e0c0a] border border-white/10 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-1">Audited Result Calculation</strong>
                <span className="text-neutral-400">All score recalculations, bonus marks, and challenge resolutions are recorded in immutable audit logs.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Vulnerability Disclosure / Contact Security Team */}
        <section className="p-8 rounded-3xl bg-[#0e0c0a] border border-white/10 space-y-4">
          <h2 className="font-display text-xl uppercase tracking-wider text-white flex items-center gap-2">
            <Mail className="text-amber-400" size={20} />
            <span>Responsible Vulnerability Disclosure</span>
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed font-light">
            If you are a security researcher and believe you have discovered a vulnerability on the VigyanPrep test portal or API, please notify our security team responsibly at{" "}
            <a href="mailto:security@vigyanprep.com" className="text-amber-400 font-bold hover:underline">
              security@vigyanprep.com
            </a>
            . We acknowledge valid reports and resolve reported issues promptly.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
