import Image from "next/image";
import bgUrl from "@/assets/images/bg-main.jpg";
import TextType from "@/components/home/TextType";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden rounded-b-4xl">
      <div className="fade-bottom-mask">
        <Image
          src={bgUrl}
          alt="배경 이미지"
          width={1440}
          height={957}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <TextType
          text="예산은 똑똑하게, 한 달 살기는 자유롭게."
          typingSpeed={90}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="font-bold text-6xl text-white drop-shadow-lg"
        />
      </div>
    </section>
  );
}
