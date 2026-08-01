"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lock, Mail, User, Eye, EyeOff, Check, X, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password || (isSignUp && !fullName)) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(
        isSignUp
          ? "Account created successfully! Redirecting to student portal..."
          : "Logged in successfully! Redirecting to student portal..."
      );
      setTimeout(() => {
        window.location.href = "https://auth.vigyanprep.com";
      }, 1200);
    }, 1000);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSent(false);
      setForgotEmail("");
      setSuccessMsg("Password reset instructions sent to your email!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#dccbb5] text-[#33261a] selection:bg-[#b87a2d] selection:text-white relative overflow-x-hidden font-sans">
      <Navbar />

      {/* Aged Parchment Background Layer with Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(165, 135, 100, 0.5) 100%),
            repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(60, 40, 20, 0.03) 3px, rgba(60, 40, 20, 0.03) 6px)
          `,
        }}
      />

      {/* Main Full Page Sketch Container */}
      <main className="relative z-10 pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT SIDE: PENCIL SKETCH ARTWORK & SCIENCE DOODLES */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-6 relative">
            
            {/* Header Title & Slogan */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-serif-vintage text-4xl sm:text-5xl font-bold tracking-tight text-[#2b1f14] flex items-center gap-2">
                  VIGYAN <span className="font-handwriting text-3xl text-[#b87a2d] italic">PREP</span>
                </h1>
                <p className="font-handwriting text-xl text-[#5c4735] mt-0.5">
                  Discover. Learn. Innovate.
                </p>
              </div>

              {/* Saturn Planet Sketch */}
              <div className="w-24 h-16 relative hidden sm:block">
                <svg viewBox="0 0 120 70" className="w-full h-full text-[#4a3a2a] opacity-80 stroke-current fill-none" strokeWidth="1.5">
                  <ellipse cx="60" cy="35" rx="20" ry="20" className="fill-[#dfcfb9]" />
                  <ellipse cx="60" cy="35" rx="50" ry="12" transform="rotate(-15 60 35)" strokeDasharray="3 2" />
                  <ellipse cx="60" cy="35" rx="54" ry="15" transform="rotate(-15 60 35)" />
                </svg>
              </div>
            </div>

            {/* Einstein & Science Quotes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl border border-dashed border-[#8c735c]/50 bg-[#e5d6c3]/60 shadow-sm relative">
                <p className="font-handwriting text-lg text-[#3d2e20] leading-snug">
                  &ldquo;The important thing is not to stop questioning.&rdquo;
                </p>
                <p className="font-sketch text-xs text-[#705843] text-right mt-1 font-semibold">
                  — Albert Einstein
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-dashed border-[#8c735c]/50 bg-[#e5d6c3]/60 shadow-sm relative">
                <p className="font-handwriting text-lg text-[#3d2e20] leading-snug">
                  &ldquo;Science is not just a subject, it&apos;s a way of thinking.&rdquo;
                </p>
                <p className="font-sketch text-xs text-[#705843] text-right mt-1 font-semibold">
                  — Richard Feynman
                </p>
              </div>
            </div>

            {/* Main Hand-Drawn Illustration Showcase Canvas */}
            <div className="relative p-6 sm:p-8 rounded-2xl border-2 border-[#594534] bg-[#ebdcc8]/90 shadow-xl overflow-hidden space-y-6">
              
              {/* Top Row Sketches: Atom, E=mc^2, Chemical Molecule */}
              <div className="flex items-center justify-between gap-4 border-b border-[#a8927a]/40 pb-6">
                
                {/* E = mc^2 Equation Sketch */}
                <div className="text-center font-handwriting text-3xl font-bold text-[#3a2b1d] transform -rotate-3">
                  E = mc<sup>2</sup>
                </div>

                {/* Atom Orbit Sketch */}
                <div className="w-20 h-20 relative flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#3a2b1d] stroke-current fill-none" strokeWidth="1.6">
                    <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(30 50 50)" strokeDasharray="4 2" />
                    <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(-30 50 50)" />
                    <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(90 50 50)" />
                    <circle cx="50" cy="50" r="5" className="fill-[#b87a2d]" />
                    <circle cx="20" cy="35" r="2.5" className="fill-[#3a2b1d]" />
                    <circle cx="75" cy="65" r="2.5" className="fill-[#3a2b1d]" />
                  </svg>
                </div>

                {/* Organic Chemistry Benzene Sketch */}
                <div className="hidden sm:block">
                  <svg viewBox="0 0 110 70" className="w-24 h-16 text-[#3a2b1d] stroke-current fill-none" strokeWidth="1.5">
                    <polygon points="35,10 65,10 80,35 65,60 35,60 20,35" />
                    <circle cx="50" cy="35" r="14" strokeDasharray="3 2" />
                    <text x="85" y="40" className="font-sketch text-xs fill-current stroke-none">CH₃</text>
                    <text x="5" y="40" className="font-sketch text-xs fill-current stroke-none">O₃</text>
                  </svg>
                </div>
              </div>

              {/* Center Sketch: Student Backpacking Towards Historic Science Campus */}
              <div className="relative py-4 flex flex-col md:flex-row items-center gap-6">
                
                {/* Hand-Drawn Pencil Lineart Campus Scene */}
                <div className="flex-1 w-full relative">
                  <svg viewBox="0 0 450 220" className="w-full h-auto text-[#3d2e20] stroke-current fill-none" strokeWidth="1.4" strokeLinecap="round">
                    {/* Background University Domes & Archways */}
                    <path d="M 60,140 L 60,70 L 100,40 L 140,70 L 140,140" />
                    <path d="M 140,140 L 140,90 L 180,60 L 220,35 L 260,60 L 300,90 L 300,140" />
                    <path d="M 300,140 L 300,70 L 340,40 L 380,70 L 380,140" />
                    {/* Dome detail */}
                    <path d="M 180,60 Q 220,15 260,60" />
                    <line x1="220" y1="15" x2="220" y2="35" />
                    {/* Arch windows */}
                    <path d="M 80,100 Q 100,80 120,100 L 120,140 L 80,140 Z" />
                    <path d="M 200,100 Q 220,70 240,100 L 240,140 L 200,140 Z" />
                    <path d="M 320,100 Q 340,80 360,100 L 360,140 L 320,140 Z" />
                    {/* Pathway */}
                    <path d="M 30,210 L 180,140 M 410,210 L 260,140" strokeDasharray="3 3" />
                    {/* Trees */}
                    <path d="M 40,140 Q 25,110 40,80 Q 55,110 40,140" />
                    <line x1="40" y1="140" x2="40" y2="160" />
                    <path d="M 400,140 Q 385,110 400,80 Q 415,110 400,140" />
                    <line x1="400" y1="140" x2="400" y2="160" />

                    {/* Student Facing Campus with Backpack */}
                    <g transform="translate(205, 120)">
                      {/* Head */}
                      <circle cx="15" cy="12" r="9" className="fill-[#ebdcc8]" />
                      {/* Hair outline */}
                      <path d="M 7,10 Q 15,2 23,10" fill="none" strokeWidth="2" />
                      {/* Shoulders & Jacket */}
                      <path d="M 0,32 C 0,22 30,22 30,32 L 28,65 L 2,65 Z" className="fill-[#ebdcc8]" />
                      {/* Backpack */}
                      <rect x="5" y="26" width="20" height="28" rx="4" className="fill-[#b87a2d]/30" strokeWidth="1.6" />
                      <line x1="10" y1="26" x2="10" y2="54" />
                      <line x1="20" y1="26" x2="20" y2="54" />
                      {/* Legs */}
                      <line x1="8" y1="65" x2="6" y2="95" strokeWidth="2" />
                      <line x1="22" y1="65" x2="24" y2="95" strokeWidth="2" />
                    </g>
                  </svg>
                </div>

                {/* Side Instruments: Telescope, DNA Helix, Test Tubes */}
                <div className="flex md:flex-col justify-around gap-4 shrink-0 border-t md:border-t-0 md:border-l border-[#a8927a]/40 pt-4 md:pt-0 md:pl-6">
                  
                  {/* Telescope */}
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 60 50" className="w-10 h-10 text-[#3a2b1d] stroke-current fill-none" strokeWidth="1.5">
                      <line x1="10" y1="35" x2="45" y2="10" strokeWidth="2.5" />
                      <line x1="25" y1="25" x2="10" y2="45" />
                      <line x1="25" y1="25" x2="40" y2="45" />
                      <line x1="25" y1="25" x2="25" y2="45" />
                      <circle cx="48" cy="8" r="4" />
                    </svg>
                    <span className="font-handwriting text-sm text-[#4d3a2a] hidden lg:inline">Observe</span>
                  </div>

                  {/* DNA Double Helix */}
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 30 60" className="w-7 h-12 text-[#3a2b1d] stroke-current fill-none" strokeWidth="1.5">
                      <path d="M 5,5 Q 25,30 5,55" />
                      <path d="M 25,5 Q 5,30 25,55" />
                      <line x1="8" y1="12" x2="22" y2="12" />
                      <line x1="12" y1="22" x2="18" y2="22" />
                      <line x1="10" y1="38" x2="20" y2="38" />
                      <line x1="7" y1="48" x2="23" y2="48" />
                    </svg>
                    <span className="font-handwriting text-sm text-[#4d3a2a] hidden lg:inline">Genetics</span>
                  </div>

                  {/* Chemistry Test Tubes */}
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 50 50" className="w-10 h-10 text-[#3a2b1d] stroke-current fill-none" strokeWidth="1.5">
                      <rect x="5" y="35" width="40" height="4" />
                      <rect x="10" y="10" width="8" height="25" rx="3" />
                      <rect x="21" y="10" width="8" height="25" rx="3" />
                      <rect x="32" y="10" width="8" height="25" rx="3" />
                      <circle cx="14" cy="28" r="1.5" className="fill-current" />
                      <circle cx="25" cy="22" r="1.5" className="fill-current" />
                    </svg>
                    <span className="font-handwriting text-sm text-[#4d3a2a] hidden lg:inline">Lab</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row Sketches: Notebook, Textbook Stack & Taped Sticky Note */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#a8927a]/40 items-end">
                
                {/* 1. Spiral Goals Notebook */}
                <div className="p-4 rounded-xl border-2 border-[#594534] bg-[#f2e4d3] shadow-md relative font-handwriting">
                  {/* Spiral rings on left */}
                  <div className="absolute -left-3 top-3 bottom-3 flex flex-col justify-between">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div key={n} className="w-3.5 h-2 rounded-full border-2 border-[#3a2b1d] bg-[#bbb]" />
                    ))}
                  </div>

                  <h4 className="text-xl font-bold text-[#2b1f14] border-b border-[#3a2b1d]/30 pb-1 mb-2 ml-2">
                    Goals:
                  </h4>
                  <ul className="space-y-1 text-base text-[#3d2e20] ml-2">
                    <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#b87a2d]" /> Understand</li>
                    <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#b87a2d]" /> Explore</li>
                    <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#b87a2d]" /> Solve</li>
                    <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#b87a2d]" /> Innovate</li>
                  </ul>
                </div>

                {/* 2. Hardbound Textbooks Stack */}
                <div className="flex flex-col gap-1 items-center font-sketch text-xs">
                  {["PHYSICS", "CHEMISTRY", "MATHEMATICS", "BIOLOGY"].map((subject, idx) => (
                    <div
                      key={subject}
                      className="w-full py-1.5 px-3 rounded border-2 border-[#3a2b1d] text-center font-bold tracking-widest text-[#2b1f14] shadow-sm transform transition-transform hover:scale-105"
                      style={{
                        backgroundColor: idx === 0 ? "#dfc9af" : idx === 1 ? "#d4bd9f" : idx === 2 ? "#cbb191" : "#c0a482",
                        width: `${100 - idx * 4}%`,
                      }}
                    >
                      {subject}
                    </div>
                  ))}
                </div>

                {/* 3. Taped Sticky Note */}
                <div className="p-4 rounded-lg border border-[#8c735c] bg-[#f7ebd9] shadow-md relative font-handwriting transform rotate-2">
                  {/* Tape strip at top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#d8c3a5]/70 border border-[#a8927a] transform -rotate-1 shadow-inner" />
                  
                  <h4 className="text-lg font-bold text-[#3a2b1d] border-b border-[#3a2b1d]/20 pb-1 mb-1">
                    Remember:
                  </h4>
                  <ul className="text-sm text-[#4a3a2a] space-y-0.5">
                    <li>• Focus</li>
                    <li>• Consistency</li>
                    <li>• Curiosity</li>
                    <li>• Hard Work</li>
                  </ul>
                </div>

              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: VINTAGE CLIPBOARD PARCHMENT LOGIN CARD */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 relative w-full">
            
            {/* Clipboard Container Card */}
            <div className="relative p-6 sm:p-10 rounded-3xl bg-[#f2e5d5] border-4 border-[#4a392a] shadow-2xl shadow-black/30 sketch-card-bg">
              
              {/* Paperclip Graphic on Top */}
              <div className="absolute -top-5 right-12 z-20">
                <svg viewBox="0 0 30 60" className="w-8 h-14 text-[#5c4a3a] drop-shadow-md stroke-current fill-none" strokeWidth="3">
                  <path d="M 10,25 L 10,45 A 8,8 0 0,0 26,45 L 26,12 A 9,9 0 0,0 8,12 L 8,40 A 5,5 0 0,0 18,40 L 18,20" />
                </svg>
              </div>

              {/* Card Crest Header: Atom + Laurel Wreath */}
              <div className="text-center mb-6 pt-2">
                <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#3d2e20] stroke-current fill-none" strokeWidth="2">
                    {/* Laurel Wreath */}
                    <path d="M 20,70 Q 10,40 30,20 Q 40,30 35,50" />
                    <path d="M 80,70 Q 90,40 70,20 Q 60,30 65,50" />
                    {/* Star at top */}
                    <polygon points="50,12 53,20 62,20 55,25 58,33 50,28 42,33 45,25 38,20 47,20" className="fill-[#b87a2d] stroke-none" />
                    {/* Center Atom */}
                    <ellipse cx="50" cy="55" rx="20" ry="8" transform="rotate(30 50 55)" />
                    <ellipse cx="50" cy="55" rx="20" ry="8" transform="rotate(-30 50 55)" />
                    <circle cx="50" cy="55" r="3" className="fill-[#3d2e20]" />
                  </svg>
                </div>

                <h2 className="font-serif-vintage text-3xl sm:text-4xl font-bold text-[#2b1f14]">
                  Welcome Back
                </h2>
                <p className="font-handwriting text-lg text-[#614d3b] mt-1">
                  Continue your journey towards scientific excellence.
                </p>
                <div className="w-16 h-0.5 bg-[#8c735c]/40 mx-auto mt-3" />
              </div>

              {/* Notification Banners */}
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-red-900/10 border border-red-800/40 text-red-900 text-xs font-semibold flex items-center gap-2">
                  <X className="w-4 h-4 shrink-0 text-red-800" /> {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-900/10 border border-emerald-800/40 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0 text-emerald-800" /> {successMsg}
                </div>
              )}

              {/* Mode Switch Tabs: Sign In / Create Account */}
              <div className="flex justify-between items-center mb-6 border-b border-[#a8927a]/40 pb-2">
                <button
                  type="button"
                  onClick={() => { setIsSignUp(false); setErrorMsg(""); setSuccessMsg(""); }}
                  className={`font-serif-vintage text-lg font-bold pb-1 transition-all ${
                    !isSignUp
                      ? "text-[#a66a1e] border-b-2 border-[#a66a1e]"
                      : "text-[#7a6450] hover:text-[#2b1f14]"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setIsSignUp(true); setErrorMsg(""); setSuccessMsg(""); }}
                  className={`font-serif-vintage text-lg font-bold pb-1 transition-all ${
                    isSignUp
                      ? "text-[#a66a1e] border-b-2 border-[#a66a1e]"
                      : "text-[#7a6450] hover:text-[#2b1f14]"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Main Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name Input (Sign Up Mode) */}
                {isSignUp && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3a2a] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6450]" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full bg-[#f9f1e6] border-2 border-[#8c735c]/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#2b1f14] placeholder-[#9e8b78] focus:outline-none focus:border-[#a66a1e] transition-colors shadow-inner"
                      />
                    </div>
                  </div>
                )}

                {/* Email Address Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3a2a] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6450]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full bg-[#f9f1e6] border-2 border-[#8c735c]/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#2b1f14] placeholder-[#9e8b78] focus:outline-none focus:border-[#a66a1e] transition-colors shadow-inner"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4a3a2a] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6450]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#f9f1e6] border-2 border-[#8c735c]/50 rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#2b1f14] placeholder-[#9e8b78] focus:outline-none focus:border-[#a66a1e] transition-colors shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a6450] hover:text-[#2b1f14] p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Checkbox: Remember Me & Forgot Password Link */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[#4a3a2a] font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-[#8c735c] text-[#a66a1e] focus:ring-0 accent-[#a66a1e]"
                    />
                    Remember Me
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="font-handwriting text-base text-[#a66a1e] hover:underline font-bold"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Pencil Sketch Hatch Styled Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl text-sm font-bold uppercase tracking-wider text-white sketch-hatch-bg border-2 border-[#3d2914] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {loading ? (
                    <Sparkles className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>{isSignUp ? "CREATE ACCOUNT →" : "SIGN IN →"}</span>
                  )}
                </button>
              </form>

              {/* Bottom Feature Icons Strip */}
              <div className="grid grid-cols-4 gap-2 pt-6 mt-6 border-t border-[#a8927a]/40 text-center">
                <div className="space-y-1">
                  <span className="text-base">📖</span>
                  <p className="text-[10px] font-bold text-[#4a3a2a] leading-tight">Official PYQs</p>
                </div>
                <div className="space-y-1">
                  <span className="text-base">🧠</span>
                  <p className="text-[10px] font-bold text-[#4a3a2a] leading-tight">AI Analytics</p>
                </div>
                <div className="space-y-1">
                  <span className="text-base">🎯</span>
                  <p className="text-[10px] font-bold text-[#4a3a2a] leading-tight">Smart Practice</p>
                </div>
                <div className="space-y-1">
                  <span className="text-base">👥</span>
                  <p className="text-[10px] font-bold text-[#4a3a2a] leading-tight">12,000+ Students</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#ebdcc8] border-4 border-[#4a392a] shadow-2xl relative sketch-card-bg">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-[#5c4a3a] hover:text-[#2b1f14]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-vintage text-2xl font-bold text-[#2b1f14] mb-2">
              Reset Password
            </h3>
            <p className="font-handwriting text-base text-[#5c4a3a] mb-4">
              Enter your email address and we&apos;ll send you a password reset link.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#4a3a2a] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-[#f9f1e6] border-2 border-[#8c735c]/50 rounded-xl px-4 py-2.5 text-sm text-[#2b1f14] focus:outline-none focus:border-[#a66a1e]"
                />
              </div>

              <button
                type="submit"
                disabled={forgotSent}
                className="w-full py-3 bg-[#a66a1e] text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-[#8f5817] transition shadow-md"
              >
                {forgotSent ? "Sending Email..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
