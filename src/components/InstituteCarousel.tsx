"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, GraduationCap, Award, Compass, BarChart2, ShieldCheck, CheckCircle2 } from "lucide-react";

interface Institute {
  name: string;
  city: string;
  state: string;
  img: string;
}

const INSTITUTES: Institute[] = [
  { name: "IISER Pune", city: "Pune", state: "Maharashtra", img: "https://image-static.collegedunia.com/public/college_data/images/appImage/1768215998Screenshot20260112163438.png" },
  { name: "IISER Kolkata", city: "Kolkata", state: "West Bengal", img: "https://www.iiserkol.ac.in/~outreach/images/gallery-image1.JPG" },
  { name: "NISER Bhubaneswar", city: "Bhubaneswar", state: "Odisha", img: "https://i.ytimg.com/vi/UQn9uB1KSqk/hq720.jpg" },
  { name: "IISER Mohali", city: "Mohali", state: "Punjab", img: "https://web.iisermohali.ac.in/iisermcc/images/iiser/informatics.jpg" },
  { name: "IISER Bhopal", city: "Bhopal", state: "Madhya Pradesh", img: "https://www.vidyavision.com/CollegeUploads/Photos/2022-03-1-13-45-45_IISER2.jpg" },
  { name: "IISER TVM", city: "Thiruvananthapuram", state: "Kerala", img: "https://i.ytimg.com/vi/UQn9uB1KSqk/hq720.jpg" },
  { name: "IISER Tirupati", city: "Tirupati", state: "Andhra Pradesh", img: "https://education.sakshi.com/sites/default/files/images/2026/01/19/iiser-tirupati-nonfaculty-1768823729.jpg" },
  { name: "IISER Berhampur", city: "Berhampur", state: "Odisha", img: "https://www.iiserbpr.ac.in/webcontrol/uploads/gallery/1733375000_2.jpeg" },
];

export default function InstituteCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((prev) => (prev === 0 ? INSTITUTES.length - 1 : prev - 1));
  const next = () => setActiveIdx((prev) => (prev === INSTITUTES.length - 1 ? 0 : prev + 1));

  return (
    <div className="bg-[#16120b] text-[#f2ead8] relative">

      {/* Infinite Marquee Ticker */}
      <section className="overflow-hidden bg-[#120e08] border-y border-white/10 py-5">
        <div className="animate-marquee gap-12">
          {[...INSTITUTES, ...INSTITUTES].map((inst, i) => (
            <div key={i} className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] font-serif text-[#f2ead8]/60 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-80" />
              <span>{inst.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3D Institute Showcase Section */}
      <section id="institutes" className="py-24 px-6 max-w-7xl mx-auto relative">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-amber-400">Target Premier Institutions</span>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wide text-[#f2ead8]">
            Premier Research Institutes of India
          </h2>
          <p className="font-serif italic text-base text-[#f2ead8]/60 max-w-xl mx-auto">
            Your Gateway to IISERs, NISER, IISc, CMI, and ISI Admissions
          </p>
        </div>

        {/* Institute Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTITUTES.slice(0, 8).map((inst, idx) => (
            <div
              key={inst.name}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900/80 border border-white/10 hover:border-amber-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={inst.img}
                  alt={inst.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              </div>
              <div className="p-6 relative space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-amber-400">{inst.city}, {inst.state}</span>
                <h3 className="font-display text-xl tracking-wider text-white">{inst.name}</h3>
                <p className="text-xs text-neutral-400 font-light">BS-MS Dual Degree & Research Programs</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research Features Grid */}
      <section className="py-20 px-6 bg-[#1f190f] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-amber-400">Why Vigyan.prep</span>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wide text-white">Engineered for IISER & NISER Success</h2>
            <p className="text-xs text-neutral-400 max-w-xl mx-auto">Standardized proctored CBT platform aligned with official NTA exam patterns.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-amber-400/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white">NTA CBT Standard Test Series</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">Exact replica of official IISER IAT and NISER NEST computer-based test interface with section timing and proctoring.</p>
            </div>

            <div className="p-8 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-amber-400/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white">Verified Solved PYQs</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">Complete past 8 years IISER & NISER question bank with step-by-step verified solutions and subject classification.</p>
            </div>

            <div className="p-8 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-amber-400/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white">Instant Marksheet & Analytics</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">Detailed sectional analysis (Physics, Chem, Math, Bio) with accuracy breakdown and question response sheet.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
