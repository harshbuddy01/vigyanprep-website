import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Previous Year Questions & Answer Keys — IISER IAT, NISER NEST, CMI",
  description: "Attempt official IISER IAT, NISER NEST, IISc & CMI past year question papers in real-time proctored CBT conditions or download verified step-by-step solutions.",
  alternates: {
    canonical: "https://vigyanprep.com/pyq",
  },
  openGraph: {
    title: "Previous Year Questions & Answer Keys — IISER IAT, NISER NEST, CMI",
    description: "Attempt official IISER IAT, NISER NEST, IISc & CMI past year question papers in real-time proctored CBT conditions.",
    url: "https://vigyanprep.com/pyq",
    images: [{ url: "https://vigyanprep.com/images/pyq-textbook-stack.jpg", width: 1200, height: 630, alt: "VigyanPrep Test Series" }],
    siteName: "VigyanPrep",
    type: "website",
  },
};

export default function PyqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
