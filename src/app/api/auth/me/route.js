import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, validateSessionToken } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    const isAuthenticated = validateSessionToken(sessionCookie?.value);

    return Response.json({
      authenticated: Boolean(isAuthenticated),
      user: isAuthenticated ? "ansm" : null,
    });
  } catch (err) {
    return Response.json(
      { authenticated: false, user: null, error: err.message },
      { status: 500 }
    );
  }
}

