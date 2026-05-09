"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { LINE_URL } from "@/lib/i18n";

const productHrefs = ["/products/pro-300", "/products/industrial-500", "/products/heavy-800", "/products", "/products#accessories"];
const supportHrefs = ["/contact", "/contact#parts", "/contact#training", "/#specifications", "#"];
const companyHrefs = ["#", "#", "#", "#", "#"];

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  const groups = [
    { title: f.grpProducts, links: f.productLinks, hrefs: productHrefs },
    { title: f.grpSupport, links: f.supportLinks, hrefs: supportHrefs },
    { title: f.grpCompany, links: f.companyLinks, hrefs: companyHrefs },
  ];

  return (
    <footer style={{ backgroundColor: "#000000", color: "#FFFFFF", paddingTop: 64, paddingBottom: 40 }}>
      <div className="section-container">
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 40,
            marginBottom: 56,
            paddingBottom: 56,
            borderBottom: "1px solid #272729",
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, backgroundColor: "#D70015", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="8" width="14" height="4" rx="2" fill="white" />
                  <rect x="7" y="3" width="6" height="14" rx="2" fill="white" opacity="0.6" />
                </svg>
              </div>
              <span style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF", fontFamily: "'SF Pro TH', sans-serif" }}>
                TechThread Pro
              </span>
            </Link>
            <p style={{ fontSize: 14, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", lineHeight: 1.6, marginBottom: 20, maxWidth: 220 }}>
              {f.tagline}
            </p>

            {/* LINE button */}
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#06C755",
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'SF Pro Text', sans-serif",
                padding: "8px 16px",
                borderRadius: 8,
                textDecoration: "none",
                marginBottom: 20,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.771.038 1.087l-.164 1.026c-.045.303-.24 1.192 1.049.649 1.291-.542 6.916-4.072 9.437-6.977C23.176 14.393 24 12.458 24 10.304"/>
              </svg>
              {f.lineLabel}
            </a>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 12 }}>
              {["linkedin", "youtube", "facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{ width: 36, height: 36, backgroundColor: "#1D1D1F", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#86868B", transition: "background-color 200ms ease, color 200ms ease", textDecoration: "none" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "#272729"; el.style.color = "#FFFFFF"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "#1D1D1F"; el.style.color = "#86868B"; }}
                  aria-label={social}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {groups.map((group) => (
            <div key={group.title}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {group.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {group.links.map((label, i) => (
                  <li key={i}>
                    <Link
                      href={group.hrefs[i] ?? "#"}
                      style={{ fontSize: 14, color: "#86868B", textDecoration: "none", fontFamily: "'SF Pro Text', sans-serif", transition: "color 200ms ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#86868B"; }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {f.grpContact}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "📞", text: "+66 2 123 4567" },
                { icon: "✉️", text: "sales@techthread.co.th" },
                { icon: "📍", text: "123 Industrial Estate, Bangkok 10110" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 14 }}>{item.icon}</span>
                  <span style={{ fontSize: 14, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 12, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
            {f.copyright}
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {f.legal.map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontSize: 12, color: "#86868B", textDecoration: "none", fontFamily: "'SF Pro Text', sans-serif", transition: "color 200ms ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#86868B"; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
