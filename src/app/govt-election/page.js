import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, validateSessionToken } from "@/lib/auth";
import { getVisibility } from "@/lib/visibility";
import CaseStudyGate from "@/components/CaseStudyGate";
import GovtElectionCaseStudy from "@/components/GovtElectionCaseStudy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Govt Election Event Reporting Case Study | Product UX & GIS Dashboard",
  description:
    "A UX case study on building a scalable, geospatial heatmap dashboard for verifying field report authenticity and outside-boundary submission activity across 4 administrative tiers.",
};

export default async function GovtElectionShortcutPage() {
  const cookieStore = await cookies();
  const isAdmin = Boolean(validateSessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value));
  const visibility = await getVisibility();
  const isVisible = visibility["govt-election"] !== false;

  return (
    <CaseStudyGate
      slug="govt-election"
      title="Govt Election Event Reporting"
      isVisible={isVisible}
      isAdmin={isAdmin}
    >
      <GovtElectionCaseStudy />
    </CaseStudyGate>
  );
}
