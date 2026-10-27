import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);

    return Response.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message || "Logout failed" },
      { status: 500 }
    );
  }
}

