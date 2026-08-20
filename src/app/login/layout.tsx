import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to VigyanPrep — Access Your IISER IAT & NISER NEST Test Portal",
  description: "Sign in to your VigyanPrep student account. Access NTA pattern CBT mock tests, PYQ archives, and All-India rank analytics for IISER IAT & NISER NEST.",
  alternates: {
    canonical: "https://vigyanprep.com/login",
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
