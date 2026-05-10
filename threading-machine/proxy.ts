import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "tt_session";

// ── Edge-compatible HMAC verify ───────────────────────────────────────────────

async function verifyTokenEdge(token: string): Promise<boolean> {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return false;

    const payload = token.slice(0, dot);
    const sigB64 = token.slice(dot + 1);

    const secret = process.env.SESSION_SECRET ?? "dev-secret";
    const enc = new TextEncoder();

    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // base64url → Uint8Array
    const b64 = sigB64.replace(/-/g, "+").replace(/_/g, "/");
    const sig = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

    const valid = await crypto.subtle.verify("HMAC", key, sig, enc.encode(payload));
    if (!valid) return false;

    // Check expiry
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const data = JSON.parse(decoded);
    return typeof data.exp === "number" && Date.now() < data.exp;
  } catch {
    return false;
  }
}

// ── Proxy (Next.js 16) ───────────────────────────────────────────────────

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Forward pathname to server components via header
  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("x-pathname", pathname);

  // ── Dashboard auth guard ──────────────────────────────────────────────────
  if (
    pathname.startsWith("/dashboard") &&
    pathname !== "/dashboard/login"
  ) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const valid = token ? await verifyTokenEdge(token) : false;

    if (!valid) {
      const loginUrl = new URL("/dashboard/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const res = NextResponse.redirect(loginUrl);
      // Clear stale cookie if present
      if (token) res.cookies.delete(SESSION_COOKIE);
      return res;
    }
  }

  // ── API route: block login page if already authenticated ─────────────────
  if (pathname === "/dashboard/login") {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (token && (await verifyTokenEdge(token))) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next({ request: { headers: reqHeaders } });
}

export const config = {
  matcher: [
    // Match all paths except static files, _next internals, and API
    "/((?!_next/static|_next/image|favicon.ico|public/|api/upload).*)",
  ],
};
