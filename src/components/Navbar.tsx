"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-500 border ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-amber-500/20 shadow-2xl shadow-black/80"
          : "bg-neutral-900/75 backdrop-blur-lg border-white/10"
      }`}
    >
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity">
        <Image
          src="/images/vigyan-logo.png"
          alt="Vigyan.prep"
          width={36}
          height={36}
          className="h-8 w-auto object-contain"
        />
        <span className="font-serif font-bold text-lg tracking-wider text-amber-100 uppercase">
          VIGYAN<span className="text-amber-400/80 text-xs font-sans tracking-normal lowercase ml-1">.prep</span>
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-1">
        <Link href="/" className="px-4 py-2 text-xs uppercase tracking-wider text-neutral-300 hover:text-amber-300 transition-colors">
          Home
        </Link>
        <Link href="/pyq/iiser" className="px-4 py-2 text-xs uppercase tracking-wider text-neutral-300 hover:text-amber-300 transition-colors">
          PYQ
        </Link>
        <Link href="/about" className="px-4 py-2 text-xs uppercase tracking-wider text-neutral-300 hover:text-amber-300 transition-colors">
          About
        </Link>
        <Link href="/future" className="px-4 py-2 text-xs uppercase tracking-wider text-neutral-300 hover:text-amber-300 transition-colors">
          Future
        </Link>
      </div>

      {/* CTA Button */}
      <a
        href="https://auth.vigyanprep.com"
        className="px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:scale-105 transition-all shadow-md shadow-amber-500/20"
      >
        Login &rarr;
      </a>
    </nav>
  );
}
