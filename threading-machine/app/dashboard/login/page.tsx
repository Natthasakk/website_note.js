import type { Metadata } from "next";
import LoginForm from "@/components/dashboard/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — Dashboard | TechThread Pro",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(215,0,21,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <LoginForm />
    </div>
  );
}
