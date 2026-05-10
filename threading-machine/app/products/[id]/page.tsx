import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getRelated, products } from "@/lib/products";
import { readImagesConfig } from "@/lib/productImageStore";
import ProductDetailView from "@/components/products/ProductDetailView";

// ── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

// ── SEO metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product Not Found" };

  const categoryLabel = product.category === "threading" ? "Pipe Threading Machine" : "Pipe Grooving Machine";
  const title = `${product.name} ${categoryLabel} | TechThread Pro`;
  const description = `${product.name} — ${product.tagline}. ${product.pipeRange} pipe range, ${product.motorPower} motor. ${product.warranty} warranty. CE certified. ${product.price}.`;

  return {
    title,
    description,
    keywords: [product.name, categoryLabel, `${product.category} machine Thailand`, product.series, "TechThread Pro"],
    alternates: { canonical: `/products/${id}` },
    openGraph: {
      title,
      description,
      url: `/products/${id}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const imagesConfig = await readImagesConfig();
  const productWithImages = {
    ...product,
    images: imagesConfig[id] ?? product.images ?? [],
  };

  const related = getRelated(product);

  return <ProductDetailView product={productWithImages} related={related} />;
}
