import type { Metadata } from "next";
import { headers } from "next/headers";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s — Dashboard | TechThread Pro" },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isLoginPage = pathname === "/dashboard/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F5F7" }}>
      <DashboardSidebar />
      <div style={{ flex: 1, overflow: "auto", minWidth: 0 }}>{children}</div>
    </div>
  );
}
