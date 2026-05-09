"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/i18n";
import { LINE_URL } from "@/lib/i18n";

const navLinkKeys: { href: string; key: keyof ReturnType<typeof useLanguage>["t"]["nav"] }[] = [
  { href: "/", key: "home" },
  { href: "/products", key: "products" },
  { href: "/contact", key: "contact" },
];

function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #E8E8ED",
        borderRadius: 8,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {(["th", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            padding: "6px 10px",
            border: "none",
            background: lang === l ? "#D70015" : "transparent",
            color: lang === l ? "#FFFFFF" : "#86868B",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "'SF Pro Text', sans-serif",
            textTransform: "uppercase",
            transition: "background 150ms ease, color 150ms ease",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav
      style={{
        backgroundColor: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #E8E8ED",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="section-container">
        <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Left: hamburger (mobile) + logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Hamburger — visible only on mobile, now on the LEFT */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 40,
                height: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 8,
                flexShrink: 0,
              }}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              <span style={{ width: 22, height: 2, backgroundColor: "#1D1D1F", borderRadius: 1, display: "block", transition: "all 200ms ease", transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ width: 22, height: 2, backgroundColor: "#1D1D1F", borderRadius: 1, display: "block", transition: "all 200ms ease", opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ width: 22, height: 2, backgroundColor: "#1D1D1F", borderRadius: 1, display: "block", transition: "all 200ms ease", transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>

            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: "#D70015",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="8" width="14" height="4" rx="2" fill="white" />
                    <rect x="7" y="3" width="6" height="14" rx="2" fill="white" opacity="0.6" />
                  </svg>
                </div>
                <span style={{ fontSize: 17, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', -apple-system, sans-serif", letterSpacing: 0 }}>
                  TechThread
                </span>
                <span style={{ fontSize: 17, fontWeight: 300, color: "#86868B", fontFamily: "'SF Pro Text', -apple-system, sans-serif" }}>
                  Pro
                </span>
              </div>
            </Link>
          </div>

          {/* Center: desktop nav links */}
          <div style={{ alignItems: "center", gap: 4 }} className="hidden md:flex">
            {navLinkKeys.map(({ href, key }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#D70015" : "#1D1D1F",
                    fontFamily: "'SF Pro TH', -apple-system, sans-serif",
                    padding: "8px 12px",
                    borderRadius: 8,
                    textDecoration: "none",
                    transition: "background-color 200ms ease, color 200ms ease",
                    borderBottom: isActive ? "2px solid #D70015" : "2px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.backgroundColor = "#F5F5F7";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  {t.nav[key]}
                </Link>
              );
            })}
          </div>

          {/* Right: lang toggle + LINE + Get a Quote (desktop) */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LangToggle />
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                backgroundColor: "#06C755",
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "'SF Pro Text', sans-serif",
                padding: "0 12px",
                height: 36,
                borderRadius: 8,
                textDecoration: "none",
                flexShrink: 0,
              }}
              aria-label="LINE Official"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.771.038 1.087l-.164 1.026c-.045.303-.24 1.192 1.049.649 1.291-.542 6.916-4.072 9.437-6.977C23.176 14.393 24 12.458 24 10.304"/>
              </svg>
              {t.nav.line}
            </a>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden md:inline-flex"
              style={{ fontSize: 14, height: 36, padding: "8px 16px", textDecoration: "none" }}
            >
              {t.nav.getQuote}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{ borderTop: "1px solid #E8E8ED", backgroundColor: "rgba(255,255,255,0.96)", padding: "16px 0" }}
          className="md:hidden"
        >
          <div className="section-container">
            {navLinkKeys.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  fontSize: 17,
                  fontWeight: 400,
                  color: "#1D1D1F",
                  textDecoration: "none",
                  borderBottom: "1px solid #E8E8ED",
                  fontFamily: "'SF Pro TH', -apple-system, sans-serif",
                }}
              >
                {t.nav[key]}
              </Link>
            ))}
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ marginTop: 16, width: "100%", justifyContent: "center", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
              onClick={() => setMobileOpen(false)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.771.038 1.087l-.164 1.026c-.045.303-.24 1.192 1.049.649 1.291-.542 6.916-4.072 9.437-6.977C23.176 14.393 24 12.458 24 10.304"/>
              </svg>
              {t.nav.getQuote}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
