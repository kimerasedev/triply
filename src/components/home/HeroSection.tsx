import Image from "next/image";
import bgUrl from "@/assets/images/bg-main.jpg";
import TextType from "@/components/home/TextType";
import "./HeroSection.css";

export default function HeroSection() {
  const line1 = "예산은 똑똑하게,";
  const line2 = "한 달 살기는 자유롭게.";
  const typingSpeed = 90; // ms per char
  const gap = 300; // 1줄 끝나고 잠깐 쉬는 시간(ms)
  const delay2 = line1.length * typingSpeed + gap;

  return (
    <section
      className="relative w-full overflow-hidden rounded-b-4xl
      min-h-[420px] sm:min-h-[520px] md:min-h-[640px] lg:min-h-[720px]"
    >
      <div className="fade-bottom-mask">
        <Image
          src={bgUrl}
          alt="배경 이미지"
          width={1440}
          height={957}
          className="w-full h-full object-cover"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
        {/* 배경 오버레이 */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.10))]" />
      </div>

      <div
        className="
    absolute inset-0 z-10 flex flex-col items-center justify-start text-center
    pt-[10%] sm:pt-[12%] md:pt-[14%] lg:pt-[15%] xl:pt-[16%]
    px-4 sm:px-6
  "
      >
        {/* 1줄: 쓰고 유지 (지우지 않음) */}
        <TextType
          text={line1}
          typingSpeed={typingSpeed}
          loop={false}
          showCursor={false}
          className="
            font-bold text-white leading-snug
            [text-shadow:_0_4px_20px_rgba(0,0,0,0.2)]
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] 2xl:text-[80px]
          "
        />
        <TextType
          text={line2}
          typingSpeed={typingSpeed}
          initialDelay={delay2}
          loop={false}
          showCursor={false}
          className="
            mt-2 sm:mt-3
            font-bold text-white leading-snug
            [text-shadow:_0_4px_20px_rgba(0,0,0,0.2)]
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] 2xl:text-[80px]
          "
        />
      </div>
    </section>
  );
}
