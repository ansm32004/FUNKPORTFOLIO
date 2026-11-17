import crypto from "crypto";

// Credentials and signing secret come from the environment (.env.local locally,
// project settings in production). Nothing secret lives in the source.
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const AUTH_SECRET = process.env.ADMIN_AUTH_SECRET || "";
export const SESSION_COOKIE_NAME = "portfolio_admin_session";

const isConfigured = () => Boolean(ADMIN_USERNAME && ADMIN_PASSWORD && AUTH_SECRET);

// Constant-time string comparison (hash first so lengths always match).
function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

/**
 * Validates provided user credentials. Fails closed if env vars are missing.
 */
export function validateCredentials(username, password) {
  if (!isConfigured() || !username || !password) return false;
  const userOk = safeEqual(username.trim(), ADMIN_USERNAME);
  const passOk = safeEqual(password, ADMIN_PASSWORD);
  return userOk && passOk;
}

/**
 * Generates a signed session token
 */
export function generateSessionToken() {
  if (!isConfigured()) throw new Error("Admin auth is not configured");
  const timestamp = Date.now();
  const payload = `${ADMIN_USERNAME}:${timestamp}`;
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payload)
    .digest("hex");
  return `${payload}:${signature}`;
}

/**
 * Validates a session token signature and expiration (7 days)
 */
export function validateSessionToken(token) {
  if (!isConfigured() || !token || typeof token !== "string") return false;

  const parts = token.split(":");
  if (parts.length !== 3) return false;

  const [username, timestampStr, signature] = parts;
  if (username !== ADMIN_USERNAME) return false;
  if (!signature || signature.length !== 64 || !/^[0-9a-fA-F]{64}$/.test(signature)) {
    return false;
  }

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // 7 days expiration (7 * 24 * 60 * 60 * 1000 ms)
  const maxAge = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > maxAge) return false;

  const payload = `${username}:${timestampStr}`;
  const expectedSignature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payload)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}
