import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, validateSessionToken } from "@/lib/auth";
import { getVisibility } from "@/lib/visibility";
import SmoothScroll from "@/components/SmoothScroll";
import HeroSection from "@/components/HeroSection";
import SelectedWork from "@/components/SelectedWork";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillsSection from "@/components/SkillsSection";
import Philosophy from "@/components/Philosophy";
import PhotographyGallery from "@/components/PhotographyGallery";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const cookieStore = await cookies();
  const isAdmin = Boolean(validateSessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value));
  const visibility = await getVisibility();

  return (
    <SmoothScroll>
      <main className="relative min-h-screen w-full bg-[#122B1E] text-slate-900 overflow-x-hidden m-0 p-0">
        {/* Floating Right Side Navigation Dock */}
        <SideNav />

        {/* Full-Bleed Hero Section with Integrated Header & 3D Scroll Perspective */}
        <HeroSection />

        {/* Selected Work Portfolio Showcase */}
        <SelectedWork initialVisibility={visibility} isAdmin={isAdmin} />

        {/* Motion Design Software Timeline Experience Section (All 8 Roles) */}
        <ExperienceTimeline />

        {/* Standalone Interactive Synthesizer Skill Deck (Audio-Visual Control Deck) */}
        <SkillsSection />

        {/* Work Process Section */}
        <Philosophy />

        {/* Digital Viewfinder & 35mm Film Contact Sheet Photography Showcase */}
        <PhotographyGallery />

        {/* Client & Peer Endorsements & Interactive Review Form */}
        <ReviewSection />

        {/* Footer & Contact */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
