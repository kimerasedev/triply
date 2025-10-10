import Image from "next/image";
import worldMapUrl from "@/assets/images/world-map.svg";

export default function WorldMapSection() {
  return (
    <section className="w-full bg-primary">
      <div className="relative overflow-hidden text-white px-8 py-20 max-w-6xl mx-auto">
        <div className="mb-3 text-sm">
          {/* TODO: 깜빡이는 애니메이션 추가 */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
            <div className="size-2 rounded-full bg-secondary" />
            추가 지원 국가 준비중
          </div>
        </div>

        <h2 className="text-3xl font-bold">전 세계 주요 18개국 지원</h2>
        <p className="font-light mt-3">
          미국, 일본, 유럽, 동남아까지 — 여행자들이 가장 많이 찾는 18개국 통화를
          지원합니다.
        </p>

        {/* 세계 지도 */}
        {/* TODO: 지도 애니메이션 추가 */}
        <div className="mt-16 flex justify-center">
          <Image
            src={worldMapUrl}
            alt="세계 지도"
            width={860}
            height={380}
            className="w-full max-w-[900px] opacity-90"
            priority
          />
        </div>
      </div>
    </section>
  );
}
