"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Institute {
  name: string;
  city: string;
  state: string;
  img: string;
}

const INSTITUTES: Institute[] = [
  { name: "IISER Pune", city: "Pune", state: "Maharashtra", img: "https://image-static.collegedunia.com/public/college_data/images/appImage/1768215998Screenshot20260112163438.png" },
  { name: "IISER Kolkata", city: "Kolkata", state: "West Bengal", img: "https://www.iiserkol.ac.in/~outreach/images/gallery-image1.JPG" },
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
    <section id="institutes" className="py-24 bg-neutral-950 text-white relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-400">Target Premier Institutes</span>
        <h2 className="font-serif text-4xl md:text-5xl font-light text-neutral-100">
          Premier Research Institutes of India
        </h2>
        <p className="text-neutral-400 text-sm max-w-xl mx-auto font-light">
          Your portal to IISERs, NISER, IISc, and ISI admissions. Prepare systematically for top science programs.
        </p>
      </div>

      {/* Grid of Institute Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {INSTITUTES.map((inst, idx) => (
          <div
            key={inst.name}
            className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={inst.img}
                alt={inst.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            </div>
            <div className="p-6 relative space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-amber-400">{inst.city}, {inst.state}</span>
              <h3 className="font-serif text-2xl font-medium text-white">{inst.name}</h3>
              <p className="text-xs text-neutral-400 font-light">BS-MS Dual Degree & Research Programs</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
