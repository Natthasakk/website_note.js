"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ImageUpload, { type UploadedImage } from "@/components/dashboard/ImageUpload";
import { products, type Product } from "@/lib/products";

type FormData = {
  name: string;
  series: string;
  tagline: string;
  description: string;
  pipeRange: string;
  motorPower: string;
  speed: string;
  weight: string;
  voltage: string;
  dimensions: string;
  coolantTank: string;
  threadStandards: string;
  certification: string;
  warranty: string;
  price: string;
  features: string;
  status: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  canonicalUrl: string;
  structuredDataPrice: string;
};

const empty: FormData = {
  name: "",
  series: "",
  tagline: "",
  description: "",
  pipeRange: "",
  motorPower: "",
  speed: "",
  weight: "",
  voltage: "",
  dimensions: "",
  coolantTank: "",
  threadStandards: "BSPT, NPT",
  certification: "CE, ISO 9001:2015",
  warranty: "",
  price: "",
  features: "",
  status: "Published",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImageUrl: "",
  canonicalUrl: "",
  structuredDataPrice: "",
};

function findSpec(product: Product, label: string): string {
  for (const section of product.specs) {
    const row = section.rows.find((r) => r.label === label);
    if (row) return row.value;
  }
  return "";
}

function productToFormData(p: Product): FormData {
  return {
    name: p.name,
    series: p.series,
    tagline: p.tagline,
    description: p.description,
    pipeRange: p.pipeRange,
    motorPower: p.motorPower,
    speed: p.speed,
    weight: p.weight,
    voltage: findSpec(p, "Voltage"),
    dimensions: findSpec(p, "Dimensions (L×W×H)"),
    coolantTank: findSpec(p, "Coolant Tank"),
    threadStandards: findSpec(p, "Thread Standards") || "BSPT, NPT",
    certification: findSpec(p, "Certification") || "CE, ISO 9001:2015",
    warranty: p.warranty,
    price: p.price,
    features: p.features.join("\n"),
    status: "Published",
    metaTitle: `${p.name} Pipe ${p.category === "grooving" ? "Grooving" : "Threading"} Machine | TechThread Pro`,
    metaDescription: "",
    metaKeywords: "",
    ogTitle: `${p.name} Pipe ${p.category === "grooving" ? "Grooving" : "Threading"} Machine | TechThread Pro`,
    ogDescription: "",
    ogImageUrl: p.images?.[0] ?? "",
    canonicalUrl: `/products/${p.id}`,
    structuredDataPrice: p.price.replace(/[^0-9]/g, ""),
  };
}

type Tab = "basic" | "specs" | "images" | "seo";

const tabs: { id: Tab; label: string }[] = [
  { id: "basic", label: "Basic Info" },
  { id: "specs", label: "Specifications" },
  { id: "images", label: "Images" },
  { id: "seo", label: "SEO & Meta" },
];

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#1D1D1F", marginBottom: 6, fontFamily: "'SF Pro Text', sans-serif" }}>
      {children}
      {required && <span style={{ color: "#D70015", marginLeft: 2 }}>*</span>}
    </label>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, color: "#86868B", marginTop: 4, fontFamily: "'SF Pro Text', sans-serif", lineHeight: 1.5 }}>
      {children}
    </p>
  );
}

function CharCount({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const over = len > max;
  return (
    <span style={{ fontSize: 11, color: over ? "#D70015" : "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
      {len}/{max}
    </span>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>{children}</div>;
}

export default function AddProductForm() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit") ?? undefined;
  const editProduct = editId ? products.find((p) => p.id === editId) : undefined;
  const isEditing = !!editProduct;

  const initialImages: UploadedImage[] = (editProduct?.images ?? []).map((url) => ({
    url,
    filename: url.split("/").pop() ?? url,
    size: 0,
  }));

  const [form, setForm] = useState<FormData>(isEditing ? productToFormData(editProduct!) : empty);
  const [tab, setTab] = useState<Tab>("basic");
  const [saved, setSaved] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>(initialImages);

  // Auto-fill OG Image URL from the first uploaded image
  useEffect(() => {
    if (images.length > 0 && !form.ogImageUrl) {
      set("ogImageUrl", images[0].url);
    }
  }, [images, form.ogImageUrl]);

  function set(field: keyof FormData, value: string) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "name" && !prev.metaTitle) {
        next.metaTitle = `${value} Pipe Threading Machine | TechThread Pro`;
      }
      if (field === "name" && !prev.ogTitle) {
        next.ogTitle = `${value} Pipe Threading Machine | TechThread Pro`;
      }
      if (field === "price" && !prev.structuredDataPrice) {
        next.structuredDataPrice = value.replace(/[^0-9]/g, "");
      }
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const productData = {
      ...form,
      images: images.map((img) => img.url),
      updatedAt: new Date().toISOString(),
    };
    console.log(isEditing ? "Updating product:" : "Creating product:", productData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const seoScore = [
    form.metaTitle.length >= 30 && form.metaTitle.length <= 60,
    form.metaDescription.length >= 100 && form.metaDescription.length <= 160,
    form.metaKeywords.length > 0,
    form.ogTitle.length > 0,
    form.ogDescription.length > 0,
    form.ogImageUrl.length > 0,
    form.canonicalUrl.length > 0,
  ].filter(Boolean).length;

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <Link
          href="/dashboard/products"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, backgroundColor: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 8, textDecoration: "none", color: "#1D1D1F" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 2 }}>
            {isEditing ? `Edit: ${editProduct!.name}` : "Add New Product"}
          </h1>
          <p style={{ fontSize: 14, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
            {isEditing ? `Editing product ID: ${editId}` : "Fill in product details and SEO metadata"}
          </p>
        </div>
        {saved && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, backgroundColor: "rgba(52,199,89,0.12)", color: "#28A745", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontFamily: "'SF Pro Text', sans-serif" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Saved successfully
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="dashboard-grid">
          {/* Main form */}
          <div>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 0, backgroundColor: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 12, padding: 4, marginBottom: 24 }}>
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  style={{
                    flex: 1,
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'SF Pro TH', sans-serif",
                    fontSize: 14,
                    fontWeight: tab === t.id ? 600 : 400,
                    color: tab === t.id ? "#FFFFFF" : "#86868B",
                    backgroundColor: tab === t.id ? "#D70015" : "transparent",
                    transition: "all 200ms ease",
                    height: 36,
                    position: "relative",
                  }}
                >
                  {t.label}
                  {t.id === "seo" && (
                    <span
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 8,
                        fontSize: 10,
                        backgroundColor: tab === "seo" ? "rgba(255,255,255,0.3)" : "#E8E8ED",
                        color: tab === "seo" ? "#FFFFFF" : "#86868B",
                        padding: "1px 5px",
                        borderRadius: 8,
                        fontWeight: 600,
                      }}
                    >
                      {seoScore}/7
                    </span>
                  )}
                  {t.id === "images" && images.length > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 8,
                        fontSize: 10,
                        backgroundColor: tab === "images" ? "rgba(255,255,255,0.3)" : "#D70015",
                        color: "#FFFFFF",
                        padding: "1px 5px",
                        borderRadius: 8,
                        fontWeight: 600,
                      }}
                    >
                      {images.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Basic Info tab */}
            {tab === "basic" && (
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 20, padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
                <FieldRow>
                  <div>
                    <Label required>Product Name</Label>
                    <input className="input-field" placeholder="e.g. TT Pro 300" value={form.name} onChange={(e) => set("name", e.target.value)} required />
                  </div>
                  <div>
                    <Label required>Series</Label>
                    <select className="select-field" value={form.series} onChange={(e) => set("series", e.target.value)} required>
                      <option value="">Select series...</option>
                      <option value="Professional Series">Professional Series</option>
                      <option value="Industrial Series">Industrial Series</option>
                      <option value="Heavy-Duty Series">Heavy-Duty Series</option>
                    </select>
                  </div>
                </FieldRow>

                <div>
                  <Label>Tagline</Label>
                  <input className="input-field" placeholder="e.g. The contractor's choice" value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
                </div>

                <div>
                  <Label required>Description</Label>
                  <textarea
                    className="textarea-field"
                    rows={4}
                    placeholder="Describe this product for customers..."
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    required
                  />
                </div>

                <FieldRow>
                  <div>
                    <Label required>Price (THB)</Label>
                    <input className="input-field" placeholder="฿89,000" value={form.price} onChange={(e) => set("price", e.target.value)} required />
                  </div>
                  <div>
                    <Label required>Status</Label>
                    <select className="select-field" value={form.status} onChange={(e) => set("status", e.target.value)}>
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </FieldRow>

                <div>
                  <Label>Key Features (one per line)</Label>
                  <textarea
                    className="textarea-field"
                    rows={4}
                    placeholder={"Auto die head\nBuilt-in oiler\nBSPT & NPT threads\nSafety clutch"}
                    value={form.features}
                    onChange={(e) => set("features", e.target.value)}
                  />
                  <Hint>Each line becomes a feature bullet point on the product page.</Hint>
                </div>

                <div style={{ marginTop: 12, paddingTop: 24, borderTop: "1px solid #E8E8ED", display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" className="btn-primary" style={{ height: 44, padding: "0 32px" }}>
                    {form.status === "Published" ? (isEditing ? "Save Changes" : "Publish Product") : "Save Draft"}
                  </button>
                </div>
              </div>
            )}

            {/* Specs tab */}
            {tab === "specs" && (
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 20, padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: -8 }}>
                  Threading
                </h3>
                <FieldRow>
                  <div>
                    <Label required>Pipe Size Range</Label>
                    <input className="input-field" placeholder='e.g. 1/8" – 3"' value={form.pipeRange} onChange={(e) => set("pipeRange", e.target.value)} required />
                  </div>
                  <div>
                    <Label>Thread Standards</Label>
                    <input className="input-field" placeholder="e.g. BSPT, NPT, G (BSP)" value={form.threadStandards} onChange={(e) => set("threadStandards", e.target.value)} />
                  </div>
                </FieldRow>

                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: -8 }}>
                  Power
                </h3>
                <FieldRow>
                  <div>
                    <Label>Motor Power</Label>
                    <input className="input-field" placeholder="e.g. 1.5 kW (2 HP)" value={form.motorPower} onChange={(e) => set("motorPower", e.target.value)} />
                  </div>
                  <div>
                    <Label>Spindle Speed</Label>
                    <input className="input-field" placeholder="e.g. 38 / 72 RPM" value={form.speed} onChange={(e) => set("speed", e.target.value)} />
                  </div>
                </FieldRow>
                <FieldRow>
                  <div>
                    <Label>Voltage</Label>
                    <input className="input-field" placeholder="e.g. 220V / 380V, 50/60 Hz" value={form.voltage} onChange={(e) => set("voltage", e.target.value)} />
                  </div>
                  <div>
                    <Label>Coolant Tank</Label>
                    <input className="input-field" placeholder="e.g. 4.5 L integrated" value={form.coolantTank} onChange={(e) => set("coolantTank", e.target.value)} />
                  </div>
                </FieldRow>

                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: -8 }}>
                  Physical
                </h3>
                <FieldRow>
                  <div>
                    <Label>Net Weight</Label>
                    <input className="input-field" placeholder="e.g. 62 kg" value={form.weight} onChange={(e) => set("weight", e.target.value)} />
                  </div>
                  <div>
                    <Label>Dimensions (L×W×H)</Label>
                    <input className="input-field" placeholder="e.g. 820 × 480 × 520 mm" value={form.dimensions} onChange={(e) => set("dimensions", e.target.value)} />
                  </div>
                </FieldRow>

                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: -8 }}>
                  Compliance
                </h3>
                <FieldRow>
                  <div>
                    <Label>Certification</Label>
                    <input className="input-field" placeholder="CE, ISO 9001:2015" value={form.certification} onChange={(e) => set("certification", e.target.value)} />
                  </div>
                  <div>
                    <Label>Warranty</Label>
                    <input className="input-field" placeholder="e.g. 2 years parts & labor" value={form.warranty} onChange={(e) => set("warranty", e.target.value)} />
                  </div>
                </FieldRow>

                <div style={{ marginTop: 12, paddingTop: 24, borderTop: "1px solid #E8E8ED", display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" className="btn-primary" style={{ height: 44, padding: "0 32px" }}>
                    {form.status === "Published" ? (isEditing ? "Save Changes" : "Publish Product") : "Save Draft"}
                  </button>
                </div>
              </div>
            )}

            {/* Images tab */}
            {tab === "images" && (
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 20, padding: 28 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 6 }}>
                  Product Images
                </h3>
                <p style={{ fontSize: 13, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", marginBottom: 20, lineHeight: 1.6 }}>
                  Upload up to 6 photos. The first image is used as the main product photo on the listing.
                  Accepted formats: JPEG, PNG, WebP — max 5 MB each.
                </p>
                <ImageUpload images={images} onChange={setImages} maxImages={6} />

                <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #E8E8ED", display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" className="btn-primary" style={{ height: 44, padding: "0 32px" }}>
                    {form.status === "Published" ? (isEditing ? "Save Changes" : "Publish Product") : "Save Draft"}
                  </button>
                </div>
              </div>
            )}

            {/* SEO tab */}
            {tab === "seo" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Meta basics */}
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 20, padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif" }}>
                    Search Engine Meta
                  </h3>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <Label>Meta Title</Label>
                      <CharCount value={form.metaTitle} max={60} />
                    </div>
                    <input
                      className="input-field"
                      placeholder="TT Pro 300 Pipe Threading Machine | TechThread Pro"
                      value={form.metaTitle}
                      onChange={(e) => set("metaTitle", e.target.value)}
                      maxLength={70}
                    />
                    <Hint>Ideal length: 30–60 characters. Appears as the clickable title in Google results.</Hint>
                    {form.metaTitle && (
                      <div style={{ marginTop: 12, padding: "12px 16px", backgroundColor: "#F5F5F7", borderRadius: 12, border: "1px solid #E8E8ED" }}>
                        <div style={{ fontSize: 11, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Google Preview</div>
                        <div style={{ fontSize: 18, color: "#1a0dab", fontFamily: "Arial, sans-serif", marginBottom: 2 }}>{form.metaTitle || "Page Title"}</div>
                        <div style={{ fontSize: 13, color: "#006621", fontFamily: "Arial, sans-serif", marginBottom: 2 }}>
                          https://techthread.co.th/products/{form.name.toLowerCase().replace(/\s+/g, "-") || "product"}
                        </div>
                        <div style={{ fontSize: 13, color: "#545454", fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
                          {form.metaDescription || "Meta description will appear here..."}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <Label>Meta Description</Label>
                      <CharCount value={form.metaDescription} max={160} />
                    </div>
                    <textarea
                      className="textarea-field"
                      rows={3}
                      placeholder="Buy the TT Pro 300 professional pipe threading machine. Handles 1/8&quot; to 3&quot; pipe. CE certified. Ships across Thailand."
                      value={form.metaDescription}
                      onChange={(e) => set("metaDescription", e.target.value)}
                      maxLength={200}
                    />
                    <Hint>Ideal length: 100–160 characters. Describes the page in search results.</Hint>
                  </div>

                  <div>
                    <Label>Keywords</Label>
                    <input
                      className="input-field"
                      placeholder="pipe threading machine, เครื่องต๊าปเกลียวท่อ, TT Pro 300"
                      value={form.metaKeywords}
                      onChange={(e) => set("metaKeywords", e.target.value)}
                    />
                    <Hint>Comma-separated keywords. Helps internal search; less important for Google.</Hint>
                  </div>

                  <div>
                    <Label>Canonical URL</Label>
                    <input
                      className="input-field"
                      placeholder="/products/pro-300"
                      value={form.canonicalUrl}
                      onChange={(e) => set("canonicalUrl", e.target.value)}
                    />
                    <Hint>Set to avoid duplicate content issues. Use the primary URL for this product.</Hint>
                  </div>

                  <div style={{ marginTop: 12, paddingTop: 24, borderTop: "1px solid #E8E8ED", display: "flex", justifyContent: "flex-end" }}>
                    <button type="submit" className="btn-primary" style={{ height: 44, padding: "0 32px" }}>
                      {form.status === "Published" ? (isEditing ? "Save Changes" : "Publish Product") : "Save Draft"}
                    </button>
                  </div>
                </div>

                {/* Open Graph */}
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 20, padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif" }}>
                    Social Media (Open Graph)
                  </h3>
                  <Hint>These fields control how the page looks when shared on LINE, Facebook, Twitter, etc.</Hint>

                  <div>
                    <Label>OG Title</Label>
                    <input
                      className="input-field"
                      placeholder="Same as Meta Title, or more social-friendly"
                      value={form.ogTitle}
                      onChange={(e) => set("ogTitle", e.target.value)}
                    />
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <Label>OG Description</Label>
                      <CharCount value={form.ogDescription} max={200} />
                    </div>
                    <textarea
                      className="textarea-field"
                      rows={3}
                      placeholder="A short, engaging description for social sharing..."
                      value={form.ogDescription}
                      onChange={(e) => set("ogDescription", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>OG Image URL</Label>
                    <input
                      className="input-field"
                      placeholder="/og/pro-300.png  (1200×630 px recommended)"
                      value={form.ogImageUrl}
                      onChange={(e) => set("ogImageUrl", e.target.value)}
                    />
                    <Hint>Recommended size: 1200×630 pixels. Place images in /public/og/</Hint>
                  </div>

                  {(form.ogTitle || form.ogDescription) && (
                    <div style={{ border: "1px solid #E8E8ED", borderRadius: 12, overflow: "hidden" }}>
                      <div style={{ height: 120, backgroundColor: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 12, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
                          {form.ogImageUrl ? form.ogImageUrl : "OG Image Preview (1200×630)"}
                        </span>
                      </div>
                      <div style={{ padding: "12px 16px", backgroundColor: "#FFFFFF" }}>
                        <div style={{ fontSize: 11, color: "#86868B", fontFamily: "Arial, sans-serif", textTransform: "uppercase", marginBottom: 4 }}>techthread.co.th</div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F", fontFamily: "Arial, sans-serif", marginBottom: 4 }}>
                          {form.ogTitle || "OG Title"}
                        </div>
                        <div style={{ fontSize: 13, color: "#86868B", fontFamily: "Arial, sans-serif" }}>
                          {form.ogDescription || "OG description..."}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Structured Data */}
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 20, padding: 28 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 8 }}>
                    Schema.org Structured Data
                  </h3>
                  <Hint>Auto-generated from product info above. Helps Google show rich results with price and availability.</Hint>
                  <div
                    style={{
                      marginTop: 16,
                      backgroundColor: "#F5F5F7",
                      border: "1px solid #E8E8ED",
                      borderRadius: 12,
                      padding: 16,
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: "#1D1D1F",
                      lineHeight: 1.7,
                      overflowX: "auto",
                      whiteSpace: "pre",
                    }}
                  >
{`{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "${form.name || "Product Name"}",
  "description": "${form.description.slice(0, 80) || "..."}",
  "brand": {
    "@type": "Brand",
    "name": "TechThread Pro"
  },
  "offers": {
    "@type": "Offer",
    "price": "${form.structuredDataPrice || form.price.replace(/[^0-9]/g, "") || "0"}",
    "priceCurrency": "THB",
    "availability": "https://schema.org/InStock"
  }
}`}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Publish */}
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 16, padding: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 16 }}>
                Publish
              </h3>
              <div style={{ marginBottom: 16 }}>
                <Label>Status</Label>
                <select className="select-field" value={form.status} onChange={(e) => set("status", e.target.value)}>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 15, height: 44 }}>
                {form.status === "Published" ? (isEditing ? "Save Changes" : "Publish Product") : "Save Draft"}
              </button>
              <Link href="/dashboard/products" className="btn-secondary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
                Cancel
              </Link>
            </div>

            {/* SEO score */}
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 16, padding: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 8 }}>
                SEO Score
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: `3px solid ${seoScore >= 5 ? "#34C759" : seoScore >= 3 ? "#FF9F0A" : "#D70015"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700, color: seoScore >= 5 ? "#34C759" : seoScore >= 3 ? "#FF9F0A" : "#D70015", fontFamily: "'SF Pro TH', sans-serif" }}>
                    {Math.round((seoScore / 7) * 100)}%
                  </span>
                </div>
                <span style={{ fontSize: 13, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
                  {seoScore}/7 fields complete
                </span>
              </div>
              {[
                { label: "Meta title (30–60 chars)", done: form.metaTitle.length >= 30 && form.metaTitle.length <= 60 },
                { label: "Meta description (100–160)", done: form.metaDescription.length >= 100 && form.metaDescription.length <= 160 },
                { label: "Keywords added", done: form.metaKeywords.length > 0 },
                { label: "OG title set", done: form.ogTitle.length > 0 },
                { label: "OG description set", done: form.ogDescription.length > 0 },
                { label: "OG image URL", done: form.ogImageUrl.length > 0 },
                { label: "Canonical URL", done: form.canonicalUrl.length > 0 },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="7" fill={item.done ? "#34C759" : "#E8E8ED"} />
                    {item.done && <path d="M3.5 7l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
                  </svg>
                  <span style={{ fontSize: 12, color: item.done ? "#1D1D1F" : "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div style={{ backgroundColor: "#FFF8F0", border: "1px solid #FFD700", borderRadius: 16, padding: 20 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 8 }}>
                SEO Tips
              </h3>
              {[
                "Include target keywords in the meta title naturally",
                "Write meta descriptions that invite clicks",
                "Use Thai keywords for local Thai search traffic",
                "OG images should be 1200×630 px for best quality",
                "Set canonical URLs to prevent duplicate content",
              ].map((tip) => (
                <div key={tip} style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "flex-start" }}>
                  <span style={{ color: "#FF9F0A", fontSize: 14, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 12, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
