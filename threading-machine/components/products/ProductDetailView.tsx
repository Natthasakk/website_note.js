"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { LINE_URL } from "@/lib/i18n";
import type { Product } from "@/lib/products";

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailView({ product, related }: Props) {
  const { t } = useLanguage();
  const [activeImg, setActiveImg] = useState(0);
  const pd = t.productDetail;
  const isGrooving = product.category === "grooving";
  const categoryLabel = isGrooving ? pd.grooving : pd.threading;

  const hasImages = product.images && product.images.length > 0;
  const displayImages = hasImages ? product.images! : [];

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: "#F5F5F7", borderBottom: "1px solid #E8E8ED", padding: "12px 0" }}>
        <div className="section-container">
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontFamily: "'SF Pro Text', sans-serif" }}>
            <Link href="/" style={{ color: "#86868B", textDecoration: "none" }}>{pd.home}</Link>
            <span style={{ color: "#C0C0C5" }}>/</span>
            <Link href="/products" style={{ color: "#86868B", textDecoration: "none" }}>{pd.product}</Link>
            <span style={{ color: "#C0C0C5" }}>/</span>
            <span style={{ color: "#1D1D1F", fontWeight: 500 }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section style={{ paddingTop: 48, paddingBottom: 56 }}>
        <div className="section-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              gap: 56,
              alignItems: "flex-start",
            }}
            className="product-hero-grid"
          >
            {/* Left: Image */}
            <div>
              <div
                style={{
                  backgroundColor: "#F5F5F7",
                  borderRadius: 24,
                  border: "1px solid #E8E8ED",
                  aspectRatio: "4/3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    backgroundColor: isGrooving ? "#1D1D1F" : "#D70015",
                    color: "#FFFFFF",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontFamily: "'SF Pro Text', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {categoryLabel}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    color: "#D70015",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontFamily: "'SF Pro Text', sans-serif",
                    border: "1px solid rgba(215,0,21,0.15)",
                  }}
                >
                  {product.badge}
                </div>
                {hasImages ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={displayImages[activeImg]}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : isGrooving ? (
                  <LargeGroovingIllustration />
                ) : (
                  <LargeThreadingIllustration />
                )}
              </div>

              {/* Gallery Thumbnails */}
              {hasImages && displayImages.length > 1 && (
                <div style={{ display: "flex", gap: 8 }}>
                  {displayImages.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveImg(i)}
                      style={{
                        flex: 1,
                        aspectRatio: "1",
                        backgroundColor: "#F5F5F7",
                        borderRadius: 10,
                        border: i === activeImg ? "2px solid #D70015" : "1px solid #E8E8ED",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${i + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {!hasImages && (
                <div style={{ display: "flex", gap: 8 }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        aspectRatio: "1",
                        backgroundColor: i === 0 ? "#E8E8ED" : "#F5F5F7",
                        borderRadius: 10,
                        border: i === 0 ? "2px solid #D70015" : "1px solid #E8E8ED",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="2" y="2" width="16" height="16" rx="3" stroke="#C0C0C5" strokeWidth="1.5" />
                        <circle cx="7" cy="7" r="2" stroke="#C0C0C5" strokeWidth="1.2" />
                        <path d="M2 14l4-4 3 3 3-3 6 6" stroke="#C0C0C5" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#D70015", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, fontFamily: "'SF Pro Text', sans-serif" }}>
                {product.series}
              </p>
              <h1 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", lineHeight: 1.15, marginBottom: 8 }}>
                {product.name}
              </h1>
              <p style={{ fontSize: 18, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", marginBottom: 20 }}>
                {product.tagline}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {[
                  { label: product.pipeRange },
                  { label: product.motorPower },
                  { label: product.speed },
                  { label: product.weight },
                ].map((s) => (
                  <span
                    key={s.label}
                    style={{
                      padding: "6px 14px",
                      backgroundColor: "#F5F5F7",
                      borderRadius: 20,
                      border: "1px solid #E8E8ED",
                      fontSize: 13,
                      color: "#1D1D1F",
                      fontFamily: "'SF Pro Text', sans-serif",
                    }}
                  >
                    {s.label}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: 15, color: "#1D1D1F", fontFamily: "'SF Pro Text', sans-serif", lineHeight: 1.7, marginBottom: 28 }}>
                {product.description}
              </p>

              <div style={{ height: 1, backgroundColor: "#E8E8ED", marginBottom: 24 }} />

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", marginBottom: 4 }}>{pd.startingFrom}</div>
                <div style={{ fontSize: 36, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", lineHeight: 1 }}>
                  {product.price}
                </div>
                <div style={{ fontSize: 13, color: "#D70015", fontFamily: "'SF Pro Text', sans-serif", marginTop: 4 }}>
                  {product.warranty} {pd.warrantyIncluded}
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: 16, height: 48, padding: "0 28px", flex: 1, justifyContent: "center", minWidth: 160, display: "inline-flex", alignItems: "center", textDecoration: "none" }}
                >
                  {pd.requestQuote}
                </a>
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    height: 48,
                    padding: "0 24px",
                    backgroundColor: "#F5F5F7",
                    border: "1px solid #E8E8ED",
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 400,
                    color: "#1D1D1F",
                    fontFamily: "'SF Pro Text', sans-serif",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M5 7l3 3 3-3M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {pd.specSheet}
                </a>
              </div>

              <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
                {pd.badges.map((badge) => (
                  <div key={badge} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" fill="rgba(52,199,89,0.15)" />
                      <path d="M4 7l2 2 4-4" stroke="#34C759" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ backgroundColor: "#F5F5F7", paddingTop: 56, paddingBottom: 56 }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#D70015", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'SF Pro Text', sans-serif" }}>
              {pd.whyChoose} {product.name}
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif" }}>
              {pd.keyFeatures}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {product.features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  padding: "20px 24px",
                  border: "1px solid #E8E8ED",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: "rgba(215,0,21,0.08)",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3 3 7-7" stroke="#D70015" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontSize: 14, color: "#1D1D1F", fontFamily: "'SF Pro Text', sans-serif", lineHeight: 1.6, margin: 0 }}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Specifications */}
      <section id="specifications" style={{ backgroundColor: "#1D1D1F", paddingTop: 56, paddingBottom: 56 }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#D70015", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'SF Pro Text', sans-serif" }}>
              {pd.technicalData}
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, color: "#FFFFFF", fontFamily: "'SF Pro TH', sans-serif" }}>
              {pd.fullSpecs}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {product.specs.map((section) => (
              <div
                key={section.category}
                style={{
                  backgroundColor: "#272729",
                  borderRadius: 16,
                  border: "1px solid #3A3A3C",
                  overflow: "hidden",
                }}
              >
                <div style={{ padding: "12px 18px", backgroundColor: "rgba(215,0,21,0.1)", borderBottom: "1px solid #3A3A3C" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#D70015", fontFamily: "'SF Pro Text', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {section.category}
                  </span>
                </div>
                {section.rows.map((row, i) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "11px 18px",
                      borderBottom: i < section.rows.length - 1 ? "1px solid #3A3A3C" : "none",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "'SF Pro Text', sans-serif", flexShrink: 0 }}>
                      {row.label}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#FFFFFF", fontFamily: "'SF Pro Text', sans-serif", textAlign: "right" }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ backgroundColor: "#FFFFFF", paddingTop: 56, paddingBottom: 64 }}>
          <div className="section-container">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
              <h2 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif" }}>
                {pd.youMayLike}
              </h2>
              <Link href="/products" className="btn-ghost" style={{ fontSize: 14 }}>
                {pd.seeAll}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 10l3-3-3-3" stroke="#D70015" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="related-card"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E8E8ED",
                      borderRadius: 20,
                      overflow: "hidden",
                      transition: "box-shadow 250ms ease, transform 250ms ease",
                    }}
                  >
                    <div style={{ height: 140, backgroundColor: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          backgroundColor: rel.category === "grooving" ? "#1D1D1F" : "#D70015",
                          color: "#FFFFFF",
                          fontSize: 10,
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: 10,
                          fontFamily: "'SF Pro Text', sans-serif",
                          textTransform: "uppercase",
                        }}
                      >
                        {rel.category === "grooving" ? t.productModels.groovingLabel : t.productModels.threadingLabel}
                      </span>
                      {rel.category === "grooving" ? (
                        <GroovingIllustrationSmall />
                      ) : (
                        <ThreadingIllustrationSmall />
                      )}
                    </div>
                    <div style={{ padding: "16px 20px" }}>
                      <p style={{ fontSize: 11, color: "#D70015", fontWeight: 600, fontFamily: "'SF Pro Text', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
                        {rel.series}
                      </p>
                      <h3 style={{ fontSize: 17, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 4 }}>
                        {rel.name}
                      </h3>
                      <p style={{ fontSize: 13, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", marginBottom: 12 }}>
                        {rel.pipeRange} · {rel.motorPower}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 16, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif" }}>
                          {rel.price}
                        </span>
                        <span style={{ fontSize: 13, color: "#D70015", fontFamily: "'SF Pro Text', sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                          {pd.view}
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M4 8l3-2.5L4 3" stroke="#D70015" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 768px) {
          .product-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        .related-card:hover {
          box-shadow: 0px 8px 24px rgba(0,0,0,0.12) !important;
          transform: translateY(-3px) !important;
        }
      `}</style>
    </div>
  );
}

// ── Illustrations ──────────────────────────────────────────────────────────────

function LargeThreadingIllustration() {
  return (
    <svg width="280" height="180" viewBox="0 0 280 180" fill="none">
      <rect x="20" y="60" width="80" height="60" rx="10" fill="#E8E8ED" />
      <circle cx="60" cy="90" r="24" stroke="#D70015" strokeWidth="3" fill="none" />
      <circle cx="60" cy="90" r="13" fill="rgba(215,0,21,0.12)" />
      <circle cx="60" cy="90" r="7" fill="#D70015" />
      <rect x="108" y="78" width="130" height="24" rx="8" fill="#D70015" opacity="0.75" />
      <rect x="112" y="70" width="24" height="40" rx="6" fill="#E8E8ED" stroke="#D0D0D5" strokeWidth="1" />
      <circle cx="124" cy="90" r="7" fill="#D70015" opacity="0.45" />
      <rect x="238" y="74" width="28" height="32" rx="6" fill="#E8E8ED" stroke="#D0D0D5" strokeWidth="1" />
      <rect x="242" y="80" width="4" height="20" rx="2" fill="#D70015" opacity="0.35" />
      <rect x="249" y="80" width="4" height="20" rx="2" fill="#D70015" opacity="0.35" />
      <rect x="256" y="80" width="4" height="20" rx="2" fill="#D70015" opacity="0.35" />
      <line x1="50" y1="120" x2="35" y2="155" stroke="#C0C0C5" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="120" x2="85" y2="155" stroke="#C0C0C5" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="120" x2="60" y2="155" stroke="#C0C0C5" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function LargeGroovingIllustration() {
  return (
    <svg width="280" height="180" viewBox="0 0 280 180" fill="none">
      <rect x="20" y="50" width="75" height="80" rx="10" fill="#E8E8ED" />
      <circle cx="57" cy="90" r="28" stroke="#1D1D1F" strokeWidth="2.5" fill="none" />
      <circle cx="57" cy="90" r="16" stroke="#D70015" strokeWidth="3" fill="none" />
      <circle cx="57" cy="90" r="6" fill="#1D1D1F" />
      <rect x="100" y="74" width="148" height="32" rx="14" fill="none" stroke="#1D1D1F" strokeWidth="2.5" />
      <rect x="135" y="74" width="6" height="32" rx="2" fill="#D70015" opacity="0.45" />
      <rect x="148" y="74" width="6" height="32" rx="2" fill="#D70015" opacity="0.45" />
      <ellipse cx="185" cy="65" rx="22" ry="7" fill="#1D1D1F" opacity="0.12" stroke="#1D1D1F" strokeWidth="1.5" />
      <ellipse cx="185" cy="115" rx="22" ry="7" fill="#1D1D1F" opacity="0.12" stroke="#1D1D1F" strokeWidth="1.5" />
      <line x1="47" y1="130" x2="32" y2="162" stroke="#C0C0C5" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="67" y1="130" x2="82" y2="162" stroke="#C0C0C5" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ThreadingIllustrationSmall() {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
      <rect x="5" y="22" width="36" height="36" rx="5" fill="#E8E8ED" />
      <circle cx="23" cy="40" r="13" stroke="#D70015" strokeWidth="2" fill="none" />
      <circle cx="23" cy="40" r="5" fill="#D70015" />
      <rect x="46" y="33" width="65" height="14" rx="5" fill="#D70015" opacity="0.7" />
      <rect x="49" y="27" width="14" height="26" rx="4" fill="#E8E8ED" stroke="#D0D0D5" strokeWidth="1" />
    </svg>
  );
}

function GroovingIllustrationSmall() {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
      <rect x="5" y="20" width="36" height="40" rx="5" fill="#E8E8ED" />
      <circle cx="23" cy="40" r="14" stroke="#1D1D1F" strokeWidth="1.8" fill="none" />
      <circle cx="23" cy="40" r="7" stroke="#D70015" strokeWidth="2" fill="none" />
      <circle cx="23" cy="40" r="3" fill="#1D1D1F" />
      <rect x="46" y="32" width="68" height="16" rx="8" fill="none" stroke="#1D1D1F" strokeWidth="2" />
      <rect x="63" y="32" width="4" height="16" rx="1" fill="#D70015" opacity="0.5" />
    </svg>
  );
}
