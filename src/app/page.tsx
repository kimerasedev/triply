import HeroSection from "@/components/home/HeroSection";
import ServiceIntroSection from "@/components/home/ServiceIntroSection";
import ServiceDetailSection from "@/components/home/ServiceDetailSection";
import WorldMapSection from "@/components/home/WorldMapSection";
import LogoLoopSection from "@/components/home/LogoLoopSection";
import CommunitySection from "@/components/home/CommunitySection";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <ServiceIntroSection />
      <ServiceDetailSection />
      <WorldMapSection />
      <LogoLoopSection />
      <CommunitySection />
    </main>
  );
}
