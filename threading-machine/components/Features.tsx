"use client";
import { useLanguage } from "@/contexts/LanguageContext";

const featureIcons = [
  <svg key="1" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="12" stroke="#D70015" strokeWidth="2" />
    <circle cx="16" cy="16" r="5" fill="#D70015" />
    <path d="M16 4V8M16 24V28M4 16H8M24 16H28" stroke="#D70015" strokeWidth="2" strokeLinecap="round" />
  </svg>,
  <svg key="2" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="6" y="8" width="20" height="16" rx="3" stroke="#D70015" strokeWidth="2" />
    <path d="M10 12h12M10 16h8M10 20h5" stroke="#D70015" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="24" cy="8" r="4" fill="#D70015" />
  </svg>,
  <svg key="3" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 6L6 12V20L16 26L26 20V12L16 6Z" stroke="#D70015" strokeWidth="2" strokeLinejoin="round" />
    <path d="M16 6V26M6 12L26 20M26 12L6 20" stroke="#D70015" strokeWidth="1" strokeLinejoin="round" opacity="0.4" />
  </svg>,
  <svg key="4" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M8 16C8 11.6 11.6 8 16 8s8 3.6 8 8-3.6 8-8 8" stroke="#D70015" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 16h4M16 28v-4" stroke="#D70015" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="16" r="3" fill="#D70015" />
    <path d="M12 16l-2 6M12 16l6-2" stroke="#D70015" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="5" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M6 26L16 6L26 26" stroke="#D70015" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 20h14" stroke="#D70015" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="16" r="2" fill="#D70015" />
  </svg>,
  <svg key="6" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="14" width="24" height="10" rx="3" stroke="#D70015" strokeWidth="2" />
    <path d="M10 14V10a6 6 0 0112 0v4" stroke="#D70015" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="19" r="2" fill="#D70015" />
  </svg>,
];

export default function Features() {
  const { t } = useLanguage();
  const f = t.features;

  return (
    <section id="features" style={{ backgroundColor: "#FFFFFF", paddingTop: 80, paddingBottom: 80 }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#D70015", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'SF Pro Text', -apple-system, sans-serif" }}>
            {f.overline}
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', -apple-system, sans-serif", lineHeight: 1.2, marginBottom: 16 }}>
            {f.heading}
          </h2>
          <p style={{ fontSize: 17, fontWeight: 400, color: "#86868B", fontFamily: "'SF Pro Text', -apple-system, sans-serif", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            {f.sub}
          </p>
        </div>

        {/* Feature grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {f.items.map((item, idx) => (
            <div key={idx} className="card-light" style={{ cursor: "default" }}>
              <div style={{ width: 56, height: 56, backgroundColor: "#F5F5F7", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                {featureIcons[idx]}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', -apple-system, sans-serif", marginBottom: 8 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 15, fontWeight: 400, color: "#86868B", fontFamily: "'SF Pro Text', -apple-system, sans-serif", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
