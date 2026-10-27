import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE_NAME, validateSessionToken } from "@/lib/auth";
import {
  getVisibility,
  saveVisibility,
  setCaseStudyVisibility,
} from "@/lib/visibility";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    const isAdmin = Boolean(validateSessionToken(sessionCookie?.value));

    const visibility = await getVisibility();

    return new Response(
      JSON.stringify({
        success: true,
        visibility,
        isAdmin,
      }),
      { status: 200, headers: NO_CACHE_HEADERS }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Failed to load visibility" }),
      { status: 500, headers: NO_CACHE_HEADERS }
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
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized. Admin credentials required." }),
        { status: 401, headers: NO_CACHE_HEADERS }
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
      return new Response(
        JSON.stringify({ success: false, error: "Invalid payload. Provide slug and visible boolean." }),
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    // 3. Purge Next.js Server Component caches so all pages show updated visibility immediately
    try {
      revalidatePath("/", "page");
      revalidatePath("/admin", "page");
      revalidatePath("/case-study/employee-dash", "page");
      revalidatePath("/case-study/govt-election", "page");
      revalidatePath("/case-study/vammy", "page");
    } catch {
      // Ignore cache revalidation errors if outside request context
    }

    return new Response(
      JSON.stringify({
        success: true,
        visibility: updatedVisibility,
        message: "Visibility updated successfully",
      }),
      { status: 200, headers: NO_CACHE_HEADERS }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Failed to update visibility" }),
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
