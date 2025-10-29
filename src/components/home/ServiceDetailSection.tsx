import Image from "next/image";
import ServiceDetailItem from "./ServiceDetailItem";
import plannerUrl from "@/assets/images/planner.svg";
import exchangeUrl from "@/assets/images/exchange.svg";
import saveUrl from "@/assets/images/save.svg";

export default function ServiceDetailSection() {
  return (
    <section className="w-full bg-[#F1F5F7]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-20 py-16 lg:py-20">
        {/* 01 */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2 items-center
            gap-10 md:gap-12 lg:gap-14 xl:gap-16
          "
        >
          <ServiceDetailItem
            order="01"
            title={`여행 예산 설계,
                    더 이상 어렵지 않아요.`}
            description={`숙소, 식비, 교통비 등 카테고리별로 입력하거나
                          추천 예산으로 빠르게 계획할 수 있어요.`}
          />
          <div className="flex justify-center lg:justify-end">
            <Image
              src={plannerUrl}
              alt="플래너 이미지"
              width={440}
              className="rounded-2xl w-full max-w-[420px] md:max-w-[440px] h-auto"
              priority
            />
          </div>
        </div>

        {/* 구분 간격 */}
        <div className="h-12 md:h-16" />

        {/* 02 (이미지-텍스트 순서 반대로) */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2 items-center
            gap-10 md:gap-12 lg:gap-14 xl:gap-16
          "
        >
          <div className="order-1 lg:order-none flex justify-center lg:justify-start">
            <Image
              src={exchangeUrl}
              alt="환율 이미지"
              width={440}
              className="rounded-2xl w-full max-w-[420px] md:max-w-[440px] h-auto"
            />
          </div>
          <ServiceDetailItem
            order="02"
            title={`실시간에 가까운 기준환율로,
                    더 정확하게`}
            description={`매일 갱신되는 최신 기준환율을 바탕으로 여행 경비를 자동으로
                          환산해드려요.`}
          />
        </div>

        {/* 구분 간격 */}
        <div className="h-12 md:h-16" />

        {/* 03 */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2 items-center
            gap-10 md:gap-12 lg:gap-14 xl:gap-16
          "
        >
          <ServiceDetailItem
            order="03"
            title={`내 플랜 저장,
                    언제든 이어서 계획`}
            description="여행 예산을 브라우저에 저장해두고 나중에 다시 불러올 수 있어요."
          />
          <div className="flex justify-center lg:justify-end">
            <Image
              src={saveUrl}
              alt="저장 이미지"
              width={440}
              className="rounded-2xl w-full max-w-[420px] md:max-w-[440px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
