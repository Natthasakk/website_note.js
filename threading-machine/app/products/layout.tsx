import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Threading Machines — Full Product Line",
  description:
    "Compare TechThread Pro pipe threading machines: TT Pro 300 (1/8\"–3\"), TT Industrial 500 (1/8\"–4\"), TT Heavy 800 (1/8\"–6\"). Prices, specs, and accessories.",
  keywords: ["pipe threading machine price", "buy threading machine Thailand", "compare pipe threader", "เครื่องต๊าปเกลียวท่อ ราคา"],
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Threading Machines — Full Product Line | TechThread Pro",
    description: "Compare all TechThread Pro models. Three series from ฿89,000. Free shipping in Bangkok.",
    url: "/products",
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
