import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, validateSessionToken } from "@/lib/auth";
import {
  getVisibility,
  saveVisibility,
  setCaseStudyVisibility,
} from "@/lib/visibility";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    const isAdmin = Boolean(validateSessionToken(sessionCookie?.value));

    const visibility = await getVisibility();

    return Response.json({
      success: true,
      visibility,
      isAdmin,
    });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message || "Failed to load visibility" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // 1. Verify admin authorization
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    const isAdmin = Boolean(validateSessionToken(sessionCookie?.value));

    if (!isAdmin) {
      return Response.json(
        { success: false, error: "Unauthorized. Admin credentials required." },
        { status: 401 }
      );
    }

    // 2. Parse request payload
    const body = await request.json();
    const { slug, visible, visibility: newVisibilityMap } = body || {};

    let updatedVisibility;

    if (slug !== undefined && visible !== undefined) {
      updatedVisibility = await setCaseStudyVisibility(slug, visible);
    } else if (newVisibilityMap && typeof newVisibilityMap === "object") {
      const current = await getVisibility();
      updatedVisibility = { ...current, ...newVisibilityMap };
      await saveVisibility(updatedVisibility);
    } else {
      return Response.json(
        { success: false, error: "Invalid payload. Provide slug and visible boolean." },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      visibility: updatedVisibility,
      message: "Visibility updated successfully",
    });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message || "Failed to update visibility" },
      { status: 500 }
    );
  }
}

