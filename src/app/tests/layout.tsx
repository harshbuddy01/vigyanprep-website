import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official NTA Pattern Test Series Packages — IISER IAT & NISER NEST 2026 | VigyanPrep",
  description: "Unlock full-length NTA standard CBT mock tests, topic-wise practice modules, and All-India percentile rank analytics for IISER IAT, NISER NEST, and CMI.",
  alternates: {
    canonical: "https://vigyanprep.com/tests",
  },
  openGraph: {
    title: "Official NTA Pattern Test Series Packages — IISER IAT & NISER NEST 2026 | VigyanPrep",
    description: "Unlock full-length NTA standard CBT mock tests, topic-wise practice modules, and All-India percentile rank analytics.",
    url: "https://vigyanprep.com/tests",
    siteName: "VigyanPrep",
    type: "website",
  },
};

export default function TestsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
