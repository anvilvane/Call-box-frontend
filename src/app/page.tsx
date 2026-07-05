"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { LogoCloudSection } from "@/components/home/LogoCloudSection";
import { PipelineSection } from "@/components/home/PipelineSection";
import { JourneyCardsSection } from "@/components/home/JourneyCardsSection";
import { SolutionsBannerSection } from "@/components/home/SolutionsBannerSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CapabilitiesGridSection } from "@/components/home/CapabilitiesGridSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden bg-black text-white selection:bg-emerald-500/30">

      {/* ── ambient glows (Deepgram-style radial) ── */}
      <div className="pointer-events-none -z-10 absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[520px] w-[900px] rounded-full bg-emerald-600/10 blur-[140px]" />
        <div className="absolute -left-32 top-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
        <div className="absolute -right-32 top-2/3 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
      </div>

      <HeroSection />
      <LogoCloudSection />
      <PipelineSection />
      <JourneyCardsSection />
      <SolutionsBannerSection />
      <TestimonialsSection />
      <CapabilitiesGridSection />
      <FaqSection />
      <FinalCtaSection />
      
    </div>
  );
}
