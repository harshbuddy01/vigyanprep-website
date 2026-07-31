import Navbar from "@/components/Navbar";
import HeroSequence from "@/components/HeroSequence";
import InstituteCarousel from "@/components/InstituteCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#241e12] text-neutral-100 selection:bg-amber-500 selection:text-black">
      <Navbar />
      <HeroSequence />
      <InstituteCarousel />
      <Footer />
    </main>
  );
}
