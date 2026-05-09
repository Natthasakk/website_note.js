import type { MetadataRoute } from "next";

const siteUrl = "https://techthread.co.th";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/products/pro-300`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/products/industrial-500`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/products/heavy-800`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
