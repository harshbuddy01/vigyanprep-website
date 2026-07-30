"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 192;

export default function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Preload images
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        setLoadedPercent(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setLoadingDone(true);
          renderFrame(0);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setLoadingDone(true);
        }
      };

      images.push(img);
    }

    const renderFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    // GSAP ScrollTrigger timeline
    const frameObj = { currentFrame: 0 };
    const st = gsap.to(frameObj, {
      currentFrame: TOTAL_FRAMES - 1,
      snap: "currentFrame",
      ease: "none",
      scrollTrigger: {
        trigger: "#sequence-container",
        start: "top top",
        end: "+=400%",
        scrub: 0.5,
        pin: true,
      },
      onUpdate: () => {
        renderFrame(Math.floor(frameObj.currentFrame));
      },
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      st.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="sequence-container" className="relative w-full h-screen overflow-hidden bg-[#241e12]">
      {/* Preloader overlay */}
      {!loadingDone && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white transition-opacity duration-700">
          <div className="font-serif italic text-3xl font-bold tracking-widest uppercase mb-4 text-amber-100">
            VIGYAN<span className="font-sans text-xs tracking-normal lowercase text-neutral-400">.prep</span>
          </div>
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#d4a520"
                strokeWidth="3"
                fill="none"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (loadedPercent / 100) * 251.2}
                className="transition-all duration-150"
              />
            </svg>
            <span className="absolute font-sans font-medium text-sm text-amber-200">{loadedPercent}%</span>
          </div>
          <p className="mt-4 text-xs uppercase tracking-widest text-neutral-400 font-light">Loading Experience...</p>
        </div>
      )}

      {/* Main Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,transparent_45%,rgba(36,30,18,0.4)_70%,rgba(36,30,18,0.85)_100%)]" />

      {/* Text Overlays */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-block text-xs uppercase tracking-[0.3em] font-semibold text-amber-400/90 bg-amber-950/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/20 shadow-lg">
            India&apos;s Premier Science Entrance Platform
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-neutral-100 leading-tight">
            Gateway to <em className="not-italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500">Future Science</em>
          </h1>
          <p className="text-sm md:text-base text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
            Prepare for IISER IAT, NISER NEST & research institute exams with precision mock tests, PYQs, and interactive study modules.
          </p>

          <div className="pt-6 pointer-events-auto flex items-center justify-center gap-4">
            <a
              href="https://auth.vigyanprep.com"
              className="px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:scale-105 transition-all shadow-xl shadow-amber-500/25"
            >
              Start Learning &rarr;
            </a>
            <a
              href="#institutes"
              className="px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-wider text-amber-100 border border-white/20 bg-black/40 backdrop-blur-md hover:border-amber-400 hover:text-amber-300 transition-all"
            >
              Explore Institutes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
