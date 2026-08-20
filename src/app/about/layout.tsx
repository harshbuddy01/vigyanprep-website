import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About VigyanPrep — Our Mission & Vision for Science Research Education",
  description: "Learn about VigyanPrep's mission to democratize access to premier Indian science research entrance exams like IISER IAT, NISER NEST, IISc, and CMI.",
  alternates: {
    canonical: "https://vigyanprep.com/about",
  },
  openGraph: {
    title: "About VigyanPrep — Our Mission & Vision",
    description: "Learn about VigyanPrep's mission to democratize access to premier Indian science research entrance exams.",
    url: "https://vigyanprep.com/about",
    images: [{ url: "https://vigyanprep.com/images/pyq-textbook-stack.jpg", width: 1200, height: 630, alt: "About VigyanPrep" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
