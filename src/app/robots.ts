import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "GPTBot", "PerplexityBot", "ClaudeBot", "Applebot"],
        allow: "/",
      },
    ],
    sitemap: "https://vigyanprep.com/sitemap.xml",
  };
}
