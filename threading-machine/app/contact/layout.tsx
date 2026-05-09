import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Get a Quote",
  description:
    "Request a quote for TechThread Pro pipe threading machines. Call +66 2 123 4567 or fill in our form. We respond within 1 business day.",
  keywords: ["contact TechThread Pro", "pipe threading machine quote", "buy threading machine Bangkok"],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact TechThread Pro — Request a Quote",
    description: "Talk to our team. Quote requests, technical consultations, and site demos available.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
