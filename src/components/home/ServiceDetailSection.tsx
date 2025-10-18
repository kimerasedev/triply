import Image from "next/image";
import ServiceDetailItem from "./ServiceDetailItem";
import plannerUrl from "@/assets/images/planner.svg";
import exchangeUrl from "@/assets/images/exchange.svg";
import saveUrl from "@/assets/images/save.svg";

export default function ServiceDetailSection() {
  return (
    <section className="bg-[#F1F5F7] w-full px-44 py-30">
      <section className="flex items-center justify-between mb-24">
        <ServiceDetailItem
          order="01"
          title={`여행 예산 설계,
                  더 이상 어렵지 않아요.`}
          description="숙소, 식비, 교통비 등 카테고리별로 입력하거나 추천 예산으로 빠르게 계획할 수 있어요."
        />
        <Image
          src={plannerUrl}
          alt="플래너 이미지"
          width={400}
          className="rounded-2xl"
        />
      </section>

      <section className="flex items-center justify-between mb-24">
        <Image
          src={exchangeUrl}
          alt="환율 이미지"
          width={400}
          className="rounded-2xl"
        />
        <ServiceDetailItem
          order="02"
          title="실시간에 가까운 기준환율로, 더 정확하게."
          description="매일 갱신되는 최신 기준환율을 바탕으로 여행 경비를 자동으로 환산해드려요."
        />
      </section>

      <section className="flex items-center justify-between">
        <ServiceDetailItem
          order="03"
          title={`내 플랜 저장,
                  언제든 이어서 계획`}
          description="여행 예산을 브라우저에 저장해두고 나중에 다시 불러올 수 있어요."
        />
        <Image
          src={saveUrl}
          alt="저장 이미지"
          width={400}
          className="rounded-2xl"
        />
      </section>
    </section>
  );
}
