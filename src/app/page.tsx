import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InstituteCarousel from "@/components/InstituteCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#120e08] text-neutral-100 selection:bg-amber-500 selection:text-black">
      <Navbar />
      <HeroSection />
      <InstituteCarousel />
      <Footer />
    </main>
  );
}
