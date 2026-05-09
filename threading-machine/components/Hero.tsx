"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { LINE_URL } from "@/lib/i18n";

const statValues = ["6\"", "2200", "50+", "25yr"];

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section
      style={{
        backgroundColor: "#000000",
        color: "#FFFFFF",
        paddingTop: 96,
        paddingBottom: 96,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(215,0,21,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        {/* Badge */}
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
          <span className="badge-blue">{h.badge}</span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'SF Pro TH', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "clamp(34px, 6vw, 80px)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            maxWidth: 900,
            margin: "0 auto 24px",
          }}
        >
          {h.h1}
          <br />
          <span style={{ color: "#D70015" }}>{h.h1accent}</span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "clamp(17px, 2vw, 21px)",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.72)",
            maxWidth: 640,
            margin: "0 auto 48px",
          }}
        >
          {h.sub}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/products" className="btn-primary" style={{ fontSize: 17, height: 50, padding: "0 32px" }}>
            {h.cta1}
          </Link>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              backgroundColor: "#06C755",
              color: "#FFFFFF",
              fontFamily: "'SF Pro Text', -apple-system, sans-serif",
              fontSize: 17,
              fontWeight: 600,
              padding: "0 32px",
              height: 50,
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.771.038 1.087l-.164 1.026c-.045.303-.24 1.192 1.049.649 1.291-.542 6.916-4.072 9.437-6.977C23.176 14.393 24 12.458 24 10.304"/>
            </svg>
            {h.cta2}
          </a>
        </div>

        {/* Machine visual */}
        <div style={{ marginTop: 80, position: "relative", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              position: "absolute",
              width: 600,
              height: 300,
              background: "radial-gradient(ellipse, rgba(215,0,21,0.3) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              width: "100%",
              maxWidth: 800,
              height: 320,
              background: "linear-gradient(135deg, #1D1D1F 0%, #272729 50%, #1D1D1F 100%)",
              borderRadius: 32,
              border: "1px solid #272729",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0px 32px 80px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 24, position: "relative" }}>
                <div style={{ width: 120, height: 160, backgroundColor: "#2A2A2C", borderRadius: 16, border: "1px solid #3A3A3C", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", border: "3px solid #D70015", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#D70015" }} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "#2A2A2C", border: "3px solid #3A3A3C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #D70015" }} />
                  </div>
                  <div style={{ width: 160, height: 32, backgroundColor: "#D70015", borderRadius: 4, opacity: 0.8 }} />
                </div>
                <div style={{ width: 80, height: 120, backgroundColor: "#2A2A2C", borderRadius: 12, border: "1px solid #3A3A3C", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ height: 8, backgroundColor: "#D70015", borderRadius: 4 }} />
                  <div style={{ height: 8, backgroundColor: "#3A3A3C", borderRadius: 4 }} />
                  <div style={{ height: 8, backgroundColor: "#3A3A3C", borderRadius: 4 }} />
                  <div style={{ width: 32, height: 32, backgroundColor: "#D70015", borderRadius: "50%", margin: "auto" }} />
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "'SF Pro Text', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              TechThread Pro Series
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 32,
            maxWidth: 800,
            margin: "80px auto 0",
          }}
        >
          {statValues.map((value, i) => (
            <div key={value} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 600, color: "#FFFFFF", fontFamily: "'SF Pro TH', -apple-system, sans-serif", lineHeight: 1, marginBottom: 8 }}>
                {value}
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "'SF Pro Text', sans-serif" }}>
                {h.statLabels[i]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
