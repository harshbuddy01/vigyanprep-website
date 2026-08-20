import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Exam Integrity — VigyanPrep CBT Anti-Cheating Measures",
  description: "Learn about VigyanPrep's multi-layered security framework including AI proctoring, tab-switch detection, and browser lockdown for exam integrity.",
  alternates: {
    canonical: "https://vigyanprep.com/security",
  },
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
