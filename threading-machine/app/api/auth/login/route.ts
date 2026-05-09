import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, verifyPassword, SESSION_COOKIE, SESSION_DURATION_MS } from "@/lib/auth";

// ── In-memory rate limiter ────────────────────────────────────────────────────
// key: IP address, value: { attempts, lockedUntil }
const rateLimitMap = new Map<string, { attempts: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCK_MS = 15 * 60 * 1000;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (entry) {
    if (entry.lockedUntil > now) {
      return { allowed: false, retryAfter: Math.ceil((entry.lockedUntil - now) / 1000) };
    }
    // Reset window if expired
    if (now - entry.lockedUntil > WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
  return { allowed: true, retryAfter: 0 };
}

function recordFailure(ip: string): void {
  const entry = rateLimitMap.get(ip) ?? { attempts: 0, lockedUntil: 0 };
  entry.attempts++;
  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.lockedUntil = Date.now() + LOCK_MS;
  }
  rateLimitMap.set(ip, entry);
}

function clearFailures(ip: string): void {
  rateLimitMap.delete(ip);
}

// Cleanup old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (entry.lockedUntil < now - WINDOW_MS) rateLimitMap.delete(ip);
  }
}, 60 * 60 * 1000);

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed, retryAfter } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: `Too many login attempts. Try again in ${retryAfter} seconds.` },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(MAX_ATTEMPTS),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { username = "", password = "" } = body;

  // Sanitize inputs
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.length > 64 ||
    password.length > 128
  ) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
  }

  const adminUsername = process.env.ADMIN_USERNAME ?? "admin";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";

  const usernameMatch = username.trim() === adminUsername;
  const passwordMatch = verifyPassword(password, adminPassword);

  if (!usernameMatch || !passwordMatch) {
    recordFailure(ip);
    // Generic message — don't reveal which field is wrong
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  clearFailures(ip);
  const token = createSessionToken(username.trim());

  const isProduction = process.env.NODE_ENV === "production";
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
  return res;
}
