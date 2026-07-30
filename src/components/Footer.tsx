"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-neutral-950 text-neutral-400 pt-20 pb-12 px-6 md:px-16 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-2">
          <Image
            src="/images/vigyan-logo.png"
            alt="Vigyan.prep"
            width={160}
            height={50}
            className="h-14 w-auto object-contain opacity-90 brightness-110"
          />
          <p className="text-sm text-neutral-400 max-w-md font-light leading-relaxed">
            India&apos;s premier platform for IISER IAT, NISER NEST, and research institute entrance preparation. Elevate your science journey with precision tools.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-amber-200 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-amber-200 transition-colors">About Us</Link></li>
            <li><Link href="/future" className="hover:text-amber-200 transition-colors">Future Careers</Link></li>
            <li><a href="https://auth.vigyanprep.com" className="hover:text-amber-200 transition-colors">Student Portal</a></li>
          </ul>
        </div>

        {/* Legal & Social */}
        <div>
          <h4 className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">Connect</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors">YouTube</a></li>
            <li><a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors">Telegram Community</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors">Instagram</a></li>
            <li><a href="mailto:support@vigyanprep.com" className="hover:text-amber-200 transition-colors">Support Email</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <p>&copy; {new Date().getFullYear()} Vigyan.prep. All rights reserved.</p>
        <p className="font-serif italic text-neutral-400">Gateway to Future Science</p>
      </div>
    </footer>
  );
}
