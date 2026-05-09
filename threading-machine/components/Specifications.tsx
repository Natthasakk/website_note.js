"use client";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const tabs = ["TT Pro 300", "TT Industrial 500", "TT Heavy 800"];

const specs: Record<string, { category: string; rows: { label: string; value: string }[] }[]> = {
  "TT Pro 300": [
    {
      category: "Threading Capacity",
      rows: [
        { label: "Pipe Size Range", value: "1/8\" – 3\" (DN6 – DN80)" },
        { label: "Thread Standards", value: "BSPT, NPT, G (BSP)" },
        { label: "Die Head Type", value: "Auto-open, 4-die set" },
        { label: "Thread Length", value: "Up to 75 mm" },
      ],
    },
    {
      category: "Power & Performance",
      rows: [
        { label: "Motor Power", value: "1.5 kW (2 HP)" },
        { label: "Voltage", value: "220V / 380V, 50/60 Hz" },
        { label: "Spindle Speed", value: "38 / 72 RPM (2-speed)" },
        { label: "Chuck Capacity", value: "1/8\" – 3\" pipe" },
      ],
    },
    {
      category: "Physical",
      rows: [
        { label: "Dimensions (L×W×H)", value: "820 × 480 × 520 mm" },
        { label: "Net Weight", value: "62 kg" },
        { label: "Carriage", value: "Heavy-duty with tri-stand" },
        { label: "Coolant Tank", value: "4.5 L integrated" },
      ],
    },
    {
      category: "Compliance",
      rows: [
        { label: "Certification", value: "CE, ISO 9001:2015" },
        { label: "Safety Standard", value: "EN 60745, IEC 62841" },
        { label: "IP Rating", value: "IP44" },
        { label: "Warranty", value: "2 years parts & labor" },
      ],
    },
  ],
  "TT Industrial 500": [
    {
      category: "Threading Capacity",
      rows: [
        { label: "Pipe Size Range", value: "1/8\" – 4\" (DN6 – DN100)" },
        { label: "Thread Standards", value: "BSPT, NPT, G (BSP), Metric" },
        { label: "Die Head Type", value: "Auto-open quick-change" },
        { label: "Thread Length", value: "Up to 100 mm" },
      ],
    },
    {
      category: "Power & Performance",
      rows: [
        { label: "Motor Power", value: "2.2 kW (3 HP)" },
        { label: "Voltage", value: "220V / 380V, 50/60 Hz" },
        { label: "Spindle Speed", value: "28 / 56 RPM (2-speed)" },
        { label: "Chuck Capacity", value: "1/8\" – 4\" pipe" },
      ],
    },
    {
      category: "Physical",
      rows: [
        { label: "Dimensions (L×W×H)", value: "960 × 560 × 620 mm" },
        { label: "Net Weight", value: "98 kg" },
        { label: "Carriage", value: "Heavy-duty steel with tri-stand" },
        { label: "Coolant Tank", value: "8 L integrated pump" },
      ],
    },
    {
      category: "Compliance",
      rows: [
        { label: "Certification", value: "CE, ISO 9001:2015" },
        { label: "Safety Standard", value: "EN 60745, IEC 62841" },
        { label: "IP Rating", value: "IP55" },
        { label: "Warranty", value: "3 years parts & labor" },
      ],
    },
  ],
  "TT Heavy 800": [
    {
      category: "Threading Capacity",
      rows: [
        { label: "Pipe Size Range", value: "1/8\" – 6\" (DN6 – DN150)" },
        { label: "Thread Standards", value: "BSPT, NPT, G (BSP), Metric, DIN" },
        { label: "Die Head Type", value: "Auto-centering CNC die head" },
        { label: "Thread Length", value: "Up to 150 mm" },
      ],
    },
    {
      category: "Power & Performance",
      rows: [
        { label: "Motor Power", value: "3.0 kW (4 HP)" },
        { label: "Voltage", value: "380V / 415V, 50/60 Hz" },
        { label: "Spindle Speed", value: "16 / 32 RPM (PLC-controlled)" },
        { label: "Chuck Capacity", value: "1/8\" – 6\" pipe" },
      ],
    },
    {
      category: "Physical",
      rows: [
        { label: "Dimensions (L×W×H)", value: "1,280 × 680 × 800 mm" },
        { label: "Net Weight", value: "185 kg" },
        { label: "Frame Material", value: "304 Stainless steel housing" },
        { label: "Coolant Tank", value: "15 L with filtration" },
      ],
    },
    {
      category: "Compliance",
      rows: [
        { label: "Certification", value: "CE, ISO 9001:2015, ATEX Zone 2" },
        { label: "Safety Standard", value: "EN 60745, EN ISO 12100" },
        { label: "IP Rating", value: "IP65" },
        { label: "Warranty", value: "5 years parts & labor" },
      ],
    },
  ],
};

export default function Specifications() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { t } = useLanguage();
  const s = t.specs;

  return (
    <section id="specifications" style={{ backgroundColor: "#1D1D1F", paddingTop: 80, paddingBottom: 80 }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#D70015",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 12,
              fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            }}
          >
            {s.overline}
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 600,
              color: "#FFFFFF",
              fontFamily: "'SF Pro TH', -apple-system, sans-serif",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {s.heading}
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'SF Pro Text', -apple-system, sans-serif",
              lineHeight: 1.6,
            }}
          >
            {s.sub}
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 4,
            backgroundColor: "#272729",
            borderRadius: 12,
            padding: 4,
            marginBottom: 40,
            width: "fit-content",
            margin: "0 auto 40px",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontFamily: "'SF Pro TH', -apple-system, sans-serif",
                fontSize: 15,
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? "#FFFFFF" : "#86868B",
                backgroundColor: activeTab === tab ? "#D70015" : "transparent",
                transition: "all 200ms ease",
                height: 40,
                minWidth: 120,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Spec tables */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {specs[activeTab].map((section) => (
            <div
              key={section.category}
              style={{
                backgroundColor: "#272729",
                borderRadius: 20,
                border: "1px solid #3A3A3C",
                overflow: "hidden",
              }}
            >
              {/* Category header */}
              <div
                style={{
                  padding: "14px 20px",
                  borderBottom: "1px solid #3A3A3C",
                  backgroundColor: "rgba(215,0,21,0.1)",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#D70015",
                    fontFamily: "'SF Pro Text', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {s.catNames[section.category] ?? section.category}
                </span>
              </div>
              {/* Rows */}
              {section.rows.map((row, idx) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 20px",
                    borderBottom: idx < section.rows.length - 1 ? "1px solid #3A3A3C" : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "'SF Pro Text', sans-serif",
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#FFFFFF",
                      fontFamily: "'SF Pro Text', sans-serif",
                      textAlign: "right",
                      maxWidth: "55%",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Download link */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              fontFamily: "'SF Pro Text', sans-serif",
              textDecoration: "none",
              transition: "color 200ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {s.download}
          </a>
        </div>
      </div>
    </section>
  );
}
