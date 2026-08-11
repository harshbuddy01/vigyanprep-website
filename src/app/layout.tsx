import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vigyanprep.com"),
  title: {
    default: "Vigyan.prep — Gateway to Future Science | IISER IAT & NISER NEST Preparation",
    template: "%s | VigyanPrep",
  },
  description: "India's premier research entrance platform for IISER IAT, NISER NEST, IISc & CMI entrance exams. NTA standard CBT test series and verified PYQ archives.",
  keywords: [
    "VigyanPrep",
    "IISER IAT",
    "NISER NEST",
    "IISc BS Research",
    "CMI Entrance",
    "ISI Entrance",
    "Vigyan Prep Test Series",
    "IISER PYQ Solutions",
    "NISER Mock Tests",
    "Science Research Entrance India",
  ],
  authors: [{ name: "VigyanPrep Team", url: "https://vigyanprep.com" }],
  creator: "VigyanPrep",
  publisher: "VigyanPrep",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vigyanprep.com",
    title: "Vigyan.prep — Gateway to Future Science | IISER & NISER Preparation",
    description: "India's premier research entrance platform for IISER IAT, NISER NEST, IISc & CMI entrance exams.",
    siteName: "VigyanPrep",
    images: [
      {
        url: "https://vigyanprep.com/images/pyq-textbook-stack.jpg",
        width: 1200,
        height: 630,
        alt: "VigyanPrep Science Research Entrance Preparation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vigyan.prep — Gateway to Future Science | IISER & NISER Preparation",
    description: "India's premier research entrance platform for IISER IAT, NISER NEST, IISc & CMI entrance exams.",
    images: ["https://vigyanprep.com/images/pyq-textbook-stack.jpg"],
  },
  verification: {
    google: "google471760565057ec7a",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured JSON-LD Data for Google & AI Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://vigyanprep.com/#organization",
        "name": "VigyanPrep",
        "url": "https://vigyanprep.com",
        "logo": "https://vigyanprep.com/vigyan-logo.png",
        "sameAs": [
          "https://test.vigyanprep.com",
          "https://auth.vigyanprep.com"
        ],
        "description": "India's premier research entrance platform for IISER IAT, NISER NEST, IISc & CMI entrance exams.",
        "email": "support@vigyanprep.com"
      },
      {
        "@type": "WebSite",
        "@id": "https://vigyanprep.com/#website",
        "url": "https://vigyanprep.com",
        "name": "VigyanPrep",
        "publisher": {
          "@id": "https://vigyanprep.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://vigyanprep.com/pyq?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Architects+Daughter&family=Caveat:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf5eb] text-[#1c1815] selection:bg-amber-500 selection:text-black">
        {children}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
