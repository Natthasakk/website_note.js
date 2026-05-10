"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { threadingProducts, groovingProducts } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ImagesConfig } from "@/lib/productImageStore";

// ── SVG Illustrations ─────────────────────────────────────────────────────────

function ThreadingSVG({ dark }: { dark: boolean }) {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
      <rect x="5" y="20" width="40" height="40" rx="6" fill={dark ? "#3A3A3C" : "#E8E8ED"} />
      <circle cx="25" cy="40" r="14" stroke="#D70015" strokeWidth="2.5" fill="none" />
      <circle cx="25" cy="40" r="7" fill="#D70015" />
      <rect x="50" y="34" width="60" height="12" rx="4" fill="#D70015" opacity="0.7" />
      <rect x="53" y="30" width="12" height="20" rx="3" fill={dark ? "#3A3A3C" : "#E8E8ED"} />
      <rect x="53" y="30" width="12" height="20" rx="3" stroke={dark ? "#4A4A4C" : "#D0D0D5"} strokeWidth="1" fill="none" />
      <circle cx="59" cy="40" r="4" fill="#D70015" opacity="0.6" />
    </svg>
  );
}

function GroovingSVG({ dark }: { dark: boolean }) {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
      <rect x="5" y="16" width="38" height="48" rx="6" fill={dark ? "#3A3A3C" : "#E8E8ED"} />
      <circle cx="24" cy="40" r="15" stroke={dark ? "#FFFFFF" : "#1D1D1F"} strokeWidth="2" fill="none" />
      <circle cx="24" cy="40" r="8" stroke="#D70015" strokeWidth="2.5" fill="none" />
      <circle cx="24" cy="40" r="3" fill={dark ? "#FFFFFF" : "#1D1D1F"} />
      <rect x="48" y="33" width="66" height="14" rx="7" fill="none" stroke={dark ? "#FFFFFF" : "#1D1D1F"} strokeWidth="2" />
      <rect x="66" y="33" width="4" height="14" rx="1.5" fill="#D70015" opacity="0.5" />
      <rect x="76" y="33" width="4" height="14" rx="1.5" fill="#D70015" opacity="0.5" />
      <ellipse cx="98" cy="28" rx="14" ry="4.5" fill={dark ? "#FFFFFF" : "#1D1D1F"} opacity="0.12" stroke={dark ? "#FFFFFF" : "#1D1D1F"} strokeWidth="1.2" />
      <ellipse cx="98" cy="52" rx="14" ry="4.5" fill={dark ? "#FFFFFF" : "#1D1D1F"} opacity="0.12" stroke={dark ? "#FFFFFF" : "#1D1D1F"} strokeWidth="1.2" />
    </svg>
  );
}

// ── Arrow button ──────────────────────────────────────────────────────────────

function ArrowBtn({ dir, onClick, disabled }: { dir: "prev" | "next"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid #E8E8ED",
        backgroundColor: disabled ? "#F5F5F7" : "#FFFFFF",
        color: disabled ? "#C0C0C5" : "#1D1D1F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        flexShrink: 0,
        boxShadow: disabled ? "none" : "0px 2px 8px rgba(0,0,0,0.08)",
        transition: "all 150ms ease",
      }}
    >
      {dir === "prev" ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

// ── Model card ────────────────────────────────────────────────────────────────

function ModelCard({
  product,
  dark,
  isGrooving,
  specLabels,
  startingFrom,
  learnMore,
}: {
  product: Product;
  dark: boolean;
  isGrooving: boolean;
  specLabels: string[];
  startingFrom: string;
  learnMore: string;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      style={{
        backgroundColor: dark ? "#1D1D1F" : "#FFFFFF",
        border: `1px solid ${dark ? "#272729" : "#E8E8ED"}`,
        borderRadius: 28,
        padding: "32px",
        boxShadow: dark ? "0px 4px 20px rgba(0,0,0,0.4)" : "0px 4px 16px rgba(0,0,0,0.08)",
        transition: "box-shadow 300ms ease, transform 300ms ease",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = dark
          ? "0px 12px 40px rgba(0,0,0,0.6)"
          : "0px 12px 32px rgba(0,0,0,0.14)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = dark
          ? "0px 4px 20px rgba(0,0,0,0.4)"
          : "0px 4px 16px rgba(0,0,0,0.08)";
      }}
    >
      {/* Badge */}
      <span
        style={{
          alignSelf: "flex-start",
          marginBottom: 24,
          backgroundColor: "#D70015",
          color: "#FFFFFF",
          fontSize: 11,
          fontWeight: 600,
          padding: "3px 10px",
          borderRadius: 20,
          fontFamily: "'SF Pro Text', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {product.badge}
      </span>

      {/* Illustration / Image */}
      <div
        style={{
          width: "100%",
          height: 160,
          backgroundColor: dark ? "#272729" : "#F5F5F7",
          borderRadius: 16,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {product.images && product.images.length > 0 ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : isGrooving ? (
          <GroovingSVG dark={dark} />
        ) : (
          <ThreadingSVG dark={dark} />
        )}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 16,
            fontSize: 11,
            color: product.images && product.images.length > 0 ? "#FFFFFF" : (dark ? "rgba(255,255,255,0.3)" : "#86868B"),
            backgroundColor: product.images && product.images.length > 0 ? "rgba(0,0,0,0.3)" : "transparent",
            padding: product.images && product.images.length > 0 ? "2px 6px" : 0,
            borderRadius: 4,
            fontFamily: "'SF Pro Text', sans-serif",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {product.name}
        </div>
      </div>

      {/* Info */}
      <p style={{ fontSize: 12, fontWeight: 600, color: "#D70015", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, fontFamily: "'SF Pro Text', sans-serif" }}>
        {product.series}
      </p>
      <h3 style={{ fontSize: 24, fontWeight: 600, color: dark ? "#FFFFFF" : "#1D1D1F", fontFamily: "'SF Pro TH', -apple-system, sans-serif", marginBottom: 12 }}>
        {product.name}
      </h3>
      <p style={{ fontSize: 15, color: dark ? "rgba(255,255,255,0.6)" : "#86868B", fontFamily: "'SF Pro Text', sans-serif", lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
        {product.tagline}
      </p>

      {/* Spec grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 24,
          padding: "16px",
          backgroundColor: dark ? "#272729" : "#F5F5F7",
          borderRadius: 12,
        }}
      >
        {[product.pipeRange, product.motorPower, product.speed, product.weight].map((val, i) => (
          <div key={i}>
            <div style={{ fontSize: 11, color: dark ? "rgba(255,255,255,0.4)" : "#86868B", fontFamily: "'SF Pro Text', sans-serif", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {specLabels[i]}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: dark ? "#FFFFFF" : "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif" }}>
              {val}
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
        {product.features.slice(0, 4).map((feature) => (
          <li key={feature} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: dark ? "rgba(255,255,255,0.7)" : "#1D1D1F", fontFamily: "'SF Pro Text', sans-serif" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="#D70015" opacity="0.15" />
              <path d="M5 8l2 2 4-4" stroke="#D70015" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* Price & CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <div>
          <div style={{ fontSize: 11, color: dark ? "rgba(255,255,255,0.4)" : "#86868B", fontFamily: "'SF Pro Text', sans-serif", marginBottom: 2 }}>
            {startingFrom}
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: dark ? "#FFFFFF" : "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif" }}>
            {product.price}
          </div>
        </div>
        <Link href={`/products/${product.id}`} className="btn-primary" style={{ fontSize: 14, height: 40, padding: "0 20px" }} onClick={(e) => e.stopPropagation()}>
          {learnMore}
        </Link>
      </div>
    </div>
  );
}

// ── Mobile carousel ───────────────────────────────────────────────────────────

function MobileCarousel({
  products,
  isGrooving,
  specLabels,
  startingFrom,
  learnMore,
}: {
  products: Product[];
  isGrooving: boolean;
  specLabels: string[];
  startingFrom: string;
  learnMore: string;
}) {
  const [idx, setIdx] = useState(0);
  const count = products.length;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ paddingTop: 120 }}>
          <ArrowBtn dir="prev" onClick={() => setIdx((p) => Math.max(0, p - 1))} disabled={idx === 0} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <ModelCard
            product={products[idx]}
            dark={idx === 1}
            isGrooving={isGrooving}
            specLabels={specLabels}
            startingFrom={startingFrom}
            learnMore={learnMore}
          />
        </div>
        <div style={{ paddingTop: 120 }}>
          <ArrowBtn dir="next" onClick={() => setIdx((p) => Math.min(count - 1, p + 1))} disabled={idx === count - 1} />
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === idx ? 20 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === idx ? "#D70015" : "#E8E8ED",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 200ms ease, background-color 200ms ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHeader({ accentColor, label, title, description }: { accentColor: string; label: string; title: string; description: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 32 }}>
      <div style={{ width: 4, height: 40, backgroundColor: accentColor, borderRadius: 2, flexShrink: 0, marginTop: 4 }} />
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, color: accentColor, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "'SF Pro Text', sans-serif" }}>
          {label}
        </p>
        <h2 style={{ fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', -apple-system, sans-serif", lineHeight: 1.2, marginBottom: 6 }}>
          {title}
        </h2>
        <p style={{ fontSize: 15, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

// ── Page section ──────────────────────────────────────────────────────────────

export default function ProductModels({ imagesConfig = {} }: { imagesConfig?: ImagesConfig }) {
  const { t } = useLanguage();
  const pm = t.productModels;

  // Merge blob images into product data
  const enrichedThreading = threadingProducts.map((p) => ({
    ...p,
    images: imagesConfig[p.id] ?? p.images ?? [],
  }));
  const enrichedGrooving = groovingProducts.map((p) => ({
    ...p,
    images: imagesConfig[p.id] ?? p.images ?? [],
  }));

  const cardProps = {
    specLabels: pm.specs as string[],
    startingFrom: pm.startingFrom,
    learnMore: pm.learnMore,
  };

  return (
    <section style={{ backgroundColor: "#F5F5F7", paddingTop: 80, paddingBottom: 80 }}>
      <div className="section-container">
        {/* Top header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#D70015", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'SF Pro Text', -apple-system, sans-serif" }}>
            {pm.overline}
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', -apple-system, sans-serif", lineHeight: 1.2, marginBottom: 16 }}>
            {pm.heading}
          </h2>
          <p style={{ fontSize: 17, color: "#86868B", fontFamily: "'SF Pro Text', -apple-system, sans-serif", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            {pm.sub}
          </p>
        </div>

        {/* Threading section */}
        <div style={{ marginBottom: 64 }}>
          <SectionHeader
            accentColor="#D70015"
            label={pm.threadingLabel}
            title={pm.threadingTitle}
            description={pm.threadingDesc}
          />
          {/* Desktop: 3-column grid */}
          <div className="hidden md:block">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {enrichedThreading.map((p, i) => (
                <ModelCard key={p.id} product={p} dark={i === 1} isGrooving={false} {...cardProps} />
              ))}
            </div>
          </div>
          {/* Mobile: carousel */}
          <div className="md:hidden">
            <MobileCarousel products={enrichedThreading} isGrooving={false} {...cardProps} />
          </div>
        </div>

        {/* Grooving section */}
        <div style={{ marginBottom: 48 }}>
          <SectionHeader
            accentColor="#1D1D1F"
            label={pm.groovingLabel}
            title={pm.groovingTitle}
            description={pm.groovingDesc}
          />
          {/* Desktop: 3-column grid */}
          <div className="hidden md:block">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {enrichedGrooving.map((p, i) => (
                <ModelCard key={p.id} product={p} dark={i === 1} isGrooving={true} {...cardProps} />
              ))}
            </div>
          </div>
          {/* Mobile: carousel */}
          <div className="md:hidden">
            <MobileCarousel products={enrichedGrooving} isGrooving={true} {...cardProps} />
          </div>
        </div>

        {/* Footer link */}
        <div style={{ textAlign: "center" }}>
          <Link href="/products" className="btn-ghost">
            {pm.compareAll}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12l4-4-4-4" stroke="#D70015" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
