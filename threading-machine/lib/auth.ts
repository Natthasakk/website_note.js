import crypto from "node:crypto";

const SESSION_COOKIE = "tt_session";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours
const KDF_SALT = "techthread-kdf-v1"; // fixed salt for password KDF
const KDF_LEN = 32;

// ── Token ────────────────────────────────────────────────────────────────────

export function createSessionToken(username: string): string {
  const secret = process.env.SESSION_SECRET ?? "dev-secret";
  const payload = Buffer.from(
    JSON.stringify({ sub: username, exp: Date.now() + SESSION_DURATION_MS })
  ).toString("base64url");
  const sig = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

/** Returns username or null if token is invalid/expired. */
export function verifySessionToken(token: string): string | null {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return null;
    const payload = token.slice(0, dot);
    const sig = token.slice(dot + 1);

    const secret = process.env.SESSION_SECRET ?? "dev-secret";
    const expected = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("base64url");

    // constant-time comparison
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)))
      return null;

    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.exp !== "number" || Date.now() > data.exp) return null;

    return data.sub as string;
  } catch {
    return null;
  }
}

// ── Password ─────────────────────────────────────────────────────────────────

/** Derives a fixed-length key from a password using scrypt (slow by design). */
function deriveKey(password: string): Buffer {
  return crypto.scryptSync(password, KDF_SALT, KDF_LEN) as Buffer;
}

export function verifyPassword(input: string, stored: string): boolean {
  try {
    const inputKey = deriveKey(input);
    const storedKey = deriveKey(stored);
    return crypto.timingSafeEqual(inputKey, storedKey);
  } catch {
    return false;
  }
}

// ── Cookie helpers ────────────────────────────────────────────────────────────

export { SESSION_COOKIE, SESSION_DURATION_MS };

export function buildCookieOptions(maxAge = SESSION_DURATION_MS / 1000): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${SESSION_COOKIE}={VALUE}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure}`;
}
