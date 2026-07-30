import React from "react";
import Navbar from "@/components/Navbar";
import HeroSequence from "@/components/HeroSequence";
import InstituteCarousel from "@/components/InstituteCarousel";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-[#241e12] min-h-screen text-white selection:bg-amber-500 selection:text-black">
      <Navbar />
      <HeroSequence />
      <InstituteCarousel />
      <Footer />
    </main>
  );
}
