"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);
  const usernameRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || retryAfter > 0) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
        credentials: "same-origin",
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          const wait = parseInt(res.headers.get("Retry-After") ?? "60", 10);
          setRetryAfter(wait);
          const interval = setInterval(() => {
            setRetryAfter((prev) => {
              if (prev <= 1) { clearInterval(interval); return 0; }
              return prev - 1;
            });
          }, 1000);
        }
        setError(data.error ?? "Login failed. Please try again.");
        setPassword("");
        usernameRef.current?.focus();
        return;
      }

      const from = searchParams.get("from") ?? "/dashboard";
      router.replace(from.startsWith("/dashboard") ? from : "/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 400,
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{
            width: 56,
            height: 56,
            backgroundColor: "#D70015",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="8" width="14" height="4" rx="2" fill="white" />
            <rect x="7" y="3" width="6" height="14" rx="2" fill="white" opacity="0.6" />
          </svg>
        </div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#FFFFFF",
            fontFamily: "'SF Pro TH', -apple-system, sans-serif",
            marginBottom: 6,
          }}
        >
          TechThread Pro
        </h1>
        <p style={{ fontSize: 14, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
          Sign in to Dashboard
        </p>
      </div>

      {/* Card */}
      <div
        style={{
          backgroundColor: "#1D1D1F",
          border: "1px solid #272729",
          borderRadius: 24,
          padding: "32px 28px",
          boxShadow: "0px 16px 48px rgba(0,0,0,0.5)",
        }}
      >
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Error */}
          {error && (
            <div
              role="alert"
              aria-live="polite"
              style={{
                backgroundColor: "rgba(215,0,21,0.12)",
                border: "1px solid rgba(215,0,21,0.3)",
                borderRadius: 10,
                padding: "12px 16px",
                fontSize: 14,
                color: "#FF6B6B",
                fontFamily: "'SF Pro Text', sans-serif",
                display: "flex",
                gap: 8,
                alignItems: "flex-start",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="8" cy="8" r="7" stroke="#FF6B6B" strokeWidth="1.5" />
                <path d="M8 5v4M8 11v.5" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {error}
              {retryAfter > 0 && (
                <span style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>{retryAfter}s</span>
              )}
            </div>
          )}

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              style={{ display: "block", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)", marginBottom: 8, fontFamily: "'SF Pro Text', sans-serif" }}
            >
              Username
            </label>
            <input
              id="username"
              ref={usernameRef}
              type="text"
              autoComplete="username"
              autoFocus
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading || retryAfter > 0}
              placeholder="admin"
              style={{
                width: "100%",
                height: 44,
                backgroundColor: "#272729",
                border: "1px solid #3A3A3C",
                borderRadius: 10,
                padding: "0 16px",
                fontSize: 15,
                color: "#FFFFFF",
                fontFamily: "'SF Pro Text', sans-serif",
                outline: "none",
                transition: "border 200ms ease, box-shadow 200ms ease",
              }}
              onFocus={(e) => {
                e.target.style.border = "1.5px solid #D70015";
                e.target.style.boxShadow = "0 0 0 3px rgba(215,0,21,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid #3A3A3C";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              style={{ display: "block", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)", marginBottom: 8, fontFamily: "'SF Pro Text', sans-serif" }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || retryAfter > 0}
                placeholder="••••••••••"
                style={{
                  width: "100%",
                  height: 44,
                  backgroundColor: "#272729",
                  border: "1px solid #3A3A3C",
                  borderRadius: 10,
                  padding: "0 44px 0 16px",
                  fontSize: 15,
                  color: "#FFFFFF",
                  fontFamily: "'SF Pro Text', sans-serif",
                  outline: "none",
                  transition: "border 200ms ease, box-shadow 200ms ease",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1.5px solid #D70015";
                  e.target.style.boxShadow = "0 0 0 3px rgba(215,0,21,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid #3A3A3C";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: 44,
                  width: 44,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#86868B",
                }}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 2l14 14M7.4 7.5A2 2 0 009 11a2 2 0 001.5-.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M5.2 5.3C3.6 6.3 2.4 7.6 1.5 9c1.4 2.5 4.2 5 7.5 5 1.4 0 2.7-.4 3.8-1M8.1 3.1c.3 0 .6 0 .9 0 3.3 0 6.1 2.5 7.5 5-.5 1-1.2 1.9-2 2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <ellipse cx="9" cy="9" rx="7.5" ry="5" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || retryAfter > 0 || !username || !password}
            style={{
              height: 46,
              backgroundColor: loading || retryAfter > 0 ? "#3A3A3C" : "#D70015",
              color: loading || retryAfter > 0 ? "#86868B" : "#FFFFFF",
              border: "none",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 400,
              fontFamily: "'SF Pro Text', sans-serif",
              cursor: loading || retryAfter > 0 ? "not-allowed" : "pointer",
              transition: "background-color 200ms ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 4,
            }}
          >
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="25 13" />
                </svg>
                Signing in…
              </>
            ) : retryAfter > 0 ? (
              `Locked — retry in ${retryAfter}s`
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>

      <p style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
        Default credentials are set in <code style={{ color: "#D70015" }}>.env.local</code>
      </p>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
