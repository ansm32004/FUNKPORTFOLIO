import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, validateSessionToken } from "@/lib/auth";
import { getVisibility } from "@/lib/visibility";
import CaseStudyGate from "@/components/CaseStudyGate";
import EmployeeDashCaseStudy from "@/components/EmployeeDashCaseStudy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Employee Dash — Designing a Connected Employee Growth Experience",
  description:
    "A self-initiated UX/UI product design case study bringing professional development, learning, assessments, coaching, and AI-assisted reflection into one coherent employee workspace.",
};

export default async function EmployeeDashShortcutPage() {
  const cookieStore = await cookies();
  const isAdmin = Boolean(validateSessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value));
  const visibility = await getVisibility();
  const isVisible = visibility["employee-dash"] !== false;

  return (
    <CaseStudyGate
      slug="employee-dash"
      title="Employee Dash — Unified Growth"
      isVisible={isVisible}
      isAdmin={isAdmin}
    >
      <EmployeeDashCaseStudy />
    </CaseStudyGate>
  );
}
