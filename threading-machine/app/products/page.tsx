"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useLanguage } from "@/contexts/LanguageContext";

type Category = "all" | "threading" | "grooving";

function ProductCard({ product }: { product: Product }) {
  const isGrooving = product.category === "grooving";
  const { t } = useLanguage();
  const pp = t.productsPage;

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8E8ED",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0px 4px 16px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 300ms ease, transform 300ms ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0px 12px 32px rgba(0,0,0,0.13)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0px 4px 16px rgba(0,0,0,0.07)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Image area */}
      <div
        style={{
          height: 200,
          backgroundColor: "#F5F5F7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Category tag */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            backgroundColor: isGrooving ? "#1D1D1F" : "#D70015",
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
          {isGrooving ? t.productModels.groovingLabel : t.productModels.threadingLabel}
        </div>
        {/* Badge */}
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            backgroundColor: "rgba(255,255,255,0.92)",
            color: "#D70015",
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 10px",
            borderRadius: 20,
            fontFamily: "'SF Pro Text', sans-serif",
            border: "1px solid rgba(215,0,21,0.15)",
          }}
        >
          {product.badge}
        </div>

        {/* Machine illustration */}
        {isGrooving ? <GroovingIllustration /> : <ThreadingIllustration />}
      </div>

      {/* Content */}
      <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: 11, color: "#D70015", fontWeight: 600, fontFamily: "'SF Pro Text', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
          {product.series}
        </p>
        <h3 style={{ fontSize: 22, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 8 }}>
          {product.name}
        </h3>
        <p style={{ fontSize: 14, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
          {product.tagline}
        </p>

        {/* Quick specs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 20,
            padding: 12,
            backgroundColor: "#F5F5F7",
            borderRadius: 10,
          }}
        >
          {[
            { label: pp.specLabels[0], value: product.pipeRange },
            { label: pp.specLabels[1], value: product.motorPower },
            { label: pp.specLabels[2], value: product.speed },
            { label: pp.specLabels[3], value: product.weight },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 10, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif" }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", marginBottom: 2 }}>{pp.startingFrom}</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif" }}>{product.price}</div>
          </div>
          <Link
            href={`/products/${product.id}`}
            className="btn-primary"
            style={{ fontSize: 14, height: 40, padding: "0 18px" }}
          >
            {pp.viewDetails}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── SVG Illustrations ────────────────────────────────────────────────────────

function ThreadingIllustration() {
  return (
    <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
      <rect x="10" y="40" width="55" height="40" rx="6" fill="#E8E8ED" />
      <circle cx="37" cy="60" r="16" stroke="#D70015" strokeWidth="2.5" fill="none" />
      <circle cx="37" cy="60" r="8" fill="#D70015" opacity="0.2" />
      <circle cx="37" cy="60" r="4" fill="#D70015" />
      <rect x="70" y="53" width="85" height="14" rx="5" fill="#D70015" opacity="0.75" />
      <rect x="72" y="48" width="16" height="24" rx="4" fill="#E8E8ED" stroke="#D0D0D5" strokeWidth="1" />
      <circle cx="80" cy="60" r="5" fill="#D70015" opacity="0.5" />
      <rect x="155" y="50" width="18" height="20" rx="4" fill="#E8E8ED" stroke="#D0D0D5" strokeWidth="1" />
      <rect x="158" y="54" width="3" height="12" rx="1" fill="#D70015" opacity="0.4" />
      <rect x="163" y="54" width="3" height="12" rx="1" fill="#D70015" opacity="0.4" />
      <rect x="168" y="54" width="3" height="12" rx="1" fill="#D70015" opacity="0.4" />
    </svg>
  );
}

function GroovingIllustration() {
  return (
    <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
      {/* Main body */}
      <rect x="15" y="35" width="50" height="50" rx="8" fill="#E8E8ED" />
      {/* Drive wheel */}
      <circle cx="40" cy="60" r="18" stroke="#1D1D1F" strokeWidth="2" fill="none" />
      <circle cx="40" cy="60" r="10" stroke="#D70015" strokeWidth="2.5" fill="none" />
      <circle cx="40" cy="60" r="4" fill="#1D1D1F" />
      {/* Pipe */}
      <rect x="70" y="50" width="90" height="20" rx="10" fill="none" stroke="#1D1D1F" strokeWidth="2" />
      {/* Groove cut on pipe */}
      <rect x="95" y="50" width="4" height="20" rx="1" fill="#D70015" opacity="0.5" />
      <rect x="103" y="50" width="4" height="20" rx="1" fill="#D70015" opacity="0.5" />
      {/* Upper roll */}
      <ellipse cx="120" cy="42" rx="16" ry="6" fill="#1D1D1F" opacity="0.15" stroke="#1D1D1F" strokeWidth="1.5" />
      <ellipse cx="120" cy="78" rx="16" ry="6" fill="#1D1D1F" opacity="0.15" stroke="#1D1D1F" strokeWidth="1.5" />
    </svg>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const { t } = useLanguage();
  const pp = t.productsPage;

  const filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const categoryTabs = [
    { id: "all" as Category, label: pp.tabAll, count: products.length },
    { id: "threading" as Category, label: pp.tabThreading, count: products.filter((p) => p.category === "threading").length },
    { id: "grooving" as Category, label: pp.tabGrooving, count: products.filter((p) => p.category === "grooving").length },
  ];

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      {/* Page header */}
      <section style={{ backgroundColor: "#F5F5F7", paddingTop: 56, paddingBottom: 48, borderBottom: "1px solid #E8E8ED" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#D70015", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'SF Pro Text', sans-serif" }}>
            {pp.overline}
          </p>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', -apple-system, sans-serif", lineHeight: 1.2, marginBottom: 12 }}>
            {pp.heading}
          </h1>
          <p style={{ fontSize: 17, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
            {pp.sub}
          </p>
        </div>
      </section>

      {/* Category tabs */}
      <section style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E8E8ED", position: "sticky", top: 64, zIndex: 50 }}>
        <div className="section-container">
          <div style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: 0 }}>
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  padding: "16px 24px",
                  border: "none",
                  borderBottom: activeCategory === tab.id ? "2px solid #D70015" : "2px solid transparent",
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: "'SF Pro TH', sans-serif",
                  fontSize: 15,
                  fontWeight: activeCategory === tab.id ? 600 : 400,
                  color: activeCategory === tab.id ? "#D70015" : "#86868B",
                  transition: "color 200ms ease, border-color 200ms ease",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {tab.label}
                <span
                  style={{
                    backgroundColor: activeCategory === tab.id ? "#D70015" : "#E8E8ED",
                    color: activeCategory === tab.id ? "#FFFFFF" : "#86868B",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "2px 7px",
                    borderRadius: 10,
                    fontFamily: "'SF Pro Text', sans-serif",
                    transition: "background-color 200ms ease, color 200ms ease",
                  }}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section style={{ paddingTop: 48, paddingBottom: 72 }}>
        <div className="section-container">
          {/* Category heading */}
          {activeCategory !== "all" && (
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 24, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 6 }}>
                {activeCategory === "threading" ? pp.sectionThreading : pp.sectionGrooving}
              </h2>
              <p style={{ fontSize: 15, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
                {activeCategory === "threading" ? pp.subThreading : pp.subGrooving}
              </p>
            </div>
          )}

          {activeCategory === "all" && (
            <>
              {/* Threading section */}
              <div style={{ marginBottom: 56 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 4, height: 32, backgroundColor: "#D70015", borderRadius: 2 }} />
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif" }}>
                      {pp.sectionThreading}
                    </h2>
                    <p style={{ fontSize: 14, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
                      {pp.subThreading}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveCategory("threading")}
                    style={{ marginLeft: "auto", background: "transparent", border: "none", color: "#D70015", fontSize: 14, fontFamily: "'SF Pro Text', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}
                  >
                    {pp.viewAll}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 10l3-3-3-3" stroke="#D70015" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                  {products.filter((p) => p.category === "threading").map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>

              {/* Grooving section */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 4, height: 32, backgroundColor: "#1D1D1F", borderRadius: 2 }} />
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif" }}>
                      {pp.sectionGrooving}
                    </h2>
                    <p style={{ fontSize: 14, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
                      {pp.subGrooving}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveCategory("grooving")}
                    style={{ marginLeft: "auto", background: "transparent", border: "none", color: "#D70015", fontSize: 14, fontFamily: "'SF Pro Text', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}
                  >
                    {pp.viewAll}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 10l3-3-3-3" stroke="#D70015" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                  {products.filter((p) => p.category === "grooving").map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeCategory !== "all" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
