"use client";

import LogoLoop from "@/components/home/LogoLoop";

const flagLogos = [
  { src: "/icons/flags/Australia.svg", alt: "Australia" },
  { src: "/icons/flags/Canada.svg", alt: "Canada" },
  { src: "/icons/flags/Denmark.svg", alt: "Denmark" },
  { src: "/icons/flags/Europe.svg", alt: "Europe" },
  { src: "/icons/flags/HongKong.svg", alt: "HongKong" },
  { src: "/icons/flags/Indonesia.svg", alt: "Indonesia" },
  { src: "/icons/flags/Japan.svg", alt: "Japan" },
  { src: "/icons/flags/Malaysia.svg", alt: "Malaysia" },
  { src: "/icons/flags/NewZealand.svg", alt: "NewZealand" },
  { src: "/icons/flags/Norway.svg", alt: "Norway" },
  { src: "/icons/flags/Singapore.svg", alt: "Singapore" },
  { src: "/icons/flags/SouthKorea.svg", alt: "South Korea" },
  { src: "/icons/flags/Switzerland.svg", alt: "Switzerland" },
  { src: "/icons/flags/Thailand.svg", alt: "Thailand" },
  { src: "/icons/flags/UnitedKingdom.svg", alt: "UnitedKingdom" },
  { src: "/icons/flags/UnitedStates.svg", alt: "United States" },
];

export default function LogoLoopSection() {
  return (
    <div
      className="mt-2"
      style={{ height: "200px", position: "relative", overflow: "hidden" }}
    >
      <LogoLoop
        logos={flagLogos}
        speed={150}
        direction="left"
        logoHeight={80}
        gap={20}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Country flags"
      />
    </div>
  );
}
