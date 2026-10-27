import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, validateSessionToken } from "@/lib/auth";
import { getVisibility } from "@/lib/visibility";
import CaseStudyGate from "@/components/CaseStudyGate";
import VammyCaseStudy from "@/components/VammyCaseStudy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Vammy — The Finance Buddy UX Case Study",
  description: "A comprehensive UX case study and financial tracking mobile application design.",
};

export default async function VammyShortcutPage() {
  const cookieStore = await cookies();
  const isAdmin = Boolean(validateSessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value));
  const visibility = await getVisibility();
  const isVisible = visibility["vammy"] !== false;

  return (
    <CaseStudyGate
      slug="vammy"
      title="Vammy — The Finance Buddy"
      isVisible={isVisible}
      isAdmin={isAdmin}
    >
      <VammyCaseStudy />
    </CaseStudyGate>
  );
}
