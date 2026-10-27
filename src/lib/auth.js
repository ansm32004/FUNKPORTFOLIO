import crypto from "crypto";

export const ADMIN_USERNAME = "ansm";
export const ADMIN_PASSWORD = "ansmfx32004";
export const SESSION_COOKIE_NAME = "portfolio_admin_session";

// Secret for signing session tokens
const AUTH_SECRET = process.env.ADMIN_AUTH_SECRET || "ansm-portfolio-secret-key-32004";

/**
 * Validates provided user credentials
 */
export function validateCredentials(username, password) {
  if (!username || !password) return false;
  return username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

/**
 * Generates a signed session token
 */
export function generateSessionToken() {
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
  if (!token || typeof token !== "string") return false;

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
