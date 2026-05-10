import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProductModels from "@/components/ProductModels";
import Features from "@/components/Features";
import Specifications from "@/components/Specifications";
import CTASection from "@/components/CTASection";
import { readImagesConfig } from "@/lib/productImageStore";

export const metadata: Metadata = {
  title: "TechThread Pro — Industrial Pipe Threading Machines Thailand",
  description:
    "TechThread Pro makes professional pipe threading machines from 1/8\" to 6\" for industrial, construction, and plumbing. CE certified. Fast delivery across Thailand.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "TechThread Pro — Industrial Pipe Threading Machines",
    description: "Professional threading machines from 1/8\" to 6\" — CE certified, built for contractors and industry.",
    url: "/",
  },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const imagesConfig = await readImagesConfig();

  return (
    <>
      <Hero />
      <ProductModels imagesConfig={imagesConfig} />
      <Features />
      <Specifications />
      <CTASection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "TechThread Pro Threading Machines",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Product",
                  name: "TT Pro 300",
                  description: "Professional pipe threading machine, 1/8\" to 3\", 1.5 kW",
                  brand: { "@type": "Brand", name: "TechThread Pro" },
                  offers: {
                    "@type": "Offer",
                    price: "89000",
                    priceCurrency: "THB",
                    availability: "https://schema.org/InStock",
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "Product",
                  name: "TT Industrial 500",
                  description: "Industrial pipe threading machine, 1/8\" to 4\", 2.2 kW",
                  brand: { "@type": "Brand", name: "TechThread Pro" },
                  offers: {
                    "@type": "Offer",
                    price: "145000",
                    priceCurrency: "THB",
                    availability: "https://schema.org/InStock",
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Product",
                  name: "TT Heavy 800",
                  description: "Heavy-duty pipe threading machine, 1/8\" to 6\", 3.0 kW",
                  brand: { "@type": "Brand", name: "TechThread Pro" },
                  offers: {
                    "@type": "Offer",
                    price: "238000",
                    priceCurrency: "THB",
                    availability: "https://schema.org/InStock",
                  },
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
