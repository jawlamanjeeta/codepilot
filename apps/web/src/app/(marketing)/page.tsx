
import { HeroWireframe } from "@/components/hero-wireframe";
import { PlatformMarquee } from "@/components/platform-marquee";
import { DashboardPreview } from "@/components/dashboard-preview";
import { HowItWorks } from "@/components/how-it-works";
import { InterviewReadiness } from "@/components/interview-readiness";
import { FinalCtaBand } from "@/components/final-cta-band";
import { SiteFooter } from "@/components/site-footer";

export default function MarketingPage() {
  return (
    <>
      <HeroWireframe />
      <PlatformMarquee />
      <DashboardPreview />
      <HowItWorks />
      <InterviewReadiness />
      <FinalCtaBand />
      <SiteFooter />
    </>
  );
}