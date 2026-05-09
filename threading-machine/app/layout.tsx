import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const siteUrl = "https://techthread.co.th";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#D70015",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TechThread Pro — Industrial Pipe Threading Machines Thailand",
    template: "%s | TechThread Pro",
  },
  description:
    "TechThread Pro manufactures professional-grade pipe threading machines (1/8\" to 6\") for industrial, construction, and commercial applications. CE certified. Ships throughout Thailand.",
  keywords: [
    "pipe threading machine",
    "threading machine Thailand",
    "electric pipe threader",
    "industrial threading machine",
    "เครื่องต๊าปเกลียวท่อ",
    "BSPT threading",
    "NPT threading",
    "TechThread Pro",
  ],
  authors: [{ name: "TechThread Pro Co., Ltd.", url: siteUrl }],
  creator: "TechThread Pro Co., Ltd.",
  publisher: "TechThread Pro Co., Ltd.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "TechThread Pro",
    title: "TechThread Pro — Industrial Pipe Threading Machines",
    description:
      "Professional pipe threading machines from 1/8\" to 6\". CE certified. Built for contractors and industrial applications.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TechThread Pro Industrial Threading Machines" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechThread Pro — Industrial Pipe Threading Machines",
    description: "Professional pipe threading machines for every scale of work.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: siteUrl },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "industrial equipment",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="th" dir="ltr" className="h-full">
      <head>
        {!isDashboard && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "TechThread Pro Co., Ltd.",
                url: siteUrl,
                logo: `${siteUrl}/logo.png`,
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+66-2-123-4567",
                  contactType: "sales",
                  areaServed: "TH",
                  availableLanguage: ["Thai", "English"],
                },
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "123 Industrial Estate Road",
                  addressLocality: "Lat Krabang",
                  addressRegion: "Bangkok",
                  postalCode: "10520",
                  addressCountry: "TH",
                },
              }),
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          {!isDashboard && <Navbar />}
          <main className="flex-1" id="main-content">{children}</main>
          {!isDashboard && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
