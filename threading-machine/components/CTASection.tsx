"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LINE_URL } from "@/lib/i18n";

export default function CTASection() {
  const { t } = useLanguage();
  const c = t.cta;

  return (
    <section style={{ backgroundColor: "#FFFFFF", paddingTop: 80, paddingBottom: 80 }}>
      <div className="section-container">
        <div
          style={{
            background: "linear-gradient(135deg, #000000 0%, #1D1D1F 40%, #D70015 120%)",
            borderRadius: 32,
            padding: "64px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              background: "radial-gradient(circle, rgba(215,0,21,0.3) 0%, transparent 70%)",
              top: "-200px",
              right: "-100px",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="badge-blue" style={{ marginBottom: 24, display: "inline-flex" }}>
              {c.badge}
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 600,
                color: "#FFFFFF",
                fontFamily: "'SF Pro TH', -apple-system, sans-serif",
                lineHeight: 1.15,
                marginBottom: 20,
                maxWidth: 700,
                margin: "0 auto 20px",
              }}
            >
              {c.heading}
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                lineHeight: 1.6,
                maxWidth: 520,
                margin: "0 auto 40px",
              }}
            >
              {c.sub}
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: 17, height: 50, padding: "0 36px", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.771.038 1.087l-.164 1.026c-.045.303-.24 1.192 1.049.649 1.291-.542 6.916-4.072 9.437-6.977C23.176 14.393 24 12.458 24 10.304"/>
                </svg>
                {c.primary}
              </a>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 17,
                  fontFamily: "'SF Pro Text', sans-serif",
                  textDecoration: "none",
                  height: 50,
                  padding: "0 24px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.3)",
                  transition: "color 200ms ease, border-color 200ms ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#FFFFFF";
                  el.style.borderColor = "rgba(255,255,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "rgba(255,255,255,0.8)";
                  el.style.borderColor = "rgba(255,255,255,0.3)";
                }}
              >
                {c.lineBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
