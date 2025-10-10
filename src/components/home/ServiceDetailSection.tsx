import Image from "next/image";
import ServiceDetailItem from "./ServiceDetailItem";
import imgUrl from "@/assets/images/img.png";

export default function ServiceDetailSection() {
  return (
    <section className="bg-[#F1F5F7] w-full px-10 py-50">
      <section className="flex items-center justify-center gap-30 mb-30">
        <ServiceDetailItem
          order="01"
          title={`여행 예산 설계,
                  더 이상 어렵지 않아요.`}
          description="숙소, 식비, 교통비 등 카테고리별로 입력하거나 추천 예산으로 빠르게 계획할 수 있어요."
        />
        <Image
          src={imgUrl}
          alt="이미지 임시"
          width={500}
          className="rounded-2xl"
        />
      </section>
      <section className="flex items-center justify-center gap-30 mb-30">
        <Image
          src={imgUrl}
          alt="이미지 임시"
          width={500}
          className="rounded-2xl"
        />
        <ServiceDetailItem
          order="02"
          title="실시간에 가까운 기준환율로, 더 정확하게."
          description="매일 갱신되는 최신 기준환율을 바탕으로 여행 경비를 자동으로 환산해드려요."
        />
      </section>
      <section className="flex items-center justify-center gap-30">
        <ServiceDetailItem
          order="03"
          title={`여행자들의 생생한
                  한 달 살기 경험 공유`}
          description="각국 여행자들과 실제 비용, 숙소 정보, 팁을 공유해요."
        />
        <Image
          src={imgUrl}
          alt="이미지 임시"
          width={500}
          className="rounded-2xl"
        />
      </section>
    </section>
  );
}
