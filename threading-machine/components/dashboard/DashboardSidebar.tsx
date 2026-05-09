"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="1" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="1" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="10" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="10" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/dashboard/products",
    label: "Products",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 5V4a4 4 0 018 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="10.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "/dashboard/products/add",
    label: "Add Product",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 5v8M5 9h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/",
    label: "View Site",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M7 3H3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 1h6v6M17 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
    router.replace("/dashboard/login");
    router.refresh();
  }

  return (
    <aside
      style={{
        width: 240,
        backgroundColor: "#1D1D1F",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        padding: "24px 0",
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #272729" }}>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, backgroundColor: "#D70015", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="8" width="14" height="4" rx="2" fill="white" />
                <rect x="7" y="3" width="6" height="14" rx="2" fill="white" opacity="0.6" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", fontFamily: "'SF Pro TH', sans-serif" }}>TechThread</div>
              <div style={{ fontSize: 11, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>Admin Dashboard</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        {navItems.map((item) => {
          const isActive = item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 8,
                textDecoration: "none",
                backgroundColor: isActive ? "#D70015" : "transparent",
                color: isActive ? "#FFFFFF" : "#86868B",
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                fontFamily: "'SF Pro TH', sans-serif",
                transition: "background-color 200ms ease, color 200ms ease",
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #272729" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, backgroundColor: "#272729", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="6" r="3" stroke="#86868B" strokeWidth="1.5" />
              <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#86868B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#FFFFFF", fontFamily: "'SF Pro TH', sans-serif" }}>Admin</div>
            <div style={{ fontSize: 11, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>admin@techthread.co.th</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 12px",
            borderRadius: 8,
            border: "1px solid #3A3A3C",
            background: "transparent",
            color: "#86868B",
            fontSize: 13,
            fontFamily: "'SF Pro TH', sans-serif",
            cursor: "pointer",
            transition: "color 200ms ease, border-color 200ms ease",
          }}
          onMouseEnter={(e) => { const el = e.currentTarget; el.style.color = "#FF6B6B"; el.style.borderColor = "#D70015"; }}
          onMouseLeave={(e) => { const el = e.currentTarget; el.style.color = "#86868B"; el.style.borderColor = "#3A3A3C"; }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M6 2H2.5A1.5 1.5 0 001 3.5v8A1.5 1.5 0 002.5 13H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M10 10l3-2.5L10 5M13 7.5H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
