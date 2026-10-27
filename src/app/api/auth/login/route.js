import { cookies } from "next/headers";
import {
  validateCredentials,
  generateSessionToken,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};

    if (!validateCredentials(username, password)) {
      return Response.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = generateSessionToken();
    const cookieStore = await cookies();

    // Set secure HTTP-only session cookie (7 days)
    cookieStore.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return Response.json({
      success: true,
      user: "ansm",
      message: "Authentication successful",
    });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message || "Login failed" },
      { status: 500 }
    );
  }
}

