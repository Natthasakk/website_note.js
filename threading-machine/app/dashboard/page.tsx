import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Overview" };

const stats = [
  { label: "Total Products", value: "3", change: "+0 this month", up: true },
  { label: "Active Listings", value: "3", change: "All published", up: true },
  { label: "Page Views (est.)", value: "—", change: "Connect analytics", up: null },
  { label: "Quote Requests", value: "—", change: "Connect CRM", up: null },
];

const quickLinks = [
  { href: "/dashboard/products/add", label: "Add New Product", desc: "Create a new product listing with SEO fields", color: "#D70015" },
  { href: "/dashboard/products", label: "Manage Products", desc: "Edit, reorder, or remove existing products", color: "#1D1D1F" },
  { href: "/", label: "Preview Website", desc: "Open the public-facing website in a new tab", color: "#272729" },
];

export default function DashboardPage() {
  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 6 }}>
          Dashboard Overview
        </h1>
        <p style={{ fontSize: 15, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
          Manage your products, SEO settings, and website content.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E8E8ED",
              borderRadius: 16,
              padding: "20px 24px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 13, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {stat.label}
            </div>
            <div style={{ fontSize: 32, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 6 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 13, color: stat.up === true ? "#34C759" : "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 16 }}>
        Quick Actions
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 32 }}>
        {quickLinks.map((ql) => (
          <Link
            key={ql.href}
            href={ql.href}
            target={ql.href === "/" ? "_blank" : undefined}
            rel={ql.href === "/" ? "noopener noreferrer" : undefined}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              padding: "20px 24px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E8E8ED",
              borderRadius: 16,
              textDecoration: "none",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
              transition: "box-shadow 200ms ease, transform 200ms ease",
            }}
          >
            <div style={{ width: 40, height: 40, backgroundColor: ql.color, borderRadius: 10, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 4 }}>
                {ql.label}
              </div>
              <div style={{ fontSize: 13, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", lineHeight: 1.5 }}>
                {ql.desc}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* SEO tips */}
      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 20, padding: 24, boxShadow: "0px 2px 8px rgba(0,0,0,0.06)" }}>
        <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 16 }}>
          SEO Health Checklist
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "Meta title set for all pages", done: true },
            { label: "Meta description set for all pages", done: true },
            { label: "Open Graph image uploaded (/public/og-image.png)", done: false },
            { label: "Sitemap accessible at /sitemap.xml", done: true },
            { label: "robots.txt configured", done: true },
            { label: "JSON-LD structured data on homepage", done: true },
            { label: "All products have unique meta title + description", done: false },
            { label: "Mobile viewport meta configured", done: true },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  border: item.done ? "none" : "2px solid #E8E8ED",
                  backgroundColor: item.done ? "#34C759" : "transparent",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.done && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={{ fontSize: 14, color: item.done ? "#1D1D1F" : "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
